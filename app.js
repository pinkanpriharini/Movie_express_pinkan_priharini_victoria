import express from "express"
import movieRouter from "./route/movieRoute.js"
import connectDatabase from "./config/database.js"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message : "Ok"
    })
});

// mount movie routes
app.use('/movies', movieRouter)

// start server after DB connection succeeds
const start = async () => {
    try {
        await connectDatabase();
        app.listen(3000, () => {
            console.log(`app berjalan di http://localhost:3000`);
        });
    } catch (err) {
        console.error('Gagal koneksi DB, server tidak dijalankan', err);
        process.exit(1);
    }
}

start()
