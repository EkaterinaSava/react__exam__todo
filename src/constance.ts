import { ITodo } from "./interfaces";

export const filters = {
  "All": (_todo: ITodo) => true,
  "Completed": (todo: ITodo) => todo.complete,
  "Uncompleted": (todo: ITodo) => !todo.complete,
}
