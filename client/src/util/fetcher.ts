import { clientEnv } from '@/env/schema';

const wrap = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => {
              // jsonが取得できた場合だけresolve
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const customFetch = <T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> => {
  if (typeof input === 'string' && !/^https?:\/\//.test(input)) {
    input = new URL(input, clientEnv.NEXT_PUBLIC_SITE_URL).toString();
  }
  return wrap<T>(fetch(input, init));
};
