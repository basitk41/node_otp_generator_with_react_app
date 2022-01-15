import { toast } from "react-toastify";
export const errorToast = (msg) => {
  toast.error(msg);
};
export const successToast = (msg) => {
  toast.success(msg);
};
export const warningToast = (msg) => {
  toast.warning(msg);
};
