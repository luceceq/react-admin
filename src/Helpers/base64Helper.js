// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript/36281449

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      resolve(reader.result)
    }, false);

    reader.addEventListener("load", () => {
      reject(reader.error)
    }, false);
  });
};
