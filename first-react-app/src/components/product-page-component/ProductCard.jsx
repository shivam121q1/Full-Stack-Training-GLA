import "./ProductCard.css";

const ProductCard = ({ product, visible }) => {
    return (
        <div className="product-card">
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>

            <div className="product-content">
                <div className="rating">
                    ⭐ {product.rating.rate}
                    <span>| {product.rating.count}</span>
                </div>

                <h3 className="category">{product.category}</h3>

                <h2 className="title">
                    {product.title.length > 35
                        ? product.title.substring(0, 35) + "..."
                        : product.title}
                </h2>

                <div className="price">
                    <span className="current">${product.price}</span>
                    <span className="old">
                        ${(product.price * 1.5).toFixed(2)}
                    </span>
                    <span className="discount">
                        (
                        {Math.round(
                            ((product.price * 1.5 - product.price) /
                                (product.price * 1.5)) *
                            100
                        )}
                        % OFF)
                    </span>
                    <p>{visible ? "SHIVA" : "NOT SHIVA"}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;