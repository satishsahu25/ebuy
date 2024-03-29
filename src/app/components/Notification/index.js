import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Notification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
      pauseOnFocusLoss
      theme="light"
      rtl={false}
    />
  );
}
