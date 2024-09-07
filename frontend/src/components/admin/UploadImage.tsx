import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import axios from "../../axios";

interface UploadImageProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imageLoadingState: boolean;
  setImageLoadingState: (state: boolean) => void;
  setUploadedImageUrl: (url: string) => void;
}

export function UploadImage({
  imageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  setUploadedImageUrl,
}: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleImageFileChage(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    console.log(droppedFile);
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    if (imageFile) {
      data.append("my_file", imageFile);
    }
    try {
      const response = await axios.post("/api/admin/products/upload-image", 
        data
      );
      if (response.data.success) {
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false);
      }
      console.log(response.data);
    } catch (e: any) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-96 mt-4 mx-auto">
      <label className="text-md font-semibold mb-2 block text-gray-700">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4`}
      >
        <input
          ref={inputRef}
          type="file"
          name="image"
          id="image"
          onChange={handleImageFileChage}
          className="hidden"
        />
        {!imageFile ? (
          <label
               htmlFor="image"
               className={`flex flex-col items-center justify-center h-24 cursor-pointer`}
          >
            <UploadIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload image</span>
          </label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
