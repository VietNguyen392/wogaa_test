

const baseURL = import.meta.env.BASE_URL;

export const GET = async (url:string,token:string) => {
  return await fetch(`${baseURL}${url}`, {
    headers: { Authorization: token },
  });
};
export const POST = async (url: string,data: object,token?:string) => {
  return await fetch(`${baseURL}${url}`, {
    method:'POST',
    headers: { Authorization: token as string },
    body:JSON.stringify(data)
  });
};
