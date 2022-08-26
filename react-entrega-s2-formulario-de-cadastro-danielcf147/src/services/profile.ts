import api from "./api";

interface Itechs {
  title: string;
  status: string;
  id: string;
}
interface ItechsResponse {
  techs: Itechs[];
}

export async function techs(): Promise<ItechsResponse> {
  const { data } = await api.get<ItechsResponse>("/profile");
  return data;
}
