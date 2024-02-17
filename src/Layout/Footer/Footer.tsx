import React from 'react';


const Footer = () => {
   return (
      <footer>
         <div className="footer_wrapper py-3 relative">
            <div className="d-flex justify-content-center">
               <div className="p-1">
                  <div className="">
                     <div className="d-flex align-items-center justify-content-between pb-3 flex-column">
                        <div className='mb-2'>
                           <small>Contact with us:</small>
                           <a href="mailto:jakukuk182@student.polsl.pl" aria-label="Link to Email">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#11a6a1"><path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"></path></svg>
                           </a>
                        </div>

                        <div>
                           <small>Data sourced from</small>
                           <a className="kaggle-link" target="_blank"
                              href="https://www.kaggle.com/datasets/dylanjcastillo/7k-books-with-metadata">
                              <small>kaggle</small>
                           </a>
                        </div>
                     </div>

                     <p className='text-muted'>
                        <small>Copyright &copy; {new Date().getFullYear()} Bookworm. All rights reserved.</small>
                     </p>
                  </div>

               </div>


            </div>
         </div>

      </footer>
   );
};

export default Footer;