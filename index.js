const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
// allow CORS for local development (for production, you should configure it properly)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// ROUTES
const productRoutes = require("./routes/product.route");
app.use("/api/product", productRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
