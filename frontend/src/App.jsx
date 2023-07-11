import { BrowserRouter } from "react-router-dom";
import RouterList from "./router";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./state";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider disableBaseline="true">
      <Provider store={store}>
        <BrowserRouter>
          <RouterList />
        </BrowserRouter>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </Provider>
    </NextUIProvider>
  );
}
