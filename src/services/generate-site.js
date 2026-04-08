import JSZip from "jszip";
import csvToJSON from "./csv-to-json";

async function loadScheduleFromCSV() {
  const response = await fetch("/schedule.csv");
  const text = await response.text();
  const parsed = csvToJSON("schedule.csv", text);
  // csvToJSON returns { objectName, headers, data }
  // generate-site expects { schedule: [...] }
  return { schedule: parsed.data };
}

function formatSession(session) {
  return `
    <li class="session">
      <h2>${session.Title}</h2>
      <p class="meta">${session.StartTime} - ${session.EndTime} | ${session.Location}</p>
      <p class="speaker">${session.Speaker}</p>
      <p>${session.Description ?? ""}</p>
    </i>
  `;
}

function generateHTML(scheduleData) {
  const sessionItems = scheduleData.schedule.map(formatSession).join("\n");
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conference Schedule</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Conference Schedule</h1>
    <ul class="schedule">
      ${sessionItems}
    </ul>
  </body>
  </html>
  `;
}

const CSS = `
  body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; padding 0 1rem; }
  .schedule { list-style: none; padding: 0; }
  .session {border: 1px solid #ccc; border-radius: 4px; padding: 1rem; margin-bottom: 1rem; }
  .meta { color: #555; font-size: 0.9rem; }
  .speaker { font-weight: bold; }
`;

export async function buildSiteZip() {
  const scheduleData = await loadScheduleFromCSV();
  const zip = new JSZip();
  zip.file("index.html", generateHTML(scheduleData));
  zip.file("style.css", CSS);
  return zip;
}
