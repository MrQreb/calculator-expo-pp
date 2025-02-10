import Toast from "react-native-toast-message";

type AlertType = 'success' | 'error' | 'info';

export const showToast = (alertType: AlertType, title: string, message: string) => {
  Toast.show({
    type: alertType,
    text1: title,
    text2: message,
  });
};