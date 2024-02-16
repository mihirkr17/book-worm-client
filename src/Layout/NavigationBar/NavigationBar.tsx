import Link from 'next/link';
import React from 'react';

const NavigationBar = ({ user, logout }: any) => {
   return (
      <div id="navbar-wrapper">
         <nav className="navbar navbar-expand-lg" data-bs-theme="light">

            <div className="container">
               <h2 className="navbar-brand text-dark">
                  <Link href={'/'}>Bookworm</Link>
               </h2>

               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link className="nav-link" aria-current="page" href="/book-listing">Books</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" href="/article-listing">Articles</Link>
                     </li>
                  </ul>

                  {
                     user?.role === "User" || user?.role === "Editor" ? <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle ms-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           {user?.firstName}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg-end">
                           <li>
                              <Link className="dropdown-item" href="/my-profile">
                                 <span className="text-end">Profile</span>
                              </Link>
                           </li>

                           <li>
                              <Link className="dropdown-item" href="/mybookshelf">
                                 <span className="text-end">My Book Shelf</span>
                              </Link>
                           </li>

                           {
                              user?.role === "Editor" &&
                              <>
                                 <li>
                                    <Link href="/manage-users" className="dropdown-item">

                                       <span>Manage Users</span>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link className="dropdown-item" href="/manage-articles">
                                       <span>Manage Articles</span>
                                    </Link>
                                 </li>

                                 <li>
                                    <Link href="/manage-books" className="dropdown-item">
                                       <span>Manage Books</span>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link href="/manage-comments" className="dropdown-item">
                                       <span>Manage Comments</span>
                                    </Link>
                                 </li>
                              </>
                           }

                           <li><a className="dropdown-item" href="#" onClick={logout}>Log Out</a></li>
                        </ul>
                     </div> : <div className="nav-item">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                           <li className="nav-item">
                              <Link className="nav-link active" aria-current="page" href="/login">Login</Link>
                           </li>
                        </ul>
                     </div>
                  }
               </div>
            </div>
         </nav>
      </div>
   );
};

export default NavigationBar;