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
    selectedItems: string[];
}

const ListaCards: React.FC<ListaCardsProps> = ({ selectedItems }) => {
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

    // Filtrar receitas com base nos alimentos selecionados
    const filteredReceitas = receitas.filter(receita =>
        receita.ingredientes.some(ingrediente =>
            selectedItems.includes(ingrediente)
        )
    );

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold">Receitas Encontradas:</h2>
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
                    <p>Nenhuma receita encontrada com os alimentos selecionados.</p>
                )}
            </div>
        </div>
    );
};

export default ListaCards;
