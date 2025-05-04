import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.port || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  const { windowWidth } = req.query;

  // if(typeof windowWidth !== "number"){
  //     return res.status(400).json({error:"windowWidth must be a number"});
  // }

  const breakpoints = { 350: 2, 750: 5, 900: 7 };
  let columns = 7;

  Object.keys(breakpoints).forEach((bp) => {
    if (parseInt(windowWidth) >= parseInt(bp)) {
      columns = breakpoints[bp];
    }
  });

  const items = Array.from({ length: 49 }, (_, i) => ({
    id: i + 1,
    url: `/img/${i + 1}.jpg`,
  }));

  const columnArrays = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    columnArrays[index % columns].push(item);
  });

  return res.json({ columns: columnArrays });
});

app.listen(port, () => {
  console.log(`server running on port:`, port);
});
