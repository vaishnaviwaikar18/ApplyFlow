
import { useState, useEffect } from "react";

import {
  BriefcaseBusiness,
  CalendarCheck,
  Trophy,
  XCircle,
  Plus,
  ArrowUpRight
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import StatsCard from "../components/StatsCard";
import AddApplication from "../components/AddApplication";

// Sample analytics data
const chartData = [
  { month: "May", applications: 4 },
  { month: "Jun", applications: 7 },
  { month: "Jul", applications: 5 },
  { month: "Aug", applications: 10 },
  { month: "Sep", applications: 8 },
  { month: "Oct", applications: 13 }
];

// Status badge colors
const statusColors = {
  Applied: "bg-amber-50 text-amber-700",
  Assessment: "bg-purple-50 text-purple-700",
  Interview: "bg-blue-50 text-blue-700",
  Selected: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700"
};

const Dashboard = () => {

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Application state
  const [applications, setApplications] = useState(() => {
    try {
      const savedApplications = localStorage.getItem(
        "applyflow-applications"
      );

      if (savedApplications !== null) {
        const parsed = JSON.parse(savedApplications);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Unable to load applications:", error);
    }

    return [
      {
        id: 1,
        company: "Google",
        role: "Frontend Developer",
        date: "2026-10-28",
        status: "Interview"
      },
      {
        id: 2,
        company: "Infosys",
        role: "Systems Engineer",
        date: "2026-10-26",
        status: "Assessment"
      },
      {
        id: 3,
        company: "TCS",
        role: "Software Developer",
        date: "2026-10-24",
        status: "Applied"
      },
      {
        id: 4,
        company: "Microsoft",
        role: "React Developer",
        date: "2026-10-21",
        status: "Rejected"
      }
    ];
  });

  // Save applications in LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "applyflow-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  // Add new application
  const handleAddApplication = (newApplication) => {
    setApplications((previous) => [
      newApplication,
      ...previous
    ]);
  };

  // Dynamic statistics
  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <main className="flex-1 min-w-0 p-6 lg:p-8 space-y-2">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <p className="text-sm text-slate-400 mb-1">
            Your career journey starts here
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Welcome back! 👋
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Here's what's happening with your job search.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium text-sm transition shadow-md shadow-indigo-100"
        >
          <Plus size={18} />
          Add Application
        </button>

      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatsCard
          title="Total Applications"
          value={applications.length}
          change="Applications submitted"
          icon={BriefcaseBusiness}
          color="bg-indigo-50 text-indigo-600"
        />

        <StatsCard
          title="Interviews"
          value={interviewCount}
          change="Interviews scheduled"
          icon={CalendarCheck}
          color="bg-blue-50 text-blue-600"
        />

        <StatsCard
          title="Offers Received"
          value={offerCount}
          change="Congratulations!"
          icon={Trophy}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatsCard
          title="Rejected"
          value={rejectedCount}
          change="Keep moving forward"
          icon={XCircle}
          color="bg-rose-50 text-rose-600"
        />

      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

        {/* Application Activity */}
        <section className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-slate-900">
                Application Activity
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Your applications over the last six months
              </p>
            </div>

            <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg">
              Last 6 months
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </section>

        {/* Application Progress */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Application Progress
          </h2>

          <p className="text-xs text-slate-400 mt-1 mb-7">
            Your current job search overview
          </p>

          <div className="space-y-6">

            {[
              {
                label: "Applied",
                value: applications.filter(
                  (app) => app.status === "Applied"
                ).length,
                color: "bg-indigo-500"
              },
              {
                label: "Assessment",
                value: applications.filter(
                  (app) => app.status === "Assessment"
                ).length,
                color: "bg-purple-500"
              },
              {
                label: "Interviews",
                value: interviewCount,
                color: "bg-blue-500"
              },
              {
                label: "Offers",
                value: offerCount,
                color: "bg-emerald-500"
              },
              {
                label: "Rejected",
                value: rejectedCount,
                color: "bg-rose-400"
              }
            ].map((item) => {

              const percentage =
                applications.length > 0
                  ? (item.value / applications.length) * 100
                  : 0;

              return (
                <div key={item.label}>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">
                      {item.label}
                    </span>

                    <span className="font-semibold text-slate-800">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                </div>
              );
            })}

          </div>

        </section>

      </div>

      {/* Recent Applications */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="flex items-center justify-between p-5 md:p-6">

          <div>
            <h2 className="font-bold text-slate-900">
              Recent Applications
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Keep track of your latest job applications
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm text-indigo-600 font-semibold hover:text-indigo-800">
            View all <ArrowUpRight size={16} />
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left min-w-[650px]">

            <thead className="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Job Role</th>
                <th className="px-6 py-4 font-semibold">Applied Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    No applications yet. Start by adding your first application!
                  </td>
                </tr>
              ) : (
                applications.map((app) => (

                  <tr
                    key={app.id}
                    className="hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {app.company}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {app.role}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(
                        app.date + "T00:00:00"
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          statusColors[app.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-6">
        © 2026 ApplyFlow. Made for your next career opportunity.
      </footer>

      {/* Add Application Modal */}
      <AddApplication
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddApplication}
      />

    </main>
  );
};

export default Dashboard;
