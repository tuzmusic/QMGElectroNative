import { stationOwnerResponse } from "../__mocks__/stationMocks";
import { startMockAdapter } from "../tests/__mocks__/axiosMocks";
import { getStationOwnerApi } from "../src/redux/actions/stationActions";
import ApiUrls from "../src/constants/ApiUrls";

describe("station owner URL constructor", () => {
  it("builds a URL to request owner info for a station", () => {
    expect(ApiUrls.stationOwner(1077)).toEqual(
      "https://joinelectro.com/wp-json/api/v1/listing_owner/?secret_key=2is9gJTK9uLVcLgo1TaYKWnHi6SIw1Bn&post_id=1077"
    );
  });
});
