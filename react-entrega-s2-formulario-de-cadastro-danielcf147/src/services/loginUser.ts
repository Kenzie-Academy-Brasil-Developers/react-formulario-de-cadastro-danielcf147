import api from "./api";

interface Ivalue {
  email: string;
  password: string;
}

interface IloginUser {
  id: string;
}
interface IloginUserResponse {
  user: IloginUser;
  token: string;
}

export async function login(value: Ivalue): Promise<IloginUserResponse> {
  const { data } = await api.post<IloginUserResponse>("/sessions", value);
  return data;
}
