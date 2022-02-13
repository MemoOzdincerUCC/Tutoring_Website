import React from 'react';
import {NavLink} from 'react-router-dom';
import keys from '../store/keys';
import {setKey, getKey, clearKeys, setStringifiedKey} from '../store/actions';
import {connect} from "react-redux";
import {swalUploadImage} from "../utils/swal";
import userService from '../services/user';

function Header({
                    session,
                    setKey,
                    clearKeys,
                    setStringifiedKey,
                    ...props
                }) {

    const handleLogout = e => {
        e.preventDefault();

        setTimeout(() => {
            clearKeys();
            setKey(keys.isLoggedIn, false);
            window.location.href = "/";
        }, 500);
    }

    const handleChangeImage = e => {
        e.preventDefault();
        swalUploadImage(file => {
            userService.updatePicture(file, session.user._id)
                .then(result => {
                    setStringifiedKey(keys.user, result.data);
                });
        });
    }

    return (
        <div className="main-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <i className="fas fa-graduation-cap" style={{marginRight: 10}}></i>
                    UCC Tutors
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        session.isLoggedIn !== true &&
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">Search Teachers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/help">Help</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="#"
                                         onClick={() => setKey(keys.showSignup, true)}>Signup</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="#"
                                         onClick={() => setKey(keys.showLogin, true)}>Login</NavLink>
                            </li>
                        </ul>
                    }
                    {
                        session.isLoggedIn === true && session.user &&
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/help">Help</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">Teachers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chat">Messages</NavLink>
                            </li>
                            <li className="nav-item dropdown li-username-header">
                                <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                      style={{cursor: 'pointer'}}>
                                    <img id="img-circle-header" className="img-circle-header"
                                         src={`${process.env.REACT_APP_API_URL}/${session.user.imageUrl}`} onClick={handleChangeImage} />
                                    {session.user.name}
                                </span>
                                <div className="dropdown-menu dropdown-menu-right user-dropdown"
                                     aria-labelledby="navbarDropdownMenuLink">
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        <i className="fa fa-sign-out-alt" style={{marginRight: 10}}></i>
                                        Logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    }
                </div>
            </nav>
        </div>
    );
}

const mapStateToProps = store => ({
    session: store.session
});

const mapDispatchToProps = dispatch => ({
    setKey: (key, value) => dispatch(setKey(key, value)),
    clearKeys: () => dispatch(clearKeys()),
    setStringifiedKey: (key, value) => dispatch(setStringifiedKey(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);