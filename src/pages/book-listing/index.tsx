import { imgSrcSet } from '@/Functions/common';
import { publishedYear } from '@/assets/fakeData1';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const BookListingIndex = ({ searchedBooks, totalBooksCount, allCategories }: any) => {

   const router = useRouter();
   const { sort, q, year, ctg, page } = router?.query;


   const [filters, setFilters] = useState<any>({
      sort: sort || "",
      year: year || "",
      ctg: ctg || "",
      q: q || "",
      page: page || ""
   })

   const [searchText, setSearchText] = useState<string>(filters?.q || "");
   const itemsPerPage = 12;
   const currentPage = parseInt(page as string, 10) || 1;


   const handlePageChange = (obj: any) => {
      setFilters({ ...filters, ...obj });

      let queryString = Object.keys(obj)
         .map(key => obj[key] && `${key}=${encodeURIComponent(obj[key])}&`)
         .join("")

      router.push(`/book-listing?${queryString}`);
   };

   return (
      <div>
         <div className="row row-selectpicker">

            <div className="col-sm-3">

               <div className="form-group">
                  <label htmlFor="q">Search</label>
                  <div className="input-group custom-search-width">
                     <input type="search" id="q" className="form-control rounded" placeholder="Search a book or author"
                        aria-label="Search" name='q' aria-describedby="search-addon" defaultValue={filters?.q || ""} onChange={(e) => setSearchText(e.target.value)} />

                     <span className="input-group-text border-0" id="search-addon" onClick={(e) => handlePageChange({ ...filters, q: searchText })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#11a6a1" className="bi bi-search" viewBox="0 0 16 16">
                           <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                     </span>
                  </div>
               </div>
            </div>
            <div className="col-sm-3">
               <div className="form-group">
                  <label htmlFor="genre-select">Category</label>
                  <select className="selectpicker form-control" id="category-select" name='ctg' value={filters?.ctg || ""} onChange={(e) => handlePageChange({ ...filters, page: undefined, [e.target.name]: e.target.value })}>
                     <option value="">All</option>

                     {
                        allCategories && allCategories.filter((e: any) => e?._id).map((category: any) => {
                           return (<option key={category?._id} value={category?._id}>{category?._id}</option>)
                        })
                     }
                  </select>
               </div>
            </div>

            <div className="col-sm-3">
               <div className="form-group">
                  <label htmlFor="year-select">Publication year</label>
                  <select className="selectpicker form-control" id="year-select" name='year'
                     value={filters?.year || ""}
                     onChange={(e) => handlePageChange({ ...filters, [e.target.name]: e.target.value })}>
                     <option value="">All</option>

                     {
                        publishedYear.map((year: number) => {
                           return (<option value={year} key={year}>{year}</option>)
                        })
                     }

                  </select>
               </div>
            </div>

            <div className="col-sm-3">
               <div className="form-group">
                  <label htmlFor="year-select">Sorting</label>
                  <select className="selectpicker form-control" id="sorting-select"
                     value={filters?.sort || ""}
                     name='sort' onChange={(e) => handlePageChange({ ...filters, [e.target.name]: e.target.value })}>
                     <option value="">Relevant</option>
                     <option value={'highest_rated'} >Highest rate</option>
                     <option value={'lowest_rated'}>Lowest rate</option>
                     <option value={'asc'}>Alphabetically (ASC)</option>
                     <option value={'dsc'}>Alphabetically (DSC)</option>
                  </select>
               </div>
            </div>
         </div>


         <div className="row row-cols-1 row-cols-md-4 g-4">

            {
               Array.isArray(searchedBooks) && searchedBooks.length >= 1 ? searchedBooks.map((book: any) => {
                  return (
                     <div className="col" key={book?._id}>
                        <div className="card h-100 card-highlight" title={book?.title}>
                           <img src={imgSrcSet(book?.thumbnail)}
                              className="card-img" />
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
                  )
               }) : <div className='col'>
                  <p>No Books found.</p>
               </div>
            }

         </div>

         {
            Array.isArray(searchedBooks) && searchedBooks.length >= 1 &&
            <nav aria-label="Page navigation" className="custom-pagination-margin">
               <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange({ ...filters, page: currentPage - 1 })}>Previous</a>
                  </li>
                  {/* 
                  {Array.from({ length: Math.ceil(totalBooksCount / itemsPerPage) }, (_, index) => (
                     <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange({ ...filters, page: index + 1 })}>
                           {index + 1}
                        </a>
                     </li>
                  ))} */}

                  {Array.from({ length: Math.ceil(totalBooksCount / itemsPerPage) }, (_, index) => {
                     const startPage = (Math.floor((currentPage - 1) / 7) * 7) + 1;
                     const endPage = Math.min(startPage + 6, Math.ceil(totalBooksCount / itemsPerPage));
                     if (index + 1 >= startPage && index + 1 <= endPage) {
                        return (
                           <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                              <a className="page-link" href="#" onClick={() => handlePageChange({ ...filters, page: index + 1 })}>
                                 {index + 1}
                              </a>
                           </li>
                        );
                     }
                     return null;
                  })}


                  <li className={`page-item ${currentPage === Math.ceil(totalBooksCount / itemsPerPage) && 'disabled'}`}>
                     <a className="page-link" href="#" onClick={() => handlePageChange({ ...filters, page: currentPage + 1 })}>Next</a>
                  </li>
               </ul>
            </nav>
         }
      </div>
   );
};


export const getServerSideProps = (async (req: any) => {
   // Fetch data from external API
   const { page, limit, sort, year, ctg, q } = req?.query;
   const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/books?action=false&page=${page || 1}&pageSize=${limit || 12}&sort=${sort || ""}&year=${year || ""}&ctg=${ctg || ""}&q=${q || ""}`, {
      method: "GET"
   })
   const data = await res.json()

   // Pass data to the page via props
   return {
      props: {
         searchedBooks: data?.data?.searchResults?.searchedBooks,
         totalBooksCount: data?.data?.searchResults?.totalBooksCount[0]?.number || 0,
         allCategories: data?.data?.searchResults?.allCategories || []
      }
   }
})

export default BookListingIndex;