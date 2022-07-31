import { InstanceOptions, IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";

export default class Products extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      "https://3jfc0467k2.execute-api.us-east-1.amazonaws.com",
      context,
      options
    );
  }

  public async saveProducts(): Promise<any> {
    const products: Product[] = [{ id: "item1" }, { id: "item2" }];

    for await (const product of products) {
      const data = { idCarrinho: product.id };

      this.http.post("/compra", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
  }
}
