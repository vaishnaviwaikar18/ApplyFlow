
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  Settings,
  HelpCircle,
  LogOut,
  Zap
} from "lucide-react";

const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Applications", icon: BriefcaseBusiness },
    { name: "Interviews", icon: CalendarDays },
    { name: "Analytics", icon: ChartNoAxesCombined },
  ];

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-white border-r border-slate-200 flex flex-col p-6">

      <div className="flex items-center gap-3 mb-10">
        <div className="bg-indigo-600 text-white p-2 rounded-xl">
          <Zap size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            ApplyFlow
          </h1>
          <p className="text-xs text-slate-400">
            Career companion
          </p>
        </div>
      </div>

      <p className="text-xs font-semibold text-slate-400 uppercase mb-4">
        Workspace
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">

        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 rounded-xl">
          <Settings size={19} />
          Settings
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 rounded-xl">
          <HelpCircle size={19} />
          Help & Support
        </button>

        <div className="border-t border-slate-200 pt-4 mt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            V
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              My Workspace
            </p>
            <p className="text-xs text-slate-400">
              Free Plan
            </p>
          </div>

          <LogOut size={17} className="ml-auto text-slate-400" />
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
