# WanderHub

WanderHub (also referred to as WonderHub in the database config) is a robust tourism platform application designed to connect users with undiscovered travel destinations. It emphasizes a premium user interface with interactive features, dynamic listings, and geographic filtering.

## 🌟 Features

- **Premium UI/UX:** Clean, modern design featuring glassmorphism elements, high-quality typography (serif titles), and smooth CSS/JS animations inspired by editorial styles.
- **Interactive Listings:** Complete CRUD (Create, Read, Update, Delete) functionality for tourism listings and locations.
- **Reviews & Ratings:** Users can leave detailed reviews and star ratings for their favorite destinations.
- **Geographic Filtering & Search:** Search functionality with "District Wise Results" and interactive map features (e.g., "Regions of Bihar").
- **Authentication Pages:** Pre-built pages for user login, signup, and password recovery.
- **Robust Error Handling:** Custom Express error handling and request validation.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating:** EJS, EJS-Mate
- **Validation:** Joi (Server-side model validation)
- **Frontend:** HTML5, modern CSS, Vanilla JavaScript (with React UI components integrated for advanced interactivity)

## 📂 Project Structure

- `app.js`: Main application entry point and route configurations.
- `models/`: Mongoose database schemas (`listing.js`, `reviews.js`, `homepage_data.js`).
- `views/`: EJS templates (`layouts/`, `listings/`, etc.) used for rendering dynamic pages.
- `public/`: Static assets including vanilla CSS stylesheets, client-side JavaScript (`regions.js`, etc.), and images.
- `auth/`: Static HTML files for authentication interfaces.
- `init/`: Initialization scripts and sample data for populating the database.
- `utils/`: Utility functions like `wrapAsync` for async error handling and custom `ExpressError` class.

## 🚀 Installation & Setup

1. **Clone or Navigate to the Directory:**
   Navigate into the project root directory (`Major Projects`).

2. **Install Dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Database Setup:**
   Ensure you have [MongoDB](https://www.mongodb.com/) installed and running locally on the default port (`27017`). The application is configured to connect to `mongodb://127.0.0.1:27017/WonderHub`.

4. **Initialize Database (Optional):**
   If you have seed data in the `init/` folder, you might want to run the initialization script to populate initial sample listings:
   ```bash
   node init/index.js # (or similar script name if provided)
   ```

5. **Start the Server:**
   ```bash
   node app.js
   ```

6. **View the Application:**
   Open your browser and navigate to:
   [http://localhost:8080/listings](http://localhost:8080/listings)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or create a pull request if you want to contribute to the project's development.

## 📜 Rights
All the rights reserved @WanderHub.
