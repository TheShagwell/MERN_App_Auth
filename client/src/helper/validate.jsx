import toast from 'react-hot-toast'

// validates the login page username
export async function usernameVerification(values){
    const errors = usernameVerify({}, values);

    return errors;
}

// validates the login page password
export async function passwordVerification(values){
    const errors = passwordVerify({}, values);

    return errors;
}

// validates the reset password
export async function resetPasswordVerification(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
    errors.exist = toast.error("Passwords do not match");
    }
    return errors;
}

// validates the Register page
export async function registerVerification(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

// validates the Profile page
export async function profileVerification(values){
    const errors = emailVerify({}, values);
    return errors;
}

// validates the password
const passwordVerify = (errors=[], values) => {
    
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 

    if(!values.password){
        errors.password = toast.error('Please enter your password');
    }else if(values.password.includes(" ")){
        errors.password = toast.error('Wrong Password Details');
    } else if(values.password.length < 6){
        errors.password = toast.error('Password must be at least 6 characters long');
    } else if (!specialChars.test(values.password)){
        errors.password = toast.error('Password must contain special character');
    }
}

//  Validates the username
const usernameVerify = (error=[], values) => {
    if(!values.username){
        error.username = toast.error("Username is Required...!")
    } else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username...")
    }
    return error;
} 

// validates the email
const emailVerify = (errors=[], values) => {
    
    const specialEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 

    if(!values.email){
        errors.email = toast.error('Please enter your email');
    }else if(values.email.includes(" ")){
        errors.email = toast.error('Wrong email Details');
    } else if(values.email.length < 6){
        errors.email = toast.error('email must be at least 6 characters long');
    } else if (!specialEmail.test(values.email)){
        errors.email = toast.error('Invalid Email Address');
    }

    return errors;
}