import React from "react";
import DrinkForm from "../../components/AdminPageComponents/DrinkForm";
import BarForm from "../../components/AdminPageComponents/BarForm";
import OpcionalForm from "../../components/AdminPageComponents/OpcionalForm";

export default function GerenciarItens() {
  return (
    <div className="gerenciar-container">
      <DrinkForm />
      <BarForm />
      <OpcionalForm />
    </div>
  );
}
