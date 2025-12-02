import { pool } from "../../config/db";

const createTodo = async (id: any, title: string) => {
  const result = await pool.query(
    `
        INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *
        `,
    [id, title]
  );
  return result;
};

const getTodo = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getSingleTodo = async (user_id: string | undefined) => {
  const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
    user_id,
  ]);
  return result;
};

const updateTodo = async (title: string, user_id: string | undefined) => {
  const result = await pool.query(
    `UPDATE todos SET title=$1 WHERE user_id=$2 RETURNING *`,
    [title, user_id]
  );
  return result;
};
export const todoServices = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
};
