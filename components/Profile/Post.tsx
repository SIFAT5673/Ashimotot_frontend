import { User } from '@/types'
import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {
    userProfile:User | undefined;
}

const Post = ({userProfile}:Props) => {
    // console.log(userProfile);
    
  return (
    
    <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {userProfile?.posts?.map((post)=>{
        return <div key={post._id} className='relative group overflow-hidden'>
            {/* <Image src={`${post.image?.url}`} alt="Post" width={300} height={300} className='w-full h-full object-cover aspect-square'/> */}
            {post.image?.url ? (
  <Image
    src={post.image.url}
    alt="Post"
    width={300}
    height={300}
    className="w-full h-full object-cover aspect-square transition-opacity duration-300 ease-in-out group-hover:opacity-60"
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
    No Image Available
  </div>
)}
 {/* 🔥 Dark Overlay (Makes Image Darker on Hover) */}
 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      
        {/* <div className='absolute inset-0 bg-black bg-opacity-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 '>
          <div className='flex space-x-6 '>
            <button className='p-2 rounded-full text-white space-x-2 flex items-center font-bold'>
              <Heart className='w-7 h-7'/>
              <span>
                {post?.likes.length}
              </span>
            </button>
            <button className='p-2 rounded-full text-white space-x-2 flex items-center font-bold'>
              <MessageCircle className='w-7 h-7'/>
              <span>
                {post?.comments.length}
              </span>
            </button>
          </div>
        </div> */}
         {/* Hover Effect */}
      
       {/* Buttons (Appear in Center on Hover) */}
       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-6">
          {/* Like Button */}
          <button className="p-2 text-white flex items-center font-bold">
            <Heart className="w-7 h-7" />
            <span className="ml-2">{post.likes.length}</span>
          </button>

          {/* Comment Button */}
          <button className="p-2 text-white flex items-center font-bold">
            <MessageCircle className="w-7 h-7" />
            <span className="ml-2">{post.comments.length}</span>
          </button>
        </div>
      </div>
      
      </div> 
      })}
    </div>
  )
}

export default Post