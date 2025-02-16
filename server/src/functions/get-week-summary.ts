import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs()
    .tz("America/Sao_Paulo")
    .startOf("week")
    .toDate();
  const lastDayOfWeek = dayjs().tz("America/Sao_Paulo").endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );

  const goalsCompletedInWeek = db.$with("goals_completed_in_week").as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        goalAnnotation: goalCompletions.goalAnnotation,
        completedAtDate: sql/**sql*/ `
          DATE(${goalCompletions.createdAt} AT TIME ZONE 'America/Sao_Paulo')
        `.as("completedAtDate"),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .orderBy(desc(goalCompletions.createdAt))
  );

  const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql/**sql*/ `
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.id},
              'title', ${goalsCompletedInWeek.title},
              'annotation', ${goalsCompletedInWeek.goalAnnotation},
              'completedAt', ${goalsCompletedInWeek.completedAt}
            )
          )      
        `.as("completions"),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  );

  type GoalsPerDay = Record<
    string,
    {
      id: string;
      title: string;
      goalAnnotation: string;
      completedAt: string;
    }[]
  >;

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        sql/**sql*/ `(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
          Number
        ),
      total:
        sql/**sql*/ `(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql/**sql*/ <GoalsPerDay>`
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate},
          ${goalsCompletedByWeekDay.completions}
        )      
        `,
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result[0],
  };
}
