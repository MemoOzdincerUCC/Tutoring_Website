import React, {useState} from 'react';
import conversationService from '../services/conversation';
import userService from '../services/user';
import {swalInfo} from '../utils/swal';
import {connect} from "react-redux";
import keys from "../store/keys";
import {setKey, clearKeys, session, setStringifiedKey} from "../store/actions";
import { Redirect } from 'react-router';

function User({
    session,
    setKey,
    getKey,
    clearKeys,
    setStringifiedKey,
    ...props
}) {

    const [redirectTo, setRedirectTo] = useState(null);
    const handleStartChat = id => {
        if(!session.isLoggedIn) {
            setKey(keys.showLogin, true);
            return;
        }

        if (id === session.user._id) {
            swalInfo(`You cannot chat with yourself.`);
            return;
        }

        conversationService.create([
            id,
            session.user._id
        ]).then(result => {
            if (result.data) {
                setKey(keys.startConversation, result.data._id);
            }
        });

        setRedirectTo(`/chat`);
    }

    const handleShowMeeting = id => {
        if(!session.isLoggedIn) {
            setKey(keys.showLogin, true);
            return;
        }
        if (id === session.user._id) {
            swalInfo(`You cannot set meeting with yourself.`);
            return;
        }

        setKey(keys.meetingToId, id);
        setKey(keys.showMeeting, true);
    }

    return (
        <div className="card user text-center">
            {redirectTo && <Redirect to={redirectTo} />}
            <img className="user-circle-header"
                 src={`${process.env.REACT_APP_API_URL}/${props.data.imageUrl}`} />
            {props.data.name} <br/>
            <span className="subject">{props.data.subject}</span>
            <button className="btn btn-sm btn-primary mt-10" onClick={e => handleStartChat(props.data._id)}>Start Chat</button>
            <button className="btn btn-sm btn-outline-info mt-10" onClick={e => handleShowMeeting(props.data._id)}>Book a Meeting</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(User);