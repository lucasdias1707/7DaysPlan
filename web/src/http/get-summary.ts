type SummaryResponse = {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    {
      id: string;
      title: string;
      completedAt: string;
    }[]
  >;
};

export async function getSummary(): Promise<SummaryResponse> {
  const response = await fetch("http://192.168.1.113:3333/summary");
  const data = await response.json();
  return data.summary;
}
