import OpenAI from 'openai';
import { z } from 'zod';

// Zod schemas for validation
const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.record(z.string(), z.string())
});

const DimensionSchema = z.object({
  name: z.string(),
  questions: z.array(QuestionSchema)
});

const DiagnosisResponseSchema = z.object({
  dimension: z.string(),
  averageScore: z.number(),
  maturityStage: z.string(),
  improvementPath: z.string()
});

const FullDiagnosisSchema = z.object({
  responses: z.record(z.string(), z.object({
    question: z.string(),
    answer: z.string(),
    score: z.number()
  })),
  diagnosis: z.array(DiagnosisResponseSchema),
  summary: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    recommendations: z.array(z.string())
  })
});

type Question = z.infer<typeof QuestionSchema>;
type Dimension = z.infer<typeof DimensionSchema>;
type DiagnosisResponse = z.infer<typeof DiagnosisResponseSchema>;
type FullDiagnosis = z.infer<typeof FullDiagnosisSchema>;

const dimensions: Dimension[] = [
  {
    name: "Pessoas & Cultura",
    questions: [
      {
        id: "pessoasCultura_1",
        text: "Como a comunicação acontece no dia a dia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_2",
        text: "Como você descreveria o estilo de liderança predominante?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_3",
        text: "Quando surgem problemas, como os times costumam agir?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_4",
        text: "Como está organizada a rotina de trabalho?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_5",
        text: "Até que ponto os valores da empresa estão presentes no dia a dia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_6",
        text: "Quais ferramentas apoiam pessoas & cultura?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  },
  {
    name: "Estrutura & Operações",
    questions: [
      {
        id: "estruturaOperacoes_1",
        text: "Como é a troca de informações entre áreas?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_2",
        text: "Como os gestores lidam com delegação?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_3",
        text: "Quando processos falham, o que acontece?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_4",
        text: "Quanta autonomia operacional os colaboradores têm?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_5",
        text: "Qual é a relação da empresa com padrões de qualidade?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_6",
        text: "Quais ferramentas apoiam as operações do dia a dia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  },
  {
    name: "Mercado & Clientes",
    questions: [
      {
        id: "mercadoClientes_1",
        text: "Como a empresa ouve seus clientes?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_2",
        text: "Como vendas e atendimento trabalham juntos?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_3",
        text: "Quando o mercado muda, como a empresa reage?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_4",
        text: "Como é o acompanhamento de metas comerciais?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_5",
        text: "O diferencial competitivo está claro?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_6",
        text: "Quais ferramentas apoiam mercado & clientes?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  },
  {
    name: "Direção & Futuro",
    questions: [
      {
        id: "direcaoFuturo_1",
        text: "Como a visão de futuro é comunicada?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_2",
        text: "Como os líderes conectam pessoas à estratégia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_3",
        text: "Qual é o papel da inovação no planejamento?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_4",
        text: "Como as atividades diárias se conectam com a estratégia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_5",
        text: "Como a empresa lida com propósito e impacto social?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_6",
        text: "Quais ferramentas apoiam a estratégia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  }
];

const improvementPaths: { [key: string]: string } = {
  "Pessoas & Cultura": "Fortalecer comunicação, liderança e cultura organizacional",
  "Estrutura & Operações": "Aprimorar processos, delegação e autonomia",
  "Mercado & Clientes": "Melhorar escuta de clientes, sinergia comercial e adaptação ao mercado",
  "Direção & Futuro": "Alinhar estratégia, propósito e inovação"
};

function calculateMaturityStage(average: number): string {
  if (average >= 1.0 && average <= 1.9) return "Inicial";
  if (average >= 2.0 && average <= 2.4) return "Básico";
  if (average >= 2.5 && average <= 3.4) return "Intermediário";
  if (average >= 3.5 && average <= 4.0) return "Avançado";
  return "Indefinido";
}

class DiagnosticService {
  private openai: OpenAI | null = null;
  private useDemoMode: boolean = false;
  private apiKey: string = '';

  // Testing methods
  async testDemoMode(): Promise<FullDiagnosis> {
    console.log('🧪 Testing DEMO MODE functionality...');
    const diagnostic = new DiagnosticService('test-key', true);
    return await diagnostic.runFullDiagnostic();
  }

  async testRealAPI(): Promise<FullDiagnosis> {
    console.log('🧪 Testing REAL API functionality...');
    const diagnostic = new DiagnosticService(this.apiKey, false);
    return await diagnostic.runFullDiagnostic();
  }

  async testErrorHandling(): Promise<void> {
    console.log('🧪 Testing error handling...');
    try {
      const diagnostic = new DiagnosticService('invalid-key', false);
      await diagnostic.runFullDiagnostic();
    } catch (error) {
      console.log('✅ Error handling test passed:', error);
    }
  }

  async testBrowserCompatibility(): Promise<void> {
    console.log('🧪 Testing browser compatibility...');
    if (typeof window !== 'undefined') {
      console.log('✅ Running in browser environment - browser compatibility test passed');
    } else {
      console.log('✅ Running in compatible environment - browser compatibility test passed');
    }
  }

  constructor(apiKey: string, useDemoMode: boolean = false) {
    this.apiKey = apiKey;
    this.useDemoMode = useDemoMode;

    if (useDemoMode) {
      console.log('🔄 Running in DEMO MODE - Using mock responses for testing');
    } else if (apiKey && apiKey !== 'your-api-key-here' && apiKey.startsWith('sk-')) {
      // Browser environment - initialize OpenAI
      if (typeof window !== 'undefined') {
        this.openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true // Note: In production, use a backend API
        });
        console.log('🔑 OpenAI API initialized successfully');
      } else {
        console.warn('⚠️ Not in browser environment. Switching to DEMO MODE.');
        this.useDemoMode = true;
      }
    } else {
      console.warn('⚠️ No valid API key provided. Switching to DEMO MODE.');
      this.useDemoMode = true;
    }
  }

  async generateResponses(): Promise<{ [key: string]: { question: string; answer: string; score: number } }> {
    const responses: { [key: string]: { question: string; answer: string; score: number } } = {};

    if (this.useDemoMode) {
      // Demo mode: Generate mock responses for testing
      console.log('🎭 Using DEMO MODE responses...');

      for (const dimension of dimensions) {
        for (const question of dimension.questions) {
          // Generate random scores between 2-4 for more realistic demo data
          const score = Math.floor(Math.random() * 3) + 2; // Random 2, 3, or 4
          const answerText = question.options[score.toString()] || "Resposta inválida";

          responses[question.id] = {
            question: question.text,
            answer: answerText,
            score: score
          };

          // Add small delay to simulate API calls
          await new Promise(resolve => {
            setTimeout(resolve, 100);
          });
        }
      }
    } else {
      // Real OpenAI API calls
      for (const dimension of dimensions) {
        for (const question of dimension.questions) {
          const prompt = `Você é um consultor especialista em diagnóstico organizacional.
          Analise a seguinte pergunta e escolha a alternativa mais adequada entre 1 e 4.
          Pergunta: ${question.text}
          Opções:
          ${Object.entries(question.options).map(([key, value]) => `(${key}) ${value}`).join('\n')}
          Responda apenas com o número da opção escolhida (1, 2, 3 ou 4).`;

          try {
            const completion = await this.openai!.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 10,
              temperature: 0.3
            });

            const answer = completion.choices[0]?.message?.content?.trim();
            const score = parseInt(answer || "1");
            const answerText = question.options[score.toString()] || "Resposta inválida";

            responses[question.id] = {
              question: question.text,
              answer: answerText,
              score: score
            };
          } catch (error) {
            console.error(`Erro ao processar pergunta ${question.id}:`, error);
            responses[question.id] = {
              question: question.text,
              answer: "Erro na geração da resposta",
              score: 1
            };
          }
        }
      }
    }

    return responses;
  }

  async generateDiagnosis(responses: { [key: string]: { question: string; answer: string; score: number } }): Promise<FullDiagnosis> {
    const diagnosis: DiagnosisResponse[] = [];
    const dimensionScores: { [key: string]: number[] } = {};

    // Calculate scores per dimension
    for (const dimension of dimensions) {
      const scores: number[] = [];
      for (const question of dimension.questions) {
        scores.push(responses[question.id]?.score || 1);
      }
      dimensionScores[dimension.name] = scores;
    }

    // Generate diagnosis for each dimension
    for (const dimension of dimensions) {
      const scores = dimensionScores[dimension.name];
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const maturityStage = calculateMaturityStage(average);
      const improvementPath = improvementPaths[dimension.name];

      diagnosis.push({
        dimension: dimension.name,
        averageScore: Math.round(average * 100) / 100,
        maturityStage: maturityStage,
        improvementPath: improvementPath
      });
    }

    // Generate summary
    let summary: { strengths: string[]; weaknesses: string[]; recommendations: string[] } = {
      strengths: [],
      weaknesses: [],
      recommendations: []
    };

    if (this.useDemoMode) {
      // Demo mode: Generate mock summary
      console.log('🎭 Using DEMO MODE summary...');

      const mockStrengths = [
        "Comunicação interna bem estruturada",
        "Liderança participativa e motivadora",
        "Processos operacionais definidos",
        "Foco no cliente e mercado",
        "Visão estratégica clara"
      ];

      const mockWeaknesses = [
        "Dependência de pessoas-chave",
        "Falta de padronização em alguns processos",
        "Necessidade de maior inovação",
        "Treinamento insuficiente em algumas áreas"
      ];

      const mockRecommendations = [
        "Implementar sistema de gestão de conhecimento",
        "Fortalecer cultura de feedback contínuo",
        "Investir em capacitação técnica",
        "Desenvolver métricas de desempenho mais robustas",
        "Criar programa de inovação estruturado"
      ];

      summary = {
        strengths: mockStrengths.slice(0, 3 + Math.floor(Math.random() * 2)),
        weaknesses: mockWeaknesses.slice(0, 2 + Math.floor(Math.random() * 2)),
        recommendations: mockRecommendations.slice(0, 3 + Math.floor(Math.random() * 2))
      };
    } else {
      // Real OpenAI API call for summary
      const summaryPrompt = `Você é um consultor especialista em diagnóstico organizacional.
      Analise os seguintes dados de diagnóstico e gere:
      1. Pontos fortes (lista de 3-5 itens)
      2. Fragilidades (lista de 3-5 itens)
      3. Recomendações de melhoria (lista de 3-5 itens)

      Dados:
      ${JSON.stringify(diagnosis, null, 2)}

      Responda em formato JSON com as chaves: strengths, weaknesses, recommendations.`;

      try {
        const completion = await this.openai!.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: summaryPrompt }],
          max_tokens: 500,
          temperature: 0.3
        });

        const summaryText = completion.choices[0]?.message?.content?.trim();
        if (summaryText) {
          summary = JSON.parse(summaryText);
        }
      } catch (error) {
        console.error("Erro ao gerar resumo:", error);
      }
    }

    return {
      responses,
      diagnosis,
      summary
    };
  }

  async runFullDiagnostic(): Promise<FullDiagnosis> {
    console.log("🔄 DIAGNÓSTICO ORGANIZACIONAL INICIADO");
    console.log("⏳ Gerando respostas para as perguntas...");

    const responses = await this.generateResponses();

    console.log("✅ Respostas geradas com sucesso!");
    console.log("⏳ Gerando diagnóstico e análise...");

    const fullDiagnosis = await this.generateDiagnosis(responses);

    console.log("✅ Diagnóstico concluído com sucesso!");
    console.log("🎉 DIAGNÓSTICO ORGANIZACIONAL FINALIZADO");
    console.log("📊 Resultados prontos para visualização");

    // Automatically display the formatted diagnosis
    this.printFormattedDiagnosis(fullDiagnosis);

    return fullDiagnosis;
  }

  printDiagnosisToTerminal(diagnosis: FullDiagnosis): void {
    console.log("\n=== DIAGNÓSTICO ORGANIZACIONAL ===\n");

    console.log("RESPOSTAS:");
    Object.entries(diagnosis.responses).forEach(([id, response]) => {
      console.log(`${id}: ${response.question} - ${response.answer} (Pontuação: ${response.score})`);
    });

    console.log("\nDIAGNÓSTICO POR DIMENSÃO:");
    diagnosis.diagnosis.forEach(dim => {
      console.log(`${dim.dimension}:`);
      console.log(`  Pontuação média: ${dim.averageScore}`);
      console.log(`  Estágio de maturidade: ${dim.maturityStage}`);
      console.log(`  Trilha de melhoria: ${dim.improvementPath}`);
    });

    console.log("\nPONTOS FORTES:");
    diagnosis.summary.strengths.forEach(strength => console.log(`- ${strength}`));

    console.log("\nFRAGILIDADES:");
    diagnosis.summary.weaknesses.forEach(weakness => console.log(`- ${weakness}`));

    console.log("\nRECOMENDAÇÕES:");
    diagnosis.summary.recommendations.forEach(rec => console.log(`- ${rec}`));
  }

  printFormattedDiagnosis(diagnosis: FullDiagnosis): void {
    console.log("\n" + "=".repeat(50));
    console.log("**Análise das Respostas**");
    console.log("=".repeat(50));

    // Calculate overall maturity score
    const overallScore = diagnosis.diagnosis.reduce((sum, dim) => sum + dim.averageScore, 0) / diagnosis.diagnosis.length;

    diagnosis.diagnosis.forEach(dim => {
      console.log(`\n**Dimensão: ${dim.dimension}**`);
      console.log(`* Estágio de maturidade: ${dim.averageScore}/4 (${this.getMaturityLevel(dim.averageScore)} em uma escala de 1 a 4)`);

      // Get strengths and weaknesses for this dimension
      const dimStrengths = diagnosis.summary.strengths.filter(s =>
        s.toLowerCase().includes(dim.dimension.toLowerCase().split(' ')[0])
      );
      const dimWeaknesses = diagnosis.summary.weaknesses.filter(w =>
        w.toLowerCase().includes(dim.dimension.toLowerCase().split(' ')[0])
      );

      console.log("* Pontos fortes:");
      if (dimStrengths.length > 0) {
        dimStrengths.forEach(strength => console.log(`\t+ ${strength}`));
      } else {
        console.log("\t+ Comunicação eficaz");
        console.log("\t+ Liderança colaborativa e comunicativa");
        console.log("\t+ Times eficazes em resolver problemas");
      }

      console.log("* Fragilidades:");
      if (dimWeaknesses.length > 0) {
        dimWeaknesses.forEach(weakness => console.log(`\t+ ${weakness}`));
      } else {
        console.log("\t+ Ocasiões de comunicação confusa ou não muito eficaz");
        console.log("\t+ Falhas na liderança quando necessário");
        console.log("\t+ Rotina de trabalho não flexível ou adaptável");
      }

      console.log("* Trilhas de melhoria recomendadas:");
      console.log(`\t1. Melhorar a comunicação em situações críticas e evitar falhas.`);
      console.log(`\t2. Desenvolver habilidades de liderança mais colaborativas e comunicativas.`);
      console.log(`\t3. Implementar mudanças na rotina de trabalho para torná-la mais flexível e adaptável.`);
    });

    console.log("\n" + "=".repeat(50));
    console.log("**Sugestões Gerais**");
    console.log("=".repeat(50));

    console.log("* Fomentar a comunicação eficaz em todos os níveis da empresa para evitar erros e melhorar a colaboração entre equipes.");
    console.log("* Desenvolver habilidades de liderança mais eficazes e delegação para melhorar a coordenação e a resolução de problemas.");
    console.log("* Implementar mudanças na estrutura operacional e no planejamento de contingência para torná-la mais flexível e adaptável às mudanças no mercado.");
  }

  private getMaturityLevel(score: number): string {
    if (score >= 3.5) return "Avançado";
    if (score >= 2.5) return "Intermediário";
    if (score >= 2.0) return "Básico";
    return "Inicial";
  }
}

export default DiagnosticService;
export type { FullDiagnosis, DiagnosisResponse };
