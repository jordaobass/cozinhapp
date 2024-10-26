// components/ListaCards.tsx

import React from 'react';
import Link from 'next/link';

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

const ListaCards: React.FC<ListaCardsProps> = ({ ingredientesSelecionados }) => {
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
        const normalizedIngredientsInRecipe = receita.ingredientes.map(ingrediente =>
            ingrediente
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .split(/\s+/)
        );

        return ingredientesSelecionados.every(selectedItem => {
            const normalizedSelectedWords = selectedItem
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .split(/\s+/);

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
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredReceitas.map(receita => (
                        <div key={receita.id} className="bg-white border border-red-50 p-4  rounded-md">
                            <h2 className="font-bold">{receita.nome}</h2>
                            {/*      <p className="text-sm">{receita.descricao}</p>*/}
                            <p className="mt-3 mb-3"><span className="font-medium">Ingredientes:</span> {receita.ingredientes.join(', ')}</p>

                            <p><span className="font-medium">Calorias:</span> {receita.calorias}</p>
                            <p><span className="font-medium">Proteína:</span> {receita.proteina}g</p>
                            <p><span className="font-medium">Carboidrato:</span> {receita.carboidrato}g</p>

                            <Link href={`/home/receitas/${receita.id}`} className="text-red-500 justify-self-center underline mt-2 block">
                                Ver Receita completa
                            </Link>
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
