import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const links = [
    {
      to: '/endpoints',
      label: 'Endpoints',
      icon: 'hub',
    },
    {
      to: '/deliveries',
      label: 'Deliveries',
      icon: 'send_and_archive',
    },
  ];

  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setShowLogout(false);
      setLoggingOut(false);
      navigate('/', { replace: true });
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-outline-variant/15 bg-surface-container-lowest p-4">
      <div className="flex flex-col gap-6">
        {/* Branding */}
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-2xl text-primary">
              webhook
            </span>
          </div>

          <div className="min-w-0">
            <p className="font-semibold tracking-wider text-on-surface">
              HOOKDECK
            </p>
            <p className="text-[10px] tracking-[0.18em] text-on-surface-variant">
              DELIVERY PLATFORM
            </p>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex items-center justify-between rounded-lg bg-surface-container p-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant">
              business
            </span>
            <span className="font-mono text-sm text-on-surface">
              acme-corp
            </span>
          </div>

          <span className="rounded bg-primary/10 px-2 py-1 font-mono text-xs uppercase text-primary">
            prod
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.2em] text-on-surface-variant">
            WORKSPACE
          </p>

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${isActive
                  ? 'bg-surface-container-high font-medium text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">
                {link.icon}
              </span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-surface-container-low p-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>

          <span className="text-xs text-on-surface-variant">
            All systems operational
          </span>
        </div>

        {/* <div className="flex items-center gap-3 rounded-lg bg-surface-container p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high">
            <span className="material-symbols-outlined text-on-surface-variant">
              person
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm text-on-surface">
              HookShot User
            </p>
            <p className="text-xs text-on-surface-variant">
              Account
            </p>
          </div>
        </div> */}


        <div className="relative">
          {showLogout && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-2 shadow-xl">
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-xl">
                  logout
                </span>
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowLogout((previous) => !previous)}
            aria-expanded={showLogout}
            className="flex w-full items-center gap-3 rounded-lg bg-surface-container p-3 text-left transition-colors hover:bg-surface-container-high"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
              <span className="material-symbols-outlined text-on-surface-variant">
                person
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-on-surface">
                HookShot User
              </p>
              <p className="text-xs text-on-surface-variant">
                Account
              </p>
            </div>

            <span className="material-symbols-outlined text-on-surface-variant">
              {showLogout ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>

      </div>
    </aside>
  );
}