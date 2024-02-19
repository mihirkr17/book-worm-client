import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function sanitizeHtml(html: any) {
   // Define a whitelist of allowed HTML tags and attributes
   const allowedTags = [
      'a',
      'abbr',
      'address',
      'article',
      'aside',
      'audio',
      'b',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'cite',
      'code',
      'col',
      'div',
      'dl',
      'dt',
      'dd',
      'em',
      'figcaption',
      'figure',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'header',
      'hr',
      'i',
      'img',
      'input',
      'label',
      'li',
      'main',
      'nav',
      'ol',
      'p',
      'pre',
      'section',
      'select',
      'small',
      'span',
      'strong',
      'table',
      'tbody',
      'td',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'tr',
      'ul',
      'video'
   ];

   const allowedAttributes = ['href', 'src'];

   // Remove any disallowed tags and attributes
   const sanitized = html?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<(\/)?([^>]+)>/g, (match: any, closing: any, tagName: any) => {

      if (allowedTags.includes(tagName.toLowerCase())) {
         return `<${closing ?? ""}${tagName}>`;
      }

      return '';
   }).replace(/\s([a-z\-]+)=(['"])(.*?)\2/gi, (match: any, attribute: any, quote: any, value: any) => {
      if (allowedAttributes.includes(attribute.toLowerCase())) {
         return ` ${attribute}=${quote}${value}${quote}`;
      }
      return '';
   });

   return { __html: sanitized };
}

export function CookieParser() {

   let cookie = document ? document.cookie : undefined;

   if (!cookie || typeof cookie === "undefined") {
      return;
   }

   const cookies: any = {};

   cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      cookies[name] = value;
   });
   return cookies;
}

export function deleteCookie(cookieName: any) {
   if (!cookieName) return;

   if (typeof cookieName === "object" && Array.isArray(cookieName)) {

      for (const cookie of cookieName) {
         document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
   }

   return typeof cookieName === "string" && (document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
}


export function deleteAuth() {

   deleteCookie("appSession");
   localStorage.removeItem("client_data");

   if (window) {
      return window.location.replace(window.location.origin);
   }
}


export const slugMaker = (string: string) => {
   return string.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '').trim();
}

export const emailValidator = (email: string) => {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

export const camelToTitleCase = (str: string) => {
   if (!str) return "Not Available";

   let newStr = str.replace(/([A-Z])/g, " $1");

   return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

export const textToTitleCase = (str: string) => {

   if (!str) {
      return false;
   }

   let newStr = str.split(/[-]|[_]|[A-Z]/g);

   let finalStr = "";

   for (let i = 0; i < newStr.length; i++) {
      finalStr += newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1) + " ";
   }

   return finalStr.trim();
}

export const calcTime = (iso: string, offset: number) => {

   let date = new Date(iso);

   let utc = date.getTime() + (date.getTimezoneOffset() * 60000);

   let nd = new Date(utc + (3600000 * offset));

   return nd?.toLocaleTimeString();
}

// global api handler
export async function apiHandler(url = "", method = "GET", body = {}) {

   const cookie: any = window && CookieParser();

   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_S_BASE_URL}api/v1${url}`, {
         method,
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie?.appSession ?? ""}`
         },
         ...["POST", 'PUT', "PATCH", "UPDATE"].includes(method) && { body: JSON.stringify(body) }
      });

      if (response.status === 401) {
         return deleteAuth();
      }

      const result = await response.json();

      if (result) {
         return result;
      }
   } catch (error) {
      return error;
   }
}

export function addCookie(name: string, value: any, age: number) {

   if (typeof age !== "number") return;

   let now = new Date();

   const expireTime = new Date(now.getTime() + age * 60 * 60 * 1000);

   document.cookie = `${name}=${value}; max-age=${(expireTime.getTime() - now.getTime()) / 1000}; path=/;`;
   return true;
}

export function validPassword(password: string) {
   return (/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{5,}$/).test(password);
}

export function imgSrcSet(uri: string) {

   const isPure = /^(https?:\/\/)/i.test(uri);

   if (isPure) {
      return uri;
   } else {
      return `${process.env.NEXT_PUBLIC_VERCEL_SERVER_URL}${uri}`;
   }
}


export function getDateTime(timestamp: any) {
   if (!timestamp) return "";
   
   let date = new Date(timestamp);
   return `${date.toLocaleTimeString()}, ${date?.toLocaleDateString()}`;
}