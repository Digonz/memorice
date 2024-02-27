const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <>
            <footer className="text-white footer poke-text"> 
                <div className="footer-text"  >
                Copyrights © {year}. Creado con ❤️ por <a className="mx-1 link" href="https://digonz.github.io/portfoliodigonz/" target="_blank"  rel="noreferrer"> Digonz</a>.
                </div> 
            </footer>
        </>
    );
};

export default Footer;
