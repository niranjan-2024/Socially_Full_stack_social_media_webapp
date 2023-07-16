import React, { useEffect, useState } from 'react'
import "./UpdateProfile.scss"
import userImg from "../../assets/user.png";
import { useDispatch, useSelector } from 'react-redux';
//import { setLoading } from '../../redux/slices/appConfigSlice';
import { updateMyProfile } from '../../redux/slices/appConfigSlice';
//import appConfigReducer from '../../redux/slices/appConfigSlice';
import store from '../../redux/store';
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';

function UpdateProfile() {
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

    const [name,setName] = useState('');
    const [bio,setBio] = useState('');
    const [userImage,setUserImage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setName(myProfile?.name || "");
        setBio(myProfile?.bio || "");
        setUserImage(myProfile?.avatar?.url || "");
    },[myProfile]);

    // function handleImageChange(e){
    //     const file = e.target.files[0];
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.onload = () => {
    //         if(fileReader.readyState === fileReader.DONE){
    //             setUserImage(fileReader.result);
    //             console.log('img data',fileReader.result);
    //             console.log("image",userImage);
    //         }
    //     }
    // }

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        
        fileReader.onload = () => {
          if (fileReader.readyState === fileReader.DONE) {
            const imageDataUrl = fileReader.result;
            setUserImage(imageDataUrl);
            
            //console.log('img data', imageDataUrl);
            // console.log('image', imageDataUrl); // Use imageDataUrl instead of userImage
            // console.log('image', userImage); // Use imageDataUrl instead of userImage

            // Perform any further actions or logic that depend on the updated userImage value here
          }
        };
      
        fileReader.readAsDataURL(file);
    }

    function handleSubmit(e){
        console.log("name",name);
        console.log("image",userImage);
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            userImage // Assuming `userImage` contains the URL of the image
        }));
        store.dispatch(showToast({
            type: TOAST_SUCCESS,
            message: "Successfully updated"
        }))
    }

  return (
    <div className='UpdateProfile'>
        <div className="container">
            <div className="left-part">
                {/* <img className="user-img" src={userImage?userImage:userImg} alt="" /> */}
                <div className="input-user-img">
                    <label htmlFor="userImage" className='labelImg'>
                        <img className="user-img" src={userImage?userImage:userImg} alt={name} />
                    </label>
                    <input className='inputImg' id='userImage' type="file" accept='image/*' onChange={handleImageChange}/>
                </div>
            </div>
            <div className="right-part">
                <form>
                    <input value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)}/>
                    <input value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)}/>
                    <input type="submit" className='btn-primary' onClick={handleSubmit}/>
                </form>

                <button className="delete-account btn-primary">Delete Account</button>
            </div>
        </div>
    </div>
  )
}


export default UpdateProfile