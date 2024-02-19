
import { useAuthContext } from "@/lib/AuthProvider";
import React, { useState } from "react";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar/NavigationBar";

interface ChildProps {
   auth: any
}
export default function Layout({ children }: { children: React.ReactNode }) {


   const { user, logout, setPopupMsg, initialLoader, token, authLoading } = useAuthContext();

   const childrenProps: any = React.Children.map(children, (child: any) => {
      if (React.isValidElement<ChildProps>(child)) {
         return React.cloneElement<ChildProps>(child, { auth: { setPopupMsg, user: user || {}, logout, initialLoader, token: token || "", authLoading } })
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