import React, { useState, useContext } from 'react';
import { registerUser } from '../../reducers/actions/authAction';
import { ContextConsumer } from '../../context';
import '../auth/styles/register/register.css';
import ErrorMsg from './errorMsg';


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
        const value = e.target.value;
        setRegisterModal({
            ...registerModal,
            [e.target.name]: value
        });
    };

    const onFormSubmit = e => {
        e.preventDefault();

        registerModal.isWaiting = true;
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

    const showErr = () => {
        document.getElementById('err-msg').classList.remove("hide");
        setTimeout(() => {
            document.getElementById('err-msg').classList.add("hide");
        },4000);
    };

    return (
        <div className="register">
            <div className="register-svg"></div>
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
                        (
                          <button>Register</button>
                        ) :
                        (
                          <a href="/" style={{
                              border:"2px solid green",
                              textDecoration:"none",
                              color: "green",
                              padding:"3px 10px",
                              fontSize: "18px",
                              fontWeight:"bold"
                          }}>
                            Back Home
                          </a>
                        )
                      ) :
                      (
                        <p style={{
                            color:"green",
                            fontSize:"20px",
                            border:"1px solid green",
                            borderRadius:"3px",
                            padding:"5px 30px",
                            display: "inline-block"
                        }}
                        >
                          please wait...
                        </p>
                      )
                    }
                    
                </form> 
            </div>
            <div className="house-svg">
                <p style={{transform:"translate(20px, 160px)", color:"#284"}}>Add Update and Remove your House</p>
            </div>
        </div>
    );
};

export default Register;
