type PendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  const response = await fetch("http://192.168.1.113:3333/pending-goals");
  const data = await response.json();
  return data.pendingGoals;
}
