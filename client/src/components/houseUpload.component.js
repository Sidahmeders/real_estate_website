import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/houseUpload/houseUpload.css';
import axios from 'axios';


function HouseUpload() {

    const useLocalState = () => {
        const myHouse = localStorage.getItem("newHouse");
        const [locState, setState] = useState(JSON.parse(myHouse));

        const setLocState = newItem => {
            localStorage.setItem("newHouse", JSON.stringify(newItem));
            setState(newItem);
        }

        return [locState, setLocState];
    }

    const [upLoadedFile, setUpLoadedFile] = useLocalState({});

    const [userFiles, setUserFiles] = useState({
        file: "",
        tempFile: "",
        address: "",
        phoneNumber: ""
    });

    const onFileChange = e => {
        setUserFiles({
            ...userFiles,
            file: e.target.files[0],
            tempFile: URL.createObjectURL(e.target.files[0])
        });
    }

    const onHouseDataChange = e => {
        const value = e.target.value;
        setUserFiles({
            ...userFiles,
            [e.target.name]: value
        });
    }

    const onFileSubmit = async e => {
        e.preventDefault();

        const fd = new FormData();
        for(let file in userFiles) {
            fd.append(file, userFiles[file]);
        }

        try {
            const res = await axios.post('http://localhost:5000/uploads', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {address, phoneNumber, base64String} = res.data;
            setUpLoadedFile({address, phoneNumber, base64String});

        } catch(err) {
            if(err) {
                console.log('this is Server problem');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }
    console.log(userFiles.file)

    return(
        <div className="house-upload">
            <h1>HouseUpload</h1>

            <div className="house-input-info">
                <form onSubmit={onFileSubmit}>

                    <label>Your House Address</label>
                    <input type="text" name="address" required
                    value={userFiles.address} onChange={onHouseDataChange} 
                    />
                    <label>Your Phone number</label>
                    <input type="number" name="phoneNumber" required
                    value={userFiles.number} onChange={onHouseDataChange}
                    />
                    <label>Upload your House image</label>
                    <input type="file" name="file" onChange={onFileChange} required/>
                    
                    <button>UpLoad</button>
                </form>
                <Link to="/houseUpload/confirm">confirm</Link>
                <h1>{userFiles.address}</h1>
                <img width="450px" src={userFiles.tempFile} alt="myfile" />
                <h4>phone: {userFiles.phoneNumber}</h4>
            </div>

            <div className="undefined">
               
            </div>

        </div>
    );
}

export default HouseUpload;
