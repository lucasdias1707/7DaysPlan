export async function createGoalCompletionAnnotation(
  id: string,
  goalAnnotation: string
) {
  await fetch("http://localhost:3333/completion-annotation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, goalAnnotation }),
  });
}
