import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CookieParser, deleteAuth } from "@/Functions/common";
import { useRouter } from "next/router";
import useMessage from "@/Hooks/useMessage";

type authContextType = {
   user?: any;
   logout: () => void;
   initialLoader: any;
   authLoading: boolean;
   setPopupMsg: any;
   token: string;
};


const authContextDefaultValues: authContextType = {
   user: {},
   token: "",
   logout: () => { },
   initialLoader: () => { },
   authLoading: false,
   setPopupMsg: () => { }
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
   const { msg, setMessage } = useMessage();
   const [token, setToken] = useState<string>("");

   useEffect(() => {
      const authRefetch = async () => {
         try {
            const cookie: any = CookieParser();

            if (!cookie?.appSession) {
               return setUserInfo({});
            }

            setToken(cookie?.appSession);
            setAuthLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}api/v1/users/profile`, {
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

   const setPopupMsg = (params: string, action: string) => setMessage(params, action);

   return (
      <AuthContext.Provider value={{
         user, logout, initialLoader, authLoading, setPopupMsg, token
      }}>
         {msg}
         {children}
      </AuthContext.Provider>
   )
}

export const useAuthContext = () => useContext(AuthContext);