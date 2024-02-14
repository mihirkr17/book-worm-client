import ProtectedPage from "@/Functions/ProtectedPage";
import { CookieParser } from "@/Functions/common";
import useMessage from "@/Hooks/useMessage";
import { useAuthContext } from "@/lib/AuthProvider";

export default ProtectedPage(() => {

   const { user, initialLoader } = useAuthContext();
   const { msg, setMessage } = useMessage();


   async function handleChangePassword(e: any) {
      try {

         e.preventDefault();
         const cookie = CookieParser();

         const oldPassword = e.target.oldPassword.value;
         const newPassword = e.target.newPassword.value;

         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/auth/credential/change-password`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${cookie?.appSession ? cookie?.appSession : ""}`,
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ oldPassword, newPassword })
         });

         const result = await response.json();

         if (result?.success) {
            setMessage(result?.message, "success");
            initialLoader();
         } else {
            setMessage(result?.message, "danger");
         }

      } catch (error: any) {
         setMessage(error?.message, "danger");
      }
   }

   return (
      <div>
         {msg}
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