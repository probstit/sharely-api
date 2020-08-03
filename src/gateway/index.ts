import { ApiGateway } from "./gateway";
import { UserService } from "../domain/users/service";
export { ApiGateway } from "./gateway";

export function get(apiVersion: string, users: UserService): ApiGateway {
  let gateway = new ApiGateway(apiVersion, users);

  return gateway;
}
