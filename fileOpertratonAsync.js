//include file system module
const fs = require('fs');

//reading file asynchronously
fs.readFile('data.txt',(err,data)=>{
    if(err){
        console.log('Error reading file:', err);
        return;
    }
    console.log('File content:', data.toString());
});

console.log('This is another statement');

//writing file asynchronously
fs.writeFile('employee.txt','This is a new file created by node.js',(err)=>{
    if(err){
        console.log('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});

//appending file asynchronously
fs.appendFile('employee.txt','\nThis is appended text.',(err)=>{
    if(err){
        console.log('Error appending file:', err);
        return;
    }
    console.log('File appended successfully');
});

//deleting file asynchronously
fs.unlink('employee.txt',(err)=>{
    if(err){
        console.log('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
});