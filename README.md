VibeShare

Welcome to VibeShare - the social media app for sociopaths. Connect with like-minded individuals, share your thoughts, and explore a unique social networking experience.


Table of Contents
Features
Technologies Used
Installation
Usage
API Endpoints
File Structure
Contributing
License
Features
✨ User Registration & Authentication: Secure user authentication with JWT.

👤 Profile Management: Users can create and manage their profiles with profile pictures, location, and occupation details.

👥 Friends Management: Add and remove friends to create your own social circle.

📝 Posts: Share your thoughts and experiences through posts.

❤️ Reactions & Comments: Engage with posts through likes and comments.

🔍 Search Functionality: Search for friends by their names.

🔔 Notifications: Get notified of important activities (not implemented yet).

Technologies Used
Frontend: React, Redux, Material-UI
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
File Uploads: Multer, AWS S3 (for production)
Installation
To run VibeShare locally, follow these steps:

Prerequisites
Node.js
MongoDB
npm or yarn
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/VibeShare.git
cd VibeShare/backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables in a .env file:

bash
Copy code
PORT=3001
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_BUCKET=your_s3_bucket_name
Start the backend server:

bash
Copy code
npm start
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Set up environment variables in a .env file:

bash
Copy code
REACT_APP_API_URL=http://localhost:3001
Start the frontend server:

bash
Copy code
npm start
Usage
Open your browser and navigate to http://localhost:3000.
Register a new account or log in with an existing account.
Explore the features:
Profile: View and edit your profile.
Friends: Add or remove friends.
Posts: Create new posts, react, and comment on existing posts.
Search: Use the search bar in the navbar to find friends.
