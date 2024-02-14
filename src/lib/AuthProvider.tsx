import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CookieParser, deleteAuth } from "@/Functions/common";
import { useRouter } from "next/router";

type authContextType = {
   user?: any;
   logout: () => void;
   initialLoader: any;
   authLoading: boolean;
};


const authContextDefaultValues: authContextType = {
   user: {},
   logout: () => { },
   initialLoader: () => { },
   authLoading: false
};

export const AuthContext = createContext<authContextType>(authContextDefaultValues);

export default function AuthProvider({
   children,
}: {
   children: React.ReactNode
}) {
   const [user, setUserInfo] = useState<any>({});
   const [authLoading, setAuthLoading] = useState(true);
   const [authErr, setAuthErr] = useState();
   const [ref, setRef] = useState(false);

   useEffect(() => {
      const authRefetch = async () => {
         try {
            const cookie: any = CookieParser();

            if (!cookie) {
               return setUserInfo({});
            }
            setAuthLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/users/profile`, {
               credentials: 'include',
               method: "GET",
               headers: {
                  Authorization: `Bearer ${cookie?.appSession ? cookie?.appSession : ""}`,
                  Accept: "application/json",
               }
            });

            if (response.status === 401) {
               setAuthLoading(false);
               deleteAuth();
            }

            const { success, data } = await response.json();
            

            if (success && data) {
               const { profile } = data;
               setAuthLoading(false);
               setUserInfo(profile);
            }
         } catch (error: any) {
            setAuthErr(error?.message);
         } finally {
            setAuthLoading(false);
         }
      };

      const authData = setTimeout(authRefetch, 0)

      return () => clearTimeout(authData);

   }, [ref]);

   const initialLoader = () => setRef(e => !e);

   const logout = () => deleteAuth();

   return (
      <AuthContext.Provider value={{
         user, logout, initialLoader, authLoading
      }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuthContext = () => useContext(AuthContext);