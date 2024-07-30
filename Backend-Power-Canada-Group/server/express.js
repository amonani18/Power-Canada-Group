import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import template from "./../template.js"; // Import the template
import authRoutes from "./routes/auth.routes.js"; // Correct import for auth routes
import userRoutes from "./routes/user.routes.js";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// Serve the HTML template at the root URL
app.get("/", (req, res) => {
  res.status(200).send(template());
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});


app.use(cors({
    origin: 'http://localhost:3000', // Assuming your React frontend runs on port 3000
    credentials: true  // if you are using cookies/token with credentials
}));


export default app;
