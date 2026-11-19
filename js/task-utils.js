export const STATUSES = ["Pending", "In Progress", "Resolved"];
export const CATEGORIES = ["Cleanliness", "Electrical", "Water", "Infrastructure", "Internet", "Other"];

export function createReport(data, id = `FMC-${Date.now().toString().slice(-6)}`) {
  const required = ["title", "category", "location", "priority", "description"];
  for (const key of required) {
    if (!String(data?.[key] ?? "").trim()) throw new Error(`${key} is required`);
  }
  if (!CATEGORIES.includes(data.category)) throw new Error("Invalid category");
  if (!["Low", "Medium", "High"].includes(data.priority)) throw new Error("Invalid priority");
  return {
    id, title: String(data.title).trim(), category: data.category,
    location: String(data.location).trim(), priority: data.priority,
    description: String(data.description).trim(), reporter: String(data.reporter || "Anonymous").trim(),
    status: "Pending", createdAt: data.createdAt || new Date().toISOString(),
    photo: data.photo || ""
  };
}

export function getCounts(reports) {
  return {
    total: reports.length,
    pending: reports.filter(r => r.status === "Pending").length,
    progress: reports.filter(r => r.status === "In Progress").length,
    resolved: reports.filter(r => r.status === "Resolved").length
  };
}

export function filterReports(reports, { status = "all", category = "all", query = "" } = {}) {
  const q = query.trim().toLowerCase();
  return reports.filter(r =>
    (status === "all" || r.status === status) &&
    (category === "all" || r.category === category) &&
    (!q || [r.id, r.title, r.location, r.description, r.category].some(v => String(v).toLowerCase().includes(q)))
  );
}
