import { connectDB } from "./db/conn.js";
import { app } from "./app.js";

connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
.catch(() => {
    console.log(error);
})