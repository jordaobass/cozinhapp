"use client"; // Indica que este é um Client Component

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Importando motion para animações
import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Importando Button

interface Ingrediente {
    item: string;
    quantidade: string;
    categoria: string;
}

interface Nutricao {
    proteina: number;
    carboidrato: number;
    gordura: number;
    fibra: number;
}

interface Receita {
    id: number;
    nome: string;
    categoria: string;
    dificuldade: string;
    tempoPreparoMinutos: number;
    tempoCozimentoMinutos: number;
    porcoes: number;
    descricaoRapida: string;
    instrucoes: string[];
    ingredientes: Ingrediente[];
    tags: string[];
    calorias: number;
    nutricao: Nutricao;
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
        "description": receita.descricaoRapida,
        "recipeIngredient": receita.ingredientes.map(ing => `${ing.quantidade} ${ing.item}`),
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": `${receita.calorias} cal`,
            "proteinContent": `${receita.nutricao.proteina}g`,
            "carbohydrateContent": `${receita.nutricao.carboidrato}g`
        },
        "recipeInstructions": receita.instrucoes.map((instrucao, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "text": instrucao
        })),
        "prepTime": `PT${receita.tempoPreparoMinutos}M`,
        "cookTime": `PT${receita.tempoCozimentoMinutos}M`,
        "totalTime": `PT${receita.tempoPreparoMinutos + receita.tempoCozimentoMinutos}M`,
        "recipeYield": receita.porcoes,
        "author": {
            "@type": "Organization",
            "name": "Cozinhapp"
        },
        "datePublished": new Date().toISOString(),
        "recipeCategory": receita.categoria,
        "recipeCuisine": "Brasileira",
        "keywords": receita.tags.join(", ")
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
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">{ingrediente.quantidade}</span> {ingrediente.item}
                        </li>
                    ))}
                </ul>

                <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-white">Modo de Preparo:</h2>
                <ol className="mt-4 mb-10 space-y-3">
                    {receita.instrucoes.map((instrucao, index) => (
                        <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                                {index + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{instrucao}</span>
                        </li>
                    ))}
                </ol>

                {/* Recipe Info */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Informações da Receita</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Tempo de preparo:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.tempoPreparoMinutos} min</p>
                        </div>
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Tempo de cozimento:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.tempoCozimentoMinutos} min</p>
                        </div>
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Porções:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.porcoes} pessoas</p>
                        </div>
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Dificuldade:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.dificuldade}</p>
                        </div>
                    </div>
                </div>

                {/* Nutrition Info */}
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Informações Nutricionais (por porção)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-orange-600 dark:text-orange-400">Calorias:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.calorias} kcal</p>
                        </div>
                        <div>
                            <span className="text-orange-600 dark:text-orange-400">Proteínas:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.nutricao.proteina}g</p>
                        </div>
                        <div>
                            <span className="text-orange-600 dark:text-orange-400">Carboidratos:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.nutricao.carboidrato}g</p>
                        </div>
                        <div>
                            <span className="text-orange-600 dark:text-orange-400">Gorduras:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{receita.nutricao.gordura}g</p>
                        </div>
                    </div>
                </div>

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
