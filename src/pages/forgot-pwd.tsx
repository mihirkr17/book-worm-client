import { apiHandler } from "@/Functions/common";
import { API_URLS, BASE_URLS } from "@/constants/constant";
import { useRouter } from "next/router";
import { useState } from "react";



export default function ForgotPassword({ auth }: any) {
   const router = useRouter();
   const [inpEmail, seInpEmail] = useState<string>("");

   const { action } = router?.query;

   const { setPopupMsg } = auth;


   async function handleCheckAccountByEmail(e: any) {
      try {

         e.preventDefault();
         const email = inpEmail;

         if (!email) throw new Error("Required email address!");

         const result = await apiHandler(API_URLS?.checkAccUrl, "POST", { email });

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            router.push("/forgot-pwd?action=true");
         } else {
            setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }


   async function handleResetAccountPassword(e: any) {
      try {

         e.preventDefault();

         const email = inpEmail;
         if (!email) throw new Error("Required email address!");

         const newPassword = e.target.newPassword.value;

         const result = await apiHandler(API_URLS?.resetPwdUrl, "PUT", { email, newPassword });

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            router.push(BASE_URLS?.loginPage);
         } else {
            setPopupMsg(result?.message, "danger");
         }

      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }
   return (
      <div className="container">

         <h1 className="text-center headline pb-5">Forgot password ?</h1>

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