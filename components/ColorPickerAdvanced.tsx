import { useEffect, useState } from "react";
import { CompactPicker } from "react-color";

interface ColorPickerAdvancedProps {
    handleSelectedColor: (color: string) => void;
}

export default function ColorPickerAdvanced({ handleSelectedColor }: ColorPickerAdvancedProps) {
    const [selectedColor, setSelectedColor] = useState("#ff0000");

    useEffect(() => {
        handleSelectedColor(selectedColor)
    }, [selectedColor])

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
            <h2 className="text-lg font-bold">Escolha uma cor:</h2>

            {/* Mostra a cor selecionada */}
            <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: selectedColor }}></div>

            {/* Seletor de cor avançado */} 
            <CompactPicker
                color={selectedColor}
                onChange={(color) => setSelectedColor(color.hex)}
            />

            <p>Cor selecionada: <strong>{selectedColor}</strong></p>
        </div>
    );
}
