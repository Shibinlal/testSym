const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  debugger;
  const file = req.files.file;
  let data = "";
  console.log(req.files.file.name);
  file.mv(`${__dirname}/symphony_table_app/public/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    fs.readFile(
      `${__dirname}/symphony_table_app/public/${file.name}`,
      "utf8",
      function (err, data) {
        if (err) throw err;
        res.json({ data });
        console.log(data);
      }
    );
  });
});

app.listen(5000, () => console.log("Server Started..."));
