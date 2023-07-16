import React, {  useEffect } from 'react'
import "./Navbar.scss"
import Avatar from '../avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import {AiOutlineLogout} from 'react-icons/ai'
// import LoadingBar from "react-top-loading-bar";
import { getMyInfo } from '../../redux/slices/appConfigSlice';
import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager'
import logoImg from "../../assets/logo.png"

function Navbar() {

    const navigate = useNavigate();
    // const loadingRef = useRef();

    // const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    // function toggleLoadingBar(){
    //         // dispatch(setLoading(true));
    //        // loadingRef.current.continuousStart();
    // }

    useEffect(() => {
        dispatch(getMyInfo());
    }, [dispatch]);

    async function handleLogoutClicked(){
        try {
            // dispatch(setLoading(false));
            await axiosClient.post("/auth/logout");
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login');
            // dispatch(setLoading(false));
        } catch (e) {
            
        }
    }

  return (
    <div className='Navbar'>
        {/* <LoadingBar height={6} color='#5f9fff' ref={loadingRef}/> */}
        <div className="container">
            <h1 className="banner hover-link" onClick={() => navigate('/')}>
            <img src={logoImg} alt="Logo" className="logo" />
                Socially
            </h1>
            <div className="right-side">
                <div className="profile hover-link" onClick={() => myProfile && navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                <div className="logout hover-link" onClick={handleLogoutClicked}>
                    <AiOutlineLogout />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar