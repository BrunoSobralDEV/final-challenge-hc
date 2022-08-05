import { InstanceOptions, IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";

export default class Products extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      "https://k30cnnmuxj.execute-api.us-east-1.amazonaws.com",
      context,
      options
    );
  }

  public async saveProducts(order: OrderInfo) {
    return this.http.post("/createOrUpdate/combinationCreateOrUpdate", order, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
}
