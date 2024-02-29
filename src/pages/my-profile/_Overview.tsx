import { imgSrcSet } from '@/Functions/common';
import React from 'react';

const Overview = ({ profile }: any) => {
   return (
      <div>
         <div>
            <div className="table-responsive">
               <table className="table table-dark">

                  <tbody>
                     <tr>
                        <th>Avatar</th>
                        <td><img src={imgSrcSet(profile?.avatar)} alt="" style={{width: "200px", height: "200px"}} /></td>
                     </tr>
                     <tr>
                        <th>First Name: </th>
                        <td>{profile?.firstName}</td>
                     </tr>
                     <tr>
                        <th>Last Name: </th>
                        <td>{profile?.lastName}</td>
                     </tr>
                     <tr>
                        <th>Email: </th>
                        <td>{profile?.email}</td>
                     </tr>
                     <tr>
                        <th>Role: </th>
                        <td>{profile?.role}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Overview;