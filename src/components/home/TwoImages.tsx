import { useState } from "react";

export const TwoImages = () => {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Subir imagen 1 */}
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={(e) => handleImageChange(e, setImage1)}
          className="mb-4"
        />
        {image1 && (
          <img
            src={image1}
            alt="Imagen 1"
            className="max-w-[400px] max-h-[400px] w-full object-cover rounded"
          />
        )}
      </div>

      {/* Subir imagen 2 */}
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={(e) => handleImageChange(e, setImage2)}
          className="mb-4"
        />
        {image2 && (
          <img
            src={image2}
            alt="Imagen 2"
            className="max-w-[400px] max-h-[400px] w-full object-cover rounded"
          />
        )}
      </div>
    </div>
  );
};
