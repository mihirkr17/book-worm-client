import React from 'react';


const Footer = () => {
   return (
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
   );
};

export default Footer;