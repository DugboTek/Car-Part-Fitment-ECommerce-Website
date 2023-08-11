export function convertLink(oldLink) {
  // https://cptm.blob.core.windows.net/cptm-images/image%20missing.jpg
  try {
    if (oldLink && oldLink.trim() !== "") {
      const imageName = oldLink.split("/").pop();
      const newBase = "https://cptm.blob.core.windows.net/cptm-images/";
      return newBase + imageName;
    } else {
      // Handle the case where oldLink is null or an empty string
      return "https://cptm.blob.core.windows.net/cptm-images/image_1226.jpg"; // Replace "defaultImageUrl" with the desired default image URL
    }
  } catch (error) {
    console.error("Error converting link:", error);
    return "https://cptm.blob.core.windows.net/cptm-images/image_1226.jpg"; // Replace "defaultImageUrl" with the desired default image URL
  }
}
