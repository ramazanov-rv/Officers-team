import { api } from "../api";

export async function getCampaigns(data: { limit: number; offset: number }) {
  const res = await api.get("/campaigns", { params: data });
  return res;
}

export async function getSingleCampaign(campaing_id: number) {
  const res = await api.get(`/campaign/${campaing_id}`);
  return res;
}
