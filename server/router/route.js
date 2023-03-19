import { Router } from "express";
const router = Router();

/* **** import all controllers ****  */
import * as Controller from "../controllers/appcontroller.js";
import { registerMail } from '../controllers/mailer.js' 
import Auth, { localVaribles } from "../middleware/auth.js";

// POST Methods
router.route('/register').post(Controller.register); //register the user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(Controller.verifyUser, (req, res) => res.end()); // authenticate the user
router.route('/login').post(Controller.verifyUser,Controller.login); // login the user

// GET Methods
router.route('/user/:username').get(Controller.getUser);
router.route('/generateOTP').get(Controller.verifyUser, localVaribles, Controller.generateOTP);
router.route('/verifyOTP').get(Controller.verifyUser, Controller.verifyOTP);
router.route('/createResetSession').get(Controller.createResetSession);

// PUT Methods
router.route('/updateuser').put(Auth, Controller.updateUser);
router.route('/resetPassword').put(Controller.verifyUser, Controller.resetPassword);

export default router;