import EditorProtectedPage from '@/Functions/EditorProtectedPage';
import { CookieParser } from '@/Functions/common';
import { useFetch } from '@/Hooks/useFetch';
import useMessage from '@/Hooks/useMessage';
import { useRouter } from 'next/router';
import React from 'react';

export default EditorProtectedPage(function () {
   const { msg, setMessage } = useMessage();
   const router = useRouter();
   const itemsPerPage = 10;
   const currentPage = parseInt(router.query.page as string, 10) || 1;

   const { data, refetch }: any = useFetch(`/books/show-all-comments?page=${currentPage}&limit=${itemsPerPage}`);

   const searchedComments = data?.data?.comments || [];
   const totalCommentsCount = data?.data?.totalCommentsCount || 0;

   // Delete book by id
   async function deleteCommentHandler(commentId: string) {
      try {

         if (!commentId) throw new Error(`Required comment id!`);

         if (window.confirm(`Want to delete this comment`)) {
            const cookie = CookieParser();
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/books/comment/delete-comment/${commentId}`, {
               method: "DELETE",
               headers: {
                  Authorization: `Bearer ${cookie?.appSession || ""}`
               }
            });

            const result = await response.json();

            if (result?.success) {
               refetch();
               return setMessage(result?.message, "success");
            } else {
               return setMessage(result?.message, "danger");
            }
         }

      } catch (error: any) {
         setMessage(error?.message, "danger");
      }
   }


   const handlePageChange = (newPage: number) => {
      router.push(`/manage-comments?page=${newPage}`);
   };

   let articleNumber = 1;
   return (
      <div className="container">

         <div className="py-4 d-flex justify-content-between align-items-center">
            <header>
               <h1 className="text-left">Manage Book Comments</h1> <br />
               <h6>Total {totalCommentsCount} {totalCommentsCount >= 2 ? "Comments" : "Comment"}</h6>
               {msg}
            </header>
         </div>

         <div className="left-column">

            <table className="table table-bordered text-center align-middle">
               <thead>
                  <tr>
                     <th scope="col">No</th>
                     <th scope="col">Author</th>
                     <th scope="col">Content</th>
                     <th scope="col">No Reports</th>
                     <th scope="col">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     Array.isArray(searchedComments) && totalCommentsCount >= 1 ? searchedComments.map((comment: any, index: number) => {
                        return (
                           <tr key={comment?._id}>
                              <th scope="row">{articleNumber + index}</th>

                              <td>{comment?.author}</td>
                              <td>{comment?.content}</td>
                              <td>{comment?.reportsCount || 0}</td>
                              <td>
                                 <button type="button" className="btn btn-dark ms-3" onClick={() => deleteCommentHandler(comment?._id)}>Delete</button>
                              </td>
                           </tr>
                        )
                     }) : <tr>
                        No comments found
                     </tr>
                  }


               </tbody>
            </table>
         </div>
         <br />
         {/* Pagination */}
         {
            Array.isArray(searchedComments) && searchedComments.length >= 0 && <nav aria-label="Page navigation" className="custom-pagination-margin">
               <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                  </li>

                  {Array.from({ length: Math.ceil(totalCommentsCount / itemsPerPage) }, (_, index) => (
                     <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                           {index + 1}
                        </a>
                     </li>
                  ))}

                  <li className={`page-item ${currentPage === Math.ceil(totalCommentsCount / itemsPerPage) && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                  </li>
               </ul>
            </nav>
         }

      </div>
   )
})