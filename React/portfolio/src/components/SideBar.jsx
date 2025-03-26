import { Link } from "react-router-dom";
import "../components/SideBar.css";
import myIng from '../myImg.png';

// Import Fone awesome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faFaceSmile,faLightbulb,faHandshake} from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  return (
    <div className="side-bar">
      <div>
        <img src={myIng} className="img"/>
        <h2 className="name"><span className="im">I'm </span>YOGENDRA PATIDAR</h2>
        <div className="link-main">
        <Link to="/#" className="link"><FontAwesomeIcon icon={faUser} /> Home</Link>
        <Link to="/about" className="link"><FontAwesomeIcon icon={faFaceSmile} /> About</Link>
        <Link to="/project" className="link"><FontAwesomeIcon icon={faLightbulb} /> Project</Link>
        <Link to="/contact" className="link"><FontAwesomeIcon icon={faHandshake} /> Contact</Link>
        </div>
      </div>
      
    </div>
  );
}

export default SideBar;
