import { Request, Response, NextFunction } from "express";

function extendParams(prams: any): any {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let keys: string[] = Object.keys(prams);
      keys.forEach((key: string) => {
        req.params[key] = prams[key];
      });
      return next();
    } catch (error: any) {
      return res.status(500).send({ message: "Unable to parse request" });
    }
  };
}

export default extendParams;
