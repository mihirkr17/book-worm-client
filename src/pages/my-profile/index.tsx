import ProtectedPage from "@/Functions/ProtectedPage";
import { apiHandler } from "@/Functions/common";
import { useFetch } from "@/Hooks/useFetch";
import { API_URLS } from "@/constants/constant";
import { useRouter } from "next/router";
import Setting from "./_Setting";
import Overview from "./_Overview";
import Link from "next/link";

export default ProtectedPage((props: any) => {

   const { setPopupMsg } = props?.auth;
   const router = useRouter();
   const { action } = router?.query;

   const { data }: any = useFetch("/users/my-profile");

   const profile = data?.data?.myProfile || {};


   async function handleChangePassword(e: any) {
      try {
         e.preventDefault();

         const oldPassword = e.target.oldPassword.value;
         const newPassword = e.target.newPassword.value;

         const result = await apiHandler(API_URLS?.pwdChangeUrl, "POST", { oldPassword, newPassword });

         if (result?.success) {
            setPopupMsg(result?.message, "success");
         } else {
            setPopupMsg(result?.message, "danger");
         }
      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   async function handleChangeName(e: any) {
      try {
         e.preventDefault();

         const firstName = e.target.firstName.value;
         const lastName = e.target.lastName.value;

         const result = await apiHandler("/users/change-names", "PUT", { firstName, lastName });

         if (result?.success) {
            setPopupMsg(result?.message, "success");
         } else {
            setPopupMsg(result?.message, "danger");
         }
      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   async function handleAvatar(e: any) {
      try {
         e.preventDefault();
         const formData = new FormData(e.target);

         const result = await apiHandler("/users/update-avatar", "PUT", formData, "FORM_DATA");

         if (result?.success) {
            setPopupMsg(result?.message, "success");
         } else {
            setPopupMsg(result?.message, "danger");
         }
      } catch (error: any) {
         setPopupMsg(error?.message, "danger");
      }
   }

   return (
      <div>
         <div className="py-4 d-flex justify-content-between align-items-center">
            <header>
               <h1 className="text-left">My Profile</h1><br />
            </header>
         </div>

         <div className="row">
            <div className="col-md-3">
               <div>
                  <div className="list-group">
                     <Link href="/my-profile" className={`list-group-item list-group-item-action ${!action && "active"}`} aria-current="true">
                        Overview
                     </Link>
                     <Link href="/my-profile?action=setting" className={`list-group-item list-group-item-action ${action === "setting" && "active"}`}>Setting</Link>
                  </div>
               </div>
            </div>
            <div className="col-md-9">
               {
                  action === "setting" ? <Setting profile={profile}
                     handleChangeName={handleChangeName}
                     handleChangePassword={handleChangePassword}
                     handleAvatar={handleAvatar}
                  ></Setting> :
                     <Overview profile={profile}></Overview>
               }
            </div>
         </div>


      </div >
   )
})