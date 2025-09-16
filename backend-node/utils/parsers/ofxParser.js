const { OFX } = require('ofx-js');

async function parseOFX(fileBuffer) {
  let fileString = fileBuffer.toString('utf-8');

  let ofxData;
  try {
    ofxData = OFX.parse(fileString);
  } catch (err) {
    throw new Error('Error parsing OFX file: ' + err.message);
  }

  // Extract transactions (may vary depending on bank OFX format)
  const transactions =
    ofxData?.bankTransactions || ofxData?.creditCardAccount?.transactions || [];

  // Take first 5 for preview
  const previewRows = transactions.slice(0, 5);

  // Collect headers (all possible fields from first transaction)
  const headers = previewRows.length > 0 ? Object.keys(previewRows[0]) : [];

  return { headers, previewRows };
}

module.exports = parseOFX;
