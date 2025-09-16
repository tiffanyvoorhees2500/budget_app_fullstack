const parseCSV = require('../utils/parsers/csvParser');
const parseOFX = require('../utils/parsers/ofxParser');

exports.previewFile = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: 'No file uploaded' });

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;

  try {
    let preview;

    if (fileName.endsWith('.csv')) {
      preview = await parseCSV(fileBuffer);
    } else if (fileName.endsWith('.ofx')) {
      preview = await parseOFX(fileBuffer);
    } else {
      return res.status(400).json({
        error: 'Unsupported file format. Please upload a CSV or OFX file.',
      });
    }

    res.json(preview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadFile = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: 'No file uploaded' }); 

    // Placeholder for actual upload logic
    // You can use a service like AWS S3, Google Cloud Storage, etc. to upload the file
    // For now, we'll just return a success message
    res.json({ message: 'File uploaded successfully' });
};
