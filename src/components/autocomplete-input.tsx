import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import { normalizeText } from '@/utils/normalize-text';

interface Alimento {
    id: number;
    nome: string;
    calorias: number;
    proteina: number;
    carboidrato: number;
}

interface AutocompleteInputProps {
    onSelectedItemsChange: (items: string[]) => void;
    onExactMatchChange?: (exactMatch: boolean) => void;
    className?: string;
    placeholder?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
                                                                 onSelectedItemsChange,
                                                                 onExactMatchChange,
                                                                 className = '',
                                                                 placeholder = ''
                                                             }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items, setItems] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [exactMatch, setExactMatch] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchAlimentos = async () => {
            const response = await fetch('/data/alimentos.json');
            const data: Alimento[] = await response.json();
            const foodNames = data.map(item => item.nome);
            setItems(foodNames);
        };

        fetchAlimentos();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const normalizedInput = normalizeText(value);
            const filteredSuggestions = items.filter((item) => {
                const normalizedItem = normalizeText(item);
                return normalizedItem.includes(normalizedInput);
            });
            setSuggestions(filteredSuggestions);
            setActiveSuggestionIndex(-1);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion: string) => {
        if (!selectedItems.includes(suggestion)) {
            const newSelectedItems = [...selectedItems, suggestion];
            setSelectedItems(newSelectedItems);
            onSelectedItemsChange(newSelectedItems);
        }
        setInputValue('');
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleRemoveItem = (item: string) => {
        const newSelectedItems = selectedItems.filter((selected) => selected !== item);
        setSelectedItems(newSelectedItems);
        onSelectedItemsChange(newSelectedItems);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === 'Enter') {
            if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
                handleSelectSuggestion(suggestions[activeSuggestionIndex]);
            }
        }
    };

    const handleExactMatchChange = (checked: boolean) => {
        setExactMatch(checked);
        if (onExactMatchChange) {
            onExactMatchChange(checked);
        }
    };

    return (
        <div className="relative w-full">
            <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`block w-full placeholder:text-center bg-white dark:bg-white text-black ${className}`}
            />

            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border dark:text-black border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className={`cursor-pointer px-4 py-2 ${index === activeSuggestionIndex ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            {/* Checkbox para match exato */}
            <div className="flex items-center gap-2 mt-2 mb-2">
                <input
                    type="checkbox"
                    id="exactMatch"
                    checked={exactMatch}
                    onChange={(e) => handleExactMatchChange(e.target.checked)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <label htmlFor="exactMatch" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    🎯 Match exato (mais rigoroso)
                </label>
            </div>

            <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                    {selectedItems.map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, scale: 0 }} // Animação inicial ao adicionar
                            animate={{ opacity: 1, scale: 1 }} // Animação final ao adicionar
                            exit={{ opacity: 0, scale: 1.5 }}  // Animação de saída ao remover
                            transition={{ duration: 0.5 }}      // Duração da animação
                        >
                            <Badge className="flex items-center space-x-2">
                                {item}
                                <button
                                    onClick={() => handleRemoveItem(item)}
                                    className="ml-2 text-white bg-red-600 hover:bg-red-500 rounded-full px-2 flex items-center justify-center h-7 w-7"
                                >
                                    x
                                </button>
                            </Badge>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AutocompleteInput;
