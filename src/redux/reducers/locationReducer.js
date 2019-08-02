// @flow
import * as LocationTypes from "../LocationTypes";
const initialState: LocationTypes.LocationState = {
  currentRegion: null,
  error: null,
  searchRadiusInMiles: 5
};

export default function dealsReducer(
  state: LocationTypes.LocationState = initialState,
  action: LocationTypes.LocationAction
): LocationTypes.LocationState {
  // if (!action.type.startsWith("@@")) console.log(action.type);

  switch (action.type) {
    case "USER_LOCATION_START":
      return { ...state, loadingMessage: "" };
    case "USER_LOCATION_SUCCESS":
    case "SET_CURRENT_REGION":
      // console.log("set current region", action.region);
      return { ...state, currentRegion: action.region };
    case "USER_LOCATION_FAILURE":
      return { ...state, error: action.error };
    case "SET_SEARCH_RADIUS":
      return { ...state, searchRadiusInMiles: action.radius };
    default:
      return state;
  }
}
