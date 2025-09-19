import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/lmsproject";
const connectToMongoDB = ()=>{
    MongoClient.connect(url)
        .then(client=>{
            console.log("Mongodb is connect");
        })
        .catch(err=>{
            console.log(err);
        })
}
export default connectToMongoDB;