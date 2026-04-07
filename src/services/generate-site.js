import JSZip from "jszip";

// hardcoded JSON. delete later
const HARDCODED_SCHEDULE = {
  schedule: [
    {
      Title:
        "B2B SAAS applications for automated data integration to improve federal compliance",
      Description: "A talk about data integration",
      StartTime: "2026-03-12-1600Z0",
      EndTime: "2026-03-12-1700Z0",
      Location: "250A",
      Speaker: "John Apple",
    },
    {
      Title: "How about Open Source?",
      Description: "A cool and informative talk about open source",
      StartTime: "2026-03-13-1400Z0",
      EndTime: "2026-03-13-1430Z0",
      Location: "Online (Zoom)",
      Speaker: "Mr. OpenSource",
    },
  ],
};

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

export function buildSiteZip(scheduleData = HARDCODED_SCHEDULE) {
  const zip = new JSZip();
  zip.file("index.html", generateHTML(scheduleData));
  zip.file("style.css", CSS);
  return zip;
}
