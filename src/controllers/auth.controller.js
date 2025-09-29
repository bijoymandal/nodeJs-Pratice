export default class AuthController {
    getAuth(req, res) {
        res.render("pages/auth/login",{
            layout:false,
            title: "user Login and. Register",
        });
    }
    getSignUpAuth(req, res) {
        res.render("pages/auth/register",{
            layout:false,
            title: "user Sign Up and. Register",
        });
    }
    userLogout(req,res){
        res.session.destroy((err)=>{
            if(err)
            {
                console.log("session destroy error:",err);
                return res.redirect("/dashboard");
            }
            res.clearCook
        });
    }
}