import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles/login/login.css';
import { ContextConsumer } from '../../context';
import { loginUser } from '../../reducers/actions/authAction';
import ErrorMsg from './errorMsg';
import { showErr } from './errorMsg';


function LoginModal() {

    const context = useContext(ContextConsumer);
    const {dispatchAuth, dispatchErr, auth} = context;

    const [loginModal, setLoginModal] = useState({
        email: "",
        password: ""
    });

    const onUserDetailsChange = e => {
        const value = e.target.value;
        setLoginModal({
            ...loginModal,
            [e.target.name]: value
        });
    };

    const onFormSubmit = e => {
        e.preventDefault();
        
        const {email, password} = loginModal;
        const user = {email, password};
        loginUser(user, dispatchAuth, dispatchErr);
        setTimeout(() => {
            setLoginModal(() => {
                return {
                    email: "",
                    password: ""
                }
            });
        },2500);
        showErr();
    }

    return (
        <div className="login-modal">
            <h2>Login</h2>
            <div className="login-svg"></div>
            <form className="login-modal" onSubmit={onFormSubmit}>
                <label>Email</label>
                <input type="email" name="email" placeholder="email"
                  value={loginModal.email} onChange={onUserDetailsChange} />
                <label>Password</label>
                <input type="password" name="password" placeholder="password"
                  value={loginModal.password} onChange={onUserDetailsChange} />
                <button>Login</button>
            </form>
            <Link to="/register">Register</Link>
            <div id="err-msg" className="hide">
                <ErrorMsg />
            </div>
        </div>
    );
};

export default LoginModal;
