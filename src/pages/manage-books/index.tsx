import EditorProtectedPage from '@/Functions/EditorProtectedPage';
import { CookieParser, imgSrcSet } from '@/Functions/common';
import { useFetch } from '@/Hooks/useFetch';
import useMessage from '@/Hooks/useMessage';
import UploadBooksByCsvModal from '@/components/Modals/UploadBooksByCsvModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default EditorProtectedPage(function () {
   const { msg, setMessage } = useMessage();
   const router = useRouter();
   const itemsPerPage = 30;
   const currentPage = parseInt(router.query.page as string, 10) || 1;
   const [filterInfo, setFilterInfo] = useState({
      q: "",
      sort: ""
   });

   const { data, refetch }: any = useFetch(`/books?action=false&page=${currentPage}&pageSize=${itemsPerPage}&q=${filterInfo?.q || ""}&sort=${filterInfo?.sort || ""}`);

   const searchedBooks = data?.data?.searchResults?.searchedBooks || [];
   const totalBooksCount = data?.data?.searchResults?.totalBooksCount[0]?.number || 0;

   // Delete book by id
   async function deleteBookHandler(bookId: string, bookTitle: string) {
      try {

         if (!bookId) throw new Error(`Required book id!`);

         if (window.confirm(`Want to delete ${bookTitle}`)) {
            const cookie = CookieParser();
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/books/delete/${bookId}`, {
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
      router.push(`/manage-books?page=${newPage}`);
   };



   function handleSearchBook(searchText: string) {

      setTimeout(() => {
         setFilterInfo({ ...filterInfo, q: searchText });
      }, 500)
   }

   return (
      <div className="container">

         <div className="py-4 d-flex justify-content-between align-items-center">
            <header>
               <h1 className="text-left">Manage books</h1> <br />
               <h6>Total {totalBooksCount} {totalBooksCount >= 2 ? "Books" : "Book"}</h6>
               {msg}
            </header>
            <div className='d-flex align-items-center justify-content-center'>
               <button type="button" className="btn btn-secondary me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadBookByCsvModal">
                  Upload Books
               </button>
               <UploadBooksByCsvModal></UploadBooksByCsvModal>
               <Link href={`/manage-books/book/add-book`} className='btn btn-primary'>Add New Book</Link>
            </div>
         </div>

         <div className="py-">
            <div className="navbar">
               <div className="container-fluid">
                  <form className="d-flex" role="search">
                     <input className="form-control me-2" type="search" placeholder="Search by title" aria-label="Search" onChange={(e) => handleSearchBook(e.target.value)} />
                     <select name="sort" className='form-select' id="sort" value={filterInfo?.sort || ""} onChange={(e) => setFilterInfo({ ...filterInfo, [e.target.name]: e.target.value })}>
                        <option value="">Relevance</option>
                        <option value="asc">Ascending</option>
                        <option value="dsc">Descending</option>
                     </select>
                  </form>
               </div>
            </div>
         </div>

         <div className="left-column table-responsive">

            <table className="table table-bordered text-center align-middle">
               <thead>
                  <tr>
                     <th scope="col">No</th>
                     <th scope="col">Thumbnail</th>
                     <th scope="col">Title</th>
                     <th scope="col">Author</th>
                     <th scope="col">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     Array.isArray(searchedBooks) && totalBooksCount >= 1 ? searchedBooks.map((book: any) => {
                        return (
                           <tr key={book?._id}>
                              <th scope="row">1</th>
                              <td>
                                 <img src={imgSrcSet(book?.thumbnail)} alt="Book Cover" className="img-fluid rounded mb-3 table-img" /></td>
                              <td>{book?.title}</td>
                              <td>{book?.authors}</td>
                              <td>
                                 <Link href={`/manage-books/book/modify?id=${book?._id}`} style={{ display: "inline-block" }}
                                    className="btn btn-sm btn-info">Modify</Link>
                                 <br />
                                 <br />
                                 <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteBookHandler(book?._id, book?.title)}>Delete</button>
                              </td>
                           </tr>
                        )
                     }) : <tr>No Books Found.</tr>
                  }


               </tbody>
            </table>
         </div>
         <br />
         {/* Pagination */}
         {
            Array.isArray(searchedBooks) && searchedBooks.length >= 1 &&
            <nav aria-label="Page navigation" className="custom-pagination-margin">
               <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                  </li>

                  {/* Calculate start and end page numbers for the pagination range */}
                  {Array.from({ length: Math.ceil(totalBooksCount / itemsPerPage) }, (_, index) => {
                     const startPage = (Math.floor((currentPage - 1) / 7) * 7) + 1;
                     const endPage = Math.min(startPage + 6, Math.ceil(totalBooksCount / itemsPerPage));
                     if (index + 1 >= startPage && index + 1 <= endPage) {
                        return (
                           <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                              <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                 {index + 1}
                              </a>
                           </li>
                        );
                     }
                     return null;
                  })}


                  <li className={`page-item ${currentPage === Math.ceil(totalBooksCount / itemsPerPage) && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                  </li>
               </ul>
            </nav>
         }
      </div>
   )
})