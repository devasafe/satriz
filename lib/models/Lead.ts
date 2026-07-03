import mongoose, { Schema, type InferSchemaType } from "mongoose";

const LeadSchema = new Schema(
  {
    nome: { type: String, required: true },
    contato: { type: String, required: true },
    tipo: { type: String, default: "" },
    mensagem: { type: String, default: "" },
    origem: { type: String, enum: ["orcamento", "club", "criador"], default: "orcamento" },
    status: {
      type: String,
      enum: ["novo", "contato", "proposta", "fechado", "perdido"],
      default: "novo",
    },
  },
  { timestamps: true }
);

export type LeadType = InferSchemaType<typeof LeadSchema>;

const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export default Lead;
