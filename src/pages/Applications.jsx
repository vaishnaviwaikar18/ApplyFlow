
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Pencil,
  Trash2,
  ExternalLink,
  BriefcaseBusiness,
  X
} from "lucide-react";

const statusColors = {
  Applied: "bg-amber-50 text-amber-700",
  Assessment: "bg-purple-50 text-purple-700",
  Interview: "bg-blue-50 text-blue-700",
  Selected: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700"
};

const Applications = ({ applications, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingApplication, setEditingApplication] = useState(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.role.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || app.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, filterStatus]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editingApplication);
    setEditingApplication(null);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  return (
    <main className="flex-1 min-w-0 p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-slate-400 mb-1">
            Manage your career opportunities
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Track and organize every job you've applied for.
          </p>
        </div>

        <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-xl text-sm font-semibold">
          {applications.length} Total Applications
        </div>
      </div>

      {/* Search and Filter */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company or job title..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative md:w-56">
            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Assessment">Assessment</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        </div>
      </section>

      {/* Applications Table */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">
            All Applications
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">

            <thead className="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Job Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16">
                    <BriefcaseBusiness
                      size={36}
                      className="mx-auto text-slate-300 mb-3"
                    />

                    <p className="font-semibold text-slate-700">
                      No applications found
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
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
                      {app.location || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(app.date)}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        statusColors[app.status] || "bg-slate-100 text-slate-700"
                      }`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        {app.link && (
                          <a
                            href={app.link}
                            target="_blank"
                            rel="noreferrer"
                            title="Open job posting"
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                          >
                            <ExternalLink size={17} />
                          </a>
                        )}

                        <button
                          onClick={() => setEditingApplication({ ...app })}
                          title="Edit application"
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${app.company} application?`)) {
                              onDelete(app.id);
                            }
                          }}
                          title="Delete application"
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </section>

      {/* Edit Application Modal */}
      {editingApplication && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">

          <form
            onSubmit={handleEditSubmit}
            className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Edit Application
              </h2>

              <button
                type="button"
                onClick={() => setEditingApplication(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>

                <input
                  required
                  value={editingApplication.company}
                  onChange={(e) => setEditingApplication({
                    ...editingApplication,
                    company: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title
                </label>

                <input
                  required
                  value={editingApplication.role}
                  onChange={(e) => setEditingApplication({
                    ...editingApplication,
                    role: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>

                <input
                  value={editingApplication.location || ""}
                  onChange={(e) => setEditingApplication({
                    ...editingApplication,
                    location: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Application Status
                </label>

                <select
                  value={editingApplication.status}
                  onChange={(e) => setEditingApplication({
                    ...editingApplication,
                    status: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Applied</option>
                  <option>Assessment</option>
                  <option>Interview</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-7">
              <button
                type="button"
                onClick={() => setEditingApplication(null)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      )}

    </main>
  );
};

export default Applications;
