import React, { useContext } from 'react';
import { ContextConsumer } from '../context';


function About() {

  const context = useContext(ContextConsumer);
  const usersInfo = context.houses.usersInfo;
  
    return(
       <div className="about-page">
         <h1>THE ABOUT PAGE</h1>
         <h2>About this page is some hidden stuff</h2>
         {usersInfo ? usersInfo.map(house => {
           const {_id, phoneNumber, address, binaryImgFile} = house;
           const base64String = new Buffer.from(binaryImgFile).toString('base64');
           let image = `data:image/jpeg;base64,${base64String}`;
           
           return (
             <div key={_id}>
               <h2>{address}</h2>
               <p>{phoneNumber}</p>
               <img width="200px" src={image} alt="homes" />
             </div>
           );
         }) : (<h2 style={{color:"red"}}>no userInfo provided</h2>)}
       </div> 
    );
};

export default About;
