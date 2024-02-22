/* eslint-disable react/no-unescaped-entities */
import { getDateTime, imgSrcSet } from '@/Functions/common';
import Link from 'next/link';
import React from 'react';

const ArticleCard = ({ article }: any) => {
   return (
      <article className="row">

         <div className="col-md-5">
            <div style={{height: "200px"}}>
               <img src={imgSrcSet(article?.thumbnail)} alt="Article Image" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <p className="article-info">{getDateTime(article?.articleCreatedAt)} |   <strong>By {article?.authorName}</strong></p>
         </div>

         <div className="col-md-7">
            <h2 className="article-title">{article?.title}</h2>
            <p className="article-body">
               {article?.metaDescription && article?.metaDescription.length >= 400 ? article?.metaDescription.slice(0, 400) + "..." : article?.metaDescription}
            </p>
            <Link href={`/article/${article?._id}`} className="btn btn-dark ">Read more</Link>
         </div>
      </article>
   );
};

export default ArticleCard;