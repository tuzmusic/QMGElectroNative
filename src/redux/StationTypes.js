// @flow
import Station from "../models/Station";

export type StationState = {
  +stations: { [string]: Station }, // TO-DO: Define Station type
  +currentStationID: ?number | ?string,
  +isLoading: boolean,
  +error: ?string
};

export type StationAction =
  | GET_STATIONS_START
  | GET_STATIONS_SUCCESS
  | GET_STATIONS_FAILURE
  | GET_STATION_OWNER_START
  // | GET_STATION_OWNER_SUCCESS
  | GET_STATION_OWNER_FAILURE
  | SET_CURRENT_STATION
  | UPDATE_LOCAL_STATION
  | SAVE_STATIONS;

export type GET_STATIONS_START = {
  type: "GET_STATIONS_START"
};
export type GET_STATIONS_SUCCESS = {
  type: "GET_STATIONS_SUCCESS",
  stations: Station[]
};
export type GET_STATIONS_FAILURE = {
  type: "GET_STATIONS_FAILURE",
  error: string
};
export type GET_STATION_OWNER_START = {
  type: "GET_STATION_OWNER_START",
  station: Station
};
// export type GET_STATION_OWNER_SUCCESS = { type: "GET_STATION_OWNER_SUCCESS" };
export type GET_STATION_OWNER_FAILURE = {
  type: "GET_STATION_OWNER_FAILURE",
  error: string
};
export type SET_CURRENT_STATION = {
  type: "SET_CURRENT_STATION",
  stationID: number
};
export type SAVE_STATIONS = { type: "SAVE_STATIONS" };
export type UPDATE_LOCAL_STATION = {
  type: "UPDATE_LOCAL_STATION",
  station: Station
};
