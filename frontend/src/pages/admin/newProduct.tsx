import React, { useState } from "react";
import { SelectCategory } from "@/components/admin/SelectCategory";
import { TextArea } from "@/components/admin/TextArea";
import { LabelledInput } from "@/components/common/LabelledInput";
import { Button } from "@/components/ui/button";
import { UploadImage } from "@/components/admin/UploadImage";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/admin/productSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { categories } from "@/components/common/productCategory";

export const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [inputs, setInputs] = useState<AddProductForm>({
    image: "",
    title: "",
    brand: "",
    price: 0,
    totalStock: 0,
    description: "",
    salePrice: 0,
    category: categories[0],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as HTMLInputElement;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "price" || name === "totalStock" || name === "salePrice"
        ? Number(value)
        : files && files[0] ? files[0] : value
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputs.title || !inputs.salePrice || !inputs.totalStock || !inputs.price || !inputs.brand || !inputs.category || !inputs.description) {
      return toast.error("All fields are required");
    }
    const response = await dispatch(addProduct({ ...inputs, image: uploadedImageUrl}))
    if (response.payload.success) {
      toast.success(`${response.payload.message}`);
      navigate("/admin/products");
    } else {
      toast.error("Somethimg went wrong");
      console.error("Error: ", response);
    }
  }

  return (
    <div className="py-2">
      <div className="flex justify-center items-center bg-gray-800 w-full rounded-md">
        <div className="py-4 text-xl font-bold text-white">Sell new Product</div>
      </div>
      <UploadImage
        imageFile={imageFile}
        setImageFile={setImageFile}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
      />
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-sm mx-auto py-4">
        <LabelledInput onChange={handleChange} value={inputs.title} name="title" label="Product Name" type="text"/>
        <LabelledInput onChange={handleChange} value={inputs.brand} name="brand" label="Brand" type="text" />
        <LabelledInput onChange={handleChange} value={inputs.price} name="price" label="Price" type="number" />
        <LabelledInput onChange={handleChange} value={inputs.salePrice} name="salePrice" label="Sale Price" type="number" />
        <LabelledInput onChange={handleChange} value={inputs.totalStock} name="totalStock" label="Total Stock" type="number" />
        <SelectCategory onChange={handleChange} value={inputs.category} name="category" label="Category"/>
        <TextArea onChange={handleChange} value={inputs.description} label="Description" name="description" rows={4}/>
        <Button name="Sell Product" type="submit">Sell Product</Button>
      </form>
    </div>
  );
};
