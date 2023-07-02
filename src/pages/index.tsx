import { type NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.todo.getTasks.useQuery();
  const createTodoMutation = trpc.todo.createTask.useMutation();
  const deleteTodoMutation = trpc.todo.deleteTask.useMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreateTodo = async () => {
    try {
      if (title && body) {
        await createTodoMutation.mutateAsync({ title, body });
        setTitle("");
        setBody("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (taskId: string) => {
    try {
      await deleteTodoMutation.mutateAsync({ taskId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>新規作成</button>
      </form>

      <div>
        {data?.map((task) => (
          <div key={task.id}>
            <div>{task.title}</div>
            <div>{task.body}</div>
            <div onClick={() => handleDeleteTodo(task.id)}>削除</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
