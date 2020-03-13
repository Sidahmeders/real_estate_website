import React, { useState, useContext } from 'react';
import { emailCheckout } from '../../reducers/actions/authAction';
import { ContextConsumer } from '../../context';


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
    };

    const link = `/resetpassword/${auth.tempToken}`;

    return (
        <div className="forgot-password">
            <h1 style={{color:"red", fontWeight:"200", textAlign:"center"}}>Forgot Password</h1>

            <form onSubmit={onFormSubmit}>
                <label>Enter your Email</label>
                <input type="email" name="email" placeholder="email" 
                vlaue={email} onChange={onEmailChange} />
                <button>Submit</button>
            </form>
            <div className="temporary-Email-Link">
            </div>
            <a href={link}>Reset link</a>
        </div>
    );
};

export default ForgotPassword;
