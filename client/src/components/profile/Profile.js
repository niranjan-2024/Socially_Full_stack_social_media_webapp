import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import Post from '../post/Post'
//import userImg from "../../assets/user.png";
import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/postsSlice';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';

function Profile() {

    const navigate = useNavigate();

    const params = useParams();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.postsReducer.userProfile);
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isFollowing,setIsFollowing] = useState(false);
    const feedData = useSelector(state => state.feedDataReducer.feedData);
    

    // useEffect(() => {
    //     dispatch(getUserProfile({ userId: params.userId }));
    //     setIsMyProfile(myProfile?._id === params.userId);
    //     console.log(isFollowing);
    //     setIsFollowing(feedData?.followings?.find(item => item._id === params.userId));
    //     console.log(isFollowing);
    // }, [myProfile,params.userId,feedData]);

    useEffect(() => {
        dispatch(getUserProfile({ userId: params.userId }));
        setIsMyProfile(myProfile?._id === params.userId);
    }, [myProfile, params.userId,dispatch]);
    
      // Update isFollowing whenever the followings data changes
    useEffect(() => {
        setIsFollowing(feedData?.followings?.some(item => item._id === params.userId));
        //console.log(feedData);
    }, [feedData, params.userId,dispatch]);

    function handleUserFollow(){
        dispatch(followAndUnfollowUser({
            userIdToFollow: params.userId
          }));
    }

  return (
    <div className='Profile'>
        <div className="container">
            <div className="left-part">
                {isMyProfile &&
                <CreatePost/> }
                {userProfile?.posts?.map(post => <Post key={post._id} post={post}/>)}
                {/* <Post/>
                <Post/>
                <Post/> */}
                {/* <Post/> */}
            </div>
            <div className="right-part">
                <div className="profile-card">
                    <img className="user-img" src={userProfile?.avatar?.url} alt="" />
                    <h3>{userProfile?.name}</h3>
                    <p className='bio'>{userProfile?.bio}</p>
                    <div className="follower-info">
                        <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                        <h4>{`${userProfile?.followings?.length} Followings`}</h4>
                    </div>
                    {!isMyProfile && 
                            <h5 onClick={handleUserFollow} className={isFollowing?'btn-secondary':'btn-primary'}>{isFollowing? "Unfollow" : "Follow"}</h5>}
                    {isMyProfile &&
                    <button className='update-profile btn-secondary' onClick={() => {navigate('/updateProfile')}}>Update Profile</button>}
                </div>
            </div>
        </div>

    </div>
  )
}

export default Profile