// @flow

// import uuid from "react-native-uuid";
import type { Location } from "../redux/LocationTypes";
import type { StationCollection } from "../redux/StationTypes";
import User from "./User";
import ApiUrls from "../constants/ApiUrls";

type unitOfDistance = "mi" | "km" | "nm";

export default class Station {
  // #region TYPE PROPERTY DEFINITIONS
  id: number;
  originalJSON: Object;
  owner: User;
  title: string;
  address: string;
  // contactEmail: string;
  // contactPhone: string;
  description: string;
  location: ?Location;
  priceFrom: string;
  priceTo: string;
  // tagline: string;
  // website: string;
  featuredImage: { url: string }[];
  galleryImages: { url: string }[];
  // mediaDataURL: string;
  // imageURL: string;
  // listingURL: string;
  // #endregion
  distanceFromLocation(
    location: Location,
    unit: unitOfDistance = "mi"
  ): ?number {
    if (this.location) return distanceBetween(this.location, location);
  }

  distanceFrom(otherStation: Station, unit: unitOfDistance = "mi"): ?number {
    if (this.location && otherStation.location)
      return distanceBetween(this.location, otherStation.location);
  }

  priceString(freeString: string = "Free!"): string {
    return this.priceFrom && this.priceTo
      ? `${isNaN(this.priceFrom) ? "" : "$"}${this.priceFrom}-${
          isNaN(this.priceTo) ? "" : "$"
        }${this.priceTo}`
      : freeString;
  }

  async setLocation() {
    // console.log("Setting location for", this.title);
    this.location = await Station.getLocationForAddress(this.address);
  }
  /* 
  static _collectionFromArray(stationArray: Station[]): StationCollection {
    const stations = {};
    stationArray.forEach(s => (stations[s.id] = Station.fromApi(s)));
    return stations;
  }
 */
  static collectionFromObjects(array: Object): StationCollection {
    const stations = {};
    array.forEach(
      obj => (stations[obj.id] = Object.assign(new Station(), obj))
    );
    return stations;
  }
  /* 
  static fromApi(json: Object): Station {
    function p(propName: string, prefix: string = "_"): string {
      const key = `${prefix}${propName}`;
      const valueArray: string[] = json.listing_props[key];
      return (valueArray && valueArray[0]) || "";
    }

    let station = new Station();
    station.originalJSON = json.originalJSON || json;
    station.id = json.id;
    station.listingURL = json.link;
    if (json.listing_props) {
      station.title = p("job_title");
      station.content = p("job_description");
      station.contactEmail = p("company_email");
      station.contactPhone = p("company_phone");
      station.address = p("job_location");
      if (
        json.listing_props.geolocation_lat[0] &&
        json.listing_props.geolocation_long[0]
      ) {
        station.location = {
          latitude: Number(p("geolocation_lat", "")),
          longitude: Number(p("geolocation_long", ""))
        };
      }
      station.priceFrom = p("company_price_from");
      station.priceTo = p("company_price_to");
      station.website = p("company_website");
      if (station.website && !station.website.startsWith("http"))
        station.website = "http://" + station.website;
    }
    // this.amenityIDs = [...json.job_listing_amenity];

    station.mediaID = json.featured_media;
    if (station.mediaID > 0) {
      station.mediaDataURL =
        "http://joinelectro.com/wp-json/wp/v2/media/" + station.mediaID;
    }
    return station;
    // return new Station(stationJSON);
  }
 */
  /* 
  static toApi(json: Object) {
    return {
      originalJSON: json,
      // id: uuid.v1(), // ultimately this may need to be a string
      id: Math.random(),
      listing_props: {
        _job_title: [json.title],
        _job_description: [json.content],
        _job_location: [json.address],
        _company_tagline: [json.tagline],
        _company_website: [json.website],
        _company_email: [json.contactEmail],
        _company_phone: [json.contactPhone],
        _job_location: [json.address],
        _company_price_from: [json.priceFrom],
        _company_price_to: [json.priceTo],
        _company_website: [json.website],
        geolocation_latitude: [json.location.lat], // may need to be converted to a string
        geolocation_long: [json.location.lng] // may need to be converted to a string
      }
      // job_listing_amenity: (array of amenity numbers),
      // featured_media: (media id)
    };
  }
 */
  static async getLocationForAddress(address: string): Promise<?Location> {
    try {
      const search = await fetch(ApiUrls.mapsSearch(address));
      const { predictions, ...searchData } = await search.json();
      if (searchData.error_message) throw Error(searchData.error_message);
      if (!predictions.length) throw Error("No places found for " + address);
      const details = await fetch(ApiUrls.mapsDetails(predictions[0].place_id));
      const { result, ...detailsData } = await details.json();
      if (detailsData.error_message) throw Error(searchData.error_message);
      const location = result.geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng
      };
    } catch (error) {
      // console.log("Error getting location for address in station:", error);
    }
  }
}

export function distanceBetween(
  loc1: Location,
  loc2: Location,
  unit: unitOfDistance = "mi"
): number {
  if (loc1.latitude == loc2.latitude && loc1.longitude == loc2.longitude)
    return 0;
  var radlat1 = (Math.PI * loc1.latitude) / 180;
  var radlat2 = (Math.PI * loc2.latitude) / 180;
  var theta = loc1.longitude - loc2.longitude;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "km") dist = dist * 1.609344;
  if (unit == "nm") dist = dist * 0.8684;
  // debugger;
  return Number(dist.toFixed(2));
}
