import { HttpRequest } from "@/presentation/protocols/http";
import { IMiddleware } from "@/presentation/protocols/middlewares";
import { Request, Response, NextFunction } from "express";

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const httpRequest: HttpRequest = {
      headers: request.headers,
      userId: request.userId,
    };

    const httpResponse = await middleware.handle(httpRequest);
    const { statusCode, body } = httpResponse;

    if (statusCode !== 200) {
      return response.status(statusCode).json({ error: body.message });
    }

    Object.assign(request, body);

    return next();
  };
};
