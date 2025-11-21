import notification from "antd/es/notification";

export const dupEmailNotification = () => {
  notification.error({
    message: "Duplicate Email",
    description: "Email already exists",
    placement: "topRight",
  });
};

export const passNotification = () => {
  notification.error({
    message: "Passowrd error",
    description: "Email already exists",
    placement: "topRight",
  });
};

export const loginFailure = () => {
  notification.error({
    message: "User not found",
    description: "Incorrect email or password",
    placement: "topRight",
  });
};
export const editSuccess = () => {
  notification.success({
    message: "Update Sucess",
    description: "Updated user data",
    placement: "topRight",
  });
};
