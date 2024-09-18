import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";
import './AddProduct.css';

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState(null);
    const [pimage2, setpimage2] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        if (!pname || !pdesc || !price || !category || !pimage || !pimage2) {
            alert('Please fill out all fields and select both images.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const formData = new FormData();
                formData.append('plat', position.coords.latitude);
                formData.append('plong', position.coords.longitude);
                formData.append('pname', pname);
                formData.append('pdesc', pdesc);
                formData.append('price', price);
                formData.append('category', category);
                formData.append('pimage', pimage);
                formData.append('pimage2', pimage2);
                formData.append('userId', localStorage.getItem('userId'));

                // Log form data
                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}:`, pair[1]);
                }

                const url = API_URL + '/add-product';
                axios.post(url, formData)
                    .then((res) => {
                        console.log('Server response:', res);
                        if (res.data.message) {
                            alert(res.data.message);
                            navigate('/');
                        } else {
                            alert('Failed to add product.');
                        }
                    })
                    .catch((err) => {
                        console.error('Axios error:', err);
                        alert('Server error. Please try again later.');
                    });
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve your location. Please allow location access and try again.');
            }
        );
    };

    return (
        <div>
            <Header />
            <div className="p-3">
                <h2> ADD YOUR PRODUCT HERE: </h2>
                <label> Product Name </label>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value); }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value); }} />
                <label> Product Price </label>
                <input className="form-control" type="number" value={price}
                    onChange={(e) => { setprice(e.target.value); }} />
                <label> Product Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value); }}>
                    <option value="">Select a category</option>
                    {categories && categories.length > 0 &&
                        categories.map((item, index) => (
                            <option key={'option' + index} value={item}>{item}</option>
                        ))
                    }
                </select>
                <label> Product Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage(e.target.files[0]);
                        console.log('Selected image 1:', e.target.files[0]);
                    }} />
                <label> Product Second Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage2(e.target.files[0]);
                        console.log('Selected image 2:', e.target.files[0]);
                    }} />
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>
        </div>
    );
}

export default AddProduct;
