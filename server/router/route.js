import { Router } from "express";
const router = Router();

/* **** import all controllers ****  */
import * as Controller from "../controllers/appcontroller.js";


// POST Methods
router.route('/register').post(Controller.register); //register the user
// router.route('/registerMail').post(); // send the email
router.route('/authenticate').post((req, res) => res.end()); // authenticate the user
router.route('/login').post(Controller.login); // login the user

// GET Methods
router.route('/user/:username').get(Controller.getUser);
router.route('/generateOTP').get(Controller.generateOTP);
router.route('/verifyOTP').get(Controller.verifyOTP);
router.route('/createResetSession').get(Controller.createResetSession);

// PUT Methods
router.route('/updateUser').put(Controller.updateUser);
router.route('/reserPassword').put(Controller.resetPassword);

export default router;