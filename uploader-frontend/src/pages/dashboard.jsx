import React, { useState, useEffect, useRef } from 'react'
import { useAuthContext } from '../hooks/use-auth-context';
import { Card } from '../components/card';

import { Link } from 'react-router-dom';
import { Uploader } from './uploader';

const Dashboard = () => {

    const { user } = useAuthContext();
    
    const [images, setImages] = useState([]);
    const [searchParam, setSearchParam] = useState(""); 
    const [filteredImages, setFilteredImages] = useState([]);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [uploadTick, setUploadTick] = useState(false);

    useEffect(() => {
        const getImages = async () => {
            try {
                console.log(await user);
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/data/all/${user._id}`);

                const data = await response.json();

                if (response.ok) {
                    console.log(data);
                    setImages(data.images);
                }

                if (!response.ok) {
                    console.log(data);
                }
            }
            catch (error) {
                console.log(error);
            }

        }
        getImages();
    }, [user, uploadTick])

    const HandleFilterSearch = (e) => {
        setSearchParam(e.target.value);
        if(images?.length > 0){
            const filteredArray = images.filter((image) => image.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredImages(filteredArray);
        }
    }    

    return (
        !user ?
            <div className='text-center text-2xl text-zinc-500 pt-10 flex flex-col'>
                Please Login to continue.
                <Link to='/auth/log-in' className='text-indigo-500'>
                    Log-in
                </Link>
            </div>
            :
            <div className='min-h-screen w-full pt-4 px-5 sm:px-[10vw]'>
                {openUploadModal && (
                    <Uploader 
                        openModal={setOpenUploadModal} 
                        uploadTick={uploadTick} 
                        setUploadTick={setUploadTick}
                    />)}
                <div className='flex flex-col'>
                    <h1 className='font-bold w-full py-4 text-4xl text-zinc-800 border-b-2'>
                        Hi, {user?.name}
                    </h1>
                    <button 
                        className='text-lg px-4 py-3 bg-indigo-600 text-white cursor-pointer flex items-center justify-center rounded-b-md hover:bg-indigo-900 self-end'
                        onClick={()=>setOpenUploadModal(true)}
                    >
                        <IconSoftwareUpload/>
                        Upload Image
                    </button>
                </div>
                <div className='relative flex items-center justify-center w-full sm:w-2/3 my-5 mx-auto'>
                    <input type="text" name="text" id="text" placeholder='Search here'
                        className='w-full py-3 px-2 text-md placeholder:text-zinc-600 bg-zinc-200 outline-none focus:border-b-4 border-zinc-600'
                        value={searchParam}
                        onChange={HandleFilterSearch}
                    />
                    <IconSearch className='text-xl text-zinc-600 absolute top-1/2 -translate-y-2/4 right-4 cursor-pointer'/>
                </div>
                <div className='flex flex-wrap gap-10 py-6 justify-around'>
                    {
                        searchParam && filteredImages?.length > 0 && filteredImages?.map((image, index) => (
                            <Card key={index}
                                name={image.name}
                                img={image.imageUrl}    
                            />    
                        ))
                    }
                    {
                        images?.length > 0 && !searchParam && images?.map((image, index) => (
                            <Card key={index}
                                name={image.name}
                                img={image.imageUrl}    
                            />
                        ))
                    }
                </div>
                {
                    images?.length == 0 && (
                        <div className='w-full mx-auto text-xl text-zinc-500 text-center'>
                            Uploaded images will be displayed here.
                        </div>
                        )
                    }
                {
                    searchParam && filteredImages?.length === 0 && images.length > 0 && (
                        <div className='w-full mx-auto text-xl text-zinc-500 text-center'>
                            No results found.
                        </div>
                    )
                }
                {openUploadModal && <div className='fixed z-10 top-0 left-0 h-screen w-screen bg-black/20'/>}
            </div>
    )
}

export default Dashboard;


function IconSoftwareUpload(props) {
    return (
      <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
        <path
          fill="currentColor"
          d="M11 14.986a1 1 0 102 0V7.828l3.243 3.243 1.414-1.414L12 4 6.343 9.657l1.414 1.414L11 7.83v7.157z"
        />
        <path
          fill="currentColor"
          d="M4 14h2v4h12v-4h2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z"
        />
      </svg>
    );
  }

  function IconSearch(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
      </svg>
    );
  }