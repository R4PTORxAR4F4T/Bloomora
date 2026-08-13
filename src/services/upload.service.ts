import axios from "@/src/lib/axios";
import { ProductImage } from "@/src/types/product";

class UploadService {
  async uploadImages(
    files: File[]
  ): Promise<ProductImage[]> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await axios.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data.data as ProductImage[];
  }

  async deleteImage(
    publicId: string
  ) {
    const response = await axios.delete(
      "/upload",
      {
        data: {
          publicId,
        },
      }
    );

    return response.data;
  }
}

export default new UploadService();