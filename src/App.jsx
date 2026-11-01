
import { useEffect, useState } from "react";
import Analytics from "./pages/Analytics";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";

const initialApplications = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    date: "2026-10-28",
    status: "Interview",
    location: "Remote"
  },
  {
    id: 2,
    company: "Infosys",
    role: "Systems Engineer",
    date: "2026-10-26",
    status: "Assessment",
    location: "Pune"
  },
  {
    id: 3,
    company: "TCS",
    role: "Software Developer",
    date: "2026-10-24",
    status: "Applied",
    location: "Pune"
  },
  {
    id: 4,
    company: "Microsoft",
    role: "React Developer",
    date: "2026-10-21",
    status: "Rejected",
    location: "Remote"
  }
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Shared application data
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem("applyflow-applications");

      return saved !== null
        ? JSON.parse(saved)
        : initialApplications;
    } catch {
      return initialApplications;
    }
  });

  // Shared interview data
  const [interviews, setInterviews] = useState(() => {
    try {
      const saved = localStorage.getItem("applyflow-interviews");

      return saved !== null ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist applications
  useEffect(() => {
    localStorage.setItem(
      "applyflow-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  // Persist interviews
  useEffect(() => {
    localStorage.setItem(
      "applyflow-interviews",
      JSON.stringify(interviews)
    );
  }, [interviews]);

  // Application actions
  const handleAddApplication = (application) => {
    setApplications((prev) => [application, ...prev]);
  };

  const handleEditApplication = (updatedApplication) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === updatedApplication.id
          ? updatedApplication
          : app
      )
    );
  };

  const handleDeleteApplication = (id) => {
    setApplications((prev) =>
      prev.filter((app) => app.id !== id)
    );
  };

  // Interview actions
  const handleAddInterview = (interview) => {
    setInterviews((prev) => [interview, ...prev]);

    // Update the related application status
    setApplications((prev) =>
      prev.map((app) =>
        String(app.id) === interview.applicationId
          ? { ...app, status: "Interview" }
          : app
      )
    );
  };

  const handleUpdateInterview = (id, status) => {
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

  const handleDeleteInterview = (id) => {
    setInterviews((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50">

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {activePage === "Dashboard" && (
        <Dashboard
          applications={applications}
          onAdd={handleAddApplication}
        />
      )}

      {activePage === "Applications" && (
        <Applications
          applications={applications}
          onEdit={handleEditApplication}
          onDelete={handleDeleteApplication}
        />
      )}

      {activePage === "Interviews" && (
        <Interviews
          applications={applications}
          interviews={interviews}
          onAdd={handleAddInterview}
          onUpdate={handleUpdateInterview}
          onDelete={handleDeleteInterview}
        />
      )}

     {activePage === "Analytics" && (
  <Analytics
    applications={applications}
    interviews={interviews}
  />
)}

{activePage === "Settings" && (
  <main className="flex-1 p-8">
    <h1 className="text-3xl font-bold text-slate-900">
      Settings
    </h1>
    <p className="text-slate-500 mt-2">
      Settings section coming soon.
    </p>
  </main>
)}
    </div>
  );
}

export default App;
