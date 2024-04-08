import { Application } from "express";
import mongoclient from "../util/mongodb";

interface AttendancePresenterPostBody {
    first: string;
    last: string;
    email: string;
    crn: string;
    p: string;
}

export default async function Attendance(app: Application) {
    const db = await mongoclient.connect();

    app.post('/attendance/presenter', (req, res) => {
        if (req.body.first === undefined || req.body.last === undefined || req.body.email === undefined || req.body.crn === undefined || req.body.p === undefined) {
            res.status(400).send("missing parameters");
            return;
        }

        if (req.body.p != process.env.PRESENTER_PASSWORD) {
            res.status(401).send("unauthorized");
            return;
        }

        db.db('attendance').collection('presenters').insertOne({
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            crn: req.body.crn,
            timestamp: new Date(),
        }).then(() => {
            res.status(200).send("ok");
        }).catch((err) => {
            res.status(500).send("internal error");
        });
    });

    app.post('/attendance/guest', (req, res) => {
        db.db('attendance').collection('guests').insertOne({
            ip: req.ip,
            timestap: new Date()
        }).then(() => {
            res.status(200).send("ok");
        }).catch((err) => {
            res.status(500).send("internal error");
        });
    });
};