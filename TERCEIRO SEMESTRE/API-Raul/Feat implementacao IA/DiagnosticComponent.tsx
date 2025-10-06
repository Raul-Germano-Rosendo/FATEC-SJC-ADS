import React, { useState } from 'react';
import DiagnosticService, { FullDiagnosis } from '../services/diagnosticService';

const DiagnosticComponent: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState<FullDiagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostic = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Note: In production, get the API key from environment variables or a backend
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-here';
      const service = new DiagnosticService(apiKey);
    const result = await service.runFullDiagnostic();
    setDiagnosis(result);

    // Automatically save the diagnosis to a file
    saveDiagnosisToFile();

    // Print to terminal (console)
    service.printDiagnosisToTerminal(result);
    } catch (err) {
      setError('Erro ao executar diagnóstico: ' + (err as Error).message);
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDiagnosisToFile = async () => {
    if (diagnosis) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `diagnostico_organizacional_${timestamp}.json`;
      const dataStr = JSON.stringify(diagnosis, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });

      if ('showDirectoryPicker' in window) {
        try {
          const dirHandle = await (window as any).showDirectoryPicker();
          const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
          console.log(`File saved to ${dirHandle.name}/${fileName}`);
        } catch (err) {
          console.error('Error saving file:', err);
        }
      } else {
        // Fallback to download
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', fileName);
        linkElement.click();
      }
    }
  };

  return (
    <div className="diagnostic-container">
      <h2>Diagnóstico Organizacional</h2>
      <p>Clique no botão abaixo para executar o diagnóstico usando IA. Os resultados serão exibidos aqui e também impressos no console do navegador.</p>

      <button
        onClick={runDiagnostic}
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? 'Executando Diagnóstico...' : 'Executar Diagnóstico'}
      </button>

      {error && (
        <div className="error-message" style={{ color: 'red', marginTop: '20px' }}>
          {error}
        </div>
      )}

      {diagnosis && (
        <div className="diagnosis-results" style={{ marginTop: '30px' }}>
          <h3>Resultados do Diagnóstico</h3>

          <div className="diagnosis-section">
            <h4>Diagnóstico por Dimensão</h4>
            {diagnosis.diagnosis.map((dim, index) => (
              <div key={index} className="dimension-card">
                <h5>{dim.dimension}</h5>
                <p><strong>Pontuação média:</strong> {dim.averageScore}</p>
                <p><strong>Estágio de maturidade:</strong> {dim.maturityStage}</p>
                <p><strong>Trilha de melhoria:</strong> {dim.improvementPath}</p>
              </div>
            ))}
          </div>

          <div className="diagnosis-section">
            <h4>Pontos Fortes</h4>
            <ul>
              {diagnosis.summary.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="diagnosis-section">
            <h4>Fragilidades</h4>
            <ul>
              {diagnosis.summary.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>

          <div className="diagnosis-section">
            <h4>Recomendações</h4>
            <ul>
              {diagnosis.summary.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={saveDiagnosisToFile}
            className="btn btn-secondary"
          >
            Salvar Diagnóstico como JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default DiagnosticComponent;
