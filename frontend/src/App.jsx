import { BrowserRouter } from "react-router-dom";
import RouterList from "./router";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "./state";
import { NextUIProvider } from "@nextui-org/react";
import { PersistGate } from "redux-persist/lib/integration/react";
export default function App() {
  return (
    <NextUIProvider disableBaseline="true">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <RouterList />
          </BrowserRouter>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </PersistGate>
      </Provider>
    </NextUIProvider>
  );
}
