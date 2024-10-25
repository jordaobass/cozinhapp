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

    const filteredReceitas = receitas.filter(receita =>
        receita.ingredientes.some(ingrediente => {
            // Normaliza e divide o ingrediente em palavras
            const normalizedWordsInIngrediente = ingrediente
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .split(/\s+/); // Divide o ingrediente em palavras

            return ingredientesSelecionados.some(selectedItem => {
                // Normaliza e divide o item selecionado em palavras
                const normalizedSelectedWords = selectedItem
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .split(/\s+/); // Divide o item selecionado em palavras

                // Verifica se alguma palavra do item selecionado corresponde a uma palavra no ingrediente
                return normalizedSelectedWords.some(word =>
                    normalizedWordsInIngrediente.some(ingredienteWord =>
                        ingredienteWord.includes(word)
                    )
                );
            });
        })
    );

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold"></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReceitas.length > 0 ? (
                    filteredReceitas.map(receita => (
                        <div key={receita.id} className="border p-4 rounded-md">
                            <h3 className="font-semibold">{receita.nome}</h3>
                            <p className="text-sm">{receita.descricao}</p>
                            <p>Calorias: {receita.calorias}</p>
                            <p>Proteína: {receita.proteina}g</p>
                            <p>Carboidrato: {receita.carboidrato}g</p>
                            <p>Ingredientes: {receita.ingredientes.join(', ')}</p>
                        </div>
                    ))
                ) : (


                    <div className="flex inset-0  items-center justify-center text-gray-400 opacity-75 text-center">
                        {/*<p>Nenhuma receita encontrada com os alimentos selecionados.</p>*/}
                        <p className="text-lg font-semibold">Selecione os ingredientes que você tem para sugestões de
                            receita</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListaCards;
