
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import { IconEye, IconEyeInvisible } from '../components/icons';

import { useAuthContext } from '../hooks/use-auth-context';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {
    const { dispatch } = useAuthContext();
    const phoneLabel = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [signupError, setSingupError] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    // const HandlePhoneFocusIn = () => {
    //     phoneLabel.current.style.top = '-18px';
    //     phoneLabel.current.style.left = '0px';
    // }
    // const HandlePhoneFocusOut = (e) => {
    //     if (e.target.value.length === 0) {
    //         phoneLabel.current.style.top = '12px';
    //         phoneLabel.current.style.left = '50px';
    //     }
    // }
    const HandleUserSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const user = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        try{

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/sign-up`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json();
            if (res.ok) {
                console.log('Signup success', data);
                dispatch({ type: 'LOGIN', payload: data.user });
                // toast.success("Sign-up Successful !");
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // navigate('/');
            }
            if (data.error !== null) {
                setSingupError(data.error);
                // toast.error(data.error);
                console.log("Error recieved", data);
                return;
            }
            console.log(user);
        }
        catch(err){
            console.log(err);
            // toast.error("Sorry, please try again")
        }
        finally{
            setLoading(false);
        }
    }
        
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return (
        <div className='login-form-container'>
            {/* <ToastContainer /> */}
            <h1>SIGN UP</h1>
            <form onSubmit={HandleUserSignUp} method='POST'>
                <div className='form-input'>
                    <input type="text" id="name" name='name' required placeholder="Enter Your Name" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className='form-input'>
                    <input type='email' id="email" name='email' required placeholder="Enter Your Email-ID" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className='form-input'>
                    {/* <PhoneInput
                        country={''}
                        placeholder={"Enter Your Contact No"}
                        inputProps={{ name: 'phone', id: "phone-input", required: true }}
                        onFocus={HandlePhoneFocusIn} onBlur={HandlePhoneFocusOut}
                    /> */}
                    <label ref={phoneLabel} htmlFor="phone-input" id='phone-label'>Contact No</label>
                </div>
                <div className='form-input password'>
                    <input type={!showPassword ? 'password' : 'text'} name="password" id="password" required placeholder='Enter Your Password' />
                    <label htmlFor="password">Password</label>
                    <span onClick={() => setShowPassword(!showPassword)}>{showPassword
                        ? <IconEye /> :
                        <IconEyeInvisible />}</span>
                </div>
                <button type='submit' className='login-btn'> 
                    {/* {loading ? <ButtonLoader/>: "Sign Up"}  */}
                    Sign-Up
                </button>
            </form>
            <p>
                Already registered ? <Link to="/auth/log-in">Log-In</Link>
            </p>
        </div>
    )
}

