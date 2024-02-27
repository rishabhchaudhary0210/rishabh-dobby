import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/use-auth-context';
import { Card } from '../components/card';

const Dashboard = () => {

    const [images, setImages] = useState([]);
    const { user } = useAuthContext();

    useEffect(()=>{
        const getImages = async ()=>{
            try{    
                console.log(await user);
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/data/all/${user._id}`);
                
                const data = await response.json();
                
                if(response.ok){
                    console.log(data);
                    setImages(data.images);
                }

                if(!response.ok){
                    console.log(data);
                }
            }
            catch(error){
                console.log(error);
            }
                
        }
        getImages();
    }, [user])

    return (
        !user?
        <div>
            User not logged in.
        </div>
        :
        <div className=''>
            <h1>
                Hi, {user?.name}
            </h1>
            <div>
                SEARCH BAR
            </div>
            <div>
                {
                    images?.length > 0 && images?.map((image,index) => (
                        <Card key={index}
                            name={image.name}
                            img={image.imageUrl}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard