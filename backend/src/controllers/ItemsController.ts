import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { ItemsUseCase } from "../useCases/ItemsUseCase";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { FilterEndpointQuery, FilterParams } from "../types/ItemTypes";

@controller("/items")
export class ItemsController {
  constructor(@inject(ItemsUseCase) private itemsUseCase: ItemsUseCase) {}

  @httpPost("/")
  public async getFilteredBazaarProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    const filters: FilterParams = req.body.filters;
    const params: FilterEndpointQuery = req.query;
    try {
      const filteredProducts =
        await this.itemsUseCase.getFilteredBazaarProducts(filters, params);
      if (!filteredProducts) {
        res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: MESSAGES.FETCH_FAILED });
        return;
      }
      res.status(STATUS_CODES.SUCCESS).json({ message: filteredProducts });
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error });
    }
  }

  @httpGet("/total")
  public async getTotalBazaarProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const products = await this.itemsUseCase.getBazaarProducts();
      if (!products) {
        res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: MESSAGES.FETCH_FAILED });
        return;
      }
      res.status(STATUS_CODES.SUCCESS).json({ message: products });
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error });
    }
  }
}
