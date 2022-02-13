import React, { useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import keys from "../store/keys";
import { setKey, clearKeys, session, setStringifiedKey } from "../store/actions";
import { connect } from "react-redux";
import {swalSuccess} from '../utils/swal';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import utils from '../utils/utils';
import userService from '../services/user';

function Meeting({
                   session,
                   setKey,
                   setStringifiedKey,
                   getKey,
                   clearKeys,
                   ...props
               }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if(!session.meetingToId) {
            setErrorMessage(`Could not fetch the ID. Please try again.`);
            return;
        }
        if (!title || title.length === 0) {
            setErrorMessage(`Title address is required.`);
            return;
        }
        if (!date) {
            setErrorMessage(`Date is required.`);
            return;
        }
        if (!link) {
            setErrorMessage(`Meeting link is required.`);
            return;
        }

        userService.bookMeeting({
            meetingToId: session.meetingToId,
            senderId: session.user._id,
            title: title,
            date: date,
            link: link
        })
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                swalSuccess(`Invitation is sent successfully.`);
                setKey(keys.showMeeting, false);
            });
    }

    return (
        <Rodal visible={session.showMeeting}
               onClose={() => setKey(keys.showMeeting, false)}
               closeOnEsc={false}
               closeMaskOnClick={false}
               customStyles={utils.rodalSmallVertical()}>
            <div className="container-fluid text-center">
                <form onSubmit={handleSubmit}>
                    <h4 className="m-4">Book a Meeting</h4>
                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtTitle">Title</label>
                                <input type="text" className="form-control"
                                       placeholder="Title" required="required"
                                       onBlur={e => setErrorMessage(``)} id="txtTitle"
                                       value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtDate">Date & Time</label>
                                <input type="datetime-local" className="form-control"
                                       placeholder="Date" required="required"
                                       onBlur={e => setErrorMessage(``)} id="txtDate"
                                       value={date} onChange={e => setDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-left">
                            <div className="form-group">
                                <label htmlFor="txtLink">Meeting link</label>
                                <input type="text" className="form-control"
                                       placeholder="Link" required="required"
                                       onBlur={e => setErrorMessage(``)} id="txtLink"
                                       value={link} onChange={e => setLink(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        </div>
                    </div>

                    <div className="row mt-30">
                        <div className="col">
                            <button type="submit" className="btn btn-primary"
                                    onClick={handleSubmit}>Send Invite</button>
                        </div>
                    </div>
                </form>
            </div>
        </Rodal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);