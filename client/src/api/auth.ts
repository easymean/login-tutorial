import instance from "./intstance";
import { User } from "@/types/user";
const prefix = "auth";

export const loginByToken = async (payload: {
  username: string;
  password: string;
}) => {
  const res = await instance.post<{ access_token: string }>(
    `${prefix}/login/token`,
    {
      ...payload,
    }
  );

  instance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
};

export const loginBySession = async (payload: {
  username: string;
  password: string;
}) => {
  await instance.post<
    {
      username: string;
      password: string;
    },
    { userId: string; username: string }
  >(`${prefix}/login/session`, {
    ...payload,
  });
};

export const logout = async () => {
  await instance.post(`${prefix}/logout`);
};

export const register = async (payload: {
  username: string;
  password: string;
}) => {
  await instance.post(`${prefix}/register`, {
    ...payload,
  });
};

export const getProfileByToken = async () => {
  const result = await instance.get<User>(`${prefix}/profile/token`);
  return result.data;
};

export const getProfileBySession = async () => {
  const result = await instance.get<User>(`${prefix}/profile/session`);
  return result.data;
};
