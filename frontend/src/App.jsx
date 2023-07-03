import { BrowserRouter } from "react-router-dom";
import RouterList from "./router";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./state";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterList />
      </BrowserRouter>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </Provider>
  );
}
