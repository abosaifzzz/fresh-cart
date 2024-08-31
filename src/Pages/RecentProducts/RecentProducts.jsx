import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";

export default function AllProducts() {
  let { addProductToCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
    staleTime: 0,
    gcTime: 4000,
    select: (data) => data.data.data,
  });

  console.log(data);
  console.log(isLoading);
  console.log(error);

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    console.log(response);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
    }
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ToastContainer />

      <div className="m-4">
        <input
          type="text"
          placeholder="Search For Product ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {!isLoading ? (
        <div className="row">
          {filteredProducts.map((product, indx) => {
            return (
              <div
                key={indx}
                className="main w-full sm:w-1/3 md:w-1/4 lg:w-1/6 p-4"
              >
                <div className="product">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="block font-light text-green-600">
                      {product.category.name}
                    </span>
                    <h3 className="mt-2 text-lg font-normal text-gray-600 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">
                        {product.price} EGP
                      </span>
                      <span>
                        <i className="fa-solid fa-star text-[#FFD43B]"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    disabled={currentProductId === product.id && loading}
                    className="btn disabled:bg-gray-400"
                    onClick={() => addProduct(product.id)}
                  >
                    {currentProductId === product.id && loading ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )}
    </>
  );
}
