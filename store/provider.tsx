"use client";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "./store";
export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}