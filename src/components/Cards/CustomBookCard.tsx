import { imgSrcSet, titleViewer } from '@/Functions/common';
import React from 'react';
import Link from 'next/link';

const CustomBookCard = ({ book, action, deleteHandler }: any) => {
   return (
      <div className="book_card__wrapper">
         <div className="book_card__img" style={{ backgroundImage: `url(${imgSrcSet(book?.thumbnail)})` }}>
            <div className="stars">
               <span className="star">&#9733;</span>{book?.averageRatings || 0}({book?.totalRatingsCount || 0})
            </div>
         </div>
         <div className="book_card__info">
            <div className="title">{titleViewer(book?.title)}</div>
            <div className="author">{book?.authors}</div>

            <ul className="controls">
               <li className="control">
                  <Link href={`/book/${book?._id}`} className="mx-auto">Details</Link>
               </li>
               {
                  action === "modify" && <>
                     <li className="control">
                        <button onClick={() => deleteHandler(book?._id)}>Remove</button>
                     </li>

                  </>
               }
            </ul>
         </div>
      </div>
   )
};

export default CustomBookCard;