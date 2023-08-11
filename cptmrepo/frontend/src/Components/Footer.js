// Ali Moulton

import {useRef} from "react";
// import {FaBars, FaTimes} from "react-icons/fa"
import "../Styles/main.css";
import "../Styles/Footer.css";

function Footer() {
    const navRef = useRef();

    return (
        <footer>
            <div className ="ft" ref={navRef}>
                <hr></hr>
                    <a href="/#">  2023 Polaris Inc.</a>
                    <a href="/#"> Site Map</a>
                    <a href="/#" > Privacy</a>
                    <a href="/#"> Terms </a>
                    <a href="/#"> Accessibility</a>
                    <a href="/#"> Trademarks</a>
                 

            </div>
           
        </footer>
     );
}
export default Footer;