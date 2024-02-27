import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Context } from "../store/appContext";
import congrats from "../assets/img/congrats.avif";
import cardFront from "../assets/img/background_back_card.jpeg";
import Swal from 'sweetalert2'

const MemoriceGame = () => {
    const { actions, store } = useContext(Context);
    const [twoCard, setTwoCard] = useState([]);
    const [aciertos, setAciertos] = useState(0);
    const [errores, setErrores] = useState(0);
    const history = useHistory();

    const handleClick = (id) => {
        let twoCardArray = [...twoCard]
        if( aciertos !== 6) {
            let currentCardTouched = twoCard.filter((card) => card.id === id);
            store.allImages.forEach((item) => {
                if(item.id === id && !item.found && currentCardTouched.length === 0) {
                 item.flipped = !item.flipped; 
                 twoCardArray.push(item);
                }
             })
             setTwoCard(twoCardArray);
     
             if(twoCardArray.length === 2 && twoCardArray[0].id !== twoCardArray[1].id){
                 checkMatches(twoCardArray);
                 twoCardArray = [];
                 setTwoCard(twoCardArray);
             }
        }
    };

    const  checkMatches = (cardArray) =>{
        if(cardArray[0].meta.name === cardArray[1].meta.name) {
            store.allImages.forEach((item) => {
                if(item.id === cardArray[0].id || item.id === cardArray[1].id){
                    item.found = true; 
                }
            })
            setAciertos(aciertos+1);
            if (aciertos === 5) {
                Swal.fire({
                    title: '¡Felicidades!',
                    text: `Felicidades ${localStorage.getItem('name')} has ganado el juego.`,
                    imageUrl: congrats,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    confirmButtonText: 'Volver a jugar',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                  });
            }
        } else {
            setErrores(errores + 1);
            store.allImages.forEach((item) => {
                if(item.id === cardArray[0].id || item.id === cardArray[1].id){
                    setTimeout(()=> {
                        item.flipped = !item.flipped; 
                    }, 100)
                }

            })
        }
    }

    useEffect(() => {
        async function getAllImages() {
            await actions.getAllImages(6);
            let currentImages = [];
            store.allImages.map((item, index) => {
                currentImages.push({
                    ...item,
                    flipped: false,
                    id: item.meta.uuid+index,
                    found: false,
                })
            })
            store.allImages = currentImages;
        }
        function getName() {
            if(localStorage.getItem('name') === '') {
                history.push('/');
            }
        }
        getName();
        getAllImages();
    },[]);

    return (
        <>
        {
            store.allImages !== null ?
                <div className="section">
                    <div className="container row">
                        <div className="col-12 col-md-6">
                            <h1 className="titleGame"> Memory</h1>
                        </div>
                        <div className="col-12 col-md-6 my-auto">
                            <div className="container section-points text-center py-3">
                                <div className="row">
                                    <div className="card bg-danger col-5 mx-auto text-white">
                                        Errores
                                        <span className="fs-2 fw-bold">{errores}</span>
                                    </div>
                                    <div className="card bg-success col-5 mx-auto text-white">
                                        Aciertos
                                        <span className="fs-2 fw-bold">{aciertos}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">

                            {store.allImages.map((item) => (
                                <>
                                    <div key={item.id} className={`col-4 col-md-3 mb-3 flip-card ${item.flipped ? 'is-flipped' : ''}`} onClick={ (e) => handleClick(item.id)}>
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                            <img className="img-card" src={cardFront} alt="(Front)" />
                                            </div>
                                            <div className="flip-card-back">
                                                <img className="img-card" src={item.fields.image.url} alt={item.fields.image.title}/>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                
            :
            
            <> 
            <div className="section">
                <h1 className="title">Loading <span className="spinner-grow spinner"></span></h1>
            </div>
            </>
        }
        </>
    );
};

export default MemoriceGame;