
import { useAuthContext } from "@/lib/AuthProvider";
import React, { useState } from "react";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar/NavigationBar";
import { useRouter } from "next/router";

interface ChildProps {
   auth: any
}
export default function Layout({ children }: { children: React.ReactNode }) {

   const { user, logout, setPopupMsg, authRefetch, token, authLoading } = useAuthContext();

   const childrenProps: any = React.Children.map(children, (child: any) => {
      if (React.isValidElement<ChildProps>(child)) {
         return React.cloneElement<ChildProps>(child, {
            auth: {
               setPopupMsg: setPopupMsg,
               user: user || {},
               logout,
               authRefetch: authRefetch || null, 
               token: token || "", 
               authLoading
            }
         })
      }

      return child;
   })

   return <div className={`container-fluid`}>

      <NavigationBar user={user} logout={logout}></NavigationBar>

      <section id="content-wrapper" style={{ minHeight: "100vh", padding: "10px 0" }} className="container position-relative">
         {childrenProps[0]}
      </section>

      <Footer></Footer>
   </div>
}