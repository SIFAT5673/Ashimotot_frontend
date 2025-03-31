// "use client";
// import { BASE_API_URL } from '@/server';
// import { RootState } from '@/store/store';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { handelAuthRequest } from '../utils/apiRequest';
// import { setPosts } from '@/store/postSlice';
// import { Loader } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import DotButton from '../Helper/DotButton';
// import Image from 'next/image';

// const Feed = () => {

//   const dispatch =useDispatch();

//   const user = useSelector((state:RootState)=>state.auth.user)
//   const posts = useSelector((state:RootState)=>state.posts.posts)

//   const [comment,setComment] = useState("");
//   const [isLoading,setIsLoading] = useState(false);

//   console.log("POSTS",posts);
  

//   useEffect(()=>{
//     const getAllPost = async()=>{
//       const getAllPostReq =async( )=>await axios.get(`${BASE_API_URL}/posts/all`);
//       const result = await handelAuthRequest(getAllPostReq,setIsLoading);
//       if(result){
//         dispatch(setPosts(result.data.data.posts));
//       }
//     };
//     getAllPost();
//   },[dispatch]);

//   const handleLikeDislike = async(id:string)=>{}

//   const handleSaveUnsave = async(id:string)=>{}

//   const handleComment = async(id:string)=>{}

//   if(isLoading){
//     return(
//       <div className='w-full h-screen flex items-center justify-center flex-col'>
//         <Loader className='animate-spin'/>
//       </div>
//     )
//   }

//   if(posts.length<1){
//     return (
//       <div className='text-3xl m-8 text-center capitalize font-bold'>
//         No Posts To Show
//       </div>
//     )
//   }


//   return (
//     <div className='mt-20 w-[70%] mx-auto '>
//         {posts.map((post) => {
//             return (
//                 <div key={post._id} className='mt-8'>
//                     <div className='flex items-center justify-between'>
//                         <div className='flex items-center space-x-2'>
//                             <Avatar className='w-9 h-9'>
//                                 <AvatarImage src={post.user?.profilePicture} className='h-full w-full'/>
//                                 <AvatarFallback>CN</AvatarFallback>
//                             </Avatar>
//                             <h1>{post.user?.username}</h1>
//                         </div>
//                         <DotButton />
//                     </div>
//                     {/* Render the caption (text) */}
//                     <div className='mt-2'>
//                         <p>{post.caption}</p>
//                     </div>

//                     {/* Conditionally render image if present */}
//                     {post.image?.url && (
//                         <div className='mt-2'>
//                             <Image 
//                                 src={post.image.url} 
//                                 alt="Post" 
//                                 width={400} 
//                                 height={400} 
//                                 className='w-full' 
//                                 priority 
//                                 style={{ width: "auto", height: "auto" }} 
//                             />
//                         </div>
//                     )}
//                 </div>
//             );
//         })}
//     </div>
// );
// }
// export default Feed


