import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  loading: false,
  response: null,
  error: null
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserData: (state, action) => {
      console.log('------ action.payload------userdata');
      console.log(action);

      const { res, loading } = action.payload;

      state.userData = res;
      state.loading = loading;
    },

    registerUser: (state, action) => {
      console.log('------ registerUser action.payload ------');
      console.log(action);
      const { res, loading } = action.payload;
      state.loading = loading;
      state.response = res
    },

    cleanUserData: (state, action) => {
      console.log('------ cleanUserData action.payload ------');
      console.log(action);
      state.loading = false;
      state.response = null
    },

    userLogout: (state, action) => {
      console.log('------ user Logout action.payload ------');
      console.log(action);
      state.userData = null;
      state.loading = false;
      state.response = null;
      state.error = null;
      console.log(initialState);
      console.log(state);

    },

    changepwd: (state, action) => {
      console.log('------ changepwd action.payload ------');
      console.log(action);
      const { res, loading } = action.payload;
      state.loading = loading;
      state.response = res
    },
  },
});

export const {
  setUserData,
  registerUser,
  cleanUserData,
  userLogout,
  changepwd,
} = userSlice.actions;


export const selectUser = (state: any) => state.user;

export default userSlice.reducer;