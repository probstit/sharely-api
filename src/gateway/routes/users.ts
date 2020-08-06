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
    "/users/register",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        await users.register({
          email: req.body.email,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        });
        // res.json(authentication);

        res.end("ok");
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/users/login",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const authentication = await users.login({
          email: req.body.email,
          password: req.body.password,
        });
        res.json({ result: authentication });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
