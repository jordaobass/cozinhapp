"use client"; // Indica que este é um Client Component

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Importando motion para animações
import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Importando Button

interface Receita {
    id: number;
    nome: string;
    descricao: string;
    calorias: number;
    proteina: number;
    carboidrato: number;
    ingredientes: string[];
}

const ReceitaPage: React.FC = () => {
    const { id } = useParams();
    const [receita, setReceita] = useState<Receita | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceita = async () => {
            const response = await fetch(`/data/receitas.json`);
            const data: Receita[] = await response.json();
            const receitaEncontrada = data.find((rec) => rec.id.toString() === id);
            setReceita(receitaEncontrada || null);
            setLoading(false);
        };

        fetchReceita();
    }, [id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (!receita) return <div className="text-center">Receita não encontrada.</div>;

    const recipeJsonLd = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": receita.nome,
        "description": receita.descricao,
        "recipeIngredient": receita.ingredientes,
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": `${receita.calorias} cal`,
            "proteinContent": `${receita.proteina}g`,
            "carbohydrateContent": `${receita.carboidrato}g`
        },
        "recipeInstructions": [
            {
                "@type": "HowToStep",
                "text": receita.descricao
            }
        ],
        "author": {
            "@type": "Organization",
            "name": "Cozinhapp"
        },
        "datePublished": new Date().toISOString(),
        "recipeCategory": "Prato Principal",
        "recipeCuisine": "Brasileira"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
            />
            <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
                <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full"
                initial={{ opacity: 0, scale: 0.95 }} // Estado inicial da animação
                animate={{ opacity: 1, scale: 1 }} // Estado final da animação
                transition={{ duration: 0.3 }} // Duração da animação
            >
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">{receita.nome}</h1>

                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Ingredientes:</h2>
                <ul className="list-disc ml-6">
                    {receita.ingredientes.map((ingrediente, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{ingrediente}</li>
                    ))}
                </ul>

                <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-white">Modo de Preparo:</h2>
                <p className="mt-4 mb-10 text-justify text-gray-700 dark:text-gray-300">{receita.descricao}</p>

                <p className="mt-4 text-gray-900 dark:text-white">Calorias: {receita.calorias}</p>
                <p className="text-gray-900 dark:text-white">Proteína: {receita.proteina}g</p>
                <p className="text-gray-900 dark:text-white">Carboidrato: {receita.carboidrato}g</p>

                {/* Botão de Voltar com Animação */}
                <div className="mt-6 text-center">
                    <Link href="/home">
                        <motion.div
                            initial={{ scale: 0.9 }} // Escala inicial
                            whileHover={{ scale: 1.05 }} // Efeito ao passar o mouse
                            whileTap={{ scale: 0.95 }} // Efeito ao clicar
                            transition={{ type: "spring", stiffness: 300 }} // Transição suave
                        >
                            <Button className="p-6">
                                Busque mais receitas deliciosas
                            </Button>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </div>
        </>
    );
};

export default ReceitaPage;
