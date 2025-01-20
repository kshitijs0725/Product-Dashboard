import React from 'react';
import { Star } from 'lucide-react';

const Card = ({ product, isFavorite, onToggleFavorite }) => {
    return (
        <div
            className="flex-grow-0 flex-shrink-0 basis-[300px] border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
        >
            <button
                className="absolute top-2 right-2"
                onClick={() => onToggleFavorite(product.title)}
            >
                <Star
                    className={`w-6 h-6 ${
                        isFavorite ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                />
            </button>
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
            />
            <div>
                <h2 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h2>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-green-600">${product.price}</p>
                    <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
