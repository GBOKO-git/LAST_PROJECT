// aeey_client\src\composants\UploadImage\Upload.jsx
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { API_CONFIG, buildApiUrl } from '../../services/api.config';

const UploadImage = ({ onUploadComplete, initialImage }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialImage || '');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(buildApiUrl(API_CONFIG.ENDPOINTS.IMAGES.UPLOAD), formData);
      const imageUrl = res.data.imageUrl;
      setPreview(imageUrl);
      onUploadComplete(imageUrl);
    } catch (err) {
      console.error('Erreur upload:', err);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      <img
        src={preview || '/default-profile.png'}
        alt="preview"
        width={100}
        className="cursor-pointer rounded-full mx-auto"
        onClick={handleClickImage}
      />

      {image && (
        <button
          onClick={handleUpload}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
        >
          Uploader
        </button>
      )}
    </div>
  );
};

export default UploadImage;
