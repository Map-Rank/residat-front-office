import { useToast } from 'vue-toastification';

const toast = useToast();

export async function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type, lastModified: Date.now() }));
          } else {
            reject(new Error('Image compression failed.'));
          }
        }, file.type, quality);
      };
      img.onerror = () => reject(new Error('Image loading failed.'));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error('File reading failed.'));
    reader.readAsDataURL(file);
  });
}

export function validateFile(file, maxFileSizeMB = 1, acceptedTypes = [
  'application/pdf',
  'application/msword',
  'text/plain',
  'image/jpeg',
  'image/png'
]) {
  const maxFileSize = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
  return file.size <= maxFileSize && acceptedTypes.includes(file.type);
}

export async function handleSingleFileUpload(event, maxFileSizeMB = 2, acceptedTypes = [
  'image/jpeg',
  'image/png'
], compress = false) {
  const file = event.target.files[0];
  let processedFile = file;

  if (compress && ['image/jpeg', 'image/png'].includes(file.type)) {
    try {
      processedFile = await compressImage(file);
    } catch (error) {
      toast.error(`${file.name} compression failed: ${error.message}`);
      throw new Error(`${file.name} compression failed: ${error.message}`);
    }

    if (processedFile.size > maxFileSizeMB * 1024 * 1024) {
      toast.error(`${file.name} exceeds the size limit after compression`);
      throw new Error(`${file.name} exceeds the size limit after compression`);
    }
  }

  if (!validateFile(processedFile, maxFileSizeMB, acceptedTypes)) {
    toast.error(`${processedFile.name} exceeds the size limit or is not a supported format`);
    throw new Error(`${processedFile.name} exceeds the size limit or is not a supported format`);
  }

  return processedFile;
}

export async function handleMultipleFileUpload(event, maxFileSizeMB = 1, acceptedTypes = [
  'application/pdf',
  'application/msword',
  'text/plain',
  'image/jpeg',
  'image/png'
], compress = false) {
  const files = Array.from(event.target.files);
  const processedFiles = [];

  for (const file of files) {
    let processedFile = file;
    if (compress && ['image/jpeg', 'image/png'].includes(file.type)) {
      try {
        processedFile = await compressImage(file);
      } catch (error) {
        toast.error(`${file.name} compression failed: ${error.message}`);
        console.error(`${file.name} compression failed: ${error.message}`);
        continue;
      }

      if (processedFile.size > maxFileSizeMB * 1024 * 1024) {
        toast.error(`${file.name} exceeds the size limit after compression`);
        continue;
      }
    }

    if (validateFile(processedFile, maxFileSizeMB, acceptedTypes)) {
      processedFiles.push(processedFile);
    } else {
      toast.error(`${processedFile.name} exceeds the size limit or is not a supported format`);
      console.error(`${processedFile.name} exceeds the size limit or is not a supported format`);
    }
  }

  return processedFiles;
}
