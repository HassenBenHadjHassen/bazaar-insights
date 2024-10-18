import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { ItemsUseCase } from "../useCases/ItemsUseCase";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { FilterParams } from "../types/ItemTypes";

@controller("/items")
export class ItemsController {
  constructor(@inject(ItemsUseCase) private itemsUseCase: ItemsUseCase) {}

  @httpGet("/")
  public async getFilteredBazaarProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    const filters: FilterParams = req.body.filters;
    try {
      const filteredProducts =
        await this.itemsUseCase.getFilteredBazaarProducts(filters);
      if (!filteredProducts) {
        res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: MESSAGES.FETCH_FAILED });
        return;
      }
      res.status(STATUS_CODES.SUCCESS).json(filteredProducts);
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error });
    }
  }
}
