//@flow

export type Todo = {
  title: string,
  time: string,
  content: string
};

export type route = {
  name: string,
  index: number,
  todo? : Todo
};
