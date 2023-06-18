import create from "zustand";
import axios from "axios";

const BASE_URL = "https://api-gamer-helper.onrender.com/"

const formStore = create((set) => ({
  loginValue: "",
  passwordValue: "",
  confirmPasswordValue: "",
  pseudoValue: "",
  biographyValue: "",
  settingsPage: false,
  profilPage: true,
  currentUser: {},
  isLogged: false,
  deletePage: false,
  confirmCode: "",
  isLoading: false,

  setLoginValue: (e) => {
    set({ loginValue: e.target.value });
    // formStore.getState().callToApi()
  },

  setPasswordValue: (e) => {
    set({ passwordValue: e.target.value });
    // formStore.getState().callToApi()
  },

  setConfirmPasswordValue: (e) => {
    set({ confirmPasswordValue: e.target.value });
    // formStore.getState().callToApi()
  },

  setConfirmCode: (e) => {
    set({ confirmCode: e.target.value });
    // formStore.getState().callToApi()
  },

  setPseudoValue: (e) => {
    set({ pseudoValue: e.target.value });
  },

  setBiographyValue: (e) => {
    set({ biographyValue: e.target.value });
  },

  setSettingsPage: () => {
    set({ settingsPage: true });
    set({ profilPage: false });
    set({ deletePage: false });
  },

  setProfilPage: () => {
    set({ profilPage: true });
    set({ settingsPage: false });
    set({ deletePage: false });
  },

  setDeletePage: () => {
    set({ profilPage: false });
    set({ settingsPage: false });
    set({ deletePage: true });
  },

  handleUserFromApi: async (id, token = "", refreshToken = "") => {
    set({ isLoading: true });
    const result = await axios.get(`${BASE_URL}user/${id}`);
    set({
      currentUser: { ...formStore.getState().currentUser, user: result.data },
    });
    set({ isLoading: false });
  },

  setIsLogged: () => {
    set({ isLogged: true });
  },

  toggleIsLoading: () => {
    set({ isLoading: !formStore.getState().isLoading });
  },

  connectUserFromApi: async () => {
    set({ isLoading: true });
    try {
      const result = await axios({
        method: "post",
        url: `${BASE_URL}login`,
        data: {
          email: formStore.getState().loginValue,
          password: formStore.getState().passwordValue,
        },
      });
      set({ currentUser: result.data, isLogged: true });
      set({ isLogged: true });
    } catch (error) {
      console.log(error);
    }
    set({ loginValue: "" });
    set({ passwordValue: "" });
    set({ isLoading: false });
  },

  disconnectUser: () => {
    set({ currentUser: {} });
    set({ isLogged: false });
  },

  subscribeFromApi: async () => {
    set({ isLoading: true });
    try {
      await axios({
        method: "post",
        url: `${BASE_URL}signup`,
        data: {
          email: formStore.getState().loginValue,
          password: formStore.getState().passwordValue,
          passwordConfirm: formStore.getState().confirmPasswordValue,
          pseudo: formStore.getState().pseudoValue,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // await formStore.getState().connectUserFromApi();
    set({ confirmPasswordValue: "" });
    set({ pseudoValue: "" });
    set({ isLoading: false });
  },

  modifyAccountFromApi: async (id) => {
    set({ isLoading: true });
    const result = await axios({
      method: "patch",
      url: `${BASE_URL}user/${id}`,
      data: {
        email:
          formStore.getState().loginValue ||
          formStore.getState().currentUser.email,
        password:
          formStore.getState().passwordValue ||
          formStore.getState().currentUser.password,
        pseudo:
          formStore.getState().pseudoValue ||
          formStore.getState().currentUser.pseudo,
      },
    });
    set({ currentUser: { user: result.data } });
    set({ loginValue: "" });
    set({ pseudoValue: "" });
    set({ passwordValue: "" });
    set({ isLoading: false });
  },

  deleteAccountFromApi: async (id) => {
    set({ isLoading: true });
    await axios.delete(`${BASE_URL}delete/${id}`);
    set({ currentUser: {} });
    set({ isLogged: false });
    set({ confirmCode: "" });
    set({ isLoading: false });
  },

  sendConfirmDelete: async (id) => {
    set({ isLoading: true });
    const result = await axios.get(`${BASE_URL}user/${id}/mail`);
    set({
      currentUser: {
        user: formStore.getState().currentUser.user,
        token: result.data,
      },
    });
    set({ isLoading: false });
  },

  submitBio: async (id) => {
    set({ isLoading: true });
    const result = await axios({
      method: "patch",
      url: `${BASE_URL}user/${id}/biography`,
      data: {
        biography:
          formStore.getState().biographyValue ||
          formStore.getState().currentUser.biography,
      },
    });
    set({ currentUser: { user: result.data } });
    set({ biographyValue: "" });
    set({ isLoading: false });
  },

  fillCurrentUser: (data) => {
    set({
      currentUser: {
        user: data.user,
        refreshToken: data.refreshToken,
        token: data.token,
      },
    });
    set({ isLogged: true });
    formStore
      .getState()
      .handleUserFromApi(formStore.getState().currentUser.user.id);
  },

  fillCurrentUserFromAccount: async (data) => {
    set({ isLogged: true });
    set({
      currentUser: {
        user: data.user,
        refreshToken: data.refreshToken,
        token: data.token,
      },
    });
    await formStore.getState().handleUserFromApi(
      formStore.getState().currentUser.user.id
      // token: formStore.getState().currentUser.token,
      // refreshToken: formStore.getState().currentUser.refreshToken,
    );
  },

  compareTokensFromApi: async (data) => {
    set({ isLoading: true });

    if (data.token) {
      const result = await axios({
        method: "post",
        url: `${BASE_URL}auth/refreshToken`,
        data: {
          refreshToken: data.refreshToken,
        },
      });
      if (result.data.accessToken || result.data.refreshToken) {
        formStore
          .getState()
          .handleUserFromApi(data.user.id, data.token, data.refreshToken);
      }
    }
    set({ isLoading: false });
  },
}));

export default formStore;
