
import React from 'react';

interface ImagePreviewProps {
    imagePreview: string;
    onCancel: () => void;
    onAnalyse: () => void;
    isLoading: boolean;
}

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);


const ImagePreview: React.FC<ImagePreviewProps> = ({ imagePreview, onCancel, onAnalyse, isLoading }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="relative w-full max-w-lg p-6 bg-white border-2 border-dashed border-yellow-400 rounded-xl">
                 <button
                    onClick={onCancel}
                    className="absolute -top-4 -right-4 bg-gray-600 text-white rounded-full p-2 hover:bg-red-600 transition-colors z-10"
                    aria-label="Cancel image"
                 >
                    <XIcon />
                </button>
                <img 
                    src={imagePreview} 
                    alt="Fasal ki photo"
                    className="rounded-lg w-full h-auto max-h-[50vh] object-contain" 
                />
            </div>
            <button
                onClick={onAnalyse}
                disabled={isLoading}
                className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-wait"
            >
                {isLoading ? 'Jaanch ho rahi hai...' : 'Bimari Pehchane'}
            </button>
        </div>
    )
}

export default ImagePreview;
