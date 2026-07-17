const ProductCardSkeleton = () => {
    const skeletonStyle = {
        background: "#e5e7eb",
        borderRadius: "6px",
        position: "relative",
        overflow: "hidden",
    };

    return (
        <div className="product-card" style={{ width: "320px" }}>
            <div
                className="image-container"
                style={{
                    ...skeletonStyle,
                    width: "100%",
                    height: "350px",
                }}
            ></div>

            <div className="product-content">
                <div
                    className="rating"
                    style={{
                        ...skeletonStyle,
                        width: "90px",
                        height: "28px",
                        marginBottom: "18px",
                    }}
                ></div>

                <div
                    style={{
                        ...skeletonStyle,
                        width: "140px",
                        height: "26px",
                        marginBottom: "16px",
                    }}
                ></div>

                <div
                    style={{
                        ...skeletonStyle,
                        width: "100%",
                        height: "18px",
                        marginBottom: "10px",
                    }}
                ></div>

                <div
                    style={{
                        ...skeletonStyle,
                        width: "70%",
                        height: "18px",
                        marginBottom: "20px",
                    }}
                ></div>

                <div
                    className="price"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <div
                        style={{
                            ...skeletonStyle,
                            width: "70px",
                            height: "28px",
                        }}
                    ></div>

                    <div
                        style={{
                            ...skeletonStyle,
                            width: "55px",
                            height: "18px",
                        }}
                    ></div>

                    <div
                        style={{
                            ...skeletonStyle,
                            width: "80px",
                            height: "18px",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;