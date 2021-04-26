import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadErrorAction, unloadErrorAction } from '../../actions';

export const Upload = () => {
  const [previewSource, setPreviewSource] = useState();
  const [image, setImage] = useState();
  const { isError, errorMessage } = useSelector(state => state.error.upload);
  const dispatch = useDispatch();

  const handleFileInputChange = event => {
    const file = event.target.files[0];
    setImage(file);
    dispatch(unloadErrorAction());
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }
  
  const uploadImage = async formData => {
    await fetch(
      `${process.env.REACT_APP_CLOUDINARY_UPLOAD_IMAGE_URL}`,
      {
        method: 'POST',
        body: formData,
      }
    )
    .then(response => {
      if (response.status !== 200) {
        throw response.statusText;
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.secure_url);
    })
    .catch(error => {
      console.log(error);
      dispatch(loadErrorAction({ type: 'upload', message: error}));
    });
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_IMAGE_PRESET}`);
    uploadImage(formData);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleFileInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {isError && (<div>{errorMessage}</div>)}
      {previewSource && (<img src={previewSource} alt="upload" style={{height: '450px'}} />)}
    </div>
  )
}