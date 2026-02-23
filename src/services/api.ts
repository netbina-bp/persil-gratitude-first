import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? "";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type LotterySubmitPayload = {
  name: string;
  phone_number: string;
  code: string;
};

export type LotterySuccessResponse = {
  success: true;
  message: string;
  id: number;
};

export type LotteryErrorResponse = {
  success: false;
  error: string;
  detail?: string;
};

export type LotteryApiResponse = LotterySuccessResponse | LotteryErrorResponse;

export async function submitLottery(
  payload: LotterySubmitPayload
): Promise<LotterySuccessResponse> {
  const { data } = await api.post<LotteryApiResponse>("api.php", payload);

  if (!data.success) {
    const err = data as LotteryErrorResponse;
    throw new Error(err.error ?? "خطایی رخ داد.");
  }

  return data as LotterySuccessResponse;
}

// List users (admin)
export type PersilGratitudeRecord = {
  id: string;
  name: string;
  phone_number: string;
  code: string;
  created_at: string | null;
};

export type UsersListResponse = {
  success: true;
  data: PersilGratitudeRecord[];
};

export type UsersListErrorResponse = {
  success: false;
  error: string;
};

export type UsersListApiResponse = UsersListResponse | UsersListErrorResponse;

export async function getUsersList(): Promise<UsersListResponse> {
  const { data } = await api.get<UsersListApiResponse>("api.php");

  if (!data.success) {
    const err = data as UsersListErrorResponse;
    throw new Error(err.error ?? "خطایی رخ داد.");
  }

  return data as UsersListResponse;
}
