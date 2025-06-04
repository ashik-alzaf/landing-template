import { fetcher } from "../fetcher";

interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

export const handleLogin = async (data: any): Promise<LoginResponse> => {
  const res = await fetcher<LoginResponse>("/auth/login", "POST", data);
  return res;
};
