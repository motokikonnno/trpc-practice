import {
  createTaskSchema,
  deleteTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
} from "../../../schema/todo";
import { router, publicProcedure } from "../trpc";

export const todoRouter = router({
  createTask: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          ...input,
        },
      });
      return task;
    }),
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getSingleTask: publicProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
    }),
  updateTask: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
          body: input.body,
        },
      });
      return task;
    }),
  deleteTask: publicProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),
});
