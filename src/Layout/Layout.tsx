
import { useAuthContext } from "@/lib/AuthProvider";
import { faArchive, faBars, faBell, faClose, faGear, faHome, faStore, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar/NavigationBar";


export default function Layout({ children }: { children: React.ReactNode }) {

   const { user, logout } = useAuthContext();

   return <div className={`container-fluid`}>

      <NavigationBar user={user} logout={logout}></NavigationBar>

      <section id="content-wrapper py-3" className="container position-relative">
         {children}
      </section>

      <Footer></Footer>
   </div>
}