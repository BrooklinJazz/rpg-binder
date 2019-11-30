import ApolloClient, { InMemoryCache } from "apollo-boost";

import { LocalStorage } from "../common/constants";
import { valueFromStorage } from "../common/helpers";

export const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  request: operation => {
    const token = valueFromStorage(LocalStorage.TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});
