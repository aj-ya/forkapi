const express = require("express");
const process = require("process");
var app = express();
const { spawn, exec } = require("child_process");
app.get("/threads/:numThreads", (req, res) => {
  let num_threads = req.params.numThreads;
  if (num_threads < 0) res.send("Invalid");
  for (let i = 0; i < num_threads; i++) {
    const child = spawn("pwd");
    child.on("exit", function (code, signal) {
      console.log(
        "child process exited with " + `code ${code} and signal ${signal}`
      );
    });
    // process.stdin.pipe(child.stdin)
    console.log(i);
    child.stdout.on("data", (data) => {
      console.log(`child stdout:\n${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`child stderr:\n${data}`);
    });
  }
  res.status(200).end(num_threads);
});
app.get("", (req, res) => {
  exec(
    "echo $(vmstat 1 2|tail -1|awk '{print $15}')",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        res.send("-1");
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        res.send("-1");
        return;
      }
      console.log(`free mem: ${stdout}`);
      res.send(String(100 - stdout));
    }
  );
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));
