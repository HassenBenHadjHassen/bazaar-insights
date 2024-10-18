import { Container } from "inversify";
import { UserController } from "../controllers/UserController";
import { UserUseCase } from "../useCases/UserUseCase";

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();

export default container;
