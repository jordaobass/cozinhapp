// components/ListaCards.tsx

import React from 'react';

interface Receita {
    id: number;
    nome: string;
    descricao: string;
    calorias: number;
    proteina: number;
    carboidrato: number;
    ingredientes: string[];
}

interface ListaCardsProps {
    ingredientesSelecionados: string[];
}

const ListaCards: React.FC<ListaCardsProps> = ({ingredientesSelecionados}) => {
    const [receitas, setReceitas] = React.useState<Receita[]>([]);

    // Carregar os dados das receitas quando o componente é montado
    React.useEffect(() => {
        const fetchReceitas = async () => {
            const response = await fetch('/data/receitas.json'); // Caminho do arquivo JSON
            const data: Receita[] = await response.json();
            setReceitas(data);
        };

        fetchReceitas();
    }, []);

    const filteredReceitas = ingredientesSelecionados.length > 0 ? receitas.filter(receita => {
        // Normaliza e divide os ingredientes da receita em palavras
        const normalizedIngredientsInRecipe = receita.ingredientes.map(ingrediente =>
            ingrediente
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .split(/\s+/)
        );

        // Para cada ingrediente selecionado, verifica se todos estão nos ingredientes da receita
        return ingredientesSelecionados.every(selectedItem => {
            // Normaliza e divide o item selecionado em palavras
            const normalizedSelectedWords = selectedItem
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .split(/\s+/);

            // Verifica se todas as palavras do item selecionado estão presentes nos ingredientes da receita
            return normalizedSelectedWords.every(selectedWord =>
                normalizedIngredientsInRecipe.some(ingredientWords =>
                    ingredientWords.includes(selectedWord)
                )
            );
        });
    }) : [];

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold"></h2>

            {filteredReceitas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredReceitas.map(receita => (
                        <div key={receita.id} className="border p-4 rounded-md">
                            <h3 className="font-semibold">{receita.nome}</h3>
                            <p className="text-sm">{receita.descricao}</p>
                            <p>Calorias: {receita.calorias}</p>
                            <p>Proteína: {receita.proteina}g</p>
                            <p>Carboidrato: {receita.carboidrato}g</p>
                            <p>Ingredientes: {receita.ingredientes.join(', ')}</p>
                        </div>
                    ))}
                </div>
            ) : (

                <div className="flex flex-row items-center justify-center w-full">

                    <p className="text-gray-400 opacity-75 text-center text-lg font-semibold">
                        Selecione os ingredientes que você possui para sugestões de receita iradas
                    </p>

                </div>
            )}

        </div>
    );
};

export default ListaCards;
