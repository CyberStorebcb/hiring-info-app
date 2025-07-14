import HireForm from './components/HireForm';

export default function Home() {
  return (
    <main>
      <h1>
        🔒 Bem-vindo à sua vaga! <span role="img" aria-label="escudo">🛡️</span>
      </h1>
      <p>
        Sua segurança é nossa prioridade. Preencha o formulário com confiança!
      </p>
      <HireForm />
      {/* Adicione seus componentes aqui */}
    </main>
  );
}