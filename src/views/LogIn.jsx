import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
const LogIn = () => {
    const [name, setName] = useState('');
    const history = useHistory();

    const handleChange = (event) => {
        setName(event.target.value);
      };
    
    const startGame = () => {
        if(name !== '') {
            history.push('/game');
            window.location.reload();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                width: 400,
                text: `Debes ingresar tu nombre para continuar.`,
                confirmButtonText: 'Ok',
              })
        }
    } 

      useEffect(() => {
        localStorage.setItem('name', name);
      }, [name]);
    return (
        <>
            <div className="section">
                <div className="container" >
                    <h1 className="title pt-3"> Memory</h1>
                    <p className="subtitle">El <span className="text-span">juego</span> donde se pone a prueba tu <span className="text-span">Memoria</span>.</p>
                    <div className="container form-section col-9 col-md-6 py-4">
                        <form>
                            <p className="text-white"></p>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => handleChange(e)}  placeholder="Enter your Name" name="name" />
                                <label htmlFor="name">Nombre y Apellido*</label>
                            </div>
                            <div className="text-end">
                                <a className="btn btn-success px-5" onClick={startGame}>Jugar</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LogIn;