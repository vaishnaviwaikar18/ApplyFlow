
import { useState } from "react";
import { X, BriefcaseBusiness, Plus } from "lucide-react";

const AddApplication = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    date: new Date().toISOString().split("T")[0],
    link: "",
    status: "Applied",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...formData,
      id: Date.now(),
    });

    setFormData({
      company: "",
      role: "",
      location: "",
      salary: "",
      jobType: "Full-time",
      date: new Date().toISOString().split("T")[0],
      link: "",
      status: "Applied",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <BriefcaseBusiness className="text-indigo-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Add New Application
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Keep track of your career opportunities.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                required
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Job Title *
              </label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Pune / Remote"
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Salary / Package
              </label>
              <input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 5 LPA"
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Application Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Application Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Applied</option>
                <option>Assessment</option>
                <option>Interview</option>
                <option>Selected</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Job Posting Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://company.com/careers"
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-slate-100">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Plus size={18} />
              Save Application
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
