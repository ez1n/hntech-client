import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

const port = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now()
  });
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});