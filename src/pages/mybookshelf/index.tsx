
import { useFetch } from "@/Hooks/useFetch";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Link from "next/link";
import ProtectedPage from "@/Functions/ProtectedPage";
import useMessage from "@/Hooks/useMessage";
import { CookieParser } from "@/Functions/common";
import { useAuthContext } from "@/lib/AuthProvider";
import { useState } from "react";

export default ProtectedPage(() => {

   const { user } = useAuthContext();
   const [myBooksLimit, setMyBooksLimit] = useState<number>(10);

   const { data, refetch }: any = useFetch(`/books/mybookself?limit=${myBooksLimit}&page=${myBooksLimit}`);
   const { msg, setMessage } = useMessage();



   const ratedBooks = data?.data?.ratedBooks || [];
   const readBooks = data?.data?.readBooks || [];
   const unreadBooks = data?.data?.unreadBooks || [];
   const myBooks = data?.data?.myBooks[0] || {};
   
   async function deleteReadCategoryBook(bookId: string) {
      try {

         const cookie = CookieParser();
         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/books/delete-read-category/book/${bookId}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${cookie?.appSession ? cookie?.appSession : ""}`
            }
         });

         const result = await response.json();

         if (result?.success) {
            setMessage(result?.message, "success");
            refetch()
         } else {
            setMessage(result?.message, "danger");
         }

      } catch (error: any) {
         setMessage(error?.message, "danger");
      }
   }



   function slideChanged(e: any) {

      const swipeDirection = e?.swipeDirection || "next";

      if (swipeDirection === "next") {
         setMyBooksLimit((e: any) => e + 10);
      }
   }

   return (
      <div className="py-2">
         {msg}

         <div className="py-5">
            <Link href={user?.role === "Editor" ? 'manage-books/book/add-book' : `/mybookshelf/book/add-book`} className='btn btn-primary'>Add New Book</Link>
         </div>


         {/* <!-- Books which are rated by logged user --> */}

         <h1 className="text-left my-4 mb-0 headline1">Rated ({ratedBooks && ratedBooks?.length || 0}):</h1>
         <Swiper
            spaceBetween={30}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
         >
            {
               Array.isArray(ratedBooks) && ratedBooks.map((book: any) => {
                  return (
                     <SwiperSlide key={book?._id}>
                        <div className="row">
                           <div className="col-12">
                              <div className="card  card-highlight">
                                 <img src={book?.thumbnail} className="card-img" />
                                 <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{book?.title}</h5>
                                    <p className="card-text">{book?.authors}</p>
                                    <div className="card-rating">
                                       <span className="star">&#9733;</span> {book?.averageRatings || 0}/10
                                    </div>
                                    <Link href={`/book/${book?._id}`} className="btn btn-dark mx-auto">Details</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  )
               })
            }
         </Swiper>

         {/* <!-- Books which are already read by logged user --> */}

         <h1 className="text-left my-4 mb-0 headline1">Already read ({readBooks && readBooks?.length || 0}):</h1>
         <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
         >
            {
               Array.isArray(readBooks) && readBooks.map((book: any) => {
                  return (
                     <SwiperSlide key={book?._id}>
                        <div className="row">
                           <div className="col-12">
                              <div className="card card-highlight">
                                 <img src={book?.thumbnail} className="card-img" />
                                 <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{book?.title}</h5>
                                    <p className="card-text">{book?.authors}</p>
                                    <div className="card-rating">
                                       <span className="star">&#9733;</span> {book?.averageRatings || 0}/10
                                    </div>
                                    <Link href={`/book/${book?._id}`} className="btn btn-dark mx-auto">Details</Link>
                                    <button className="btn btn-primary" onClick={() => deleteReadCategoryBook(book?._id)}>Remove</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  )
               })
            }
         </Swiper>


         {/* <!-- Books which logged user wants to read --> */}

         <h1 className="text-left my-4 mb-0 headline1">Want to read ({unreadBooks && unreadBooks.length || 0}):</h1>
         <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
         >
            {
               Array.isArray(unreadBooks) && unreadBooks.map((book: any) => {
                  return (
                     <SwiperSlide key={book?._id}>
                        <div className="row">
                           <div className="col-12">
                              <div className="card  card-highlight">
                                 <img src={book?.thumbnail} className="card-img" />
                                 <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{book?.title}</h5>
                                    <p className="card-text">{book?.authors}</p>
                                    <div className="card-rating">
                                       <span className="star">&#9733;</span> {book?.averageRatings || 0}/10
                                    </div>
                                    <Link href={`/book/${book?._id}`} className="btn btn-dark mx-auto">Details</Link>
                                    <button className="btn btn-primary" onClick={() => deleteReadCategoryBook(book?._id)}>Remove</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  )
               })
            }
         </Swiper>

         {/* <!-- Books which logged user added to database --> */}

         <h1 className="text-left my-4 mb-0 headline1">
            Added ({Array.isArray(myBooks?.totalBooksCount) ? myBooks?.totalBooksCount[0].number : 0})
         </h1>
         <Swiper
            spaceBetween={30}
            slidesPerView={4}
            onSlideChange={(e) => slideChanged(e)}
            onSwiper={(swiper) => console.log(swiper)}
         >
            {
               Array.isArray(myBooks?.allBooks) && myBooks?.allBooks.map((book: any) => {
                  return (
                     <SwiperSlide key={book?._id}>
                        <div className="row">
                           <div className="col-12">
                              <div className="card  card-highlight">
                                 <img src={book?.thumbnail} className="card-img" />
                                 <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{book?.title}</h5>
                                    <p className="card-text">{book?.authors}</p>
                                    <div className="card-rating">
                                       <span className="star">&#9733;</span> {book?.averageRatings || 0}/10
                                    </div>
                                    <Link href={user?.role === "Editor" ? `manage-books/book/modify?id=${book?._id}` : `/mybookshelf/book/modify?id=${book?._id}`} className="btn btn-dark mx-auto">Modify</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  )
               })
            }
         </Swiper>
      </div>
   )
})