import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SingleProductProps {
     openProduct: boolean;
     setOpenProduct: (e: boolean) => void;
     product: ProductType
}

export function SingleProduct({ product, openProduct, setOpenProduct }: SingleProductProps) {
  return (
    <Dialog open={openProduct} onOpenChange={() => setOpenProduct(false)}>
     <DialogContent className="flex flex-col justify-center items-center text-gray-500">
          <div className="flex justify-start gap-10">
               {product.image && (
                    <img src={product.image} alt="Product image" width={150} height={150} />
               )}
               <div className="flex flex-col gap-2">
                    <DialogTitle>{product.title}</DialogTitle>
                    <DialogTitle>Brand: <span className="text-sm text-gray-800">{product.brand}</span></DialogTitle>
                    <DialogTitle>Price: <span className="text-sm text-gray-800">Rs.{product.price}</span></DialogTitle>
                    <DialogTitle>SalePrice: <span className="text-sm text-gray-800">Rs.{product.salePrice}</span></DialogTitle>
                    <DialogTitle>Category: <span className="text-sm text-gray-800">{product.category}</span></DialogTitle>
                    <DialogTitle>Total Stock: <span className="text-sm text-gray-800">{product.totalStock}</span></DialogTitle>
               </div>
          </div>
     <DialogTitle>{product.description}</DialogTitle>
     </DialogContent>
    </Dialog>
  );
}
