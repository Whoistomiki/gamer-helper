import create from "zustand";

const formStore = create((set) => ({
  menuToggle: false,

  setMenuToggle: () => {
    set({ menuToggle: !formStore.getState().menuToggle });
    // formStore.getState().callToApi()
  },
}));

export default formStore;
