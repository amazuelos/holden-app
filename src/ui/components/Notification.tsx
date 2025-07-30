import { useEffect } from "react";
import { MdNotifications } from "react-icons/md";

interface NotificationProps {
  count: number;
  onClose: () => void;
}

export default function Notification({ count, onClose }: NotificationProps) {
  useEffect(() => {
    if (count === 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [count, onClose]);

  if (count === 0) return null;

  return (
    <div
      className="
        bg-white text-center px-4 py-2 rounded shadow-lg
        flex items-center gap-2 max-w-xs w-full mx-auto mt-4
        justify-center
        z-50
      "
    >
      <MdNotifications size={24} />
      <span>
        {count} documento{count > 1 ? "s" : ""} nuevo{count > 1 ? "s" : ""}
      </span>
    </div>
  );
}