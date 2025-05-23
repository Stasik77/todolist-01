
type ButtonType = {
    title: string,
    onClick?:()=>void
}

export const Button = (props:ButtonType)=>{
    return (
        <button onClick={props.onClick}>{props.title}</button>
    )

}