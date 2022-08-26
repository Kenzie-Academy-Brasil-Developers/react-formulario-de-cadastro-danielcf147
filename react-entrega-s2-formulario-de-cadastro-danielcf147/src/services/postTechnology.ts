import api from "./api";

interface Ivalue {
  title: string;
  status: string;
}

interface IpostTechnologyResponse {
  id: string;
}

export async function technology(
  value: Ivalue
): Promise<IpostTechnologyResponse> {
  const { data } = await api.post<IpostTechnologyResponse>(
    "/users/techs",
    value
  );
  return data;
}
