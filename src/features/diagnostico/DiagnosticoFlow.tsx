import { useCallback } from 'react';
import { useDiagnostico } from './hooks/useDiagnostico';
import Header from '@/components/Header';
import TelaAbertura from './screens/TelaAbertura';
import TelaPerguntas from './screens/TelaPerguntas';
import TelaAnalise from './screens/TelaAnalise';
import TelaResultado from './screens/TelaResultado';
import Footer from '@/components/Footer';

export default function DiagnosticoFlow() {
  const { state, iniciar, responder, avancar, voltar, concluirAnalise, salvarEmail, salvarOrcamento, registrarCTA, registrarPlaybook, reiniciar } = useDiagnostico();

  const handleConcluirAnalise = useCallback(
    (respostas: Record<number, string>) => concluirAnalise(respostas),
    [concluirAnalise]
  );

  const showFooter = state.tela === 'abertura';

  return (
    <div>
      <Header onLogoClick={reiniciar} />

      {/* Troca de tela é conditional render puro — nada de AnimatePresence aqui:
          é o caminho crítico do funil e não pode depender de animação concluir.
          O crossfade sutil fica dentro de cada tela (fade-up), reduced-motion safe. */}
      <main>
        {state.tela === 'abertura' && (
          <div key="abertura" className="animate-fade-up">
            <TelaAbertura onIniciar={iniciar} />
          </div>
        )}

        {state.tela === 'perguntas' && (
          <div key="perguntas" className="animate-fade-up">
            <TelaPerguntas
              perguntaAtual={state.perguntaAtual}
              respostas={state.respostas}
              onResponder={responder}
              onAvancar={avancar}
              onVoltar={voltar}
            />
          </div>
        )}

        {state.tela === 'analise' && (
          <div key="analise" className="animate-fade-up">
            <TelaAnalise
              respostas={state.respostas}
              onConcluir={handleConcluirAnalise}
            />
          </div>
        )}

        {state.tela === 'resultado' && state.resultado && (
          <div key="resultado" className="animate-fade-up">
            <TelaResultado
              resultado={state.resultado}
              respostas={state.respostas}
              sessionId={state.sessionId}
              onSalvarEmail={salvarEmail}
              onSalvarOrcamento={salvarOrcamento}
              onRegistrarCTA={registrarCTA}
              onRegistrarPlaybook={registrarPlaybook}
              onReiniciar={reiniciar}
            />
          </div>
        )}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
