import { UserModel } from "../feature/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
    //1 . Check if authentication header is empty
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if(!authHeader){
        return res.status(401).send("Authentication required.");
    }

    //2. Extract creditionals from header
    const base64Credentials = authHeader.replace("Basic ", "");
    console.log(base64Credentials);

    //3. Decode base64 string
    const decodecredentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    console.log(decodecredentials);
    const [username, password] = decodecredentials.split(":");

    const user = UserModel.getAll().find(u => u.email === username && u.password === password);
    if(user){
        next();
    }
    else{
        return res.status(401).send("Incorrect Credentials");
    }   
}

export default basicAuthorizer;