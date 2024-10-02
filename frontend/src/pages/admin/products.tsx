import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllProducts } from "@/store/admin/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteProduct } from "../../components/admin/deleteProduct";
import { SingleProduct } from "../../components/admin/singleProduct";

export function AdminProducts() {
    let num = 1;
    const [openProduct, setOpenProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState<string>("");
    const dispatch = useAppDispatch();
    const { productList, loading } = useAppSelector((state) => state.adminProducts);

    useEffect(() => {
          dispatch(getAllProducts());
    }, [openDeleteDialog]);

    if (loading) return <div>Loading....</div>
    
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-center items-center bg-gray-800 w-full rounded-md mb-4">
          <div className="py-4 text-xl font-bold text-white">Your all products are here!</div>
        </div>
        <Table>
          <TableHeader className="">
            <TableRow className="bg-gray-800 hover:bg-gray-800">
              <TableHead className="w-[100px] text-white">No.</TableHead>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Brand</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">SalePrice</TableHead>
              <TableHead className="text-white">Edit</TableHead>
              <TableHead className="text-white">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.slice().reverse().map((product) => {
                return (
                      <TableRow key={product._id} className="font-medium text-gray-600">
                          <TableCell>{num++}</TableCell>
                          <TableCell onClick={() => {
                            setSelectedProduct(product)
                            setOpenProduct(true)
                          }} className="cursor-pointer hover:text-blue-500 hover:underline">{product.title}</TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.salePrice}</TableCell>
                          <TableCell><Link to={`/admin/products/update/${product._id}`} className="hover:text-green-500"><SquarePen /></Link></TableCell>
                          <TableCell onClick={() => {
                            setSelectedDelete(product._id);
                            setOpenDeleteDialog(true)
                          }} className="cursor-pointer hover:text-red-500"><Trash2 /></TableCell>
                          
                          {selectedDelete && (
                          <DeleteProduct open={openDeleteDialog} setOpen={setOpenDeleteDialog} id={selectedDelete} />
                          )}
                          
                          {selectedProduct && (
                            <SingleProduct product={selectedProduct} openProduct={openProduct} setOpenProduct={setOpenProduct} />
                          )}
                      </TableRow>
                  )
            })}
          </TableBody>
        </Table>
      </div>
    );
}
