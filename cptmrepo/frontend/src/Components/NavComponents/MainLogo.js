// Ali Moulton
import { Link } from "react-router-dom";
import LogoImg from "../../Images/new-logo.png";
import "../../Styles/main.css";
import "../../Styles//NavStyles/MainLogo.css";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory({ forceRefresh: true });

function goHome() {
  history.push("/");
}

function MainLogo() {
  return (
    <div className="logo main-logo">
      <Link to="/">
        <img src={LogoImg} alt="Polaris Logo" onClick={goHome} />
      </Link>
      {/* removed height = 30px */}
    </div>
  );
}

export default MainLogo;
