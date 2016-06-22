//@flow

export type Todo = {
  title: string,
  date: Date,
  content: string
};

export type route = {
  title? : string,
  name: string,
  index: number,
  todo? : Todo,
  date? : Date
};
