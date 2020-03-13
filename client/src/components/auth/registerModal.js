import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../reducers/actions/authAction';
import { ContextConsumer } from '../../context';
import '../auth/styles/register/register.css';
import ErrorMsg from './errorMsg';
import { showErr } from './errorMsg';


function Register() {

    const context = useContext(ContextConsumer);
    const { dispatchAuth, dispatchErr, auth } = context;

    const [registerModal, setRegisterModal] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        password2: "",
        userType: "not specified",
        isWaiting: false
    });

    const onUserDetailsChange = e => {
        let value = e.target.value;
        setRegisterModal({
            ...registerModal,
            [e.target.name]: value
        });
    };

    const onFormSubmit = e => {
        e.preventDefault();

        setRegisterModal(() => {
            return {
                ...registerModal,
                isWaiting: true
            }
        });
        setTimeout(() => {
            setRegisterModal(() => {
                return {
                    ...registerModal,
                    isWaiting: false
                }
            });
            showErr();
        },4000);

        const {name, phoneNumber, email, password, password2, userType} = registerModal;
        const newUser = {name, phoneNumber, email, password, password2, userType};
        registerUser(newUser, dispatchAuth, dispatchErr);
    };

    return (
        <div className="register">
            <div className="register-modal">
                <div className="register-svg">
                    <div className="register-svg-svg">
                    </div>
                    <p>
                      your data is safe and secure with JWT 
                    </p>
                </div>
                <div className="register-form">
                    <div id="err-msg" className="hide">
                        <ErrorMsg /> 
                    </div>
                    <h2>Register</h2>
                    <form onSubmit={onFormSubmit}>
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" placeholder="fullName" 
                            value={registerModal.name} onChange={onUserDetailsChange}/>
                        </div>
                        <div>
                            <label>Phone</label>
                            <input type="number" name="phoneNumber" placeholder="phoneNumber"
                            value={registerModal.phoneNumber} onChange={onUserDetailsChange}/>
                        </div>
                        <div> 
                            <label>Email</label>
                            <input type="email" name="email" placeholder="email"
                            value={registerModal.email} onChange={onUserDetailsChange}/>
                        </div>
                        <div>
                            <label>Pasword</label>
                            <input type="password" name="password" placeholder="password" 
                            value={registerModal.password} onChange={onUserDetailsChange}/>
                        </div>
                        <div>
                            <label></label>
                            <input type="password" name="password2" placeholder="confirm your password" 
                            value={registerModal.password2} onChange={onUserDetailsChange}/>
                        </div>
                        <div>
                            <label>UserType</label>
                            <select value={registerModal.userType} onChange={onUserDetailsChange} name="userType">
                                <option>Home Buyer</option>
                                <option>Home Seller</option>
                                <option>Renter</option>
                                <option>Both Buyer&Seller</option>
                            </select>
                        </div>
                        {!registerModal.isWaiting ?
                        (
                        !auth.token ?
                            (<button>Register</button>) 
                            :
                            (<a href="/">Back Home</a>)
                        ) :
                        (<p>please wait...</p>)
                        }
                    </form> 
                </div>
                <div className="house-svg">
                    <p>
                      Add Update and Remove your House
                    </p>
                    <div className="house-svg-svg">
                    </div>
                </div>
            </div>
            <div className="link">
                <span>have an Account? </span>
                <Link className="link" to="/login">Login</Link>
            </div>
           
        </div>
    );
};

export default Register;
