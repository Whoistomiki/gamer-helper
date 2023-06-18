import create from "zustand";

const todoStore = create(async (set, get) => ({
  edit: {
    id: null,
    value: "",
  },
  todos: [],
  input: null,

  setEdit: (e) => {
    set({ edit: e });
  },

  setTodos: (e) => {
    set({ todos: e });
  },

  setInput: (e) => {
    set({ input: e });
  },
}));

export default todoStore;
