import create from 'zustand'

const pomoStore = create((set) => ({
    pomoValue: true,
    shortBreakValue: false,
    longBreakValue: false,

    setPomoValue: () => {
        set({pomoValue: true})
        set({shortBreakValue: false})
        set({longBreakValue: false})
    },

    setShortBreakValue: () => {
        set({pomoValue: false})
        set({shortBreakValue: true})
        set({longBreakValue: false})
    },

    setLongBreakValue: () => {
        set({pomoValue: false})
        set({shortBreakValue: false})
        set({longBreakValue: true})
    },

}));

export default pomoStore;