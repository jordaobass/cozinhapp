"use client";

import React, { useEffect, useState } from 'react';

const ingredients = ['arroz', 'feijão', 'batata'];
const typingSpeed = 100; // Tempo em milissegundos para cada letra
const eraseSpeed = 50; // Tempo para apagar cada letra
const pauseBetweenWords = 1000; // Pausa entre as palavras

const TypingAnimation: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const [ingredientIndex, setIngredientIndex] = useState(0);
    const [isErasing, setIsErasing] = useState(false);
    const [showCursor, setShowCursor] = useState(true); // Estado para o cursor

    useEffect(() => {
        const typing = async () => {
            const currentIngredient = ingredients[ingredientIndex];
            if (!isErasing) {
                for (let i = 0; i <= currentIngredient.length; i++) {
                    setDisplayText(`Deixe sua criatividade fluir! Vamos descobrir receitas incríveis com os ingredientes que você tem: ${currentIngredient.slice(0, i)}`);
                    await new Promise(resolve => setTimeout(resolve, typingSpeed));
                }
                setIsErasing(true);
                await new Promise(resolve => setTimeout(resolve, pauseBetweenWords));
            } else {
                for (let i = currentIngredient.length; i >= 0; i--) {
                    setDisplayText(`Deixe sua criatividade fluir! Vamos descobrir receitas incríveis com os ingredientes que você tem: ${currentIngredient.slice(0, i)}`);
                    await new Promise(resolve => setTimeout(resolve, eraseSpeed));
                }
                setIsErasing(false);
                setIngredientIndex((ingredientIndex + 1) % ingredients.length);
            }
        };

        const interval = setInterval(typing, pauseBetweenWords * 2);
        return () => clearInterval(interval);
    }, [ingredientIndex, isErasing]);

    // Intervalo para alternar a visibilidade do cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500); // Tempo para piscar o cursor

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="text-gray-600 mb-5 italic"> {/* Adicionei a classe italic aqui */}
            {displayText}
            {/* Exibe o cursor piscante */}
            <span className={`inline-block ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>|</span>
        </div>
    );
};

export default TypingAnimation;
