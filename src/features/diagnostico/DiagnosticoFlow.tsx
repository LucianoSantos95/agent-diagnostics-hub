import { useCallback } from 'react';
import { useDiagnostico } from './hooks/useDiagnostico';
import Header from '@/components/Header';
import TelaAbertura from './screens/TelaAbertura';
import TelaPerguntas from './screens/TelaPerguntas';
import TelaAnalise from './screens/TelaAnalise';
import TelaResultado from './screens/TelaResultado';
import Footer from '@/components/Footer';

export default function DiagnosticoFlow() {
  const { state, iniciar, responder, avancar, voltar, concluirAnalise, salvarEmail, registrarCTA, reiniciar } = useDiagnostico();

  const handleConcluirAnalise = useCallback(
    (respostas: Record<number, string>) => concluirAnalise(respostas),
    [concluirAnalise]
  );

  // TelaResultado manages its own footer
  const showFooter = state.tela === 'abertura';

  return (
    <div>
      <Header />

      {state.tela === 'abertura' && <TelaAbertura onIniciar={iniciar} />}

      {state.tela === 'perguntas' && (
        <TelaPerguntas
          perguntaAtual={state.perguntaAtual}
          respostas={state.respostas}
          onResponder={responder}
          onAvancar={avancar}
          onVoltar={voltar}
        />
      )}

      {state.tela === 'analise' && (
        <TelaAnalise
          respostas={state.respostas}
          onConcluir={handleConcluirAnalise}
        />
      )}

      {state.tela === 'resultado' && state.resultado && (
        <TelaResultado
          resultado={state.resultado}
          respostas={state.respostas}
          onSalvarEmail={salvarEmail}
          onRegistrarCTA={registrarCTA}
          onReiniciar={reiniciar}
        />
      )}

      {showFooter && <Footer />}
    </div>
  );
}
