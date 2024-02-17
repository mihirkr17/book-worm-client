/* eslint-disable react/no-unescaped-entities */
import { getDateTime, imgSrcSet } from '@/Functions/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleListingIndex = ({ searchedArticles, totalArticlesCount }: { totalArticlesCount: number, searchedArticles: any[] }) => {

   const router = useRouter();
   const itemsPerPage = 10;
   const currentPage = parseInt(router?.query?.page as string, 10) || 1;

   const handlePageChange = (page: any) => {
      router.push(`/article-listing?page=${page}`);
   };

   return (
      <div className="row row-cols-1 row-cols-md-1 g-4">

         {
            Array.isArray(searchedArticles) && searchedArticles.map((article: any) => {
               return (
                  <div className="col" key={article?._id}>
                     <div className="card h-100 card-highlight">
                        <img src={imgSrcSet(article?.thumbnail)} className="card-img" />
                        <div className="card-body d-flex flex-column justify-content-between">
                           <h5 className="card-title">{article?.title}</h5>
                           <p className="article-meta text-left">
                              <span>Published on {getDateTime(article?.articleCreatedAt)}</span>
                              <br />
                              <strong>By {article?.authorName}</strong>
                           </p>

                           <p className="first-paraf">
                              {article?.metaDescription && article?.metaDescription.length >= 100 ? article?.metaDescription.slice(0, 100) + "..." : article?.metaDescription}
                           </p>
                           <Link href={`/article/${article?._id}`} className="btn btn-dark ">Read more</Link>
                        </div>
                     </div>
                  </div>
               )
            })
         }



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
   );
};

export const getServerSideProps = (async (req: any) => {
   // Fetch data from external API
   const { page, limit, } = req?.query;
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/articles/?page=${page || 1}&limit=${limit || 10}`, {
      method: "GET"
   })
   const data = await res.json()
   // Pass data to the page via props
   return {
      props: {
         searchedArticles: data?.data?.searchResults?.searchedArticles,
         totalArticlesCount: data?.data?.searchResults?.totalArticlesCount[0]?.number || 0
      }
   }
})


export default ArticleListingIndex;