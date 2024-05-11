export const uploadToCloudinary = async (
  fileUrl,
  fileName,
  fileType,
  axios,
  RNToast,
  Toast,
  setUploadedImageData,
) => {
  const cloudName = 'cloudinary-viper-dev';
  const uploadPreset = 'thrifty_upload';

  const data = new FormData();
  data.append('file', {
    uri: fileUrl,
    type: fileType,
    name: fileName,
  });
  data.append('upload_preset', uploadPreset);

  console.log('dataaa', data);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        onUploadProgress: progressEvent => {
          const progressReport = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );

          console.log('Upload progress:', progressReport);
        },
      },
    );

    console.log('Cloudinary upload response:', response.data);

    // Handle the result as needed (e.g., display the uploaded image)
    if (response?.data?.secure_url) {
      // Alert.alert('Image uploaded successfully!');
      RNToast(Toast, 'Image Uploaded successfully');
      // Display the uploaded image
      setUploadedImageData(response?.data);
    } else {
      console.log('failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    RNToast(Toast, 'Error uploading image');
  }
};
