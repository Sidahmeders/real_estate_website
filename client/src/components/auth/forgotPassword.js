import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/forgotPassword/forgotPassword.css'
import { emailCheckout } from '../../reducers/actions/authAction';
import { ContextConsumer } from '../../context';
import ErrorMsg from './errorMsg';
import { showErr } from './errorMsg';


 function ForgotPassword() {

    const context = useContext(ContextConsumer);
    const { dispatchAuth, dispatchErr, auth } = context;
    const [email, setEmail] = useState("");

    const onEmailChange = e => {
        let value = e.target.value;
        setEmail(value);
    };

    const onFormSubmit = e => {
        e.preventDefault();
        emailCheckout(dispatchAuth, dispatchErr, email);
        
        if(!auth.tempToken) {
            setTimeout(() => {
                showErr();
            }, 1500);
        }
    };

    const link = `/resetpassword/${auth.tempToken}`;

    return (
        <div className="forgot-password">
            {auth.tempToken ? (
                <div className="auth-token">
                    <p>Please Check your email for the password Reset Link</p>
                </div>
            ) : 
            (
                <div id="err-msg" className="hide">
                    <ErrorMsg />
                </div>
            )}
            <div className="container">
                <h1>Reset Your Password</h1>
                <form onSubmit={onFormSubmit}>
                    <p>
                        <label>Please provide the email address you used when you signed up</label>
                        <input type="email" name="email" placeholder="email" 
                         autoComplete="off" vlaue={email} onChange={onEmailChange} />
                    </p>
                    <button>SEND EMAIL</button>
                </form>
                <div className="temporary-Email-Link">
                </div>
            </div>
            <Link className="link" to="/login">
            <h1>back to Login</h1>
            </Link>
            <a href={link}>Powered By JWT</a>
        </div>
    );
};

export default ForgotPassword;
