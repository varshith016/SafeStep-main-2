# Safe Step - Urban Safety Platform

Safe Step is a comprehensive urban safety platform designed to help pedestrians and cyclists navigate cities safely by providing real-time hazard reporting and monitoring.

## Project Structure

### Components

1. **App.tsx**
   - Main application component
   - Integrates all other components
   - Wraps the application with AuthProvider for authentication context

2. **Navbar.tsx**
   - Fixed navigation bar at the top
   - Includes logo and brand name
   - Authentication buttons (Login/Signup)
   - Navigation links to different sections
   - Uses AuthContext for user authentication state

3. **Hero.tsx**
   - Landing section with main message
   - Call-to-action button for hazard reporting
   - Background image of urban cyclist
   - Responsive design for different screen sizes

4. **Map.tsx**
   - Interactive map using react-leaflet
   - Displays hazard markers with custom icons
   - Real-time hazard reporting functionality
   - Click-to-add new hazard feature
   - Form for submitting hazard details
   - Hazard types legend
   - Popup information for each hazard

5. **Features.tsx**
   - Displays key features of the platform
   - Grid layout with icons and descriptions
   - Includes real-time weather alerts, crowd-sourced hazards, smart navigation, and community rewards

6. **HowItWorks.tsx**
   - Step-by-step guide for using the platform
   - Visual representation with icons
   - Clear, concise instructions

7. **Footer.tsx**
   - Contains social media links
   - Copyright information
   - Additional navigation links
   - Brand information

8. **AuthModal.tsx**
   - Modal component for user authentication
   - Handles both login and signup
   - Form validation
   - Switches between login and signup modes
   - Integrated with AuthContext

### Contexts

**AuthContext.tsx**
- Manages authentication state
- Provides login/signup/logout functionality
- User information management
- Context provider for the entire application

### Features

1. **Hazard Reporting**
   - Click on map to add new hazard
   - Form to input hazard details
   - Multiple hazard types (Weather, Construction, General)
   - Custom markers for different hazard types

2. **Authentication**
   - User registration and login
   - Protected features for authenticated users
   - Session management

3. **Interactive Map**
   - OpenStreetMap integration
   - Custom markers
   - Popup information
   - Real-time updates
   - Mobile-responsive design

4. **User Interface**
   - Clean, modern design
   - Responsive layout
   - Intuitive navigation
   - Clear call-to-action buttons
   - Consistent styling with Tailwind CSS

### Technical Stack

- React with TypeScript
- Tailwind CSS for styling
- react-leaflet for maps
- Lucide React for icons
- Context API for state management
- Vite for development and building

### Key Features

1. **Real-time Hazard Reporting**
   - Users can click anywhere on the map to report hazards
   - Custom form for hazard details
   - Different hazard types with unique icons
   - Immediate visual feedback

2. **Interactive Map Interface**
   - Smooth pan and zoom
   - Custom markers
   - Informative popups
   - Easy-to-use interface

3. **User Authentication**
   - Secure login/signup system
   - Protected features
   - User session management

4. **Responsive Design**
   - Works on all device sizes
   - Optimized for mobile use
   - Consistent experience across platforms

### Future Enhancements

1. Backend Integration
   - Real database for hazards
   - User authentication server
   - API endpoints for data management

2. Advanced Features
   - Route planning
   - Hazard notifications
   - User reputation system
   - Historical data analysis

3. Community Features
   - Hazard verification
   - User comments
   - Safety scores for areas
   - Community guidelines

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser at provided URL

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any enhancements.