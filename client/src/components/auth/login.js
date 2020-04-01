import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles/login/login.css';
import { ContextConsumer } from '../../context';
import { loginUser } from '../../reducers/actions/authAction';
import ErrorMsg from './errorMsg';
import { showErr } from './errorMsg';


function LoginModal() {

    const context = useContext(ContextConsumer);
    const {dispatchAuth, dispatchErr} = context;

    const [loginModal, setLoginModal] = useState({
        email: "",
        password: "",
        isWaiting: false
    });

    const onUserDetailsChange = e => {
        let value = e.target.value;
        setLoginModal({
            ...loginModal,
            [e.target.name]: value
        });
    };

    const onFormSubmit = e => {
        e.preventDefault();
         
        setLoginModal(() => {
            return {
                ...loginModal,
                isWaiting: true
            }
        });
        const {email, password} = loginModal;
        const user = {email, password};
        loginUser(user, dispatchAuth, dispatchErr);
        setTimeout(() => {
            setLoginModal(() => {
                return {
                    email: "",
                    password: "",
                    isWaiting: false
                }
            });
            showErr();
        },3000);    
    };

    return (
        <div className="login-modal">
            <div className="login-form">
                <div id="err-msg" className="hide">
                    <ErrorMsg />
                </div>
                <h2>Login</h2>
                <div className="login-svg"></div>
                <form className="login-modal" onSubmit={onFormSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="email"
                        value={loginModal.email} onChange={onUserDetailsChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="password"
                        value={loginModal.password} onChange={onUserDetailsChange} />
                    </div>
                    {!loginModal.isWaiting ? 
                    (
                        <button>Login</button>
                    ) : 
                    (
                        <p>please wait...</p>
                    )}
                </form>
            </div>
            <div>
                <Link className="forgot-password" to="/forgotpassword">
                    <div className="forgot-password-svg">
                    </div>
                    <p>forgot password?</p>
                </Link>
            </div>
            <div className="link">
                <span>Don't have an Account </span>
                <Link className="link" to="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginModal;
