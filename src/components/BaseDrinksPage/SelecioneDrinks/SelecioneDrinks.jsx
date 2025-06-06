import React from "react";
import "./SelecioneDrinks.css";

function SelecioneDrinks({
  drinksDisponiveis,
  drinksSelecionados,
  toggleDrink,
}) {
  const drinksPorCategoria = drinksDisponiveis.reduce((acc, drink) => {
    const categoria = drink.tipo;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(drink);
    return acc;
  }, {});

  return (
    <div className="container-principal">
      <h1 className="titulo">Selecione seus drinks</h1>
      <div className="quadro">
        {Object.entries(drinksPorCategoria).map(([categoria, drinks]) => (
          <div key={categoria} className="categoria">
            <h2 className="titulo-categoria">{categoria}</h2>
            <ul className="lista-drinks">
              {drinks.map((drink) => (
                <li
                  key={drink.idItem}
                  className={`item-drink ${
                    drinksSelecionados.some((d) => d.idItem === drink.idItem)
                      ? "selecionado"
                      : ""
                  }`}
                  onClick={() => toggleDrink(drink)}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={drinksSelecionados.some(
                        (d) => d.idItem === drink.idItem
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
