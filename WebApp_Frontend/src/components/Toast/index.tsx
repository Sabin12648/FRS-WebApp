import { toast } from "react-toastify";

type toastFunction = (message: string, variant: string) => void;

const Toast: toastFunction = (message, variant) => {
  if (variant === "success") {
    toast.success(message, {
      position: "top-right",
    });
  } else if (variant === "warning") {
    toast.warn(message, {
      position: "top-right",
    });
  } else if (variant === "error") {
    toast.error(message, {
      position: "top-right",
    });
  } else {
    toast(message, {
      position: "top-right",
    });
  }
};

export default Toast;