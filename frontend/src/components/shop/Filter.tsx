import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { filterByCategory } from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "../ui/checkbox";
   
interface CategorySheetProps {
     open: boolean;
     setOpen: (e: boolean) => void;
     filters: string[];
     handleFilter: (id: string) => void;
}

export function Filter({ open, setOpen, filters, handleFilter }: CategorySheetProps) {
     return (
          <>
          <Sheet open={open} onOpenChange={setOpen}>
               <SheetContent side="left" className="w-56">
               <SheetHeader>
                    <SheetTitle className="text-3xl font-bold text-gray-700 py-4 border-b mb-4">Filter</SheetTitle>
               </SheetHeader>
               <div className="flex justify-center">
                         <div className="flex flex-col gap-1">
                              {filterByCategory.map((category) => (
                                   <Label key={category.id} className="flex font-medium items-center gap-2 text-gray-800">
                                        <Checkbox
                                             checked={filters.includes(category.id)}
                                             onCheckedChange={() => handleFilter(category.id)} 
                                        />
                                        {category.label}
                                   </Label>
                              ))}
                         </div>
                    </div>
               </SheetContent>
          </Sheet>
          <aside className="bg-gray-50 border-r shadow-md p-4 pl-8 hidden lg:flex md:flex w-60 min-h-screen" >
               <div>
                    <div className="border-b">
                         <h1 className="text-3xl font-bold text-gray-700">Filters</h1>
                    </div>
                    <div>
                         <h3 className="text-base font-bold text-gray-700 py-2">Category</h3>
                         <div className="flex flex-col gap-1">
                              {filterByCategory.map((category) => (
                                   <Label key={category.id} className="flex font-medium items-center gap-2 text-gray-800">
                                        <Checkbox
                                             checked={filters.includes(category.id)}
                                             onCheckedChange={() => handleFilter(category.id)}
                                        />
                                        {category.label}
                                   </Label>
                              ))}
                         </div>
                    </div>
               </div>
          </aside>
          </>
     )
}