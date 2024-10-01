import React, { useEffect, useState } from "react";
import { SelectCategory } from "@/components/admin/SelectCategory";
import { TextArea } from "@/components/admin/TextArea";
import { LabelledInput } from "@/components/common/LabelledInput";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSingleProduct, updateProduct } from "@/store/admin/productSlice";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.adminProducts);
  const [inputs, setInputs] = useState<UpdateProductForm>({
    title: '',
    description: '',
    brand: '',
    price: 0,
    salePrice: 0,
    totalStock: 0,
    category: '',
    image: '',
  });


  useEffect(() => {
    const id = params.id;
    if (id) {
      dispatch(getSingleProduct(id))
    }
  }, []);

  useEffect(() => {
    if (product) {
      setInputs({
        title: product.title || '',
        description: product.description || '',
        brand: product.brand || '',
        price: product.price || 0,
        salePrice: product.salePrice || 0,
        totalStock: product.totalStock || 0,
        category: product.category || '',
        image: product.image || '',
      });
    }
  }, [product]);

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
    if (product) {
      const response = await dispatch(updateProduct({id: product._id, formData: inputs}))
      if (response.payload.success) {
        toast.success(`${response.payload.message}`);
        navigate("/admin/products");
      } else {
        toast.error("Somethimg went wrong");
        console.error("Error: ", response);
      }
    }
  }

  return (
    <div className="py-2">
      <div className="flex justify-center items-center bg-gray-800 w-full rounded-md">
        <div className="py-4 text-xl font-bold text-white">Update Product</div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-sm mx-auto py-4">
        <LabelledInput onChange={handleChange} value={inputs.title} name="title" label="Product Name" type="text"/>
        <LabelledInput onChange={handleChange} value={inputs.brand} name="brand" label="Brand" type="text" />
        <LabelledInput onChange={handleChange} value={inputs.price} name="price" label="Price" type="number" />
        <LabelledInput onChange={handleChange} value={inputs.salePrice} name="salePrice" label="Sale Price" type="number" />
        <LabelledInput onChange={handleChange} value={inputs.totalStock} name="totalStock" label="Total Stock" type="number" />
        <SelectCategory onChange={handleChange} value={inputs.category} name="category" label="Category"/>
        <TextArea onChange={handleChange} value={inputs.description} label="Description" name="description" rows={4}/>
        <Button name="Sell Product" type="submit">Update</Button>
      </form>
    </div>
  );
};
