import UserModel from "../model/User.model.js"
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import ENV from '../config.js'
import otpGenerator from 'otp-generator'

/* !******* Middleware *********! */
export const verifyUser = async (req, res, next) => {

    try {
        const { username } = req.method == 'GET'? req.query : req.body
        
        // Lets check for the user in the database
        let exist = await UserModel.findOne({ username: username })
        if(!exist) return res.status(404).send({ error: 'User not found' })
        next() // supposing it finds the user in the database, then return the next() function middleware controller. i.e pass on to the next available script

    } catch (error) {
        return res.status(400).send({ error: "Authentication Error" })
    }

}

/*    *** POST http://localhost:8080/api/register ***
    @param : {
        "username": "username",
        "password": "password",
        "email": "email",
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

        // Check for existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({ error : "Please provide a unqiue username" });

                resolve();
            })
        });

        // Check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err));
                if(email) reject({ error: "Please provide a unqiue email" });

                resolve();
            })
        });

        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                        // Hash password
                        bcrypt.hash(password, 10)
                            .then( hashedPassword => {
                                // then create a new user
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || "",
                                email
                            });
                            user.save()
                                .then(result => res.status(201).send( { message: "User created successfully" }))
                                .catch(error => res.status(500).send({error}))
                            }).catch( error => {
                                return res.status(500).send({
                                    error: "Enable to hash password"
                                })
                            })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error)
    }
}


/*  *** POST http://localhost:8080/api/login ***
    @param : {
        "username": "username",
        "password": "password",
    }
*/
export async function login(req, res){
    // res.json('login route')

    const { username, password } = req.body;

    try {
        
        UserModel.findOne( { username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if(!passwordCheck) return res.status(400).send( { error: "Invalid username or password" });

                        // Creating the jwtToken
                        const token = jwt.sign({
                                    userId: user._id,
                                    username: user.username
                                }, ENV.JWT_SECRET, { expiresIn: '24h'});
                        return res.status(200).send({
                            msg: "Login Successully...",
                            username: user.username,
                            token
                        })
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Don't have password" })
                    })
                })
            .catch( error => {
                return res.statu(404).send({ error: "Username not Found" });
            })
                
    } catch(error) {
        return res.status(500).send({ error })
    }
}

/*  *** GET http://localhost:8080/api/user/ezrajoe ***    
*/
export async function getUser(req, res){
    // res.json('getUser route')
    const { username } = req.params;

    try {

        if(!username) return res.status(200).send({ error: "Invalid Username" })
        UserModel.findOne( { username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error: "User not found" });

            /** remove password from user more like getting away with it */
            // mongoose return unnecessary data with object so convert it to json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(200).send(rest);
        })
        
    } catch (error) {
        return res.status(500).send({ error : "Cannot Find User Data"})
    }
}


/*** PUT http://localhost:8080/api/updateUser/ezrajoe ***    
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
    // res.json('updateUser route')
    try{
        // userId comes from the Auth.js middleware
        const { userId } = req.user

        if(userId){
            const body = req.body;

            // Updating existing user
            UserModel.updateOne( { _id : userId }, body, function( err, data ) {
                if(err) throw err;
                
                return res.status(201).send({ msg: "Record Updated...!" })
            })
        } else{
            return res.status(401).send({ msg: "Record Not Found...!" })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}


/*  *** GET http://localhost:8080/api/generateOTP ***    
*/
export async function generateOTP(req, res){
    // res.json('generateOTP route')
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    res.status(201).send({ code: req.app.locals.OTP })
}


/*  *** GET http://localhost:8080/api/verifyOTP ***    
*/
export async function verifyOTP(req, res){
    // res.json('verifyOTP route')
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // resetting the OTP value
        req.app.locals.resetSession = true; // resetting the session for reset password
        return res.status(201).send({ msg: "Verify successful...!" })
    }

    return res.status(400).send({ error : "Invalid OTP" })
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