import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, addFavorites } from './redux/productSlice';
import Card from './Card';
import API_URL from './Constants';
import { Link } from 'react-router-dom';

const Body = () => {
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.items);
    const favorites = useSelector((store) => store.products.favorites);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            dispatch(addProducts(jsonData));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleFavoriteToggle = (productName) => {
        dispatch(addFavorites(productName));
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOrder) {
            case 'high-to-low':
                return b.price - a.price;
            case 'low-to-high':
                return a.price - b.price;
            default:
                return 0;
        }
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                Products ({sortedProducts.length})
            </h1>
            <div className="mb-6 flex gap-4 items-center">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-48 p-2 border rounded-lg shadow-sm"
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-48 p-2 border rounded-lg shadow-sm"
                >
                    <option value="default">Default</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="low-to-high">Price: Low to High</option>
                </select>

                <Link 
                    to="/favorites" 
                    className="ml-auto text-blue-600 hover:text-blue-800"
                >
                    View Favorites
                </Link>
            </div>

            <div className="flex gap-4 justify-between flex-wrap">
                {sortedProducts.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                        isFavorite={favorites.includes(product.title)}
                        onToggleFavorite={handleFavoriteToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
