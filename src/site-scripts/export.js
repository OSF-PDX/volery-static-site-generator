let scheduleData = null;

fetch("./schedule.json")
  .then((res) => res.json())
  .then((data) => {
    scheduleData = data;
  })
  .catch((err) => console.error("Failed to load schedule data:", err));

function triggerDownload(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportJSON() {
  triggerDownload(
    "schedule.json",
    JSON.stringify(scheduleData, null, 2),
    "application/json",
  );
}

function exportCSV() {
  if (!scheduleData.length) return;
  const headers = Object.keys(scheduleData[0]);
  const rows = scheduleData.map((row) =>
    headers.map((h) => JSON.stringify(row[h] ?? "")).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  triggerDownload("schedule.csv", csv, "text/csv");
}

function exportTXT() {
  const lines = scheduleData.map((session) =>
    [
      session.Title,
      `${session.StartTime} - ${session.EndTime} | ${session.Location}`,
      session.Speaker,
      session.Description ?? "",
      "---",
    ].join("\n"),
  );
  triggerDownload("schedule.txt", lines.join("\n\n"), "text/plain");
}

document.querySelectorAll(".export-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!scheduleData) {
      alert("Schedule data not yet loaded. Please try again in a moment.");
      return;
    }
    const format = btn.dataset.format;
    if (format === "json") exportJSON();
    else if (format === "csv") exportCSV();
    else if (format === "txt") exportTXT();
  });
});
