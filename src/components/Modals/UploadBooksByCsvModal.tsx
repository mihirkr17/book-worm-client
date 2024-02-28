
import { apiHandler } from '@/Functions/common';
import { API_URLS } from '@/constants/constant';
import React from 'react';




const UploadBooksByCsvModal = ({ auth }: any) => {

   async function uploadBookByCsv(e: any) {
      try {
         e.preventDefault();

         const bookFile = e.target.book.files[0];

         if (!bookFile) throw new Error(`Required csv file!`);

         const formData = new FormData(e.target);

         const result = await apiHandler(API_URLS.addBookByCsvUrl, "POST", formData, "FORM_DATA"); // response.json();

         window.alert(result?.message);

      } catch (error: any) {
         window.alert(error?.message);
      }
   }
   return (
      <div className="modal fade" id="uploadBookByCsvModal" tabIndex={-1} aria-labelledby="uploadBookByCsvModalLabel" aria-hidden="true">
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h1 className="modal-title fs-5" id="uploadBookByCsvModalLabel">Upload Books By CSV</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>

               <div className="modal-body">
                  <form onSubmit={uploadBookByCsv}>

                     <div className='py-2'>
                        <input className='form-control' type="file" name="book" id="book" accept='.csv' />
                     </div>

                     <br />
                     <br />

                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Upload</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UploadBooksByCsvModal;