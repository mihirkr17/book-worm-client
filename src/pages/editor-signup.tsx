
import { apiHandler, imagePreviewer } from '@/Functions/common';
import { API_URLS, BASE_URLS } from '@/constants/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditorSignUp = (props: any) => {

   const { user, setPopupMsg } = props?.auth;
   const router = useRouter();
   const [avatarPreview, setAvatarPreview] = useState("");

   useEffect(() => {
      if (user?.role || user?._id) {
         router.push("/");
      }
   }, [user, router]);


   //Sign up Handler
   async function handleSignUp(e: any) {
      try {

         e.preventDefault();

         const formData = new FormData(e.target);

         const result = await apiHandler(API_URLS?.editorSignUpUrl, "POST", formData, "FORM_DATA");

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            router.push(BASE_URLS?.loginPage)
            return;
         }

         setPopupMsg(result?.message, "danger")

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }


   const imgBoxStyle: any = {
      width: "150px",
      height: "150px",
      position: "relative",
      border: "1px dashed #ababab",
      textAlign: "center"
   }

   const imgStyle: any = {
      width: "100%",
      height: "100%",
      objectFit: "cover"
   }

   const fileStyle: any = {
      opacity: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0
   }

   const spStyle = {
      lineHeight: "5",
      color: "gray"
   }

   return (
      <div className="container">
         <div className="row">
            <div className='col-md-7'></div>
            <div className='col-md-5 mx-auto'>

               <h1 className="text-center headline pb-4">Sign Up To Editor</h1>
               <form onSubmit={handleSignUp} encType='multipart/form-data'>
                  <div className="row">
                     <div className="col-md-12 mb-3">
                        <label htmlFor="firstName" className='form-label'>First name</label>
                        <input type="text" className="form-control" name='firstName' id="firstName" required />
                     </div>
                     <br />
                     <div className="col-md-12 mb-3">
                        <label htmlFor="lastName" className='form-label'>Last name</label>
                        <input type="text" className="form-control" name='lastName' id="lastName" required />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label htmlFor="email" className='form-label'>E-mail address</label>
                        <input type="email" className="form-control" name='email' id="email" required />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" name='password' className="form-control" id="password" required />
                     </div>

                     <div className="col-12 mb-3">
                        <label htmlFor="avatar" className='form-label'>Avatar</label>
                        <div style={imgBoxStyle}>
                           {
                              avatarPreview ?
                                 <img src={avatarPreview || ""}
                                    alt=""
                                    srcSet={avatarPreview || ""}
                                    style={imgStyle}
                                 /> : <span style={spStyle}>Upload Avatar</span>
                           }

                           <input
                              className="form-control form-control-sm"
                              type="file"
                              name="avatar"
                              id="avatar"
                              accept=".jpeg, .jpg, .png, .gif"
                              onChange={(e: any) => imagePreviewer(e.target.files[0], setAvatarPreview, 400)}
                              style={fileStyle}
                           />
                        </div>
                     </div>

                     <div className="col-md-12">
                        <div className="text-center">
                           <button type="submit" className="btn btn-dark w-100" >Sign up</button>
                        </div>
                     </div>
                  </div>

                  <div className='pt-4'>
                     <p>
                        Already Have an Account ? <Link href="/login" style={{ color: "blueviolet" }}>Login</Link>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default EditorSignUp;