"use client";
import { BASE_API_URL } from '@/server';
import { RootState } from '@/store/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handelAuthRequest } from '../utils/apiRequest';
import { addComment, likeOrDislike, setPosts } from '@/store/postSlice';
import { Bookmark, HeartIcon,  Loader, MessageCircle, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import DotButton from '../Helper/DotButton';
import Image from 'next/image';
import moment from 'moment'; // For time formatting
import Comment from '../Helper/Comment';
import { toast } from 'sonner';
import { setAuthUser } from '@/store/authSlice';

const Feed = () => {

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("POSTS", posts);

  useEffect(() => {
    const getAllPost = async () => {
      const getAllPostReq = async () => await axios.get(`${BASE_API_URL}/posts/all`);
      const result = await handelAuthRequest(getAllPostReq, setIsLoading);
      if (result) {
        dispatch(setPosts(result.data.data.posts));
      }
    };
    getAllPost();
  }, [dispatch]);

  const handleLikeDislike = async (id: string) => {
    const result = await axios.post(`${BASE_API_URL}/posts/like-dislike/${id}`,{},{withCredentials:true});
    if(result.data.status=='success'){
      if(user?._id){
        dispatch(likeOrDislike({postId:id,userId:user?._id}));
        toast(result.data.message);
      }
    }
  }
  const handleSaveUnsave = async (id: string) => {
    const result =await axios.post(`${BASE_API_URL}/posts/save-unsave-post/${id}`,{},{withCredentials:true});
    if(result.data.status ==="success"){
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
    }
  }
  const handleComment = async (id: string) => {
    if(!comment) return;
    const addCommentReq = async()=>await axios.post(`${BASE_API_URL}/posts/comment/${id}`,{text:comment},{withCredentials:true});
    const result = await handelAuthRequest (addCommentReq);
    if(result?.data.status =='success'){
      dispatch(addComment({postId:id,comment:result?.data.data.comment}));
      toast.success("Comment Posted");
      setComment("");
    }
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center flex-col'>
        <Loader className='animate-spin' />
      </div>
    );
  }

  if (posts.length < 1) {
    return (
      <div className='text-3xl m-8 text-center capitalize font-bold'>
        No Posts To Show
      </div>
    );
  }

  return (
    <div className='mt-20 mb-6 w-[70%] mx-auto'>
    
      {posts.map((post) => {
        return (
          <div key={post._id} className='mt-8 bg-white p-4 rounded-lg shadow-md'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Avatar className='w-9 h-9'>
                  <AvatarImage src={post.user?.profilePicture} className='h-full w-full' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className='font-bold'>{post.user?.username}</h1>
                  <span className='text-sm text-gray-500'>
                    {moment(post.createdAt).fromNow()} {/* Displays relative time */}
                  </span>
                </div>
              </div>
              <DotButton post={post} user={user} />
            </div>

            {/* Post Caption */}
            <div className='mt-2 font-medium'>
              <p>{post.caption}</p>
            </div>

            
            {/* Post Image */}
              {post.image?.url && (
                <div className='mt-2 flex justify-center items-center'>
                  <Image
                    src={post.image.url}
                    alt="Post"
                    width={800}
                    height={800}
                    className='rounded-lg'
                    priority
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              )}
            {/* Like, Comment, Share Buttons */}
            <div>
                <div className='mt-3 flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <HeartIcon onClick={()=>{handleLikeDislike(post?._id)}} className={` cursor-pointer ${user?._id && post.likes.includes(user._id) ? 'text-red-500':''}`}/>
                    <MessageCircle className="cursor-pointer"/>
                    <Send className="cursor-pointer"/>
                  </div>
                <Bookmark onClick={()=>{handleSaveUnsave(post?._id)}} className={`cursor-pointer ${(user?.savedPosts as string[])?.some((savePostId:string)=>savePostId ===post._id)? "text-red-500": ""}`}/>
                </div>
                <h1 className='mt-2 text-sm font-semibold'>
                    {post.likes.length} likes
                </h1>
                <Comment post={post} user={user}/>
                <div className='mt-2 flex items-center'>
                    <input type='text' placeholder='Add a Comment...' className='flex-1 placeholder:text-gray-800 outline-none' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <p role='button' className='text-sm font-semibold text-blue-700 cursor-pointer' onClick={()=>{handleComment(post._id)}} >
                      Post
                    </p>
                </div>
                <div className='pb-6 border-b-2'>

                </div>

            </div>

            {/* Comments Section
            <div className='mt-4'>
              <div className='flex items-center space-x-2'>
                <input
                  type="text"
                  className='w-full px-4 py-2 border rounded-lg'
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                >
                  Post
                </button>
              </div>

              Display Comments
              <div className='mt-4'>
                {post.comments && post.comments.length > 0 && post.comments.map((comment: any, idx: number) => (
                  <div key={idx} className='flex items-center space-x-2 mt-2'>
                    <Avatar className='w-6 h-6'>
                      <AvatarImage src={comment.user?.profilePicture} className='h-full w-full' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-semibold'>{comment.user?.username}</p>
                      <p className='text-sm'>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

          </div>
        );
      })}
    </div>
  );
};

export default Feed;
