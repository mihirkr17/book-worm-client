/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { getDateTime, imgSrcSet } from "@/Functions/common";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";

function Home({ highestRatedBooks, newestBooks, article }: InferGetServerSidePropsType<typeof getServerSideProps>) {


  // Home slider viewport options
  const homeSlideBreakPoints = {
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


  return (
    <>
      <Head>
        <title>Welcome to Bookworm</title>
        <meta name="description" content="This is bookworm a perfect book reading site. We have collected books data from kaggle book service." />
      </Head>
      {
        article?._id ?
          <div className="col">
            <div className="card2 h-100 card-highlight2">
              <img src={imgSrcSet(article?.thumbnail)} className="card-img2" alt="article image" />
              <div className="card-body2 d-flex flex-column justify-content-between">
                <h5 className="card-title2">{article?.title}</h5>
                <p className="article-meta2 text-left">
                  <span>Published on {getDateTime(article?.articleCreatedAt)}</span>
                  <br />
                  <strong>By {article?.authorName}</strong>
                </p>

                <p className="first-paraf">
                  {article?.metaDescription && article?.metaDescription.length >= 100 ? article?.metaDescription.slice(0, 100) + "..." : article?.metaDescription}</p>
                <Link href={`/article/${article?._id}`} className="btn btn-dark ">Read more</Link>
              </div>
            </div>
          </div> :
          <div className="col">
            <p>No article found. Please add a article</p>
          </div>
      }



      <h2 className="text-left my-4 mb-0 headline1">Explore new books:</h2>

      {
        (Array.isArray(newestBooks) && newestBooks.length >= 1) ?
          <Swiper
            spaceBetween={30}
            breakpoints={homeSlideBreakPoints}
          >
            {
              newestBooks.map((book: any) => {
                return (
                  <SwiperSlide key={book?._id}>
                    <div className="row">
                      <div className="col-12">
                        <div className="card card-highlight">
                          <img src={imgSrcSet(book?.thumbnail)} className="card-img" alt="newest-books-image" />

                          <div className="card-body d-flex flex-column justify-content-between" style={{ wordBreak: "break-word" }}>
                            <h5 className="card-title">{book?.title && book?.title?.length >= 40 ? book?.title.slice(0, 40) + "..." : book?.title}</h5>
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
          </Swiper> : <div>
            <p>No newest books found.</p>
          </div>
      }


      <h2 className="text-left my-4 mb-0 headline2">Discover the highest rated books:</h2>

      {
        Array.isArray(highestRatedBooks) && highestRatedBooks.length >= 1 ?
          <Swiper
            spaceBetween={30}
            breakpoints={homeSlideBreakPoints}
          >
            {
              highestRatedBooks.map((book: any) => {
                return (
                  <SwiperSlide key={book?._id}>
                    <div className="row">
                      <div className="col-12">
                        <div className="card card-highlight">
                          <img src={imgSrcSet(book?.thumbnail)} className="card-img" alt="highest-rated-books-image" />
                          <div className="card-body d-flex flex-column justify-content-between" style={{ wordBreak: "break-word" }}>
                            <h5 className="card-title">{book?.title && book?.title?.length >= 40 ? book?.title.slice(0, 40) + "..." : book?.title}</h5>
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
          </Swiper> : <div>
            <p>No highest rated found.</p>
          </div>
      }
    </>
  );
}


export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/overview`, {
      method: "GET"
    })
    const data = await res.json()

    // Pass data to the page via props
    return {
      props: {
        highestRatedBooks: data?.data?.searchResults?.highestRatedBooks || [],
        newestBooks: data?.data?.searchResults?.newestBooks || [],
        article: data?.data?.article || {}
      }
    }
  } catch (error: any) {
    console.log(error?.message);
    return {
      props: {
        highestRatedBooks: [],
        newestBooks: [],
        article: {}
      }
    };
  }
}

export default Home