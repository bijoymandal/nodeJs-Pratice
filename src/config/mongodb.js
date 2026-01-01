import { MongoClient } from "mongodb";
let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(process.env.DB_URL)
        .then(clientInstance=>{
            client = clientInstance   
            console.log("Mongodb is connect");
            // createCounter(client.db());
            createIndexes(client.db());
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getClient=()=>{
    return client;
}

export const getDB= ()=>{
    return client.db();
} 


export const createIndexes = async(db)=>  {
    try{
    await db.collection("products").createIndex({price:1});
    await db.collection("products").createIndex({name:1,category:-1}); // 1 denote increment and -1 denote decrement
    await db.collection("products").createIndex({desc:"text"});
    }
    catch(error)
    {
        console.log(error);
    }
}