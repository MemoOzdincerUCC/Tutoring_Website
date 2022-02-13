import React, {useState, useEffect} from 'react';
import keys from "../store/keys";
import {setKey, clearKeys, session, setStringifiedKey} from "../store/actions";
import {connect} from "react-redux";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import utils from '../utils/utils';
import userService from '../services/user';

function Signup({
                    session,
                    setKey,
                    getKey,
                    clearKeys,
                    setStringifiedKey,
                    ...props
                }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subject, setSubject] = useState('');
    const [type, setType] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        clearKeys();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if (!name || name.length === 0) {
            setErrorMessage(`Name is required.`);
            return;
        }

        if (!email || email.length === 0) {
            setErrorMessage(`Email address is required.`);
            return;
        } else {
            if (!utils.isValidEmail(email)) {
                setErrorMessage(`Please provide a valid email address`);
                return;
            }
        }

        if (!password || password.length === 0) {
            setErrorMessage(`Password is required.`);
            return;
        }

        userService.signup(name, email, password, type, subject)
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    setKey(keys.isLoading, false);
                    return;
                }

                if (result.data) {
                    const data = result.data;
                    setErrorMessage('');
                    setSuccessMessage(`Signup successful! Redirecting...`);

                    setKey(keys.isLoggedIn, true);
                    setStringifiedKey(keys.user, data);
                    setKey(keys.showSignup, false);
                }
            });
    }

    return (
        <>
            <Rodal visible={session.showSignup}
                   onClose={() => setKey(keys.showSignup, false)}
                   closeOnEsc={false}
                   closeMaskOnClick={false}
                   customStyles={utils.rodalSmallVertical()}>
                <div className="container-fluid text-center">
                    <h4 className="m-4">Signup</h4>
                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtName">Full name</label>
                                <input type="text" className="form-control"
                                       placeholder="Full name"
                                       onBlur={e => setErrorMessage(``)} id="txtName"
                                       value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtEmail">Email</label>
                                <input type="text" className="form-control"
                                       placeholder="Email"
                                       onBlur={e => setErrorMessage(``)} id="txtEmail"
                                       value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtPassword">Password</label>
                                <input type="password" className="form-control"
                                       placeholder="Password"
                                       onBlur={e => setErrorMessage(``)} id="txtPassword"
                                       value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtType">You want to be a</label>
                                <select className="form-control" id="txtType" value={type} onChange={e => setType(e.target.value)}>
                                    <option value="">Select type</option>
                                    <option value="2">Student</option>
                                    <option value="1">Teacher</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {
                        type === "1" &&
                        <div className="row">
                            <div className="col text-left">
                                <div className="form-group">
                                    <label htmlFor="txtSubject">Subject</label>
                                    <input type="text" className="form-control"
                                           placeholder="Subject name"
                                           onBlur={e => setErrorMessage(``)} id="txtSubject"
                                           value={subject} onChange={e => setSubject(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}>Signup</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group text-left mt-20">
                                Already have account?
                                <button type="button" className="btn btn-link"
                                        onClick={e => {
                                            setKey(keys.showSignup, false);
                                            setKey(keys.showLogin, true)
                                        }}>Login here</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Rodal>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);