
const CardPoints = (props) => {
    return(
    <>
     <div className={`card ${props.background} col-5 mx-auto text-white`}>
        {props.Title}
        <span className="fs-2 fw-bold">{props.point}</span>
    </div>
    </>
    );
}
export default CardPoints;
