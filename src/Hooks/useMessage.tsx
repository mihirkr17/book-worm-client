import { useEffect, useState } from "react";


export default function useMessage() {
   const [msg, setMsg] = useState<any>('');

   const defaultStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: '50%',
      zIndex: '999999999',
      padding: '8px 10px',
      backgroundColor: 'whitesmoke',
      borderRadius: '4px',
      transition: 'right 0.8s linear',
      transform: "translate(-50%, 0%)",
      boxShadow: "0px 4px 8px #0000004a",
      width: "calc(100% - 70%)"
   };

   let textStyle: React.CSSProperties = {
      color: "green",
      fontWeight: "normal",
      fontSize: "13px",
      letterSpacing: "0.4px"
   }

   const setMessage = (message = "", types = "success") => {

      textStyle.color = types === "warning" ? "yellow" : types === "danger" ? "red" : "green";

      setMsg(
         <div style={defaultStyle}>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
               <button onClick={() => setMsg("")} style={{
                  backgroundColor: "red",
                  color: "whitesmoke",
                  padding: "0 8px",
                  outline: "unset",
                  border: "unset",
                  fontSize: "12px",
                  borderRadius: "4px",
                  alignSelf: "end",
                  marginBottom: "5px"
               }}>X</button>
               <p style={textStyle}>
                  {message}
               </p>
            </div>
         </div>
      );
   }

   useEffect(() => {
      const messageTimeout = setTimeout(() => {
         setMsg("");
      }, 20000);
      return () => clearInterval(messageTimeout);
   }, [msg]);

   return { msg, setMessage };
}