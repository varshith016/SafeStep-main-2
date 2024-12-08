import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

interface Item {
  id: string;
  name: string;
}

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];
        setItems(data);
      } catch (error: any) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
