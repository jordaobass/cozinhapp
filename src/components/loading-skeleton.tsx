import React from 'react';

const LoadingSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg animate-pulse">
                    {/* Image placeholder */}
                    <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
                    
                    {/* Title placeholder */}
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    
                    {/* Badges placeholder */}
                    <div className="flex gap-2 mb-3">
                        <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                        <div className="h-5 w-14 bg-gray-200 rounded-full"></div>
                    </div>
                    
                    {/* Ingredients placeholder */}
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    
                    {/* Nutrition info placeholder */}
                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/5"></div>
                    </div>
                    
                    {/* Button placeholder */}
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;