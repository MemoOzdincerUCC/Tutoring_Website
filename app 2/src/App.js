import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { setKey, getKey, clearKeys } from './store/actions';
import './App.css';
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const Login = React.lazy(() => import('./components/Login'));
const Meeting = React.lazy(() => import('./components/Meeting'));
const Loading = React.lazy(() => import('./components/Loading'));
const Signup = React.lazy(() => import('./components/Signup'));
const Chat = React.lazy(() => import('./components/Chat'));
const Users = React.lazy(() => import('./components/Users'));
const About = React.lazy(() => import('./components/About'));
const Home = React.lazy(() => import('./components/Home'));
const ContactUs = React.lazy(() => import('./components/ContactUs'));
const Help = React.lazy(() => import('./components/Help'));

function App({
    session,
    setKey
}) {

    return (
        <BrowserRouter>
            {session.isLoading && <Loading />}
            {session.showLogin && <Login />}
            {session.showMeeting && <Meeting />}
            {session.showSignup && <Signup />}
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/chat' component={Chat} />
                <Route exact path='/contact' component={ContactUs} />
                <Route exact path='/help' component={Help} />
            </Switch>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

const mapStateToProps = store => ({
    session: store.session
});

const mapDispatchToProps = dispatch => ({
    setKey: (key, value) => dispatch(setKey(key, value)),
    getKey: key => dispatch(getKey(key)),
    clearKeys: () => dispatch(clearKeys())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
