import express from "express";
import cors from "cors";

import mapProxy from "./routes/mapProxy";

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    const html = `
        <html lang="en">
        <head>
            <script src="main.min.js" async defer></script>
        </head>
        <body>
            <div id="app"></div>
        </body>
        </html>
    `
    res.send(html);
});

app.use(mapProxy);

app.use(express.static("../dist_dev"));

const port = process.env.PORT || 5000;

app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);
  });
