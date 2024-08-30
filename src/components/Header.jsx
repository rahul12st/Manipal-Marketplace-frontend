import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import logo from "../components/logo.png";

function Header(props) {

    const [loc, setLoc] = useState(null);
    const [showOver, setShowOver] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    let locations = [
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "New Delhi, Delhi"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Mumbai, Maharashtra"
        },
    ];

    return (
        <header className='header-container'>
            <div className="header-left">
                <Link to="/" className="logo1">
                    <img src={logo} alt="Manipal Marketplace" />
                </Link>
                <select className="location-select" value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value);
                    setLoc(e.target.value);
                }}>
                    {locations.map((item, index) => (
                        <option key={index} value={`${item.latitude},${item.longitude}`}>{item.placeName}</option>
                    ))}
                </select>
            </div>

            <div className="header-center">
                <input
                    className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
                    placeholder="Search for products..."
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}>
                    <FaSearch />
                </button>
            </div>

            <div className="header-right">
                <FaUserCircle className="user-icon" onClick={() => setShowOver(!showOver)} />

                {showOver && <div className="dropdown-menu">
                    {!!localStorage.getItem('token') &&
                        <>
                            <Link to="/add-product" className="dropdown-item">Sell Product</Link>
                            <Link to="/liked-products" className="dropdown-item">Favourites</Link>
                            <Link to="/my-products" className="dropdown-item">My Ads</Link>
                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                        </>
                    }
                    {!localStorage.getItem('token') &&
                        <Link to="/login" className="dropdown-item">Login</Link>
                    }
                </div>}
            </div>
        </header>
    );
}

export default Header;
