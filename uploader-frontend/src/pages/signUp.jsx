
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import { IconEye, IconEyeInvisible } from '../components/icons';

import { useAuthContext } from '../hooks/use-auth-context';
import { ButtonLoader } from '../components/button-loader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {
    const { dispatch } = useAuthContext();
    const phoneLabel = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [signupError, setSingupError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
                toast.success("Sign-up Successful !");
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            }
            if (data.error !== null) {
                setSingupError(data.error);
                toast.error(data.error);
                console.log("Error recieved", data);
                return;
            }
            console.log(user);
        }
        catch(err){
            console.log(err);
            toast.error("Sorry, please try again")
        }
        finally{
            setLoading(false);
        }
    }
        
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    
    return (
        <div className='mt-20 mx-auto w-[80vw] p-8 px-5 sm:p-8 flex items-center justify-center flex-col gap-y-5 border rounded-md shadow-md bg-white'>
            <ToastContainer />
            <h1 className='text-2xl font-bold'>
                SIGN UP
            </h1>
            <form onSubmit={HandleUserSignUp} method='POST' className='gap-y-2 w-full sm:mt-5 flex flex-col items-center'>
                <div className='relative my-2 h-full w-full flex flex-col '>
                    <label htmlFor="name" className=''>Name</label>
                    <input type="text" id="name" name='name' required placeholder="Enter Your Name" 
                        className='border-b-2 border-zinc-400 placeholder:text-sm outline-none w-full focus:border-indigo-700 p-2 '
                    />
                </div>
                <div className='relative my-2 h-full w-full flex flex-col '>
                    <label htmlFor="email" className=''>Email</label>
                    <input type='email' id="email" name='email' required placeholder="Enter Your Email-ID" 
                        className='border-b-2 border-zinc-400 placeholder:text-sm outline-none w-full focus:border-indigo-700 h-8 p-2'
                    />
                </div>
                <div className='relative my-2 h-full w-full flex flex-col '>
                    <label htmlFor="password" className=''>Password</label>
                    <input type={!showPassword ? 'password' : 'text'} name="password" id="password" required placeholder='Enter Your Password' className='border-b-2 border-zinc-400 placeholder:text-sm outline-none w-full focus:border-indigo-700 h-8 p-2' />
                    <span onClick={() => setShowPassword(!showPassword)}>{showPassword
                        ? <IconEye className='absolute top-1/2 right-0 text-zinc-500 cursor-pointer text-lg'/> :
                        <IconEyeInvisible className='absolute top-1/2 right-0 text-zinc-500 cursor-pointer text-lg'/>}</span>
                </div>
                <button type='submit' disabled={loading} className=' mt-4 bg-indigo-700 text-white text-md rounded-sm p-2 px-6 hover:bg-indigo-900'> 
                    {loading ? <ButtonLoader/> : "Sign-Up"}
                </button>
            </form>
            <p>
                Already registered ? <Link to="/auth/log-in" className='text-purple-600'>Log-In</Link>
            </p>
        </div>
    )
}

