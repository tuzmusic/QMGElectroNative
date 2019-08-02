// @flow
import Station from "../models/Station";

export type StationReducerState = {
  +stations: { [string]: Station }, // TO-DO: Define Station type
  +currentStationID: ?number | ?string,
  +isLoading: boolean,
  +error: ?string,
};

export type GET_STATIONS_START = { type: "GET_STATIONS_START" };
export type GET_STATIONS_SUCCESS = {
  type: "GET_STATIONS_SUCCESS",
  stations: Station[]
};
export type GET_STATIONS_FAILURE = {
  type: "GET_STATIONS_FAILURE",
  error: string
};
export type SET_CURRENT_STATION = {
  type: "SET_CURRENT_STATION",
  stationID: number
};
export type SAVE_STATIONS = { type: "SAVE_STATIONS" };
export type UPDATE_STATION = { type: "UPDATE_STATION", station: Station };

export type StationAction =
  | GET_STATIONS_START
  | GET_STATIONS_SUCCESS
  | GET_STATIONS_FAILURE
  | SET_CURRENT_STATION
  | SAVE_STATIONS
  | CRUD_ACTIONS_TBD;
