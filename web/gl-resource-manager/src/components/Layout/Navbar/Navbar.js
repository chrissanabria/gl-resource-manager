import './Navbar.css';
import logo from '../../../logo.png';


function Navbar() {
  return (
    <>
      <div className="Navbar">
        <div className="Links">
          <a href='/'><img src={logo} alt='logo'></img></a>
          <a href="/resources">Resources</a>
          <a href="/myaccount">My Account</a>
        </div>
        <div>
          <a href='/'>Logout</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;