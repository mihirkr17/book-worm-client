import { apiHandler, imagePreviewer, imgSrcSet } from '@/Functions/common';
import { useFetch } from '@/Hooks/useFetch';
import { API_URLS } from '@/constants/constant';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CustomEditor = dynamic(() => {
   return import('@/components/Ckeditors/CustomEditor');
}, { ssr: false });

const ArticleModifier = ({ articleId, type, auth }: any) => {

   const [thumbnailPreview, setThumbnailPreview] = useState("");
   const { setPopupMsg } = auth;

   const router = useRouter();
   const { data }: any = useFetch(articleId && `/articles/single/${articleId}`);

   const article = data?.data?.article;

   const [description, setDescription] = useState<string>(article?.content || "");

   async function handleArticle(e: any) {
      try {

         e.preventDefault();

         const formData = new FormData(e.target);

         formData.append("content", description);

         let uri: string = API_URLS.createArticleUrl;
         let method = "POST";
         let createStatus = false;

         if (type === "modify" && articleId) {
            uri = API_URLS.modifyArticleUrl(articleId);
            method = "PUT";
         } else {
            createStatus = true;
         }

         const result = await apiHandler(uri, method, formData, "FORM_DATA");

         if (result?.success) {
            setPopupMsg(result?.message, "success");

            if (createStatus) {
               router.push(`/manage-articles`);
            }
         } else {
            return setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   const imgBoxStyle: any = {
      width: "100%",
      height: "200px",
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
      <div className='py-5'>
         <div className='py-3 text-center'>
            <h1>{type === "modify" ? "Edit : " + article?.title : "Create New Article"}</h1>
         </div>
         <div className="p-2">
            <form encType='multipart/form-data' onSubmit={handleArticle}>
               <div className='row'>
                  <div className="col-lg-7 mx-auto">
                     <div className="row">
                        <div className="col-12 mb-3">
                           <label htmlFor="title" className='form-label'>Title</label>
                           <input type="text" name="title" id="title" className='form-control' defaultValue={article?.title || ""} />
                        </div>


                        <div className="col-12 mb-3">
                           <label htmlFor="thumbnail" className='form-label'>Thumbnail</label>
                           <div style={imgBoxStyle}>
                              {
                                 thumbnailPreview ?
                                    <img src={thumbnailPreview || ""}
                                       alt=""
                                       srcSet={thumbnailPreview || ""}
                                       style={imgStyle}
                                    /> : article?.thumbnail ? <img src={imgSrcSet(article?.thumbnail) || ""}
                                       alt=""
                                       srcSet={imgSrcSet(article?.thumbnail) || ""}
                                       style={imgStyle}
                                    /> : <span style={spStyle}>Upload Article Thumbnail</span>
                              }

                              <input
                                 className="form-control form-control-sm"
                                 type="file"
                                 name="thumbnail"
                                 id="thumbnail"
                                 accept=".jpeg, .jpg, .png, .gif"
                                 onChange={(e: any) => imagePreviewer(e.target.files[0], setThumbnailPreview, 800)}
                                 style={fileStyle}
                              />
                           </div>
                        </div>


                        <div className="col-12 mb-3">
                           <label htmlFor="metaDescription" className='form-label'>Meta description</label>
                           <textarea name="metaDescription" className='form-control' id="metaDescription" cols={30} rows={5} defaultValue={article?.metaDescription || ""}></textarea>
                        </div>


                        <div className="col-12 mb-3">
                           <label htmlFor="content" className='form-label'>Description</label>
                           <CustomEditor setData={setDescription} initialData={article?.content || 'This is custom editor'}></CustomEditor>
                        </div>

                        <div className="col-12 mb-3">
                           <label htmlFor="keywords" className='form-label'>Keywords</label>
                           <input type="text" name="keywords" className='form-control' id="keywords" defaultValue={article?.keywords ? article?.keywords.toString().replaceAll(",", " ") : ""} />
                        </div>

                        <div className="col-12 mb-3">
                           <button className='btn btn-primary' type='submit'>{type === "modify" ? "Modify Now" : "Add Article"}</button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ArticleModifier;