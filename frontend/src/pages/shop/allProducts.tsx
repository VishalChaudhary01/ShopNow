import { Filter } from "@/components/shop/Filter";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchFilterdProduct } from "@/store/shop/productSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlignLeft, ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function AllProduct() {
     const [searchParams] = useSearchParams();
     const [openFilter, setOpenFilter] = useState(false);
     const dispatch = useAppDispatch();
     const [sort, setSort] = useState("");
     const [filters, setFilters] = useState<string[]>([]);
     const { productList, loading } = useAppSelector((state) => state.shopProducts);
     const category = searchParams.get("category")

     useEffect(() => {
          if (category) {
               sessionStorage.clear();
               const newFilter = [category];
               setFilters(newFilter);
          }
          console.log(filters);
          sessionStorage.setItem("filters", JSON.stringify(filters));
     }, [category])
     console.log(filters);

     useEffect(() => {
          dispatch(fetchFilterdProduct({ filterParams: filters, sortParams: sort }));
     }, [dispatch, filters, sort]);

     useEffect(() => {
          const storedFilters = sessionStorage.getItem("filters");
          if (!filters && storedFilters) {
               setFilters(JSON.parse(storedFilters));
          }
     }, [])

     function handleSort(value: string) {
          setSort(value);
     }

     function handleFilter(getCategoryId: string) {
          if (Array.isArray(filters) && filters.includes(getCategoryId)) {
               setFilters(filters.filter((id) => id !== getCategoryId));
          } else {
               setFilters([...filters, getCategoryId]);
          }
          sessionStorage.setItem("filters", JSON.stringify(filters));
     }

     if (loading) return <div className="min-h-screen flex flex-col justify-center items-center text-2xl">Loading...</div>

     return (
          <div className="min-h-screen flex gap-4 bg-gray-50">
               <Filter filters={filters} handleFilter={handleFilter} open={openFilter} setOpen={setOpenFilter} />
               <div className="w-full">
                    <div className="p-4 border-b shadow-sm flex items-center justify-between">
                         <div className="lg:flex md:flex text-lg font-bold hidden text-gray-700">All Products</div>
                         <div className="sm:hidden">
                              <Button>
                                   <AlignLeft onClick={() => setOpenFilter(true)}/>
                              </Button>
                              </div>
                         <div className="flex items-center gap-3">
                              <span className="text-gray-700">
                                   {productList.length} Products
                              </span>
                              <DropdownMenu >
                                   <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                                             <ArrowUpDownIcon className="h-4 w-4" />
                                             <span>Sort by</span>
                                        </Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent className="w-[200px]">
                                        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                             {sortOptions.map((sortItem) => (
                                                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                                       <span className="text-sm font-medium text-gray-800">{sortItem.label}</span>
                                                  </DropdownMenuRadioItem>
                                             ))}
                                        </DropdownMenuRadioGroup>
                                   </DropdownMenuContent>
                              </DropdownMenu>
                         </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                         {productList?.map((product) => (
                              <ProductCard key={product._id} product={product} />
                         ))}
                    </div>
               </div>
          </div>
     )
}