import { IOClients } from "@vtex/api";
import { OMS } from "@vtex/clients";
import Products from "./products";

export class Clients extends IOClients {
  public get products() {
    return this.getOrSet("products", Products);
  }

  public get oms() {
    return this.getOrSet("oms", OMS);
  }
}
