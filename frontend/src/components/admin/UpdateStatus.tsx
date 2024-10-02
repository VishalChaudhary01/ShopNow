import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { updateStatus } from "@/store/admin/orderSlice";
import { toast } from "sonner";

interface UpdateStatusProps {
     orderId: string;
     open: boolean;
     status: string;
     setStatus: (e: string) => void;
     setOpen: (e: boolean) => void;
}

export function UpdateStatus({ open, setOpen, orderId, status, setStatus }: UpdateStatusProps) {
     const dispatch = useAppDispatch();
     
     async function handleupdate() {
          console.log(orderId, status);
          const response = await dispatch(updateStatus({ status: status, id: orderId }));
          if (response.payload.success) {
               toast.success("Order status updated");
          } else {
               toast.error("Something went wrong");
          }
          setOpen(false);
     }
     return (
          <Dialog open={open} onOpenChange={() => setOpen(false)}>
               <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
                    <DialogHeader>
                         <DialogTitle className="text-xl font-bold text-gray-800">Update Status of order</DialogTitle>
                    </DialogHeader>
                    <div className="border border-gray-800 w-2/3">
                         <select 
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              name="status" id="status" className="w-full px-2 py-1"
                              >
                              {statusOption.map((option) => (
                                   <option value={option} selected={option === status}>{option}</option>
                              ))}
                         </select>
                    </div>
                    <DialogFooter>
                         <Button onClick={handleupdate} type="submit">Save changes</Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}

const statusOption = [
     "On the way",
     "Delivered",
     "Cancel"
]