import ProtectedPage from "@/Functions/ProtectedPage";
import { apiHandler } from "@/Functions/common";
import { API_URLS } from "@/constants/constant";

export default ProtectedPage((props: any) => {

   const { user, initialLoader, setPopupMsg } = props?.auth;


   async function handleChangePassword(e: any) {
      try {

         e.preventDefault();

         const oldPassword = e.target.oldPassword.value;
         const newPassword = e.target.newPassword.value;
         
         const result = await apiHandler(API_URLS?.pwdChangeUrl, "POST", { oldPassword, newPassword });

         if (result?.success) {
            setPopupMsg(result?.message, "success");
            initialLoader();
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
               <h1 className="text-left">My Profile</h1> <br />
            </header>
         </div>

         <div>
            <div className="table-responsive">
               <table className="table table-dark">

                  <tbody>
                     <tr>
                        <th>First Name: </th>
                        <td>{user?.firstName}</td>
                     </tr>
                     <tr>
                        <th>Last Name: </th>
                        <td>{user?.lastName}</td>
                     </tr>
                     <tr>
                        <th>Email: </th>
                        <td>{user?.email}</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div className="py-3 mt-5 col-lg-6 mx-auto ">

               <h3>Change Your Password</h3>
               <form action="" onSubmit={handleChangePassword}>
                  <div className="row">
                     <div className="col-12">
                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <input type="text" name="oldPassword" id="oldPassword" className="form-control" />
                     </div>
                     <div className="col-12">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input type="text" name="newPassword" id="newPassword" className="form-control" />
                     </div>
                     <div className="col-12">
                        <button className="btn btn-info" type="submit">Change Password</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
})