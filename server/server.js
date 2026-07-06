import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from './configs/db.js';
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import newsletterrouter from "./routes/newsletterRoutes.js";
import newsletterRouter from "./routes/newsletterRoutes.js";

const app = express();

await connectDB();

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API is working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use('/api/newsletter', newsletterRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

export default app;

