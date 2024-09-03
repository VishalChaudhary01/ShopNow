// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { LabelledInput } from "../components/LabelledInput";
// import { categories } from "../app/categories";
// import { SelectImage } from "../components/SelectImage";
// import { SelectCategory } from "../components/SelectCategory";
// import { TextArea } from "../components/TextArea";
// import { Button } from "../components/Button";


// export const NewProduct = () => {

//   const [inputs, setInputs] = useState({
//     name: "",
//     brand: "",
//     price: "",
//     countInStock: "",
//     description: "",
//     image: "" as string | File,
//     category: categories[0],
//   });


//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
//     const { name, value, files } = e.target as HTMLInputElement;
//     setInputs((prev) => ({
//       ...prev,
//       [name]: name === "countInStock" || name === "price" 
//         ? Number(value)
//         : files && files[0] ? files[0] : value
//     }));
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//      }

//   return (
//     <div className="py-6">
//       <div className="flex justify-center text-3xl text-gray-700 font-bold pb-4">
//         Sell new Product
//       </div>
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-sm mx-auto py-4">
//         <LabelledInput onChange={handleChange} value={inputs.name} name="name" label="Product Name" type="text"/>
//         <LabelledInput onChange={handleChange} value={inputs.brand} name="brand" label="Brand" type="text" />
//         <LabelledInput onChange={handleChange} value={inputs.price} name="price" label="Price" type="number" />
//         <LabelledInput onChange={handleChange} value={inputs.countInStock} name="countInStock" label="Count In Stock" type="number" />
//         <SelectImage onChange={handleChange} label="Select Image" name="image" />
//         <SelectCategory onChange={handleChange} value={inputs.category} name="category" label="Category"/>
//         <TextArea onChange={handleChange} value={inputs.description} label="Description" name="description" rows={4}/>
//         <Button name="Sell Product" type="submit"/>
//       </form>
//     </div>
//   );
// };


export function NewProduct() {
     return (
          <div>
               new product
          </div>
     )
}