import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Alimento {
    id: number;
    nome: string;
    calorias: number;
    proteina: number;
    carboidrato: number;
}

interface AutocompleteInputProps {
    onSelectedItemsChange: (items: string[]) => void;
    className?: string;
    placeholder?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
                                                                 onSelectedItemsChange,
                                                                 className = '',
                                                                 placeholder = ''
                                                             }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items, setItems] = useState<string[]>([]);

    // Usando useEffect para buscar os dados do JSON
    useEffect(() => {
        const fetchAlimentos = async () => {
            const response = await fetch('/data/alimentos.json'); // Ajuste para o caminho correto
            const data: Alimento[] = await response.json();
            const foodNames = data.map(item => item.nome);
            setItems(foodNames); // Definindo os nomes dos alimentos no estado
        };

        fetchAlimentos();
    }, []); // Executa apenas uma vez na montagem do componente

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filteredSuggestions = items.filter((item) =>
                item.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion: string) => {
        if (!selectedItems.includes(suggestion)) {
            const newSelectedItems = [...selectedItems, suggestion];
            setSelectedItems(newSelectedItems);
            onSelectedItemsChange(newSelectedItems); // Atualiza as palavras selecionadas no componente pai
        }
        setInputValue('');
        setSuggestions([]);
    };

    const handleRemoveItem = (item: string) => {
        const newSelectedItems = selectedItems.filter((selected) => selected !== item);
        setSelectedItems(newSelectedItems);
        onSelectedItemsChange(newSelectedItems); // Atualiza as palavras selecionadas no componente pai
    };

    return (
        <div className={`relative w-full`}>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`block w-full ${className}`}
            />

            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className="cursor-pointer px-4 py-2 hover:bg-red-500 hover:text-white"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-2 mb-2 flex flex-wrap gap-2">
                {selectedItems.map((item, index) => (
                    <Badge key={index} className="flex items-center space-x-2">
                        {item}
                        <button
                            onClick={() => handleRemoveItem(item)}
                            className="ml-2 text-white bg-red-500 hover:bg-red-700 rounded-full px-2"
                        >
                            x
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default AutocompleteInput;
