import { SocialIcon } from 'react-social-icons'
const Footer = () => {
    return(
        <footer className='footer-container'>
            <p> Made by Gautam Agarwal </p>
            <div className="footer-icons">
                <SocialIcon url='https://www.linkedin.com/in/gaut2003/' target='_blank'/>
                <SocialIcon url='https://www.instagram.com/agarwal_gautam0203/' target='_blank'/>
                <SocialIcon url='https://github.com/gaut2003' target='_blank'/>
            </div>
            <div className="copyright">
                <p  style={{color: "#95AAB6"}}> 2024 &#169; by gaut2003 </p>
            </div>
        </footer>
    )
}

export default Footer;