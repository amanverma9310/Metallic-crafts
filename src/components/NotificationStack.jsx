import { useApp } from "../context/AppContext";
import "./NotificationStack.css";

export default function NotificationStack() {
  const { notifications } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-stack" role="status" aria-live="polite">
      {notifications.map((n) => (
        <div key={n.id} className={`alert alert-${n.type} notification-toast`}>
          {n.message}
        </div>
      ))}
    </div>
  );
}
