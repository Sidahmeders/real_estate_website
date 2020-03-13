import React, { useState, useContext } from 'react';
import { passwordReset } from '../../reducers/actions/authAction';
import { ContextConsumer } from '../../context';
import { useLocation } from 'react-router';


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
    };

    return (
        <div className="reset-password">
            <h1 style={{color:"red", fontWeight:"200", textAlign:"center"}}>Reset Password</h1>

            <form onSubmit={onFormSubmit} action="/resetpassword" method="POST">
                <label>Reset your Password</label>
                <input type="password" name="password" placeholder="reset your password" 
                vlaue={passwords.password} onChange={onPasswordChange} />
                <label>Confirm your Password</label>
                <input type="password" name="password2" placeholder="confirm your password" 
                vlaue={passwords.password2} onChange={onPasswordChange} />
                <button>Submit my New Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
