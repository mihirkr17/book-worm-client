
import { addCookie } from '@/Functions/common';
import useMessage from '@/Hooks/useMessage';
import { useAuthContext } from '@/lib/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Login = () => {
   const router = useRouter();
   const { msg, setMessage } = useMessage();
   const { initialLoader, user } = useAuthContext();


   useEffect(() => {
      if (user?.role || user?._id) {
         router.push("/");
      }
   }, [user, router]);

   async function handleLogin(e: any) {
      try {
         e.preventDefault();

         const email = e.target.email.value;
         const password = e.target.password.value;

         const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/auth/login`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               email, password
            })
         });

         const result = await response.json();

         if (result?.success) {
            const { data, message, success } = result;


            if (data?.accessToken) {
               let cookieResult = addCookie("appSession", data?.accessToken, 16);

               if (!cookieResult)
                  return setMessage("Failed to set authentication !", "danger");

               initialLoader() && router.push("/");
               return;
            }

         }

         setMessage(result?.message, result?.success ? "success" : "danger")
      } catch (error: any) {
         setMessage(error?.message, "danger");
      }
   }

   return (
      <div>



         {msg}
         <div className="row">

            <div className="col-md-7"></div>

            <div className="col-md-5 mx-auto">

               <h1 className="text-center headline pb-4">Log in</h1>
               <form onSubmit={handleLogin}>
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