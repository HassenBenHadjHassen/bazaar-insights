import { Container } from "inversify";
import { UserController } from "../controllers/UserController";
import { UserUseCase } from "../useCases/UserUseCase";
import { Datasource } from "../data/datasource";
import { ItemsUseCase } from "../useCases/ItemsUseCase";
import { ItemsController } from "../controllers/ItemsController";
import { GuestController } from "../controllers/GuestController";
import { GuestUseCase } from "../useCases/GuestUseCase";

const container = new Container();

/* Controllers */
container.bind<UserController>(UserController).toSelf();
container.bind<ItemsController>(ItemsController).toSelf();
container.bind<GuestController>(GuestController).toSelf();

/* UseCases */
container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<ItemsUseCase>(ItemsUseCase).toSelf();
container.bind<GuestUseCase>(GuestUseCase).toSelf();

/* Datasource */
container.bind<Datasource>(Datasource).toSelf();

export default container;
