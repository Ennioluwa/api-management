import axiosClient from "@/lib/axiosInstance";

export const fetchDashboardProps = async ({
  companyId,
}: {
  companyId?: number;
}) => {
  if (!companyId) return;

  const {
    data: { data },
  } = await axiosClient.get(`/api/dashboard/${companyId}`);
  if (data) return data;
};
