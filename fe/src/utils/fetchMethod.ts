const baseURL = "http://localhost:4040/";

export const GET = async (url: string, token?: string) => {
  return await fetch(`${baseURL}api/${url}`, {
    headers: { Authorization: token },
  });
};
export const POST = async (url: string, data: object, token?: string) => {
  return await fetch(`${baseURL}api/${url}`, {
    method: "POST",
    headers: {
      Authorization: token as string,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const PATCH = async (url: string, data: object, token?: string) => {
  return await fetch(`${baseURL}api/${url}`, {
    method: "PATCH",
    headers: {
      Authorization: token as string,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
