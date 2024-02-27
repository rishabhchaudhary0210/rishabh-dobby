import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/use-auth-context";
import { useNavigate } from "react-router-dom";

export const Uploader = ()=>{

    const { user, dispatch } = useAuthContext();
    const [imageUrl, setImageUrl] = useState("");
    const [newUpload, setNewUpload] = useState({
        name: "",
        imageUrl: "",
    })
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', newUpload.name);
            formData.append('imageUrl', newUpload.imageUrl);
            formData.append('userId', user._id);
              
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/file/upload`, {
                method: 'POST',
                body: formData,
                
            })

            const data = await response.json();

            if(!response.ok){
                console.log("Error", data);
            }
            else{
                console.log("Success", data);
            }
        }
        catch(error){
            console.log(error);
        }

        console.log("From Submitted");
    }

    const handleOnChange = (e)=>{
        //make url object /CHECK MEDIUM OR OTHER DOCS
        setNewUpload({...newUpload, imageUrl:e.target.files[0]})

        const url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url)
    }
    const onClickReset = ()=>{
        setNewUpload({
            ...newUpload, imageUrl:""
        })
        setImageUrl("");
    }

    useEffect(()=>{
        if(!user){
            
        }
    },[user]);

    return (
        !user ? 
        <div>
            Not Logged in.
        </div> 
        :
        <div>
            <img src={imageUrl} alt="" />
            <button onClick={onClickReset}> X </button>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                
                <div>   
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="image" 
                        id="" 
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        onChange={(e) => setNewUpload({...newUpload, name:e.target.value})}
                        value={newUpload.name}
                    />
                </div>
                <button type="submit">
                    Submit Form
                </button>
            </form>
        </div>
    )
}