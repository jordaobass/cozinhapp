"use client";

import { useState } from 'react';
import AutocompleteInput from "@/components/AutocompleteInput";
import ListaCards from "@/components/lista-card"; // Certifique-se de que o caminho esteja correto

export default function Home() {
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);



    return (
        <div className="flex flex-col items-center justify-center mx-10 mb-5 ">
            <div className="flex flex-row justify-center mb-5 w-full">
                <AutocompleteInput
                    placeholder="Digite aqui os seus ingredientes"
                    className="h-12 px-4 border text-lg focus:ring-2"
                    onSelectedItemsChange={setSelectedKeywords}
                />
            </div>

            <div className="flex justify-center items-center">
                <ListaCards selectedItems={selectedKeywords}  />
            </div>
        </div>
    );
}