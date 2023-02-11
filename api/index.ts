import express from "express";
import artistsRouter from "./routers/artists";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use('/artists', artistsRouter);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);