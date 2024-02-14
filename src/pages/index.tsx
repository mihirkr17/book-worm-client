/* eslint-disable react/no-unescaped-entities */

import { useFetch } from "@/Hooks/useFetch";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { getDateTime, imgSrcSet } from "@/Functions/common";

export default function Home({ highestRatedBooks, newestBooks }: any) {

  const { data }: any = useFetch(`/articles/home`);

  const article = data?.data?.articles[0] || {};


  return (
    <div>

      {
        article ?
          <div className="col">
            <div className="card2 h-100 card-highlight2">
              <img src={imgSrcSet(article?.thumbnail)} className="card-img2" />
              <div className="card-body2 d-flex flex-column justify-content-between">
                <h5 className="card-title2">{article?.title}</h5>
                <p className="article-meta2 text-left">
                  <span>Published on {getDateTime(article?.articleCreatedAt)}</span>
                  <br />
                  <strong>By {article?.authorName}</strong>
                </p>

                <p className="first-paraf">
                  {article?.content}</p>
                <Link href={`/article/${article?._id}`} className="btn btn-dark ">Read more</Link>
              </div>
            </div>
          </div> :
          <div className="col">
            <p>Please Add Article</p>
          </div>
      }



      <h1 className="text-left my-4 mb-0 headline1">Explore new books:</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {
          Array.isArray(newestBooks) && newestBooks.map((book: any) => {
            return (
              <SwiperSlide key={book?._id}>
                <div className="row">
                  <div className="col-12">
                    <div className="card h-100 card-highlight">
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
        ...
      </Swiper>

      <h1 className="text-left my-4 mb-0 headline2">Discover the highest rated books:</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {
          Array.isArray(highestRatedBooks) && highestRatedBooks.map((book: any) => {
            return (
              <SwiperSlide key={book?._id}>
                <div className="row">
                  <div className="col-12">
                    <div className="card h-100 card-highlight">
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
        ...
      </Swiper>


    </div>
  );
}


export const getServerSideProps = (async (req: any) => {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/books?action=true`, {
    method: "GET"
  })
  const data = await res.json()

  // Pass data to the page via props
  return {
    props: {
      totalBooksCount: data?.data?.searchResults?.totalBooksCount[0]?.number || 0,
      highestRatedBooks: data?.data?.searchResults?.highestRatedBooks,
      newestBooks: data?.data?.searchResults?.newestBooks
    }
  }
})