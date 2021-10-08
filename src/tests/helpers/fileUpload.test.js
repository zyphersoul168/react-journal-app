import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "deyulkman",
  api_key: "765114949339429",
  api_secret: "Ah5O7H_AR0RU_5mjKeAP5FW5uEk",
  secure: true,
});

describe("Tests on fileUpload helper", () => {
  test("should upload a file and return an url", async () => {
    const response = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await response.blob();
    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // delete img by id
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");

    await cloudinary.v2.api.delete_resources(imageId, {}, () => {
      // console.log("imagen borrada");
    });
  });

  test("should return an error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
