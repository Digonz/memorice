import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Context } from "../store/appContext";
import congrats from "../assets/img/congrats.avif";
import cardFront from "../assets/img/background_back_card.jpeg";
import Swal from 'sweetalert2'
import Cards from "../components/Cards/Card";
import Card from "../components/Cards/Card";
import CardPoints from "../components/Cards/CardPoints";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

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
            //If the total number of correct answers still does not reach 6, 
            //the game continues and they are added to the twoCard array
            //while they are flipped.
            store.allImages.forEach((item) => {
                if(item.id === id && !item.found && currentCardTouched.length === 0) {
                 item.flipped = !item.flipped; 
                 twoCardArray.push(item);
                }
             })
             setTwoCard(twoCardArray);
             if(twoCardArray.length === 2 && twoCardArray[0].id !== twoCardArray[1].id){
                 checkMatches(twoCardArray);
             }
        }
    };

    const  checkMatches = (cardArray) =>{
        if(cardArray[0].meta.name === cardArray[1].meta.name) {
            console.log("IGUALE");
            // If the cards match, set the "found" status to true for both cards
            store.allImages.forEach((item) => {
                if(item.id === cardArray[0].id || item.id === cardArray[1].id){
                    item.found = true; 
                }
            })
            setTwoCard([]);
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
                    confirmButtonColor: '#1a8754'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        getAllImages();
                    }
                  });
            }
        } else {
            //If the cards don't match, increase the error counter and then flip the cards again after a while
            setErrores(errores + 1);
            console.log("NEXT");
            setTimeout(() => {
            store.allImages.forEach((item) => {
                if (item.id === cardArray[0].id || item.id === cardArray[1].id) {
                item.flipped = false;
                }
            });
            setTwoCard([]);
            }, 500);
        }
    }

    // Function to obtain images from modyo API
    async function getAllImages() {
        await actions.getAllImages(6);
        let currentImages = [];
        // Setting the array of images to add flipped, id, found
        store.allImages.map((item, index) => {
            currentImages.push({
                ...item,
                flipped: false,
                id: item.meta.uuid+index,
                found: false,
            })
        })
        store.allImages = currentImages;
        setErrores(0);
        setAciertos(0);
    }

    useEffect(() => {
        // function to return to the login if the name is not saved
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
                    <Header 
                        errores={errores}
                        aciertos={aciertos}
                    />
                    <div className="container">
                        <div className="row">
                            {store.allImages.map((item) => (
                                <>
                                    <div key={item.id} className={`col-4 col-md-3 mb-3 flip-card ${item.flipped ? 'is-flipped' : ''}`} onClick={ (e) => handleClick(item.id)}>
                                        <Card 
                                            CardFront={cardFront} 
                                            CardBack={item.fields.image.url} 
                                            CardBackAlt={item.fields.image.title} 
                                        />
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                
            :
            
            <> 
            <Loading />
            </>
        }
        </>
    );
};

export default MemoriceGame;