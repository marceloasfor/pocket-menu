import { GET_USERS, GET_TABLE_STREAM } from "@/actions";

export const appReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      const { data, error } = action.payload;
      return { ...state, users: data, isLoading: false, isError: error };
    case GET_TABLE_STREAM:
      return { ...state, users: [action.payload, ...state.posts] };
    default:
      return state;
  }
};