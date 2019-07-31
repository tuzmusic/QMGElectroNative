import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ApiUrls from "../../src/constants/ApiUrls";
import { loginResponse, registerResponse, registration } from "./loginResponse";
import {
  mockIndexResponse,
  realIndexResponseJuly2019
} from "../../__mocks__/stationMocks";

const DELAY = 0;

export function startMockAdapter({ auth = false, stations = false }) {
  const urls = ApiUrls;
  let mock = new MockAdapter(axios, { delayResponse: DELAY });
  if (auth) setupAuthMockAdapter(mock);
  if (stations) setupStationsMockAdapter(mock);
  mock.onAny().passThrough();
}

export function setupStationsMockAdapter(mock) {
  // mock.onGet(ApiUrls.stationsIndex).reply(200, realIndexResponseJuly2019);
  mock.onGet(ApiUrls.stationsIndex).reply(200, mockIndexResponse);
  // mock
  //   .onGet(ApiUrls.stationsIndex)
  //   .reply(200, [...mockIndexResponse, ...realIndexResponseJuly2019]);
}

export function setupAuthMockAdapter(mock) {
  mock
    // register
    .onGet(ApiUrls.nonce)
    .reply(200, registerResponse.nonce)
    .onGet(ApiUrls.register, {
      params: {
        username: "testuser1",
        email: "api1@bolt.com",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.success)
    .onGet(ApiUrls.register, {
      // params: registration.badUserApiParams
      params: {
        username: "testuser1dupe",
        email: "api1@bolt.com",
        nonce: "29a63be176",
        display_name: "testuser1dupe",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.usernameTaken)
    .onGet(ApiUrls.register, {
      // params: registration.badEmailApiParams
      params: {
        username: "testuser1",
        email: "api1@bolt.comdupe",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.emailTaken)
    // login
    .onGet(ApiUrls.login, {
      params: {
        username: "testuser1",
        password: "123123"
      }
    })
    .reply(200, loginResponse.success)
    .onGet(ApiUrls.login, {
      params: {
        email: "testuser@bolt.com",
        password: "123123"
      }
    })
    .reply(200, loginResponse.success)
    .onGet(ApiUrls.login)
    .reply(200, loginResponse.failure)
    // logout
    .onGet(ApiUrls.logout)
    .reply(200, loginResponse.logout);
}
