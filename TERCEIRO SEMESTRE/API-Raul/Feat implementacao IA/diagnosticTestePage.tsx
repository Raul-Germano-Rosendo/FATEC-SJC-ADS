import React, { useState, useEffect } from 'react';
import { useQuestionnaire } from '../contexts/QuestionnaireContext';
import '../styles/global.css';

interface DiagnosisData {
  responses: { [key: string]: { question: string; answer: string; score: number } };
  diagnosis: Array<{
    dimension: string;
    averageScore: number;
    maturityStage: string;
    improvementPath: string;
  }>;
  summary: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
}

const DiagnosticTestePage: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the last diagnostic result from localStorage
    const savedDiagnosis = localStorage.getItem('lastDiagnosticResult');
    if (savedDiagnosis) {
      try {
        setDiagnosis(JSON.parse(savedDiagnosis));
      } catch (error) {
        console.error('Error parsing saved diagnosis:', error);
      }
    }
    setLoading(false);
  }, []);

  const saveToLocalStorage = (data: DiagnosisData) => {
    localStorage.setItem('lastDiagnosticResult', JSON.stringify(data));
    setDiagnosis(data);
  };

  if (loading) {
    return (
      <div className="diagnostic-teste-page">
        <div className="container">
          <h1>Diagnóstico Teste</h1>
          <p>Carregando resultados...</p>
        </div>
      </div>
    );
  }

  if (!diagnosis) {
    return (
      <div className="diagnostic-teste-page">
        <div className="container">
          <h1>Diagnóstico Teste</h1>
          <p>Nenhum resultado de diagnóstico encontrado.</p>
          <p>Execute o diagnóstico primeiro em <a href="/diagnostico">/diagnostico</a></p>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnostic-teste-page">
      <div className="container">
        <h1>Diagnóstico Teste</h1>
        <p>Resultados baseados na última execução do diagnóstico:</p>

        <div className="diagnosis-display">
          <div className="diagnosis-section">
            <h3>Resumo Geral</h3>
            <div className="summary-cards">
              <div className="summary-card">
                <h4>Pontos Fortes</h4>
                <ul>
                  {diagnosis.summary.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="summary-card">
                <h4>Fragilidades</h4>
                <ul>
                  {diagnosis.summary.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
              <div className="summary-card">
                <h4>Recomendações</h4>
                <ul>
                  {diagnosis.summary.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="diagnosis-section">
            <h3>Diagnóstico por Dimensão</h3>
            <div className="dimension-grid">
              {diagnosis.diagnosis.map((dim, index) => (
                <div key={index} className="dimension-card">
                  <h4>{dim.dimension}</h4>
                  <div className="dimension-info">
                    <p><strong>Pontuação:</strong> {dim.averageScore}/4</p>
                    <p><strong>Estágio:</strong> {dim.maturityStage}</p>
                    <p><strong>Melhorias:</strong> {dim.improvementPath}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="diagnosis-section">
            <h3>Respostas Detalhadas</h3>
            <div className="responses-list">
              {Object.entries(diagnosis.responses).map(([id, response]) => (
                <div key={id} className="response-item">
                  <h5>{response.question}</h5>
                  <p><strong>Resposta:</strong> {response.answer}</p>
                  <p><strong>Pontuação:</strong> {response.score}/4</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="actions">
          <button
            onClick={() => window.location.href = '/diagnostico'}
            className="btn btn-primary"
          >
            Executar Novo Diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTestePage;
