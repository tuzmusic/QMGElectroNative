// @flow
import ApiUrls from "../../constants/ApiUrls";
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import * as AuthTypes from "../reducers/authReducer";
import type { Saga } from "redux-saga";
import User from "../../models/User";

export type RegParams = {
  email: string,
  username: string,
  password: string,
  memberType: "user" | "provider"
};
export type LoginParams = {
  email?: string,
  username?: string,
  password: string
};

type RegApiReturn = {
  cookie: string,
  userObj: Object
};

export async function registerWithApi({
  email,
  username,
  password,
  memberType
}: RegParams): Promise<RegApiReturn> {
  // Get the nonce for registration.
  console.log("getting nonce at", ApiUrls.nonce);

  const nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
  if (!nonce) throw Error("Could not get nonce");

  // Register the WP user
  /**
   * https://joinelectro.com/x1H9JH7tZAb1DoJ/user/register?nonce=8a0034be89&username=apitest5&email=apitest5@electro.com&display_name=apitest5&user_pass=123123
   * https://joinelectro.com/x1H9JH7tZAb1DoJ/user/register?nonce=8a0034be89&username=app_test_user&email=app_test_user@bolt.com&display_name=app_test_user&user_pass=123123
   *
   **/

  // const regUrl: string = ApiUrls.registerRequest({
  //   username,
  //   password,
  //   email,
  //   nonce
  // });
  // console.log("registering WP user at", regUrl);

  // const { data } = await axios.get(regUrl);
  const { data } = await axios.get(ApiUrls.register, {
    params: {
      username,
      email,
      nonce,
      display_name: username,
      user_pass: password
    }
  });
  debugger;
  const { user_id, cookie } = data;
  // Subscribe that WP user, transforming them into a PMS Member
  const reqUrl = ApiUrls.registerUserRequest({ user_id, memberType });
  console.log("Adding subscription to new user", reqUrl);

  const res = await axios.post(reqUrl);
  debugger;
  return { userObj: res.data, cookie };
}

export function* registerSaga({ info }: { info: RegParams }): Saga<void> {
  try {
    let { cookie, userObj }: RegApiReturn = yield call(registerWithApi, info);
    const user = User.fromApi(userObj);
    debugger;
    yield put({ type: "REGISTRATION_SUCCESS", user });
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error: error.message });
  }
}

export async function loginWithApi(creds: LoginParams): Object {
  const res = await axios.get(ApiUrls.login, { params: creds });
  return res.data;
}

export function* loginSaga({ creds }: { creds: LoginParams }): Saga<void> {
  try {
    const { error, ...user } = yield call(loginWithApi, creds);
    if (error) {
      const errorAction: AuthTypes.LOGIN_FAILURE = {
        type: "LOGIN_FAILURE",
        error
      };
      yield put(errorAction);
    } else if (user) {
      // const newUser: User = User.fromApi(user.user);
      const successAction: AuthTypes.LOGIN_SUCCESS = {
        type: "LOGIN_SUCCESS",
        user: User.fromApi(user.user)
      };
      yield put(successAction);
    }
  } catch (error) {
    // console.log("login error:", error.message);
    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export async function logoutWithApi(): Object {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* logoutSaga(): Saga<void> {
  try {
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    const action: AuthTypes.LOGOUT_FAILURE = {
      type: "LOGOUT_FAILURE",
      error: error.message
    };
    yield put(action);
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

export function login(creds: LoginParams): AuthTypes.LOGIN_START {
  return { type: "LOGIN_START", creds };
}

export function logout(): AuthTypes.LOGOUT_START {
  return { type: "LOGOUT_START" };
}

export function register(info: RegParams): AuthTypes.REGISTRATION_START {
  return { type: "REGISTRATION_START", info };
}
