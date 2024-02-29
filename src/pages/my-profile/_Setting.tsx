import { imagePreviewer, imgSrcSet } from '@/Functions/common';
import React, { useState } from 'react';

const Setting = ({ handleChangePassword, profile, handleChangeName, handleAvatar }: any) => {
   const [avatarPreview, setAvatarPreview] = useState("");
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
      <div>
         <div className="py-2">
            <h6>Update Avatar</h6>
            <div className="row">
               <div className="col-md-6">
                  <form action="" encType='multipart/form-data' onSubmit={handleAvatar}>
                     <div className="mb-3">
                        <label htmlFor="avatar" className='form-label custom_label'>Avatar</label>
                        <div style={imgBoxStyle}>
                           {
                              avatarPreview ?
                                 <img src={avatarPreview || ""}
                                    alt=""
                                    srcSet={avatarPreview || ""}
                                    style={imgStyle}
                                 /> : profile?.avatar ? <img src={imgSrcSet(profile?.avatar) || ""}
                                    alt=""
                                    srcSet={imgSrcSet(profile?.avatar) || ""}
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
                     <div>
                        <button className='btn btn-sm btn-info'>Update Avatar</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div className="py-2">
            <h6>Change Name</h6>
            <div className="row">
               <div className="col-md-6">
                  <form action="" onSubmit={handleChangeName}>
                     <div className='mb-3'>
                        <label htmlFor="firstName" className='form-label custom_label'>First Name</label>
                        <input type="text" className="form-control form-control-sm" name="firstName" defaultValue={profile?.firstName || ""} id="firstName" />
                     </div>
                     <div className='mb-3'>
                        <label htmlFor="lastName" className='form-label custom_label'>Last Name</label>
                        <input type="text" className="form-control form-control-sm" defaultValue={profile?.lastName || ""} name="lastName" id="lastName" />
                     </div>

                     <div className="mb-3">
                        <button className="btn btn-info btn-sm" type="submit">Change</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div className='py-2'>
            <h6>Change Your Password</h6>
            <div className="row">
               <div className="col-md-6">
                  <form onSubmit={handleChangePassword}>
                     <div className="row">
                        <div className="col-12 mb-3">
                           <label htmlFor="oldPassword" className="form-label custom_label">Old Password</label>
                           <input type="text" name="oldPassword" id="oldPassword" className="form-control form-control-sm" />
                        </div>
                        <div className="col-12 mb-3">
                           <label htmlFor="newPassword" className="form-label custom_label">New Password</label>
                           <input type="text" name="newPassword" id="newPassword" className="form-control form-control-sm" />
                        </div>
                        <div className="col-12">
                           <button className="btn btn-info btn-sm" type="submit">Change Password</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>

         </div>
      </div>

   );
};

export default Setting;