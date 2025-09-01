"use client";

import { useState } from 'react';
import AutocompleteInput from "@/components/autocomplete-input";
import ListaCards from "@/components/lista-card";
import TypingAnimation from "@/components/typing-animation"; // Certifique-se de que o caminho esteja correto

export default function Home() {
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [exactMatch, setExactMatch] = useState<boolean>(false);



    return (
        <div className="flex flex-col items-center justify-center mx-10 mb-5 ">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Cozinhapp - Receitas com Seus Ingredientes
            </h1>
            
            <div className="flex flex-row justify-center mt-4 w-full">
                <TypingAnimation />
            </div>
            <div className="flex flex-row justify-center mb-5 w-full">
                <AutocompleteInput
                    placeholder="Digite aqui os seus ingredientes"
                    className="h-12 px-4 border text-lg focus:ring-2 mt-10"
                    onSelectedItemsChange={setSelectedKeywords}
                    onExactMatchChange={setExactMatch}
                />
            </div>

            <div className="flex justify-center items-center w-full">
                <ListaCards ingredientesSelecionados={selectedKeywords} exactMatch={exactMatch} />
            </div>
        </div>
    );
}
