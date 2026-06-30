import { useCallback } from 'react';
import { useDiagnostico } from './hooks/useDiagnostico';
import TelaAbertura from './screens/TelaAbertura';
import TelaPerguntas from './screens/TelaPerguntas';
import TelaAnalise from './screens/TelaAnalise';
import TelaResultado from './screens/TelaResultado';

export default function DiagnosticoFlow() {
  const { state, iniciar, responder, avancar, voltar, concluirAnalise, salvarEmail, registrarCTA, reiniciar } = useDiagnostico();

  const handleConcluirAnalise = useCallback(
    (respostas: Record<number, string>) => concluirAnalise(respostas),
    [concluirAnalise]
  );

  if (state.tela === 'abertura') {
    return <TelaAbertura onIniciar={iniciar} />;
  }

  if (state.tela === 'perguntas') {
    return (
      <TelaPerguntas
        perguntaAtual={state.perguntaAtual}
        respostas={state.respostas}
        onResponder={responder}
        onAvancar={avancar}
        onVoltar={voltar}
      />
    );
  }

  if (state.tela === 'analise') {
    return (
      <TelaAnalise
        respostas={state.respostas}
        onConcluir={handleConcluirAnalise}
      />
    );
  }

  if (state.tela === 'resultado' && state.resultado) {
    return (
      <TelaResultado
        resultado={state.resultado}
        respostas={state.respostas}
        onSalvarEmail={salvarEmail}
        onRegistrarCTA={registrarCTA}
        onReiniciar={reiniciar}
      />
    );
  }

  return null;
}
