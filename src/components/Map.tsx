import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  collection,
  addDoc,
  collectionGroup,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase"; 
import { useAuth } from "../contexts/AuthContext"; 
import { CloudSnow, Tool, AlertTriangle } from "react-feather";
import weatherIcon from "../../assets/weather.png"; 
import constructionIcon from "../../assets/construction.png";
import hazardIcon from "../../assets/hazard.png";

interface Hazard {
  id: string;
  type: "weather" | "construction" | "hazard";
  title: string;
  description: string;
  position: google.maps.LatLngLiteral;
  time: string;
  userId: string;
  image?: string;
}

const hazardIcons = {
  weather: weatherIcon,
  construction: constructionIcon,
  hazard: hazardIcon,
};

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = { lat: 43.6532, lng: -79.3832 };

export default function Map() {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [isAddingHazard, setIsAddingHazard] = useState(false);
  const [newHazardForm, setNewHazardForm] = useState({
    type: "hazard" as const,
    title: "",
    description: "",
  });
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [isLegendVisible, setIsLegendVisible] = useState(false); 

  const toggleLegend = () => {
    setIsLegendVisible((prev) => !prev);
  };

  const { user } = useAuth(); 

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setMarkerPosition(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please allow location access."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchHazards = async () => {
    try {
      const querySnapshot = await getDocs(collectionGroup(db, "hazards"));
      const hazardsData: Hazard[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        position: doc.data().position as google.maps.LatLngLiteral,
      })) as Hazard[];
      setHazards(hazardsData);
    } catch (error) {
      console.error("Error fetching hazards:", error);
    }
  };

  useEffect(() => {
    requestLocation();
    fetchHazards();
  }, []);

  const handleReportHazard = () => {
    if (!userLocation) {
      alert("We need access to your location to report a hazard.");
      requestLocation();
      return;
    }
    setIsAddingHazard(true);
  };

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null); 

  const handleSubmitHazard = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset validation error
    setValidationError(null);

    if (!user || !markerPosition) {
      setValidationError(
        "You need to log in or enable location services to report a hazard."
      );
      return;
    }

    // Check if all fields are filled
    if (
      !newHazardForm.type ||
      !newHazardForm.title ||
      !newHazardForm.description
    ) {
      setValidationError(
        "All fields (type, title, description) must be filled out."
      );
      return;
    }

    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    const file = fileInput?.files ? fileInput.files[0] : null;

    if (!file) {
      setValidationError("Please upload an image before submitting.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    // Check how many markers the user has added today
    const userHazardsToday = hazards.filter(
      (hazard) =>
        hazard.userId === user.email && hazard.time.split(",")[0] === today // Compare dates
    );

    if (userHazardsToday.length >= 2) {
      setValidationError(
        "Daily Limit Reached: You can only add 2 hazard markers per day. Try again tomorrow!"
      );
      return;
    }

    // Check if a marker already exists at the same location
    const isDuplicateLocation = hazards.some(
      (hazard) =>
        hazard.userId === user.email &&
        hazard.position.lat === markerPosition.lat &&
        hazard.position.lng === markerPosition.lng
    );

    if (isDuplicateLocation) {
      setValidationError(
        "Duplicate Location: You have already added a marker at this location. Please choose a different spot."
      );
      return;
    }

    setLoading(true);

    let imageUrl = null;

    try {
      const storage = getStorage(); // Get Firebase Storage instance
      const storageRef = ref(
        storage,
        `hazard-images/${user.email}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      setValidationError("Failed to upload image. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, "users", user.email, "hazards"),
        {
          ...newHazardForm,
          position: markerPosition,
          time: new Date().toLocaleString(),
          userId: user.email || "Anonymous",
          image: imageUrl,
        }
      );

      const newHazard: Hazard = {
        id: docRef.id,
        ...newHazardForm,
        position: markerPosition,
        time: new Date().toLocaleString(),
        userId: user.email || "Anonymous",
        image: imageUrl, 
      };

      setHazards([...hazards, newHazard]);
      setIsAddingHazard(false);
      setNewHazardForm({
        type: "hazard",
        title: "",
        description: "",
      });
      setMarkerPosition(null);
      setLoading(false);

      alert("Success: Your hazard marker has been added successfully!");
    } catch (error) {
      console.error("Error adding hazard to Firestore:", error);
      setValidationError("Error: Failed to save hazard. Please try again.");
      setLoading(false);
    }
  };

  const handleDeleteHazard = async (hazardId: string) => {
    if (!user) {
      alert("You must be logged in to delete hazards.");
      return;
    }

    // Find the hazard to delete
    const hazardToDelete = hazards.find((hazard) => hazard.id === hazardId);

    // Check if the logged-in user is the owner of the hazard
    if (hazardToDelete?.userId !== user.email) {
      alert("You are not authorized to delete this hazard.");
      return;
    }

    try {
      const docRef = doc(db, "users", user.email, "hazards", hazardId);
      await deleteDoc(docRef);
      setHazards(hazards.filter((hazard) => hazard.id !== hazardId));
      setSelectedHazard(null);
      alert("Hazard deleted successfully.");
    } catch (error) {
      console.error("Error deleting hazard:", error.message);
      alert(`Failed to delete hazard: ${error.message}`);
    }
  };

  return (
    <div className="relative h-[600px] w-full" id="map">
      {/* Toggle Button */}
      <button
        onClick={toggleLegend}
        className="absolute top-14 right-2 z-10 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
      >
        {isLegendVisible ? "Close Legend" : "Open Legend"}
      </button>

      {/* Popup for Marker Types */}
      {isLegendVisible && (
        <div className="absolute top-28 right-4 z-10 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-900 mb-2">Marker Type</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <img
                src={weatherIcon}
                alt="Weather Icon"
                className="h-5 w-5 mr-2"
              />
              <span>Weather</span>
            </div>
            <div className="flex items-center">
              <img
                src={constructionIcon}
                alt="Construction Icon"
                className="h-5 w-5 mr-2"
              />
              <span>Construction</span>
            </div>
            <div className="flex items-center">
              <img
                src={hazardIcon}
                alt="Hazard Icon"
                className="h-5 w-5 mr-2"
              />
              <span>Hazard</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Start your live location to report a hazard.
          </div>
        </div>
      )}

      {/* Google Map */}
      <LoadScript googleMapsApiKey="AIzaSyDyGmiILX7tbrmGyZvlrb68PQ174RXB0HM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || center}
          zoom={14}
        >
          {hazards.map((hazard) => {
            console.log("Hazard Type:", hazard.type);
            console.log("Assigned Icon:", hazardIcons[hazard.type]);
            return (
              <Marker
                key={hazard.id}
                position={hazard.position}
                icon={{
                  url: hazardIcons[hazard.type],
                  scaledSize: new google.maps.Size(30, 30),
                }}
                onClick={() => setSelectedHazard(hazard)}
              />
            );
          })}

          {selectedHazard && (
            <InfoWindow
              position={selectedHazard.position}
              onCloseClick={() => setSelectedHazard(null)}
            >
              <div>
                <h3 className="font-semibold">{selectedHazard.title}</h3>
                <p className="text-sm text-gray-600">
                  {selectedHazard.description}
                </p>
                <p className="text-sm text-gray-500">
                  Reported by: {selectedHazard.userId}
                </p>
                <p className="text-sm text-gray-500">
                  Reported at: {selectedHazard.time}
                </p>
                {selectedHazard.image && (
                  <img
                    src={selectedHazard.image}
                    alt="Hazard proof"
                    className="mt-2 rounded-md max-h-40 w-auto"
                  />
                )}
                {selectedHazard.userId === user?.email && ( // Show button only for owner
                  <div className="mt-4">
                    <button
                      onClick={() => handleDeleteHazard(selectedHazard.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="absolute bottom-4 left-4 z-[1]">
        <button
          onClick={handleReportHazard}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Report Hazard
        </button>
      </div>

      {isAddingHazard && markerPosition && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-md w-80 z-[400]">
          <h3 className="font-semibold mb-4">Report New Hazard</h3>

          {/* Show Validation Error */}
          {validationError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {validationError}
            </div>
          )}

          <form onSubmit={handleSubmitHazard}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={newHazardForm.type}
                onChange={(e) =>
                  setNewHazardForm((prev) => ({
                    ...prev,
                    type: e.target.value as
                      | "hazard"
                      | "weather"
                      | "construction",
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="hazard">Hazard</option>
                <option value="weather">Weather</option>
                <option value="construction">Construction</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={newHazardForm.title}
                onChange={(e) =>
                  setNewHazardForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newHazardForm.description}
                onChange={(e) =>
                  setNewHazardForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Image (Proof)
              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
                } text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {loading ? "Adding Marker..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setIsAddingHazard(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
