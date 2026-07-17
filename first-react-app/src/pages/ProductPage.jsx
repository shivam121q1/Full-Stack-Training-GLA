import { useEffect, useState } from "react"
import ProductCard from "../components/product-page-component/ProductCard";
import "./ProductPage.css"
import ProductCardSkeleton from "../components/product-page-component/ProductCardSkeleton";

const ProdutPage = () => {
    //fetch the data form the api
    //store in state using useState
    //use karlege using map functon 

    //state -> to  store product data 

    const [products, setProducts] = useState([]);

    async function fetchProduct() {

        console.log("API CALL")
        const response = await fetch("https://fakestoreapi.com/products");
        console.log("Response", response)
        const data = await response.json();
        console.log("Data", data);
        setProducts(data);

    }

    function topRatedProdct() {
        const topRatedProducts = products.filter((product, i) => product.rating.rate >= 4);
        setProducts(topRatedProducts);
    }

    useEffect(() => {
        console.log("Component render")
        fetchProduct();
        console.log("API Call Completed")
    }, []);

    if (products.length === 0) {
        return (
            <div>
                <h2>Product Listing</h2>

                <p>Loading</p>

            </div>
        )
    }
    return (
        <div>
            <div className="product-header">
                <h2>Product Listing</h2>
                <button onClick={topRatedProdct} className="top-rated-btn">Top Rated Products</button>
            </div>

            <div className="product-grid">
                {products.map((item, i) => {
                    return (
                        <ProductCard key={i} product={item} visible={false} />
                    )
                })}
            </div>

        </div>
    )
}

export default ProdutPage;