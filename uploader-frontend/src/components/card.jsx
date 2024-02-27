
export const Card = ({name, img})=>{
    return (
        <div>
            <img style={{height: "100px", width: "100px"}} src={img} alt={name} />
            <h1>
                {name}
            </h1>
        </div>
    )
}