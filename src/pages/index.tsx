/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

import { getDateTime, imgSrcSet } from "@/Functions/common";
import { SERVER_URI } from "@/constants/constant";

const CustomBookCard = dynamic(() => import("@/components/Cards/CustomBookCard"));

export async function getServerSideProps() {
  // Fetch data from external API

  let retry = 0;
  const maxRetries = 4;

  while (retry < maxRetries) {
    try {
      const res = await fetch(`${SERVER_URI}api/v1/overview`);
      const data = await res.json();

      // Pass data to the page via props
      return {
        props: {
          highestRatedBooks: data?.data?.searchResults?.highestRatedBooks || [],
          newestBooks: data?.data?.searchResults?.newestBooks || [],
          article: data?.data?.article || {}
        }
      }

    } catch (error: any) {
      await new Promise(r => setTimeout(r, 5000));
      retry++;
    }
  }

  return {
    props: {
      highestRatedBooks: [],
      newestBooks: [],
      article: {}
    }
  };

}

export default function Home({ highestRatedBooks, newestBooks, article }: any) {
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



      <div className="py-5">
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
                      <CustomBookCard book={book}></CustomBookCard>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper> : <div>
              <p>No newest books found.</p>
            </div>
        }

      </div>

      <div className="py-5">
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
                      <CustomBookCard book={book}></CustomBookCard>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper> : <div>
              <p>No highest rated books found.</p>
            </div>
        }
      </div>
    </>
  );
}