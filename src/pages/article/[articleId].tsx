import { getDateTime, imgSrcSet } from '@/Functions/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleId = ({ article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
   const router = useRouter();

   const { articleId } = router?.query;


   return (
      <div>
         <Head>
            <meta name='description' content={article?.metaDescription || ""} />
            <title>{article?.title}</title>
         </Head>
         <div className="row justify-content-center row">
            <div className="col-md-12 text-center top-row mb-3">
               <img src={imgSrcSet(article?.thumbnail)} alt="Book Cover" className="img-fluid rounded mb-3" />
            </div>

            <div className="col-md-12 bottom-row">
               <h1 className="h1 text-center">{article?.title}</h1>

               <div className="article-meta text-left py-5">
                  <small className='text-muted'>Author: {article?.authorName}</small>
                  <br />
                  <small className='text-muted'><i>Published on {getDateTime(article?.articleCreatedAt)}</i></small>
               </div>

               <div>
                  <article dangerouslySetInnerHTML={{ __html: article?.content }}>
                     {/* {article?.content} */}
                  </article>
               </div>
            </div>
         </div>
      </div>
   );
};




export const getServerSideProps: GetServerSideProps<{ article: any }> = (async (req: any) => {
   try {
      // Fetch data from external API
      const { articleId } = req?.params;
      const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/articles/single/${articleId}`, {
         method: "GET"
      })
      const data = await res.json()
      // Pass data to the page via props
      return {
         props: {
            article: data?.data?.article || {},
         }
      }
   } catch (error: any) {
      console.log(error?.message);
      return {
         props: {
            article: {},
         }
      }
   }
})
export default ArticleId;

