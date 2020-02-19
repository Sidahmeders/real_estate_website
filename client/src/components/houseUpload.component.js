import React, { useState } from 'react';
import '../styles/houseUpload.css';
import axios from 'axios';


function HouseUpload() {

    const useLocalState = () => {
        const myHouse = localStorage.getItem("newHouse");
        const [locState, setState] = useState(JSON.parse(myHouse));

        const setLocState = newItem => {
            localStorage.setItem("newHouse", newItem);
            setState(newItem);
        }

        return [locState, setLocState];
    }

    const [userFiles, setUserFiles] = useState({
        imgFile: "",
        address: "",
        number: ""
    });

    const [upLoadedFile, setUpLoadedFile] = useLocalState({});

    const onFileChange = e => {
        setUserFiles({
            ...userFiles,
            imgFile: e.target.files[0]
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

            const {address, number, imgPath} = res.data;
            setUpLoadedFile(JSON.stringify({address, number, imgPath}));

        } catch(err) {
            if(err.response.status === 500) {
                console.log('this is Server problem');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    console.log(userFiles.imgFile);

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
                    <input type="number" name="number" required
                    value={userFiles.number} onChange={onHouseDataChange}
                    />
                    <label>Upload your House image</label>
                    <input type="file" name="imgFile" onChange={onFileChange} required/>
                    
                    <button>UpLoad</button>
                </form>
                {upLoadedFile ? (
                <>
                <h1>{upLoadedFile.address}</h1>
                <img width="450px" src={upLoadedFile.imgPath} alt="myfile" />
                <h4>phone: {upLoadedFile.number}</h4>
                </>): 
                (<h3>no file is provided</h3>)
                }
            </div>

            <div className="undefined">
               
            </div>

        </div>
    );
}

export default HouseUpload;
