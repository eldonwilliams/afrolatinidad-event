import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

let mongopass;
if (process.env.MONGO_ROOT_PASSWORD_FILE) mongopass = readFileSync(process.env.MONGO_ROOT_PASSWORD_FILE || "").toString("utf8");
else mongopass = process.env.MONGO_ROOT_PASSWORD;

const mongoclient = new MongoClient(`mongodb://mongo:27017`, {
    auth: {
        username: 'root',
        password: mongopass
    }
});

export default mongoclient; 