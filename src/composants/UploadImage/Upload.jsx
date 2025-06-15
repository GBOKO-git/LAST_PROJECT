// // aeey_client\src\composants\UploadImage\Upload.jsx
// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import { API_CONFIG, buildApiUrl } from '../../services/api.config';

// const UploadImage = ({ onUploadComplete, initialImage }) => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(initialImage || '');
//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);
//     const previewUrl = URL.createObjectURL(file);
//     setPreview(previewUrl);
//   };

//   const handleClickImage = () => {
//     fileInputRef.current.click();
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       const res = await axios.post(buildApiUrl(API_CONFIG.ENDPOINTS.IMAGES.UPLOAD), formData);
//       const imageUrl = res.data.imageUrl;
//       setPreview(imageUrl);
//       onUploadComplete(imageUrl);
//     } catch (err) {
//       console.error('Erreur upload:', err);
//     }
//   };

//   return (
//     <div className="text-center">
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleImageChange}
//         style={{ display: 'none' }}
//       />

//       <img
//         src={preview || '/default-profile.png'}
//         alt="preview"
//         width={100}
//         className="cursor-pointer rounded-full mx-auto"
//         onClick={handleClickImage}
//       />

//       {image && (
//         <button
//           onClick={handleUpload}
//           className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
//         >
//           Uploader
//         </button>
//       )}
//     </div>
//   );
// };

// export default UploadImage;


// aeey_client/src/composants/UploadImage/Upload.jsx
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { API_CONFIG, buildApiUrl } from '../../services/api.config';

const UploadImage = ({ onUploadComplete, initialImage }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialImage || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation simple
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image dépasse 5 Mo.");
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner un fichier image.");
      return;
    }

    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(
        buildApiUrl(API_CONFIG.ENDPOINTS.IMAGES.UPLOAD),
        formData
      );
      const imageUrl = res.data.imageUrl;
      setPreview(imageUrl);
      onUploadComplete(imageUrl);
      
    } catch (err) {
      console.error('Erreur lors de l\'upload :', err);
      alert("L'upload de l'image a échoué.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center">
      <label htmlFor="file-upload" className="sr-only">Choisir une image</label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      <img
        src={preview || '/default-profile.png'}
        alt={image ? `Prévisualisation : ${image.name}` : 'Image de profil par défaut'}
        width={50}
        height={50}
        className=" cursor-pointer rounded-full mx-auto shadow-md  hover:opacity-90 transition duration-200"
        onClick={handleClickImage}
      />

      {image && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Chargement...' : 'Ajouter'}
        </button>
      )}
    </div>
  );
};

export default UploadImage;
