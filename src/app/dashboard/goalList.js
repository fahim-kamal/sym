"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

const fetchGoals = {
  fetch: async () => {
    const GOALS_ENDPOINT = "/api/v1/goal_page";
    return fetch(GOALS_ENDPOINT, { method: "GET" }).then((response) =>
      response.json()
    );
  },
  key: ["all_goals"],
};

export default function GoalList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: fetchGoals.key,
    queryFn: fetchGoals.fetch,
  });

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        "/api/v1/goal_page?" +
          new URLSearchParams({ name: "This is a test name" }),
        { method: "POST" }
      );
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {data.pages.map((goal) => (
        <div>{goal.name}</div>
      ))}
      {/* {mutation.isSuccess ? <div>Todo added!</div> : null} */}
      <button onClick={() => mutation.mutate()}>Add page</button>
    </div>
  );
}
