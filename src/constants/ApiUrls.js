import { GoogleMapsApiKey } from "../../secrets";

const baseUrl = "https://joinelectro.com";
const wpApiPath = "/wp-json/wp/v2";
const jsonApiSlug = "/x1H9JH7tZAb1DoJ";

export default {
  mapsSearch: address =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`,
  mapsDetails: placeId =>
    `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`,
  stationsIndex: baseUrl + wpApiPath + "/job-listings/",
  login: baseUrl + jsonApiSlug + "/user/generate_auth_cookie/",
  nonce: baseUrl + jsonApiSlug + "/get_nonce/?controller=user&method=register",
  register: baseUrl + jsonApiSlug + "/user/register",
  logout: baseUrl + "/wp-json/auth/logout"
};
