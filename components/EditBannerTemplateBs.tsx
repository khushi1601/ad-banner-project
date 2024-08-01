import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/EditBannerTemplateBs.module.css';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

interface EditBannerProps {
  banner: Banner;
  onSave: (updatedBanner: Banner) => void;
  onClose: () => void;
}

const EditBannerTemplateBs: React.FC<EditBannerProps> = ({
  banner,
  onSave,
  onClose,
}) => {
  const [editedBanner, setEditedBanner] = useState(banner);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedBanner((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedBanner);
  };

  const handleDownload = () => {
    // Implement download functionality here
    console.log('Downloading banner...');
  };

  const handleImageRemove = () => {
    setEditedBanner((prev) => ({ ...prev, image: '' }));
  };

  return (
    <div className={styles.fullScreenOverlay}>
      <div className={styles.editContainer}>
        <h2>Edit Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.currentImagePreview}>
            {editedBanner.image && (
              <>
                <Image 
                  src={editedBanner.image} 
                  alt="Current Banner" 
                  width={200} 
                  height={200} 
                  objectFit="cover"
                />
                <button 
                  type="button" 
                  onClick={handleImageRemove} 
                  className={styles.imageRemoveButton}
                >
                  &times;
                </button>
              </>
            )}
          </div>
          <div className={styles.imageUpload}>
            <button type="button" onClick={handleUploadClick} className={styles.uploadButton}>
              Upload New Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={editedBanner.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={editedBanner.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.doneButton}>Done</button>
            <button type="button" onClick={handleDownload} className={styles.downloadButton}>Download</button>
          </div>
        </form>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

export default EditBannerTemplateBs;
