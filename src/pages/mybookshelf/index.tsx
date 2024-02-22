
import { useFetch } from "@/Hooks/useFetch";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Link from "next/link";
import ProtectedPage from "@/Functions/ProtectedPage";
import { imgSrcSet, titleViewer } from "@/Functions/common";
import { useState } from "react";
import CustomBookCard from "@/components/Cards/CustomBookCard";

export default ProtectedPage((props: any) => {

   const { user, setPopupMsg } = props?.auth;
   const { data, refetch }: any = useFetch(`/books/mybookself`);



   const ratedBooks = data?.data?.ratedBooks || [];
   const readBooks = data?.data?.readBooks || [];
   const unreadBooks = data?.data?.unreadBooks || [];

   // Home slider viewport options
   const slideBreakPoints = {
      0: {
         slidesPerView: 1,
      },
      400: {
         slidesPerView: 2,
      },
      639: {
         slidesPerView: 3,
      },
      865: {
         slidesPerView: 3
      },
      1000: {
         slidesPerView: 4
      },
      1500: {
         slidesPerView: 6
      },
      1700: {
         slidesPerView: 7
      }
   }

   async function deleteReadCategoryBook(bookId: string) {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/books/delete-read-category/book/${bookId}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${props?.auth?.token || ""}`
            }
         });

         const result = await response.json();

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            refetch()
         } else {
            setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   return (
      <div className="py-2">

         <h1>My Book Self</h1>




         {/* <!-- Books which are already read by logged user --> */}

         <div className="py-3">
            <h3 className="text-left my-4 mb-0 headline1">Already read ({readBooks && readBooks?.length || 0}):</h3>

            {
               Array.isArray(readBooks) && readBooks.length >= 1 ? <Swiper
                  spaceBetween={50}
                  breakpoints={slideBreakPoints}
               >
                  {
                     readBooks.map((book: any) => {
                        return (
                           <SwiperSlide key={book?._id}>
                              <CustomBookCard book={book} action={"modify"} deleteHandler={deleteReadCategoryBook}></CustomBookCard>
                           </SwiperSlide>
                        )
                     })
                  }
               </Swiper> : <div>
                  <p>Books not found.</p>
               </div>
            }
         </div>



         {/* <!-- Books which logged user wants to read --> */}

         <div className="py-3">
            <h3 className="text-left my-4 mb-0 headline1">Want to read ({unreadBooks && unreadBooks.length || 0}):</h3>
            {
               Array.isArray(unreadBooks) && unreadBooks.length >= 1 ? <Swiper
                  spaceBetween={50}
                  breakpoints={slideBreakPoints}
               >
                  {
                     unreadBooks.map((book: any) => {
                        return (
                           <SwiperSlide key={book?._id}>
                              <CustomBookCard book={book} action={"modify"} deleteHandler={deleteReadCategoryBook}></CustomBookCard>
                           </SwiperSlide>
                        )
                     })
                  }
               </Swiper> : <div>
                  <p>Books not found.</p>
               </div>
            }
         </div>


         {/* <!-- Books which are rated by logged user --> */}

         <div className="py-3">
            <h3 className="text-left my-4 mb-0 headline1">Rated ({ratedBooks && ratedBooks?.length || 0}):</h3>
            {
               Array.isArray(ratedBooks) && ratedBooks.length >= 1 ? <Swiper
                  spaceBetween={30}
                  breakpoints={slideBreakPoints}
               >
                  {
                     ratedBooks.map((book: any) => {
                        return (
                           <SwiperSlide key={book?._id}>

                              <CustomBookCard book={book}></CustomBookCard>
                           </SwiperSlide>
                        )
                     })
                  }
               </Swiper> : <div>
                  <p>Books empty.</p>
               </div>
            }
         </div>
      </div>
   )
})