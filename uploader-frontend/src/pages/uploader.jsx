import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/use-auth-context";
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import { ButtonLoader } from "../components/button-loader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Uploader = ({ openModal, uploadTick, setUploadTick }) => {

    const { user, dispatch } = useAuthContext();
    const [imageUrl, setImageUrl] = useState("");
    const [newUpload, setNewUpload] = useState({
        name: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const uploadModalRef = useRef(null);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            if (newUpload.name === "" || newUpload.imageUrl === "") {
                toast.error("One or more fields empty.")
                return;
            }
            const formData = new FormData();
            formData.append('name', newUpload.name);
            formData.append('imageUrl', newUpload.imageUrl);
            formData.append('userId', user._id);

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/file/upload`, {
                method: 'POST',
                body: formData,

            })

            const data = await response.json();

            if (!response.ok) {
                console.log("Error", data);
                toast.error(data.error);
            }
            else {
                setUploadTick(!uploadTick);
                console.log("Success", data);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            openModal(false);
            setLoading(false);
        }

        console.log("From Submitted");
    }

    const handleOnChange = (e) => {
        setNewUpload({ ...newUpload, imageUrl: e.target.files[0] })

        const url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url)
    }

    const onClickReset = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setNewUpload({
            ...newUpload, imageUrl: ""
        })
        setImageUrl("");
    }

    useEffect(() => {
        const HandleClickOutside = (e) => {
            if (uploadModalRef.current && !uploadModalRef.current.contains(e.target)) {
                openModal(false);
            }
        }
        document.addEventListener('mousedown', HandleClickOutside);
        return () => { document.removeEventListener('mousedown', HandleClickOutside); };
    }, []);

    return (
        !user ?
            <div className='text-center text-2xl text-zinc-500 pt-10 flex flex-col '>
                Please Login to continue.
                <Link to='/auth/log-in' className='text-indigo-500'>
                    Log-in
                </Link>
            </div>
            :
            <div
                ref={uploadModalRef}
                className="border-2 w-[85vw] sm:w-96 py-10 px-4 flex flex-col items-center justify-center rounded-md shadow-md fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 z-20 bg-white"
            >
                <ToastContainer />
                <h1 className='text-2xl font-bold'>
                    Upload Image
                </h1>
                {imageUrl && <div className="relative my-5">
                    <img src={imageUrl} alt=""
                        className="h-36 w-36 rounded-full"
                    />
                    <button onClick={onClickReset}
                        className="absolute top-0 right-0 bg-rose-500 text-white cursor-pointer p-2 rounded-full"
                    > <IconClose /> </button>
                </div>}
                <form onSubmit={handleSubmit} encType='multipart/form-data' className="flex flex-col items-center w-full mt-2">

                    <div className="w-full">
                        <input
                            ref={fileInputRef}
                            required
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            id=""
                            onChange={handleOnChange}
                            class="h-10 w-full mt-5 p-2 outline-none text-sm text-zinc-900 border border-zinc-300 rounded-lg cursor-pointer bg-zinc-200 focus:outline-none "
                        />
                        <p class="mt-1 text-sm text-zinc-800 ">PNG, JPG or JPEG.</p>
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            className="h-10 w-full my-5 p-2 outline-none focus:border-b-2 border-zinc-500 bg-zinc-200 rounded-md text-md"
                            placeholder="Enter name here"
                            onChange={(e) => setNewUpload({ ...newUpload, name: e.target.value })}
                            value={newUpload.name}
                        />
                    </div>
                    <button type="submit" disabled={loading} className=' mt-4 bg-indigo-700 text-white text-md rounded-md p-2 px-6 hover:bg-indigo-900'>
                        {loading ? <ButtonLoader /> : "Upload"}
                    </button>
                </form>
            </div>
    )
}

function IconClose(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
            <path
                fill="currentColor"
                d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
            />
        </svg>
    );
}