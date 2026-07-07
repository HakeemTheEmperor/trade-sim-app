import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  ShadowLink,
  acceptShadowInvite,
  declineShadowInvite,
  fetchFollowing,
  fetchIncomingInvites,
  fetchMyShadows,
  removeShadow,
  sendShadowInvite,
  stopFollowing,
} from "../../functions/shadowService";

type Tab = "shadows" | "following" | "invites";

function ShadowsPage() {
  const [tab, setTab] = useState<Tab>("shadows");
  const [shadows, setShadows] = useState<ShadowLink[]>([]);
  const [following, setFollowing] = useState<ShadowLink[]>([]);
  const [invites, setInvites] = useState<ShadowLink[]>([]);
  const [inviteInput, setInviteInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAll = async () => {
    try {
      const [s, f, i] = await Promise.all([
        fetchMyShadows(),
        fetchFollowing(),
        fetchIncomingInvites(),
      ]);
      setShadows(s);
      setFollowing(f);
      setInvites(i);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const flash = (msg: string) => {
    setMessage(msg);
    setError(null);
    setTimeout(() => setMessage(null), 4000);
  };

  const invite = async () => {
    setError(null);
    const value = inviteInput.trim();
    if (!value) {
      setError("Enter a username or email.");
      return;
    }
    // A value with "@" is treated as an email, otherwise a username.
    const identifier = value.includes("@")
      ? { invitee_email: value }
      : { invitee_username: value };
    try {
      const res = await sendShadowInvite(identifier);
      flash(res.message || "Invite sent.");
      setInviteInput("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const act = async (fn: () => Promise<any>, ok: string) => {
    setError(null);
    try {
      const res = await fn();
      flash(res.message || ok);
      await loadAll();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const tabButton = (key: Tab, label: string, count: number) => (
    <button
      onClick={() => setTab(key)}
      className={`px-3 py-2 text-sm rounded-t-lg ${
        tab === key ? "bg-green-700 text-white" : "bg-green-900 text-gray-300"
      }`}
    >
      {label} ({count})
    </button>
  );

  const row = (label: string, action: React.ReactNode) => (
    <li className="flex justify-between items-center p-3 border-b border-gray-700">
      <span>{label}</span>
      {action}
    </li>
  );

  return (
    <>
      <Breadcrumbs />
      <div className="text-white transparent_light rounded-md py-5 px-3 my-2">
        <h3 className="font-bold text-2xl mb-1">Shadows</h3>
        <p className="text-sm text-gray-300 mb-4">
          Invite people to shadow your trades. Shadows see the stock and whether you
          bought or sold — never the quantity or amount.
        </p>

        {/* Invite box */}
        <div className="flex gap-2 mb-4">
          <input
            value={inviteInput}
            onChange={(e) => setInviteInput(e.target.value)}
            placeholder="username or email"
            className="flex-1 p-2 rounded bg-green-950 text-white text-sm"
          />
          <button
            onClick={invite}
            className="px-4 py-2 rounded bg-green-600 text-white text-sm"
          >
            Invite
          </button>
        </div>

        {message && <p className="text-green-400 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <div className="flex gap-1 mb-0">
          {tabButton("shadows", "My shadows", shadows.length)}
          {tabButton("following", "Following", following.length)}
          {tabButton("invites", "Invites", invites.length)}
        </div>

        <ul className="list-none bg-green-950/40 rounded-b-lg">
          {tab === "shadows" &&
            (shadows.length === 0 ? (
              <p className="p-3 text-sm text-gray-400">No shadows yet.</p>
            ) : (
              shadows.map((s) =>
                row(
                  s.user?.username ?? `User #${s.shadow_id}`,
                  <button
                    onClick={() => act(() => removeShadow(s.id), "Shadow removed")}
                    className="px-2 py-1 text-xs rounded bg-red-600 text-white"
                  >
                    Remove
                  </button>
                )
              )
            ))}

          {tab === "following" &&
            (following.length === 0 ? (
              <p className="p-3 text-sm text-gray-400">
                You're not shadowing anyone yet.
              </p>
            ) : (
              following.map((f) =>
                row(
                  f.user?.username ?? `User #${f.subject_id}`,
                  <button
                    onClick={() => act(() => stopFollowing(f.id), "Stopped following")}
                    className="px-2 py-1 text-xs rounded bg-gray-600 text-white"
                  >
                    Unfollow
                  </button>
                )
              )
            ))}

          {tab === "invites" &&
            (invites.length === 0 ? (
              <p className="p-3 text-sm text-gray-400">No pending invites.</p>
            ) : (
              invites.map((i) =>
                row(
                  i.user?.username ?? `User #${i.subject_id}`,
                  <span className="flex gap-2">
                    <button
                      onClick={() =>
                        act(() => acceptShadowInvite(i.id), "Invite accepted")
                      }
                      className="px-2 py-1 text-xs rounded bg-green-600 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        act(() => declineShadowInvite(i.id), "Invite declined")
                      }
                      className="px-2 py-1 text-xs rounded bg-gray-600 text-white"
                    >
                      Decline
                    </button>
                  </span>
                )
              )
            ))}
        </ul>
      </div>
    </>
  );
}

export default ShadowsPage;
