"use client"
import { useState } from "react";
import { Upload, X, Image, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconList = [
    "Home",
    "ShoppingCart",
    "Package",
    "Tag",
    "Box",
    "Gift",
    "Truck",
];

interface ProductIconPickerProps {
    handlePayload: (payload: string) => void;
}

const ProductIconPicker = ({ handlePayload }: ProductIconPickerProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
                setSelectedIcon(null); // Reseta a seleção de ícone
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md w-full">
            <h2 className="text-lg font-semibold mb-3">Escolha um Ícone</h2>

            {/* Upload de Imagem */}
            {/* <div className="flex flex-col items-center gap-3 mb-4">
        {uploadedImage ? (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Ícone customizado"
              className="w-16 h-16 object-cover rounded-full border"
            />
            <button
              onClick={() => setUploadedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer flex items-center gap-2 bg-gray-100 p-2 rounded-md hover:bg-gray-200">
            <Upload size={18} />
            <span className="text-sm">Fazer Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mb-2">ou</div> */}

            {/* Ícones pré-definidos */}
            <div className="grid grid-cols-4 gap-3">
                {iconList.map((icon) => {
                    const IconComponent = require("lucide-react")[icon];
                    return (
                        <button
                            key={icon}
                            onClick={() => {
                                setSelectedIcon(icon);
                                setUploadedImage(null);
                                handlePayload(icon)
                            }}
                            className={`p-2 rounded-lg border flex justify-between items-center ${selectedIcon === icon
                                ? "bg-green-200 border-green-500"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            <IconComponent size={24} />
                            {selectedIcon === icon && <Check size={18} className="mt-1" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductIconPicker;
