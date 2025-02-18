import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAuthIsLoadingPhoto,
  selectAuthUserData,
} from '../../../redux/auth/selectors.js';
import { apiUpdateUserPhoto } from '../../../redux/auth/operations.js';

import style from '../Settings.module.css';

const UploadPhoto = () => {
  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoadingPhoto);
  const dispatch = useDispatch();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (userData?.photo) {
      setPhotoUrl(userData.photo);
    }
  }, [userData?.photo]);

  const handleChange = e => {
    const file = e.target.files[0];
    if (file) {
      dispatch(apiUpdateUserPhoto(file));
      const objectURL = URL.createObjectURL(file);
      setPhotoUrl(objectURL);
    }
  };

  if (isLoading) {
    return (
      <div className={style.loaderPhotoWrapper}>
        <Circles
          height="80"
          width="80"
          color="#5353ec"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

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
