// @flow
import * as Types from "../src/redux/StationTypes";
import Station from "../src/models/Station";
import User from "../src/models/User";
import recordSaga from "../recordSaga";
import { stationOwnerResponse } from "../__mocks__/stationMocks";
import { startMockAdapter } from "../tests/__mocks__/axiosMocks";
import { getStationOwnerApi } from "../src/redux/actions/stationActions";
import axios from "axios";
import ApiUrls from "../src/constants/ApiUrls";
const url =
  "https://joinelectro.com/wp-json/api/v1/listing_owner/?secret_key=2is9gJTK9uLVcLgo1TaYKWnHi6SIw1Bn&post_id=1077";
const id = 1077;
describe("station owner URL constructor", () => {
  it("builds a URL to request owner info for a station", () => {
    expect(ApiUrls.stationOwner(id)).toEqual(url);
  });
});

describe("station owner mock", () => {
  let mock;
  beforeEach(() => {
    mock = startMockAdapter({ stations: true });
  });
  afterEach(() => {
    mock.restore();
  });

  it("responds with station owner data for this specific station", async () => {
    expect((await axios.get(url)).data).toEqual(stationOwnerResponse);
  });
  xit("responds with station owner data for any station", async () => {
    const url = "https://joinelectro.com/wp-json/api/v1/listing_owner/";
    expect((await axios.get(url)).data).toEqual(stationOwnerResponse);
  });
});

describe("getStationOwnerApi", () => {
  it("returns the response", async () => {
    expect(await getStationOwnerApi(id)).toEqual(stationOwnerResponse);
  });
});

xdescribe("getStationOwnerSaga", () => {
  const startAction: Types.GET_STATION_OWNER_START = {
    type: "GET_STATION_OWNER_START",
    stationId: id
  };

  // WHOA. A station with a user is too much to mock right now. I'm being a lazy programmer.

  const successAction: Types.UPDATE_LOCAL_STATION = {
    type: "UPDATE_LOCAL_STATION",
    station: new Station()
  };
});

describe("User from stationOwnerResponse", () => {
  expect(User.fromStationOwnerResponse(stationOwnerResponse)).toEqual(
    mockUser()
  );
});

function mockUser(): User {
  const user = new User();
  user.id = 16;
  user.username = "tuztest";
  user.email = "tuz.music@gmail.com";
  user.url = "";
  user.registeredStr = "2019-07-31 14:22:38";
  user.firstName = "Jonathan";
  user.lastName = "Tuzman";
  return user;
}
