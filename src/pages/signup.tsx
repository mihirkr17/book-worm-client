
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

         const response: any = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/auth/user/signup`, {
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
         setMessage(error?.message, "danger");
      }
   }

   return (
      <div>

         {msg}



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