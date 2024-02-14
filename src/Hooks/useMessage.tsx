import { useEffect, useState } from "react";


export default function useMessage() {
   const [msg, setMsg] = useState<any>('');

  const setMessage = (message: string, types = "success") => {
      setMsg(
         <p style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '999999999',
            padding: '8px 10px',
            backgroundColor: 'whitesmoke',
            borderRadius: '8px',
            transition: 'right 0.8s linear'
         }}>
            <small className={`${types === "warning" ? "text-warning" : types === "danger" ? "text-danger" : "text-success"}`}>
               <strong>
                  {message}
               </strong>
            </small>
         </p>
      );
   }

   useEffect(() => {
      const messageTimeout = setTimeout(() => {
         setMsg("");
      }, 4000);
      return () => clearInterval(messageTimeout);
   }, [msg]);

   return {msg, setMessage};
}