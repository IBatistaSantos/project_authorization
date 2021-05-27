import { Controller } from "../../../presentation/protocols/controller";
import { LogControllerDecorator } from "../../decorators/LogControllerDecorator";

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  return new LogControllerDecorator(controller);
};
