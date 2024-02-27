import { useEffect } from "react";

const Error = () => {

    useEffect(() => {
        function  handleError() {
            if(localStorage.getItem('name') === '') {
                window.location.replace('/');
            } else {
                window.location.replace('/game');
            }
        }
        handleError();
    } , []);

    return(<></>);
};
export default Error;