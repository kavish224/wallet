const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/index");
const app = express();

// Configure CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'https://kwallet.kavishambani.in', 'https://wallet-phi-nine.vercel.app'], // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Specify allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
    credentials: true // Enable sending of cookies (if needed)
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", mainRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
