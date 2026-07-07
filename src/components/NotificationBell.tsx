import { useEffect, useRef, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  AppNotification,
  fetchNotifications,
  fetchUnreadCount,
  markAllNotificationsRead,
} from "../functions/notificationService";
import {
  acceptShadowInvite,
  declineShadowInvite,
} from "../functions/shadowService";

const POLL_INTERVAL_MS = 30000; // v1 delivery is polling; see feature-shadow.md

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<AppNotification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadUnread = async () => setUnread(await fetchUnreadCount());

  // Poll the unread badge on an interval.
  useEffect(() => {
    loadUnread();
    const id = setInterval(loadUnread, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Close the dropdown when clicking outside it.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next) {
      const list = await fetchNotifications();
      setItems(list);
      // Opening the feed clears the unread badge.
      if (unread > 0) {
        await markAllNotificationsRead();
        setUnread(0);
      }
    }
  };

  const respondToInvite = async (
    notif: AppNotification,
    accept: boolean
  ) => {
    const linkId = notif.payload.link_id;
    if (!linkId) return;
    try {
      if (accept) await acceptShadowInvite(linkId);
      else await declineShadowInvite(linkId);
      // Drop the invite from the list once answered.
      setItems((prev) => prev.filter((n) => n.id !== notif.id));
    } catch {
      // Surface nothing intrusive in the bell; the management page reports errors.
    }
  };

  const renderBody = (notif: AppNotification) => {
    const actor = notif.payload.actor_name ?? "Someone";
    switch (notif.type) {
      case "SHADOW_INVITE":
        return (
          <div>
            <p className="text-sm">
              <span className="font-bold">{actor}</span> invited you to shadow their
              trades.
            </p>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => respondToInvite(notif, true)}
                className="px-2 py-0.5 text-xs rounded bg-green-600 text-white"
              >
                Accept
              </button>
              <button
                onClick={() => respondToInvite(notif, false)}
                className="px-2 py-0.5 text-xs rounded bg-gray-600 text-white"
              >
                Decline
              </button>
            </div>
          </div>
        );
      case "SHADOW_TRADE": {
        const action = notif.payload.action === "SELL" ? "sold" : "bought";
        const cta = notif.payload.action === "SELL" ? "sell" : "buy";
        const symbol = notif.payload.symbol ?? "";
        return (
          <div>
            {/* Privacy: symbol + action only, never quantity or amount. */}
            <p className="text-sm">
              <span className="font-bold">{actor}</span> {action}{" "}
              <span className="font-bold">{symbol}</span>.
            </p>
            <button
              onClick={() => {
                setOpen(false);
                navigate(`/market/${cta}/${symbol}`);
              }}
              className="mt-1 px-2 py-0.5 text-xs rounded bg-green-600 text-white capitalize"
            >
              {cta} {symbol}
            </button>
          </div>
        );
      }
      case "SHADOW_ACCEPTED":
        return (
          <p className="text-sm">
            <span className="font-bold">{actor}</span> accepted your shadow invite.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative"
      ref={containerRef}
    >
      <button
        onClick={toggle}
        className="relative"
        aria-label="Notifications"
      >
        <MdNotifications
          size={30}
          fill="white"
        />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-green-900 text-white rounded-lg shadow-lg z-20">
          <div className="p-3 border-b border-green-700 font-bold">Notifications</div>
          {items.length === 0 ? (
            <p className="p-4 text-sm text-gray-300">You're all caught up.</p>
          ) : (
            items.map((notif) => (
              <div
                key={notif.id}
                className="p-3 border-b border-green-800"
              >
                {renderBody(notif)}
                <p className="text-[10px] text-gray-400 mt-1">
                  {timeAgo(notif.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
