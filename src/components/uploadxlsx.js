import React, { useState } from 'react';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploaded(true);
        setUploading(false);
      })
      .catch((error) => {
        console.error(error);
        setUploading(false);
      });
  };

  return (
    <div>
      <h1>Subir archivo xlsx</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir</button>
      {uploading ? (
        <p>Subiendo...</p>
      ) : (
        uploaded ? (
          <p>Archivo subido con éxito!</p>
        ) : (
          <p>Seleccione un archivo para subir</p>
        )
      )}
    </div>
  );
}

export default UploadFile;