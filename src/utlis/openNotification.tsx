import notification from "antd/es/notification";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = (
  type: NotificationType,
  message: string,
  description?: string,
  placement: "topRight" | "topLeft" | "bottomRight" | "bottomLeft" = "topRight"
) => {
  notification[type]({
    message,
    description,
    placement,
  })
}

