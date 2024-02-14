
import useMessage from '@/Hooks/useMessage';
import { useAuthContext } from '@/lib/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SignUp = () => {

   const { msg, setMessage } = useMessage();
   const { user } = useAuthContext();
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

         const response: any = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/auth/user/signup`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               firstName, lastName, email, password
            })
         });

         const result = await response.json();

         if (response?.ok) {
            setMessage(result?.message, "success");
            return;
         }

         setMessage(result?.message, "danger")

      } catch (error: any) {
         console.log(error?.message);
      }
   }

   return (
      <div className="container">

         {msg}

         <h1 className="text-center headline">Sign up</h1>

         <div className="left-column">
            <form onSubmit={handleSignUp}>
               <div className="form-row center">
                  <div className="form-group col-md-6 -center">
                     <label htmlFor="firstName">First name</label>
                     <input type="text" className="form-control" name='firstName' id="firstName" />
                  </div>
                  <br />
                  <div className="form-group col-md-6">
                     <label htmlFor="lastName">Last name</label>
                     <input type="text" className="form-control" name='lastName' id="lastName" />
                  </div>
                  <br />
               </div>
               <div className="form-row center">
                  <div className="form-group col-md-6 -center">
                     <label htmlFor="email">E-mail</label>
                     <input type="email" className="form-control" name='email' id="email" />
                  </div>
                  <br />
                  <div className="form-group col-md-6">
                     <label htmlFor="login">Login</label>
                     <input type="text" className="form-control" id="login" />
                  </div>
                  <br />
               </div>
               <div className="form-row center">
                  <div className="form-group col-md-6">
                     <label htmlFor="password">Password</label>
                     <input type="password" name='password' className="form-control" id="password" />
                  </div>
                  <br />
               </div>

               <div className="button-group my-3">
                  <button type="submit" className="btn btn-dark" >Sign up</button>

                  <p>
                     Already Have an Account ? <br />
                     <Link href="/login" className='btn btn-sm btn-primary'>Login</Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
}

export default SignUp;