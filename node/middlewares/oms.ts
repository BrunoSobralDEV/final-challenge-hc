/* eslint-disable no-console */
import { json } from "co-body";

// todo: filter
// const filterProducts = (items) => {
//   console.log(items.map(item => {
//     id: item.productId,
//     sku: item.sellerSku
//   }))
// }

const handleOrders = async (ctx: Context, next: () => Promise<any>) => {
  try {
    // Obtém ID do pedido
    const { OrderId } = await json(ctx.req);
    console.log(OrderId);

    const { items } = await ctx.clients.oms.order(OrderId);
    console.log("itens: ", items);

    ctx.body = "OK";
    ctx.status = 200;
    ctx.set("Cache-Control", "no-cache no-store");

    await next();
  } catch (err) {
    console.log(err);
    ctx.body = JSON.stringify({
      message: err?.response?.data?.error?.message || "Internal server error",
    });
    ctx.status = 200;
    ctx.set("Cache-Control", "no-cache no-store");
    await next();
  }
};

export default handleOrders;
