import { useState } from "react";
import styles from "./upload.module.css";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900"
  );

  function validateForm() {
    const nextErrors = {};
    if (title.trim().length < 4) nextErrors.title = "Title must be at least 4 characters.";
    if (description.trim().length < 12) {
      nextErrors.description = "Description must be at least 12 characters.";
    }
    if (!thumbnailUrl.trim() && !thumbnailFile) {
      nextErrors.thumbnail = "Provide a thumbnail URL or upload an image.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, thumbnail: "Only image files are allowed." }));
      return;
    }
    setThumbnailFile(file);
    setThumbnailUrl("");
    setPreviewImage(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, thumbnail: "" }));
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;
    setMessage("Upload draft saved. You can connect this form to backend anytime.");
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Upload Video</h2>
        <p>Create an eye-catching post before publishing it.</p>

        <label>
          Video title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </label>

        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <span className={styles.errorText}>{errors.description}</span>}
        </label>

        <label>
          Thumbnail URL
          <input
            value={thumbnailUrl}
            onChange={(e) => {
              const value = e.target.value;
              setThumbnailUrl(value);
              setThumbnailFile(null);
              setPreviewImage(
                value || "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900"
              );
            }}
          />
        </label>

        <div
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <p>Drag & drop image here or choose a file</p>
          <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
        {errors.thumbnail && <span className={styles.errorText}>{errors.thumbnail}</span>}

        <button type="submit">Save Draft</button>
        {message && <p className={styles.successText}>{message}</p>}
      </form>

      <div className={styles.previewCard}>
        <p className={styles.previewLabel}>Live Preview</p>
        <img src={previewImage} alt="Thumbnail preview" />
        <h3>{title || "Your title will appear here"}</h3>
        <p>{description || "Write a detailed description to improve reach and engagement."}</p>
      </div>
    </div>
  );
}

export default Upload;
