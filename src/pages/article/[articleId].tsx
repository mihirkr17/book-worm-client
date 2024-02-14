import { getDateTime, imgSrcSet } from '@/Functions/common';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleId = ({ article }: any) => {
   const router = useRouter();

   const { articleId } = router?.query;


   return (
      <div>
         <Head>
            <meta name='description' content={article?.content.slice(0, 100)} />
            <title>{article?.title}</title>
         </Head>
         <div className="row justify-content-center row">
            <div className="col-md-12 text-center top-row">
               <img src={imgSrcSet(article?.thumbnail)} alt="Book Cover" className="img-fluid rounded mb-3" />
            </div>

            <div className="col-md-12 bottom-row">
               <h1 className="h1 text-center">{article?.title}</h1>

               <p className="article-meta text-left">
                  <span>Published on {getDateTime(article?.articleCreatedAt)}</span>
                  <br />
                  <strong>By {article?.authorName}</strong>
               </p>

               <article>
                  <p>
                     {article?.content}
                  </p>
               </article>
            </div>
         </div>
      </div>
   );
};


export const getServerSideProps = (async (req: any) => {
   // Fetch data from external API
   const { articleId } = req?.params;
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/articles/single/${articleId}`, {
      method: "GET"
   })
   const data = await res.json()
   // Pass data to the page via props
   return {
      props: {
         article: data?.data?.article || {},
      }
   }
})
export default ArticleId;