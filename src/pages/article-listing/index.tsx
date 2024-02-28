/* eslint-disable react/no-unescaped-entities */
import { getDateTime, imgSrcSet } from '@/Functions/common';
import ArticleCard from '@/components/Cards/ArticleCard';
import { SERVER_URI } from '@/constants/constant';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleListingIndex = ({ searchedArticles, totalArticlesCount, recentArticles, auth }: any) => {

   const router = useRouter();
   const itemsPerPage = 10;
   const currentPage = parseInt(router?.query?.page as string, 10) || 1;

   const handlePageChange = (page: any) => {
      router.push(`/article-listing?page=${page}`);
   };


   async function searchArticleHandler(e: any) {
      try {
         e.preventDefault();

         let search = e.target.searchArticle.value;
         search = search.replaceAll(" ", "+");
         router.push(`/article-listing?page=${currentPage || 1}${search && "&q=" + search || ""}`);

      } catch (error: any) {

      }
   }

   return (
      <div>
         <div className="py-4">
            <form onSubmit={searchArticleHandler} className='d-flex' role="search">
               <input type="search" className='form-control me-2' name="searchArticle" id="searchArticle" defaultValue={router?.query?.q || ""} />
               <button type='submit' className='btn btn-outline-success'>Search</button>
            </form>
         </div>
         <div className="row">
            <div className='col-md-8'>
               {
                  Array.isArray(searchedArticles) && totalArticlesCount >= 1 ? searchedArticles.map((article: any) => {
                     return (
                        <ArticleCard key={article?._id} article={article}></ArticleCard>
                        // <div className="col" key={article?._id}>
                        //    <div className="card h-100 card-highlight">
                        //       <img src={imgSrcSet(article?.thumbnail)} className="card-img" />
                        //       <div className="card-body d-flex flex-column justify-content-between">
                        //          <h5 className="card-title">{article?.title}</h5>
                        //          <p className="article-meta text-left">
                        //             <span>Published on {getDateTime(article?.articleCreatedAt)}</span>
                        //             <br />
                        //             <strong>By {article?.authorName}</strong>
                        //          </p>

                        //          <p className="first-paraf">
                        //             {article?.metaDescription && article?.metaDescription.length >= 100 ? article?.metaDescription.slice(0, 100) + "..." : article?.metaDescription}
                        //          </p>
                        //          <Link href={`/article/${article?._id}`} className="btn btn-dark ">Read more</Link>
                        //       </div>
                        //    </div>
                        // </div>
                     )
                  }) : <div>
                     <p>No articles found</p>
                  </div>
               }


               <div className="py-2">
                  {
                     Array.isArray(searchedArticles) && searchedArticles.length >= 1 &&
                     <nav aria-label="Page navigation" className="custom-pagination-margin">
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
            </div>

            <aside className="col-md-4">

               <div>
                  <h3 className="pt-2 pb-5">Recent Articles</h3>

                  <div className="row">
                     {
                        Array.isArray(recentArticles) && recentArticles.map((article: any) => {
                           return (<div className="col-12" key={article?._id}>
                              <div className="row">
                                 <div className="col-4">
                                    <img src={imgSrcSet(article?.thumbnail)} style={{ width: "100%" }} alt="Recent Article Image" />
                                 </div>
                                 <div className="col-8">
                                    <h6><Link href={`/article/${article?._id}`}>{article?.title}</Link></h6>
                                    <small className='text-muted'>Created At {getDateTime(article?.articleCreatedAt)}</small>
                                 </div>
                              </div>
                           </div>)
                        })
                     }

                  </div>

               </div>
            </aside>

         </div>
      </div>
   );
};

export const getServerSideProps = (async (req: any) => {
   try {
      // Fetch data from external API
      const { page, limit, q } = req?.query;
      const res = await fetch(`${SERVER_URI}api/v1/articles/?page=${page || 1}&limit=${limit || 10}&q=${q || ""}`, {
         method: "GET"
      })
      const data = await res.json()
      // Pass data to the page via props
      return {
         props: {
            searchedArticles: data?.data?.searchResults?.searchedArticles || [],
            totalArticlesCount: data?.data?.searchResults?.totalArticlesCount[0]?.number || 0,
            recentArticles: data?.data?.searchResults?.recentArticles || []
         }
      }
   } catch (error: any) {
      console.log(error?.message);
      return {
         props: {
            searchedArticles: [],
            totalArticlesCount: 0,
            recentArticles: []
         }
      }
   }
}) satisfies GetServerSideProps


export default ArticleListingIndex;