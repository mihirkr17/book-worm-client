import { apiHandler } from '@/Functions/common';
import { API_URLS, BASE_URLS } from '@/constants/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SignUp = (props: any) => {
   const { user, setPopupMsg } = props?.auth;
   const router = useRouter();

   useEffect(() => {
      if (user?.role || user?._id) {
         router.push("/");
      }
   }, [user, router]);


   //Sign up Handler
   async function handleSignUp(e: any) {
      try {

         e.preventDefault();

         const firstName = e.target.firstName.value;
         const lastName = e.target.lastName.value;
         const email = e.target.email.value;
         const password = e.target.password.value;

         const result = await apiHandler(API_URLS.userSignUpUrl, "POST", {
            firstName, lastName, email, password
         }); // response.json();

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            router.push(BASE_URLS?.loginPage);
            return;
         }

         setPopupMsg(result?.message, "danger")

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   return (
      <div>
         <div className="row">
            <div className='col-md-7'></div>
            <div className='col-md-5 mx-auto'>

               <h1 className="text-center headline pb-4">Sign Up To Bookworm</h1>

               <form onSubmit={handleSignUp}>
                  <div className="row">
                     <div className="col-md-12 mb-3">
                        <label htmlFor="firstName" className='form-label'>First name</label>
                        <input type="text" className="form-control" name='firstName' id="firstName" required />
                     </div>
                     <br />
                     <div className="col-md-12 mb-3">
                        <label htmlFor="lastName" className='form-label'>Last name</label>
                        <input type="text" className="form-control" name='lastName' id="lastName" required />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label htmlFor="email" className='form-label'>E-mail address</label>
                        <input type="email" className="form-control" name='email' id="email" required />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" name='password' className="form-control" id="password" required />
                     </div>
                     <div className="col-md-12">
                        <div className="text-center">
                           <button type="submit" className="btn btn-dark w-100" >Sign up</button>
                        </div>
                     </div>
                  </div>

                  <div className='pt-4'>
                     <p>
                        Already Have an Account ? <Link href="/login" style={{ color: "blueviolet" }}>Login</Link>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default SignUp;