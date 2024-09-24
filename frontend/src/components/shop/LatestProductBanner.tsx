import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFilterdProduct } from "@/store/shop/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import cat_1 from "../../assets/cat_1.jpg";

export const LatestProductBanner = () => {
  const dispatch = useAppDispatch();
  const { productList, loading } = useAppSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchFilterdProduct({ filterParams: [], sortParams: "" }));
  }, []);

  if (loading) return <div className="flex flex-col justify-center items-center">Loading...</div>

  return (
    <div className="px-4 py-5">
      <div className="border px-4 bg-white w-full h-auto shadow-md py-6">
        <div className="text-2xl font-bold py-2 text-gray-800">
          Latest Products
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 overflow-hidden">
          {[...productList]?.reverse().slice(0, 4).map((product) => (
            <Link to={`/shop/product/${product._id}`} key={product._id}>
              <div className="flex flex-col items-center justify-between border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-200 ease-in-out w-full h-full">
                <img
                  src={`${product.image}`}
                  className="w-32 h-44 lg:w-36 lg:h-48 object-cover mb-4"
                  alt={product.title}
                />
                <div className="text-center">
                  <div className="font-medium text-gray-700 truncate">
                    {product.title}
                  </div>
                  <div className="font-semibold text-gray-900">
                    Rs. {(product.price).toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Link to="/shop/products">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <img src={cat_1} className="w-32 h-32" alt="more" />
              <div className="text-lg font-medium text-gray-700">See More</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
