import React, { useState, useContext } from 'react';
import './styles/resetPassword/resetPassword.css'
import { passwordReset } from '../../reducers/actions/authAction';
import { ContextConsumer } from '../../context';
import { useLocation } from 'react-router';
import ErrorMsg from './errorMsg';
import { showErr } from './errorMsg';


 function ResetPassword() {

    const context = useContext(ContextConsumer);
    const { dispatchAuth ,dispatchErr } = context;

    const location = useLocation();
    const pathName = location.pathname;

    const [passwords, setPasswords] = useState({
        password: "",
        password2: ""
    });

    const onPasswordChange = e => {
        let value = e.target.value;

        setPasswords({
            ...passwords,
            [e.target.name]: value
        });
    };

    const onFormSubmit = e => {
        e.preventDefault();
        passwordReset(dispatchAuth ,dispatchErr, pathName, passwords);
        
        setTimeout(() => {
            showErr();
        }, 500);
    };

    return (
        <div className="reset-password">
            <div id="err-msg" className="hide">
                <ErrorMsg />
            </div>
            <div className="container">
                <h1>please enter your new password</h1>
                <form onSubmit={onFormSubmit} action="/resetpassword" method="POST">
                    <p>
                        <input type="password" name="password" placeholder="your new password" 
                        vlaue={passwords.password} onChange={onPasswordChange} />
                    </p>
                    <p>
                        <input type="password" name="password2" placeholder="confirm your password" 
                        vlaue={passwords.password2} onChange={onPasswordChange} />
                    </p>
                    <button>Submit my New Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
