
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

         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/auth/login`, {
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
      <div className="container">

         <h1 className="text-center headline">Log in</h1>

         {msg}
         <div className="left-column">
            <form onSubmit={handleLogin}>
               <div className="form-row center">
                  <div className="form-group col-md-6">
                     <label htmlFor="email">E-mail</label>
                     <input type="email" className="form-control" id="email" name='email' />
                  </div>
                  <br />
                  <div className="form-group col-md-6">
                     <label htmlFor="password">Password</label>
                     <input type="password" className="form-control" id="password" name='password' />
                  </div>
                  <br />
               </div>
               <div className="button-group my-3">
                  <button type="submit" className="btn btn-dark me-3" >Log in</button>
                  <Link type="button" className="btn btn-dark" href="/forgot-pwd">Forgot password</Link>
               </div>

               <div className="py-2">
                  <p>
                     Already Have an Account ? <br />
                     <Link href="/signup" style={{ display: "inline-block" }} className='btn btn-sm btn-primary'>Register</Link>
                  </p>
               </div>
            </form>


         </div>
      </div>
   );
};

export default Login;