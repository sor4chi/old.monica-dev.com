export const fetchApiRoute = async <T>(
  input: RequestInfo,
  init?: RequestInit
) => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error("BASE_URL is not defined");
  }
  const res = await fetch(baseUrl + input, init).then((res) => res.json());
  const resBody: T = res;
  return resBody;
};
