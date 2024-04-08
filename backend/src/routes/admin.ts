import { Application, Handler } from "express";
import mongoclient from "../util/mongodb";
import { Document, WithId } from "mongodb";

export default async function AdminRoute(app: Application) {
    const db = await mongoclient.connect();

    const adminAuth: Handler = (req, res, next) => {
        if (req.headers["x-authentication"] != process.env.ADMIN_PASSWORD) {
            res.status(401).send("unauthorized");
            return;
        }
        next();
    }

    app.use('/admin/*', adminAuth);

    app.get('/admin/auth', (req, res) => {
        res.status(200).send('authed');
    });

    app.get('/admin/attendance/count', async (req, res) => {
        let guestCount = await db.db('attendance').collection('guests').estimatedDocumentCount();
        let presenterCount = await db.db('attendance').collection('presenters').estimatedDocumentCount();

        res.status(200).send({
            guests: guestCount,
            presenters: presenterCount
        });
    });

    app.get('/admin/attendance/presenters', async (req, res) => {
        try {
            const emailDocumentsCursor = db.db('attendance').collection('presenters').find({ email: { "$exists": true, } });
            let emails = [];
            while (await emailDocumentsCursor.hasNext()) {
                let cur = await emailDocumentsCursor.next();
                emails.push(cur!.email);
            }
            res.status(200).send(emails);
        } catch (e) {
            res.status(500).send("internal error");
        }
    });

    app.get('/admin/report', async (req, res) => {
        let fileData: Record<string, any> = {};

        try {
            const docCursor = db.db('attendance').collection('presenters').find();
            let presenters = [];
            while (await docCursor.hasNext()) {
                let cur = await docCursor.next();
                presenters.push(cur);
            }
            fileData["presenters"] = presenters;
        } catch (e) {
            res.status(500).send("internal error");
        }

        try {
            const docCursor = db.db('attendance').collection('guests').find();
            let guests = [];
            while (await docCursor.hasNext()) {
                let cur = await docCursor.next();
                guests.push(cur);
            }
            fileData["guests"] = guests;
        } catch (e) {
            res.status(500).send("internal error");
        }

        try {
            let guestCount = await db.db('attendance').collection('guests').estimatedDocumentCount();
            let presenterCount = await db.db('attendance').collection('presenters').estimatedDocumentCount();

            fileData["counts"] = {
                guests: guestCount,
                presenters: presenterCount
            };
        } catch (e) {
            res.status(500).send("internal error");
        }

        res.status(200).send(JSON.stringify(fileData, null, 2));
    });
};