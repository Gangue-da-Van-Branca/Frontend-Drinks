import React from "react";
import PacoteForm from "../../components/AdminPageComponents/PacoteForm";
import DrinkForm from "../../components/AdminPageComponents/DrinkForm";
import BarForm from "../../components/AdminPageComponents/BarForm";
import OpcionalForm from "../../components/AdminPageComponents/OpcionalForm";

export default function GerenciarItens() {
  return (
    <div className="gerenciar-container">
      <PacoteForm />
      <DrinkForm />
      <BarForm />
      <OpcionalForm />
    </div>
  );
}
