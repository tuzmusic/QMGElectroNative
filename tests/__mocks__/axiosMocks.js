import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ApiUrls from "../../src/constants/ApiUrls";
import {
  loginResponse,
  registerResponse,
  registration,
  mainParams
} from "./loginResponse";
import {
  mockIndexResponse,
  realIndexResponseJuly2019
} from "../../__mocks__/stationMocks";
import { userResponse } from "../../__mocks__/userMocks";
import * as RegMocks from "../../__mocks__/registrationMocks";

const DELAY = 0;

export function startMockAdapter({ auth = false, stations = false }) {
  const urls = ApiUrls;
  let mock = new MockAdapter(axios, { delayResponse: DELAY });
  if (auth) {
    setupLoginMockAdapter(mock);
    setupRegMockAdapter(mock);
  }
  if (stations) setupStationsMockAdapter(mock);
  // mock.onAny().passThrough();
}

export function setupStationsMockAdapter(mock) {
  // mock.onGet(ApiUrls.stationsIndex).reply(200, realIndexResponseJuly2019);
  // mock.onGet(ApiUrls.stationsIndex).reply(200, mockIndexResponse);
  mock
    .onGet(ApiUrls.stationsIndex)
    .reply(200, [...mockIndexResponse, ...realIndexResponseJuly2019]);
}

export function setupLoginMockAdapter(mock) {
  mock
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

export function setupRegMockAdapter(mock) {
  mock
    // register wp user
    .onGet(ApiUrls.nonce)
    .reply(200, registerResponse.nonce)
    .onGet(ApiUrls.register, {
      params: {
        ...mainParams
      }
    })
    .reply(200, registerResponse.success)
    // badUserApiParams
    .onGet(ApiUrls.register, {
      params: {
        username: "testuser1dupe",
        email: "api1@bolt.com",
        nonce: "29a63be176",
        display_name: "testuser1dupe",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.usernameTaken)
    // badEmailApiParams
    .onGet(ApiUrls.register, {
      params: {
        username: "testuser1",
        email: "api1@bolt.comdupe",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.emailTaken)
    // add subscriptions, to register PMS member
    .onPost(ApiUrls.registerUserRequest({ user_id: 1, memberType: "provider" }))
    .reply(200, RegMocks.providerSuccess)
    .onPost(ApiUrls.registerUserRequest({ user_id: 1, memberType: "user" }))
    .reply(200, RegMocks.userSuccess);
}
