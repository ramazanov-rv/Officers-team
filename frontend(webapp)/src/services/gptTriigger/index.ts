import { api } from "../api";

export async function gptTrigger(data: {
  userId: number;
  campaignId: number | undefined;
}) {
  const res = await api.post("/gpttrigger", {
    user_id: data.userId,
    campaign_id: data.campaignId,
  });

  return res;
}
