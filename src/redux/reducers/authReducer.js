// @flow
import User from "../../models/User";
import type { AuthReducerState, AuthAction } from "../AuthTypes";

export const initialState: AuthReducerState = {
  user: null,
  isLoading: false,
  error: null
};

const authReducer = (
  state: AuthReducerState = initialState,
  action: AuthAction
): AuthReducerState => {
  // if (!action.type.startsWith("@@")) console.log(action.type);

  switch (action.type) {
    case "LOGIN_START":
    case "LOGOUT_START":
    case "REGISTRATION_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
    case "REGISTRATION_SUCCESS":
    case "SET_USER":
      // debugger;
      return {
        ...state,
        user: action.user,
        isLoading: false,
        error: null
      };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, isLoading: false, error: null };
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
    case "REGISTRATION_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    case "CLEAR_AUTH_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
