import "./Dashboardpage.css";

const Dashboardpage = () => {
  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <h1>Dashboard (Work In Progress)</h1>
        <nav className="dashboard_nav">
          <span>Home</span>
          <span>Settings</span>
          <span>Profile</span>
        </nav>
      </header>
      <div className="dashboard_content">
        <aside className="dashboard_sidebar">
          <h2>Menu</h2>
          <ul>
            <li>Overview</li>
            <li>Analytics</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </aside>
        <main className="dashboard_main">
          <div className="card">
            <h3>Section 1</h3>
            <p>Content for section 1.</p>
          </div>
          <div className="card">
            <h3>Section 2</h3>
            <p>Content for section 2.</p>
          </div>
          <div className="card">
            <h3>Section 3</h3>
            <p>Content for section 3.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboardpage;
