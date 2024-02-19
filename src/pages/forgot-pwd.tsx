import { CookieParser } from "@/Functions/common";
import useMessage from "@/Hooks/useMessage";
import { useRouter } from "next/router";
import { useState } from "react";



export default function ForgotPassword() {

   const { msg, setMessage } = useMessage();
   const router = useRouter();
   const [inpEmail, seInpEmail] = useState<string>("");

   const { action } = router?.query;


   async function handleCheckAccountByEmail(e: any) {
      try {

         e.preventDefault();
         const email = inpEmail;

         if (!email) throw new Error("Required email address!");



         const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/users/credential/check-account`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
         });

         const result = await response.json();

         if (result?.success) {
            setMessage(result?.message, "success");
            router.push("/forgot-pwd?action=true");
         } else {
            setMessage(result?.message, "danger");
         }

      } catch (error: any) {
         setMessage(error?.message, "danger");
      }
   }


   async function handleResetAccountPassword(e: any) {
      try {

         e.preventDefault();

         const email = inpEmail;
         if (!email) throw new Error("Required email address!");

         const newPassword = e.target.newPassword.value;

         const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/auth/credential/reset-password`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, newPassword })
         });

         const result = await response.json();

         if (result?.success) {
            setMessage(result?.message, "success");
            router.push("/login");
         } else {
            setMessage(result?.message, "danger");
         }

      } catch (error: any) {
         setMessage(error?.message, "danger");
      }
   }
   return (
      <div className="container">

         <h1 className="text-center headline">Forgot password</h1>

         <div className="left-column">


            {
               action === "true" ? <form onSubmit={handleResetAccountPassword}>
                  <div className="form-row center">
                     <div className="form-group col-md-6 -center">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input type="password" name="newPassword" className="form-control" id="newPassword" />
                     </div>
                  </div>
                  <div className="button-group my-3">
                     <button type="submit" className="btn btn-dark" >Reset</button>
                  </div>
               </form> : <form onSubmit={handleCheckAccountByEmail}>
                  <div className="form-row center">
                     <div className="form-group col-md-6 -center">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={(e) => seInpEmail(e.target.value)} />
                     </div>
                  </div>
                  <div className="button-group my-3">
                     <button type="submit" className="btn btn-dark" >Submit</button>
                  </div>
               </form>
            }
         </div>
      </div>
   )
}