import { apiHandler, imgSrcSet } from '@/Functions/common';
import { useFetch } from '@/Hooks/useFetch';
import { publishedYear } from '@/assets/fakeData1';
import { API_URLS } from '@/constants/constant';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BookModifier = ({ bookId, type, auth }: any) => {

   const [thumbnailPreview, setThumbnailPreview] = useState("");

   const { setPopupMsg } = auth;
   const router = useRouter();


   const { data }: any = useFetch(bookId && `/books/single/${bookId}`);

   const book = data?.data?.book;

   // Image pre-viewer
   function previewImage(file: any, setState: any) {

      const fileReader = new FileReader();

      fileReader.onload = (event: any) => {

         if ((file?.size / 1024) > 800) {
            setState("");
            return window.alert("File size must be 400KB");
         }

         const src = event.target.result;
         setState(src);
      };

      fileReader.readAsDataURL(file);
   }

   async function handleBook(e: any) {
      try {

         e.preventDefault();

         const formData = new FormData(e.target);


         let uri: string = API_URLS.createBookUrl;
         let method = "POST";
         let createStatus = false;

         if (type === "modify" && bookId) {
            uri = API_URLS.modifyBookUrl(bookId);
            method = "PUT";
         } else {
            createStatus = true;
         }


         const result = await apiHandler(uri, method, formData, "FORM_DATA");

         if (result?.success) {
            setPopupMsg(result?.message, "success");

            if (createStatus) {
               router.push(`/manage-books`);
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

   const BOOK_CATEGORIES = [
      "Fiction",
      "Juvenile Fiction",
      "Biography & Autobiography",
      "History",
      "Drama",
      "Religion",
      "Sports & Recreation",
      "Travel",
      "Science",
      "Philosophy",
      "Psychology",
      "American fiction"
   ]


   return (
      <div className='py-5'>
         <div className='py-3 text-center'>
            <h1>{type === "modify" ? "Edit Book" : "Create New Book"}</h1>
         </div>
         <div className="p-2">
            <form encType='multipart/form-data' onSubmit={handleBook}>
               <div className='row'>
                  <div className="col-lg-7 mx-auto">
                     <div className="row">
                        <div className="col-12 mb-3">
                           <label htmlFor="title" className='form-label'>Book Title</label>
                           <input type="text" name="title" id="title" className='form-control' defaultValue={book?.title || ""} />
                        </div>
                        <div className="col-12 mb-3">
                           <label htmlFor="subTitle" className='form-label'>Sub Title</label>
                           <input type="text" className="form-control" id="subTitle" name='subTitle' defaultValue={book?.subTitle || ""} />
                        </div>
                        <div className="col-12 mb-3">
                           <label htmlFor="isbn" className='form-label'>ISBN</label>
                           <input type="text" name="isbn" id="isbn" className='form-control' defaultValue={book?.isbn || ""} />
                        </div>
                        <div className="col-12 mb-3">
                           <label htmlFor="authors" className='form-label'>Author</label>
                           <input type="text" name="authors" id="authors" className='form-control' defaultValue={book?.authors || ""} />
                        </div>
                        <div className="col-12 mb-3">
                           <div className="row">
                              <div className="col-lg-6">
                                 <label htmlFor="publishedYear" className='form-label'>Published Year</label>
                                 <select name="publishedYear" className='form-select' id="publishedYear">
                                    {book?.publishedYear && <option value={book?.publishedYear}>{book?.publishedYear}</option>}
                                    {
                                       publishedYear.map((year: number) => {
                                          return (
                                             <option key={year} value={year}>{year}</option>
                                          )
                                       })
                                    }
                                 </select>
                              </div>

                              <div className="col-lg-6">
                                 <label htmlFor="categories" className='form-label'>Book Category</label>
                                 <select name="categories" id="categories" className='form-select' defaultValue={book?.categories || ""}>
                                    {
                                       type === "modify" ? <option value={book?.categories}>{book?.categories}</option> : <option value="" disabled>Choose Category</option>
                                    }


                                    {
                                       BOOK_CATEGORIES.map((category: any, index: number) => {
                                          return (
                                             <option key={index} value={category}>{category}</option>
                                          )
                                       })
                                    }
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div className="col-12 mb-3">
                           <label htmlFor="numberPages" className='form-label'>Number Of Pages</label>
                           <input type="text" name="numberPages" id="numberPages" className='form-control' defaultValue={book?.numberPages || ""} />
                        </div>
                        <div className="col-12 mb-3">
                           <label htmlFor="description" className='form-label'>Book Description</label>
                           <textarea name="description" className='form-control' id="description" cols={30} rows={8} defaultValue={book?.description || ""}></textarea>
                        </div>

                        <div className="col-12 mb-3">
                           <label htmlFor="thumbnail" className='form-label'>Book Image</label>
                           <div style={imgBoxStyle}>
                              {
                                 thumbnailPreview ?
                                    <img src={thumbnailPreview || ""}
                                       alt=""
                                       srcSet={thumbnailPreview || ""}
                                       style={imgStyle}
                                    /> : book?.thumbnail ? <img src={imgSrcSet(book?.thumbnail) || ""}
                                       alt=""
                                       srcSet={book?.thumbnail || ""}
                                       style={imgStyle}
                                    /> : <span style={spStyle}>Upload Book Image</span>
                              }

                              <input
                                 className="form-control form-control-sm"
                                 type="file"
                                 name="thumbnail"
                                 id="thumbnail"
                                 accept=".jpeg, .jpg, .png, .gif"
                                 onChange={(e: any) => previewImage(e.target.files[0], setThumbnailPreview)}
                                 style={fileStyle}
                              />
                           </div>
                        </div>

                        <div className="col-12 mb-3">
                           <button className='btn btn-primary' type='submit'>{type === "modify" ? "Modify Now" : "Add Book"}</button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default BookModifier;