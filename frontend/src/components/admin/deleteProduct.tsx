import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteProduct } from "@/store/admin/productSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";

interface DeleteProductProps {
     id: string;
     open: boolean;
     setOpen: (e: boolean) => void;
}
export function DeleteProduct({ open, setOpen, id }: DeleteProductProps) {
     const dispatch = useAppDispatch();

     async function handleDelete() {
          try {
                const response = await dispatch(deleteProduct(id))
                toast.success(response.payload.message);
                setOpen(false);
          } catch (e: any) {
               console.error(e);
               toast.error("Something went wrong")
          }
     }
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent aria-describedby="null" className="w-96">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="text-2xl my-4">Confirm delete this Product</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} className="w-80">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
