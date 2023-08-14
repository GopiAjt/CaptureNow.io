let data = JSON.parse(localStorage.getItem('data'));

document.addEventListener('DOMContentLoaded', () => {

  const populateProfileData = (data) => {
    // document.getElementById('profileImage').src = data.profilePhoto;
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('name').value = data.name;
    document.getElementById('phoneNumber').value = data.phoneNumber;
    document.getElementById('serviceLocation').value = data.serviceLocation;
    document.getElementById('languagesKnown').value = data.languages;
    document.getElementById('services').value = data.services;
    document.getElementById('description').value = data.aboutMe;
    document.getElementById('experience').value = data.experience;
    let img = document.getElementById('profileImage');
    let navimg = document.getElementById('nav-img');
    if (data.profilePhoto == null) {
      img.src = '/images/profile.jpg';
      navimg = '/images/profile.jpg';
    }
    else {
      img.src = 'data:image/jpeg;base64,' + data.profilePhoto;
      navimg.src = 'data:image/jpeg;base64,' + data.profilePhoto;
    }
  };
  // Now you can use the data variable here
  console.log(data);
  populateProfileData(data);
});
async function convertBlobToBase64(blobURL) {
  const response = await fetch(blobURL);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const base64String = result.split(",")[1]; // Extracting only the base64 part
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
const change = document.getElementById('Uplode-photo');

async function changePhoto() {
  console.log('uploading');

  const compressedBase64 = await compressImage(cropper.getCroppedImageSrc(), 600, 600, 0.8);
  const photographerEmail = data.email;
  const token = data.authToken;

  const formData = new FormData();
  formData.append('email', photographerEmail);

  const blob = dataURLtoBlob(compressedBase64);
  formData.append('image', blob, 'image.jpg'); // Make sure to use 'image' as the field name

  try {
    const response = await fetch('http://localhost:8080/photographer/changePhoto', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log('Image uploaded successfully');
      const byteArray = await response.arrayBuffer();
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const imageURL = URL.createObjectURL(blob);
      // Use the imageURL to display the image
      const base64Image = await convertBlobToBase64(imageURL);
      data.profilePhoto = base64Image;
      localStorage.setItem('data', JSON.stringify(data));

      window.location.href = 'settings.html';
    } else {
      console.error('Error:', response.status);
      // Handle error response here
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle other errors here
  }
}

change.addEventListener('click', changePhoto);

function compressImage(base64Image, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // When the image loads, continue with the compression process
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate the new dimensions based on maxWidth and maxHeight
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > maxWidth) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas content back to base64 with the desired quality
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

      resolve(compressedBase64);
    };

    // Handle image loading errors
    img.onerror = () => {
      reject(new Error('Image loading failed.'));
    };

    img.src = base64Image;
  });
}
function base64ToImage(base64Data) {
  const imageElement = document.createElement('img');
  imageElement.src = base64Data;
  return imageElement;
}

function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
