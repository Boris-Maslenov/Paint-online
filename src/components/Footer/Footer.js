import './footer.css';

const Footer = () => {

    return (
        <div className="footer">
            <div className="container container__flex">
               <span> <a style={{'color': '#fff'}} href="https://github.com/Boris-Maslenov/paint-online" target="_blank">GitHub</a> </span>
               <span><a style={{'color': '#fff'}} href="mailto:ya.maslenov@ya.ru" target="_blank">Обратная связь</a></span>
            </div>
       </div>
    )
    
}

export default Footer;