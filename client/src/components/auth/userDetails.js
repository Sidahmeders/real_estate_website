import React, { useContext } from 'react';
import { ContextConsumer } from '../../context';


function UserDetails() {

    const context = useContext(ContextConsumer);
    const {auth, dispatchAuth} = context;
    const user = auth.user;

    const onLogOut = () => {
        setTimeout(() => {
            dispatchAuth({
                type: "LOGOUT_SUCCESS"
            });
        }, 600);
        window.location = "/";
    };
    

    return (
        <div className="user-details">
            {user ? 
              (
                <div className="personal-info">
                    <h2>Name: {user.name}</h2>
                    <h2>Email: {user.email}</h2>
                    <h2>register_since: {user.register_date}</h2>
                    <h2>Phone: {user.phoneNumber}</h2>
                    <h2>UserType: {user.userType}</h2>
                    <h3 onClick={onLogOut} style={{color:"red",cursor:"pointer"}}>
                        logOut
                    </h3>
                </div>
              ) : 
              (
                <h1>Wait.... or Login if Not</h1>
              )
            }
        </div>
    );
};

export default UserDetails;
