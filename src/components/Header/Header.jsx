import CardPoints from "../Cards/CardPoints";

const Header = (props) => {
    return(
        <>
            <div className="container row">
                <div className="col-12 col-md-6">
                    <h1 className="titleGame"> Memory</h1>
                </div>
                <div className="col-12 col-md-6 my-auto">
                    <div className="container section-points text-center py-3">
                        <div className="row">
                            <CardPoints
                                background={'bg-danger'}
                                Title={'Errores'}
                                point={props.errores} 
                            />
                            <CardPoints 
                                background={'bg-success'}
                                Title={'Aciertos'}
                                point={props.aciertos} 
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Header;