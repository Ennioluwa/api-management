import axiosClient from "@/lib/axiosInstance";
// import { UserManagementData } from "../useUserManagement";

export type ApiKeyData = {
  id: number;
  apiKeyId: string;
  apiKeyName: string;
  apiKeyValue: string;
  isValid: boolean;
  created: Date;
  createdBy: string;
  edits: number;
  deactivatedOn: Date | null;
};

export const fetchApiKeys = async ({
  companyId,
}: {
  companyId: number | undefined;
}) => {
  if (!companyId) return;

  const {
    data: { data },
  } = await axiosClient.get(`api/apikey/${companyId}`);
  if (data) return data as ApiKeyData[];
};

export const modifyApiKey = async ({
  companyId,
  value,
}: {
  companyId: number;
  value: { apiKeyName: string; isValid: boolean };
}) => {
  const {
    data: { data },
  } = await axiosClient.put(`api/apikey/${companyId}`, value);
  if (data) return data as ApiKeyData[];
};

export const deleteApiKey = async (user: ApiKeyData) => {
  const {
    data: { data },
  } = await axiosClient.delete(`/api/apiKey`, { data: user });
  return data;
};
