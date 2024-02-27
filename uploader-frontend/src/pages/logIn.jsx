import { Link, useNavigate } from 'react-router-dom';
// import './StyleSheet/signup.css';
import { useState, useEffect } from 'react';

import { IconEye, IconEyeInvisible } from '../components/icons';

import { useAuthContext } from '../hooks/use-auth-context';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const { dispatch } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    const HandleUserLogIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/log-in`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json();
            if (res.ok) {
                console.log('login Response Success', data);
                dispatch({ type: 'LOGIN', payload: data.user });
                // toast.success("Logged in successfully !")
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // navigate('/');
            }
            if (data.error !== null) {
                setLoginError(data.error);
                // toast.error(data.error);
                console.log("Error recieved", data);
                return;
            }
            console.log(user);
        }
        catch (err) {
            console.log(err);
            // toast.error("Sorry, please try again")
        }
        finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className='login-form-container'>
            {/* <ToastContainer /> */}
            <h1>LOG IN</h1>
            <form onSubmit={HandleUserLogIn} action="" method='POST'>
                <div className='form-input'>
                    <input type='email' id="email" name='email' placeholder="Enter Your Email-ID" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className='form-input password'>
                    <input type={!showPassword ? 'password' : 'text'} name="password" id="password" required placeholder='Enter Your Password' />
                    <label htmlFor="password">Password</label>
                    <span onClick={() => setShowPassword(!showPassword)}>{showPassword
                        ? <IconEye /> :
                        <IconEyeInvisible />}</span>
                </div>
                <button type='submit' disabled={loading} className='login-btn'>
                    {/* {loading ? <ButtonLoader /> : "Log In"} */}
                    log-in
                </button>
            </form>
            <p>
                Not an existing user ? <Link to="/auth/sign-up">Sign-Up</Link>
            </p>
            <p>
                Can't remember your password ? <Link to="/forgotpassword">Forgot Password</Link>
            </p>
        </div>
    )
}
