import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import "./ProductDetail.css";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const url = `${API_URL}/get-product/${productId}`;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                }
            })
            .catch(() => {
                alert('Server Error');
            });
    }, [productId]);

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch(() => {
                alert('Server Error');
            });
    };

    return (
        <>
            <Header />
            <div className="product-details-container">
                <h1 className="product-details-header">Product Details</h1>
                {product && (
                    <div className="product-details">
                        <div className="product-image-container">
                            <img src={`${API_URL}/${product.pimage}`} alt="Product" />
                            {product.pimage2 && (
                                <img src={`${API_URL}/${product.pimage2}`} alt="Product" />
                            )}
                        </div>
                        <div className="product-info">
                            <h3 className="price-text">Rs. {product.price} /-</h3>
                            <p>{product.pname} | {product.category}</p>
                            <p>{product.pdesc}</p>
                            {product.addedBy && (
                                <button
                                    className="contact-button"
                                    onClick={() => handleContact(product.addedBy)}
                                >
                                    Show Contact Details
                                </button>
                            )}
                            {user && (
                                <div className="contact-info">
                                    {user.username && <h4>{user.username}</h4>}
                                    {user.mobile && <h3>{user.mobile}</h3>}
                                    {user.email && <h6>{user.email}</h6>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
