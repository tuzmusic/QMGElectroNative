// @flow
import { GoogleMapsApiKey, ApiSecretKey } from "../../secrets";

const baseUrl = "https://joinelectro.com";
const wpApiPath = "/wp-json/wp/v2";
const wpApiBase = baseUrl + wpApiPath;
const jsonApiSlug = "/x1H9JH7tZAb1DoJ";
const customApiSlug = "/wp-json/api/v1";
const customApiBase = baseUrl + customApiSlug;
const secretKeyStarter = `/?secret_key=${ApiSecretKey}`;
const ApiUrls = {};

/* GOOGLE MAPS API CALLS */
ApiUrls.mapsSearch = (address: string) =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`;
ApiUrls.mapsDetails = (placeId: string) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`;

/**
 * ELECTRO API
 * **/

/* STATIONS */
ApiUrls.stationsIndex = wpApiBase + "/job-listings/";
ApiUrls.stationOwner = (id: number) =>
  customApiBase + "/listing_owner" + secretKeyStarter + "&post_id=" + id;

/* USERS */
ApiUrls.usersIndex = customApiBase + `/members` + secretKeyStarter;
ApiUrls.registerUserUrl = customApiBase + `/register_member` + secretKeyStarter;
ApiUrls.userInfo = (id: number) => ApiUrls.usersIndex + `&id=${id}`;

// Subscribe WP User, making them a PMS Member
ApiUrls.registerUserRequest = ({
  user_id,
  memberType
}: {
  user_id: number,
  memberType: "provider" | "user"
}) => ApiUrls.registerUserUrl + `&user_id=${user_id}&member_type=${memberType}`;

/* AUTH */
ApiUrls.login = baseUrl + jsonApiSlug + "/user/generate_auth_cookie/";
ApiUrls.nonce =
  baseUrl + jsonApiSlug + "/get_nonce/?controller=user&method=register";
ApiUrls.register = baseUrl + jsonApiSlug + "/user/register";
ApiUrls.logout = baseUrl + "/wp-json/auth/logout";

export default ApiUrls;
