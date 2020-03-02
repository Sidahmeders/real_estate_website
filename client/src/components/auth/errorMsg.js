import React, { useContext } from 'react';
import { ContextConsumer } from '../../context';


function ErrorMsg() {

    const context = useContext(ContextConsumer);
    const { err, auth } = context;

    return(
        <div className="error-msg">
            {!auth.token ?
                (<p style={{
                    color:"red",
                    border:"1px solid red",
                    margin: "20px",
                    padding: "3px 10px",
                    borderRadius: "5px"
                }}>
                    {err.msg}
                </p>
                ) :
                (
                    <p style={{
                        color: "green",
                        margin: "20px",
                        padding: "3px 10px",
                        fontSize: "18px",
                        border: "1px solid green",
                        borderRadius: "3px"
                    }}>
                        you are logged in and can post
                    </p>
                )
            }
        </div>
    );
};

export default ErrorMsg;
