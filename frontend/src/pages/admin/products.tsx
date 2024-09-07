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
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const dispatch = useAppDispatch();
    const { productList, loading } = useAppSelector((state) => state.adminProducts);

    useEffect(() => {
          dispatch(getAllProducts());
    }, []);

    if (loading) return <div>Loading....</div>

    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-center items-center text-3xl text-gray-700 font-bold pb-4">
          Your All Products are here!
        </div>
        {/* {loading && <Loader />} */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-200">
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SalePrice</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product) => {
                return (
                      <TableRow key={num++} className="font-medium text-gray-600">
                          <TableCell>{num++}</TableCell>
                          <TableCell onClick={() => setOpenProduct(true)} className="cursor-pointer hover:text-blue-500 hover:underline">{product.title}</TableCell>
                          {openProduct && 
                            <SingleProduct product={product} openProduct={openProduct} setOpenProduct={setOpenProduct} />
                          }
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.salePrice}</TableCell>
                          <TableCell><Link to={`/admin/products/update/${product._id}`} className="hover:text-green-500"><SquarePen /></Link></TableCell>
                          <TableCell onClick={() => setOpenDeleteDialog(true)} className="cursor-pointer"><Trash2 /></TableCell>
                          {openDeleteDialog && 
                            <DeleteProduct open={openDeleteDialog} setOpen={setOpenDeleteDialog} id={product._id}/>
                          }
                      </TableRow>
                  )
            })}
          </TableBody>
        </Table>
      </div>
    );
}
