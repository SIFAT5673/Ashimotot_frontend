// "use client";
// import { useRouter } from 'next/navigation';
// import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
// import Image from 'next/image';
// import LoadingButton from '../Helper/LoadingButton';
// import { Button } from '../ui/button';
// import { ImageIcon } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { BASE_API_URL } from '@/server';
// import { handelAuthRequest } from '../utils/apiRequest';
// import { addPost } from '@/store/postSlice';

// type Props ={
//     isOpen:boolean;
//     onClose: () => void;
// };


// const CreatePostModel = ({isOpen, onClose} : Props) => {

//     const router = useRouter();
//     const dispatch = useDispatch();
//     const[selectedImage,setSelectedImage]=useState<File | null>(null);
//     const[previewImage,setPreviewImage]=useState<string | null>(null);
//     const [caption,setCaption]=useState<string>('');
//     const [isLoading,setIsLoading]=useState(false);
//     const fileInputRef =useRef<HTMLInputElement | null>(null);

//     useEffect(()=>{
// if(!isOpen){
//     setSelectedImage(null);
//     setPreviewImage(null);
//     setCaption("");
// }
//     },[isOpen]);
    
//     const handleButtonClick = () =>{
//         if(fileInputRef.current){
//             fileInputRef.current.click();
//         }
//     };
    
//     const handleFileChange=(event:ChangeEvent<HTMLInputElement>)=>{
//         if(event.target.files && event.target.files[0]){
//             const file = event.target.files[0];
//             if(!file.type.startsWith("image/")){
//                 toast.error("Please select a valid image file!");
//                 return 
//             }
//             if (file.size>10*1024*1024){
//                 toast.error("File size should not exceed 10MB!");
//             }

//             const imageUrl = URL.createObjectURL(file);
//             setSelectedImage(file);
//             setPreviewImage(imageUrl);
//         }
//     };

//     const handleCreatePost =async() => {
//         if(!selectedImage){
//             toast.error("Please Select an image to create a post!");
//         }

//         const formData = new FormData();
//         formData.append("caption",caption);
//         if(selectedImage){
//             formData.append("image",selectedImage);
//         }
        

//         const createPostReq =async () => await axios.post(`${BASE_API_URL}/posts/create-post`,formData,{withCredentials:true,headers:{"Content-Type" :"multipart/form-data",}});
//         const result =await handelAuthRequest(createPostReq, setIsLoading);

//         if(result){
//             dispatch(addPost(result.data.data.post));
//             toast.success("Post Created Successfully!");
//             setPreviewImage(null)
//             setCaption('');
//             setSelectedImage(null);
//             onClose();
//             router.push("/");
//             router.refresh();
        
//         }
//     };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//            <DialogContent>
            
//                 {previewImage ?(
//                     <div className='flex flex-col items-center justify-center text-center space-y-4'>
//                         <div className='mt-4'>
//                             <Image src={previewImage} alt="Image" width={400} height={400} className="overflow-auto max-h-96 rounded-md object-contain w-full"/>
//                         </div>
//                         <input type='text' value={caption}onChange={(e)=> setCaption(e.target.value)} placeholder="Write a caption ..." className='mt-4 p-2 border rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600'/>
//                         <div className='flex space-x-4 mt-4'>
//                             <LoadingButton className='bg-blue-600 text-white hover:bg-blue-700' onClick={handleCreatePost} isLoading={isLoading}>
//                                 Create Post
//                             </LoadingButton>
//                             <Button className='bg-gray-500 text-white hover:bg-gray-600' onClick={()=>{
//                                 setPreviewImage(null);
//                                 setSelectedImage(null);
//                                 setCaption('');
//                                 onClose();
//                             }}>
//                                 Cancle
//                             </Button>
//                         </div>
//                     </div>
//                 ):(
//                 <>
//                 <DialogHeader>
//                     <DialogTitle className='text-center mt-3 mb-3'>
//                         Upload Photo
//                     </DialogTitle>
//                 </DialogHeader>
//                 <div className='flex flex-col items-center justify-center text-center space-y-4'>
// <div className='flex space-x-2 text-gray-600'>
//     <ImageIcon size={40}/>

// </div>
// <p className='text-gray-600 mt-4'>
//     Select a photo from your device
// </p>
// <Button className='bg-blue-600 text-white hover:bg-blue-700' onClick={handleButtonClick}>
//     Select from device
// </Button>
// <input type='file' accept='image/*'className='hidden' ref={fileInputRef} onChange={handleFileChange}/>
//                 </div>
//                 </>
//             )}
            

            
//         </DialogContent>
//     </Dialog>
//   )
// }

// export default CreatePostModel

"use client";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Image from 'next/image';
import LoadingButton from '../Helper/LoadingButton';
import { Button } from '../ui/button';
import { ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { BASE_API_URL } from '@/server';
import { handelAuthRequest } from '../utils/apiRequest';
import { addPost } from '@/store/postSlice';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const CreatePostModel = ({ isOpen, onClose }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [caption, setCaption] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null);
            setPreviewImage(null);
            setCaption("");
        }
    }, [isOpen]);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file!");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File size should not exceed 10MB!");
                return;
            }
            
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(file);
            setPreviewImage(imageUrl);
        }
    };

    const handleCreatePost = async () => {
        if (!caption.trim() && !selectedImage) {
            toast.error("Please write something or select an image to create a post!");
            return;
        }
        
        const formData = new FormData();
        formData.append("caption", caption);
        if (selectedImage) {
            formData.append("image", selectedImage);
        }
        
        const createPostReq = async () => await axios.post(`${BASE_API_URL}/posts/create-post`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        
        const result = await handelAuthRequest(createPostReq, setIsLoading);
        
        if (result) {
            dispatch(addPost(result.data.data.post));
            toast.success("Post Created Successfully!");
            setPreviewImage(null);
            setCaption('');
            setSelectedImage(null);
            onClose();
            router.push("/");
            router.refresh();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center mt-2 mb-2'>
                        Create a Post
                    </DialogTitle>
                </DialogHeader>
                <div className='flex flex-col items-center justify-center text-center space-y-4'>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write your thoughts..."
                        className='mt-2 p-2 border rounded-md w-full h-32 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
                    />
                    {previewImage && (
                        <div className='mt-4'>
                            <Image
                                src={previewImage}
                                alt="Selected Image"
                                width={400}
                                height={400}
                                className="overflow-auto max-h-96 rounded-md object-contain w-full"
                            />
                        </div>
                    )}
                    <div className='flex space-x-4'>
                        <Button className='bg-blue-600 text-white hover:bg-blue-700' onClick={handleButtonClick}>
                            <ImageIcon className='mr-2' size={20} /> Add Image
                        </Button>
                        <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='flex space-x-4 mt-4'>
                        <LoadingButton
                            className='bg-blue-600 text-white hover:bg-blue-700'
                            onClick={handleCreatePost}
                            isLoading={isLoading}
                        >
                            Post
                        </LoadingButton>
                        <Button
                            className='bg-gray-500 text-white hover:bg-gray-600'
                            onClick={() => {
                                setPreviewImage(null);
                                setSelectedImage(null);
                                setCaption('');
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostModel;

