import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorites } from './redux/productSlice';
import Card from './Card';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.items);
    const favorites = useSelector((store) => store.products.favorites);
    
    const favoriteProducts = products.filter((product) => 
        favorites.includes(product.title)
    );

    const handleToggleFavorite = (productTitle) => {
        dispatch(addFavorites(productTitle));
    };

    return (
        <div className="container mx-auto p-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
                ← Back to Products
            </Link>
            
            <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
            
            <div className="flex gap-4 justify-center flex-wrap">
                {favoriteProducts.length === 0 ? (
                    <p>No favorite items yet!</p>
                ) : (
                    favoriteProducts.map((product) => (
                        <Card
                            key={product.id}
                            product={product}
                            isFavorite={true}
                            onToggleFavorite={() => handleToggleFavorite(product.title)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;