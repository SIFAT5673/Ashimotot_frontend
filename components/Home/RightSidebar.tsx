"use client";
import { BASE_API_URL } from '@/server';
import { RootState } from '@/store/store';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { handelAuthRequest } from '../utils/apiRequest';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const RightSidebar = () => {

    const user = useSelector((state:RootState)=>state.auth.user);
    const [suggestedUser,setSuggestedUser] =useState<User[]>([]);
    const[isLoading, setIsLoading]=useState(false);
    const router =useRouter();
   
    

    console.log("SUGGESTED USER",suggestedUser);

    // useEffect(()=>{
    //     const getSuggestedUser =async()=>{
    //         const getSuggestedUserReq = async()=>await axios.get(`${BASE_API_URL}/users/suggested-user`,{withCredentials:true});
    //         const result = await handelAuthRequest(getSuggestedUserReq,setIsLoading);
            

    //         if(result?.data?.data?.user) setSuggestedUser(result.data.data.users);
            
    //     };
    //     getSuggestedUser();
    // },[]);
    

    useEffect(() => {
        const getSuggestedUser = async () => {
            try {
                const getSuggestedUserReq = async () => 
                    await axios.get(`${BASE_API_URL}/users/suggested-user`, { withCredentials: true });
    
                const result = await handelAuthRequest(getSuggestedUserReq, setIsLoading);
    
                
    
                if (result?.data?.data?.user) {  // Change 'users' to 'user'
                    
                    setSuggestedUser(result.data.data.user);  // Update this
                } 
            } catch (error) {
                console.error("Error fetching suggested users:", error);
                setSuggestedUser([]);
            }
        };
        getSuggestedUser();
    },[]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        );
    }
    
    
      


  return (
    <div >
        <div className='flex  items-center justify-between '>
            <div className='flex items-center space-x-4'>
                <Avatar className='w-9 h-9'>
                    <AvatarImage src={user?.profilePicture} className='h-full w-full rounded-full'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className='font-bold'>
                        {user?.username}
                    </h1>
                    <p className='text-gray-700'>
                        {user?.bio || "I am using Ashimotot"}
                    </p>
                </div>
                
            </div>
            <h1 className='font-medium text-blue-700 cursor-pointer'>Switch</h1>
        </div>

        <div className='flex items-center justify-between mt-8'>
            <h1 className='font-semibold text-gray-700'>Suggested User</h1>
            <h1 className='font-medium cursor-pointer'>See All</h1>
        </div>

        {suggestedUser?.slice(0,5).map((s_user)=>{
            return<div onClick={()=>{router.push(`/profile/${s_user._id}`)}} key={s_user._id} className='mt-6 cursor-pointer'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4 cursor-pointer'>
                    <Avatar className='w-9 h-9'>
                    <AvatarImage src={s_user?.profilePicture} className='h-full w-full rounded-full'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div> 
                    <h1 className='font-bold'>{s_user.username}</h1>
                    <p className='text-gray-700'>{s_user.bio || "I am using Ashimotot"}</p>
                </div>
                    </div>
                    <h1 className='font-medium text-blue-700 cursor-pointer'>Details</h1>
                </div>
            </div>
        })}
    
    </div>
  )
}

export default RightSidebar

