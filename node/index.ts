import type { ClientsConfig, ServiceContext, RecorderState } from "@vtex/api";
import { method, Service } from "@vtex/api";

import { Clients } from "./clients";
import handleOrders from "./middlewares/oms";

declare global {
  type Context = ServiceContext<Clients, State>;
  interface State extends RecorderState {
    code: number;
  }

  interface Product {
    sellerSku: string;
    quantity: number;
  }

  interface OrderInfo {
    type: string;
    items: Product[];
  }
}

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: 10000,
    },
  },
};

export default new Service({
  clients,
  routes: {
    hook: method({
      POST: [handleOrders],
    }),
  },
});
