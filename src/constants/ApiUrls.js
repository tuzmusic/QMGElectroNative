// @flow
import { GoogleMapsApiKey, ApiSecretKey } from "../../secrets";

const baseUrl = "https://joinelectro.com";
const wpApiPath = "/wp-json/wp/v2";
const jsonApiSlug = "/x1H9JH7tZAb1DoJ";
const customApiSlug = "/wp-json/api/v1";

const ApiUrls = {};

/* GOOGLE MAPS API CALLS */
ApiUrls.mapsSearch = (address: string) =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`;
ApiUrls.mapsDetails = (placeId: string) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`;

/* ELECTRO API */
ApiUrls.stationsIndex = baseUrl + wpApiPath + "/job-listings/";

ApiUrls.usersIndex =
  baseUrl + customApiSlug + `/members/?secret_key=${ApiSecretKey}`;
ApiUrls.registerUserUrl =
  baseUrl + customApiSlug + `/register_member/?secret_key=${ApiSecretKey}`;
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

function registerRequest({
  username,
  email,
  password,
  nonce
}: {
  username: string,
  email: string,
  password: string,
  nonce: string
}): string {
  const params = Object.entries({
    nonce,
    username,
    email,
    display_name: username,
    user_pass: password
  })
    .map(([k, v]) => {
      return [k, v].join("=");
    })
    .join("&");
  return ApiUrls.register + "?" + params;
}

ApiUrls.registerRequest = registerRequest;

export default ApiUrls;
