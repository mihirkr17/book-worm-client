import EditorProtectedPage from '@/Functions/EditorProtectedPage';
import { apiHandler, getDateTime, imgSrcSet } from '@/Functions/common';
import { useFetch } from '@/Hooks/useFetch';
import { API_URLS } from '@/constants/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default EditorProtectedPage(function (props: any) {
   const { setPopupMsg } = props?.auth;
   const router = useRouter();
   const itemsPerPage = 10;
   const currentPage = parseInt(router.query.page as string, 10) || 1;

   const { data, refetch }: any = useFetch(`/articles/?action=false&page=${currentPage}&limit=${itemsPerPage}`);

   const searchedArticles = data?.data?.searchResults?.searchedArticles || [];
   const totalArticlesCount = data?.data?.searchResults?.totalArticlesCount[0]?.number || 0;

   // Delete book by id
   async function deleteArticleHandler(articleId: string, articleTitle: string) {
      try {

         if (!articleId) throw new Error(`Required article id!`);

         if (window.confirm(`Want to delete ${articleTitle}`)) {

            const result = await apiHandler(API_URLS.deleteArticleUrl(articleId), "DELETE");

            if (result?.success) {
               refetch();
               return setPopupMsg(result?.message, "success");
            } else {
               return setPopupMsg(result?.message, "danger");
            }
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }


   const handlePageChange = (newPage: number) => {
      router.push(`/manage-articles?page=${newPage}`);
   };

   let articleNumber = 1;
   return (
      <div className="container">

         <div className="py-4 d-flex justify-content-between align-items-center">
            <header>
               <h1 className="text-left">Manage Articles</h1> <br />
               <h6>Total {totalArticlesCount} {totalArticlesCount >= 2 ? "Articles" : "Article"}</h6>
            </header>
            <div>
               <Link href={`/manage-articles/article/add-article`} className='btn btn-primary'>Add New Article</Link>
            </div>
         </div>

         <div className="left-column table-responsive">

            <table className="table table-bordered text-center align-middle">
               <thead>
                  <tr>
                     <th scope="col">No</th>
                     <th scope="col">Thumbnail</th>
                     <th scope="col">Title</th>
                     <th scope='col'>Author</th>
                     <th scope="col">Datetime</th>
                     <th scope="col">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     Array.isArray(searchedArticles) && totalArticlesCount >= 1 ? searchedArticles.map((article: any, index: number) => {
                        return (
                           <tr key={article?._id}>
                              <th scope="row">{articleNumber + index}</th>
                              <td>
                                 <img src={imgSrcSet(article?.thumbnail)} alt="Book Cover" className="img-fluid rounded mb-3 table-img" /></td>
                              <td>{article?.title}</td>
                              <td>{article?.authorName}</td>
                              <td>{getDateTime(article?.articleCreatedAt)}</td>
                              <td>
                                 <Link href={`/manage-articles/article/modify?id=${article?._id}`} style={{ display: "inline-block" }}
                                    className="btn btn-info btn-sm">Modify</Link>
                                 <br />
                                 <br />
                                 <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteArticleHandler(article?._id, article?.title)}>Delete</button>
                              </td>
                           </tr>
                        )
                     }) : <tr>
                        No articles found
                     </tr>
                  }


               </tbody>
            </table>
         </div>
         <br />
         {/* Pagination */}
         {
            Array.isArray(searchedArticles) && searchedArticles.length >= 0 && <nav aria-label="Page navigation" className="custom-pagination-margin">
               <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                  </li>

                  {Array.from({ length: Math.ceil(totalArticlesCount / itemsPerPage) }, (_, index) => (
                     <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                           {index + 1}
                        </a>
                     </li>
                  ))}

                  <li className={`page-item ${currentPage === Math.ceil(totalArticlesCount / itemsPerPage) && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                  </li>
               </ul>
            </nav>
         }

      </div>
   )
})