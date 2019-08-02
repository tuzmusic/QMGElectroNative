import { stationOwnerResponse } from "../__mocks__/stationMocks";
import { startMockAdapter } from "../tests/__mocks__/axiosMocks";
import { getStationOwnerApi } from "../src/redux/actions/stationActions";
import axios from "axios";
import ApiUrls from "../src/constants/ApiUrls";
const url =
  "https://joinelectro.com/wp-json/api/v1/listing_owner/?secret_key=2is9gJTK9uLVcLgo1TaYKWnHi6SIw1Bn&post_id=1077";

describe("station owner URL constructor", () => {
  it("builds a URL to request owner info for a station", () => {
    expect(ApiUrls.stationOwner(1077)).toEqual(url);
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
