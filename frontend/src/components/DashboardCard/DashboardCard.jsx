import "./DashboardCard.css";

function DashboardCard({ icon, title, description, onClick }) {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default DashboardCard;