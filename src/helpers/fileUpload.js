export const fileUpload = async (file) => {
  // return image url
  const cloudUrl = "https://api.cloudinary.com/v1_1/deyulkman/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      return null;
    }

  } catch (error) {
    throw error;
  }
}