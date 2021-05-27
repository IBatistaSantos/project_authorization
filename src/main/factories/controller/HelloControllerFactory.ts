import { HelloController } from "../../../presentation/controllers/HelloController";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decotators/logControllerDecaratorFactory";

export const makeHelloController = (): Controller => {
  const helloController = new HelloController();
  return makeLogControllerDecorator(helloController);
};
