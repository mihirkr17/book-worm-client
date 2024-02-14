
import { useAuthContext } from "@/lib/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function EditorProtectedPage(Component: any) {

   return function WithAuth(props: any) {
      const router = useRouter();

      const { user, authLoading } = useAuthContext();

      useEffect(() => {
         if (authLoading) {
            return;
         } else if (!user?.role) {
            router.push('/login')
         }
      }, [user, router, authLoading]);

      return (user?.role === "Editor") ?
         <Component {...props} />
         : null;
   }
}