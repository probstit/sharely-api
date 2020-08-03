import * as express from "express";
// import { ObjectID } from "mongodb";

// import {isAuthorized} from '../authorization';
// import {transform} from '../transform';
// import {throttle} from '../throttle';
// import {RateLimiter} from '../../application/rateLimiter';
import { UserService } from "../../domain/users/service";

export function get(users: UserService): express.Router {
  let router = express.Router();

  router.post(
    "/user/register",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        // let authentication = await users.register({
        //   grantType: req.body.grantType,
        //   clientId: req.body.clientId,
        //   clientSecret: req.body.clientSecret,
        //   state: req.body.state,

        //   accountKitCode: req.body.accountKitCode,
        //   firstname: req.body.firstname,
        //   lastname: req.body.lastname,
        // });
        // res.json(authentication);

        res.end();
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
