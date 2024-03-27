
import { CookieParser, addCookie, apiHandler } from '@/Functions/common';
import { API_URLS, BASE_URLS } from '@/constants/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Login = (props: any) => {
   const router = useRouter();
   const { authRefetch, setPopupMsg } = props?.auth;

   const redirectUri: any = router?.query?.redirect_uri;

   async function handleLogin(e: any) {
      try {
         e.preventDefault();

         const cookie = CookieParser();

         if (cookie?.appSession) {
            setPopupMsg("You already logged in.", "success");
            return router.push(BASE_URLS?.root);
         }

         const email = e.target.email.value;
         const password = e.target.password.value;

         const result = await apiHandler(API_URLS?.loginUrl, "POST", { email, password });

         if (result?.success) {
            const { data } = result;

            if (data?.accessToken) {
               let cookieResult = addCookie("appSession", data?.accessToken, 16);

               if (!cookieResult)
                  return setPopupMsg("Failed to set authentication !", "danger");

               authRefetch();

               if (redirectUri) {
                  console.log("Redirecting to:", redirectUri); // Log the redirectUri
                  router.push(redirectUri);
               } else {
                  router.push(BASE_URLS?.root);
               }

            }
         }

         setPopupMsg(result?.message, result?.success ? "success" : "danger")
      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   return (
      <div>
         <div className="row">

            <div className="col-md-8"></div>

            <div className="col-md-4 mx-auto">

               <h1 className="text-center headline pb-4">Log in</h1>
               <form onSubmit={handleLogin} className='p-2'>
                  <div className="row">
                     <div className="col-md-12 mb-3">
                        <label htmlFor="email" className='form-label'>E-mail</label>
                        <input type="email" className="form-control" id="email" name='email' />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label htmlFor="password" className='form-label w-100'>
                           <div className='d-flex align-items-center justify-content-between'>
                              Password
                              <Link href="/forgot-pwd" style={{ color: "blue", textDecoration: "underline" }}>Forgot password ?</Link>
                           </div>
                        </label>
                        <input type="password" className="form-control" id="password" name='password' />
                     </div>

                     <div className="col-12 text-center">
                        <button type="submit" className="btn btn-dark w-100" >Log in</button>
                     </div>
                  </div>

                  <div className="py-4">
                     <p>
                        New to Bookworm ?
                        <Link href="/signup" style={{ color: "blueviolet", marginLeft: "10px" }}>Register Here</Link>
                     </p>
                  </div>
               </form>
            </div>




         </div>
      </div>
   );
};

export default Login;