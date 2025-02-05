import { useEffect } from 'react';
import style from '../Settings.module.css';

const UploadPhoto = ({ photo, setPhoto }) => {
  const handleChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  useEffect(() => {
    if (photo) {
      const objectURL = URL.createObjectURL(photo);
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    }
  }, [photo]);

  return (
    <>
      {photo ? (
        <img
          src={URL.createObjectURL(photo)}
          alt="Avatar користувача"
          className={style.avatar}
        />
      ) : (
        <svg

          fill="none"
          stroke="#2f2f2f"
          width="80px"
          height="80px"
        >
          <use href="/icons/icons-sprite.svg#user" />
        </svg>
      )}

      <label htmlFor="photo" className={style.labelPhoto}>
        <svg className={style.iconupload} width="16" height="16">
          <use href="/icons/icons-sprite.svg#arrow-up-tray" />
        </svg>
        Upload photo
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className={style.input}
          hidden
        />
      </label>
    </>
  );
};

export default UploadPhoto;
