
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  Plus,
  Trash2,
  BriefcaseBusiness,
  CheckCircle2,
  XCircle
} from "lucide-react";

const Interviews = ({
  applications,
  interviews,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    applicationId: "",
    company: "",
    role: "",
    round: "Technical",
    date: "",
    time: "",
    meetingLink: "",
    notes: ""
  });

  const handleCompanyChange = (id) => {
    const selected = applications.find(
      (app) => String(app.id) === id
    );

    setFormData({
      ...formData,
      applicationId: id,
      company: selected?.company || "",
      role: selected?.role || ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...formData,
      id: Date.now(),
      status: "Scheduled"
    });

    setFormData({
      applicationId: "",
      company: "",
      role: "",
      round: "Technical",
      date: "",
      time: "",
      meetingLink: "",
      notes: ""
    });

    setShowForm(false);
  };

  const scheduled = interviews.filter(
    (item) => item.status === "Scheduled"
  );

  const completed = interviews.filter(
    (item) => item.status === "Completed"
  );

  const cancelled = interviews.filter(
    (item) => item.status === "Cancelled"
  );

  const sortedInterviews = [...interviews].sort((a, b) => {
    return new Date(`${a.date}T${a.time}`) -
      new Date(`${b.date}T${b.time}`);
  });

  const formatDate = (date) => {
    if (!date) return "Date not set";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const statusStyle = {
    Scheduled: "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-rose-50 text-rose-700"
  };

  return (
    <main className="flex-1 min-w-0 p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <p className="text-sm text-slate-400 mb-1">
            Stay prepared for your opportunities
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Interview Management
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Organize your upcoming interviews and track your progress.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium shadow-md shadow-indigo-100"
        >
          <Plus size={18} />
          Schedule Interview
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <CalendarDays className="text-blue-600 mb-4" size={24} />
          <h2 className="text-3xl font-bold">{scheduled.length}</h2>
          <p className="text-sm text-slate-500 mt-1">
            Scheduled
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <CheckCircle2 className="text-emerald-600 mb-4" size={24} />
          <h2 className="text-3xl font-bold">{completed.length}</h2>
          <p className="text-sm text-slate-500 mt-1">
            Completed
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <XCircle className="text-rose-600 mb-4" size={24} />
          <h2 className="text-3xl font-bold">{cancelled.length}</h2>
          <p className="text-sm text-slate-500 mt-1">
            Cancelled
          </p>
        </div>

      </div>

      {/* Interview List */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">
            All Interviews
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {interviews.length} interviews in your schedule
          </p>
        </div>

        {sortedInterviews.length === 0 ? (
          <div className="py-20 text-center px-6">
            <CalendarDays
              size={45}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="font-semibold text-slate-700">
              No interviews scheduled yet
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Schedule your first interview to start organizing your career journey.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm"
            >
              Schedule your first interview
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">

            {sortedInterviews.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-slate-50 transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                  <div className="flex gap-4">

                    <div className="w-14 h-14 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center">
                      <CalendarDays size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {item.company}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.role}
                      </p>

                      <p className="text-xs text-indigo-600 font-medium mt-2">
                        {item.round} Round
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(item.date)}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {item.time}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 flex-wrap">

                    <select
                      value={item.status}
                      onChange={(e) =>
                        onUpdate(item.id, e.target.value)
                      }
                      className={`text-xs font-semibold rounded-full px-3 py-2 border-0 outline-none ${
                        statusStyle[item.status]
                      }`}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {item.meetingLink && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        title="Open meeting link"
                      >
                        <Video size={18} />
                      </a>
                    )}

                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                      title="Delete interview"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

                {item.notes && (
                  <p className="text-sm text-slate-500 mt-4 ml-[72px]">
                    {item.notes}
                  </p>
                )}

              </div>
            ))}

          </div>
        )}

      </section>

      {/* Schedule Interview Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-6"
          >

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Schedule New Interview
            </h2>

            <p className="text-sm text-slate-400 mb-6">
              Add your interview details below.
            </p>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Company *
                </label>

                <select
                  required
                  value={formData.applicationId}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white"
                >
                  <option value="">Choose an application</option>

                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.company} - {app.role}
                    </option>
                  ))}
                </select>

                {applications.length === 0 && (
                  <p className="text-xs text-rose-500 mt-2">
                    Add a job application before scheduling an interview.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Interview Round *
                </label>

                <select
                  value={formData.round}
                  onChange={(e) => setFormData({
                    ...formData,
                    round: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white"
                >
                  <option>Technical</option>
                  <option>HR</option>
                  <option>Managerial</option>
                  <option>Group Discussion</option>
                  <option>Assessment</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Interview Date *
                  </label>

                  <input
                    type="date"
                    required
                    min={new Date().toLocaleDateString("en-CA")}
                    value={formData.date}
                    onChange={(e) => setFormData({
                      ...formData,
                      date: e.target.value
                    })}
                    className="w-full border border-slate-200 rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Interview Time *
                  </label>

                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({
                      ...formData,
                      time: e.target.value
                    })}
                    className="w-full border border-slate-200 rounded-xl p-3"
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Meeting Link
                </label>

                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({
                    ...formData,
                    meetingLink: e.target.value
                  })}
                  placeholder="https://meet.google.com/..."
                  className="w-full border border-slate-200 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Notes
                </label>

                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({
                    ...formData,
                    notes: e.target.value
                  })}
                  placeholder="Interview preparation notes..."
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl p-3 resize-none"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-7">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-3 border border-slate-200 rounded-xl text-slate-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={applications.length === 0}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50"
              >
                Save Interview
              </button>

            </div>

          </form>

        </div>
      )}

    </main>
  );
};

export default Interviews;
