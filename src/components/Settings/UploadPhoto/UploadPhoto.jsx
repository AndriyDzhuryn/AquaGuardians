import { useEffect, useState } from 'react';
import style from '../Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUserData } from '../../../redux/auth/selectors';
import { apiUpdateUserPhoto } from '../../../redux/auth/operations';

const UploadPhoto = () => {
  const userData = useSelector(selectAuthUserData);
  const dispatch = useDispatch();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (userData?.photo) {
      setPhotoUrl(userData.photo);
    }
  }, [userData?.photo]);

const handleChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    dispatch(apiUpdateUserPhoto(file));
    const objectURL = URL.createObjectURL(file); 
    setPhotoUrl(objectURL);
  }
};


  return (
    <>
      {photoUrl ? (
        <img src={photoUrl} alt="Avatar" className={style.avatar} />
      ) : (
        <svg fill="none" stroke="#2f2f2f" width="80px" height="80px">
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
