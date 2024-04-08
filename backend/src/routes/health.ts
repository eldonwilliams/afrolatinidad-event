import { Application } from "express";

export default function HealthRoute(app: Application) {
    app.get('/health', (req, res) => {
        res.status(200).send("Hello, world!");
    });
};