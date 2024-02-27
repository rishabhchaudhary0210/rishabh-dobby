import React from 'react'
import { useAuthContext } from '../hooks/use-auth-context'
import { Link } from 'react-router-dom';

const Home = () => {

  const { user } = useAuthContext();

  return (
    <div className='w-full h-full grid place-items-center mt-10 sm:mt-20 gap-4 sm:gap-8 px-4'>
      <h1 className='text-4xl sm:text-5xl font-bold'>
        <span className='text-indigo-500'>Welcome</span> to the Image Library.
      </h1>
      <h3 className='text-2xl sm:text-3xl text-zinc-500'>
        Explore a world of possibilities for your images.
      </h3>
      <p className='text-xl text-zinc-700 '>
        Discover the convenience of securely uploading, organizing, and accessing your images in the cloud.
      </p>
      {
        !user && (
          <Link to='/auth/sign-up' className='text-2xl text-indigo-500 flex justify-center items-center '>
            Sign in to unlock your personalized image library.
            <p 
              className="p-2 mx-2 border border-indigo-600 bg-indigo-600 text-md rounded-full text-white hover:bg-indigo-700 flex items-center justify-center"
            >
              <IconRight/>
            </p>
          </Link>
        )
      }
      {
        user && (
          <Link to='/user-library' className='text-2xl text-indigo-500 flex justify-center items-center '>
            Click here and head over to your library.
            <p 
              className="p-2 mx-2 border border-indigo-600 bg-indigo-600 text-md rounded-full text-white hover:bg-indigo-700 flex items-center justify-center"
            >
              <IconRight/>
            </p>
          </Link>
        )
      }
    </div>
  )
}

export default Home

function IconRight(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
    </svg>
  );
}