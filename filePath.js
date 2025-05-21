const fs = require("fs");
// const path = "path/src/home/datapath.txt";
const Path = require("path"); // include path module
const filePath = Path.join("path", "src", "home", "datapath.txt"); // reltive path show  
const filePathresolve = Path.resolve("path", "src", "home", "datapath.txt"); // absolute path show  
console.log(filePath);
console.log(filePathresolve);
const fileExt = Path.extname(filePath); // file extension
console.log(fileExt);


//reading Data
/*fs.readFile(filePath,(err,data)=>{
    if(err){
        console.log("Error reading file:", err);
    }
    else
    {
        console.log("File data:", data.toString());
    }
});*/



/*
note : why Require Path module
1) Linux base file path "/Users/username/path/src/home/datapath.txt"
2) Windows base file path "C:\Users\username\path\src\home\datapath.txt"
3) Mac base file path "/Users/username/path/src/home/datapath.txt"

all path soulation have an issue solve in Path module
*/