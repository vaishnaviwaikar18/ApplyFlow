
import {
  BriefcaseBusiness,
  CalendarCheck,
  Trophy,
  TrendingUp,
  Target,
  Clock
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = [
  "#6366f1",
  "#a78bfa",
  "#3b82f6",
  "#10b981",
  "#f43f5e"
];

const Analytics = ({ applications, interviews }) => {

  const total = applications.length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const assessmentCount = applications.filter(
    (app) => app.status === "Assessment"
  ).length;

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const conversionRate = total
    ? ((interviewCount / total) * 100).toFixed(1)
    : 0;

  const successRate = total
    ? ((selectedCount / total) * 100).toFixed(1)
    : 0;

  const statusData = [
    { name: "Applied", value: appliedCount },
    { name: "Assessment", value: assessmentCount },
    { name: "Interview", value: interviewCount },
    { name: "Selected", value: selectedCount },
    { name: "Rejected", value: rejectedCount }
  ].filter((item) => item.value > 0);

  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const current = new Date();
    const monthDate = new Date(
      current.getFullYear(),
      current.getMonth() - (5 - index),
      1
    );

    const month = monthDate.toLocaleString("en-US", {
      month: "short"
    });

    const count = applications.filter((app) => {
      if (!app.date) return false;

      const date = new Date(app.date + "T00:00:00");

      return (
        date.getMonth() === monthDate.getMonth() &&
        date.getFullYear() === monthDate.getFullYear()
      );
    }).length;

    return { month, applications: count };
  });

  const stats = [
    {
      title: "Total Applications",
      value: total,
      description: "Jobs applied for",
      icon: BriefcaseBusiness,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Interviews",
      value: interviewCount,
      description: "Reached interview stage",
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Offers Received",
      value: selectedCount,
      description: "Successfully selected",
      icon: Trophy,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Total Interviews",
      value: interviews.length,
      description: "Scheduled interview records",
      icon: Clock,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <main className="flex-1 min-w-0 p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-slate-400 mb-1">
          Understand your job search performance
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          Analytics & Insights
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Track your progress and make smarter career decisions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-center">

                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon size={21} />
                </div>

              </div>

              <h2 className="text-3xl font-bold text-slate-900 mt-5">
                {item.value}
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <Target size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Interview Conversion Rate
              </h3>
              <p className="text-xs text-slate-400">
                Applications reaching interview stage
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-indigo-600">
            {conversionRate}%
          </h2>

          <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${conversionRate}%` }}
            />
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Selection Success Rate
              </h3>
              <p className="text-xs text-slate-400">
                Applications resulting in selection
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-emerald-600">
            {successRate}%
          </h2>

          <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${successRate}%` }}
            />
          </div>

        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

        {/* Monthly Activity */}
        <section className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Monthly Application Activity
          </h2>

          <p className="text-xs text-slate-400 mt-1 mb-6">
            Applications submitted over the last six months
          </p>

          <div className="h-72 w-full">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={35}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </section>

        {/* Status Distribution */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Application Distribution
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Breakdown by application status
          </p>

          {statusData.length > 0 ? (
            <div className="h-72 mt-4">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={85}
                    innerRadius={48}
                    paddingAngle={3}
                  >

                    {statusData.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={COLORS[index]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />
                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-sm text-slate-400">
              No application data available yet.
            </div>
          )}

        </section>

      </div>

      {/* Insights */}
      <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">

        <h2 className="font-bold text-indigo-900 mb-3">
          Your Job Search Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div>
            <p className="text-sm text-indigo-700">
              Applications submitted
            </p>
            <p className="text-2xl font-bold text-indigo-900 mt-1">
              {total}
            </p>
          </div>

          <div>
            <p className="text-sm text-indigo-700">
              Pending applications
            </p>
            <p className="text-2xl font-bold text-indigo-900 mt-1">
              {appliedCount + assessmentCount}
            </p>
          </div>

          <div>
            <p className="text-sm text-indigo-700">
              Rejected applications
            </p>
            <p className="text-2xl font-bold text-indigo-900 mt-1">
              {rejectedCount}
            </p>
          </div>

        </div>

      </section>

      <footer className="text-center text-xs text-slate-400 py-8">
        © 2026 ApplyFlow. Your career journey, measured.
      </footer>

    </main>
  );
};

export default Analytics;
