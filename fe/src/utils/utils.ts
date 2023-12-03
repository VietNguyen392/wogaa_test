import { jwtDecode } from "jwt-decode";
import { GET } from "./fetchMethod";
export function getCookie(cname:string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
interface IToken {
  exp: number;
  iat: number;
  id: string;
}
export const checkTokenExp = async (token: string) => {
  const decoded: IToken = jwtDecode(token);
  console.log(decoded);
  
  if (decoded.exp >= Date.now() / 1000) return;
  const res = await GET("rf-token").then((res) => res.json());
  console.log('====================================');
  console.log(res);
  console.log('====================================');
  return res.data.access_token;
};

