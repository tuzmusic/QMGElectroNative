// @flow
import Station from "../models/Station";

export type StationCollection = { [number]: Station };
export type StationState = {
  +stations: StationCollection,
  +currentStationID: ?number | ?string,
  +isLoading: boolean,
  +error: ?string
};

export type StationAction =
  | GET_STATIONS_START
  | GET_STATIONS_SUCCESS
  | GET_STATIONS_FAILURE
  | SAVE_STATIONS;

export type GET_STATIONS_START = {
  type: "GET_STATIONS_START"
};
export type GET_STATIONS_SUCCESS = {
  type: "GET_STATIONS_SUCCESS",
  stations: StationCollection
};
export type GET_STATIONS_FAILURE = {
  type: "GET_STATIONS_FAILURE",
  error: string
};
export type SAVE_STATIONS = { type: "SAVE_STATIONS" };
