import React from "react";
import "./SelecioneDrinks.css";

function SelecioneDrinks({
  drinksDisponiveis,
  drinksSelecionados,
  toggleDrink,
}) {
  return (
    <div className="container-principal">
      <h1 className="titulo">Selecione seus drinks</h1>
      <div className="quadro">
        {drinksDisponiveis.map((categoria) => (
          <div key={categoria.categoria} className="categoria">
            <h2 className="titulo-categoria">{categoria.categoria}</h2>
            <ul className="lista-drinks">
              {categoria.drinks.map((drink) => (
                <li
                  key={drink.id}
                  className={`item-drink ${
                    drinksSelecionados.some((d) => d.id === drink.id)
                      ? "selecionado"
                      : ""
                  }`}
                  onClick={() => toggleDrink(drink)}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={drinksSelecionados.some(
                        (d) => d.id === drink.id
                      )}
                      onChange={() => toggleDrink(drink)}
                    />
                    <strong>{drink.nome}</strong> — {drink.descricao}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelecioneDrinks;
