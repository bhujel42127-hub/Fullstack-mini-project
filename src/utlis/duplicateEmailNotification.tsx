import notification from "antd/es/notification";

export const openNotification = () =>{
  notification.error({
    message: 'Duplicate Email',
    description: 'Email already exists',
    placement: 'topRight',
  });
}