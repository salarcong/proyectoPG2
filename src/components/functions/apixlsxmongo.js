const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const xlsx = require('xlsx');

const upload = multer({ dest: './uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const workbook = await xlsx.readFile(file.path);
    const data = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const rows = [];
      for (let i = 0; i < worksheet.data.length; i++) {
        rows.push(worksheet.data[i]);
      }
      data.push(rows);
    });

    const collection = mongoose.connection.collection('mycollection');
    await collection.insertMany(data);

    res.json({ message: 'Archivo subido con éxito!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;