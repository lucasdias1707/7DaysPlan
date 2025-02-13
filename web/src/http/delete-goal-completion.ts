export async function deleteGoalCompletion(goalId: string) {
  await fetch("http://192.168.1.113:3333/completions", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId }),
  });
}
