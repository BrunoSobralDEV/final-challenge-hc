import React from "react";
import style from "./styles.css";

const Notification = () => {
  return (
    <div className={style.recNotification}>
      <p className={style.recNotificationText}>
        Item(s) adicionado(s) ao carrinho
      </p>
    </div>
  );
};

export default Notification;
