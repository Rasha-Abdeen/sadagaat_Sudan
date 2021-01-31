/**
 * This function return  address of Server
 * @return {String} ip of server
 * @example "http://142.4.15.252:9090/api/v1/"
 */
export function address() {
  // Deployment Enviroment
  // return "https://sadagaat.com:9090/api/v1/";

  // Development and Test Enviroment
  return "https://sadagaat.com:4959/api/v1/";
}

export default address;
