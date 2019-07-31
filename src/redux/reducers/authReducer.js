// @flow
import AsyncStorage from "@react-native-community/async-storage";
import User from "../../models/User";

type State = {
  user: ?User,
  isLoading: boolean,
  error: ?Error
};

export const initialState: State = {
  user: null,
  isLoading: false,
  error: null
};

const authReducer = (
  state: State = initialState,
  action: AuthAction
): State => {
  // console.log(action.type);

  switch (action.type) {
    case "LOGIN_START":
    case "LOGOUT_START":
    case "REGISTRATION_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
    case "REGISTRATION_SUCCESS":
    case "SET_USER":
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

export type AuthAction =
  | LOGIN_START
  | LOGOUT_START
  | REGISTRATION_START
  | LOGIN_SUCCESS
  | REGISTRATION_SUCCESS
  | SET_USER
  | LOGOUT_SUCCESS
  | LOGIN_FAILURE
  | LOGOUT_FAILURE
  | REGISTRATION_FAILURE
  | CLEAR_AUTH_ERROR;

export type LOGIN_START = { type: "LOGIN_START" };
export type LOGOUT_START = { type: "LOGOUT_START" };
export type REGISTRATION_START = { type: "REGISTRATION_START" };
export type LOGIN_SUCCESS = { type: "LOGIN_SUCCESS", user: User };
export type REGISTRATION_SUCCESS = { type: "REGISTRATION_SUCCESS", user: User };
export type SET_USER = { type: "SET_USER", user: User };
export type LOGOUT_SUCCESS = { type: "LOGOUT_SUCCESS" };
export type LOGIN_FAILURE = { type: "LOGIN_FAILURE", error: Error };
export type LOGOUT_FAILURE = { type: "LOGOUT_FAILURE", error: Error };
export type REGISTRATION_FAILURE = {
  type: "REGISTRATION_FAILURE",
  error: Error
};
export type CLEAR_AUTH_ERROR = { type: "CLEAR_AUTH_ERROR" };
