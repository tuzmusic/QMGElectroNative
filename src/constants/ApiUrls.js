import { GoogleMapsApiKey, ApiSecretKey } from "../../secrets";

const baseUrl = "https://joinelectro.com";
const wpApiPath = "/wp-json/wp/v2";
const jsonApiSlug = "/x1H9JH7tZAb1DoJ";
const customApiSlug = "/wp-json/api/v1";

const ApiUrls = {};

/* GOOGLE MAPS API CALLS */
ApiUrls.mapsSearch = address =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`;
ApiUrls.mapsDetails = placeId =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`;

/* ELECTRO API */
ApiUrls.stationsIndex = baseUrl + wpApiPath + "/job-listings/";
ApiUrls.usersIndex =
  baseUrl + customApiSlug + `/members/?secret_key=${ApiSecretKey}`;
ApiUrls.userInfo = id => ApiUrls.usersIndex + `&id=${id}`;

/* AUTH */
ApiUrls.login = baseUrl + jsonApiSlug + "/user/generate_auth_cookie/";
ApiUrls.nonce =
  baseUrl + jsonApiSlug + "/get_nonce/?controller=user&method=register";
ApiUrls.register = baseUrl + jsonApiSlug + "/user/register";
ApiUrls.logout = baseUrl + "/wp-json/auth/logout";

export default ApiUrls;
