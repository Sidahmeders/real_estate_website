import React, { useContext } from 'react';
import { HousesConsumer } from '../context';


function About() {

  const value = useContext(HousesConsumer);
  const usersInfo = value.houses.usersInfo;
  
  console.log(value)
    return(
       <div className="about-page">
         <h1>THE ABOUT PAGE</h1>
         <h2>About this page is some hidden stuff</h2>
         {usersInfo ? usersInfo.map(house => {
           return (
             <div key={house._id}>
               <h2>{house.address}</h2>
             </div>
           );
         }) : (<h2 style={{color:"red"}}>no userInfo provided</h2>)}
       </div> 
    );
}

export default About;
