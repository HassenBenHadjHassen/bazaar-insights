import { Container } from "inversify";
import { UserController } from "../controllers/UserController";
import { UserUseCase } from "../useCases/UserUseCase";
import { Datasource } from "../data/datasource";
import { ItemsUseCase } from "../useCases/ItemsUseCase";
import { ItemsController } from "../controllers/ItemsController";

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<ItemsController>(ItemsController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<ItemsUseCase>(ItemsUseCase).toSelf();
container.bind<Datasource>(Datasource).toSelf();

export default container;
