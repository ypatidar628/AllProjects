import { useEffect, useRef, useState } from "react";
import Webservice from "../service/Webservice.jsx";
import WebAIP from "../service/WebAIP.jsx";
import { useDispatch } from "react-redux";
import { addCartData } from "../redux/Slice.jsx";
import gsap from "gsap";

function Home() {
    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedRating, setSelectedRating] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    var search = useRef();



    useEffect(() => {
        LoadProductData();
    }, []);

    // useEffect(() => {
    //     gsap.from(".product-card", { opacity: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" });
    // }, [filteredProducts]);

    const LoadProductData = async () => {
        const response = await Webservice.GetAPICall(WebAIP.ProductAPI);
        setProduct(response.data.products);
        setFilteredProducts(response.data.products);
    };

    const handleFilterChange = (event) => {
        const rating = event.target.value;
        setSelectedRating(rating);
        filterProducts(searchTerm, rating);
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterProducts(term, selectedRating);
    };

    const filterProducts = (term, rating) => {
        console.log(search.current.value);
        let filterProduct = product;
        console.log(filterProduct);

        if (rating !== "All") {
            filterProduct = filterProduct.filter(p => Math.floor(p.rating) === parseInt(rating));
        }
        if (term) {
            filterProduct = filterProduct.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
        }
        setFilteredProducts(filterProduct);
    }


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <label className="text-lg font-semibold mr-2">Filter by Rating:</label>
                    <select className="p-2 border rounded-md" onChange={handleFilterChange} value={selectedRating}>
                        <option value="All">All</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="p-2 border rounded-md"
                        value={searchTerm}
                        ref={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length === 0 ? (
                    <h1 className="text-center text-xl font-semibold">Loding ...</h1>
                ) : (
                    filteredProducts.map((pdata, index) => (
                        <div key={index}>
                            <div className="product-card h-full bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
                                <img src={pdata.thumbnail} alt={pdata.title} className="h-40 w-full object-cover rounded-md mb-4" />
                                <h2 className="text-lg font-bold">{pdata.title}</h2>
                                <p className="text-gray-500">Discount: {pdata.discountPercentage}%</p>
                                <p className="text-gray-500">Category: {pdata.category}</p>
                                <p className="text-gray-700 font-semibold">Price: ${pdata.price}</p>
                                <p className="text-yellow-500 font-semibold">Rating: {pdata.rating}</p>
                                <button className="mt-4 bg-green-500 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                                    onClick={() => dispatch(addCartData(pdata, pdata.id))}> Add to Cart</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
