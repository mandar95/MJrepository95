import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(prop) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" style={{ 'margin': 'auto' }}><span className="my-logo">W</span>Reader</a>
            <div className="collapse navbar-collapse" id="navbm" style={{ 'display': 'block' }}>
                <ul className="navbar-nav mr-auto text-center">
                    {/* <li className="nav-item">
                        <Link to="/" className="nav-link">5 Days forecast data</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Hourly data</Link>
                    </li> */}
                </ul>
                <div>
                    <input type="text"
                        className="form-control mr-sm-2 my-searchbar"
                        placeholder="Search..."
                        spellCheck="false"
                        onChange={(e) => prop.changeCity(e)}
                        value={prop.cname}
                        onKeyPress={(e) => prop.getData(e)} />
                </div>
            </div>
        </nav>
    )
}
