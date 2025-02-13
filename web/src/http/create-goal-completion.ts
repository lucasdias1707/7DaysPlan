export async function createGoalCompletion(goalId: string) {
  await fetch("http://192.168.1.113:3333/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId }),
  });
}
