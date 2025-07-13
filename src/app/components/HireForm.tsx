"use client";
import React, { useState } from 'react';
import styles from './HireForm.module.css';
import { FaTshirt, FaUserTag } from 'react-icons/fa';
import { GiBoots, GiTrousers } from 'react-icons/gi';
import TicketForm from "./TicketForm";

const shirtOptions = [
  { label: "P (38, 39)", value: "P" },
  { label: "M (40, 42)", value: "M" },
  { label: "G (42, 44)", value: "G" },
  { label: "GG (44, 46)", value: "GG" },
  { label: "XG (46, 48)", value: "XG" },
  { label: "Outras pontuações", value: "OUTRA" },
];

const pantsOptions = [
  { label: "P (38, 39)", value: "P" },
  { label: "M (40, 42)", value: "M" },
  { label: "G (42, 44)", value: "G" },
  { label: "GG (44, 46)", value: "GG" },
  { label: "XG (46, 48)", value: "XG" },
  { label: "Outras pontuações", value: "OUTRA" },
];

const bootsOptions = [
  "38","39","40","41","42","43","44","45","46","47","48","49","50"
];

const HireForm: React.FC = () => {
  const [shirtScore, setShirtScore] = useState<string>("P");
  const [shirtOther, setShirtOther] = useState<string>("");
  const [pantsScore, setPantsScore] = useState<string>("P");
  const [pantsOther, setPantsOther] = useState<string>("");
  const [bootsScore, setBootsScore] = useState<string>("38");
  const [badgeName, setBadgeName] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [showTicketForm, setShowTicketForm] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowTicketForm(true);
    }, 1500);
    const personInfo = {
      "Pontuação da Camisa": shirtScore === "OUTRA" ? shirtOther : shirtScore,
      "Pontuação da Calça": pantsScore === "OUTRA" ? pantsOther : pantsScore,
      "Pontuação da Bota": bootsScore,
      "Nome no Crachá": badgeName,
    };
    console.log('Informações enviadas:', personInfo);
    // Aqui você pode enviar os dados para uma API, se desejar
  };

  if (showTicketForm) {
    return <TicketForm onBack={() => setShowTicketForm(false)} />;
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Informações para Contratação</h2>
      <p style={{ textAlign: 'center', color: '#444', marginBottom: 18 }}>
        Preencha os campos abaixo para cadastrar o colaborador.<br />
        <span style={{ fontSize: 13, color: '#0070f3' }}>
          Todos os campos são obrigatórios.
        </span>
      </p>
      {success && (
        <div className={styles.successMsg}>
          Informações enviadas com sucesso!
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.fieldsRow}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaTshirt className={styles.icon} /> Pontuação da Camisa
            </label>
            <select
              className={styles.inputField}
              value={shirtScore}
              onChange={e => setShirtScore(e.target.value)}
              required
            >
              {shirtOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {shirtScore === "OUTRA" && (
              <input
                className={styles.inputField}
                type="text"
                value={shirtOther}
                onChange={e => setShirtOther(e.target.value)}
                required
                placeholder="Digite a pontuação da camisa"
                style={{ marginTop: 8 }}
              />
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <GiTrousers className={styles.icon} /> Pontuação da Calça
            </label>
            <select
              className={styles.inputField}
              value={pantsScore}
              onChange={e => setPantsScore(e.target.value)}
              required
            >
              {pantsOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {pantsScore === "OUTRA" && (
              <input
                className={styles.inputField}
                type="text"
                value={pantsOther}
                onChange={e => setPantsOther(e.target.value)}
                required
                placeholder="Digite a pontuação da calça"
                style={{ marginTop: 8 }}
              />
            )}
          </div>
        </div>
        <div className={styles.fieldsRow}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <GiBoots className={styles.icon} /> Pontuação da Bota
            </label>
            <select
              className={styles.inputField}
              value={bootsScore}
              onChange={e => setBootsScore(e.target.value)}
              required
            >
              {bootsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>
              <FaUserTag className={styles.icon} /> Nome no Crachá
              <span style={{ color: '#888', fontSize: 12, marginLeft: 2 }}>
                (como deve aparecer)
              </span>
            </label>
            <input
              className={styles.inputField}
              type="text"
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              required
              maxLength={40}
              placeholder="Ex: João da Silva"
            />
          </div>
        </div>
        <button className={styles.button} type="submit">
          Enviar Informações
        </button>
      </form>
    </div>
  );
};

export default HireForm;