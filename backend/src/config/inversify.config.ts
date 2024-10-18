import { Container } from "inversify";
import { UserController } from "../controllers/UserController";
import { UserUseCase } from "../useCases/UserUseCase";
import { Datasource } from "../data/datasource";

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<Datasource>(Datasource).toSelf();

export default container;
