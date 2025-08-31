import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };


  const desktopNavLinkClasses = "text-xl text-[#333] no-underline transition-colors hover:text-green-600 hover:underline";

  const mobileNavLinkClasses = "flex flex-col items-center justify-center text-gray-600 transition-colors hover:text-green-600 w-full pt-3 pb-2";

  return (
    <>
   
      <nav className="flex items-center justify-between bg-gray-300 p-2 shadow-md fixed top-0 left-0 z-50 w-full">
        {/* Logo */}
        <img
            src="https://i.postimg.cc/5NJgcQ2k/Logo-2.png"
            alt="logo"
            className="h-15 w-26 cursor-pointer flex-shrink-0 md:ml-35"
            onClick={() => navigate('/')}
          />

        {/* --- DESKTOP NAVBAR --- */}
        <ul className="hidden list-none items-center gap-5 md:flex mr-5">
          <li>
            <Link to="/" className={desktopNavLinkClasses}>Home</Link>
          </li>
          <li>
            <Link to="/cart" className={desktopNavLinkClasses}>Cart</Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onLogout}
              className="cursor-pointer rounded-md border-none bg-green-600 px-3 py-2 text-white transition-colors hover:bg-green-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* --- MOBILE BOTTOM NAVBAR --- */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] md:hidden">
        <ul className="flex items-center justify-around">
          <li className="flex-1 text-center">
            <Link to="/" className={mobileNavLinkClasses}>
              <FontAwesomeIcon icon={faHome} size="lg" />
              <span className="mt-1 text-xs">Home</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link to="/cart" className={mobileNavLinkClasses}>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              <span className="mt-1 text-xs">Cart</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <button type="button" onClick={onLogout} className={mobileNavLinkClasses}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              <span className="mt-1 text-xs">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;