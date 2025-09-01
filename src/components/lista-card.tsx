// components/ListaCards.tsx

import React from 'react';
import Link from 'next/link';
import LoadingSkeleton from './loading-skeleton';
import { Clock, Users, Flame, ChefHat } from 'lucide-react';
import { normalizeWords } from '@/utils/normalize-text';

// Função para normalizar e comparar ingredientes
const ingredientMatches = (selectedItem: string, recipeIngredient: string): boolean => {
    const normalizedSelected = normalizeWords(selectedItem);
    const normalizedRecipe = normalizeWords(recipeIngredient);
    
    return normalizedSelected.some(selectedWord => 
        normalizedRecipe.some(recipeWord =>
            recipeWord.includes(selectedWord) || selectedWord.includes(recipeWord)
        )
    );
};

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

interface ListaCardsProps {
    ingredientesSelecionados: string[];
    exactMatch?: boolean;
}

const ListaCards: React.FC<ListaCardsProps> = ({ ingredientesSelecionados, exactMatch = false }) => {
    const [receitas, setReceitas] = React.useState<Receita[]>([]);
    const [allRecipes, setAllRecipes] = React.useState<Receita[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [searching, setSearching] = React.useState(false);

    // Carregar receitas APENAS quando usuário selecionar ingredientes
    React.useEffect(() => {
        const filterRecipes = async () => {
            if (ingredientesSelecionados.length === 0) {
                setReceitas([]);
                return;
            }

            setSearching(true);

            try {
                // Se ainda não carregou todas as receitas, carrega UMA ÚNICA VEZ
                let recipesToFilter = allRecipes;
                if (allRecipes.length === 0) {
                    setLoading(true);
                    const response = await fetch('/data/receitas.json');
                    const data: Receita[] = await response.json();
                    setAllRecipes(data); // Armazena em cache para sempre
                    recipesToFilter = data;
                    setLoading(false);
                }

                // Filtra as receitas baseado nos ingredientes selecionados
                const filtered = recipesToFilter.filter(receita => {
                    const recipeSearchText = [
                        receita.nome,
                        ...receita.ingredientes.map(ing => ing.item),
                        ...receita.tags,
                        receita.categoria
                    ].join(' ');
                    
                    const normalizedRecipeWords = normalizeWords(recipeSearchText);

                    if (exactMatch) {
                        // MODO EXATO: Receita deve ter EXATAMENTE os ingredientes selecionados (nem mais, nem menos)
                        
                        const recipeIngredients = receita.ingredientes;
                        
                        // 1. Número de ingredientes deve ser igual ao número selecionado
                        if (recipeIngredients.length !== ingredientesSelecionados.length) {
                            return false;
                        }
                        
                        // 2. Todos os ingredientes selecionados devem estar na receita
                        const hasAllSelected = ingredientesSelecionados.every(selectedItem => {
                            return recipeIngredients.some(recipeIng => 
                                ingredientMatches(selectedItem, recipeIng.item)
                            );
                        });
                        
                        // 3. Todos os ingredientes da receita devem estar na seleção
                        const hasOnlySelected = recipeIngredients.every(recipeIng => {
                            return ingredientesSelecionados.some(selectedItem => 
                                ingredientMatches(selectedItem, recipeIng.item)
                            );
                        });
                        
                        return hasAllSelected && hasOnlySelected;
                    } else {
                        // MODO FLEXÍVEL: Busca inteligente por partes dos ingredientes
                        const matchedIngredients = ingredientesSelecionados.filter(selectedItem => {
                            const normalizedSelectedWords = normalizeWords(selectedItem);

                            return normalizedSelectedWords.some(selectedWord => {
                                return normalizedRecipeWords.some(recipeWord => {
                                    // 1. Match exato
                                    if (recipeWord === selectedWord) return true;
                                    
                                    // 2. Busca por partes (salmão → salmão sashimi, arroz → arroz japonês)
                                    if (selectedWord.length >= 3) {
                                        // Se o ingrediente selecionado está contido no ingrediente da receita
                                        if (recipeWord.includes(selectedWord)) return true;
                                        // Se o ingrediente da receita está contido no selecionado  
                                        if (selectedWord.includes(recipeWord)) return true;
                                    }
                                    
                                    // 3. Match por palavras-chave similares
                                    if (selectedWord.length >= 4 && recipeWord.length >= 4) {
                                        // Verifica se uma palavra contém substancialmente a outra
                                        const similarity = Math.min(selectedWord.length, recipeWord.length) / 
                                                         Math.max(selectedWord.length, recipeWord.length);
                                        if (similarity >= 0.6 && 
                                            (recipeWord.includes(selectedWord) || selectedWord.includes(recipeWord))) {
                                            return true;
                                        }
                                    }
                                    
                                    return false;
                                });
                            });
                        });

                        // Threshold inteligente baseado no número de ingredientes
                        const matchThreshold = ingredientesSelecionados.length <= 2 ? 1 : 
                                              Math.ceil(ingredientesSelecionados.length * 0.7);
                        
                        return matchedIngredients.length >= matchThreshold;
                    }
                });

                setReceitas(filtered);
            } catch (error) {
                console.error('Erro ao carregar receitas:', error);
                setReceitas([]);
            } finally {
                setSearching(false);
            }
        };

        // Debounce para evitar filtros muito frequentes
        const timeoutId = setTimeout(filterRecipes, 300);
        return () => clearTimeout(timeoutId);
    }, [ingredientesSelecionados, exactMatch, allRecipes.length]); // Inclui exactMatch nas dependências

    // Receitas já estão filtradas no useEffect, então apenas usa o estado
    const filteredReceitas = receitas;

    // Helper functions for recipe metadata
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'fácil': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'médio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'difícil': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
        }
    };

    // Loading inicial apenas se estiver carregando pela primeira vez
    if (loading && allRecipes.length === 0) {
        return (
            <div className="mt-4">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
                <div className="text-center text-gray-500">
                    <p className="text-lg mb-2">🔍 Carregando base de receitas...</p>
                    <p className="text-sm">Preparando 680+ receitas deliciosas para você!</p>
                </div>
                <LoadingSkeleton />
            </div>
        );
    }

    return (
        <div className="mt-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filteredReceitas.length > 0 ? `${filteredReceitas.length} Receitas Encontradas` : 'Suas Receitas Aparecerão Aqui'}
                </h2>
                {ingredientesSelecionados.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Baseado nos ingredientes: {ingredientesSelecionados.join(', ')}
                    </p>
                )}
            </div>

            {searching && (
                <div className="text-center mb-4">
                    <p className="text-orange-600 font-medium">🔍 Buscando receitas com seus ingredientes...</p>
                    <LoadingSkeleton />
                </div>
            )}

            {!searching && filteredReceitas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReceitas.map(receita => {
                        const difficultyColor = getDifficultyColor(receita.dificuldade);
                        const totalTime = receita.tempoPreparoMinutos + receita.tempoCozimentoMinutos;
                        
                        return (
                            <div key={receita.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                                {/* Recipe header with icon */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-800 dark:to-red-800 rounded-lg flex-shrink-0">
                                        <ChefHat className="w-6 h-6 text-orange-500 dark:text-orange-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">{receita.nome}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{receita.categoria}</p>
                                    </div>
                                </div>

                                {/* Quick info badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                                        {receita.dificuldade}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {totalTime} min
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs font-medium flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {receita.porcoes} porções
                                    </span>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">
                                        {receita.descricaoRapida}
                                    </p>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                                            <span className="font-semibold">Ingredientes principais:</span>
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-200">
                                            {receita.ingredientes.slice(0, 4).map(ing => ing.item).join(' • ')}
                                            {receita.ingredientes.length > 4 && ` • +${receita.ingredientes.length - 4} mais`}
                                        </p>
                                    </div>
                                </div>

                                {/* Nutrition info bar */}
                                <div className="flex items-center gap-4 mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg border dark:border-gray-700">
                                    <span className="flex items-center gap-1 text-sm font-medium text-orange-700 dark:text-orange-300">
                                        <Flame className="w-4 h-4" />
                                        {receita.calorias}
                                    </span>
                                    <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-300">
                                        <span>{receita.nutricao.proteina}g prot</span>
                                        <span>{receita.nutricao.carboidrato}g carb</span>
                                        <span>{receita.nutricao.gordura}g gord</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Link href={`/home/receitas/${receita.id}`}>
                                    <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md">
                                        🍳 Preparar Agora
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : !searching && ingredientesSelecionados.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full py-12">
                    <div className="text-6xl mb-4">🥘</div>
                    <p className="text-gray-400 opacity-75 text-center text-lg font-semibold mb-2">
                        Selecione os ingredientes que você possui
                    </p>
                    <p className="text-gray-500 text-center text-sm">
                        para descobrir receitas deliciosas e personalizadas
                    </p>
                </div>
            ) : !searching && filteredReceitas.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full py-12">
                    <div className="text-6xl mb-4">😅</div>
                    <p className="text-gray-400 text-center text-lg font-semibold mb-2">
                        Nenhuma receita encontrada
                    </p>
                    <p className="text-gray-500 text-center text-sm">
                        Tente outros ingredientes ou remova alguns filtros
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default ListaCards;
