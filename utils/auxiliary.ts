import { toast } from 'react-toastify';

export const initCap = (value: string) => {
  return value
    .toLowerCase()
    .replace(/(?:^|[^a-zØ-öø-ÿ])[a-zØ-öø-ÿ]/g, function (m) {
      return m.toUpperCase();
    });
};

export const errorToastNotification = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

export const successToastNotification = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
