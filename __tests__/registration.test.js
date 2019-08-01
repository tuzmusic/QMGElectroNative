import ApiUrls from "../src/constants/ApiUrls";
import { startMockAdapter } from "../tests/__mocks__/axiosMocks";
import { registerWithApi } from "../src/redux/actions/authActions";
import type { RegParams } from "../src/redux/actions";
import { providerSuccess, userSuccess } from "../__mocks__/registrationMocks";

describe("registerWithApi", () => {
  const creds = {
    username: "testuser1",
    email: "api1@bolt.com",
    password: "123123"
  };
  it("should return a fully registered and subscribed provider", () => {
    const info: RegParams = { ...creds, memberType: "provider" };
    expect(registerWithApi(info)).toEqual(providerSuccess);
  });
  it("should return a fully registered and subscribed non-provider user", () => {
    const info: RegParams = { ...creds, memberType: "user" };
    expect(registerWithApi(info)).toEqual(userSuccess);
  });
});
