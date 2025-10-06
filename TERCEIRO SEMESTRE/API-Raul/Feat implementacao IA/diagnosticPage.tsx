import React from 'react';
import DiagnosticComponent from '../componentes/DiagnosticComponent';
import '../styles/global.css';

const DiagnosticPage: React.FC = () => {
  return (
    <div className="diagnostic-page">
      <div className="container">
        <h1>Diagnóstico Organizacional com IA</h1>
        <p>Esta página utiliza inteligência artificial para realizar um diagnóstico completo da sua organização.</p>
        <p>Os resultados serão exibidos na tela e também impressos no console do navegador para que você possa acessá-los posteriormente.</p>

        <DiagnosticComponent />
      </div>
    </div>
  );
};

export default DiagnosticPage;
