import { createContext, useContext, useEffect, useState } from "react";
import { CookieParser, deleteAuth } from "@/Functions/common";
import useMessage from "@/Hooks/useMessage";
import { SERVER_URI } from "@/constants/constant";

type authContextType = {
   user?: any;
   logout: () => void;
   authRefetch: any;
   authLoading: boolean;
   setPopupMsg: any;
   token: string;
};


const authContextDefaultValues: authContextType = {
   user: {},
   token: "",
   logout: () => { },
   authRefetch: () => { },
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
   const [authLoading, setAuthLoading] = useState<boolean>(true);
   const [authErr, setAuthErr] = useState<string | undefined>();
   const [ref, setRef] = useState<boolean>(false);
   const { msg, setMessage } = useMessage();
   const [token, setToken] = useState<string>("");


   useEffect(() => {
      const authData = setTimeout(async () => {
         try {
            const cookie: any = CookieParser();

            if (!cookie?.appSession) {
               return setUserInfo({});
            }

            setToken(cookie?.appSession);
            setAuthLoading(true);
            const response = await fetch(`${SERVER_URI}api/v1/users/persistence`, {
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
      }, 0)

      return () => clearTimeout(authData);
   }, [ref]);

   const authRefetch = () => setRef(e => !e);

   const logout = () => deleteAuth();

   const setPopupMsg = (params: string, action: string) => setMessage(params, action);

   return (
      <AuthContext.Provider value={{
         user, logout, authRefetch, authLoading, setPopupMsg, token
      }}>
         {msg}
         {children}
      </AuthContext.Provider>
   )
}

export const useAuthContext = () => useContext(AuthContext);