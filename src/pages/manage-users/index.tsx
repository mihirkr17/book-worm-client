import EditorProtectedPage from '@/Functions/EditorProtectedPage';
import { CookieParser, imgSrcSet } from '@/Functions/common';
import { useFetch } from '@/Hooks/useFetch';
import useMessage from '@/Hooks/useMessage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default EditorProtectedPage(function () {
   const { msg, setMessage } = useMessage();
   const router = useRouter();
   const itemsPerPage = 10;
   const currentPage = parseInt(router.query.page as string, 10) || 1;

   const { data, refetch }: any = useFetch(`/users/get-users?page=${currentPage}&limit=${itemsPerPage}`);

   const searchedUsers = data?.data?.users || [];
   const totalUsersCount = data?.data?.totalUsersCount || 0;

   // Delete book by id
   async function deleteUserHandler(userId: string, nickName: string) {
      try {

         if (!userId) throw new Error(`Required article id!`);

         if (window.confirm(`Want to delete ${nickName}`)) {
            const cookie = CookieParser();
            const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/users/delete-user/${userId}`, {
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
      router.push(`/manage-users?page=${newPage}`);
   };

   let userNumber = 1;
   return (
      <div className="">

         <div className="py-4 d-flex justify-content-between align-items-center">
            <header>
               <h1 className="text-left">Manage Users</h1> <br />
               <h6>Total {totalUsersCount} {totalUsersCount >= 2 ? "Users" : "User"}</h6>
               {msg}
            </header>
         </div>

         <div className="left-column">

            <table className="table table-bordered text-center align-middle">
               <thead>
                  <tr>
                     <th scope="col">No</th>
                     <th scope="col">Login</th>
                     <th scope="col">E-mail</th>
                     <th scope="col">Role</th>
                     <th scope="col">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     Array.isArray(searchedUsers) && searchedUsers.length >= 1 ? searchedUsers.map((user: any, index: number) => {
                        return (
                           <tr key={user?._id}>
                              <th scope="row">{userNumber + index}</th>

                              <td>{user?.firstName + " " + user?.lastName}</td>
                              <td>{user?.email}</td>
                              <td>{user?.role}</td>
                              <td>
                                 <button type="button" className="btn btn-dark ms-3" onClick={() => deleteUserHandler(user?._id, user?.firstName)}>Delete</button>
                              </td>
                           </tr>
                        )
                     }) : <tr>
                        No users found
                     </tr>
                  }


               </tbody>
            </table>
         </div>
         <br />
         {/* Pagination */}
         {
            Array.isArray(searchedUsers) && searchedUsers.length >= 0 && <nav aria-label="Page navigation" className="custom-pagination-margin">
               <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                  </li>

                  {Array.from({ length: Math.ceil(totalUsersCount / itemsPerPage) }, (_, index) => (
                     <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                           {index + 1}
                        </a>
                     </li>
                  ))}

                  <li className={`page-item ${currentPage === Math.ceil(totalUsersCount / itemsPerPage) && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                  </li>
               </ul>
            </nav>
         }

      </div>
   )
})