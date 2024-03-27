/* eslint-disable react/no-unescaped-entities */
import { apiHandler, getDateTime } from '@/Functions/common';
import { API_URLS, BASE_URLS, SERVER_URI } from '@/constants/constant';
import { faFlag, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CommentModal from './CommentModal';

const BookDetails = (props: any) => {
   const router = useRouter();
   const { book, auth } = props;
   const { user, setPopupMsg } = auth;
   const { bookId } = router?.query;
   const totalCommentsCount = Array.isArray(book?.totalCommentsCount) ? book?.totalCommentsCount[0]?.number || 0 : 0;
   const commentsAll = book?.commentsAll || [];
   const [showComments, setShowComments] = useState([]);

   // Add book Ratings
   async function handleRating(value: string) {
      try {
         if (!value) throw new Error(`Unexpected error when rate this book!`);

         if (!user?._id) {
            router.push(`/login?redirect_uri=${router?.asPath}`);
            throw new Error(`Please Login`);
         }

         const result = await apiHandler(API_URLS?.bookRateUrl(book?._id), "POST", { rating: parseInt(value) });

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            router.push(`/book/${router?.query?.bookId}`);
         } else {
            setPopupMsg(result?.message, "danger");
         }
      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }


   // add comments
   async function handleBookComment(e: any) {
      try {

         e.preventDefault();

         if (!user?._id) {
            router.push(`/login?redirect_uri=${router?.asPath}`);
            throw new Error(`Please Login`);
         }

         const content = e.target.content.value;


         if (!content || content.length === "") {
            throw new Error("Please add some text!");
         }

         const result = await apiHandler(API_URLS?.bookCommentUrl(book?._id), "POST", { content })

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            e.target.reset();
            router.push(BASE_URLS?.bookUrl(bookId ? bookId : ""));
         } else {
            setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }


   // handle read, to-read controller
   async function handleReadAndToRead(bookId: string, status: string) {

      try {

         if (!user?._id) {
            router.push(`/login?redirect_uri=${router?.asPath}`);
            throw new Error(`Please Login`);
         }

         if (!["read", "to-read"].includes(status)) throw new Error("Invalid status!");

         const result = await apiHandler(API_URLS?.bookReadToReadUrl(bookId), "PUT", { status })

         if (result?.success) {
            return setPopupMsg(result?.message, "success");
         } else {
            return setPopupMsg(result?.message, "danger");
         }
      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }

   }


   async function reportCommentHandler(commentId: string) {
      try {

         if (!user?._id) {
            router.push(`/login?redirect_uri=${router?.asPath}`);
            throw new Error(`Please Login`);
         }


         const result = await apiHandler(API_URLS?.bookCommentReportUrl(commentId), "POST");

         if (result?.success) {
            return setPopupMsg(result?.message, "success");
         } else {
            return setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }


   async function handleDeleteOwnComment(commentId: any, bookId: string) {
      try {

         if (!user?._id) {
            router.push(`/login?redirect_uri=${router?.asPath}`);
            throw new Error(`Please Login`);
         }

         const result = await apiHandler(API_URLS?.bookDeleteOwnCommentUrl(commentId, bookId), "DELETE")

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            router.push(`/book/${router?.query?.bookId}`);
         } else {
            setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   let ratingsPoints = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
   ]

   async function showAllComments(bookId: string) {
      try {
         if (!bookId) throw new Error("Required book id!");
         const result = await apiHandler(`/books/show-all-comments/${bookId}`, "GET");

         if (result?.success) {
            setShowComments(result?.data?.comments);
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   return (

      <div className="mt-4">

         <div className="row justify-content-center row">

            <div className="col-md-4 text-center">
               <div className='main_book_image mb-3'>
                  <img src={book?.thumbnail} alt="Book Cover" className="img-fluid rounded" />
               </div>
               <div className="rating-text">
                  <span className="rating-value">Average Rating: {book?.averageRatings || 0}/10</span>
                  <span>({book?.totalRatingsCount || 0} Votes)</span>
               </div>

               <form className="rating my-4 d-flex align-items-center justify-content-center gap-2 ">
                  {
                     ratingsPoints.map((point: number) => {

                        const isChecked = book?.ratingUserId && book?.ratingUserId === user?._id;

                        const isPointInRange = point >= 1 && point <= book?.ratingUserValue; // Assuming upperLimit is dynamically set
                        const colorClass = isPointInRange ? `color-active` : '';

                        return (
                           <div key={point}>
                              <fieldset className="star-rating hidelabels">
                                 <label htmlFor={`rating-${point}`}>{point}</label>
                                 <input type="radio" className={colorClass} name="rating" title={point + " Star"} value={`${point}`} id={`rating-${point}`}
                                    checked={isChecked && book?.ratingUserValue === point} onChange={e => handleRating(e.target.value)} />
                              </fieldset>
                           </div>

                        )
                     })
                  }
               </form>


               <div className='row'>
                  <div className="col-6">
                     <button className="btn btn-primary mx-1 w-100" onClick={() => handleReadAndToRead(book?._id, "to-read")}>Want to read</button>
                  </div>
                  <div className="col-6">
                     <button className="btn btn-secondary mx-1 w-100" onClick={() => handleReadAndToRead(book?._id, "read")}>Already read</button>
                  </div>
               </div>
            </div>

            {/* Book Details */}
            <div className="col-md-8">
               <h1 className="h1 text-center">{book?.title}</h1>
               <h2 className="h6 text-center">Author: &nbsp;{book?.authors}</h2>

               <h3 className="h3 text-center">{book?.subTitle}</h3>
               <p className="">
                  {book?.description}
               </p>
               <hr />
               <p><span className="label">Category:</span><span className="value">&nbsp;{book?.categories}</span></p>
               <p><span className="label">ISBN:</span><span className="value">&nbsp;{book?.isbn}</span></p>
               <p><span className="label">Number of pages:</span><span className="value">&nbsp;{book?.numberPages}</span></p>
               <p><span className="label">Publication year:</span><span className="value">&nbsp;{book?.publishedYear}</span></p>
            </div>
         </div>

         <div className="be-comment-block mt-5">
            <h4>Comments ({totalCommentsCount})</h4>

            {
               commentsAll.map((comment: any) => {
                  return (
                     <React.Fragment key={comment?._id}>
                        <div className="be-comment">
                           <div className="be-comment-content">
                              <div className='be-comment-header'>
                                 <span className="be-comment-name">
                                    {comment?.commentAuthorName}
                                 </span>
                                 <span className="be-comment-time">
                                    <i className="fa fa-clock-o"></i>
                                    {getDateTime(comment?.commentCreatedAt)}
                                 </span>
                              </div>
                              <p className="be-comment-text">
                                 {
                                    comment?.content
                                 }
                              </p>
                              <div className="be-comment-footer">

                                 <button className='btn btn-sm comment-report-btn'
                                    style={{ background: "transparent" }}
                                    title="Report this comment"
                                    onClick={() => reportCommentHandler(comment?._id)}>
                                    <FontAwesomeIcon icon={faFlag} />
                                 </button>

                                 {
                                    comment?.userId === user?._id && <button className="btn btn-sm" onClick={() => handleDeleteOwnComment(comment?._id, book?._id)}>
                                       <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                    </button>
                                 }
                              </div>
                           </div>
                        </div>
                        <hr />
                     </React.Fragment>
                  )
               })
            }
            <br />
            {
               totalCommentsCount > commentsAll.length && <div>
                  <button
                     data-bs-toggle="modal"
                     data-bs-target="#showAllCommentsModal"
                     style={{
                        background: "transparent",
                        border: "unset",
                        color: "black",
                        outline: "unset",
                        fontSize: "13px"
                     }} onClick={() => showAllComments(book?._id)}>
                     Show All Comments
                  </button>

                  {
                     <CommentModal
                        comments={showComments}
                        user={user || {}}
                        reportCommentHandler={reportCommentHandler}
                        bookId={book?._id}
                        handleDeleteOwnComment={handleDeleteOwnComment}
                     ></CommentModal>
                  }

               </div>
            }

            {
               user?._id && <div className='mt-5'>
                  <h6>Write Comment</h6>
                  <form className="form-block" onSubmit={handleBookComment}>
                     <div className="row">
                        <div className="col-md-12 mb-3">
                           <div className="form-group">
                              <textarea
                                 rows={5}
                                 cols={30}
                                 className="form-control bg-light"
                                 required
                                 placeholder="Your text"
                                 name='content'>
                              </textarea>
                           </div>

                        </div>
                        <div className="col-12">
                           <button type='submit' className="btn btn-primary pull-right">Add Comment</button>
                        </div>
                     </div>
                  </form>
               </div>
            }
         </div>
      </div>


   );
};

export const getServerSideProps = (async (context: any) => {
   try {
      // Fetch data from external API
      const { bookId } = context?.params;

      const appToken = context?.req?.cookies?.appSession ? context?.req.cookies.appSession : "";

      const res = await fetch(`${SERVER_URI}api/v1/books/single/${bookId}`, {
         method: "GET",
         headers: {
            Authorization: `Bearer ${appToken}`
         }
      })
      const data = await res.json()
      // Pass data to the page via props
      return { props: { book: data?.data?.book || {} } }
   } catch (error: any) {
      console.log(error?.message);
      return { props: { book: {} } }
   }
}) satisfies GetServerSideProps

export default BookDetails;