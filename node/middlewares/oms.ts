/* eslint-disable no-console */
import { OrderItemDetailResponse } from "@vtex/clients";
import { json } from "co-body";

const filterProducts = (items: OrderItemDetailResponse[]) => {
  return items.map((item) => ({
    sellerSku: item.sellerSku,
    quantity: item.quantity,
  }));
};

const handleOrders = async (ctx: Context, next: () => Promise<any>) => {
  try {
    // Obtém ID do pedido
    const { OrderId, State } = await json(ctx.req);
    const { items } = await ctx.clients.oms.order(OrderId);

    if (items.length > 1) {
      const filteredItems = filterProducts(items);
      await ctx.clients.products.saveProducts({
        type: State,
        items: filteredItems,
      });
    }

    ctx.body = "OK";
    ctx.status = 200;
    ctx.set("Cache-Control", "no-cache no-store");

    await next();
  } catch (err) {
    ctx.body = JSON.stringify({
      message: err?.response?.data?.error?.message || "Internal server error",
    });
    ctx.status = 200;
    ctx.set("Cache-Control", "no-cache no-store");
    await next();
  }
};

export default handleOrders;
