
const Card = (props) => {
    return (
    <>
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <img className="img-card" src={props.CardFront} alt="(Front)" />
        </div>
        <div className="flip-card-back">
            <img className="img-card" src={props.CardBack} alt={props.CardBackAlt}/>
        </div>
    </div>
    </>
    );
}

export default Card;