import React, { useEffect } from 'react'
import "./Feed.scss"
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'

function Feed() {
    const dispatch = useDispatch();
    const feedData = useSelector(state => state.feedDataReducer.feedData)

    useEffect(() => {
        dispatch(getFeedData());
    }, [dispatch])

  return (
    <div className='Feed'>
        <div className="container">
            <div className="left-part scrollable-content" >
               {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
                {/* <Post/>
                <Post/>
                <Post/>
                <Post/> */}
            </div>
            <div className="right-part">
                <div className="following">
                    <h3 className='title'>You are Following</h3>
                    {feedData?.followings?.map(user => <Follower user={user} key={user._id}/>)}
                    {/* <Follower/>
                    <Follower/>
                    <Follower/>
                    <Follower/> */}
                </div>

                <div className="following">
                    <h3 className='title'>Suggested For You</h3>
                    {feedData?.suggestions?.map(user => <Follower user={user} key={user._id}/>)}
                    {/* <Follower/>
                    <Follower/>
                    <Follower/>
                    <Follower/> */}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Feed