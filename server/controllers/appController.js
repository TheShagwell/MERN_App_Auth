import UserModel from "../model/User.model.js"

/*    *** POST http://localhost:8080/api/register ***
    @param : {
        "username": "username",
        "password": "password",
        "email": "email",
        "username": "name",
        "firstname": "firstname",
        "phone": "phone",
        "address": "address",
        "profile": ""
    }
*/
export async function register(req, res){
    // res.json('register route') // not needed again
    try{
        const { username, password, profile, email } = req.body;

        // Check for existig user
        const exitUsername = new Promise((resolve, reject) => {
            UserModel.finOne({ username, function(err, user){
                if(err) reject(new Error(err));
                if(user) reject({ error: "Please provide a unqiue username" });

                resolve();
            }})
        })

    } catch (error) {
        return res.status(500).send(error)
    }
}


/*  *** POST http://localhost:8080/api/register ***
    @param : {
        "username": "username",
        "password": "password",
    }
*/
export async function login(req, res){
    res.json('login route')
}


/*  *** GET http://localhost:8080/api/user/ezrajoe ***    
*/
export async function getUser(req, res){
    res.json('getUser route')
}


/*
    *** PUT http://localhost:8080/api/user/ezrajoe ***    
    @param: {
        "id" : "<userid>"
    }
    body : {
        "username": "username",
        "firstname": "firstname",
        "password": "password",
        "profile": "profile",
    }
*/
export async function updateUser(req, res){
    res.json('updateUser route')
}


/*  *** GET http://localhost:8080/api/generateOTP ***    
*/
export async function generateOTP(req, res){
    res.json('generateOTP route')
}


/*  *** GET http://localhost:8080/api/verifyOTP ***    
*/
export async function verifyOTP(req, res){
    res.json('verifyOTP route')
}


/*  *** GET http://localhost:8080/api/createResetSession ***    
    Successully redirect user when OTP is valid
*/
export async function createResetSession(req, res){
    res.json('createResetSession route')
}


/*  *** GET http://localhost:8080/api/resetPassword ***    
    Update the password when we have a valid session
*/
export async function resetPassword(req, res){
    res.json('resetPassword route')
}