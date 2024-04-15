import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../libs/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { sendDeviceToken } from "../api/log-activity.js";
import Message from "./Message.jsx";
import "react-toastify/dist/ReactToastify.css";

function NotificationHandler() {
  const VITE_APP_VAPID_KEY =
    "BNpW04EBnoVl6GlDvOzEIBgWenmjOwlm8p3GOtyGNPwR1L0PQVNKK2SApZPjKwzq3uHy6iFmcQ15UrZAai1Z8CA";
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error requesting permission for notifications:", error);
        return false;
      }
    }

    async function subscribeToNotifications() {
      try {
        const permissionGranted = await requestPermission();
        if (permissionGranted) {
          const token = await getToken(messaging, {
            vapidKey: VITE_APP_VAPID_KEY,
          });
          sendTokenToBackend(token);
          setIsSubscribed(true);
        }
      } catch (error) {
        console.log("Retrying subscription...");
        subscribeToNotifications();
      }
    }

    async function sendTokenToBackend(token) {
      try {
        await sendDeviceToken({ token: token, userId: user.id });
      } catch (error) {
        console.error("Error sending token to backend:", error);
      }
    }

    if (!isSubscribed) {
      subscribeToNotifications();

      onMessage(messaging, (payload) => {
        console.log("Incoming message:", payload);
        toast(<Message notification={payload.notification} />);
      });
    }
  }, [isSubscribed, user.id]);

  return <ToastContainer />;
}

export default NotificationHandler;
