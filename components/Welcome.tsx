
import React, { useRef } from 'react';
import { LeafIcon, UploadCloudIcon } from './Icons';

interface WelcomeProps {
    onImageSelect: (file: File) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onImageSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };
    
    const handleAreaClick = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <div className="flex items-center gap-3">
                <LeafIcon />
                <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
                    Farm<span className="text-green-700">IQ</span> AI
                </h1>
            </div>
            <p className="mt-2 text-gray-600">
                Aapka kheti ka saathi. Fasal ki photo daalein, bimari pehchane aur sahi ilaaj paayein.
            </p>
            
            <div 
                onClick={handleAreaClick}
                className="mt-8 w-full max-w-lg p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-green-400 transition-colors cursor-pointer flex flex-col items-center justify-center"
            >
                <UploadCloudIcon />
                <p className="mt-4 text-lg font-semibold text-green-700">Photo Upload Karein</p>
                <p className="text-sm text-gray-500">Apne computer se photo chunein</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>
        </div>
    )
}

export default Welcome;
