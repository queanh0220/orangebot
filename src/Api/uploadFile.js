import axios from "axios";

export const uploadFile = async (file, oldFile) => {
    const formData = new FormData();
    formData.append("file", file);
    if(oldFile) {
      await axios.delete(process.env.REACT_APP_API_URL + "upload/"+oldFile.split('/').pop())
    }
  return axios.post(process.env.REACT_APP_API_URL + "upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
