import axiosClient from "@/lib/axiosInstance";
// import { UserManagementData } from "../useUserManagement";

export type ApiKeyData = {
  id: number;
  apiKeyId: string;
  apiKeyName: string;
  apiKeyValue: string;
  isValid: boolean;
  created: Date;
  deactivatedOn: Date | null;
};

export const fetchApiKeys = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`api/apikey`);
  if (data) return data as ApiKeyData[];
};

export const deleteApiKey = async (user: ApiKeyData) => {
  const {
    data: { data },
  } = await axiosClient.delete(`/api/apiKey`, { data: user });
  return data;
};
