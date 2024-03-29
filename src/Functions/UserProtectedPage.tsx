
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function UserProtectedPage(Component: any) {

   return function WithAuth(props: any) {
      const router = useRouter();

      const { user, authLoading } = props?.auth;

      useEffect(() => {
         if (authLoading) {
            return;
         } else if (!user?.role) {
            router.push('/login')
         }
      }, [user, router, authLoading]);

      return (user?.role === "User") ?
         <Component {...props} />
         : null;
   }
}