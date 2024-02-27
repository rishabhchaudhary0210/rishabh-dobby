
export const Card = ({name, img})=>{
    return (
        <div className="bg-white rounded-md shadow-md py-4 px-6 flex flex-col items-center hover:scale-105 transition border-2 shrink-0">
            <h1 className="capitalize text-xl font-semibold mb-4">
                {name}
            </h1>
            <img src={img} alt={name} 
                className="h-60 w-60 rounded-md"
            />
        </div>
    )
}