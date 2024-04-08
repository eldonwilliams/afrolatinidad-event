import express from 'express';
import cors from 'cors';
import { readdir } from 'fs';
import { join } from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(bodyParser.json());

readdir(join(__dirname, './routes'), {
    recursive: true,
    withFileTypes: true,
}, (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        try {
            console.log(`loading ${file.name} (${join(file.path, file.name)})`);
            let module = require(join(file.path, file.name));
            if (typeof module.default == "function") {
                module.default(app);
            }
        } catch (e) {
            console.log(e);
        }
    });
});

app.listen(process.env.PORT ?? 3030, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 3030}`);
});