import express from 'express';
import cors from 'cors';
import { readdir } from 'fs';
import { join } from 'path';

const app = express();

app.use(cors({
    credentials: true,
}))

readdir(join(__dirname, './routes'), {
    recursive: true,
    withFileTypes: true,
}, (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        console.log(`loading ${file.name} (${join(file.path, file.name)})`);
        let module = require(join(file.path, file.name));
        if (typeof module == "function") {
            module(app);
        }
    });
});

app.listen(process.env.PORT ?? 3030, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 3030}`);
});