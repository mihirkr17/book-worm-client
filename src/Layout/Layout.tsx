
import { useAuthContext } from "@/lib/AuthProvider";
import { faArchive, faBars, faBell, faClose, faGear, faHome, faStore, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Layout({ children }: { children: React.ReactNode }) {

   const { user, authLoading, logout } = useAuthContext();
   const router = useRouter();
   const [toggle, setToggle] = useState(false);

   function handleToggle() {
      setToggle(e => !e);
   }





   return <div id="wrapper" className={`container-fluid`}>

      <div id="navbar-wrapper">
         <nav className="navbar navbar-expand-lg" data-bs-theme="dark">

            <div className="container">
               <h2 className="navbar-brand text-light">
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

      <section id="content-wrapper" className="container position-relative">
         {children}
      </section>

      <footer>
         <div className="footer-color p-1 relative">
            <div className="d-flex justify-content-center">
               <ul className="list-inline m-0">
                  <li className="list-inline-item">
                     <p>Copyright © 2024 Bookworm. All rights reserved.</p>
                  </li>

                  <li className="list-inline-item">
                     <p> Data sourced from<a className="kaggle-link" target="_blank" href="https://www.kaggle.com/datasets/dylanjcastillo/7k-books-with-metadata" >kaggle</a></p>
                  </li>

                  <li className="list-inline-item">
                     <p>Contact with us:</p>
                     <a href="mailto:jakukuk182@student.polsl.pl" aria-label="Link to Email">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#11a6a1"><path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"></path></svg>
                     </a>
                  </li>
               </ul>
            </div>
         </div>

      </footer>

   </div>
}