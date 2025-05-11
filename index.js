//Apply the correct asynchronous approach to ensure the read operation executes only after the write operation is completed.

const fs = require("fs");

const Solution = () => {
  
  fs.appendFile("note.txt", " new data", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file updated succesfully!");
      fs.readFile("note.txt", "utf-8", (data, err) => {
        if (err) console.log(err);
        else console.log(data);
      });
    }
  });
}
Solution();
module.exports = Solution;