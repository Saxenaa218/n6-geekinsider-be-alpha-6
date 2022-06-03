import { Router } from "express";
import can from "./routes/user-can";
import rec from "./routes/user-rec";
import job from "./routes/job";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  can(app);
  rec(app);
  job(app);
  return app;
};
