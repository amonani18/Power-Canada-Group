const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://powercan:powercan@power-cananda.9d84td9.mongodb.net/Power-Can?retryWrites=true&w=majority&appName=Power-Cananda"
};

export default config;
