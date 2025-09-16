const { parse } = require('csv-parse/sync');

async function parseCSV(fileBuffer) {
  // Convert buffer to string
  const fileString = fileBuffer.toString('utf-8');

  // Parse CSV synchronously
  const records = parse(fileString, {
    columns: true, // Treat first row as headers
    skip_empty_lines: true,
  });

  // Take first 5 rows for preview
  const previewRows = records.slice(0, 50);

  // Include headers
  const headers = records.length > 0 ? Object.keys(records[0]) : [];

  return { headers, previewRows };
}

module.exports = parseCSV;
