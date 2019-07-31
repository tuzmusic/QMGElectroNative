// @flow
import ApiUrls from "../../constants/ApiUrls";
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import Sugar from "sugar";
import * as AuthTypes from "../reducers/authReducer";
import type { Saga } from "redux-saga";
import User from "../../models/User";
Sugar.extend();

type RegParams = { email?: string, username?: string, password: string };

export async function registerWithApi({
  email,
  username,
  password
}: RegParams): Object {
  const nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
  if (!nonce) throw Error("Could not get nonce");
  const res = await axios.get(ApiUrls.register, {
    params: {
      username,
      email,
      nonce,
      display_name: username,
      user_pass: password
    }
  });
  return res.data;
}

export async function loginWithApi(creds: RegParams): Object {
  const res = await axios.get(ApiUrls.login, { params: creds });
  return res.data;
}

export async function logoutWithApi(): Object {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* loginSaga({ creds }: { creds: RegParams }): Saga<void> {
  try {
    const { error, ...user } = yield call(loginWithApi, creds);
    if (error) {
      const errorAction: AuthTypes.LOGIN_FAILURE = {
        type: "LOGIN_FAILURE",
        error
      };
      yield put(errorAction);
    } else if (user) {
      const newUser: User = User.fromApi(user.user);
      const successAction: AuthTypes.LOGIN_SUCCESS = {
        type: "LOGIN_SUCCESS",
        user: newUser
      };
      yield put(successAction);
    }
  } catch (error) {
    // console.log("login error:", error.message);
    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export function* logoutSaga(): Saga<void> {
  try {
    // yield call(logoutWithApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    const action: AuthTypes.LOGOUT_FAILURE = {
      type: "LOGOUT_FAILURE",
      error: error.message
    };
    yield put(action);
  }
}

export function* registerSaga({ info }: { info: RegParams }): Saga<void> {
  try {
    let { error, cookie, user_id } = yield call(registerWithApi, info);

    yield put(
      error
        ? { type: "REGISTRATION_FAILURE", error }
        : {
            type: "REGISTRATION_SUCCESS",
            user: {
              username: info.username,
              email: info.email,
              userId: user_id,
              cookie
            }
          }
    );
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error: error.message });
  }
}

export default function* authSaga(): Saga<void> {
  yield all([
    yield takeEvery("LOGIN_START", loginSaga),
    yield takeEvery("LOGOUT_START", logoutSaga),
    yield takeEvery("REGISTRATION_START", registerSaga)
  ]);
}

export function clearAuthError() {
  return { type: "CLEAR_AUTH_ERROR" };
}

export function setUser(user: User): AuthTypes.SET_USER {
  return { type: "SET_USER", user };
}

export function login(creds: RegParams): AuthTypes.LOGIN_START {
  return { type: "LOGIN_START", creds };
}

export function logout(): AuthTypes.LOGOUT_START {
  return { type: "LOGOUT_START" };
}

export function register({
  username,
  email,
  password
}: RegParams): AuthTypes.REGISTRATION_START {
  return { type: "REGISTRATION_START", info: { username, email, password } };
}
