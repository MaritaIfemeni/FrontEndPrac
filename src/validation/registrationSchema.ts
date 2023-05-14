import * as yup from 'yup';

//import { RegisterFormData } from '../pages/LogInPage';

const registrationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long')   
        .max(20, 'Username must be less than 20 characters long'),  
    email:yup.string().email().required('Email is required'),
    phone: yup
        .string()
        .required('Phone is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(20, 'Password must be less than 20 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Password must contain at least one uppercase letter, one lowercase letter and one number'),
    confirm: yup
        .string() 
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export default registrationSchema;