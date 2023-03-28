import axios from 'axios'
import jwt_decode from 'jwt-decode'

/*/ ************CONNECT TO THE BACKEND SERVER************ */
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN

// Making an API reust with axios

/* To get the username of who just logged in to update his/her details so as not refresh
   after updating all over and over again, we can further decode the user token */

export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject('Could not find token');
    let decode = jwt_decode(token)
    return decode;
}

export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', {username})
    } catch (error) {
        return { error: "Username doesn't exist...!"}
    }
} 

// To get the user
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data }
    } catch (error) {
        return { error: "Password doesn't match...!"}
    }
}

// To register the user
export async function registerUser( credentials ) {
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        // Send email to the user
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg });
        }

        return Promise.resolve( msg );
    } catch (error) {
        return Promise.reject({ error })
    }
}

// To login the user
export async function verifyUserAccount({ username, password }) {
    try {
        if(username){
            const { data } = await axios.post(`/api/login`, { username, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password does't match...!" })
    }
}

// To update the user profile 
export async function updateUserProfile( response ) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : {"Authorization" : `Bearer ${token}`} });
        
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile"})
    }
}

// To generate OTP
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}


// Verrify OTP 
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get(`/api/verifyOTP`, { params : { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error })
    }
}


// Reset Password
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put(`/api/resetPassword`, { username, password } );

        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error })
    }
}