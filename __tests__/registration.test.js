// @flow

import ApiUrls from "../src/constants/ApiUrls";
import { startMockAdapter } from "../tests/__mocks__/axiosMocks";
import { registerWithApi } from "../src/redux/actions/authActions";
import type { RegParams } from "../src/redux/actions/authActions";
import { providerSuccess, userSuccess } from "../__mocks__/registrationMocks";
import axios from "axios";
import { registerResponse } from "../tests/__mocks__/loginResponse";

describe("register API mocks", () => {
  const url =
    "https://joinelectro.com/wp-json/api/v1/register_member/?secret_key=2is9gJTK9uLVcLgo1TaYKWnHi6SIw1Bn&user_id=1&member_type=provider";
  it("should use the correct url", () => {
    expect(
      ApiUrls.registerUserRequest({ user_id: 1, memberType: "provider" })
    ).toEqual(url);
  });

  it("should return with a mock response", async () => {
    startMockAdapter({ auth: true });
    const req = await axios.post(url);
    expect(req.data).toEqual(providerSuccess);
  });
});

fdescribe("registerWithApi", () => {
  const creds = {
    username: "testuser1",
    email: "api1@bolt.com",
    password: "123123",
    firstName: "Nicola",
    lastName: "Tesla"
  };

  startMockAdapter({ auth: true });
  const cookie = registerResponse.success.cookie;
  it("should return a fully registered and subscribed provider", async () => {
    const info: RegParams = { ...creds, memberType: "provider" };
    expect(await registerWithApi(info)).toEqual({
      userObj: providerSuccess,
      cookie
    });
  });
  it("should return a fully registered and subscribed non-provider user", async () => {
    const info: RegParams = { ...creds, memberType: "user" };
    expect(await registerWithApi(info)).toEqual({
      userObj: userSuccess,
      cookie
    });
  });
});
