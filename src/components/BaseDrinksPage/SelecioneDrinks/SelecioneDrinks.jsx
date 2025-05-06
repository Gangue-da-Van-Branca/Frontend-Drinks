import React from "react";
import DrinkOption from '../drinkOption';
import './SelecioneDrinks.module.css';

function SelecioneDrinks({ drinksDisponiveis, drinksSelecionados, toggleDrink}){
    return (
        <div id="campo-drinks">
            <h2 id="subtitulo-drinks">Selecione os drinks da sua festa (mínimo 5 e máximo 8)_</h2>
            <div id="lista-drinks">
                {drinksDisponiveis.map((drink) => (
                    <DrinkOption 
                        key={drink.nome}
                        nome={drink.nome}
                        descricao={drink.descricao}
                        selecionado={drinksSelecionados.includes(drink.nome)}
                        aoSelecionar={() => toggleDrink(drink.nome)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SelecioneDrinks;