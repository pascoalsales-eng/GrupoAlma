import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Heart, HeartHandshake, Menu, X, Phone, Mail, MapPin, Instagram, ChevronRight, ChevronDown, ChevronLeft,
  Users, Calendar, FileText, Wallet, PieChart as PieIcon, BarChart3, Download, Search, Plus, Trash2, Pencil,
  Check, LogIn, LogOut, Lock, UserPlus, Building2, Home as HomeIcon, ClipboardList, Stethoscope, Pill,
  Printer, Camera, MapPinned, Clock, ShieldCheck, AlertCircle, Info, Filter, ArrowLeft, Save, Landmark,
  Receipt, TrendingUp, TrendingDown, Package, Utensils, Car, Wrench, ShoppingBag, Gift, Copy, ExternalLink,
  Handshake, Loader2, CheckCircle2, XCircle, Eye, EyeOff, User, LayoutDashboard, ListChecks, Banknote,
  MessageCircle, ArrowRight, Quote, CalendarDays, ClipboardCheck, FolderOpen, Navigation, RefreshCw, Sparkles, Bell,
} from "lucide-react";

/* =========================================================================================
   DADOS INSTITUCIONAIS (reais, extraídos dos documentos oficiais do Grupo ALMA)
   ========================================================================================= */
const ORG = {
  nome: "Grupo ALMA",
  nomeCompleto: "Grupo ALMA — Amigos Lutando Por Um Mundo de Amor",
  slogan: "Quando as mãos se entrelaçam, a dor diminui.",
  cnpj: "03.932.032/0001-13",
  pix: "g.alma2013@hotmail.com",
  banco: "Banco do Brasil", agencia: "0118-0", contaCorrente: "47337-5",
  endereco: "Rua 12, nº 913 — Centro",
  bairro: "Jardim Arantes",
  cidade: "Orlândia/SP",
  cep: "14.620-000",
  enderecoCompleto: "Rua 12, nº 913 — Centro, Orlândia/SP — CEP 14.620-000",
  telefone: "(16) 99384-1525",
  whatsappNumero: "5516993841525",
  email: "g.alma2013@hotmail.com",
  instagram: "https://www.instagram.com/grupoalma_orlandia/",
  instagramHandle: "@grupoalma_orlandia",
  horario: "Segunda a Sexta, das 8h às 12:00 e das 13h30 às 17h00",
  fundacao: "2000",
  lat: -20.7159941,
  lng: -47.8916536,
};

const LOGO_DATA_URL = "data:image/jpeg;base64,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";

const WHATSAPP_MSG = encodeURIComponent("Olá! Vim pelo site do Grupo ALMA e gostaria de mais informações.");
const WHATSAPP_LINK = `https://wa.me/${ORG.whatsappNumero}?text=${WHATSAPP_MSG}`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${ORG.lat},${ORG.lng}`;
const MAP_TILE = { z: 15, x: 12024, y: 18312, markerLeftPct: 59.84, markerTopPct: 36.51 };

/* Prioridade das demandas do dia — cor de destaque e rótulo, usados no formulário, na lista e nos alertas */
const PRIORIDADE_COR = { alta: "#b3123a", media: "#b8860b", baixa: "#3d7a68" };
const PRIORIDADE_LABEL = { alta: "Alta", media: "Média", baixa: "Baixa" };
const ANTECEDENCIA_OPCOES = [
  { value: "0", label: "Na hora exata" }, { value: "5", label: "5 min antes" }, { value: "15", label: "15 min antes" },
  { value: "30", label: "30 min antes" }, { value: "60", label: "1h antes" }, { value: "120", label: "2h antes" },
];

/* Modelos de encaminhamento/solicitação inseridos no relatório técnico da visita */
const ENCAMINHAMENTO_TEMPLATES = [
  { key: "caps", label: "CAPS", texto: (nome) => `Encaminhamos ${nome}, acompanhado(a) pelo Grupo ALMA, ao Centro de Atenção Psicossocial (CAPS) do território, para avaliação e acompanhamento em saúde mental, considerando [descrever os sinais/sintomas observados durante o acompanhamento]. Solicita-se agendamento e retorno sobre a viabilidade do atendimento.` },
  { key: "cras", label: "CRAS", texto: (nome) => `Encaminhamos ${nome} e sua família ao Centro de Referência de Assistência Social (CRAS) de referência do território, para inclusão/atualização no Cadastro Único (CadÚnico) e avaliação de acesso a benefícios socioassistenciais, em razão da situação de vulnerabilidade social identificada durante o acompanhamento realizado pelo Grupo ALMA.` },
  { key: "creas", label: "CREAS", texto: (nome) => `Encaminhamos ${nome} ao Centro de Referência Especializado de Assistência Social (CREAS), para avaliação técnica e acompanhamento especializado, em função de [descrever a situação identificada que demanda atenção da Proteção Social Especial].` },
  { key: "farmacia", label: "Medicamento (Farmácia Pública)", texto: (nome) => `Solicita-se avaliação para dispensação, pela Farmácia Municipal/Componente Especializado da Assistência Farmacêutica, do(s) medicamento(s) [especificar nome do(s) medicamento(s)] prescrito(s) para ${nome}, tendo em vista a dificuldade de acesso relatada pela família e a importância da continuidade do tratamento oncológico.` },
  { key: "beneficio", label: "Benefício Eventual", texto: (nome) => `Solicita-se avaliação para concessão de Benefício Eventual (cesta básica/auxílio financeiro) em favor de ${nome} e sua família, em razão da situação de vulnerabilidade social e da redução de renda associada ao tratamento oncológico em curso.` },
];

/* Categorias fixas usadas no financeiro / transparência */
const CAT_DESPESA = {
  manutencao: "Manutenção",
  bens_duraveis: "Aquisição de Bens Duráveis",
  bens_consumo: "Bens de Consumo",
  material_expediente: "Material de Expediente",
  alimentos: "Alimentos",
  viagens: "Viagens / Transporte",
  medicamentos: "Medicamentos",
  servicos_terceiros: "Serviços de Terceiros",
  outro: "Outro",
};
const CAT_DESPESA_ICON = {
  manutencao: Wrench, bens_duraveis: Package, bens_consumo: ShoppingBag, material_expediente: FolderOpen,
  alimentos: Utensils, viagens: Car, medicamentos: Pill, servicos_terceiros: Handshake, outro: FileText,
};
const FONTE_RECEITA = {
  doacao_pf: "Doação Pessoa Física",
  doacao_pj: "Doação Pessoa Jurídica",
  convenio_municipal: "Convênio / Parceria Municipal",
  convenio_estadual: "Convênio / Parceria Estadual",
  bazar: "Bazar Solidário",
  evento_campanha: "Evento / Campanha",
  emenda_parlamentar: "Emenda Parlamentar",
  outro: "Outro",
};
const CHART_COLORS = ["#8a1a4c", "#ab2168", "#c43b82", "#d95c9a", "#e486b3", "#efacc9", "#24121a", "#c9a0b0"];

const AGRAVOS_PDU = [
  { key: "fragilizacao", label: "Fragilização dos vínculos familiares" },
  { key: "rompimento", label: "Rompimento dos vínculos familiares" },
  { key: "isolamento", label: "Isolamento" },
  { key: "ausenciaCuidador", label: "Ausência de cuidador" },
  { key: "semPoliticas", label: "Sem acesso a outras políticas públicas" },
  { key: "semRede", label: "Sem acesso à rede socioassistencial" },
];

/* Roteiro técnico de visita domiciliar — instrumento de triagem psicossocial de apoio,
   estruturado a partir de eixos usuais em visitas domiciliares da rede socioassistencial
   e do acompanhamento oncológico (moradia/saneamento, rede de apoio, sobrecarga do
   cuidador, adesão terapêutica, segurança alimentar, acesso a benefícios, encaminhamentos,
   autonomia e orientação sobre medicamentos). Recomenda-se validação pela equipe técnica
   (assistente social / responsável técnico) da instituição antes do uso clínico formal. */
const ROTEIRO_VISITA = [
  { key: "moradia", label: "Condições de moradia adequadas (saneamento básico, energia elétrica, ventilação)?" },
  { key: "redeFamiliar", label: "Paciente possui rede de apoio familiar presente e atuante?" },
  { key: "redeComunitaria", label: "Paciente possui rede de apoio comunitário / vizinhança?" },
  { key: "sobrecargaCuidador", label: "Há sinais de sobrecarga física ou emocional do cuidador principal?" },
  { key: "adesaoTratamento", label: "Paciente apresenta boa adesão ao tratamento oncológico?" },
  { key: "segurancaAlimentar", label: "Há segurança alimentar no domicílio (acesso regular a alimentos)?" },
  { key: "acessoBeneficios", label: "Paciente/família possui acesso a benefícios socioassistenciais (BPC, Bolsa Família etc.)?" },
  { key: "encamSaude", label: "Há necessidade de encaminhamento para a rede de saúde (UBS, CAPS, especialidades)?" },
  { key: "encamSocioassistencial", label: "Há necessidade de encaminhamento para a rede socioassistencial (CRAS/CREAS)?" },
  { key: "autonomiaAVD", label: "Paciente demonstra autonomia para atividades básicas do dia a dia?" },
  { key: "acessibilidade", label: "Ambiente domiciliar oferece condições de acessibilidade (se aplicável)?" },
  { key: "orientacaoMedicamentos", label: "Família foi orientada sobre o uso correto dos medicamentos?" },
];

/* =========================================================================================
   HELPERS
   ========================================================================================= */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const cx = (...a) => a.filter(Boolean).join(" ");
const fmtBRL = (n) => (Number(n) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const maskCPF = (v) => v.replace(/\D/g, "").slice(0, 11)
  .replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskTelefone = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length > 10) return d.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  if (d.length > 6) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  if (d.length > 2) return d.replace(/(\d{2})(\d{0,4})/, "($1) $2");
  return d.replace(/(\d{0,2})/, "($1");
};

/* Geração de payload Pix (BR Code / EMV — padrão Banco Central) para QR Code de cobrança */
function crc16Pix(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
function tlvPix(id, value) { return `${id}${String(value.length).padStart(2, "0")}${value}`; }
function semAcento(s) { return (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function montarPayloadPix({ chave, nome, cidade, valor, txid }) {
  const nomeSan = semAcento(nome || "GRUPO ALMA").toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 25) || "GRUPO ALMA";
  const cidadeSan = semAcento(cidade || "ORLANDIA").toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 15) || "ORLANDIA";
  const txidSan = (txid || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "***";
  const mai = tlvPix("00", "br.gov.bcb.pix") + tlvPix("01", chave);
  let payload = tlvPix("00", "01") + tlvPix("26", mai) + tlvPix("52", "0000") + tlvPix("53", "986");
  if (valor) payload += tlvPix("54", Number(valor).toFixed(2));
  payload += tlvPix("58", "BR") + tlvPix("59", nomeSan) + tlvPix("60", cidadeSan) + tlvPix("62", tlvPix("05", txidSan));
  payload += "6304";
  return payload + crc16Pix(payload);
}
function PixQRCode({ valor, txid, size = 240 }) {
  const payload = montarPayloadPix({ chave: ORG.pix, nome: ORG.nomeCompleto, cidade: "ORLANDIA", valor, txid });
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(payload); setCopiado(true); setTimeout(() => setCopiado(false), 2000); } catch { }
  };
  return (
    <div className="text-center">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(payload)}`} alt="QR Code Pix" width={size} height={size} className="mx-auto rounded-xl" style={{ border: "1px solid var(--line)" }} />
      <button onClick={copiar} className="text-xs font-bold mt-2.5 inline-flex items-center gap-1 ga-focus" style={{ color: "var(--rose-700)" }}>
        {copiado ? <><Check size={13} /> Código copiado</> : <><Copy size={13} /> Pix copia e cola</>}
      </button>
    </div>
  );
}

const fmtDate = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
};
const fmtDateTime = (iso) => {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleString("pt-BR"); } catch { return iso; }
};
const todayISO = () => new Date().toISOString().slice(0, 10);
const nowHHMM = () => new Date().toTimeString().slice(0, 5);
const calcIdade = (nascISO) => {
  if (!nascISO) return "";
  const b = new Date(nascISO); const t = new Date();
  let idade = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) idade--;
  return isNaN(idade) ? "" : idade;
};
const idadePaciente = (p) => calcIdade(p?.dataNascimento) || p?.idadeAproximada || "";

function fileToCompressedDataUrl(file, maxDim = 1000, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Falha ao carregar imagem"));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio); height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        const ctx2d = canvas.getContext("2d");
        ctx2d.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function captureLocation() {
  const geo = new Promise((resolve) => {
    if (!navigator.geolocation) { resolve({ error: "Geolocalização não suportada neste navegador." }); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude, lng: pos.coords.longitude,
        precisao: Math.round(pos.coords.accuracy), capturadoEm: new Date().toISOString(),
      }),
      (err) => resolve({ error: err.message || "Não foi possível obter a localização (permissão negada ou indisponível)." }),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
  const hardTimeout = new Promise((resolve) => setTimeout(() => resolve({ error: "Tempo esgotado ao tentar obter localização. Pode registrar manualmente." }), 9000));
  return Promise.race([geo, hardTimeout]);
}

/* =========================================================================================
   ESTILO GLOBAL — identidade visual em tons de rosa e preto
   ========================================================================================= */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Manrope:wght@400;500;600;700;800&display=swap');
      .ga-root{ font-family:'Manrope',system-ui,sans-serif; color:var(--ink); background:var(--paper); -webkit-font-smoothing:antialiased; }
      .ga-root, .ga-root *{ box-sizing:border-box; }
      .ga-root :root{}
      .ga-scope{
        --ink:#24121a; --ink-soft:#6b4a56; --ink-faint:#a9899370;
        --rose-900:#5c0f30; --rose-800:#7a1440; --rose-700:#ab2168; --rose-600:#c43b82;
        --rose-500:#d95c9a; --rose-400:#e486b3; --rose-300:#efacc9; --rose-200:#f6cee0;
        --rose-100:#fbe6f0; --rose-50:#fff5fa; --paper:#fffbfc; --line:#f1d7e3;
        --plum:#3d0d22; --creme:#fdf4ee;
      }
      .ga-display{ font-family:'Fraunces',Georgia,serif; }
      .ga-tabular{ font-variant-numeric: tabular-nums; }
      a{ color:inherit; text-decoration:none; }
      .ga-scope ::selection{ background:var(--rose-200); }
      .btn{ display:inline-flex; align-items:center; justify-content:center; gap:.5rem; font-weight:700; border-radius:999px;
            padding:.75rem 1.4rem; font-size:.92rem; border:1px solid transparent; cursor:pointer; transition:all .15s ease; white-space:nowrap; }
      .btn:disabled{ opacity:.55; cursor:not-allowed; }
      .btn-sm{ padding:.5rem 1rem; font-size:.82rem; }
      .btn-primary{ background:var(--rose-700); color:#fff; box-shadow:0 6px 16px -6px rgba(171,33,104,.55); }
      .btn-primary:hover:not(:disabled){ background:var(--rose-800); transform:translateY(-1px); }
      .btn-dark{ background:var(--ink); color:#fff; }
      .btn-dark:hover:not(:disabled){ background:#3a1f2b; }
      .btn-outline{ background:transparent; color:var(--rose-700); border-color:var(--rose-300); }
      .btn-outline:hover:not(:disabled){ background:var(--rose-50); border-color:var(--rose-700); }
      .btn-ghost{ background:transparent; color:var(--ink-soft); }
      .btn-ghost:hover:not(:disabled){ background:var(--rose-100); color:var(--ink); }
      .btn-danger{ background:#fff; color:#b3123a; border-color:#f3c3d0; }
      .btn-danger:hover:not(:disabled){ background:#fff0f4; }
      .btn-block{ width:100%; }
      .ga-card{ background:#fff; border:1px solid var(--line); border-radius:1.25rem; box-shadow:0 1px 2px rgba(92,15,48,.04), 0 10px 28px -16px rgba(92,15,48,.16); }
      .ga-input{ width:100%; border:1.5px solid var(--line); border-radius:.75rem; padding:.7rem .9rem; font:inherit; color:var(--ink);
                 background:#fff; transition:border-color .15s, box-shadow .15s; }
      .ga-input:focus{ outline:none; border-color:var(--rose-600); box-shadow:0 0 0 4px var(--rose-100); }
      .ga-input::placeholder{ color:#b89aa4; }
      textarea.ga-input{ resize:vertical; min-height:5rem; }
      .ga-label{ font-size:.78rem; font-weight:700; color:var(--ink-soft); margin-bottom:.4rem; display:block; letter-spacing:.02em; }
      .ga-section-head{ display:flex; align-items:center; gap:.5rem .7rem; flex-wrap:wrap; margin-bottom:1.1rem; }
      .ga-section-head .ga-section-icon{ width:34px; height:34px; border-radius:999px; background:var(--rose-100); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .ga-section-head .ga-section-label{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:.98rem; color:var(--rose-800); }
      .ga-section-head .ga-section-rule{ flex:1; min-width:20px; height:1px; background:linear-gradient(90deg,var(--line),transparent); }
      .ga-bead{ width:14px; height:14px; border-radius:999px; background:var(--rose-700); border:3px solid var(--paper); box-shadow:0 0 0 1.5px var(--rose-300); flex-shrink:0; }
      .ga-badge{ display:inline-flex; align-items:center; gap:.35rem; font-size:.72rem; font-weight:700; padding:.28rem .65rem; border-radius:999px; text-transform:uppercase; letter-spacing:.03em; }
      .ga-link:hover{ color:var(--rose-700); }
      .ga-focus:focus-visible{ outline:2px solid var(--rose-700); outline-offset:2px; }
      .ga-nav-item{ position:relative; padding:.4rem 0; font-weight:600; color:var(--ink-soft); }
      .ga-nav-item:hover, .ga-nav-item.active{ color:var(--rose-700); }
      .ga-nav-item.active::after{ content:''; position:absolute; left:0; right:0; bottom:-2px; height:2px; background:var(--rose-700); border-radius:2px; }
      .ga-section-alt{ background:var(--rose-50); }
      .ga-hero-bg{ background:radial-gradient(120% 140% at 15% 0%, var(--rose-100) 0%, var(--paper) 55%); }
      .ga-scroll-x{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
      table.ga-table{ width:100%; border-collapse:collapse; font-size:.86rem; }
      table.ga-table th{ text-align:left; font-size:.72rem; text-transform:uppercase; letter-spacing:.04em; color:var(--ink-soft); padding:.6rem .75rem; border-bottom:2px solid var(--line); white-space:nowrap; }
      table.ga-table td{ padding:.65rem .75rem; border-bottom:1px solid var(--line); vertical-align:top; }
      table.ga-table tr:hover td{ background:var(--rose-50); }
      .ga-sidebar-link{ display:flex; align-items:center; gap:.65rem; padding:.65rem .9rem; border-radius:.85rem; color:#f7dbe7; font-weight:600; font-size:.88rem; }
      .ga-sidebar-link:hover{ background:#3a1f2c; color:#fff; }
      .ga-sidebar-link.active{ background:var(--rose-700); color:#fff; }
      .ga-print-overlay{ display:none; }
      .ga-print-overlay.active{ display:block; position:fixed; inset:0; background:#fff; z-index:9999; overflow:auto; }
      @keyframes ga-draw{ from{ stroke-dashoffset: 400; } to{ stroke-dashoffset: 0; } }
      @keyframes ga-fade-up{ from{ opacity:0; transform:translateY(14px);} to{opacity:1; transform:translateY(0);} }
      .ga-animate-in{ animation: ga-fade-up .6s ease both; }
      .ga-ribbon-draw path{ stroke-dasharray:400; stroke-dashoffset:400; animation: ga-draw 1.8s ease forwards .2s; }
      @media (prefers-reduced-motion: reduce){ .ga-animate-in, .ga-ribbon-draw path{ animation:none !important; } }
      @media print{
        @page{ size:A4; margin:14mm; }
        .no-print{ display:none !important; }
        .app-shell{ display:none !important; }
        .ga-print-overlay{ position:static !important; }
        body{ background:#fff !important; }
        thead{ display:table-header-group; }
        tr{ break-inside:avoid; }
        .ga-card{ break-inside:avoid; }
      }
    `}</style>
  );
}

/* =========================================================================================
   ÍCONE / MARCA — motivo decorativo original (fita entrelaçada) + logo real da instituição
   ========================================================================================= */
function RibbonMark({ size = 40, color = "var(--rose-700)", animate = false, className = "", ...props }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 120 160" fill="none" className={cx(animate && "ga-ribbon-draw", className)} {...props}>
      <path d="M60,18 C42,18 24,34 32,54 C37,66 50,72 60,64 C70,72 83,66 88,54 C96,34 78,18 60,18 Z"
        stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46,62 C36,84 27,104 22,138" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M74,62 C84,84 93,104 98,138" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function OrgLogo({ size = 52, className = "" }) {
  return (
    <img src={LOGO_DATA_URL} alt="Logo do Grupo ALMA" width={size} height={size}
      className={cx("rounded-full object-cover", className)} style={{ width: size, height: size }} />
  );
}

function AddressMap({ height = 280 }) {
  const [failed, setFailed] = useState(false);
  const { z, x, y, markerLeftPct, markerTopPct } = MAP_TILE;
  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-full" style={{ background: "var(--rose-100)" }}>
        <MapPin size={32} color="var(--rose-700)" className="mb-3" />
        <p className="font-bold text-sm mb-1">{ORG.enderecoCompleto}</p>
        <p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>{ORG.bairro}, {ORG.cidade}</p>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><Button size="sm" icon={Navigation}>Abrir no Google Maps</Button></a>
      </div>
    );
  }
  const tiles = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) tiles.push({ dx, dy });
  return (
    <div className="relative overflow-hidden h-full" style={{ background: "var(--rose-100)" }}>
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {tiles.map((t) => (
          <img key={`${t.dx}-${t.dy}`} src={`https://tile.openstreetmap.org/${z}/${x + t.dx}/${y + t.dy}.png`} alt="" draggable={false}
            onError={() => { if (t.dx === 0 && t.dy === 0) setFailed(true); }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ))}
      </div>
      <div className="absolute" style={{ left: `${markerLeftPct}%`, top: `${markerTopPct}%`, transform: "translate(-50%,-100%)" }}>
        <MapPin size={36} color="#ab2168" strokeWidth={2.5} style={{ filter: "drop-shadow(0 3px 5px rgba(36,18,26,.45))" }} />
      </div>
      <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 ga-focus">
        <Button size="sm" variant="dark" icon={Navigation}>Abrir no Google Maps</Button>
      </a>
    </div>
  );
}

/* =========================================================================================
   PRIMITIVOS DE UI
   ========================================================================================= */
function Button({ variant = "primary", size = "md", icon: Icon, iconRight, className = "", children, ...props }) {
  return (
    <button className={cx("btn ga-focus", `btn-${variant}`, size === "sm" && "btn-sm", className)} {...props}>
      {Icon && <Icon size={size === "sm" ? 15 : 17} />}
      {children}
      {iconRight && React.createElement(iconRight, { size: size === "sm" ? 15 : 17 })}
    </button>
  );
}

const Card = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={cx("ga-card", className)} {...props}>{children}</div>
));

function Field({ label, required, hint, error, children, className = "", style }) {
  return (
    <div className={className} style={style}>
      {label && <label className="ga-label">{label}{required && <span style={{ color: "var(--rose-700)" }}> *</span>}</label>}
      {children}
      {hint && !error && <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>{hint}</p>}
      {error && <p className="text-xs mt-1 font-semibold" style={{ color: "#b3123a" }}>{error}</p>}
    </div>
  );
}

const Input = React.forwardRef((props, ref) => <input ref={ref} className={cx("ga-input", props.className)} {...props} />);
const Textarea = React.forwardRef((props, ref) => <textarea ref={ref} className={cx("ga-input", props.className)} {...props} />);
function Select({ options, placeholder, className = "", ...props }) {
  return (
    <select className={cx("ga-input", className)} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
function Checkbox({ label, checked, onChange, className = "" }) {
  return (
    <label className={cx("flex items-center gap-2 cursor-pointer select-none", className)}>
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)}
        style={{ width: 18, height: 18, accentColor: "var(--rose-700)" }} />
      <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{label}</span>
    </label>
  );
}

function YesNoField({ label, value, onChange, note, onNoteChange }) {
  return (
    <div className="py-3" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <p className="text-sm font-semibold flex-1 min-w-[220px]" style={{ color: "var(--ink)" }}>{label}</p>
        <div className="flex gap-1.5 shrink-0">
          {[["sim", "Sim"], ["nao", "Não"]].map(([v, l]) => (
            <button key={v} type="button" onClick={() => onChange(v)}
              className="btn btn-sm ga-focus" style={{
                background: value === v ? (v === "sim" ? "var(--rose-700)" : "var(--ink)") : "#fff",
                color: value === v ? "#fff" : "var(--ink-soft)", border: "1.5px solid " + (value === v ? "transparent" : "var(--line)"),
              }}>{l}</button>
          ))}
        </div>
      </div>
      {onNoteChange && (
        <input className="ga-input mt-2" placeholder="Observação (opcional)" value={note || ""}
          onChange={(e) => onNoteChange(e.target.value)} style={{ fontSize: ".85rem" }} />
      )}
    </div>
  );
}

function Badge({ tone = "pink", children, className = "" }) {
  const tones = {
    pink: { background: "var(--rose-100)", color: "var(--rose-800)" },
    ink: { background: "var(--ink)", color: "#fff" },
    success: { background: "#e3f5ea", color: "#1a7a45" },
    warning: { background: "#fdeecb", color: "#8a5a08" },
    neutral: { background: "#f2eef0", color: "var(--ink-soft)" },
  };
  return <span className={cx("ga-badge", className)} style={tones[tone]}>{children}</span>;
}

function Modal({ open, onClose, title, children, wide, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(36,18,26,.55)" }} onClick={onClose}>
      <div className={cx("ga-card w-full shadow-2xl flex flex-col overflow-hidden", wide ? "max-w-3xl" : "max-w-lg")}
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 shrink-0" style={{ borderBottom: "1px solid var(--line)" }}>
          <h3 className="ga-display text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="btn-ghost btn p-2" style={{ borderRadius: "999px" }}><X size={18} /></button>
        </div>
        <div className="p-5 overflow-y-auto flex-1" style={{ minHeight: 0 }}>{children}</div>
        {footer && <div className="p-4 shrink-0" style={{ borderTop: "1px solid var(--line)", background: "#fff" }}>{footer}</div>}
      </div>
    </div>
  );
}

function ConfirmModal({ open, title = "Confirmar exclusão", message, onConfirm, onCancel, confirmLabel = "Excluir" }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}
      footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={onCancel}>Cancelar</Button><Button variant="danger" className="flex-1" icon={Trash2} onClick={onConfirm}>{confirmLabel}</Button></div>}>
      <div className="flex items-start gap-3">
        <AlertCircle size={22} color="#b3123a" className="shrink-0 mt-0.5" />
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{message}</p>
      </div>
    </Modal>
  );
}

function EmptyState({ icon: Icon = Info, title, description, action }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="inline-flex items-center justify-center rounded-full mb-4" style={{ width: 64, height: 64, background: "var(--rose-100)" }}>
        <Icon size={28} color="var(--rose-700)" />
      </div>
      <h3 className="ga-display text-lg font-semibold mb-1.5">{title}</h3>
      {description && <p className="text-sm max-w-sm mx-auto mb-5" style={{ color: "var(--ink-soft)" }}>{description}</p>}
      {action}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone = "pink" }) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className="rounded-2xl flex items-center justify-center shrink-0" style={{ width: 52, height: 52, background: tone === "ink" ? "var(--ink)" : "var(--rose-100)" }}>
        <Icon size={22} color={tone === "ink" ? "#fff" : "var(--rose-700)"} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold ga-tabular truncate" style={{ color: "var(--ink)" }}>{value}</p>
        <p className="text-xs font-semibold" style={{ color: "var(--ink-soft)" }}>{label}</p>
      </div>
    </Card>
  );
}

function StatThread({ items }) {
  return (
    <div className="relative">
      <div className="absolute sm:hidden" style={{ left: 28, top: 10, bottom: 10, width: 2, background: "linear-gradient(180deg,var(--rose-300),var(--rose-100) 92%)" }} />
      <div className="hidden sm:block absolute" style={{ left: "16%", right: "16%", top: 28, height: 2, background: "linear-gradient(90deg,var(--rose-100),var(--rose-300) 50%,var(--rose-100))" }} />
      <div className="relative flex flex-col sm:flex-row gap-7 sm:gap-4">
        {items.map((it, i) => (
          <div key={i} className="flex sm:flex-col items-center gap-4 sm:gap-3 sm:flex-1 sm:text-center">
            <div className="relative z-10 rounded-full flex items-center justify-center shrink-0" style={{ width: 56, height: 56, background: it.tone === "ink" ? "var(--ink)" : "#fff", border: "3px solid " + (it.tone === "ink" ? "var(--ink)" : "var(--rose-300)") }}>
              <it.icon size={22} color={it.tone === "ink" ? "#fff" : "var(--rose-700)"} />
            </div>
            <div className="min-w-0">
              <p className="ga-display font-semibold ga-tabular" style={{ fontSize: "1.7rem", color: "var(--ink)", lineHeight: 1 }}>{it.value}</p>
              <p className="text-xs font-bold mt-1.5" style={{ color: "var(--ink-soft)" }}>{it.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span style={{ width: 26, height: 2, background: "var(--rose-500)", borderRadius: 2, display: "inline-block", flexShrink: 0 }} />
      <span className="ga-display italic" style={{ fontSize: ".95rem", color: "var(--rose-700)" }}>{children}</span>
    </div>
  );
}

function SectionHeader({ icon: Icon, right, children }) {
  return (
    <div className="ga-section-head">
      <div className="ga-section-icon">{Icon && <Icon size={15} color="var(--rose-700)" />}</div>
      <p className="ga-section-label">{children}</p>
      <div className="ga-section-rule" />
      {right}
    </div>
  );
}

function Spinner({ size = 20 }) { return <Loader2 size={size} className="animate-spin" style={{ color: "var(--rose-700)" }} />; }

function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[10000] flex flex-col gap-2 no-print" style={{ maxWidth: 320 }}>
      {toasts.map((t) => (
        <div key={t.id} className="ga-card shadow-xl px-4 py-3 flex items-center gap-2.5 ga-animate-in"
          style={{ background: t.type === "error" ? "#fff0f2" : "var(--ink)", color: t.type === "error" ? "#b3123a" : "#fff", border: "none" }}>
          {t.type === "error" ? <XCircle size={18} /> : <CheckCircle2 size={18} color="var(--rose-300)" />}
          <span className="text-sm font-semibold">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

function DemandaAlertHost({ ctx }) {
  const { db, update } = ctx;
  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 20000);
    return () => clearInterval(id);
  }, []);

  const hoje = todayISO();
  const agoraMin = new Date().getHours() * 60 + new Date().getMinutes();
  const ativos = (db.demandas || []).filter((d) => {
    if (d.status === "concluido" || !d.hora || d.data !== hoje || d.alertaDispensadoEm === hoje) return false;
    const [hh, mm] = d.hora.split(":").map(Number);
    if (Number.isNaN(hh) || Number.isNaN(mm)) return false;
    const alvoMin = hh * 60 + mm - (Number(d.antecedenciaMin) || 0);
    return agoraMin >= alvoMin;
  }).sort((a, b) => a.hora.localeCompare(b.hora));

  if (ativos.length === 0) return null;
  const dispensar = (id) => update("demandas", (arr) => arr.map((d) => (d.id === id ? { ...d, alertaDispensadoEm: hoje } : d)));
  const concluir = (id) => update("demandas", (arr) => arr.map((d) => (d.id === id ? { ...d, status: "concluido" } : d)));

  return (
    <div className="no-print" style={{ position: "fixed", top: 16, right: 16, width: "calc(100% - 32px)", maxWidth: 360, zIndex: 10000, display: "flex", flexDirection: "column", gap: 10 }}>
      {ativos.slice(0, 3).map((d) => (
        <div key={d.id} className="ga-card shadow-2xl p-4 flex items-start gap-3 ga-animate-in" style={{ borderLeft: `4px solid ${PRIORIDADE_COR[d.prioridade]}` }}>
          <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 34, height: 34, background: PRIORIDADE_COR[d.prioridade] + "1c" }}>
            <Bell size={16} color={PRIORIDADE_COR[d.prioridade]} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">{d.titulo}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>Previsto para {d.hora} · Prioridade {PRIORIDADE_LABEL[d.prioridade].toLowerCase()}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" icon={Check} onClick={() => concluir(d.id)}>Concluir</Button>
              <Button size="sm" variant="ghost" onClick={() => dispensar(d.id)}>Fechar</Button>
            </div>
          </div>
        </div>
      ))}
      {ativos.length > 3 && <p className="text-xs text-center font-bold ga-card shadow-2xl py-2" style={{ color: "var(--ink-soft)" }}>+{ativos.length - 3} outro(s) lembrete(s) em aberto</p>}
    </div>
  );
}

/* ---- Documento para impressão (cabeçalho / rodapé padronizados) ---- */
function PrintHeader({ subtitle }) {
  return (
    <div className="flex items-center gap-4 pb-4 mb-5" style={{ borderBottom: "3px solid var(--ink)" }}>
      <OrgLogo size={64} />
      <div className="flex-1">
        <p className="ga-display font-bold" style={{ fontSize: "1.15rem" }}>{ORG.nomeCompleto}</p>
        <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>{ORG.enderecoCompleto} — Tel/WhatsApp: {ORG.telefone}</p>
        <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>CNPJ: {ORG.cnpj} · {ORG.horario}</p>
      </div>
    </div>
  );
}
function PrintFooterSignature({ signerName, signerRole, gps, capturedAt, extraLine }) {
  return (
    <div className="mt-10 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="grid grid-cols-2 gap-8 mb-6" style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>
        <p><strong>Data/hora do registro:</strong> {capturedAt ? fmtDateTime(capturedAt) : "—"}</p>
        <p><strong>Localização (GPS):</strong> {gps && gps.lat ? `${gps.lat.toFixed(5)}, ${gps.lng.toFixed(5)} (±${gps.precisao}m)` : "Não capturada"}</p>
      </div>
      {extraLine}
      <div className="mt-10 pt-2 text-center" style={{ borderTop: "1px solid var(--ink)", maxWidth: 340, marginLeft: "auto", marginRight: "auto" }}>
        <p className="font-semibold">{signerName || "________________________________"}</p>
        <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>{signerRole || "Responsável técnico"} — {ORG.nome}</p>
      </div>
    </div>
  );
}
function PrintPage({ title, children, onBack }) {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 450);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="ga-root min-h-screen" style={{ background: "#e9e2e5" }}>
      <div className="no-print sticky top-0 z-10 flex items-center justify-between px-4 py-3" style={{ background: "var(--ink)", color: "#fff" }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ color: "#fff" }}><ArrowLeft size={16} />Voltar</button>
        <p className="text-sm font-semibold hidden sm:block">{title}</p>
        <Button size="sm" icon={Printer} onClick={() => window.print()}>Gerar PDF / Imprimir</Button>
      </div>
      <div className="max-w-3xl mx-auto bg-white my-6 p-8 md:p-12 shadow-xl" style={{ minHeight: "70vh" }}>
        {children}
      </div>
    </div>
  );
}

/* =========================================================================================
   CAMADA DE DADOS (window.storage) — coleções compartilhadas entre a equipe da instituição
   ========================================================================================= */
const COLLECTIONS = ["pacientes", "visitas", "financeiro", "convenios", "usuarios", "impacto", "demandas", "mensagens", "eventos", "atendimentos", "documentos", "parcerias", "lancamentosParceria", "sorteios", "pedidosSorteio"];

const DEFAULT_IMPACTO = { pessoasAtendidas: 0, familiasApoiadas: 0, campanhasRealizadas: 0, voluntarios: 0, funcionarios: 0, prestadoresServico: 0, atualizadoEm: new Date().toISOString() };

function seedDemoData() {
  return {
    usuarios: [{ id: uid(), nome: "Gestor(a)", email: "gestor@grupoalma.org", senha: "adminalma", cargo: "Coordenação", papel: "gestor", status: "ativo", criadoEm: new Date().toISOString() }],
    financeiro: [], impacto: DEFAULT_IMPACTO, convenios: [], eventos: [],
    pacientes: [], visitas: [], demandas: [], mensagens: [], atendimentos: [], documentos: [],
    parcerias: [], lancamentosParceria: [], sorteios: [], pedidosSorteio: [],
  };
}

function useDatabase() {
  const [db, setDb] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const seeds = seedDemoData();
      const entries = await Promise.all(COLLECTIONS.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          if (res && res.value) return [key, JSON.parse(res.value)];
          return [key, seeds[key] ?? []];
        } catch { return [key, seeds[key] ?? []]; }
      }));
      if (!alive) return;
      setDb(Object.fromEntries(entries));
    })();
    return () => { alive = false; };
  }, []);

  const update = useCallback((key, updater) => {
    setDb((prev) => {
      const current = prev ? prev[key] : undefined;
      const next = typeof updater === "function" ? updater(current) : updater;
      setSaving(true);
      window.storage.set(key, JSON.stringify(next), true).catch(() => {}).finally(() => setSaving(false));
      return { ...prev, [key]: next };
    });
  }, []);

  const resetAllData = useCallback(() => {
    const seeds = seedDemoData();
    COLLECTIONS.forEach((key) => {
      update(key, (current) => {
        const protegidos = key === "pacientes" && Array.isArray(current) ? current.filter((r) => r.protegido) : [];
        return [...protegidos, ...(seeds[key] ?? [])];
      });
    });
  }, [update]);

  return { db, update, loading: db === null, saving, resetAllData };
}

/* =========================================================================================
   NAVEGAÇÃO PÚBLICA
   ========================================================================================= */
const PUBLIC_NAV = [
  { key: "home", label: "Início" },
  { key: "quemsomos", label: "Quem Somos" },
  { key: "acolhimento", label: "Acolhimento" },
  { key: "transparencia", label: "Transparência" },
  { key: "impacto", label: "Impacto" },
  { key: "contato", label: "Onde nos encontrar" },
];

function PublicNav({ ctx }) {
  const [open, setOpen] = useState(false);
  const go = (key) => { ctx.setPublicPage(key); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <header className="sticky top-0 z-40 no-print" style={{ background: "rgba(255,251,252,.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-3 ga-focus">
          <OrgLogo size={44} />
          <div className="text-left hidden sm:block">
            <p className="ga-display font-bold leading-tight" style={{ fontSize: "1.05rem" }}>{ORG.nome}</p>
            <p style={{ fontSize: ".68rem", color: "var(--ink-soft)" }}>Amigos Lutando Por Um Mundo de Amor</p>
          </div>
        </button>
        <nav className="hidden lg:flex items-center gap-7">
          {PUBLIC_NAV.map((item) => (
            <button key={item.key} onClick={() => go(item.key)} className={cx("ga-nav-item text-sm ga-focus", ctx.publicPage === item.key && "active")}>{item.label}</button>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={() => ctx.setMode("login")} className="text-sm ga-focus" style={{ color: "var(--ink-soft)" }}>Acesso da equipe</button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" icon={MessageCircle}>WhatsApp</Button></a>
          <Button variant="primary" size="sm" icon={Heart} onClick={() => go("doacao")}>Doar</Button>
        </div>
        <button className="lg:hidden btn-ghost btn p-2" onClick={() => setOpen((o) => !o)} style={{ borderRadius: 999 }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-1">
          {PUBLIC_NAV.map((item) => (
            <button key={item.key} onClick={() => go(item.key)} className={cx("text-left py-2.5 px-2 rounded-lg font-semibold text-sm", ctx.publicPage === item.key ? "text-white" : "")}
              style={ctx.publicPage === item.key ? { background: "var(--rose-700)" } : { color: "var(--ink)" }}>{item.label}</button>
          ))}
          <button onClick={() => go("doacao")} className="text-left py-2.5 px-2 rounded-lg font-semibold text-sm" style={{ color: "var(--rose-700)" }}>Fazer uma doação</button>
          <button onClick={() => ctx.setMode("login")} className="text-left py-2.5 px-2 rounded-lg font-semibold text-sm" style={{ color: "var(--ink-soft)" }}>Acesso da equipe</button>
        </div>
      )}
    </header>
  );
}

function WhatsAppFAB() {
  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="no-print fixed z-40 flex items-center justify-center shadow-2xl ga-focus"
      style={{ bottom: 22, right: 22, width: 58, height: 58, borderRadius: "999px", background: "#25D366" }} aria-label="Conversar no WhatsApp">
      <MessageCircle color="#fff" size={28} />
    </a>
  );
}

function PublicFooter({ ctx }) {
  return (
    <footer className="no-print" style={{ background: "var(--ink)", color: "#f3dbe6" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <OrgLogo size={44} />
            <p className="ga-display font-bold text-white">{ORG.nome}</p>
          </div>
          <p className="text-sm" style={{ color: "#d9b3c6" }}>{ORG.slogan}</p>
          <a href={ORG.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold ga-focus" style={{ color: "#f3dbe6" }}>
            <Instagram size={17} />{ORG.instagramHandle}
          </a>
        </div>
        <div>
          <p className="ga-display font-semibold mb-3" style={{ color: "#f3dbe6", fontSize: "1rem" }}>Navegação</p>
          <div className="flex flex-col gap-2">
            {PUBLIC_NAV.map((i) => <button key={i.key} onClick={() => { ctx.setPublicPage(i.key); window.scrollTo(0, 0); }} className="text-sm text-left ga-focus" style={{ color: "#d9b3c6" }}>{i.label}</button>)}
          </div>
        </div>
        <div>
          <p className="ga-display font-semibold mb-3" style={{ color: "#f3dbe6", fontSize: "1rem" }}>Contato</p>
          <div className="flex flex-col gap-2.5 text-sm" style={{ color: "#d9b3c6" }}>
            <span className="flex items-start gap-2"><MapPin size={16} className="shrink-0 mt-0.5" />{ORG.enderecoCompleto}</span>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 ga-focus"><Phone size={16} />{ORG.telefone}</a>
            <a href={`mailto:${ORG.email}`} className="flex items-center gap-2 ga-focus"><Mail size={16} />{ORG.email}</a>
            <span className="flex items-start gap-2"><Clock size={16} className="shrink-0 mt-0.5" />{ORG.horario}</span>
          </div>
        </div>
        <div>
          <p className="ga-display font-semibold mb-3" style={{ color: "#f3dbe6", fontSize: "1rem" }}>Institucional</p>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "#d9b3c6" }}>
            <span>CNPJ: {ORG.cnpj}</span>
            <span>Fundado em {ORG.fundacao}</span>
            <button onClick={() => ctx.setMode("login")} className="text-left font-semibold ga-focus" style={{ color: "#f3dbe6" }}>Acesso da equipe</button>
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-5" style={{ borderTop: "1px solid #3a1f2c", color: "#a9899c" }}>
        © {new Date().getFullYear()} {ORG.nomeCompleto}. Instituição filantrópica sem fins lucrativos.
      </div>
    </footer>
  );
}

/* =========================================================================================
   PÁGINAS PÚBLICAS
   ========================================================================================= */
function HomePage({ ctx }) {
  const eventos = (ctx.db.eventos || []).slice(0, 3);
  const ir = (p) => { ctx.setPublicPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const ajudas = [
    { icon: MapPinned, titulo: "Visita na sua casa", texto: "Uma técnica vai até a família, entende a situação e encaminha para o que for preciso — CRAS, CAPS, posto de saúde." },
    { icon: Package, titulo: "Empréstimo de equipamento", texto: "Cadeira de rodas, cama hospitalar, muletas, andador e cadeira de banho, emprestados sem custo enquanto durar a necessidade." },
    { icon: Pill, titulo: "Apoio com medicamentos", texto: "Ajudamos a conseguir na farmácia pública e, quando não tem, buscamos alternativa para o tratamento não parar." },
    { icon: ShoppingBag, titulo: "Bazar solidário", texto: "Roupas e utensílios a preço simbólico. É o bazar que sustenta boa parte do que fazemos durante o ano." },
  ];

  return (
    <div>
      {/* ---------- ABERTURA ---------- */}
      <section className="relative overflow-hidden" style={{ background: "var(--creme)" }}>
        <RibbonMark size={420} color="var(--rose-200)" className="absolute pointer-events-none" style={{ right: "-6%", top: "-14%", opacity: .55 }} />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-14 pb-16 md:pt-20 md:pb-20 relative">
          <p className="ga-display italic mb-4" style={{ color: "var(--rose-700)", fontSize: "1.05rem" }}>Grupo ALMA · Orlândia, desde {ORG.fundacao}</p>
          <h1 className="ga-display font-semibold mb-6" style={{ fontSize: "clamp(2.1rem,5.4vw,3.6rem)", lineHeight: 1.08, letterSpacing: "-.015em", maxWidth: "17ch" }}>
            Ninguém enfrenta o câncer sozinho em Orlândia.
          </h1>
          <p className="mb-9" style={{ color: "var(--ink-soft)", fontSize: "1.1rem", lineHeight: 1.65, maxWidth: "54ch" }}>
            Somos um grupo de voluntários da cidade que caminha junto com quem está em tratamento e com a
            família em volta. Empréstimo de equipamento, ajuda com remédio, visita em casa, conversa. Sem custo,
            sem burocracia.
          </p>

          <div className="grid md:grid-cols-2 gap-4" style={{ maxWidth: 760 }}>
            <div className="p-6 flex flex-col" style={{ background: "var(--plum)", color: "#fff", borderRadius: "22px 22px 22px 4px" }}>
              <p className="ga-display font-semibold mb-2" style={{ fontSize: "1.35rem" }}>Preciso de ajuda</p>
              <p className="text-sm mb-5 flex-1" style={{ color: "#e8c4d6", lineHeight: 1.6 }}>
                Para você ou alguém da sua família em tratamento. Fale com a gente pelo WhatsApp — atendemos de
                segunda a sexta e a conversa fica entre nós.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="btn-block" icon={MessageCircle}>Chamar no WhatsApp</Button>
              </a>
              <button onClick={() => ir("contato")} className="text-sm font-semibold mt-3 ga-focus text-left" style={{ color: "#e8c4d6" }}>
                Prefere vir até aqui? Veja o endereço
              </button>
            </div>

            <div className="p-6 flex flex-col" style={{ background: "#fff", border: "1.5px solid var(--rose-200)", borderRadius: "22px 22px 4px 22px" }}>
              <p className="ga-display font-semibold mb-2" style={{ fontSize: "1.35rem" }}>Quero ajudar</p>
              <p className="text-sm mb-5 flex-1" style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Doação pelo Pix, trabalho voluntário ou uma visita ao bazar. Tudo o que entra vira atendimento
                para as famílias daqui.
              </p>
              <Button className="btn-block" variant="dark" icon={Heart} onClick={() => ir("doacao")}>Fazer uma doação</Button>
              <button onClick={() => ir("transparencia")} className="text-sm font-semibold mt-3 ga-focus text-left" style={{ color: "var(--rose-700)" }}>
                Ver onde o dinheiro é aplicado
              </button>
            </div>
          </div>
        </div>
      </section>

      {(() => {
        const sorteioAtivo = (ctx.db.sorteios || []).find((s) => s.publicado && s.status !== "sorteado");
        if (!sorteioAtivo) return null;
        const vendidos = numerosVendidos(sorteioAtivo.id, ctx.db.pedidosSorteio || []);
        const totalNum = Number(sorteioAtivo.quantidadeNumeros) || 1;
        const pctVendido = Math.min(100, Math.round((vendidos / totalNum) * 100));
        return (
          <section className="py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 items-center p-7 md:p-10" style={{ background: "var(--plum)", color: "#fff", borderRadius: 26 }}>
                {sorteioAtivo.fotoBase64 ? (
                  <img src={sorteioAtivo.fotoBase64} alt={sorteioAtivo.titulo} className="w-full rounded-2xl" style={{ maxHeight: 260, objectFit: "cover" }} />
                ) : (
                  <div className="flex items-center justify-center rounded-2xl" style={{ height: 200, background: "#57132f" }}><Gift size={48} color="var(--rose-300)" /></div>
                )}
                <div>
                  <p className="ga-display italic mb-2" style={{ color: "#e8c4d6", fontSize: ".95rem" }}>Sorteio solidário no ar</p>
                  <h2 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.6rem,3.4vw,2.2rem)", lineHeight: 1.15 }}>{sorteioAtivo.titulo}</h2>
                  <p className="text-sm mb-5" style={{ color: "#e8c4d6", lineHeight: 1.6, maxWidth: "48ch" }}>
                    {(sorteioAtivo.premios || []).map((p) => p.nome).filter(Boolean).join(", ")} — números a partir de {fmtBRL(sorteioAtivo.valorCota)}.
                  </p>
                  <div className="mb-5" style={{ maxWidth: 340 }}>
                    <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: "#e8c4d6" }}><span>{pctVendido}% vendido</span><span>{totalNum - vendidos} restantes</span></div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.18)" }}><div className="h-full" style={{ width: `${pctVendido}%`, background: "var(--rose-400)" }} /></div>
                  </div>
                  <Button icon={Gift} onClick={() => { ctx.setSorteioPublicoId(sorteioAtivo.id); ir("sorteio"); }}>Quero participar</Button>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ---------- O QUE FAZEMOS ---------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="md:flex md:items-end md:justify-between gap-10 mb-10">
            <h2 className="ga-display font-semibold" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", lineHeight: 1.15, maxWidth: "16ch" }}>
              O que a gente faz, na prática
            </h2>
            <p className="text-sm mt-4 md:mt-0" style={{ color: "var(--ink-soft)", maxWidth: "42ch", lineHeight: 1.65 }}>
              Nada aqui é cobrado da família. O que sustenta esse trabalho é doação, bazar e parceria com o
              poder público — tudo prestado em <button onClick={() => ir("transparencia")} className="font-semibold ga-focus" style={{ color: "var(--rose-700)" }}>Transparência</button>.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
            {ajudas.map((a, i) => (
              <div key={a.titulo} className="flex gap-4" style={{ paddingTop: 18, borderTop: "2px solid " + (i === 0 ? "var(--rose-700)" : "var(--line)") }}>
                <a.icon size={24} color="var(--rose-700)" className="shrink-0 mt-0.5" />
                <div>
                  <p className="ga-display font-semibold mb-1.5" style={{ fontSize: "1.15rem" }}>{a.titulo}</p>
                  <p className="text-sm" style={{ color: "var(--ink-soft)", lineHeight: 1.65 }}>{a.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAIXA DE NÚMEROS ---------- */}
      <section className="relative overflow-hidden py-16 md:py-20" style={{ background: "var(--plum)", color: "#fff" }}>
        <RibbonMark size={300} color="#57132f" className="absolute pointer-events-none" style={{ left: "-5%", bottom: "-22%" }} />
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <p className="ga-display mb-10" style={{ fontSize: "clamp(1.5rem,3.2vw,2.1rem)", lineHeight: 1.3, maxWidth: "26ch" }}>
            São {new Date().getFullYear() - Number(ORG.fundacao)} anos de trabalho voluntário, mantidos pela
            própria cidade.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {[
              [ctx.db.impacto.pessoasAtendidas, "pessoas atendidas"],
              [ctx.db.impacto.familiasApoiadas, "famílias apoiadas"],
              [ctx.db.impacto.voluntarios, "voluntários ativos"],
              [ctx.db.impacto.campanhasRealizadas, "campanhas realizadas"],
            ].map(([valor, rotulo]) => (
              <div key={rotulo} style={{ borderTop: "1px solid #6b2946", paddingTop: 14 }}>
                <p className="ga-display font-semibold ga-tabular" style={{ fontSize: "clamp(2rem,4.5vw,2.8rem)", lineHeight: 1 }}>{valor}</p>
                <p className="text-sm mt-2" style={{ color: "#dba9c2" }}>{rotulo}</p>
              </div>
            ))}
          </div>
          <button onClick={() => ir("impacto")} className="inline-flex items-center gap-1.5 font-semibold mt-10 ga-focus" style={{ color: "#f0c3d8" }}>
            Ver o impacto em detalhe <ChevronRight size={17} />
          </button>
        </div>
      </section>

      {/* ---------- AGENDA ---------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <h2 className="ga-display font-semibold" style={{ fontSize: "clamp(1.6rem,3.2vw,2.1rem)" }}>Acontecendo agora</h2>
            <button onClick={() => ir("acolhimento")} className="font-semibold text-sm inline-flex items-center gap-1 ga-focus" style={{ color: "var(--rose-700)" }}>Ver tudo <ChevronRight size={15} /></button>
          </div>
          {eventos.length === 0 ? (
            <div className="py-10 px-6 text-center" style={{ background: "var(--creme)", borderRadius: 20 }}>
              <p className="ga-display font-semibold mb-1.5" style={{ fontSize: "1.2rem" }}>Nenhuma campanha no ar neste momento</p>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>As próximas ações e campanhas aparecem aqui assim que forem publicadas.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {eventos.map((e) => (
                <article key={e.id} className="p-6 h-full flex flex-col" style={{ background: "var(--creme)", borderRadius: 20 }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--rose-700)" }}>{fmtDate(e.data)}</p>
                  <p className="ga-display font-semibold mb-2" style={{ fontSize: "1.2rem", lineHeight: 1.25 }}>{e.titulo}</p>
                  <p className="text-sm flex-1" style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>{e.descricao}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- ONDE ENCONTRAR ---------- */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="p-7 md:p-12 grid md:grid-cols-[1.1fr_.9fr] gap-10" style={{ background: "var(--rose-100)", borderRadius: 26 }}>
            <div>
              <h2 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)", lineHeight: 1.2 }}>
                A porta está aberta de segunda a sexta
              </h2>
              <p className="text-sm mb-7" style={{ color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "46ch" }}>
                Não precisa de encaminhamento nem de agendamento para a primeira conversa. Chegue, ligue ou mande
                mensagem — a gente entende a situação e explica como podemos ajudar.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button icon={MessageCircle}>Chamar no WhatsApp</Button></a>
                <Button variant="outline" icon={MapPin} onClick={() => ir("contato")}>Como chegar</Button>
              </div>
            </div>
            <div className="text-sm space-y-4" style={{ color: "var(--ink-soft)" }}>
              <div>
                <p className="font-bold mb-0.5" style={{ color: "var(--ink)" }}>Endereço</p>
                <p>{ORG.endereco}</p>
                <p>{ORG.bairro} — {ORG.cidade}</p>
                <p>CEP {ORG.cep}</p>
              </div>
              <div>
                <p className="font-bold mb-0.5" style={{ color: "var(--ink)" }}>Horário</p>
                <p>{ORG.horario}</p>
              </div>
              <div>
                <p className="font-bold mb-0.5" style={{ color: "var(--ink)" }}>Telefone</p>
                <p>{ORG.telefone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuemSomosPage({ ctx }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <Eyebrow>Quem somos</Eyebrow>
      <h1 className="ga-display font-semibold mb-6" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Amigos lutando por um mundo de amor.</h1>
      <div className="grid md:grid-cols-[1fr_.7fr] gap-10 mb-16">
        <div className="space-y-4 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          <p>O <strong style={{ color: "var(--ink)" }}>Grupo ALMA</strong> é uma instituição filantrópica sem fins lucrativos de Orlândia/SP, fundada em {ORG.fundacao}
            por um grupo de amigos decididos a cuidar de quem enfrenta o câncer no município. Trabalhamos, acima de tudo,
            no cuidado a pessoas que vivem o tratamento oncológico — e às famílias que caminham com elas.</p>
          <p>Nosso nome carrega o próprio sentido do trabalho: <em>Amigos Lutando Por Um Mundo de Amor</em>. Cada atendimento,
            visita, doação ou tarde de bazar nasce da mesma convicção — a de que ninguém deveria enfrentar essa fase sozinho.</p>
          <p>Somos mantidos por doações da comunidade, parcerias institucionais e pelo trabalho voluntário de quem acredita,
            como nós, que <em>"quando as mãos se entrelaçam, a dor diminui."</em></p>
        </div>
        <Card className="p-6 h-fit" style={{ background: "var(--rose-50)" }}>
          <p className="ga-display font-semibold mb-4">Em números</p>
          <div className="space-y-3">
            {[["Fundação", ORG.fundacao], ["CNPJ", ORG.cnpj], ["Município", "Orlândia/SP"], ["Atendimento", ORG.horario]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-sm py-2" style={{ borderBottom: "1px solid var(--line)" }}>
                <span className="font-semibold" style={{ color: "var(--ink-soft)" }}>{k}</span><span className="text-right font-bold">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {[
          { icon: Heart, title: "Missão", text: "Mobilizar a sociedade de Orlândia para oferecer acolhimento humanizado e apoio prático a pessoas em tratamento de câncer e às suas famílias, ajudando a atravessar essa jornada com dignidade e menos dor." },
          { icon: Sparkles, title: "Visão", text: "Ser reconhecido como referência municipal e regional em acolhimento a pacientes oncológicos, ampliando cada vez mais o alcance do cuidado e da rede de apoio às famílias." },
          { icon: HeartHandshake, title: "Valores", text: "Amor ao próximo, solidariedade, transparência, respeito à dignidade humana, trabalho voluntário e compromisso com quem confia no ALMA." },
        ].map((v, i) => (
          <div key={v.title} className="p-7 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8" style={{ borderTop: i > 0 ? "1px solid var(--line)" : "none" }}>
            <div className="flex md:flex-col items-center md:items-start gap-3 md:w-40 shrink-0">
              <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 44, height: 44, background: "var(--rose-100)" }}><v.icon size={20} color="var(--rose-700)" /></div>
              <p className="ga-display font-semibold text-lg">{v.title}</p>
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--ink-soft)" }}>{v.text}</p>
          </div>
        ))}
      </Card>
      <p className="text-xs mt-4" style={{ color: "var(--ink-faint)" }}>
        * Declaração de missão, visão e valores redigida a partir de pesquisa pública sobre a instituição; recomendamos revisão da diretoria antes da publicação final.
      </p>
    </div>
  );
}

function AcolhimentoPage({ ctx }) {
  const eventos = ctx.db.eventos || [];
  return (
    <div>
      <div className="ga-hero-bg py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <Eyebrow>O que fazemos</Eyebrow>
          <h1 className="ga-display font-semibold mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Acolhimento, apoio às famílias e campanhas.</h1>
          <p className="max-w-2xl" style={{ color: "var(--ink-soft)" }}>Conheça as frentes de trabalho do Grupo ALMA — do acompanhamento direto ao paciente até as campanhas que sustentam nossa missão.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-14">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Stethoscope, title: "Acolhimento ao paciente", text: "Cadastro, escuta e acompanhamento próximo de pessoas em tratamento oncológico no município, com visitas domiciliares e prontuário de atendimento." },
            { icon: Users, title: "Apoio às famílias", text: "Levantamento da situação socioeconômica e familiar de cada paciente, orientação sobre benefícios assistenciais e encaminhamentos para a rede de proteção social." },
            { icon: Gift, title: "Doação e empréstimo de equipamentos", text: "Empréstimo temporário de equipamentos e insumos aos pacientes em tratamento, mediante termo de responsabilidade." },
            { icon: ShoppingBag, title: "Bazar solidário", text: "Peças de roupa, calçados e acessórios com preços acessíveis — toda a renda é revertida em benefício direto dos pacientes atendidos." },
          ].map((v) => (
            <Card key={v.title} className="p-7 flex gap-4">
              <div className="shrink-0 rounded-2xl flex items-center justify-center" style={{ width: 52, height: 52, background: "var(--rose-100)" }}><v.icon size={22} color="var(--rose-700)" /></div>
              <div><p className="ga-display font-semibold mb-1.5">{v.title}</p><p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{v.text}</p></div>
            </Card>
          ))}
        </div>

        <Eyebrow>Campanhas e eventos</Eyebrow>
        <h2 className="ga-display font-semibold mb-6" style={{ fontSize: "1.6rem" }}>Agenda de ações</h2>
        {eventos.length === 0 ? (
          <EmptyState icon={CalendarDays} title="Nenhuma ação publicada" description="A equipe administrativa pode publicar campanhas, bazares e eventos pelo painel restrito." />
        ) : (
          <div className="space-y-4">
            {eventos.slice().sort((a, b) => (b.data || "").localeCompare(a.data || "")).map((e) => (
              <Card key={e.id} className="p-5 flex items-start gap-4">
                <div className="shrink-0 rounded-xl flex flex-col items-center justify-center px-3 py-2" style={{ background: "var(--ink)", color: "#fff", minWidth: 64 }}>
                  <span className="text-[10px] font-bold uppercase">{e.data ? new Date(e.data + "T00:00").toLocaleDateString("pt-BR", { month: "short" }) : "—"}</span>
                  <span className="text-lg font-extrabold leading-none">{e.data ? new Date(e.data + "T00:00").getDate() : "—"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><p className="font-bold">{e.titulo}</p><Badge tone={e.tipo === "campanha" ? "pink" : e.tipo === "evento" ? "ink" : "neutral"}>{e.tipo === "acao" ? "Ação" : e.tipo === "evento" ? "Evento" : "Campanha"}</Badge></div>
                  <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>{e.descricao}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TransparenciaCharts({ barData, pieData, height = 300 }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-5">
        <p className="font-bold mb-1">Receitas x Despesas por ano</p>
        <p className="text-xs mb-4" style={{ color: "var(--ink-soft)" }}>Valores somados a partir dos lançamentos da equipe administrativa</p>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <BarChart data={barData} margin={{ left: 4, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
              <XAxis dataKey="ano" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`} />
              <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--line)" }} />
              <Legend />
              <Bar dataKey="Receitas" fill={CHART_COLORS[1]} radius={[6, 6, 0, 0]} />
              <Bar dataKey="Despesas" fill={CHART_COLORS[6]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-5">
        <p className="font-bold mb-1">Despesas por categoria</p>
        <p className="text-xs mb-4" style={{ color: "var(--ink-soft)" }}>Manutenção, bens duráveis, bens de consumo, material de expediente, alimentos, viagens etc.</p>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={height / 2 - 40} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, i) => <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => fmtBRL(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function useTransparenciaData(db, filtros) {
  return useMemo(() => {
    const all = db.financeiro || [];
    const kw = filtros.palavraChave.trim().toLowerCase();
    const filtered = all.filter((e) => {
      if (filtros.ano !== "todos" && String(e.ano) !== String(filtros.ano)) return false;
      if (filtros.catFonte !== "todos") {
        const val = e.tipo === "despesa" ? "d:" + e.categoria : "r:" + e.fonte;
        if (val !== filtros.catFonte) return false;
      }
      if (kw) {
        const hay = `${e.descricao || ""} ${e.numeroNota || ""} ${CAT_DESPESA[e.categoria] || ""} ${FONTE_RECEITA[e.fonte] || ""}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
    const anos = [...new Set(all.map((e) => e.ano))].sort();
    const catFonteOptions = [
      ...Object.entries(CAT_DESPESA).filter(([k]) => all.some((e) => e.categoria === k)).map(([k, l]) => ({ value: "d:" + k, label: `Despesa · ${l}` })),
      ...Object.entries(FONTE_RECEITA).filter(([k]) => all.some((e) => e.fonte === k)).map(([k, l]) => ({ value: "r:" + k, label: `Receita · ${l}` })),
    ];
    const totalReceitas = filtered.filter((e) => e.tipo === "receita").reduce((s, e) => s + Number(e.valor || 0), 0);
    const totalDespesas = filtered.filter((e) => e.tipo === "despesa").reduce((s, e) => s + Number(e.valor || 0), 0);
    const barData = anos.map((ano) => ({
      ano,
      Receitas: filtered.filter((e) => e.ano === ano && e.tipo === "receita").reduce((s, e) => s + Number(e.valor || 0), 0),
      Despesas: filtered.filter((e) => e.ano === ano && e.tipo === "despesa").reduce((s, e) => s + Number(e.valor || 0), 0),
    }));
    const pieMap = {};
    filtered.filter((e) => e.tipo === "despesa").forEach((e) => { pieMap[e.categoria] = (pieMap[e.categoria] || 0) + Number(e.valor || 0); });
    const pieData = Object.entries(pieMap).map(([k, v]) => ({ name: CAT_DESPESA[k] || k, value: v }));
    return { filtered, anos, catFonteOptions, totalReceitas, totalDespesas, barData, pieData };
  }, [db.financeiro, filtros]);
}

function TransparenciaPage({ ctx }) {
  const [filtros, setFiltros] = useState({ ano: "todos", catFonte: "todos", palavraChave: "" });
  const { filtered, anos, catFonteOptions, totalReceitas, totalDespesas, barData, pieData } = useTransparenciaData(ctx.db, filtros);
  const hasExemplo = filtered.some((e) => e.exemplo);

  const exportarPDF = () => {
    ctx.openPrint("Prestação de Contas", (
      <div>
        <PrintHeader />
        <h2 className="ga-display font-bold text-xl mb-1">Prestação de Contas — {ORG.nome}</h2>
        <p className="text-xs mb-6" style={{ color: "var(--ink-soft)" }}>
          Gerado em {fmtDateTime(new Date().toISOString())} · Filtros: Ano: {filtros.ano === "todos" ? "Todos" : filtros.ano} ·
          Categoria/Fonte: {filtros.catFonte === "todos" ? "Todas" : (catFonteOptions.find((o) => o.value === filtros.catFonte)?.label || filtros.catFonte)} ·
          Palavra-chave: {filtros.palavraChave || "—"}
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-xl" style={{ background: "var(--rose-50)" }}><p className="text-xs font-semibold">Total arrecadado</p><p className="font-bold ga-tabular">{fmtBRL(totalReceitas)}</p></div>
          <div className="p-3 rounded-xl" style={{ background: "var(--rose-50)" }}><p className="text-xs font-semibold">Total de despesas</p><p className="font-bold ga-tabular">{fmtBRL(totalDespesas)}</p></div>
          <div className="p-3 rounded-xl" style={{ background: "var(--rose-50)" }}><p className="text-xs font-semibold">Saldo</p><p className="font-bold ga-tabular">{fmtBRL(totalReceitas - totalDespesas)}</p></div>
        </div>
        <TransparenciaCharts barData={barData} pieData={pieData} height={260} />
        <table className="ga-table mt-6">
          <thead><tr><th>Data</th><th>Tipo</th><th>Categoria/Fonte</th><th>Nº Nota</th><th>Descrição</th><th style={{ textAlign: "right" }}>Valor</th></tr></thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>{fmtDate(e.data)}</td><td>{e.tipo === "receita" ? "Receita" : "Despesa"}</td>
                <td>{e.tipo === "despesa" ? CAT_DESPESA[e.categoria] : FONTE_RECEITA[e.fonte]}</td>
                <td>{e.numeroNota || "—"}</td><td>{e.descricao}</td><td style={{ textAlign: "right" }} className="ga-tabular">{fmtBRL(e.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PrintFooterSignature signerName={ORG.nome} signerRole="Documento gerado automaticamente pelo sistema de transparência" capturedAt={new Date().toISOString()} />
      </div>
    ));
  };

  return (
    <div>
      <div className="ga-hero-bg py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Eyebrow>Prestação de contas</Eyebrow>
          <h1 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Transparência</h1>
          <p className="max-w-2xl" style={{ color: "var(--ink-soft)" }}>Recursos recebidos e utilizados pelo Grupo ALMA, com dados lançados pela equipe administrativa — disponíveis à sociedade e ao Tribunal de Contas.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {hasExemplo && (
          <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: "#fdeecb", color: "#8a5a08" }}>
            <AlertCircle size={17} className="shrink-0" /> Modo demonstração: alguns lançamentos abaixo são dados de exemplo, não valores reais da instituição.
          </div>
        )}
        <Card className="p-5 mb-8">
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3 items-end">
            <Field label="Ano"><Select value={filtros.ano} onChange={(e) => setFiltros((f) => ({ ...f, ano: e.target.value }))} options={anos.map((a) => ({ value: a, label: a }))} placeholder="Todos os anos" /></Field>
            <Field label="Tipo / Fonte de recurso"><Select value={filtros.catFonte} onChange={(e) => setFiltros((f) => ({ ...f, catFonte: e.target.value }))} options={catFonteOptions} placeholder="Todas" /></Field>
            <Field label="Palavra-chave"><Input value={filtros.palavraChave} onChange={(e) => setFiltros((f) => ({ ...f, palavraChave: e.target.value }))} placeholder="Buscar por nota, descrição..." /></Field>
            <Button variant="dark" icon={Download} onClick={exportarPDF}>Exportar PDF</Button>
          </div>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={TrendingUp} label="Total arrecadado" value={fmtBRL(totalReceitas)} />
          <StatCard icon={TrendingDown} label="Total de despesas" value={fmtBRL(totalDespesas)} tone="ink" />
          <StatCard icon={Wallet} label="Saldo no período" value={fmtBRL(totalReceitas - totalDespesas)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={BarChart3} title="Nenhum lançamento encontrado" description="Ajuste os filtros ou aguarde novos lançamentos da equipe administrativa." />
        ) : (
          <>
            <TransparenciaCharts barData={barData} pieData={pieData} />
            <Card className="mt-8 overflow-hidden">
              <div className="ga-scroll-x">
                <table className="ga-table">
                  <thead><tr><th>Data</th><th>Tipo</th><th>Categoria / Fonte</th><th>Nº Nota</th><th>Descrição</th><th style={{ textAlign: "right" }}>Valor</th></tr></thead>
                  <tbody>
                    {filtered.slice().sort((a, b) => (b.data || "").localeCompare(a.data || "")).map((e) => (
                      <tr key={e.id}>
                        <td className="ga-tabular">{fmtDate(e.data)}</td>
                        <td><Badge tone={e.tipo === "receita" ? "pink" : "ink"}>{e.tipo === "receita" ? "Receita" : "Despesa"}</Badge></td>
                        <td>{e.tipo === "despesa" ? CAT_DESPESA[e.categoria] : FONTE_RECEITA[e.fonte]}</td>
                        <td className="ga-tabular">{e.numeroNota || "—"}</td>
                        <td className="max-w-[220px] truncate">{e.descricao}</td>
                        <td className="text-right font-bold ga-tabular">{fmtBRL(e.valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <Eyebrow>Vínculos institucionais</Eyebrow>
        <h2 className="ga-display font-semibold mb-1" style={{ fontSize: "1.5rem" }}>Convênios e parcerias</h2>
        <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Vínculos institucionais que sustentam o trabalho do Grupo ALMA.</p>
        {(ctx.db.convenios || []).length === 0 ? (
          <EmptyState icon={Handshake} title="Nenhum convênio publicado" description="Os convênios e parcerias da instituição aparecerão aqui." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(ctx.db.convenios || []).map((c) => (
              <Card key={c.id} className="p-5">
                {c.divulgar ? (
                  <><p className="font-bold text-sm mb-1">{c.nome}</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>{c.tipo || "Convênio"}</p></>
                ) : (
                  <><p className="font-bold text-sm mb-1" style={{ color: "var(--ink-faint)" }}>Em Lançamento</p><p className="text-xs" style={{ color: "var(--ink-faint)" }}>Detalhes serão publicados em breve.</p></>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {(ctx.db.parcerias || []).some((p) => p.divulgar) && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <Eyebrow>Recursos públicos</Eyebrow>
          <h2 className="ga-display font-semibold mb-1" style={{ fontSize: "1.5rem" }}>Parcerias e prestação de contas</h2>
          <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Termos de colaboração, fomento e convênios firmados com o poder público, conforme a Lei nº 13.019/2014.</p>
          <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
            <thead><tr><th>Parceria</th><th>Órgão parceiro</th><th>Objeto</th><th>Vigência</th><th>Valor</th><th>Situação</th></tr></thead>
            <tbody>{(ctx.db.parcerias || []).filter((p) => p.divulgar).map((p) => (
              <tr key={p.id}>
                <td className="font-semibold">{p.numero}</td>
                <td>{p.orgao}</td>
                <td className="text-xs">{p.objeto || "—"}</td>
                <td className="text-xs ga-tabular">{fmtDate(p.vigenciaInicio)} a {p.vigenciaFim ? fmtDate(p.vigenciaFim) : "—"}</td>
                <td className="ga-tabular font-semibold">{fmtBRL(p.valorTotal)}</td>
                <td><Badge tone={p.status === "vigente" ? "success" : p.status === "prestada" ? "pink" : "neutral"}>{p.status}</Badge></td>
              </tr>
            ))}</tbody>
          </table></div></Card>
        </div>
      )}
    </div>
  );
}

function ImpactoPage({ ctx }) {
  const imp = ctx.db.impacto;
  const stats = [
    { icon: Users, label: "Pessoas atendidas", value: imp.pessoasAtendidas },
    { icon: HeartHandshake, label: "Famílias apoiadas", value: imp.familiasApoiadas },
    { icon: CalendarDays, label: "Campanhas realizadas", value: imp.campanhasRealizadas },
    { icon: Handshake, label: "Voluntários", value: imp.voluntarios },
    { icon: Building2, label: "Funcionários", value: imp.funcionarios },
    { icon: Stethoscope, label: "Prestadores de serviço", value: imp.prestadoresServico },
  ];
  return (
    <div>
      <div className="ga-hero-bg py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <Eyebrow>Nosso impacto</Eyebrow>
          <h1 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>O que o cuidado em conjunto constrói.</h1>
          <p className="max-w-2xl" style={{ color: "var(--ink-soft)" }}>Números atualizados pela equipe do Grupo ALMA, refletindo o trabalho diário de acolhimento em Orlândia.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-14">
        {imp.exemplo && (
          <div className="mb-8 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: "#fdeecb", color: "#8a5a08" }}>
            <AlertCircle size={17} className="shrink-0" /> Números de demonstração — a equipe gestora pode atualizá-los no painel administrativo.
          </div>
        )}
        <div className="space-y-10 md:space-y-12">
          <StatThread items={stats.slice(0, 3)} />
          <StatThread items={stats.slice(3, 6).map((s) => ({ ...s, tone: "ink" }))} />
        </div>
        <p className="text-xs mt-6 text-center" style={{ color: "var(--ink-faint)" }}>Última atualização: {fmtDateTime(imp.atualizadoEm)}</p>
      </div>
    </div>
  );
}

function ContatoPage({ ctx }) {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const enviar = () => {
    if (!form.nome || !form.email || !form.mensagem) { ctx.showToast("Preencha nome, e-mail e mensagem.", "error"); return; }
    ctx.update("mensagens", (arr) => [{ id: uid(), ...form, data: new Date().toISOString(), lida: false }, ...(arr || [])]);
    setEnviado(true);
    ctx.showToast("Mensagem enviada com sucesso!");
  };

  const mailtoHref = `mailto:${ORG.email}?subject=${encodeURIComponent(form.assunto || "Contato pelo site")}&body=${encodeURIComponent(`Nome: ${form.nome}\nE-mail: ${form.email}\nTelefone: ${form.telefone}\n\n${form.mensagem}`)}`;

  return (
    <div>
      <div className="ga-hero-bg py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <Eyebrow>Fale com a gente</Eyebrow>
          <h1 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Onde nos encontrar</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <Card className="overflow-hidden mb-6" style={{ height: 280 }}>
            <AddressMap height={280} />
          </Card>
          <div className="space-y-3 text-sm mb-6">
            <p className="flex items-start gap-3"><MapPin size={18} className="shrink-0 mt-0.5" color="var(--rose-700)" />{ORG.enderecoCompleto}</p>
            <p className="flex items-center gap-3"><Clock size={18} color="var(--rose-700)" />{ORG.horario}</p>
            <p className="flex items-center gap-3"><Mail size={18} color="var(--rose-700)" /><a href={`mailto:${ORG.email}`} className="ga-focus font-semibold">{ORG.email}</a></p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button icon={MessageCircle}>Falar no WhatsApp</Button></a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"><Button variant="outline" icon={Navigation}>Ver no Google Maps</Button></a>
          </div>
        </div>
        <Card className="p-6 md:p-7">
          {enviado ? (
            <EmptyState icon={CheckCircle2} title="Mensagem enviada!" description="Nossa equipe vai responder o quanto antes. Obrigado por entrar em contato." action={<Button variant="outline" onClick={() => { setEnviado(false); setForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" }); }}>Enviar outra mensagem</Button>} />
          ) : (
            <div className="space-y-4">
              <p className="ga-display font-semibold text-lg mb-1">Formulário de contato</p>
              <Field label="Nome" required><Input value={form.nome} onChange={set("nome")} placeholder="Seu nome completo" /></Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="E-mail" required><Input type="email" value={form.email} onChange={set("email")} placeholder="voce@email.com" /></Field>
                <Field label="Telefone"><Input value={form.telefone} onChange={set("telefone")} placeholder="(16) 90000-0000" /></Field>
              </div>
              <Field label="Assunto"><Input value={form.assunto} onChange={set("assunto")} placeholder="Sobre o que deseja falar?" /></Field>
              <Field label="Mensagem" required><Textarea rows={5} value={form.mensagem} onChange={set("mensagem")} placeholder="Escreva sua mensagem..." /></Field>
              <Button className="btn-block" icon={Mail} onClick={enviar}>Enviar mensagem</Button>
              <a href={mailtoHref} className="text-xs font-semibold text-center block ga-focus" style={{ color: "var(--ink-soft)" }}>ou envie diretamente pelo seu aplicativo de e-mail</a>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function DoacaoPage({ ctx }) {
  const [copiado, setCopiado] = useState(false);
  const copiarPix = async () => {
    try { await navigator.clipboard.writeText(ORG.pix); setCopiado(true); setTimeout(() => setCopiado(false), 2000); } catch { ctx.showToast("Não foi possível copiar. Chave Pix: " + ORG.pix, "error"); }
  };
  return (
    <div>
      <div className="ga-hero-bg py-14 md:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <RibbonMark size={48} className="mx-auto mb-4" animate />
          <Eyebrow>Sua ajuda transforma</Eyebrow>
          <h1 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Faça uma doação</h1>
          <p style={{ color: "var(--ink-soft)" }}>Cada contribuição sustenta o acolhimento, os equipamentos emprestados e o cuidado direto às famílias atendidas pelo Grupo ALMA.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-2 gap-8">
        <Card className="p-8 text-center" style={{ background: "var(--ink)", color: "#fff" }}>
          <Gift size={32} color="var(--rose-300)" className="mx-auto mb-3" />
          <p className="ga-display font-semibold text-lg mb-1">Doação via Pix</p>
          <p className="text-sm mb-5" style={{ color: "#d9b3c6" }}>Chave Pix (CNPJ)</p>
          <div className="rounded-xl px-4 py-3 font-mono text-sm mb-4 ga-tabular" style={{ background: "#3a1f2c" }}>{ORG.pix}</div>
          <Button className="btn-block" onClick={copiarPix} icon={copiado ? Check : Copy}>{copiado ? "Chave copiada!" : "Copiar chave Pix"}</Button>
        </Card>
        <div className="space-y-5">
          <Card className="p-6"><ShoppingBag size={22} color="var(--rose-700)" className="mb-2" /><p className="font-bold mb-1">Doe roupas e itens para o bazar</p><p className="text-sm" style={{ color: "var(--ink-soft)" }}>Peças em bom estado ajudam a sustentar o bazar solidário, revertido integralmente aos pacientes.</p></Card>
          <Card className="p-6"><Handshake size={22} color="var(--rose-700)" className="mb-2" /><p className="font-bold mb-1">Seja voluntário</p><p className="text-sm" style={{ color: "var(--ink-soft)" }}>Fale com a gente pelo WhatsApp para conhecer as frentes de trabalho voluntário disponíveis.</p></Card>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="btn-block" icon={MessageCircle}>Tirar dúvidas sobre doações</Button></a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   AUTENTICAÇÃO DA EQUIPE (protótipo — ver observações de segurança no resumo final)
   ========================================================================================= */
function LoginPage({ ctx }) {
  const [email, setEmail] = useState(""); const [senha, setSenha] = useState(""); const [showPw, setShowPw] = useState(false); const [erro, setErro] = useState("");
  const entrar = () => {
    const u = (ctx.db.usuarios || []).find((x) => x.email.toLowerCase() === email.toLowerCase().trim());
    if (!u) { setErro("E-mail não encontrado."); return; }
    if (u.status === "pendente") { setErro("Seu cadastro ainda aguarda aprovação de um administrador."); return; }
    if (u.status === "inativo") { setErro("Este acesso está inativo. Fale com a coordenação."); return; }
    if (u.senha !== senha) { setErro("Senha incorreta."); return; }
    ctx.setUsuario(u); ctx.setMode("admin"); ctx.setAdminPage("dashboard"); ctx.showToast(`Bem-vindo(a), ${u.nome.split(" ")[0]}!`);
  };
  return (
    <div className="ga-root ga-scope min-h-screen flex items-center justify-center p-4 ga-hero-bg">
      <div className="w-full max-w-md">
        <button onClick={() => ctx.setMode("public")} className="flex items-center gap-2 mb-6 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar ao site</button>
        <Card className="p-8">
          <div className="text-center mb-6"><OrgLogo size={64} className="mx-auto mb-3" /><p className="ga-display font-semibold text-xl">Acesso restrito</p><p className="text-sm" style={{ color: "var(--ink-soft)" }}>Área da equipe administrativa</p></div>
          <div className="space-y-4">
            <Field label="E-mail"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@grupoalma.org.br" /></Field>
            <Field label="Senha">
              <div className="relative">
                <Input type={showPw ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && entrar()} />
                <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPw((s) => !s)} type="button">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </Field>
            {erro && <p className="text-sm font-semibold" style={{ color: "#b3123a" }}>{erro}</p>}
            <Button className="btn-block" icon={LogIn} onClick={entrar}>Entrar</Button>
          </div>
          <div className="mt-5 p-3 rounded-xl text-xs" style={{ background: "var(--rose-50)", color: "var(--ink-soft)" }}>
            <strong>Acesso padrão:</strong> gestor@grupoalma.org / adminalma
          </div>
          <button onClick={() => ctx.setMode("cadastro")} className="w-full text-center text-sm font-bold mt-5 ga-focus" style={{ color: "var(--rose-700)" }}>Sou da equipe e ainda não tenho acesso →</button>
        </Card>
      </div>
    </div>
  );
}

function CadastroPage({ ctx }) {
  const [form, setForm] = useState({ nome: "", email: "", cargo: "", senha: "" });
  const [enviado, setEnviado] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const enviar = () => {
    if (!form.nome || !form.email || !form.senha) { ctx.showToast("Preencha todos os campos obrigatórios.", "error"); return; }
    if ((ctx.db.usuarios || []).some((u) => u.email.toLowerCase() === form.email.toLowerCase())) { ctx.showToast("Já existe um cadastro com este e-mail.", "error"); return; }
    ctx.update("usuarios", (arr) => [...(arr || []), { id: uid(), ...form, papel: "colaborador", status: "pendente", criadoEm: new Date().toISOString() }]);
    setEnviado(true);
  };
  return (
    <div className="ga-root ga-scope min-h-screen flex items-center justify-center p-4 ga-hero-bg">
      <div className="w-full max-w-md">
        <button onClick={() => ctx.setMode("login")} className="flex items-center gap-2 mb-6 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar ao login</button>
        <Card className="p-8">
          {enviado ? (
            <EmptyState icon={ClipboardCheck} title="Cadastro enviado!" description={`Um administrador precisa aprovar seu acesso antes que você possa entrar. Isso é feito no painel "Usuários", verificando o e-mail informado (${form.email}).`} action={<Button onClick={() => ctx.setMode("login")}>Voltar ao login</Button>} />
          ) : (
            <>
              <div className="text-center mb-6"><UserPlus size={40} color="var(--rose-700)" className="mx-auto mb-2" /><p className="ga-display font-semibold text-xl">Solicitar acesso</p><p className="text-sm" style={{ color: "var(--ink-soft)" }}>Seu cadastro será analisado pela coordenação</p></div>
              <div className="space-y-4">
                <Field label="Nome completo" required><Input value={form.nome} onChange={set("nome")} /></Field>
                <Field label="E-mail institucional" required><Input type="email" value={form.email} onChange={set("email")} /></Field>
                <Field label="Cargo / função"><Input value={form.cargo} onChange={set("cargo")} placeholder="Ex: Assistente social, Financeiro..." /></Field>
                <Field label="Senha" required><Input type="password" value={form.senha} onChange={set("senha")} /></Field>
                <Button className="btn-block" icon={UserPlus} onClick={enviar}>Enviar cadastro</Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

/* =========================================================================================
   PAINEL ADMINISTRATIVO — shell fixo (sidebar/topbar) + páginas por módulo
   ========================================================================================= */
const ADMIN_NAV = [
  { key: "dashboard", label: "Painel", icon: LayoutDashboard },
  { key: "financeiro", label: "Financeiro", icon: Wallet },
  { key: "pacientes", label: "Pacientes", icon: ClipboardList },
  { key: "visitas", label: "Visitas / PDU", icon: MapPinned },
  { key: "atendimentos", label: "Atendimentos", icon: Pill },
  { key: "convenios", label: "Convênios", icon: Handshake },
  { key: "parcerias", label: "Parcerias / Prestação", icon: Landmark },
  { key: "sorteios", label: "Sorteios", icon: Gift },
  { key: "documentos", label: "Documentos", icon: FileText },
  { key: "demandas", label: "Demandas do dia", icon: ListChecks },
  { key: "impacto", label: "Impacto (editar)", icon: TrendingUp },
  { key: "conteudo", label: "Conteúdo do site", icon: CalendarDays },
  { key: "usuarios", label: "Usuários", icon: Users },
];

function AdminSidebar({ ctx }) {
  const [open, setOpen] = useState(false);
  const pendentes = (ctx.db.usuarios || []).filter((u) => u.status === "pendente").length;
  const content = (
    <div className="h-full flex flex-col p-4" style={{ background: "var(--ink)" }}>
      <div className="flex items-center gap-3 px-2 py-3 mb-4">
        <OrgLogo size={40} /><div><p className="font-bold text-white text-sm leading-tight">{ORG.nome}</p><p className="text-[11px]" style={{ color: "#c9a0b0" }}>Painel administrativo</p></div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {ADMIN_NAV.map((item) => (
          <button key={item.key} onClick={() => { ctx.setAdminPage(item.key); setOpen(false); }} className={cx("ga-sidebar-link w-full ga-focus", ctx.adminPage === item.key && "active")}>
            <item.icon size={17} /><span className="flex-1 text-left">{item.label}</span>
            {item.key === "usuarios" && pendentes > 0 && <span className="text-[10px] font-extrabold rounded-full px-1.5 py-0.5" style={{ background: "#fdeecb", color: "#8a5a08" }}>{pendentes}</span>}
          </button>
        ))}
      </nav>
      <button onClick={() => ctx.setMode("public")} className="ga-sidebar-link ga-focus mt-2"><HomeIcon size={17} />Ver site público</button>
      <button onClick={() => { ctx.setUsuario(null); ctx.setMode("public"); }} className="ga-sidebar-link ga-focus" style={{ color: "#f3b6c9" }}><LogOut size={17} />Sair</button>
    </div>
  );
  return (
    <>
      <aside className="hidden lg:block no-print" style={{ width: 250, flexShrink: 0 }}>{content}</aside>
      <button onClick={() => setOpen(true)} className="lg:hidden fixed top-4 left-4 z-30 btn btn-dark btn-sm no-print" style={{ borderRadius: 999 }}><Menu size={16} /></button>
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 no-print" onClick={() => setOpen(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,.5)" }} />
          <div className="absolute left-0 top-0 bottom-0" style={{ width: 260 }} onClick={(e) => e.stopPropagation()}>{content}</div>
        </div>
      )}
    </>
  );
}

function AdminTopbar({ ctx }) {
  const current = ADMIN_NAV.find((i) => i.key === ctx.adminPage);
  return (
    <div className="no-print flex items-center justify-between px-5 md:px-8 h-16 shrink-0" style={{ background: "#fff", borderBottom: "1px solid var(--line)" }}>
      <p className="ga-display font-semibold text-lg pl-10 lg:pl-0">{current?.label}</p>
      <div className="flex items-center gap-3">
        {ctx.saving && <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--ink-soft)" }}><Loader2 size={13} className="animate-spin" />salvando</span>}
        <div className="text-right hidden sm:block"><p className="text-sm font-bold leading-tight">{ctx.usuario.nome}</p><p className="text-[11px]" style={{ color: "var(--ink-soft)" }}>{ctx.usuario.cargo || "Equipe"}</p></div>
        <div className="rounded-full flex items-center justify-center font-bold text-white" style={{ width: 36, height: 36, background: "var(--rose-700)" }}>{ctx.usuario.nome[0]}</div>
      </div>
    </div>
  );
}

function AdminShell({ ctx }) {
  const Page = {
    dashboard: AdminDashboard, financeiro: AdminFinanceiro, impacto: AdminImpactoEdit, convenios: AdminConvenios,
    demandas: AdminDemandas, pacientes: AdminPacientes, visitas: AdminVisitas, atendimentos: AdminAtendimentos,
    documentos: AdminDocumentos, usuarios: AdminUsuarios, conteudo: AdminConteudoSite, parcerias: AdminParcerias, sorteios: AdminSorteios,
  }[ctx.adminPage] || AdminDashboard;
  return (
    <div className="ga-root ga-scope min-h-screen flex" style={{ background: "var(--rose-50)" }}>
      <AdminSidebar ctx={ctx} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar ctx={ctx} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto"><Page ctx={ctx} /></main>
      </div>
      <DemandaAlertHost ctx={ctx} />
    </div>
  );
}

/* ---- páginas administrativas (implementadas nas próximas etapas) ---- */
function AdminDashboard({ ctx }) {
  const { db, usuario, setAdminPage, resetAllData, setUsuario, setMode, showToast } = ctx;
  const pacientes = db.pacientes || [], visitas = db.visitas || [], financeiro = db.financeiro || [], demandas = db.demandas || [], usuarios = db.usuarios || [];
  const pendentes = usuarios.filter((u) => u.status === "pendente").length;
  const mesAtual = todayISO().slice(0, 7);
  const visitasMes = visitas.filter((v) => (v.data || "").startsWith(mesAtual)).length;
  const saldo = financeiro.reduce((s, e) => s + (e.movimentoConta ? 0 : e.tipo === "receita" ? Number(e.valor || 0) : -Number(e.valor || 0)), 0);
  const demandasPendentes = demandas.filter((d) => d.status !== "concluido").length;
  const [confirmandoReset, setConfirmandoReset] = useState(false);

  const executarReset = () => {
    if (!confirmandoReset) { setConfirmandoReset(true); setTimeout(() => setConfirmandoReset(false), 5000); return; }
    resetAllData();
    showToast("Sistema zerado. Faça login novamente com o acesso padrão.");
    setTimeout(() => { setUsuario(null); setMode("public"); }, 600);
  };

  return (
    <div className="space-y-8">
      <div><p className="ga-display text-2xl font-semibold">Olá, {usuario.nome.split(" ")[0]}.</p><p style={{ color: "var(--ink-soft)" }}>Resumo do Grupo ALMA hoje, {fmtDate(todayISO())}.</p></div>

      <Card className="p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3"><RefreshCw size={20} color="var(--ink-soft)" className="shrink-0" />
          <div><p className="font-bold text-sm">Zerar todos os dados do sistema</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>Apaga pacientes, visitas, financeiro, convênios, eventos e usuários, voltando ao acesso padrão (gestor@grupoalma.org). Pacientes e documentos marcados como "protegidos" não são apagados.</p></div>
        </div>
        <Button variant={confirmandoReset ? "danger" : "outline"} size="sm" onClick={executarReset}>{confirmandoReset ? "Clique novamente para confirmar" : "Zerar sistema"}</Button>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardList} label="Pacientes cadastrados" value={pacientes.length} />
        <StatCard icon={MapPinned} label="Visitas este mês" value={visitasMes} tone="ink" />
        <StatCard icon={Wallet} label="Saldo financeiro" value={fmtBRL(saldo)} />
        <StatCard icon={ListChecks} label="Demandas em aberto" value={demandasPendentes} tone="ink" />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Button icon={Plus} onClick={() => setAdminPage("pacientes")}>Novo paciente</Button>
        <Button variant="outline" icon={MapPinned} onClick={() => setAdminPage("visitas")}>Registrar visita</Button>
        <Button variant="outline" icon={Wallet} onClick={() => setAdminPage("financeiro")}>Lançar financeiro</Button>
      </div>

      {pendentes > 0 && (
        <Card className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3"><Users size={20} color="var(--rose-700)" /><p className="font-semibold text-sm">{pendentes} cadastro(s) de equipe aguardando aprovação</p></div>
          <Button size="sm" variant="outline" onClick={() => setAdminPage("usuarios")}>Revisar agora</Button>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5">
          <p className="font-bold mb-3">Últimos lançamentos financeiros</p>
          {financeiro.filter((e) => !e.movimentoConta).length === 0 ? <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Nenhum lançamento ainda.</p> : (
            <div className="space-y-2">
              {financeiro.filter((e) => !e.movimentoConta).slice().sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || "")).slice(0, 5).map((e) => (
                <div key={e.id} className="flex justify-between text-sm py-1.5" style={{ borderBottom: "1px solid var(--line)" }}>
                  <span className="truncate pr-2">{e.descricao || (e.tipo === "despesa" ? CAT_DESPESA[e.categoria] : FONTE_RECEITA[e.fonte])}</span>
                  <span className="font-bold ga-tabular shrink-0" style={{ color: e.tipo === "receita" ? "var(--rose-700)" : "var(--ink)" }}>{e.tipo === "receita" ? "+" : "-"}{fmtBRL(e.valor)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-5">
          <p className="font-bold mb-3">Últimas visitas registradas</p>
          {visitas.length === 0 ? <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Nenhuma visita registrada ainda.</p> : (
            <div className="space-y-2">
              {visitas.slice().sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || "")).slice(0, 5).map((v) => {
                const p = pacientes.find((p) => p.id === v.pacienteId);
                return (<div key={v.id} className="flex justify-between text-sm py-1.5" style={{ borderBottom: "1px solid var(--line)" }}><span className="truncate pr-2">{p?.nome || "Paciente"}</span><span className="text-xs shrink-0" style={{ color: "var(--ink-soft)" }}>{fmtDate(v.data)}</span></div>);
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
function AdminFinanceiro({ ctx }) {
  const { db, update, usuario, showToast } = ctx;
  const [tab, setTab] = useState("lancamentos");
  const [modalOpen, setModalOpen] = useState(false);
  const emptyForm = { tipo: "receita", data: todayISO(), valor: "", categoria: "", fonte: "", descricao: "", numeroNota: "", conta: "", anexoNome: "", anexoBase64: "" };
  const [form, setForm] = useState(emptyForm);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [uploading, setUploading] = useState(false);

  const todos = (db.financeiro || []).filter((e) => !e.movimentoConta);
  const lancamentos = todos.filter((e) => filtroTipo === "todos" || e.tipo === filtroTipo).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const totalReceitas = todos.filter((e) => e.tipo === "receita").reduce((s, e) => s + Number(e.valor || 0), 0);
  const totalDespesas = todos.filter((e) => e.tipo === "despesa").reduce((s, e) => s + Number(e.valor || 0), 0);

  const onFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try { const b64 = await fileToCompressedDataUrl(file); setForm((f) => ({ ...f, anexoNome: file.name, anexoBase64: b64 })); }
    catch { showToast("Não foi possível anexar a imagem.", "error"); }
    setUploading(false);
  };

  const salvar = () => {
    if (!form.valor || Number(form.valor) <= 0) { showToast("Informe um valor válido.", "error"); return; }
    if (form.tipo === "despesa" && !form.categoria) { showToast("Selecione a categoria da despesa.", "error"); return; }
    if (form.tipo === "receita" && !form.fonte) { showToast("Selecione a fonte do recurso.", "error"); return; }
    const novo = { id: uid(), ...form, valor: Number(form.valor), ano: Number(form.data.slice(0, 4)), responsavel: usuario.nome, exemplo: false, criadoEm: new Date().toISOString() };
    update("financeiro", (arr) => [novo, ...(arr || [])]);
    showToast("Lançamento registrado — já disponível na aba de Transparência.");
    setForm(emptyForm); setModalOpen(false);
  };
  const remover = (id) => { update("financeiro", (arr) => arr.filter((e) => e.id !== id)); showToast("Lançamento removido."); };

  const [tForm, setTForm] = useState({ data: todayISO(), tipo: "transferencia", conta: "", valor: "", descricao: "" });
  const salvarTransferencia = () => {
    if (!tForm.valor) { showToast("Informe um valor.", "error"); return; }
    update("financeiro", (arr) => [{ id: uid(), movimentoConta: true, ...tForm, valor: Number(tForm.valor), responsavel: usuario.nome, criadoEm: new Date().toISOString() }, ...(arr || [])]);
    setTForm({ data: todayISO(), tipo: "transferencia", conta: "", valor: "", descricao: "" });
    showToast("Movimentação registrada.");
  };
  const movimentos = (db.financeiro || []).filter((e) => e.movimentoConta).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Total arrecadado" value={fmtBRL(totalReceitas)} />
        <StatCard icon={TrendingDown} label="Total de despesas" value={fmtBRL(totalDespesas)} tone="ink" />
        <StatCard icon={Wallet} label="Saldo" value={fmtBRL(totalReceitas - totalDespesas)} />
      </div>
      <div className="flex gap-5 mb-6" style={{ borderBottom: "1px solid var(--line)" }}>
        {[["lancamentos", "Lançamentos (receitas e despesas)"], ["banco", "Conta bancária e transferências"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-0.5 pb-3 text-sm font-bold" style={{ color: tab === k ? "var(--rose-700)" : "var(--ink-soft)", borderBottom: tab === k ? "2px solid var(--rose-700)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>

      {tab === "lancamentos" ? (
        <>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} options={[{ value: "todos", label: "Todos" }, { value: "receita", label: "Receitas" }, { value: "despesa", label: "Despesas" }]} style={{ width: 180 }} />
            <Button icon={Plus} onClick={() => { setForm(emptyForm); setModalOpen(true); }}>Novo lançamento</Button>
          </div>
          {lancamentos.length === 0 ? <EmptyState icon={Wallet} title="Nenhum lançamento" description="Registre receitas e despesas para alimentar a aba pública de Transparência." /> : (
            <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
              <thead><tr><th>Data</th><th>Tipo</th><th>Categoria/Fonte</th><th>Nota</th><th>Anexo</th><th style={{ textAlign: "right" }}>Valor</th><th></th></tr></thead>
              <tbody>{lancamentos.map((e) => (
                <tr key={e.id}>
                  <td className="ga-tabular">{fmtDate(e.data)}</td>
                  <td><Badge tone={e.tipo === "receita" ? "pink" : "ink"}>{e.tipo === "receita" ? "Receita" : "Despesa"}</Badge></td>
                  <td>{e.tipo === "despesa" ? CAT_DESPESA[e.categoria] : FONTE_RECEITA[e.fonte]}{e.exemplo && <span className="text-[10px] ml-1.5 font-bold" style={{ color: "#8a5a08" }}>EXEMPLO</span>}</td>
                  <td className="ga-tabular">{e.numeroNota || "—"}</td>
                  <td>{e.anexoBase64 ? <a href={e.anexoBase64} target="_blank" rel="noopener noreferrer" className="ga-focus" style={{ color: "var(--rose-700)" }}><Camera size={15} /></a> : "—"}</td>
                  <td className="text-right font-bold ga-tabular">{fmtBRL(e.valor)}</td>
                  <td><button onClick={() => remover(e.id)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button></td>
                </tr>
              ))}</tbody>
            </table></div></Card>
          )}
        </>
      ) : (
        <div className="grid lg:grid-cols-[1fr_.9fr] gap-6">
          <Card className="p-5 overflow-hidden">
            <p className="font-bold mb-4">Movimentações de conta</p>
            {movimentos.length === 0 ? <EmptyState icon={Landmark} title="Nenhuma movimentação" description="Registre depósitos, saques e transferências entre contas." /> : (
              <div className="ga-scroll-x"><table className="ga-table"><thead><tr><th>Data</th><th>Tipo</th><th>Conta</th><th>Descrição</th><th style={{ textAlign: "right" }}>Valor</th></tr></thead>
                <tbody>{movimentos.map((m) => (<tr key={m.id}><td className="ga-tabular">{fmtDate(m.data)}</td><td className="capitalize">{m.tipo}</td><td>{m.conta}</td><td>{m.descricao}</td><td className="text-right ga-tabular">{fmtBRL(m.valor)}</td></tr>))}</tbody>
              </table></div>
            )}
          </Card>
          <Card className="p-5 h-fit">
            <p className="font-bold mb-4">Nova movimentação</p>
            <div className="space-y-3">
              <Field label="Data"><Input type="date" value={tForm.data} onChange={(e) => setTForm((f) => ({ ...f, data: e.target.value }))} /></Field>
              <Field label="Tipo"><Select value={tForm.tipo} onChange={(e) => setTForm((f) => ({ ...f, tipo: e.target.value }))} options={[{ value: "deposito", label: "Depósito" }, { value: "saque", label: "Saque" }, { value: "transferencia", label: "Transferência" }]} /></Field>
              <Field label="Conta"><Input value={tForm.conta} onChange={(e) => setTForm((f) => ({ ...f, conta: e.target.value }))} placeholder="Ex: Conta Corrente Banco X" /></Field>
              <Field label="Valor (R$)"><Input type="number" min="0" step="0.01" value={tForm.valor} onChange={(e) => setTForm((f) => ({ ...f, valor: e.target.value }))} /></Field>
              <Field label="Descrição"><Textarea rows={2} value={tForm.descricao} onChange={(e) => setTForm((f) => ({ ...f, descricao: e.target.value }))} /></Field>
              <Button className="btn-block" icon={Save} onClick={salvarTransferencia}>Registrar movimentação</Button>
            </div>
          </Card>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Novo lançamento" wide
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setModalOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={salvar}>Salvar lançamento</Button></div>}>
        <div className="space-y-4">
          <div className="flex gap-2">
            {[["receita", "Receita (entrada)"], ["despesa", "Despesa (saída)"]].map(([v, l]) => (
              <button key={v} onClick={() => setForm((f) => ({ ...f, tipo: v, categoria: "", fonte: "" }))} className="flex-1 btn" style={{ background: form.tipo === v ? (v === "receita" ? "var(--rose-700)" : "var(--ink)") : "#fff", color: form.tipo === v ? "#fff" : "var(--ink-soft)", border: "1.5px solid " + (form.tipo === v ? "transparent" : "var(--line)") }}>{l}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Data" required><Input type="date" value={form.data} onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))} /></Field>
            <Field label="Valor (R$)" required><Input type="number" min="0" step="0.01" value={form.valor} onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))} placeholder="0,00" /></Field>
          </div>
          {form.tipo === "despesa" ? (
            <Field label="Categoria da despesa" required><Select value={form.categoria} onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))} options={Object.entries(CAT_DESPESA).map(([v, l]) => ({ value: v, label: l }))} placeholder="Selecione..." /></Field>
          ) : (
            <Field label="Fonte do recurso" required><Select value={form.fonte} onChange={(e) => setForm((f) => ({ ...f, fonte: e.target.value }))} options={Object.entries(FONTE_RECEITA).map(([v, l]) => ({ value: v, label: l }))} placeholder="Selecione..." /></Field>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nº da nota fiscal / recibo"><Input value={form.numeroNota} onChange={(e) => setForm((f) => ({ ...f, numeroNota: e.target.value }))} /></Field>
            <Field label="Conta / forma"><Input value={form.conta} onChange={(e) => setForm((f) => ({ ...f, conta: e.target.value }))} placeholder="Ex: Pix, Conta Corrente..." /></Field>
          </div>
          <Field label="Descrição"><Textarea rows={2} value={form.descricao} onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))} /></Field>
          <Field label="Anexar cópia da nota fiscal (foto)" hint="Imagens são compactadas automaticamente antes de salvar.">
            <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files[0])} className="text-sm" />
            {uploading && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--ink-soft)" }}><Loader2 size={12} className="animate-spin" />processando imagem...</p>}
            {form.anexoBase64 && <img src={form.anexoBase64} alt="Anexo" className="mt-2 rounded-lg" style={{ maxHeight: 120 }} />}
          </Field>
        </div>
      </Modal>
    </div>
  );
}
function AdminImpactoEdit({ ctx }) {
  const { db, update, showToast } = ctx;
  const [form, setForm] = useState(db.impacto);
  useEffect(() => { setForm(db.impacto); }, [db.impacto]);
  const campos = [
    ["pessoasAtendidas", "Pessoas atendidas", Users, "Número preenchido manualmente pela equipe — não é a contagem automática de pacientes cadastrados no sistema."],
    ["familiasApoiadas", "Famílias apoiadas", HeartHandshake, null],
    ["campanhasRealizadas", "Campanhas realizadas", CalendarDays, null],
    ["voluntarios", "Voluntários", Handshake, null],
    ["funcionarios", "Funcionários", Building2, null],
    ["prestadoresServico", "Prestadores de serviço", Stethoscope, null],
  ];
  const salvar = () => { update("impacto", { ...form, atualizadoEm: new Date().toISOString() }); showToast("Números de impacto atualizados."); };
  return (
    <div className="max-w-2xl">
      <p style={{ color: "var(--ink-soft)" }} className="mb-6">Esses números aparecem publicamente na página "Impacto" do site. Todos os campos são de preenchimento livre pela equipe — nenhum é calculado automaticamente.</p>
      <Card className="p-6 grid sm:grid-cols-2 gap-5">
        {campos.map(([key, label, Icon, hint]) => (
          <Field label={label} key={key} hint={hint}>
            <div className="relative">
              <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--rose-700)" style={{ pointerEvents: "none" }} />
              <Input type="number" min="0" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: Number(e.target.value) }))} style={{ paddingLeft: 36 }} />
            </div>
          </Field>
        ))}
      </Card>
      <Button className="mt-5" icon={Save} onClick={salvar}>Salvar alterações</Button>
      <p className="text-xs mt-3" style={{ color: "var(--ink-faint)" }}>Última atualização: {fmtDateTime(db.impacto.atualizadoEm)}</p>
    </div>
  );
}
function AdminConvenios({ ctx }) {
  const { db, update, showToast } = ctx;
  const emptyForm = { nome: "", tipo: "", contato: "", divulgar: false };
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const salvar = () => {
    if (!form.nome) { showToast("Informe o nome do convênio.", "error"); return; }
    if (editId) { update("convenios", (arr) => arr.map((c) => (c.id === editId ? { ...c, ...form } : c))); showToast("Convênio atualizado."); }
    else { update("convenios", (arr) => [...(arr || []), { id: uid(), ...form }]); showToast("Convênio cadastrado."); }
    setForm(emptyForm); setEditId(null);
  };
  const editar = (c) => { setForm({ nome: c.nome, tipo: c.tipo, contato: c.contato, divulgar: !!c.divulgar }); setEditId(c.id); };
  const remover = (id) => { update("convenios", (arr) => arr.filter((c) => c.id !== id)); if (editId === id) { setEditId(null); setForm(emptyForm); } };
  return (
    <div className="grid lg:grid-cols-[1fr_.9fr] gap-6">
      <Card className="p-5 overflow-hidden">
        <p className="font-bold mb-4">Convênios cadastrados</p>
        {(db.convenios || []).length === 0 ? <EmptyState icon={Handshake} title="Nenhum convênio" description="Cadastre os convênios usados no registro de atendimentos." /> : (
          <div className="ga-scroll-x"><table className="ga-table"><thead><tr><th>Nome</th><th>Tipo</th><th>Contato</th><th>No site</th><th></th></tr></thead>
            <tbody>{(db.convenios || []).map((c) => (
              <tr key={c.id}><td className="font-semibold">{c.nome}{c.exemplo && <span className="text-[10px] ml-1.5 font-bold" style={{ color: "#8a5a08" }}>EXEMPLO</span>}</td><td>{c.tipo}</td><td>{c.contato || "—"}</td>
                <td><Badge tone={c.divulgar ? "success" : "neutral"}>{c.divulgar ? "Público" : "Em Lançamento"}</Badge></td>
                <td><div className="flex gap-1"><button onClick={() => editar(c)} className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Pencil size={14} /></button><button onClick={() => remover(c.id)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button></div></td>
              </tr>
            ))}</tbody></table></div>
        )}
      </Card>
      <Card className="p-5 h-fit">
        <p className="font-bold mb-4">{editId ? "Editar convênio" : "Novo convênio"}</p>
        <div className="space-y-3">
          <Field label="Nome" required><Input value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
          <Field label="Tipo"><Input value={form.tipo} onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))} placeholder="Ex: Convênio Municipal" /></Field>
          <Field label="Contato"><Input value={form.contato} onChange={(e) => setForm((f) => ({ ...f, contato: e.target.value }))} placeholder="Telefone ou e-mail" /></Field>
          <div className="p-3 rounded-xl" style={{ background: "var(--rose-50)" }}>
            <Checkbox label="Divulgar este convênio publicamente no site" checked={form.divulgar} onChange={(v) => setForm((f) => ({ ...f, divulgar: v }))} />
            <p className="text-xs mt-1.5" style={{ color: "var(--ink-soft)" }}>Enquanto desativado, aparece na Transparência como "Em Lançamento", sem detalhes públicos.</p>
          </div>
          <Button className="btn-block" icon={editId ? Save : Plus} onClick={salvar}>{editId ? "Salvar" : "Adicionar convênio"}</Button>
          {(editId || form.nome || form.tipo || form.contato) && <Button variant="ghost" className="btn-block" onClick={() => { setEditId(null); setForm(emptyForm); }}>{editId ? "Cancelar edição" : "Limpar formulário"}</Button>}
        </div>
      </Card>
    </div>
  );
}
function AdminDemandas({ ctx }) {
  const { db, update, usuario, showToast } = ctx;
  const [novo, setNovo] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [hora, setHora] = useState("");
  const [antecedencia, setAntecedencia] = useState("15");
  const inputRef = useRef(null);
  const adicionar = () => {
    if (!novo.trim()) { showToast("Digite a demanda antes de adicionar.", "error"); inputRef.current?.focus(); return; }
    update("demandas", (arr) => [{ id: uid(), titulo: novo.trim(), responsavel: usuario.nome, prioridade, status: "pendente", data: todayISO(), hora: hora || null, antecedenciaMin: hora ? Number(antecedencia) : null, alertaDispensadoEm: null }, ...(arr || [])]);
    setNovo(""); setHora("");
    showToast(hora ? `Demanda adicionada — lembrete às ${hora}.` : "Demanda adicionada!");
    inputRef.current?.focus();
  };
  const alternar = (id) => update("demandas", (arr) => arr.map((d) => (d.id === id ? { ...d, status: d.status === "concluido" ? "pendente" : "concluido" } : d)));
  const remover = (id) => update("demandas", (arr) => arr.filter((d) => d.id !== id));
  const pendentes = (db.demandas || []).filter((d) => d.status !== "concluido");
  const concluidas = (db.demandas || []).filter((d) => d.status === "concluido");
  return (
    <div className="max-w-3xl">
      <Card className="p-5 mb-6 space-y-3">
        <Input ref={inputRef} value={novo} onChange={(e) => setNovo(e.target.value)} placeholder="Nova demanda do dia..." onKeyDown={(e) => e.key === "Enter" && adicionar()} />
        <div className="flex gap-2 flex-wrap items-center">
          <Field label="Lembrete às" className="mb-0" style={{ width: 130 }}><Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} /></Field>
          {hora && <Field label="Avisar" className="mb-0" style={{ width: 150 }}><Select value={antecedencia} onChange={(e) => setAntecedencia(e.target.value)} options={ANTECEDENCIA_OPCOES} /></Field>}
          <Field label="Prioridade" className="mb-0" style={{ width: 130 }}><Select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} options={[{ value: "alta", label: "Alta" }, { value: "media", label: "Média" }, { value: "baixa", label: "Baixa" }]} /></Field>
          <Button icon={Plus} onClick={adicionar} className="self-end">Adicionar</Button>
        </div>
        {hora && <p className="text-xs" style={{ color: "var(--ink-faint)" }}>Um aviso vai aparecer na tela {antecedencia === "0" ? "no horário exato" : `${ANTECEDENCIA_OPCOES.find((o) => o.value === antecedencia)?.label.toLowerCase()}`}, enquanto o sistema estiver aberto.</p>}
      </Card>
      <p className="font-bold mb-3 text-sm" style={{ color: "var(--ink-soft)" }}>EM ABERTO ({pendentes.length})</p>
      <div className="space-y-2 mb-8">
        {pendentes.length === 0 && <p className="text-sm" style={{ color: "var(--ink-faint)" }}>Nenhuma demanda pendente.</p>}
        {pendentes.map((d) => (
          <Card key={d.id} className="p-4 flex items-center gap-3" style={{ borderLeft: `4px solid ${PRIORIDADE_COR[d.prioridade]}` }}>
            <button onClick={() => alternar(d.id)} className="shrink-0 rounded-full border-2 ga-focus" style={{ width: 22, height: 22, borderColor: "var(--rose-700)" }} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{d.titulo}</p>
              <p className="text-xs flex items-center gap-1 flex-wrap" style={{ color: "var(--ink-soft)" }}>
                {d.responsavel} · {fmtDate(d.data)}
                {d.hora && <span className="inline-flex items-center gap-0.5 font-semibold"><Clock size={11} />{d.hora}</span>}
              </p>
            </div>
            <Badge tone={d.prioridade === "alta" ? "warning" : "neutral"} className="shrink-0">{PRIORIDADE_LABEL[d.prioridade]}</Badge>
            <button onClick={() => remover(d.id)} className="btn-ghost btn-sm btn shrink-0" style={{ padding: 6 }}><Trash2 size={14} /></button>
          </Card>
        ))}
      </div>
      {concluidas.length > 0 && (<>
        <p className="font-bold mb-3 text-sm" style={{ color: "var(--ink-soft)" }}>CONCLUÍDAS ({concluidas.length})</p>
        <div className="space-y-2 opacity-60">
          {concluidas.map((d) => (
            <Card key={d.id} className="p-4 flex items-center gap-3">
              <button onClick={() => alternar(d.id)} className="shrink-0 rounded-full flex items-center justify-center ga-focus" style={{ width: 22, height: 22, background: "var(--rose-700)" }}><Check size={14} color="#fff" /></button>
              <p className="flex-1 text-sm line-through">{d.titulo}</p>
              <button onClick={() => remover(d.id)} className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Trash2 size={14} /></button>
            </Card>
          ))}
        </div>
      </>)}
    </div>
  );
}
function emptyPaciente() {
  return {
    id: null, dataCadastro: todayISO(), nome: "", dataNascimento: "", idadeAproximada: "", telefone: "", cpf: "", rg: "",
    endereco: "", bairro: "", cidade: "Orlândia/SP", profissao: "", empresa: "", voluntario: "",
    diagnostico: "", tratamento: "", medicamentos: "",
    habitacaoTipo: "propria", valorAluguel: "", valorFinanciamento: "", cedidaNome: "",
    familiares: [], autorizaImagem: "", recebeAuxilio: "", qualAuxilio: "", protegido: false,
  };
}

function PacienteFichaPrint({ paciente: p }) {
  const habitacaoLabel = { propria: "Casa própria", alugada: "Alugada", financiada: "Financiada", cedida: "Cedida" }[p.habitacaoTipo] || "—";
  return (
    <div>
      <PrintHeader />
      <h2 className="ga-display font-bold text-lg text-center mb-6">FICHA DE CADASTRO DO PACIENTE</h2>
      <p className="font-bold mb-2">Dados básicos</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 150 }}>Nome</th><td colSpan={3}>{p.nome}</td></tr>
        <tr><th>Nascimento</th><td>{p.dataNascimento ? fmtDate(p.dataNascimento) : "—"}</td><th>Idade</th><td>{idadePaciente(p) ? `${idadePaciente(p)} anos` : "—"}</td></tr>
        <tr><th>CPF</th><td>{p.cpf || "—"}</td><th>RG</th><td>{p.rg || "—"}</td></tr>
        <tr><th>Telefone</th><td colSpan={3}>{p.telefone || "—"}</td></tr>
      </tbody></table>
      <p className="font-bold mb-2">Endereço</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 150 }}>Endereço</th><td colSpan={3}>{p.endereco || "—"}</td></tr>
        <tr><th>Bairro</th><td>{p.bairro || "—"}</td><th>Cidade</th><td>{p.cidade || "—"}</td></tr>
      </tbody></table>
      <p className="font-bold mb-2">Dados profissionais e de apoio</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 150 }}>Profissão</th><td>{p.profissao || "—"}</td><th style={{ width: 150 }}>Empresa</th><td>{p.empresa || "—"}</td></tr>
        <tr><th>Voluntário responsável</th><td colSpan={3}>{p.voluntario || "—"}</td></tr>
      </tbody></table>
      {(p.diagnostico || p.tratamento || p.medicamentos) && (<>
        <p className="font-bold mb-2">Dados clínicos</p>
        <table className="ga-table mb-4"><tbody>
          <tr><th style={{ width: 150 }}>Diagnóstico</th><td>{p.diagnostico || "—"}</td></tr>
          <tr><th>Tratamento</th><td>{p.tratamento || "—"}</td></tr>
          <tr><th>Medicamentos</th><td>{p.medicamentos || "—"}</td></tr>
        </tbody></table>
      </>)}
      <p className="font-bold mb-2">Habitação</p>
      <table className="ga-table mb-4"><tbody>
        <tr>
          <th style={{ width: 150 }}>Tipo</th><td>{habitacaoLabel}</td>
          <th style={{ width: 150 }}>{p.habitacaoTipo === "alugada" ? "Valor do aluguel" : p.habitacaoTipo === "financiada" ? "Valor do financiamento" : p.habitacaoTipo === "cedida" ? "Cedida por" : "—"}</th>
          <td>{p.habitacaoTipo === "alugada" ? (p.valorAluguel ? fmtBRL(p.valorAluguel) : "—") : p.habitacaoTipo === "financiada" ? (p.valorFinanciamento ? fmtBRL(p.valorFinanciamento) : "—") : p.habitacaoTipo === "cedida" ? (p.cedidaNome || "—") : "—"}</td>
        </tr>
      </tbody></table>
      <p className="font-bold mb-2">Situação familiar</p>
      {(p.familiares || []).length === 0 ? <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>Nenhum familiar informado.</p> : (
        <table className="ga-table mb-4"><thead><tr><th>Nome</th><th>Idade</th><th>Trabalho</th><th>Renda</th></tr></thead>
          <tbody>{p.familiares.map((f, i) => (<tr key={i}><td>{f.nome}</td><td>{f.idade || "—"}</td><td>{f.trabalho || "—"}</td><td>{f.renda ? fmtBRL(f.renda) : "—"}</td></tr>))}</tbody>
        </table>
      )}
      <p className="font-bold mb-2">Autorizações</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 240 }}>Autoriza divulgação de imagem</th><td>{p.autorizaImagem === "sim" ? "Sim" : p.autorizaImagem === "nao" ? "Não" : "—"}</td></tr>
        <tr><th>Recebe auxílio de entidade assistencial</th><td>{p.recebeAuxilio === "sim" ? `Sim — ${p.qualAuxilio || "não especificado"}` : p.recebeAuxilio === "nao" ? "Não" : "—"}</td></tr>
      </tbody></table>
      <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>Cadastro criado em {fmtDate(p.dataCadastro)}. Ficha gerada em {fmtDateTime(new Date().toISOString())}.</p>
      <PrintFooterSignature signerName="" signerRole="Assinatura do responsável pelo cadastro" capturedAt={new Date().toISOString()} />
    </div>
  );
}

function PacienteDetail({ ctx, paciente, onEdit, onBack, onDelete }) {
  const { db, setAdminPage, setSelectedPacienteId } = ctx;
  const [tab, setTab] = useState("dados");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const visitas = (db.visitas || []).filter((v) => v.pacienteId === paciente.id).sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const atendimentos = (db.atendimentos || []).filter((a) => a.pacienteId === paciente.id).sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const irParaNovaVisita = () => { setSelectedPacienteId(paciente.id); setAdminPage("visitas"); };
  const irParaDocumento = () => { setSelectedPacienteId(paciente.id); setAdminPage("documentos"); };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar à lista</button>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap"><p className="ga-display text-2xl font-semibold">{paciente.nome}</p>{paciente.protegido && <Badge tone="success"><ShieldCheck size={11} className="inline -mt-0.5 mr-1" />Protegido</Badge>}</div>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{idadePaciente(paciente) || "—"} anos · {paciente.bairro || "Bairro não informado"} · Cadastrado em {fmtDate(paciente.dataCadastro)}</p>
        </div>
        <div className="flex gap-2 flex-wrap"><Button size="sm" variant="outline" icon={Pencil} onClick={onEdit}>Editar</Button><Button size="sm" variant="outline" icon={Printer} onClick={() => ctx.openPrint("Ficha de Cadastro", <PacienteFichaPrint paciente={paciente} />)}>Imprimir ficha</Button><Button size="sm" variant="outline" icon={MapPinned} onClick={irParaNovaVisita}>Nova visita</Button><Button size="sm" icon={FileText} onClick={irParaDocumento}>Gerar documento</Button><button onClick={() => setConfirmDelete(true)} className="btn-ghost btn-sm btn" style={{ padding: 8, color: "#b3123a" }}><Trash2 size={15} /></button></div>
      </div>
      <div className="flex gap-5 mb-6 ga-scroll-x" style={{ borderBottom: "1px solid var(--line)" }}>
        {[["dados", "Dados cadastrais"], ["visitas", `Visitas (${visitas.length})`], ["atendimentos", `Atendimentos (${atendimentos.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-0.5 pb-3 text-sm font-bold whitespace-nowrap" style={{ color: tab === k ? "var(--rose-700)" : "var(--ink-soft)", borderBottom: tab === k ? "2px solid var(--rose-700)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>
      {tab === "dados" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-5"><SectionHeader icon={User}>Dados básicos</SectionHeader>
            {[["Nascimento", fmtDate(paciente.dataNascimento)], ["Telefone", paciente.telefone], ["CPF", paciente.cpf], ["RG", paciente.rg], ["Endereço", `${paciente.endereco || ""}${paciente.bairro ? ", " + paciente.bairro : ""}${paciente.cidade ? " — " + paciente.cidade : ""}`]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-sm py-2" style={{ borderBottom: "1px solid var(--line)" }}><span style={{ color: "var(--ink-soft)" }}>{k}</span><span className="font-semibold text-right">{v || "—"}</span></div>
            ))}
          </Card>
          <Card className="p-5"><SectionHeader icon={Stethoscope}>Clínico e socioeconômico</SectionHeader>
            <div className="space-y-3 text-sm">
              <div><p style={{ color: "var(--ink-soft)" }}>Diagnóstico</p><p className="font-semibold">{paciente.diagnostico || "—"}</p></div>
              <div><p style={{ color: "var(--ink-soft)" }}>Tratamento</p><p className="font-semibold">{paciente.tratamento || "—"}</p></div>
              <div><p style={{ color: "var(--ink-soft)" }}>Medicamentos necessários</p><p className="font-semibold">{paciente.medicamentos || "—"}</p></div>
              <div><p style={{ color: "var(--ink-soft)" }}>Habitação</p><p className="font-semibold capitalize">{paciente.habitacaoTipo || "—"}</p></div>
              <div><p style={{ color: "var(--ink-soft)" }}>Autoriza imagem / Recebe auxílio</p><p className="font-semibold">{paciente.autorizaImagem === "sim" ? "Autoriza" : "Não autoriza"} · {paciente.recebeAuxilio === "sim" ? `Recebe (${paciente.qualAuxilio || "—"})` : "Não recebe"}</p></div>
            </div>
          </Card>
          {paciente.familiares?.length > 0 && (
            <Card className="p-5 md:col-span-2"><SectionHeader icon={Users}>Situação familiar</SectionHeader>
              <div className="ga-scroll-x"><table className="ga-table"><thead><tr><th>Nome</th><th>Idade</th><th>Trabalho</th><th>Renda</th></tr></thead>
                <tbody>{paciente.familiares.map((f, i) => (<tr key={i}><td>{f.nome}</td><td>{f.idade}</td><td>{f.trabalho}</td><td>{f.renda ? fmtBRL(f.renda) : "—"}</td></tr>))}</tbody>
              </table></div>
            </Card>
          )}
        </div>
      )}
      {tab === "visitas" && (visitas.length === 0 ? <EmptyState icon={MapPinned} title="Nenhuma visita registrada" description="Registre a primeira visita domiciliar deste paciente." action={<Button icon={Plus} onClick={irParaNovaVisita}>Nova visita</Button>} /> : (
        <div className="space-y-3">{visitas.map((v) => (<Card key={v.id} className="p-4 flex items-center justify-between gap-3 flex-wrap"><div><p className="font-semibold text-sm">Visita em {fmtDate(v.data)} às {v.hora}</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>Técnico: {v.tecnicoNome}</p></div><Badge tone="neutral">{Object.values(v.agravos || {}).filter((x) => x === true).length} agravo(s)</Badge></Card>))}</div>
      ))}
      {tab === "atendimentos" && (atendimentos.length === 0 ? <EmptyState icon={Pill} title="Nenhum atendimento registrado" description="Registre entregas de medicamentos pela aba Atendimentos." action={<Button icon={Plus} onClick={() => setAdminPage("atendimentos")}>Ir para Atendimentos</Button>} /> : (
        <div className="space-y-3">{atendimentos.map((a) => (<Card key={a.id} className="p-4"><p className="font-semibold text-sm">{a.medicamentos}</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>{fmtDate(a.data)} · {a.custeio === "convenio" ? "Convênio" : "Recursos próprios"} · Médico: {a.medico || "—"}</p></Card>))}</div>
      ))}
      <ConfirmModal open={confirmDelete} onCancel={() => setConfirmDelete(false)} onConfirm={() => { onDelete(paciente.id); setConfirmDelete(false); }}
        message={`Tem certeza que deseja excluir o cadastro de "${paciente.nome}"?${paciente.protegido ? " Este cadastro está marcado como protegido — a exclusão manual ainda é permitida, mas os dados serão apagados permanentemente." : " Os dados salvos serão apagados permanentemente."}`} />
    </div>
  );
}

function AdminPacientes({ ctx }) {
  const { db, update, showToast, selectedPacienteId, setSelectedPacienteId } = ctx;
  const [view, setView] = useState("list");
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState(emptyPaciente());
  const refDados = useRef(null), refEndereco = useRef(null), refProfissional = useRef(null), refClinico = useRef(null), refHabitacao = useRef(null), refFamiliar = useRef(null), refAutorizacoes = useRef(null);
  const irPara = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const pacientes = (db.pacientes || []).filter((p) => !busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || (p.cpf || "").includes(busca));
  const abrirNovo = () => { setForm(emptyPaciente()); setView("form"); };
  const abrirEdicao = (p) => { setForm(p); setView("form"); };
  const abrirDetalhe = (p) => { setSelectedPacienteId(p.id); setView("detail"); };

  const salvar = () => {
    if (!form.nome) { showToast("Informe o nome do paciente.", "error"); return; }
    if (form.id) { update("pacientes", (arr) => arr.map((p) => (p.id === form.id ? form : p))); showToast("Cadastro atualizado."); }
    else { const novo = { ...form, id: uid() }; update("pacientes", (arr) => [novo, ...(arr || [])]); showToast("Paciente cadastrado."); setSelectedPacienteId(novo.id); }
    setView("list");
  };
  const addFamiliar = () => setForm((f) => ({ ...f, familiares: [...f.familiares, { nome: "", idade: "", trabalho: "", renda: "" }] }));
  const setFamiliar = (i, key, val) => setForm((f) => ({ ...f, familiares: f.familiares.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)) }));
  const rmFamiliar = (i) => setForm((f) => ({ ...f, familiares: f.familiares.filter((_, idx) => idx !== i) }));
  const yn = (field) => (
    <div className="flex gap-2">{[["sim", "Sim"], ["nao", "Não"]].map(([v, l]) => (
      <button key={v} type="button" onClick={() => setForm((f) => ({ ...f, [field]: v }))} className="btn btn-sm" style={{ background: form[field] === v ? "var(--rose-700)" : "#fff", color: form[field] === v ? "#fff" : "var(--ink-soft)", border: "1.5px solid " + (form[field] === v ? "transparent" : "var(--line)") }}>{l}</button>
    ))}</div>
  );

  if (view === "detail") {
    const p = (db.pacientes || []).find((p) => p.id === selectedPacienteId);
    if (!p) { setView("list"); return null; }
    return <PacienteDetail ctx={ctx} paciente={p} onEdit={() => abrirEdicao(p)} onBack={() => setView("list")}
      onDelete={(id) => { update("pacientes", (arr) => arr.filter((x) => x.id !== id)); showToast("Cadastro excluído."); setView("list"); }} />;
  }

  if (view === "form") {
    return (
      <div className="max-w-3xl">
        <button onClick={() => setView("list")} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar à lista</button>
        <p className="ga-display text-xl font-semibold mb-1">{form.id ? "Editar paciente" : "Novo paciente"}</p>
        <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>{form.id ? `Cadastrado em ${fmtDate(form.dataCadastro)}` : "Preencha o que tiver disponível — os campos podem ser completados depois."}</p>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {[["Dados básicos", refDados], ["Endereço", refEndereco], ["Profissional", refProfissional], ["Clínico", refClinico], ["Habitação", refHabitacao], ["Família", refFamiliar], ["Autorizações", refAutorizacoes]].map(([l, r]) => (
            <button key={l} onClick={() => irPara(r)} className="btn btn-sm ga-focus shrink-0" style={{ background: "#fff", color: "var(--rose-700)", border: "1.5px solid var(--rose-200)" }}>{l}</button>
          ))}
        </div>
        <div className="space-y-4">
          <Card className="p-6" ref={refDados}><SectionHeader icon={User}>Dados básicos</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nome completo" required><Input value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
              <Field label="Data de nascimento"><Input type="date" value={form.dataNascimento} onChange={(e) => { const v = e.target.value; const calc = calcIdade(v); setForm((f) => ({ ...f, dataNascimento: v, idadeAproximada: calc !== "" ? String(calc) : f.idadeAproximada })); }} /></Field>
              <Field label="Telefone"><Input value={form.telefone} onChange={(e) => setForm((f) => ({ ...f, telefone: maskTelefone(e.target.value) }))} placeholder="(16) 90000-0000" /></Field>
              <Field label="CPF"><Input value={form.cpf} onChange={(e) => setForm((f) => ({ ...f, cpf: maskCPF(e.target.value) }))} /></Field>
              <Field label="RG"><Input value={form.rg} onChange={(e) => setForm((f) => ({ ...f, rg: e.target.value }))} /></Field>
              <Field label="Idade" hint={form.dataNascimento ? "Preenchida a partir da data de nascimento — pode ajustar se necessário" : "Informe a idade aproximada"}>
                <Input type="number" min="0" placeholder="Idade" value={form.idadeAproximada} onChange={(e) => setForm((f) => ({ ...f, idadeAproximada: e.target.value }))} />
              </Field>
            </div>
          </Card>
          <Card className="p-6" ref={refEndereco}><SectionHeader icon={MapPin}>Endereço</SectionHeader>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Endereço" className="sm:col-span-2"><Input value={form.endereco} onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))} /></Field>
              <Field label="Bairro"><Input value={form.bairro} onChange={(e) => setForm((f) => ({ ...f, bairro: e.target.value }))} /></Field>
            </div>
            <Field label="Cidade" className="mt-4"><Input value={form.cidade} onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))} /></Field>
          </Card>
          <Card className="p-6" ref={refProfissional}><SectionHeader icon={Building2}>Dados profissionais e de apoio</SectionHeader>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Profissão"><Input value={form.profissao} onChange={(e) => setForm((f) => ({ ...f, profissao: e.target.value }))} /></Field>
              <Field label="Empresa"><Input value={form.empresa} onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))} /></Field>
              <Field label="Voluntário responsável"><Input value={form.voluntario} onChange={(e) => setForm((f) => ({ ...f, voluntario: e.target.value }))} /></Field>
            </div>
          </Card>
          <Card className="p-6" ref={refClinico}><SectionHeader icon={Stethoscope}>Dados clínicos (avançado)</SectionHeader>
            <div className="space-y-4">
              <Field label="Diagnóstico médico"><Textarea rows={2} value={form.diagnostico} onChange={(e) => setForm((f) => ({ ...f, diagnostico: e.target.value }))} /></Field>
              <Field label="Tratamento realizado"><Textarea rows={2} value={form.tratamento} onChange={(e) => setForm((f) => ({ ...f, tratamento: e.target.value }))} /></Field>
              <Field label="Medicamentos necessários"><Textarea rows={2} value={form.medicamentos} onChange={(e) => setForm((f) => ({ ...f, medicamentos: e.target.value }))} /></Field>
            </div>
          </Card>
          <Card className="p-6" ref={refHabitacao}><SectionHeader icon={HomeIcon}>Habitação</SectionHeader>
            <Select value={form.habitacaoTipo} onChange={(e) => setForm((f) => ({ ...f, habitacaoTipo: e.target.value }))} options={[{ value: "propria", label: "Casa própria" }, { value: "alugada", label: "Alugada" }, { value: "financiada", label: "Financiada" }, { value: "cedida", label: "Cedida" }]} className="mb-3" />
            {form.habitacaoTipo === "alugada" && <Field label="Valor do aluguel (R$)"><Input type="number" value={form.valorAluguel} onChange={(e) => setForm((f) => ({ ...f, valorAluguel: e.target.value }))} /></Field>}
            {form.habitacaoTipo === "financiada" && <Field label="Valor do financiamento (R$)"><Input type="number" value={form.valorFinanciamento} onChange={(e) => setForm((f) => ({ ...f, valorFinanciamento: e.target.value }))} /></Field>}
            {form.habitacaoTipo === "cedida" && <Field label="Nome de quem cede"><Input value={form.cedidaNome} onChange={(e) => setForm((f) => ({ ...f, cedidaNome: e.target.value }))} /></Field>}
          </Card>
          <Card className="p-6" ref={refFamiliar}>
            <SectionHeader icon={Users} right={<Button size="sm" variant="outline" icon={Plus} onClick={addFamiliar}>Adicionar</Button>}>Situação familiar (pessoas que residem com o paciente)</SectionHeader>
            {form.familiares.length === 0 && <p className="text-sm" style={{ color: "var(--ink-faint)" }}>Nenhum familiar adicionado.</p>}
            <div className="space-y-2">{form.familiares.map((fam, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-[1fr_70px_1fr_100px_auto] gap-2 items-center">
                <Input placeholder="Nome" value={fam.nome} onChange={(e) => setFamiliar(i, "nome", e.target.value)} />
                <Input placeholder="Idade" type="number" value={fam.idade} onChange={(e) => setFamiliar(i, "idade", e.target.value)} />
                <Input placeholder="Trabalho" value={fam.trabalho} onChange={(e) => setFamiliar(i, "trabalho", e.target.value)} />
                <Input placeholder="Renda R$" type="number" value={fam.renda} onChange={(e) => setFamiliar(i, "renda", e.target.value)} />
                <button onClick={() => rmFamiliar(i)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
              </div>
            ))}</div>
          </Card>
          <Card className="p-6" ref={refAutorizacoes}>
            <SectionHeader icon={ShieldCheck}>Autorizações e proteção do cadastro</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <Field label="Autoriza divulgação de imagem em redes sociais?">{yn("autorizaImagem")}</Field>
              <Field label="Recebe auxílio de entidade assistencial?">{yn("recebeAuxilio")}
                {form.recebeAuxilio === "sim" && <Input className="mt-2" placeholder="Qual entidade?" value={form.qualAuxilio} onChange={(e) => setForm((f) => ({ ...f, qualAuxilio: e.target.value }))} />}
              </Field>
            </div>
            <Card className="p-4 flex items-start gap-3" style={{ background: "var(--rose-50)" }}>
              <ShieldCheck size={20} color="var(--rose-700)" className="shrink-0 mt-0.5" />
              <div>
                <Checkbox label={'Proteger este cadastro contra o botão "Zerar sistema"'} checked={form.protegido} onChange={(v) => setForm((f) => ({ ...f, protegido: v }))} />
                <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Cadastros protegidos nunca são apagados pelo reset — só manualmente, com confirmação, pela lista de pacientes.</p>
              </div>
            </Card>
          </Card>
          <div className="flex gap-3 sticky bottom-4 z-10"><Button variant="ghost" className="flex-1 shadow-lg" onClick={() => setView("list")}>Cancelar</Button><Button icon={Save} onClick={salvar} className="flex-1 shadow-lg">Salvar cadastro</Button></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <p className="ga-display text-xl font-semibold">Pacientes</p>
      </div>
      <p className="text-sm mb-5" style={{ color: "var(--ink-soft)" }}>{(db.pacientes || []).length} paciente{(db.pacientes || []).length !== 1 ? "s" : ""} cadastrado{(db.pacientes || []).length !== 1 ? "s" : ""}</p>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--ink-faint)" /><Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou CPF..." style={{ paddingLeft: 36 }} /></div>
        <Button icon={Plus} onClick={abrirNovo}>Novo paciente</Button>
      </div>
      {pacientes.length === 0 ? (
        <EmptyState icon={ClipboardList} title={busca ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"} description="Cadastre o primeiro paciente para começar a usar o prontuário de atendimento." action={<Button icon={Plus} onClick={abrirNovo}>Cadastrar paciente</Button>} />
      ) : (
        <div className="space-y-2.5">{pacientes.map((p) => (
          <Card key={p.id} className="p-4 flex items-center gap-3.5 cursor-pointer" onClick={() => abrirDetalhe(p)}>
            <div className="rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ width: 44, height: 44, background: p.protegido ? "#1a7a45" : "var(--rose-700)" }}>{p.nome[0]?.toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate flex items-center gap-1.5">{p.nome}{p.protegido && <ShieldCheck size={13} color="#1a7a45" className="shrink-0" />}</p>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--ink-soft)" }}>
                {[idadePaciente(p) ? `${idadePaciente(p)} anos` : null, p.bairro, p.telefone].filter(Boolean).join(" · ") || "Sem detalhes adicionais"}
              </p>
            </div>
            <div className="text-right shrink-0 hidden sm:block"><p className="text-xs font-semibold" style={{ color: "var(--ink-faint)" }}>Cadastro</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>{fmtDate(p.dataCadastro)}</p></div>
            <ChevronRight size={18} color="var(--ink-faint)" className="shrink-0" />
          </Card>
        ))}</div>
      )}
    </div>
  );
}
function VisitaPrintView({ paciente, visita }) {
  return (
    <div>
      <PrintHeader />
      <h2 className="ga-display font-bold text-xl mb-1 text-center">PLANO DE DESENVOLVIMENTO DO USUÁRIO — PDU</h2>
      <p className="text-center text-xs mb-6" style={{ color: "var(--ink-soft)" }}>Registro de visita domiciliar</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 180 }}>Usuário</th><td>{paciente.nome}{visita.idadeIdoso ? ` (idade: ${visita.idadeIdoso})` : ""}</td></tr>
        <tr><th>Representante da família</th><td>{visita.representanteNome || "—"} {visita.representanteVinculo && `(${visita.representanteVinculo})`} {visita.representanteDoc}</td></tr>
        <tr><th>Cuidador</th><td>{visita.cuidadorNome || "—"} {visita.cuidadorVinculo && `(${visita.cuidadorVinculo})`} {visita.cuidadorDoc}</td></tr>
        <tr><th>Técnico responsável</th><td>{visita.tecnicoNome} {visita.tecnicoCargo && `— ${visita.tecnicoCargo}`}</td></tr>
        <tr><th>Data / horário</th><td>{fmtDate(visita.data)} às {visita.hora}</td></tr>
      </tbody></table>
      <p className="font-bold mt-5 mb-2">Roteiro técnico de visita domiciliar</p>
      <table className="ga-table mb-4"><thead><tr><th>Item avaliado</th><th style={{ width: 55 }}>Resp.</th><th>Observação</th></tr></thead>
        <tbody>{ROTEIRO_VISITA.map((r) => (<tr key={r.key}><td style={{ fontSize: ".78rem" }}>{r.label}</td><td className="font-bold">{visita.roteiro[r.key]?.resp === "sim" ? "Sim" : visita.roteiro[r.key]?.resp === "nao" ? "Não" : "—"}</td><td style={{ fontSize: ".78rem" }}>{visita.roteiro[r.key]?.obs || "—"}</td></tr>))}</tbody>
      </table>
      <p className="font-bold mt-5 mb-1">Relatório técnico da visita</p>
      <p className="text-sm mb-4" style={{ whiteSpace: "pre-wrap" }}>{visita.sintese || "—"}</p>
      <p className="font-bold mb-1">Situações de agravo identificadas</p>
      <p className="text-sm mb-4">{AGRAVOS_PDU.filter((a) => visita.agravos[a.key]).map((a) => a.label).join(", ") || "Nenhuma"}{visita.agravoOutro ? `; ${visita.agravoOutro}` : ""}</p>
      <p className="font-bold mb-1">Ações propostas para situações de risco / garantia de acesso à rede intersetorial</p>
      <p className="text-sm mb-4" style={{ whiteSpace: "pre-wrap" }}>{visita.acoesPropostas || "—"}</p>
      <p className="font-bold mb-1">Ações pactuadas</p>
      <table className="ga-table mb-4"><thead><tr><th>Ação</th><th style={{ width: 140 }}>Período</th></tr></thead>
        <tbody>{(visita.acoesPactuadas || []).filter((a) => a.acao).map((a, i) => (<tr key={i}><td>{a.acao}</td><td>{a.periodo}</td></tr>))}</tbody>
      </table>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><p className="font-bold mb-1">Resultados esperados</p><p className="text-sm">{visita.resultadosEsperados || "—"}</p></div>
        <div><p className="font-bold mb-1">Resultados alcançados</p><p className="text-sm">{visita.resultadosAlcancados || "—"}</p></div>
      </div>
      <PrintFooterSignature signerName={visita.tecnicoNome} signerRole={visita.tecnicoCargo || "Responsável técnico pelo acompanhamento"} gps={visita.gps} capturedAt={visita.registradoEm}
        extraLine={<p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}><strong>Endereço da visita:</strong> {paciente.endereco}, {paciente.bairro} — {paciente.cidade}</p>} />
      <div className="mt-8 pt-2 text-center" style={{ borderTop: "1px solid var(--ink-faint)", maxWidth: 340, marginLeft: "auto", marginRight: "auto" }}>
        <p className="font-semibold">{visita.representanteNome || "________________________________"}</p>
        <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>Assinatura do responsável pela família</p>
      </div>
    </div>
  );
}

function emptyVisita(pacienteId, usuario) {
  return {
    id: null, pacienteId, data: todayISO(), hora: nowHHMM(),
    tecnicoNome: usuario.nome, tecnicoCargo: usuario.cargo,
    representanteNome: "", representanteVinculo: "", representanteDoc: "",
    cuidadorNome: "", cuidadorVinculo: "", cuidadorDoc: "", idadeIdoso: "",
    roteiro: Object.fromEntries(ROTEIRO_VISITA.map((r) => [r.key, { resp: "", obs: "" }])),
    sintese: "", agravos: Object.fromEntries(AGRAVOS_PDU.map((a) => [a.key, false])), agravoOutro: "",
    acoesPropostas: "", acoesPactuadas: [{ acao: "", periodo: "" }],
    resultadosEsperados: "", resultadosAlcancados: "", gps: null, capturandoGps: false,
  };
}

function AdminVisitas({ ctx }) {
  const { db, update, usuario, showToast, selectedPacienteId, setSelectedPacienteId, selectedVisitaId, setSelectedVisitaId } = ctx;
  const [view, setView] = useState(selectedVisitaId || selectedPacienteId ? "form" : "search");
  const [busca, setBusca] = useState("");
  const [buscaArquivo, setBuscaArquivo] = useState("");
  const [filtroDataArquivo, setFiltroDataArquivo] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [novoModalOpen, setNovoModalOpen] = useState(false);
  const [novoPacienteForm, setNovoPacienteForm] = useState({ nome: "", dataNascimento: "", cpf: "", telefone: "", endereco: "", bairro: "", cidade: "Orlândia/SP" });
  const [form, setForm] = useState(() => {
    if (selectedVisitaId) {
      const existente = (db.visitas || []).find((v) => v.id === selectedVisitaId);
      if (existente) { const base = emptyVisita(existente.pacienteId, usuario); return { ...base, ...existente, roteiro: { ...base.roteiro, ...(existente.roteiro || {}) }, agravos: { ...base.agravos, ...(existente.agravos || {}) }, capturandoGps: false }; }
    }
    return emptyVisita(selectedPacienteId, usuario);
  });
  useEffect(() => { if (selectedVisitaId) setSelectedVisitaId(null); }, []);
  const [melhorando, setMelhorando] = useState(false);
  const [relatorioAnterior, setRelatorioAnterior] = useState(null);

  const pacientes = db.pacientes || [];
  const resultados = busca ? pacientes.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()) || (p.cpf || "").includes(busca)) : [];
  const selecionar = (p) => { setSelectedPacienteId(p.id); setForm(emptyVisita(p.id, usuario)); setView("form"); };

  const criarPacienteRapido = () => {
    if (!novoPacienteForm.nome) { showToast("Informe o nome do paciente.", "error"); return; }
    const novo = { ...emptyPaciente(), ...novoPacienteForm, id: uid() };
    update("pacientes", (arr) => [novo, ...(arr || [])]);
    setNovoModalOpen(false); setBusca("");
    selecionar(novo);
    showToast("Paciente cadastrado — continue o registro da visita.");
  };

  const melhorarRelatorio = async () => {
    if (!form.sintese.trim()) { showToast("Escreva o relatório antes de usar a melhoria com IA.", "error"); return; }
    setMelhorando(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1500,
          messages: [{ role: "user", content: `Você é um assistente de redação técnica em Serviço Social. Reescreva o texto abaixo como um relatório técnico de visita domiciliar, em português formal e claro, na terceira pessoa, adequado para prontuário de assistência social.\n\nREGRAS ESTRITAS:\n- Não invente, não presuma e não acrescente nenhuma informação, dado ou conclusão que não esteja no texto original.\n- Apenas reorganize, clarifique a redação e ajuste para tom técnico-profissional.\n- Se o texto original for incompleto ou ambíguo, mantenha essa mesma limitação — não complete lacunas por conta própria.\n- Responda APENAS com o texto reescrito, sem introdução, sem comentários, sem aspas.\n\nTEXTO ORIGINAL:\n${form.sintese}` }],
        }),
      });
      const data = await resp.json();
      const texto = (data.content || []).map((b) => b.text || "").join("").trim();
      if (!texto) throw new Error("empty");
      setRelatorioAnterior(form.sintese);
      setForm((f) => ({ ...f, sintese: texto }));
      showToast("Texto reescrito pela IA — revise antes de salvar.");
    } catch (e) {
      showToast("Não foi possível melhorar o texto agora. Tente novamente em instantes.", "error");
    } finally {
      setMelhorando(false);
    }
  };
  const desfazerMelhoria = () => { setForm((f) => ({ ...f, sintese: relatorioAnterior })); setRelatorioAnterior(null); showToast("Texto anterior restaurado."); };
  const inserirTemplate = (texto) => setForm((f) => ({ ...f, sintese: (f.sintese ? f.sintese.trim() + "\n\n" : "") + texto }));

  const arquivoVisitas = (db.visitas || []).map((v) => ({ v, p: pacientes.find((p) => p.id === v.pacienteId) }))
    .filter(({ v, p }) => {
      if (filtroDataArquivo && v.data !== filtroDataArquivo) return false;
      if (buscaArquivo && !((p?.nome || "").toLowerCase().includes(buscaArquivo.toLowerCase()))) return false;
      return true;
    }).sort((a, b) => (b.v.data || "").localeCompare(a.v.data || "") || (b.v.criadoEm || "").localeCompare(a.v.criadoEm || ""));

  const editarVisita = (v) => {
    const base = emptyVisita(v.pacienteId, usuario);
    const merged = { ...base, ...v, roteiro: { ...base.roteiro, ...(v.roteiro || {}) }, agravos: { ...base.agravos, ...(v.agravos || {}) }, capturandoGps: false };
    setSelectedPacienteId(v.pacienteId); setForm(merged); setView("form");
  };
  const reimprimirVisita = (v, p) => { if (!p) { showToast("Paciente deste registro não foi encontrado.", "error"); return; } ctx.openPrint("Plano de Desenvolvimento do Usuário (PDU)", <VisitaPrintView paciente={p} visita={v} />); };
  const excluirVisitaConfirmado = () => { update("visitas", (arr) => arr.filter((v) => v.id !== confirmDelete.id)); showToast("Visita excluída."); setConfirmDelete(null); };

  if (view === "search") {
    return (
      <div className="max-w-3xl">
        <Card className="p-6 mb-6">
          <p className="font-bold mb-1">Buscar paciente para registrar a visita</p>
          <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>Busque um paciente já cadastrado ou cadastre um novo agora.</p>
          <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--ink-faint)" /><Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Nome ou CPF do paciente..." style={{ paddingLeft: 36 }} /></div>
          {busca && (
            <div className="mt-3 space-y-1.5">
              {resultados.length === 0 ? (
                <Card className="p-4 flex items-center justify-between gap-3 flex-wrap" style={{ background: "var(--rose-50)" }}>
                  <span className="text-sm">Nenhum paciente encontrado com "{busca}".</span>
                  <Button size="sm" icon={UserPlus} onClick={() => { setNovoPacienteForm((f) => ({ ...f, nome: busca })); setNovoModalOpen(true); }}>Cadastrar agora</Button>
                </Card>
              ) : resultados.map((p) => (
                <button key={p.id} onClick={() => selecionar(p)} className="w-full text-left p-3 rounded-xl flex items-center justify-between ga-focus" style={{ border: "1px solid var(--line)" }}>
                  <div><p className="font-semibold text-sm">{p.nome}</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>{p.cpf || "CPF não informado"} · {p.bairro || "—"}</p></div><ChevronRight size={16} />
                </button>
              ))}
            </div>
          )}
        </Card>
        <Button variant="outline" icon={UserPlus} onClick={() => { setNovoPacienteForm({ nome: "", dataNascimento: "", cpf: "", telefone: "", endereco: "", bairro: "", cidade: "Orlândia/SP" }); setNovoModalOpen(true); }}>Cadastrar novo paciente</Button>

        <p className="font-bold mt-10 mb-3 text-sm" style={{ color: "var(--ink-soft)" }}>VISITAS REGISTRADAS ({arquivoVisitas.length})</p>
        <Card className="p-4 mb-4">
          <div className="grid sm:grid-cols-[1fr_180px_auto] gap-3 items-end">
            <Field label="Buscar por paciente"><Input value={buscaArquivo} onChange={(e) => setBuscaArquivo(e.target.value)} placeholder="Nome do paciente..." /></Field>
            <Field label="Data"><Input type="date" value={filtroDataArquivo} onChange={(e) => setFiltroDataArquivo(e.target.value)} /></Field>
            {(buscaArquivo || filtroDataArquivo) && <Button variant="ghost" size="sm" onClick={() => { setBuscaArquivo(""); setFiltroDataArquivo(""); }}>Limpar</Button>}
          </div>
        </Card>
        {arquivoVisitas.length === 0 ? <p className="text-sm" style={{ color: "var(--ink-faint)" }}>Nenhuma visita encontrada.</p> : (
          <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
            <thead><tr><th>Data</th><th>Paciente</th><th>Técnico</th><th></th></tr></thead>
            <tbody>{arquivoVisitas.map(({ v, p }) => (
              <tr key={v.id}>
                <td className="ga-tabular">{fmtDate(v.data)}</td>
                <td className="font-semibold">{p?.nome || "Paciente removido"}</td>
                <td className="text-xs">{v.tecnicoNome}</td>
                <td><div className="flex gap-1">
                  <button onClick={() => reimprimirVisita(v, p)} title="Reimprimir / gerar PDF" className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Printer size={14} /></button>
                  <button onClick={() => editarVisita(v)} title="Editar" className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Pencil size={14} /></button>
                  <button onClick={() => setConfirmDelete({ id: v.id, label: p?.nome })} title="Excluir" className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
                </div></td>
              </tr>
            ))}</tbody>
          </table></div></Card>
        )}
        <ConfirmModal open={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={excluirVisitaConfirmado}
          message={`Tem certeza que deseja excluir a visita de "${confirmDelete?.label || "paciente"}"? Os dados salvos serão apagados permanentemente.`} />

        <Modal open={novoModalOpen} onClose={() => setNovoModalOpen(false)} title="Cadastro rápido de paciente"
          footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setNovoModalOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={criarPacienteRapido}>Cadastrar e continuar</Button></div>}>
          <div className="space-y-3">
            <Field label="Nome completo" required><Input value={novoPacienteForm.nome} onChange={(e) => setNovoPacienteForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nascimento"><Input type="date" value={novoPacienteForm.dataNascimento} onChange={(e) => setNovoPacienteForm((f) => ({ ...f, dataNascimento: e.target.value }))} /></Field>
              <Field label="CPF"><Input value={novoPacienteForm.cpf} onChange={(e) => setNovoPacienteForm((f) => ({ ...f, cpf: maskCPF(e.target.value) }))} /></Field>
            </div>
            <Field label="Telefone"><Input value={novoPacienteForm.telefone} onChange={(e) => setNovoPacienteForm((f) => ({ ...f, telefone: maskTelefone(e.target.value) }))} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Endereço"><Input value={novoPacienteForm.endereco} onChange={(e) => setNovoPacienteForm((f) => ({ ...f, endereco: e.target.value }))} /></Field>
              <Field label="Bairro"><Input value={novoPacienteForm.bairro} onChange={(e) => setNovoPacienteForm((f) => ({ ...f, bairro: e.target.value }))} /></Field>
            </div>
            <p className="text-xs" style={{ color: "var(--ink-faint)" }}>Você poderá completar os demais dados depois, na ficha do paciente.</p>
          </div>
        </Modal>
      </div>
    );
  }

  const paciente = pacientes.find((p) => p.id === form.pacienteId);
  if (!paciente) return <EmptyState icon={AlertCircle} title="Paciente não encontrado" description="Selecione um paciente para iniciar a visita." action={<Button onClick={() => setView("search")}>Buscar paciente</Button>} />;

  const setRoteiro = (key, field, val) => setForm((f) => ({ ...f, roteiro: { ...f.roteiro, [key]: { ...f.roteiro[key], [field]: val } } }));
  const setAgravo = (key, val) => setForm((f) => ({ ...f, agravos: { ...f.agravos, [key]: val } }));
  const addAcao = () => setForm((f) => ({ ...f, acoesPactuadas: [...f.acoesPactuadas, { acao: "", periodo: "" }] }));
  const setAcao = (i, field, val) => setForm((f) => ({ ...f, acoesPactuadas: f.acoesPactuadas.map((a, idx) => (idx === i ? { ...a, [field]: val } : a)) }));
  const rmAcao = (i) => setForm((f) => ({ ...f, acoesPactuadas: f.acoesPactuadas.filter((_, idx) => idx !== i) }));
  const capturarGps = async () => {
    setForm((f) => ({ ...f, capturandoGps: true }));
    const loc = await captureLocation();
    setForm((f) => ({ ...f, gps: loc, capturandoGps: false }));
    if (loc.error) showToast(loc.error, "error"); else showToast("Localização capturada.");
  };
  const salvar = (gerarPdf) => {
    const novo = { ...form, id: form.id || uid(), criadoEm: form.criadoEm || new Date().toISOString(), registradoEm: new Date().toISOString() };
    if (form.id) update("visitas", (arr) => arr.map((v) => (v.id === form.id ? novo : v)));
    else update("visitas", (arr) => [novo, ...(arr || [])]);
    showToast("Visita registrada com sucesso.");
    if (gerarPdf) ctx.openPrint("Plano de Desenvolvimento do Usuário (PDU)", <VisitaPrintView paciente={paciente} visita={novo} />);
    else { setView("search"); setSelectedPacienteId(null); }
  };

  return (
    <div className="max-w-3xl">
      <button onClick={() => { setView("search"); setSelectedPacienteId(null); }} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar à lista de visitas</button>
      {form.id && <Badge tone="warning" className="mb-3">Editando visita existente</Badge>}
      <Card className="p-4 mb-6 flex items-center gap-3" style={{ background: "var(--rose-50)" }}>
        <div className="rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ width: 40, height: 40, background: "var(--rose-700)" }}>{paciente.nome[0]}</div>
        <div><p className="font-bold text-sm">{paciente.nome}</p><p className="text-xs" style={{ color: "var(--ink-soft)" }}>{idadePaciente(paciente) || "—"} anos · {paciente.bairro}</p></div>
      </Card>
      <Card className="p-6 space-y-6">
        <div><SectionHeader icon={User}>Identificação</SectionHeader>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="Data da visita"><Input type="date" value={form.data} onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))} /></Field>
            <Field label="Horário"><Input type="time" value={form.hora} onChange={(e) => setForm((f) => ({ ...f, hora: e.target.value }))} /></Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <Field label="Representante da família"><Input value={form.representanteNome} onChange={(e) => setForm((f) => ({ ...f, representanteNome: e.target.value }))} /></Field>
            <Field label="Parentesco"><Input value={form.representanteVinculo} onChange={(e) => setForm((f) => ({ ...f, representanteVinculo: e.target.value }))} /></Field>
            <Field label="CPF/NIS"><Input value={form.representanteDoc} onChange={(e) => setForm((f) => ({ ...f, representanteDoc: e.target.value }))} /></Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Responsável pelo cuidado (cuidador)"><Input value={form.cuidadorNome} onChange={(e) => setForm((f) => ({ ...f, cuidadorNome: e.target.value }))} /></Field>
            <Field label="Parentesco"><Input value={form.cuidadorVinculo} onChange={(e) => setForm((f) => ({ ...f, cuidadorVinculo: e.target.value }))} /></Field>
            <Field label="CPF/NIS"><Input value={form.cuidadorDoc} onChange={(e) => setForm((f) => ({ ...f, cuidadorDoc: e.target.value }))} /></Field>
          </div>
        </div>
        <div>
          <SectionHeader icon={ClipboardCheck}>Roteiro técnico de visita domiciliar</SectionHeader>
          <p className="text-xs mb-3 -mt-3" style={{ color: "var(--ink-faint)" }}>Instrumento de apoio à triagem psicossocial. Recomenda-se validação da equipe técnica antes do uso clínico formal.</p>
          <div>{ROTEIRO_VISITA.map((r) => (<YesNoField key={r.key} label={r.label} value={form.roteiro[r.key].resp} onChange={(v) => setRoteiro(r.key, "resp", v)} note={form.roteiro[r.key].obs} onNoteChange={(v) => setRoteiro(r.key, "obs", v)} />))}</div>
        </div>
        <div>
          <SectionHeader icon={FileText}>Relatório técnico da visita</SectionHeader>
          <Textarea rows={8} value={form.sintese} onChange={(e) => setForm((f) => ({ ...f, sintese: e.target.value }))} placeholder="Descreva de forma detalhada o contexto observado na visita: situação socioeconômica, de saúde, familiar e habitacional, e demais observações técnicas relevantes..." />
          <div className="flex gap-2 flex-wrap mt-2.5">
            <Button size="sm" icon={Sparkles} onClick={melhorarRelatorio} disabled={melhorando}>{melhorando ? "Melhorando com IA..." : "Melhorar texto com IA"}</Button>
            {relatorioAnterior !== null && <Button size="sm" variant="ghost" icon={RefreshCw} onClick={desfazerMelhoria}>Voltar texto anterior</Button>}
          </div>
          <p className="text-xs mt-3 mb-1.5 font-bold" style={{ color: "var(--ink-soft)" }}>Inserir modelo de encaminhamento/solicitação:</p>
          <div className="flex gap-2 flex-wrap">
            {ENCAMINHAMENTO_TEMPLATES.map((t) => (
              <button key={t.key} onClick={() => inserirTemplate(t.texto(paciente.nome))} className="btn btn-sm ga-focus" style={{ background: "#fff", color: "var(--rose-700)", border: "1.5px solid var(--rose-200)" }}>+ {t.label}</button>
            ))}
          </div>
        </div>
        <div><SectionHeader icon={AlertCircle}>Situações de agravo identificadas</SectionHeader>
          <div className="grid sm:grid-cols-2 gap-2 mb-3">{AGRAVOS_PDU.map((a) => <Checkbox key={a.key} label={a.label} checked={form.agravos[a.key]} onChange={(v) => setAgravo(a.key, v)} />)}</div>
          <Input placeholder="Outro (especifique)" value={form.agravoOutro} onChange={(e) => setForm((f) => ({ ...f, agravoOutro: e.target.value }))} />
        </div>
        <Field label="Ações propostas para situação de risco / garantia de acesso à rede intersetorial"><Textarea rows={3} value={form.acoesPropostas} onChange={(e) => setForm((f) => ({ ...f, acoesPropostas: e.target.value }))} /></Field>
        <div>
          <SectionHeader icon={ListChecks} right={<Button size="sm" variant="outline" icon={Plus} onClick={addAcao}>Adicionar</Button>}>Ações pactuadas com usuário/família/cuidador</SectionHeader>
          <div className="space-y-2">{form.acoesPactuadas.map((a, i) => (
            <div key={i} className="grid grid-cols-[1fr_110px_auto] gap-2"><Input placeholder={`Ação ${i + 1}`} value={a.acao} onChange={(e) => setAcao(i, "acao", e.target.value)} /><Input placeholder="Período" value={a.periodo} onChange={(e) => setAcao(i, "periodo", e.target.value)} /><button onClick={() => rmAcao(i)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button></div>
          ))}</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Avaliação — resultados esperados"><Textarea rows={2} value={form.resultadosEsperados} onChange={(e) => setForm((f) => ({ ...f, resultadosEsperados: e.target.value }))} /></Field>
          <Field label="Avaliação — resultados alcançados"><Textarea rows={2} value={form.resultadosAlcancados} onChange={(e) => setForm((f) => ({ ...f, resultadosAlcancados: e.target.value }))} /></Field>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "var(--rose-50)" }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2"><MapPinned size={18} color="var(--rose-700)" /><span className="text-sm font-semibold">{form.gps?.lat ? `Localização capturada (±${form.gps.precisao}m)` : form.gps?.error ? "Falha ao capturar — pode registrar manualmente" : "Localização GPS da visita"}</span></div>
            <Button size="sm" variant="outline" onClick={capturarGps} disabled={form.capturandoGps}>{form.capturandoGps ? <Spinner size={14} /> : "Capturar localização"}</Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="ghost" className="flex-1" onClick={() => { setView("search"); setSelectedPacienteId(null); }}>Cancelar</Button>
          <Button className="flex-1" icon={Save} onClick={() => salvar(false)} disabled={form.capturandoGps || melhorando}>Salvar visita</Button>
          <Button variant="dark" className="flex-1" icon={Printer} onClick={() => salvar(true)} disabled={form.capturandoGps || melhorando}>Salvar e gerar PDF (PDU)</Button>
        </div>
      </Card>
    </div>
  );
}
function AdminAtendimentos({ ctx }) {
  const { db, update, usuario, showToast } = ctx;
  const emptyForm = { pacienteId: "", data: todayISO(), medicamentos: "", medico: "", crm: "", dataReceita: "", custeio: "proprio", convenioId: "", observacoes: "" };
  const [form, setForm] = useState(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [buscaPaciente, setBuscaPaciente] = useState("");

  const pacientes = db.pacientes || [];
  const atendimentos = (db.atendimentos || []).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const resultadosBusca = buscaPaciente ? pacientes.filter((p) => p.nome.toLowerCase().includes(buscaPaciente.toLowerCase())) : [];

  const salvar = () => {
    if (!form.pacienteId) { showToast("Selecione o paciente.", "error"); return; }
    if (!form.medicamentos) { showToast("Informe o(s) medicamento(s).", "error"); return; }
    update("atendimentos", (arr) => [{ id: uid(), ...form, responsavel: usuario.nome, criadoEm: new Date().toISOString() }, ...(arr || [])]);
    showToast("Atendimento registrado.");
    setForm(emptyForm); setModalOpen(false); setBuscaPaciente("");
  };

  return (
    <div>
      <div className="flex justify-end mb-5"><Button icon={Plus} onClick={() => setModalOpen(true)}>Novo atendimento</Button></div>
      {atendimentos.length === 0 ? <EmptyState icon={Pill} title="Nenhum atendimento registrado" description="Registre entregas de medicamentos vinculadas aos pacientes." /> : (
        <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
          <thead><tr><th>Data</th><th>Paciente</th><th>Medicamento(s)</th><th>Médico</th><th>Custeio</th></tr></thead>
          <tbody>{atendimentos.map((a) => {
            const p = pacientes.find((p) => p.id === a.pacienteId);
            const conv = (db.convenios || []).find((c) => c.id === a.convenioId);
            return <tr key={a.id}><td className="ga-tabular">{fmtDate(a.data)}</td><td className="font-semibold">{p?.nome || "—"}</td><td>{a.medicamentos}</td><td>{a.medico || "—"}</td><td>{a.custeio === "convenio" ? conv?.nome || "Convênio" : "Recursos próprios"}</td></tr>;
          })}</tbody>
        </table></div></Card>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Registrar atendimento" wide
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setModalOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={salvar}>Registrar atendimento</Button></div>}>
        <div className="space-y-4">
          <Field label="Paciente" required>
            {form.pacienteId ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: "var(--rose-50)" }}><span className="font-semibold text-sm">{pacientes.find((p) => p.id === form.pacienteId)?.nome}</span><button onClick={() => setForm((f) => ({ ...f, pacienteId: "" }))} className="text-xs font-bold" style={{ color: "var(--rose-700)" }}>Trocar</button></div>
            ) : (
              <div className="relative">
                <Input value={buscaPaciente} onChange={(e) => setBuscaPaciente(e.target.value)} placeholder="Buscar paciente pelo nome..." />
                {resultadosBusca.length > 0 && (<div className="mt-1 ga-card overflow-hidden">{resultadosBusca.map((p) => (<button key={p.id} onClick={() => { setForm((f) => ({ ...f, pacienteId: p.id })); setBuscaPaciente(""); }} className="w-full text-left px-3 py-2 text-sm" style={{ borderBottom: "1px solid var(--line)" }}>{p.nome}</button>))}</div>)}
              </div>
            )}
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Data"><Input type="date" value={form.data} onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))} /></Field>
            <Field label="Medicamento(s)" required><Input value={form.medicamentos} onChange={(e) => setForm((f) => ({ ...f, medicamentos: e.target.value }))} /></Field>
          </div>
          <SectionHeader icon={FileText}>Dados da receita</SectionHeader>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Médico"><Input value={form.medico} onChange={(e) => setForm((f) => ({ ...f, medico: e.target.value }))} /></Field>
            <Field label="CRM"><Input value={form.crm} onChange={(e) => setForm((f) => ({ ...f, crm: e.target.value }))} /></Field>
            <Field label="Data da receita"><Input type="date" value={form.dataReceita} onChange={(e) => setForm((f) => ({ ...f, dataReceita: e.target.value }))} /></Field>
          </div>
          <Field label="Forma de custeio">
            <div className="flex gap-2 mb-2">{[["proprio", "Recursos próprios"], ["convenio", "Convênio"]].map(([v, l]) => (<button key={v} onClick={() => setForm((f) => ({ ...f, custeio: v }))} className="btn btn-sm flex-1" style={{ background: form.custeio === v ? "var(--rose-700)" : "#fff", color: form.custeio === v ? "#fff" : "var(--ink-soft)", border: "1.5px solid " + (form.custeio === v ? "transparent" : "var(--line)") }}>{l}</button>))}</div>
            {form.custeio === "convenio" && ((db.convenios || []).length === 0 ? <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Nenhum convênio cadastrado. Cadastre na aba "Convênios".</p> : <Select value={form.convenioId} onChange={(e) => setForm((f) => ({ ...f, convenioId: e.target.value }))} options={(db.convenios || []).map((c) => ({ value: c.id, label: c.nome }))} placeholder="Selecione o convênio..." />)}
          </Field>
          <Field label="Observações"><Textarea rows={2} value={form.observacoes} onChange={(e) => setForm((f) => ({ ...f, observacoes: e.target.value }))} /></Field>
        </div>
      </Modal>
    </div>
  );
}
function DocEmprestimoPrint({ form }) {
  const d = form.dataEmprestimo ? new Date(form.dataEmprestimo + "T00:00") : new Date();
  return (
    <div>
      <PrintHeader />
      <h2 className="ga-display font-bold text-lg text-center mb-6">TERMO DE EMPRÉSTIMO DE EQUIPAMENTOS</h2>
      <p className="text-sm leading-relaxed mb-4">Pelo presente instrumento, eu, <strong>{form.nome}</strong>, portador do documento <strong>{form.documento || "___________________"}</strong>, residente
        no endereço <strong>{form.endereco || "___________________"}</strong>, declaro, para os devidos fins, que recebi do Grupo ALMA de Orlândia, em regime
        de empréstimo temporário, os seguintes equipamentos:</p>
      <ul className="text-sm mb-4 pl-5 list-disc">{form.equipamentos.filter(Boolean).map((e, i) => <li key={i}>{e}</li>)}</ul>
      <p className="text-sm leading-relaxed mb-4">O(s) equipamento(s) acima relacionado(s) será(ão) utilizado(s) no período de <strong>{form.prazoDias} dias</strong>, devendo ser devolvido(s) até esta data, salvo prorrogação autorizada por escrito pelo Grupo ALMA.</p>
      <p className="font-bold mb-1">Condições de Uso e Responsabilidade:</p>
      <p className="text-sm mb-2">Comprometo-me a zelar pela boa conservação e uso adequado dos equipamentos emprestados.</p>
      <p className="text-sm mb-2">Em caso de danos, extravio, furto ou perda, comprometo-me a comunicar imediatamente o Grupo ALMA.</p>
      <p className="text-sm mb-2">Declaro que os equipamentos emprestados serão utilizados exclusivamente pelo paciente, durante a necessidade do tratamento e seu bem-estar.</p>
      <p className="text-sm mb-4">Estou ciente de que a não devolução dos itens no prazo acordado, ou em condições diferentes daquelas em que foram emprestados, poderá acarretar medidas administrativas e/ou legais.</p>
      <p className="font-bold mb-1">Declaração Final:</p>
      <p className="text-sm mb-6">Assumo total responsabilidade pelo uso, guarda e devolução dos equipamentos especificados neste termo, estando ciente das obrigações aqui descritas.</p>
      <p className="text-sm mb-10">Orlândia, {d.getDate()} de {d.toLocaleDateString("pt-BR", { month: "long" })} de {d.getFullYear()}.</p>
      <div className="grid grid-cols-2 gap-10 text-center text-sm">
        <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 6 }}>Assinatura do responsável por pegar emprestado</div>
        <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 6 }}>{form.representanteNome}<br /><span style={{ fontSize: ".75rem", color: "var(--ink-soft)" }}>{form.representanteCargo} — Grupo ALMA</span></div>
      </div>
    </div>
  );
}

function DocEmprestimoForm({ ctx, onBack, editRecord }) {
  const { db, usuario, showToast, update } = ctx;
  const [pacienteId, setPacienteId] = useState(editRecord?.pacienteId || "");
  const [form, setForm] = useState(editRecord?.formData || { nome: "", documento: "", endereco: "", equipamentos: [""], prazoDias: "30", dataEmprestimo: todayISO(), representanteNome: usuario.nome, representanteCargo: usuario.cargo || "" });
  const selecionarPaciente = (id) => { setPacienteId(id); const p = (db.pacientes || []).find((p) => p.id === id); if (p) setForm((f) => ({ ...f, nome: p.nome, documento: p.cpf || p.rg || "", endereco: `${p.endereco || ""}, ${p.bairro || ""} — ${p.cidade || ""}` })); };
  const setEquip = (i, val) => setForm((f) => ({ ...f, equipamentos: f.equipamentos.map((e, idx) => (idx === i ? val : e)) }));
  const addEquip = () => setForm((f) => ({ ...f, equipamentos: [...f.equipamentos, ""] }));
  const rmEquip = (i) => setForm((f) => ({ ...f, equipamentos: f.equipamentos.filter((_, idx) => idx !== i) }));
  const gerar = () => {
    if (!form.nome) { showToast("Informe o nome do responsável.", "error"); return; }
    const registro = { id: editRecord?.id || uid(), tipo: "emprestimo", pacienteId, tituloBusca: form.nome, data: form.dataEmprestimo, formData: form, geradoPor: usuario.nome, criadoEm: editRecord?.criadoEm || new Date().toISOString(), atualizadoEm: new Date().toISOString() };
    if (editRecord) update("documentos", (arr) => arr.map((d) => (d.id === editRecord.id ? registro : d)));
    else update("documentos", (arr) => [registro, ...(arr || [])]);
    showToast(editRecord ? "Documento atualizado e salvo." : "Documento salvo — disponível em Documentos salvos.");
    ctx.openPrint("Termo de Empréstimo de Equipamentos", <DocEmprestimoPrint form={form} />);
  };
  return (
    <div className="max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar aos documentos</button>
      <p className="ga-display text-xl font-semibold mb-5">{editRecord ? "Editar" : ""} Termo de Empréstimo de Equipamentos</p>
      <Card className="p-6 space-y-4">
        <Field label="Vincular a um paciente cadastrado (opcional)"><Select value={pacienteId} onChange={(e) => selecionarPaciente(e.target.value)} options={(db.pacientes || []).map((p) => ({ value: p.id, label: p.nome }))} placeholder="Nenhum — preencher manualmente" /></Field>
        <Field label="Nome do responsável" required><Input value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Documento (RG/CPF)"><Input value={form.documento} onChange={(e) => setForm((f) => ({ ...f, documento: e.target.value }))} /></Field>
          <Field label="Prazo (dias)"><Input type="number" value={form.prazoDias} onChange={(e) => setForm((f) => ({ ...f, prazoDias: e.target.value }))} /></Field>
        </div>
        <Field label="Endereço"><Input value={form.endereco} onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))} /></Field>
        <div>
          <SectionHeader icon={Package} right={<Button size="sm" variant="outline" icon={Plus} onClick={addEquip}>Adicionar</Button>}>Equipamento(s) emprestado(s)</SectionHeader>
          {form.equipamentos.map((eq, i) => (<div key={i} className="flex gap-2 mb-2"><Input value={eq} onChange={(e) => setEquip(i, e.target.value)} placeholder={`Equipamento ${i + 1}`} />{form.equipamentos.length > 1 && <button onClick={() => rmEquip(i)} className="btn-ghost btn-sm btn" style={{ padding: 8, color: "#b3123a" }}><Trash2 size={14} /></button>}</div>))}
        </div>
        <Field label="Data do empréstimo"><Input type="date" value={form.dataEmprestimo} onChange={(e) => setForm((f) => ({ ...f, dataEmprestimo: e.target.value }))} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nome do representante do Grupo ALMA"><Input value={form.representanteNome} onChange={(e) => setForm((f) => ({ ...f, representanteNome: e.target.value }))} /></Field>
          <Field label="Cargo"><Input value={form.representanteCargo} onChange={(e) => setForm((f) => ({ ...f, representanteCargo: e.target.value }))} /></Field>
        </div>
        <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={onBack}>Cancelar</Button><Button className="flex-1" icon={Printer} onClick={gerar}>Salvar e gerar PDF</Button></div>
      </Card>
    </div>
  );
}

function DocEntrevistaPrint({ form }) {
  return (
    <div>
      <PrintHeader />
      <h2 className="ga-display font-bold text-lg text-center mb-6">FORMULÁRIO DE ENTREVISTA</h2>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 150 }}>Nome</th><td>{form.nome}</td><th style={{ width: 90 }}>Sexo</th><td>{form.sexo === "F" ? "Feminino" : form.sexo === "M" ? "Masculino" : "—"}</td></tr>
        <tr><th>NIS</th><td>{form.nis || "—"}</td><th>RG</th><td>{form.rg || "—"}</td></tr>
        <tr><th>CPF</th><td>{form.cpf || "—"}</td><th>Nascimento</th><td>{fmtDate(form.nascimento)}</td></tr>
        <tr><th>Naturalidade</th><td>{form.naturalidade || "—"}</td><th>PCD / Idoso</th><td>{[form.pcd && "PCD", form.idoso && "Idoso"].filter(Boolean).join(" · ") || "—"}</td></tr>
        <tr><th>Mãe</th><td colSpan={3}>{form.mae || "—"}</td></tr>
        <tr><th>Pai</th><td colSpan={3}>{form.pai || "—"}</td></tr>
        <tr><th>Estado civil</th><td>{form.estadoCivil || "—"}</td><th>Escolaridade</th><td>{form.escolaridade || "—"}</td></tr>
        <tr><th>Renda familiar</th><td>{form.rendaFamiliar ? fmtBRL(form.rendaFamiliar) : "—"}</td><th>Telefone</th><td>{form.telefone || "—"}</td></tr>
        <tr><th>Endereço</th><td colSpan={3}>{form.endereco}{form.bairro ? `, ${form.bairro}` : ""}</td></tr>
        <tr><th>Transf. de Renda</th><td>{form.transferenciaRenda === "sim" ? `Sim — ${form.qualTransferencia}` : "Não"}</td><th>BPC</th><td>{form.bpc === "sim" ? "Sim" : "Não"}</td></tr>
      </tbody></table>
      <p className="font-bold mb-2">Composição familiar</p>
      <table className="ga-table mb-6"><thead><tr><th>Nome</th><th>Nascimento</th><th>Parentesco</th><th>Escolaridade</th><th>Profissão</th><th>Ocupação</th><th>Renda</th></tr></thead>
        <tbody>{form.composicao.filter((c) => c.nome).map((c, i) => (<tr key={i}><td>{c.nome}</td><td>{fmtDate(c.nascimento)}</td><td>{c.parentesco}</td><td>{c.escolaridade}</td><td>{c.profissao}</td><td>{c.ocupacao}</td><td>{c.renda ? fmtBRL(c.renda) : "—"}</td></tr>))}</tbody>
      </table>
      <PrintFooterSignature signerName="" signerRole="Assinatura do(a) técnico(a) entrevistador(a)" capturedAt={new Date().toISOString()} />
    </div>
  );
}

function DocEntrevistaForm({ ctx, onBack, editRecord }) {
  const { db, usuario, showToast, update } = ctx;
  const [pacienteId, setPacienteId] = useState(editRecord?.pacienteId || "");
  const [form, setForm] = useState(editRecord?.formData || { nome: "", sexo: "", nis: "", rg: "", cpf: "", nascimento: "", naturalidade: "", pcd: false, idoso: false, mae: "", pai: "", estadoCivil: "", escolaridade: "", rendaFamiliar: "", endereco: "", bairro: "", telefone: "", transferenciaRenda: "nao", qualTransferencia: "", bpc: "nao", composicao: [{ nome: "", nascimento: "", parentesco: "", escolaridade: "", profissao: "", ocupacao: "", renda: "" }] });
  const selecionarPaciente = (id) => { setPacienteId(id); const p = (db.pacientes || []).find((p) => p.id === id); if (p) setForm((f) => ({ ...f, nome: p.nome, cpf: p.cpf || "", rg: p.rg || "", nascimento: p.dataNascimento || "", endereco: p.endereco || "", bairro: p.bairro || "", telefone: p.telefone || "" })); };
  const setComp = (i, key, val) => setForm((f) => ({ ...f, composicao: f.composicao.map((c, idx) => (idx === i ? { ...c, [key]: val } : c)) }));
  const addComp = () => setForm((f) => ({ ...f, composicao: [...f.composicao, { nome: "", nascimento: "", parentesco: "", escolaridade: "", profissao: "", ocupacao: "", renda: "" }] }));
  const rmComp = (i) => setForm((f) => ({ ...f, composicao: f.composicao.filter((_, idx) => idx !== i) }));
  const gerar = () => {
    if (!form.nome) { showToast("Informe o nome do entrevistado.", "error"); return; }
    const registro = { id: editRecord?.id || uid(), tipo: "entrevista", pacienteId, tituloBusca: form.nome, data: form.nascimento || todayISO(), formData: form, geradoPor: usuario.nome, criadoEm: editRecord?.criadoEm || new Date().toISOString(), atualizadoEm: new Date().toISOString() };
    if (editRecord) update("documentos", (arr) => arr.map((d) => (d.id === editRecord.id ? registro : d)));
    else update("documentos", (arr) => [registro, ...(arr || [])]);
    showToast(editRecord ? "Documento atualizado e salvo." : "Documento salvo — disponível em Documentos salvos.");
    ctx.openPrint("Formulário de Entrevista", <DocEntrevistaPrint form={form} />);
  };
  const ynBtn = (field, opts) => (
    <div className="flex gap-2 mb-2">{opts.map(([v, l]) => (<button key={v} onClick={() => setForm((f) => ({ ...f, [field]: v }))} className="btn btn-sm flex-1" style={{ background: form[field] === v ? "var(--rose-700)" : "#fff", color: form[field] === v ? "#fff" : "var(--ink-soft)", border: "1.5px solid " + (form[field] === v ? "transparent" : "var(--line)") }}>{l}</button>))}</div>
  );
  return (
    <div className="max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar aos documentos</button>
      <p className="ga-display text-xl font-semibold mb-5">{editRecord ? "Editar " : ""}Formulário de Entrevista (SPSBD)</p>
      <Card className="p-6 space-y-5">
        <Field label="Vincular a um paciente cadastrado (opcional)"><Select value={pacienteId} onChange={(e) => selecionarPaciente(e.target.value)} options={(db.pacientes || []).map((p) => ({ value: p.id, label: p.nome }))} placeholder="Nenhum — preencher manualmente" /></Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Nome" required><Input value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
          <Field label="Sexo"><Select value={form.sexo} onChange={(e) => setForm((f) => ({ ...f, sexo: e.target.value }))} options={[{ value: "F", label: "Feminino" }, { value: "M", label: "Masculino" }]} placeholder="—" /></Field>
          <Field label="NIS"><Input value={form.nis} onChange={(e) => setForm((f) => ({ ...f, nis: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="RG"><Input value={form.rg} onChange={(e) => setForm((f) => ({ ...f, rg: e.target.value }))} /></Field>
          <Field label="CPF"><Input value={form.cpf} onChange={(e) => setForm((f) => ({ ...f, cpf: maskCPF(e.target.value) }))} /></Field>
          <Field label="Nascimento"><Input type="date" value={form.nascimento} onChange={(e) => setForm((f) => ({ ...f, nascimento: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 items-end">
          <Field label="Naturalidade (Município/UF)"><Input value={form.naturalidade} onChange={(e) => setForm((f) => ({ ...f, naturalidade: e.target.value }))} /></Field>
          <div className="pb-2.5"><Checkbox label="Pessoa com deficiência" checked={form.pcd} onChange={(v) => setForm((f) => ({ ...f, pcd: v }))} /></div>
          <div className="pb-2.5"><Checkbox label="Pessoa idosa" checked={form.idoso} onChange={(v) => setForm((f) => ({ ...f, idoso: v }))} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nome da mãe"><Input value={form.mae} onChange={(e) => setForm((f) => ({ ...f, mae: e.target.value }))} /></Field>
          <Field label="Nome do pai"><Input value={form.pai} onChange={(e) => setForm((f) => ({ ...f, pai: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Estado civil"><Input value={form.estadoCivil} onChange={(e) => setForm((f) => ({ ...f, estadoCivil: e.target.value }))} /></Field>
          <Field label="Escolaridade"><Input value={form.escolaridade} onChange={(e) => setForm((f) => ({ ...f, escolaridade: e.target.value }))} placeholder="Ex: Ensino Médio completo" /></Field>
          <Field label="Renda familiar (R$)"><Input type="number" value={form.rendaFamiliar} onChange={(e) => setForm((f) => ({ ...f, rendaFamiliar: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <Field label="Endereço" className="sm:col-span-2"><Input value={form.endereco} onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))} /></Field>
          <Field label="Bairro"><Input value={form.bairro} onChange={(e) => setForm((f) => ({ ...f, bairro: e.target.value }))} /></Field>
          <Field label="Telefone"><Input value={form.telefone} onChange={(e) => setForm((f) => ({ ...f, telefone: maskTelefone(e.target.value) }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Recebe Programa de Transferência de Renda?">{ynBtn("transferenciaRenda", [["nao", "Não"], ["sim", "Sim"]])}{form.transferenciaRenda === "sim" && <Input placeholder="Qual programa?" value={form.qualTransferencia} onChange={(e) => setForm((f) => ({ ...f, qualTransferencia: e.target.value }))} />}</Field>
          <Field label="Recebe Benefício de Prestação Continuada (BPC)?">{ynBtn("bpc", [["nao", "Não"], ["sim", "Sim"]])}</Field>
        </div>
        <div>
          <SectionHeader icon={Users} right={<Button size="sm" variant="outline" icon={Plus} onClick={addComp}>Adicionar membro</Button>}>Composição familiar</SectionHeader>
          <div className="space-y-2">{form.composicao.map((c, i) => (
            <Card key={i} className="p-3" style={{ background: "var(--rose-50)" }}>
              <div className="grid sm:grid-cols-3 gap-2 mb-2"><Input placeholder="Nome" value={c.nome} onChange={(e) => setComp(i, "nome", e.target.value)} /><Input placeholder="Nascimento" type="date" value={c.nascimento} onChange={(e) => setComp(i, "nascimento", e.target.value)} /><Input placeholder="Parentesco" value={c.parentesco} onChange={(e) => setComp(i, "parentesco", e.target.value)} /></div>
              <div className="grid sm:grid-cols-4 gap-2"><Input placeholder="Escolaridade" value={c.escolaridade} onChange={(e) => setComp(i, "escolaridade", e.target.value)} /><Input placeholder="Profissão" value={c.profissao} onChange={(e) => setComp(i, "profissao", e.target.value)} /><Input placeholder="Ocupação" value={c.ocupacao} onChange={(e) => setComp(i, "ocupacao", e.target.value)} /><div className="flex gap-1"><Input placeholder="Renda R$" type="number" value={c.renda} onChange={(e) => setComp(i, "renda", e.target.value)} /><button onClick={() => rmComp(i)} className="btn-ghost btn-sm btn shrink-0" style={{ padding: 8, color: "#b3123a" }}><Trash2 size={14} /></button></div></div>
            </Card>
          ))}</div>
        </div>
        <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={onBack}>Cancelar</Button><Button className="flex-1" icon={Printer} onClick={gerar}>Salvar e gerar PDF</Button></div>
      </Card>
    </div>
  );
}

function DocListaPrint({ form }) {
  const preenchidos = form.participantes.filter((p) => p.nome);
  return (
    <div>
      <PrintHeader />
      <h2 className="ga-display font-bold text-lg text-center mb-6">LISTA DE PARTICIPAÇÃO</h2>
      <table className="ga-table mb-6"><tbody>
        <tr><th style={{ width: 140 }}>Data</th><td>{fmtDate(form.data)}</td></tr>
        <tr><th>Atividade</th><td>{form.atividade}</td></tr>
        <tr><th>Objetivo</th><td>{form.objetivo || "—"}</td></tr>
        <tr><th>Descrição</th><td>{form.descricao || "—"}</td></tr>
        <tr><th>Orientadora social</th><td>{form.orientadora}</td></tr>
        <tr><th>Oficina</th><td>{form.oficina || "—"}</td></tr>
      </tbody></table>
      <table className="ga-table"><thead><tr><th style={{ width: 36 }}>Nº</th><th>Nome</th><th style={{ width: 110 }}>NIS</th><th style={{ width: 150 }}>Assinatura</th></tr></thead>
        <tbody>
          {preenchidos.map((p, i) => (<tr key={i}><td>{i + 1}</td><td>{p.nome}</td><td>{p.nis}</td><td>&nbsp;</td></tr>))}
          {Array.from({ length: Math.max(0, 10 - preenchidos.length) }).map((_, i) => (<tr key={"e" + i}><td>{preenchidos.length + i + 1}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}

function DocListaParticipacaoForm({ ctx, onBack, editRecord }) {
  const { usuario, showToast, update } = ctx;
  const [form, setForm] = useState(editRecord?.formData || { data: todayISO(), atividade: "", objetivo: "", descricao: "", orientadora: usuario.nome, oficina: "", participantes: [{ nome: "", nis: "" }] });
  const setP = (i, key, val) => setForm((f) => ({ ...f, participantes: f.participantes.map((p, idx) => (idx === i ? { ...p, [key]: val } : p)) }));
  const addP = () => setForm((f) => ({ ...f, participantes: [...f.participantes, { nome: "", nis: "" }] }));
  const rmP = (i) => setForm((f) => ({ ...f, participantes: f.participantes.filter((_, idx) => idx !== i) }));
  const gerar = () => {
    if (!form.atividade) { showToast("Informe a atividade.", "error"); return; }
    const registro = { id: editRecord?.id || uid(), tipo: "lista", pacienteId: null, tituloBusca: form.atividade, data: form.data, formData: form, geradoPor: usuario.nome, criadoEm: editRecord?.criadoEm || new Date().toISOString(), atualizadoEm: new Date().toISOString() };
    if (editRecord) update("documentos", (arr) => arr.map((d) => (d.id === editRecord.id ? registro : d)));
    else update("documentos", (arr) => [registro, ...(arr || [])]);
    showToast(editRecord ? "Documento atualizado e salvo." : "Documento salvo — disponível em Documentos salvos.");
    ctx.openPrint("Lista de Participação", <DocListaPrint form={form} />);
  };
  return (
    <div className="max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar aos documentos</button>
      <p className="ga-display text-xl font-semibold mb-5">{editRecord ? "Editar " : ""}Lista de Participação</p>
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Data"><Input type="date" value={form.data} onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))} /></Field>
          <Field label="Atividade" required><Input value={form.atividade} onChange={(e) => setForm((f) => ({ ...f, atividade: e.target.value }))} /></Field>
        </div>
        <Field label="Objetivo"><Textarea rows={2} value={form.objetivo} onChange={(e) => setForm((f) => ({ ...f, objetivo: e.target.value }))} /></Field>
        <Field label="Descrição da atividade"><Textarea rows={2} value={form.descricao} onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Orientadora social"><Input value={form.orientadora} onChange={(e) => setForm((f) => ({ ...f, orientadora: e.target.value }))} /></Field>
          <Field label="Oficina"><Input value={form.oficina} onChange={(e) => setForm((f) => ({ ...f, oficina: e.target.value }))} /></Field>
        </div>
        <div>
          <SectionHeader icon={Users} right={<Button size="sm" variant="outline" icon={Plus} onClick={addP}>Adicionar</Button>}>Participantes</SectionHeader>
          {form.participantes.map((p, i) => (
            <div key={i} className="grid grid-cols-[20px_1fr_110px_auto] gap-2 mb-2 items-center">
              <span className="text-xs font-bold text-right" style={{ color: "var(--ink-faint)" }}>{i + 1}.</span>
              <Input placeholder="Nome" value={p.nome} onChange={(e) => setP(i, "nome", e.target.value)} />
              <Input placeholder="NIS" value={p.nis} onChange={(e) => setP(i, "nis", e.target.value)} />
              <button onClick={() => rmP(i)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={onBack}>Cancelar</Button><Button className="flex-1" icon={Printer} onClick={gerar}>Salvar e gerar PDF</Button></div>
      </Card>
    </div>
  );
}

const TIPO_DOC_LABEL = { emprestimo: "Termo de Empréstimo", entrevista: "Entrevista (SPSBD)", lista: "Lista de Participação", pdu: "Visita / PDU" };

function DocumentosArquivo({ ctx, onEditar }) {
  const { db, update, showToast } = ctx;
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busca, setBusca] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const documentos = (db.documentos || []).map((d) => ({ ...d, origem: "documentos" }));
  const visitasComoDoc = (db.visitas || []).map((v) => {
    const p = (db.pacientes || []).find((p) => p.id === v.pacienteId);
    return { id: v.id, tipo: "pdu", pacienteId: v.pacienteId, tituloBusca: p?.nome || "Paciente removido", data: v.data, geradoPor: v.tecnicoNome, criadoEm: v.criadoEm, origem: "visitas", _raw: v, _paciente: p };
  });
  const todosDocs = [...documentos, ...visitasComoDoc];

  const filtrados = todosDocs.filter((d) => {
    if (filtroTipo !== "todos" && d.tipo !== filtroTipo) return false;
    if (filtroData && d.data !== filtroData) return false;
    if (busca && !(d.tituloBusca || "").toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  }).sort((a, b) => (b.data || "").localeCompare(a.data || "") || (b.criadoEm || "").localeCompare(a.criadoEm || ""));

  const reimprimir = (d) => {
    if (d.tipo === "emprestimo") ctx.openPrint("Termo de Empréstimo de Equipamentos", <DocEmprestimoPrint form={d.formData} />);
    else if (d.tipo === "entrevista") ctx.openPrint("Formulário de Entrevista", <DocEntrevistaPrint form={d.formData} />);
    else if (d.tipo === "lista") ctx.openPrint("Lista de Participação", <DocListaPrint form={d.formData} />);
    else if (d.tipo === "pdu") { if (d._paciente) ctx.openPrint("Plano de Desenvolvimento do Usuário (PDU)", <VisitaPrintView paciente={d._paciente} visita={d._raw} />); else showToast("Paciente deste registro não foi encontrado.", "error"); }
  };
  const editar = (d) => {
    if (d.tipo === "pdu") { ctx.setSelectedVisitaId(d.id); ctx.setSelectedPacienteId(d.pacienteId); ctx.setAdminPage("visitas"); }
    else onEditar(d);
  };
  const excluirConfirmado = () => {
    const { id, origem } = confirmDelete;
    if (origem === "visitas") update("visitas", (arr) => arr.filter((v) => v.id !== id));
    else update("documentos", (arr) => arr.filter((x) => x.id !== id));
    showToast("Documento excluído.");
    setConfirmDelete(null);
  };

  return (
    <div>
      <Card className="p-5 mb-6">
        <div className="grid sm:grid-cols-4 gap-3 items-end">
          <Field label="Buscar por paciente/atividade"><Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Digite para buscar..." /></Field>
          <Field label="Tipo"><Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} options={Object.entries(TIPO_DOC_LABEL).map(([v, l]) => ({ value: v, label: l }))} placeholder="Todos" /></Field>
          <Field label="Data"><Input type="date" value={filtroData} onChange={(e) => setFiltroData(e.target.value)} /></Field>
          <Button variant="ghost" onClick={() => { setBusca(""); setFiltroTipo("todos"); setFiltroData(""); }}>Limpar filtros</Button>
        </div>
      </Card>
      {filtrados.length === 0 ? (
        <EmptyState icon={FolderOpen} title="Nenhum documento encontrado" description="Documentos gerados (termos, entrevistas, listas e visitas/PDU) aparecem aqui, prontos para buscar, reimprimir, editar ou excluir." />
      ) : (
        <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
          <thead><tr><th>Data</th><th>Tipo</th><th>Paciente / Atividade</th><th>Gerado por</th><th></th></tr></thead>
          <tbody>{filtrados.map((d) => (
            <tr key={d.origem + d.id}>
              <td className="ga-tabular">{fmtDate(d.data)}</td>
              <td><Badge tone="neutral">{TIPO_DOC_LABEL[d.tipo]}</Badge></td>
              <td className="font-semibold">{d.tituloBusca || "—"}</td>
              <td className="text-xs">{d.geradoPor}</td>
              <td><div className="flex gap-1">
                <button onClick={() => reimprimir(d)} title="Reimprimir / gerar PDF" className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Printer size={14} /></button>
                <button onClick={() => editar(d)} title="Editar" className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Pencil size={14} /></button>
                <button onClick={() => setConfirmDelete({ id: d.id, origem: d.origem, label: d.tituloBusca })} title="Excluir" className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table></div></Card>
      )}
      <ConfirmModal open={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={excluirConfirmado}
        message={`Tem certeza que deseja excluir "${confirmDelete?.label || "este documento"}"? Os dados salvos serão apagados permanentemente e não poderão ser recuperados.`} />
    </div>
  );
}

function LancamentoFichaForm({ ctx, onBack }) {
  const { usuario, showToast, update } = ctx;
  const emptyForm = () => ({ nome: "", sexo: "", nis: "", rg: "", cpf: "", nascimento: "", naturalidade: "", pcd: false, idoso: false, mae: "", pai: "", estadoCivil: "", escolaridade: "", rendaFamiliar: "", endereco: "", bairro: "", telefone: "", transferenciaRenda: "nao", qualTransferencia: "", bpc: "nao", composicao: [{ nome: "", nascimento: "", parentesco: "", escolaridade: "", profissao: "", ocupacao: "", renda: "" }] });
  const [form, setForm] = useState(emptyForm());
  const [contador, setContador] = useState(0);
  const nomeRef = useRef(null);
  const setComp = (i, key, val) => setForm((f) => ({ ...f, composicao: f.composicao.map((c, idx) => (idx === i ? { ...c, [key]: val } : c)) }));
  const addComp = () => setForm((f) => ({ ...f, composicao: [...f.composicao, { nome: "", nascimento: "", parentesco: "", escolaridade: "", profissao: "", ocupacao: "", renda: "" }] }));
  const rmComp = (i) => setForm((f) => ({ ...f, composicao: f.composicao.filter((_, idx) => idx !== i) }));

  const salvar = (sair) => {
    const nome = form.nome.trim();
    if (!nome) { showToast("Informe o nome do entrevistado.", "error"); nomeRef.current?.focus(); return; }
    const novoPaciente = { ...emptyPaciente(), id: uid(), nome, dataNascimento: form.nascimento, cpf: form.cpf, rg: form.rg, telefone: form.telefone, endereco: form.endereco, bairro: form.bairro, protegido: true };
    update("pacientes", (arr) => [novoPaciente, ...(arr || [])]);
    const registro = { id: uid(), tipo: "entrevista", pacienteId: novoPaciente.id, tituloBusca: nome, data: form.nascimento || todayISO(), formData: { ...form, nome }, geradoPor: usuario.nome, criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString() };
    update("documentos", (arr) => [registro, ...(arr || [])]);
    const total = contador + 1;
    setContador(total);
    if (sair) { showToast(`${nome} cadastrado(a) e protegido — ${total} nesta sessão.`); onBack(); return; }
    showToast(`${nome} cadastrado(a) e protegido — ${total} nesta sessão. Pronto para o próximo.`);
    setForm(emptyForm());
    nomeRef.current?.focus();
  };

  const ynBtn = (field, opts) => (
    <div className="flex gap-2 mb-2">{opts.map(([v, l]) => (<button key={v} onClick={() => setForm((f) => ({ ...f, [field]: v }))} className="btn btn-sm flex-1" style={{ background: form[field] === v ? "var(--rose-700)" : "#fff", color: form[field] === v ? "#fff" : "var(--ink-soft)", border: "1.5px solid " + (form[field] === v ? "transparent" : "var(--line)") }}>{l}</button>))}</div>
  );

  return (
    <div className="max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar aos documentos</button>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
        <p className="ga-display text-xl font-semibold">Lançamento de fichas de entrevista</p>
        {contador > 0 && <Badge tone="success"><CheckCircle2 size={12} className="inline -mt-0.5 mr-1" />{contador} cadastrado{contador > 1 ? "s" : ""} nesta sessão</Badge>}
      </div>
      <p className="text-sm mb-5" style={{ color: "var(--ink-soft)" }}>Modo rápido para digitar várias entrevistas em sequência, uma após a outra, olhando o formulário em papel. Cada envio cria o paciente (já protegido contra o "Zerar sistema") e o documento de entrevista juntos.</p>
      <Card className="p-6 space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Nome" required><Input ref={nomeRef} value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
          <Field label="Sexo"><Select value={form.sexo} onChange={(e) => setForm((f) => ({ ...f, sexo: e.target.value }))} options={[{ value: "F", label: "Feminino" }, { value: "M", label: "Masculino" }]} placeholder="—" /></Field>
          <Field label="NIS"><Input value={form.nis} onChange={(e) => setForm((f) => ({ ...f, nis: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="RG"><Input value={form.rg} onChange={(e) => setForm((f) => ({ ...f, rg: e.target.value }))} /></Field>
          <Field label="CPF"><Input value={form.cpf} onChange={(e) => setForm((f) => ({ ...f, cpf: maskCPF(e.target.value) }))} /></Field>
          <Field label="Nascimento"><Input type="date" value={form.nascimento} onChange={(e) => setForm((f) => ({ ...f, nascimento: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 items-end">
          <Field label="Naturalidade (Município/UF)"><Input value={form.naturalidade} onChange={(e) => setForm((f) => ({ ...f, naturalidade: e.target.value }))} /></Field>
          <div className="pb-2.5"><Checkbox label="Pessoa com deficiência" checked={form.pcd} onChange={(v) => setForm((f) => ({ ...f, pcd: v }))} /></div>
          <div className="pb-2.5"><Checkbox label="Pessoa idosa" checked={form.idoso} onChange={(v) => setForm((f) => ({ ...f, idoso: v }))} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nome da mãe"><Input value={form.mae} onChange={(e) => setForm((f) => ({ ...f, mae: e.target.value }))} /></Field>
          <Field label="Nome do pai"><Input value={form.pai} onChange={(e) => setForm((f) => ({ ...f, pai: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Estado civil"><Input value={form.estadoCivil} onChange={(e) => setForm((f) => ({ ...f, estadoCivil: e.target.value }))} /></Field>
          <Field label="Escolaridade"><Input value={form.escolaridade} onChange={(e) => setForm((f) => ({ ...f, escolaridade: e.target.value }))} placeholder="Ex: Fundamental incompleto" /></Field>
          <Field label="Renda familiar (R$)"><Input type="number" value={form.rendaFamiliar} onChange={(e) => setForm((f) => ({ ...f, rendaFamiliar: e.target.value }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <Field label="Endereço" className="sm:col-span-2"><Input value={form.endereco} onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))} /></Field>
          <Field label="Bairro"><Input value={form.bairro} onChange={(e) => setForm((f) => ({ ...f, bairro: e.target.value }))} /></Field>
          <Field label="Telefone"><Input value={form.telefone} onChange={(e) => setForm((f) => ({ ...f, telefone: maskTelefone(e.target.value) }))} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Recebe Programa de Transferência de Renda?">{ynBtn("transferenciaRenda", [["nao", "Não"], ["sim", "Sim"]])}{form.transferenciaRenda === "sim" && <Input placeholder="Qual programa?" value={form.qualTransferencia} onChange={(e) => setForm((f) => ({ ...f, qualTransferencia: e.target.value }))} />}</Field>
          <Field label="Recebe Benefício de Prestação Continuada (BPC)?">{ynBtn("bpc", [["nao", "Não"], ["sim", "Sim"]])}</Field>
        </div>
        <div>
          <SectionHeader icon={Users} right={<Button size="sm" variant="outline" icon={Plus} onClick={addComp}>Adicionar membro</Button>}>Composição familiar</SectionHeader>
          <div className="space-y-2">{form.composicao.map((c, i) => (
            <Card key={i} className="p-3" style={{ background: "var(--rose-50)" }}>
              <div className="grid sm:grid-cols-3 gap-2 mb-2"><Input placeholder="Nome" value={c.nome} onChange={(e) => setComp(i, "nome", e.target.value)} /><Input placeholder="Nascimento" type="date" value={c.nascimento} onChange={(e) => setComp(i, "nascimento", e.target.value)} /><Input placeholder="Parentesco" value={c.parentesco} onChange={(e) => setComp(i, "parentesco", e.target.value)} /></div>
              <div className="grid sm:grid-cols-4 gap-2"><Input placeholder="Escolaridade" value={c.escolaridade} onChange={(e) => setComp(i, "escolaridade", e.target.value)} /><Input placeholder="Profissão" value={c.profissao} onChange={(e) => setComp(i, "profissao", e.target.value)} /><Input placeholder="Ocupação" value={c.ocupacao} onChange={(e) => setComp(i, "ocupacao", e.target.value)} /><div className="flex gap-1"><Input placeholder="Renda R$" type="number" value={c.renda} onChange={(e) => setComp(i, "renda", e.target.value)} /><button onClick={() => rmComp(i)} className="btn-ghost btn-sm btn shrink-0" style={{ padding: 8, color: "#b3123a" }}><Trash2 size={14} /></button></div></div>
            </Card>
          ))}</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="ghost" onClick={onBack}>Sair</Button>
          <Button variant="outline" className="flex-1" icon={Save} onClick={() => salvar(true)}>Salvar e encerrar</Button>
          <Button className="flex-1" icon={ArrowRight} onClick={() => salvar(false)}>Salvar e lançar o próximo</Button>
        </div>
      </Card>
    </div>
  );
}

function AdminDocumentos({ ctx }) {
  const [tab, setTab] = useState("novo");
  const [doc, setDoc] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const voltar = () => { setDoc(null); setEditRecord(null); };
  const abrirEdicao = (registro) => { setEditRecord(registro); setDoc(registro.tipo); };

  if (doc === "emprestimo") return <DocEmprestimoForm ctx={ctx} onBack={voltar} editRecord={editRecord} />;
  if (doc === "entrevista") return <DocEntrevistaForm ctx={ctx} onBack={voltar} editRecord={editRecord} />;
  if (doc === "lista") return <DocListaParticipacaoForm ctx={ctx} onBack={voltar} editRecord={editRecord} />;
  if (doc === "lote") return <LancamentoFichaForm ctx={ctx} onBack={voltar} />;

  const cards = [
    { key: "emprestimo", icon: Package, title: "Termo de Empréstimo de Equipamentos", desc: "Preencha e gere o termo pronto para assinatura e impressão." },
    { key: "entrevista", icon: ClipboardList, title: "Formulário de Entrevista (SPSBD)", desc: "Entrevista socioeconômica e composição familiar." },
    { key: "lista", icon: ListChecks, title: "Lista de Participação em Atividade", desc: "Registro de presença em oficinas, palestras e atividades." },
  ];
  return (
    <div>
      <div className="flex gap-5 mb-6 ga-scroll-x" style={{ borderBottom: "1px solid var(--line)" }}>
        {[["novo", "Gerar novo documento"], ["lote", "Lançamento em lote"], ["arquivo", "Documentos salvos"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-0.5 pb-3 text-sm font-bold whitespace-nowrap" style={{ color: tab === k ? "var(--rose-700)" : "var(--ink-soft)", borderBottom: tab === k ? "2px solid var(--rose-700)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>
      {tab === "novo" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <Card key={c.key} className="p-6 cursor-pointer" onClick={() => { setEditRecord(null); setDoc(c.key); }}>
              <div className="rounded-2xl flex items-center justify-center mb-4" style={{ width: 52, height: 52, background: "var(--rose-100)" }}><c.icon size={22} color="var(--rose-700)" /></div>
              <p className="ga-display font-semibold mb-1.5">{c.title}</p>
              <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>{c.desc}</p>
              <span className="text-sm font-bold inline-flex items-center gap-1" style={{ color: "var(--rose-700)" }}>Preencher <ChevronRight size={15} /></span>
            </Card>
          ))}
        </div>
      ) : (
        <DocumentosArquivo ctx={ctx} onEditar={abrirEdicao} />
      )}
    </div>
  );
}

const METODO_PAGAMENTO = { pix: "Pix", transferencia: "Transferência bancária", boleto: "Boleto", debito: "Débito automático", dinheiro: "Dinheiro", cheque: "Cheque" };

function emptyParceria() {
  return {
    id: null, numero: "", orgao: "", objeto: "", planoTrabalho: "",
    dataAssinatura: todayISO(), vigenciaInicio: todayISO(), vigenciaFim: "",
    valorTotal: "", valorMensal: "", dataPrestacaoContas: "", divulgar: false,
    status: "vigente", despesasPlanejadas: [], criadoEm: new Date().toISOString(),
  };
}

function AdminParcerias({ ctx }) {
  const { db, update, showToast, usuario } = ctx;
  const [tab, setTab] = useState("parcerias");
  const parcerias = (db.parcerias || []).slice().sort((a, b) => (b.dataAssinatura || "").localeCompare(a.dataAssinatura || ""));
  const lancamentos = db.lancamentosParceria || [];

  /* ---------- Parceria: cadastro ---------- */
  const [form, setForm] = useState(emptyParceria());
  const [formOpen, setFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const abrirNova = () => { setForm(emptyParceria()); setFormOpen(true); };
  const abrirEdicao = (p) => { setForm({ ...emptyParceria(), ...p }); setFormOpen(true); };
  const addPlanejada = () => setForm((f) => ({ ...f, despesasPlanejadas: [...f.despesasPlanejadas, { id: uid(), categoria: "", descricao: "", valor: "" }] }));
  const setPlanejada = (id, key, val) => setForm((f) => ({ ...f, despesasPlanejadas: f.despesasPlanejadas.map((d) => (d.id === id ? { ...d, [key]: val } : d)) }));
  const rmPlanejada = (id) => setForm((f) => ({ ...f, despesasPlanejadas: f.despesasPlanejadas.filter((d) => d.id !== id) }));

  const salvarParceria = () => {
    if (!form.numero.trim()) { showToast("Informe o número da parceria.", "error"); return; }
    if (!form.orgao.trim()) { showToast("Informe o órgão/entidade parceira.", "error"); return; }
    if (form.id) { update("parcerias", (arr) => arr.map((p) => (p.id === form.id ? form : p))); showToast("Parceria atualizada."); }
    else { update("parcerias", (arr) => [{ ...form, id: uid() }, ...(arr || [])]); showToast("Parceria cadastrada."); }
    setFormOpen(false);
  };
  const excluirParceria = () => {
    update("parcerias", (arr) => arr.filter((p) => p.id !== confirmDelete.id));
    update("lancamentosParceria", (arr) => arr.filter((l) => l.parceriaId !== confirmDelete.id));
    showToast("Parceria e seus lançamentos foram excluídos."); setConfirmDelete(null);
  };

  /* ---------- Lançamentos de execução ---------- */
  const emptyLanc = { parceriaId: "", planejadaId: "", data: todayISO(), descricao: "", categoria: "", valor: "", metodoPagamento: "pix", nfeNumero: "", nfeChave: "", justificativa: "", anexoNfeNome: "", anexoNfe: "", anexoCompNome: "", anexoComp: "" };
  const [lanc, setLanc] = useState(emptyLanc);
  const [lancOpen, setLancOpen] = useState(false);
  const [confirmDelLanc, setConfirmDelLanc] = useState(null);
  const [filtroParceria, setFiltroParceria] = useState("");

  const anexar = async (file, campoNome, campoB64) => {
    if (!file) return;
    try { const b64 = await fileToCompressedDataUrl(file); setLanc((f) => ({ ...f, [campoNome]: file.name, [campoB64]: b64 })); }
    catch { showToast("Não foi possível anexar o arquivo.", "error"); }
  };
  const salvarLancamento = () => {
    if (!lanc.parceriaId) { showToast("Selecione a parceria.", "error"); return; }
    if (!lanc.descricao.trim()) { showToast("Descreva a despesa executada.", "error"); return; }
    if (!Number(lanc.valor)) { showToast("Informe o valor executado.", "error"); return; }
    if (lanc.id) { update("lancamentosParceria", (arr) => arr.map((l) => (l.id === lanc.id ? lanc : l))); showToast("Lançamento atualizado."); }
    else { update("lancamentosParceria", (arr) => [{ ...lanc, id: uid(), registradoPor: usuario.nome, criadoEm: new Date().toISOString() }, ...(arr || [])]); showToast("Lançamento registrado."); }
    setLancOpen(false); setLanc(emptyLanc);
  };

  /* ---------- Prestação de contas ---------- */
  const [prestacaoId, setPrestacaoId] = useState("");
  const parceriaSel = parcerias.find((p) => p.id === prestacaoId);
  const lancDaParceria = lancamentos.filter((l) => l.parceriaId === prestacaoId);
  const comparativo = parceriaSel ? (parceriaSel.despesasPlanejadas || []).map((d) => {
    const exec = lancDaParceria.filter((l) => l.planejadaId === d.id);
    const executado = exec.reduce((s, l) => s + Number(l.valor || 0), 0);
    return { ...d, executado, diferenca: executado - Number(d.valor || 0), justificativas: exec.map((l) => l.justificativa).filter(Boolean) };
  }) : [];
  const semVinculo = lancDaParceria.filter((l) => !l.planejadaId);
  const totalPlanejado = comparativo.reduce((s, c) => s + Number(c.valor || 0), 0);
  const totalExecutado = lancDaParceria.reduce((s, l) => s + Number(l.valor || 0), 0);

  /* ---------- Relatório de gestão ---------- */
  const [de, setDe] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10); });
  const [ate, setAte] = useState(todayISO());
  const noPeriodo = (data) => data && data >= de && data <= ate;
  const gestao = {
    atendimentos: (db.atendimentos || []).filter((a) => noPeriodo(a.data)).length,
    visitas: (db.visitas || []).filter((v) => noPeriodo(v.data)).length,
    pacientesNovos: (db.pacientes || []).filter((p) => noPeriodo(p.dataCadastro)).length,
    documentos: (db.documentos || []).filter((d) => noPeriodo(d.data)).length,
    receitas: (db.financeiro || []).filter((e) => e.tipo === "receita" && noPeriodo(e.data)).reduce((s, e) => s + Number(e.valor || 0), 0),
    despesas: (db.financeiro || []).filter((e) => e.tipo === "despesa" && noPeriodo(e.data)).reduce((s, e) => s + Number(e.valor || 0), 0),
  };

  const TABS = [["parcerias", "Parcerias"], ["lancamentos", "Lançamentos"], ["prestacao", "Prestação de contas"], ["gestao", "Relatório de gestão"]];

  return (
    <div>
      <div className="flex gap-5 mb-6 ga-scroll-x" style={{ borderBottom: "1px solid var(--line)" }}>
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-0.5 pb-3 text-sm font-bold whitespace-nowrap" style={{ color: tab === k ? "var(--rose-700)" : "var(--ink-soft)", borderBottom: tab === k ? "2px solid var(--rose-700)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>

      {/* ===== PARCERIAS ===== */}
      {tab === "parcerias" && (
        <div>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <p className="text-sm max-w-2xl" style={{ color: "var(--ink-soft)" }}>Cadastro dos termos de colaboração, fomento e convênios públicos, com plano de trabalho e despesas planejadas — base para a prestação de contas (Lei 13.019/2014).</p>
            <Button icon={Plus} onClick={abrirNova}>Nova parceria</Button>
          </div>
          {parcerias.length === 0 ? <EmptyState icon={Landmark} title="Nenhuma parceria cadastrada" description="Cadastre a primeira parceria para começar a controlar planejado × executado." action={<Button icon={Plus} onClick={abrirNova}>Cadastrar parceria</Button>} /> : (
            <div className="space-y-3">{parcerias.map((p) => {
              const exec = lancamentos.filter((l) => l.parceriaId === p.id).reduce((s, l) => s + Number(l.valor || 0), 0);
              const planejado = (p.despesasPlanejadas || []).reduce((s, d) => s + Number(d.valor || 0), 0);
              return (
                <Card key={p.id} className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="ga-display font-semibold">{p.numero}</p>
                        <Badge tone={p.status === "vigente" ? "success" : p.status === "prestada" ? "pink" : "neutral"}>{p.status}</Badge>
                        {p.divulgar && <Badge tone="neutral">No site público</Badge>}
                      </div>
                      <p className="text-sm font-semibold">{p.orgao}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>{p.objeto || "Objeto não informado"}</p>
                      <p className="text-xs mt-1.5" style={{ color: "var(--ink-faint)" }}>
                        Vigência {fmtDate(p.vigenciaInicio)} a {p.vigenciaFim ? fmtDate(p.vigenciaFim) : "—"} · Prestação até {p.dataPrestacaoContas ? fmtDate(p.dataPrestacaoContas) : "—"}
                      </p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => abrirEdicao(p)} className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Pencil size={14} /></button>
                      <button onClick={() => setConfirmDelete(p)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                    <div><p className="text-[11px] font-bold" style={{ color: "var(--ink-faint)" }}>VALOR TOTAL</p><p className="font-bold text-sm ga-tabular">{fmtBRL(p.valorTotal)}</p></div>
                    <div><p className="text-[11px] font-bold" style={{ color: "var(--ink-faint)" }}>MENSAL</p><p className="font-bold text-sm ga-tabular">{p.valorMensal ? fmtBRL(p.valorMensal) : "—"}</p></div>
                    <div><p className="text-[11px] font-bold" style={{ color: "var(--ink-faint)" }}>PLANEJADO</p><p className="font-bold text-sm ga-tabular">{fmtBRL(planejado)}</p></div>
                    <div><p className="text-[11px] font-bold" style={{ color: "var(--ink-faint)" }}>EXECUTADO</p><p className="font-bold text-sm ga-tabular" style={{ color: exec > planejado && planejado > 0 ? "#b3123a" : "var(--ink)" }}>{fmtBRL(exec)}</p></div>
                  </div>
                </Card>
              );
            })}</div>
          )}
        </div>
      )}

      {/* ===== LANÇAMENTOS ===== */}
      {tab === "lancamentos" && (
        <div>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="min-w-[220px] flex-1 max-w-sm">
              <Field label="Filtrar por parceria" className="mb-0"><Select value={filtroParceria} onChange={(e) => setFiltroParceria(e.target.value)} options={parcerias.map((p) => ({ value: p.id, label: `${p.numero} — ${p.orgao}` }))} placeholder="Todas as parcerias" /></Field>
            </div>
            <Button icon={Plus} onClick={() => { setLanc({ ...emptyLanc, parceriaId: filtroParceria || "" }); setLancOpen(true); }} disabled={parcerias.length === 0}>Novo lançamento</Button>
          </div>
          {parcerias.length === 0 ? <EmptyState icon={Landmark} title="Cadastre uma parceria primeiro" description="Os lançamentos de execução são sempre vinculados a uma parceria." /> : (() => {
            const lista = lancamentos.filter((l) => !filtroParceria || l.parceriaId === filtroParceria).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
            if (lista.length === 0) return <EmptyState icon={Wallet} title="Nenhum lançamento registrado" description="Registre as despesas executadas com nota fiscal e comprovante de pagamento." />;
            return (
              <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
                <thead><tr><th>Data</th><th>Parceria</th><th>Descrição</th><th>Valor</th><th>Pagamento</th><th>NF-e</th><th>Comprov.</th><th></th></tr></thead>
                <tbody>{lista.map((l) => {
                  const par = parcerias.find((p) => p.id === l.parceriaId);
                  return (
                    <tr key={l.id}>
                      <td className="ga-tabular">{fmtDate(l.data)}</td>
                      <td className="text-xs font-semibold">{par ? par.numero : "—"}</td>
                      <td>{l.descricao}</td>
                      <td className="ga-tabular font-semibold">{fmtBRL(l.valor)}</td>
                      <td className="text-xs">{METODO_PAGAMENTO[l.metodoPagamento] || "—"}</td>
                      <td>{l.anexoNfe ? <a href={l.anexoNfe} target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose-700)" }}><FileText size={15} /></a> : (l.nfeNumero || "—")}</td>
                      <td>{l.anexoComp ? <a href={l.anexoComp} target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose-700)" }}><Camera size={15} /></a> : "—"}</td>
                      <td><div className="flex gap-1">
                        <button onClick={() => { setLanc({ ...emptyLanc, ...l }); setLancOpen(true); }} className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Pencil size={14} /></button>
                        <button onClick={() => setConfirmDelLanc(l)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
                      </div></td>
                    </tr>
                  );
                })}</tbody>
              </table></div></Card>
            );
          })()}
        </div>
      )}

      {/* ===== PRESTAÇÃO DE CONTAS ===== */}
      {tab === "prestacao" && (
        <div>
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div className="min-w-[240px] flex-1 max-w-md">
              <Field label="Parceria" className="mb-0"><Select value={prestacaoId} onChange={(e) => setPrestacaoId(e.target.value)} options={parcerias.map((p) => ({ value: p.id, label: `${p.numero} — ${p.orgao}` }))} placeholder="Selecione a parceria..." /></Field>
            </div>
            {parceriaSel && <Button icon={Printer} onClick={() => ctx.openPrint("Prestação de Contas", <PrestacaoContasPrint parceria={parceriaSel} comparativo={comparativo} semVinculo={semVinculo} totalPlanejado={totalPlanejado} totalExecutado={totalExecutado} />)}>Gerar relatório</Button>}
          </div>
          {!parceriaSel ? <EmptyState icon={FileText} title="Selecione uma parceria" description="Escolha a parceria acima para ver o comparativo entre o planejado e o executado." /> : (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard icon={Landmark} label="Planejado" value={fmtBRL(totalPlanejado)} />
                <StatCard icon={Wallet} label="Executado" value={fmtBRL(totalExecutado)} tone="ink" />
                <StatCard icon={TrendingUp} label="Diferença" value={fmtBRL(totalExecutado - totalPlanejado)} />
              </div>
              <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
                <thead><tr><th>Despesa planejada</th><th>Categoria</th><th>Planejado</th><th>Executado</th><th>Diferença</th><th>Justificativa</th></tr></thead>
                <tbody>{comparativo.length === 0 ? <tr><td colSpan={6} className="text-center text-sm" style={{ color: "var(--ink-faint)" }}>Nenhuma despesa planejada cadastrada nesta parceria.</td></tr> : comparativo.map((c) => (
                  <tr key={c.id}>
                    <td className="font-semibold">{c.descricao || "—"}</td>
                    <td className="text-xs">{CAT_DESPESA[c.categoria] || "—"}</td>
                    <td className="ga-tabular">{fmtBRL(c.valor)}</td>
                    <td className="ga-tabular">{fmtBRL(c.executado)}</td>
                    <td className="ga-tabular font-semibold" style={{ color: Math.abs(c.diferenca) < 0.01 ? "var(--ink-soft)" : c.diferenca > 0 ? "#b3123a" : "#1a7a45" }}>{fmtBRL(c.diferenca)}</td>
                    <td className="text-xs">{c.justificativas.length ? c.justificativas.join(" | ") : (Math.abs(c.diferenca) < 0.01 ? "—" : <span style={{ color: "#b3123a" }}>Pendente</span>)}</td>
                  </tr>
                ))}</tbody>
              </table></div></Card>
              {semVinculo.length > 0 && (
                <Card className="p-4" style={{ background: "#fdeecb" }}>
                  <p className="font-bold text-sm mb-1" style={{ color: "#8a5a08" }}>{semVinculo.length} lançamento(s) sem vínculo com despesa planejada</p>
                  <p className="text-xs" style={{ color: "#8a5a08" }}>O MROSC pede nexo entre a despesa executada e o plano de trabalho. Edite esses lançamentos e vincule-os a uma linha do planejamento, ou justifique a despesa extra.</p>
                </Card>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===== RELATÓRIO DE GESTÃO ===== */}
      {tab === "gestao" && (
        <div>
          <Card className="p-5 mb-6">
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <Field label="De" className="mb-0"><Input type="date" value={de} onChange={(e) => setDe(e.target.value)} /></Field>
              <Field label="Até" className="mb-0"><Input type="date" value={ate} onChange={(e) => setAte(e.target.value)} /></Field>
              <Button icon={Printer} onClick={() => ctx.openPrint("Relatório de Gestão", <RelatorioGestaoPrint de={de} ate={ate} dados={gestao} parcerias={parcerias} lancamentos={lancamentos} />)}>Gerar relatório</Button>
            </div>
          </Card>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Pill} label="Atendimentos" value={gestao.atendimentos} />
            <StatCard icon={MapPinned} label="Visitas / PDU" value={gestao.visitas} />
            <StatCard icon={ClipboardList} label="Novos pacientes" value={gestao.pacientesNovos} tone="ink" />
            <StatCard icon={FileText} label="Documentos emitidos" value={gestao.documentos} />
          </div>
          <Card className="p-6">
            <SectionHeader icon={Wallet}>Resultado do período (DRE simplificado)</SectionHeader>
            <table className="ga-table"><tbody>
              <tr><th style={{ width: "60%" }}>Receitas realizadas</th><td className="ga-tabular font-semibold">{fmtBRL(gestao.receitas)}</td></tr>
              <tr><th>(–) Despesas realizadas</th><td className="ga-tabular font-semibold">{fmtBRL(gestao.despesas)}</td></tr>
              <tr><th>(=) Resultado do período</th><td className="ga-tabular font-bold" style={{ color: gestao.receitas - gestao.despesas >= 0 ? "#1a7a45" : "#b3123a" }}>{fmtBRL(gestao.receitas - gestao.despesas)}</td></tr>
            </tbody></table>
          </Card>
        </div>
      )}

      {/* ===== MODAL: PARCERIA ===== */}
      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={form.id ? "Editar parceria" : "Nova parceria"} wide
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setFormOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={salvarParceria}>Salvar parceria</Button></div>}>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Número da parceria" required hint="Ex: Termo de Colaboração nº 004/2026"><Input value={form.numero} onChange={(e) => setForm((f) => ({ ...f, numero: e.target.value }))} /></Field>
            <Field label="Órgão / entidade parceira" required><Input value={form.orgao} onChange={(e) => setForm((f) => ({ ...f, orgao: e.target.value }))} placeholder="Ex: Prefeitura Municipal de Orlândia" /></Field>
          </div>
          <Field label="Objeto da parceria"><Input value={form.objeto} onChange={(e) => setForm((f) => ({ ...f, objeto: e.target.value }))} placeholder="Resumo do que a parceria financia" /></Field>
          <Field label="Descrição do plano de trabalho"><Textarea rows={4} value={form.planoTrabalho} onChange={(e) => setForm((f) => ({ ...f, planoTrabalho: e.target.value }))} placeholder="Metas, atividades previstas e resultados esperados..." /></Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Data de assinatura"><Input type="date" value={form.dataAssinatura} onChange={(e) => setForm((f) => ({ ...f, dataAssinatura: e.target.value }))} /></Field>
            <Field label="Vigência — início"><Input type="date" value={form.vigenciaInicio} onChange={(e) => setForm((f) => ({ ...f, vigenciaInicio: e.target.value }))} /></Field>
            <Field label="Vigência — fim (vencimento)"><Input type="date" value={form.vigenciaFim} onChange={(e) => setForm((f) => ({ ...f, vigenciaFim: e.target.value }))} /></Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Valor total (R$)"><Input type="number" value={form.valorTotal} onChange={(e) => setForm((f) => ({ ...f, valorTotal: e.target.value }))} /></Field>
            <Field label="Valor mensal (R$)"><Input type="number" value={form.valorMensal} onChange={(e) => setForm((f) => ({ ...f, valorMensal: e.target.value }))} /></Field>
            <Field label="Prestação de contas até"><Input type="date" value={form.dataPrestacaoContas} onChange={(e) => setForm((f) => ({ ...f, dataPrestacaoContas: e.target.value }))} /></Field>
          </div>
          <Field label="Situação"><Select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} options={[{ value: "vigente", label: "Vigente" }, { value: "encerrada", label: "Encerrada" }, { value: "prestada", label: "Contas prestadas" }]} /></Field>
          <div>
            <SectionHeader icon={ListChecks} right={<Button size="sm" variant="outline" icon={Plus} onClick={addPlanejada}>Adicionar</Button>}>Despesas planejadas (plano de trabalho)</SectionHeader>
            {form.despesasPlanejadas.length === 0 && <p className="text-sm" style={{ color: "var(--ink-faint)" }}>Nenhuma despesa planejada. É o planejamento que serve de base para o comparativo da prestação de contas.</p>}
            <div className="space-y-2">{form.despesasPlanejadas.map((d) => (
              <div key={d.id} className="grid sm:grid-cols-[1fr_1fr_120px_auto] gap-2 items-center">
                <Input placeholder="Descrição" value={d.descricao} onChange={(e) => setPlanejada(d.id, "descricao", e.target.value)} />
                <Select value={d.categoria} onChange={(e) => setPlanejada(d.id, "categoria", e.target.value)} options={Object.entries(CAT_DESPESA).map(([v, l]) => ({ value: v, label: l }))} placeholder="Categoria" />
                <Input type="number" placeholder="Valor" value={d.valor} onChange={(e) => setPlanejada(d.id, "valor", e.target.value)} />
                <button onClick={() => rmPlanejada(d.id)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button>
              </div>
            ))}</div>
          </div>
          <Card className="p-4 flex items-start gap-3" style={{ background: "var(--rose-50)" }}>
            <Eye size={20} color="var(--rose-700)" className="shrink-0 mt-0.5" />
            <div>
              <Checkbox label="Divulgar esta parceria no site público" checked={form.divulgar} onChange={(v) => setForm((f) => ({ ...f, divulgar: v }))} />
              <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Aparece na página de Transparência com número, órgão, objeto, vigência e valor. Lançamentos e anexos nunca são publicados.</p>
            </div>
          </Card>
        </div>
      </Modal>

      {/* ===== MODAL: LANÇAMENTO ===== */}
      <Modal open={lancOpen} onClose={() => setLancOpen(false)} title={lanc.id ? "Editar lançamento" : "Novo lançamento de execução"} wide
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setLancOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={salvarLancamento}>Salvar lançamento</Button></div>}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Parceria" required><Select value={lanc.parceriaId} onChange={(e) => setLanc((f) => ({ ...f, parceriaId: e.target.value, planejadaId: "" }))} options={parcerias.map((p) => ({ value: p.id, label: `${p.numero} — ${p.orgao}` }))} placeholder="Selecione..." /></Field>
            <Field label="Vincular à despesa planejada" hint="O MROSC pede nexo entre despesa e plano de trabalho">
              <Select value={lanc.planejadaId} onChange={(e) => setLanc((f) => ({ ...f, planejadaId: e.target.value }))} options={((parcerias.find((p) => p.id === lanc.parceriaId) || {}).despesasPlanejadas || []).map((d) => ({ value: d.id, label: `${d.descricao || "sem descrição"} — ${fmtBRL(d.valor)}` }))} placeholder="Sem vínculo (despesa extra)" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Data" ><Input type="date" value={lanc.data} onChange={(e) => setLanc((f) => ({ ...f, data: e.target.value }))} /></Field>
            <Field label="Valor executado (R$)" required><Input type="number" value={lanc.valor} onChange={(e) => setLanc((f) => ({ ...f, valor: e.target.value }))} /></Field>
            <Field label="Categoria"><Select value={lanc.categoria} onChange={(e) => setLanc((f) => ({ ...f, categoria: e.target.value }))} options={Object.entries(CAT_DESPESA).map(([v, l]) => ({ value: v, label: l }))} placeholder="Selecione..." /></Field>
          </div>
          <Field label="Descrição da despesa" required><Input value={lanc.descricao} onChange={(e) => setLanc((f) => ({ ...f, descricao: e.target.value }))} /></Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Método de pagamento"><Select value={lanc.metodoPagamento} onChange={(e) => setLanc((f) => ({ ...f, metodoPagamento: e.target.value }))} options={Object.entries(METODO_PAGAMENTO).map(([v, l]) => ({ value: v, label: l }))} /></Field>
            <Field label="Nº da NF-e"><Input value={lanc.nfeNumero} onChange={(e) => setLanc((f) => ({ ...f, nfeNumero: e.target.value }))} /></Field>
            <Field label="Chave de acesso da NF-e" hint="44 dígitos"><Input value={lanc.nfeChave} onChange={(e) => setLanc((f) => ({ ...f, nfeChave: e.target.value.replace(/\D/g, "").slice(0, 44) }))} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Anexar nota fiscal">
              <input type="file" accept="image/*" onChange={(e) => anexar(e.target.files?.[0], "anexoNfeNome", "anexoNfe")} className="text-sm" />
              {lanc.anexoNfe && <img src={lanc.anexoNfe} alt="NF-e" className="mt-2 rounded-lg" style={{ maxHeight: 110 }} />}
            </Field>
            <Field label="Anexar comprovante de pagamento">
              <input type="file" accept="image/*" onChange={(e) => anexar(e.target.files?.[0], "anexoCompNome", "anexoComp")} className="text-sm" />
              {lanc.anexoComp && <img src={lanc.anexoComp} alt="Comprovante" className="mt-2 rounded-lg" style={{ maxHeight: 110 }} />}
            </Field>
          </div>
          <Field label="Justificativa (se houver diferença em relação ao planejado)"><Textarea rows={3} value={lanc.justificativa} onChange={(e) => setLanc((f) => ({ ...f, justificativa: e.target.value }))} placeholder="Explique o motivo da diferença entre o valor planejado e o executado..." /></Field>
        </div>
      </Modal>

      <ConfirmModal open={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={excluirParceria}
        message={`Excluir a parceria "${confirmDelete?.numero || ""}"? Todos os lançamentos de execução vinculados a ela também serão apagados permanentemente.`} />
      <ConfirmModal open={!!confirmDelLanc} onCancel={() => setConfirmDelLanc(null)}
        onConfirm={() => { update("lancamentosParceria", (arr) => arr.filter((l) => l.id !== confirmDelLanc.id)); showToast("Lançamento excluído."); setConfirmDelLanc(null); }}
        message={`Excluir o lançamento "${confirmDelLanc?.descricao || ""}"? Os anexos também serão apagados.`} />
    </div>
  );
}

function PrestacaoContasPrint({ parceria: p, comparativo, semVinculo, totalPlanejado, totalExecutado }) {
  return (
    <div>
      <PrintHeader subtitle="Prestação de Contas — Lei nº 13.019/2014" />
      <h2 className="ga-display font-bold text-lg text-center mb-5">RELATÓRIO DE EXECUÇÃO DO OBJETO E FINANCEIRA</h2>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: 170 }}>Parceria</th><td colSpan={3}>{p.numero}</td></tr>
        <tr><th>Órgão parceiro</th><td colSpan={3}>{p.orgao}</td></tr>
        <tr><th>Objeto</th><td colSpan={3}>{p.objeto || "—"}</td></tr>
        <tr><th>Vigência</th><td>{fmtDate(p.vigenciaInicio)} a {p.vigenciaFim ? fmtDate(p.vigenciaFim) : "—"}</td><th style={{ width: 150 }}>Valor total</th><td>{fmtBRL(p.valorTotal)}</td></tr>
        <tr><th>Prestação de contas até</th><td>{p.dataPrestacaoContas ? fmtDate(p.dataPrestacaoContas) : "—"}</td><th>Valor mensal</th><td>{p.valorMensal ? fmtBRL(p.valorMensal) : "—"}</td></tr>
      </tbody></table>
      <p className="font-bold mb-1">Plano de trabalho</p>
      <p className="text-sm mb-4" style={{ whiteSpace: "pre-wrap" }}>{p.planoTrabalho || "—"}</p>
      <p className="font-bold mb-2">Comparativo: planejado × executado</p>
      <table className="ga-table mb-4">
        <thead><tr><th>Despesa planejada</th><th>Categoria</th><th>Planejado</th><th>Executado</th><th>Diferença</th><th>Justificativa</th></tr></thead>
        <tbody>
          {comparativo.map((c) => (
            <tr key={c.id}><td>{c.descricao || "—"}</td><td>{CAT_DESPESA[c.categoria] || "—"}</td><td>{fmtBRL(c.valor)}</td><td>{fmtBRL(c.executado)}</td><td>{fmtBRL(c.diferenca)}</td><td>{c.justificativas.join(" | ") || "—"}</td></tr>
          ))}
          <tr><th colSpan={2}>TOTAIS</th><th>{fmtBRL(totalPlanejado)}</th><th>{fmtBRL(totalExecutado)}</th><th colSpan={2}>{fmtBRL(totalExecutado - totalPlanejado)}</th></tr>
        </tbody>
      </table>
      {semVinculo.length > 0 && (<>
        <p className="font-bold mb-2">Despesas executadas sem vínculo com o planejamento</p>
        <table className="ga-table mb-4">
          <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Pagamento</th><th>NF-e</th><th>Justificativa</th></tr></thead>
          <tbody>{semVinculo.map((l) => (<tr key={l.id}><td>{fmtDate(l.data)}</td><td>{l.descricao}</td><td>{fmtBRL(l.valor)}</td><td>{METODO_PAGAMENTO[l.metodoPagamento] || "—"}</td><td>{l.nfeNumero || "—"}</td><td>{l.justificativa || "—"}</td></tr>))}</tbody>
        </table>
      </>)}
      <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>Documentos comprobatórios (notas fiscais e comprovantes de pagamento) estão arquivados no sistema, vinculados a cada lançamento, e ficam disponíveis para conferência.</p>
      <PrintFooterSignature signerName="" signerRole="Responsável pela prestação de contas" capturedAt={new Date().toISOString()} />
    </div>
  );
}

function RelatorioGestaoPrint({ de, ate, dados, parcerias, lancamentos }) {
  return (
    <div>
      <PrintHeader subtitle="Relatório de Gestão" />
      <h2 className="ga-display font-bold text-lg text-center mb-1">RELATÓRIO DE GESTÃO</h2>
      <p className="text-center text-sm mb-5" style={{ color: "var(--ink-soft)" }}>Período de {fmtDate(de)} a {fmtDate(ate)}</p>
      <p className="font-bold mb-2">Atendimentos realizados no período</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: "60%" }}>Atendimentos (medicamentos e apoio)</th><td>{dados.atendimentos}</td></tr>
        <tr><th>Visitas domiciliares / PDU</th><td>{dados.visitas}</td></tr>
        <tr><th>Novos pacientes cadastrados</th><td>{dados.pacientesNovos}</td></tr>
        <tr><th>Documentos emitidos</th><td>{dados.documentos}</td></tr>
      </tbody></table>
      <p className="font-bold mb-2">Demonstrativo do resultado no período</p>
      <table className="ga-table mb-4"><tbody>
        <tr><th style={{ width: "60%" }}>Receitas realizadas</th><td>{fmtBRL(dados.receitas)}</td></tr>
        <tr><th>(–) Despesas realizadas</th><td>{fmtBRL(dados.despesas)}</td></tr>
        <tr><th>(=) Resultado do período</th><td>{fmtBRL(dados.receitas - dados.despesas)}</td></tr>
      </tbody></table>
      <p className="font-bold mb-2">Parcerias vigentes</p>
      <table className="ga-table mb-4">
        <thead><tr><th>Parceria</th><th>Órgão</th><th>Vigência</th><th>Valor total</th><th>Executado</th></tr></thead>
        <tbody>{parcerias.length === 0 ? <tr><td colSpan={5}>Nenhuma parceria cadastrada.</td></tr> : parcerias.map((p) => (
          <tr key={p.id}><td>{p.numero}</td><td>{p.orgao}</td><td>{fmtDate(p.vigenciaInicio)} a {p.vigenciaFim ? fmtDate(p.vigenciaFim) : "—"}</td><td>{fmtBRL(p.valorTotal)}</td><td>{fmtBRL(lancamentos.filter((l) => l.parceriaId === p.id).reduce((s, l) => s + Number(l.valor || 0), 0))}</td></tr>
        ))}</tbody>
      </table>
      <PrintFooterSignature signerName="" signerRole="Responsável pelo relatório" capturedAt={new Date().toISOString()} />
    </div>
  );
}

const PREMIO_BIBLIOTECA = ["Bicicleta", "Smart TV", "Celular", "Notebook", "Geladeira", "Fogão", "Air fryer", "Cesta de produtos", "Vale-compras", "Kit churrasco", "Caixa de som", "Jogo de panelas"];

function emptySorteio() {
  return {
    id: null, titulo: "", descricao: "", categoria: "", fotoBase64: "",
    quantidadeNumeros: "100", valorCota: "10",
    dataInicio: todayISO(), dataFim: "", dataSorteio: "", horaSorteio: "20:00",
    publicado: false, status: "rascunho",
    premios: [{ id: uid(), nome: "", descricao: "", fotoBase64: "" }],
    vencedores: [], valorPremioPago: "", criadoEm: new Date().toISOString(),
  };
}
function emptyPedidoSorteio(sorteioId) {
  return { id: null, sorteioId, nome: "", telefone: "", endereco: "", cpf: "", email: "", quantidade: 1, numeros: [], status: "aguardando_pix", txid: uid().slice(0, 12), criadoEm: new Date().toISOString(), pagoEm: "", confirmadoPor: "" };
}

function numerosVendidos(sorteioId, pedidos) {
  return pedidos.filter((p) => p.sorteioId === sorteioId && p.status === "pago").reduce((s, p) => s + (p.numeros || []).length, 0);
}
function proximosNumerosLivres(sorteio, pedidos, qtd) {
  const ocupados = new Set(pedidos.filter((p) => p.sorteioId === sorteio.id && (p.status === "pago" || p.status === "aguardando_pix")).flatMap((p) => p.numeros || []));
  const livres = [];
  for (let n = 1; n <= Number(sorteio.quantidadeNumeros); n++) { if (!ocupados.has(n)) livres.push(n); if (livres.length >= qtd) break; }
  return livres;
}

function SorteioPage({ ctx }) {
  const publicos = (ctx.db.sorteios || []).filter((s) => s.publicado);
  const selecionado = ctx.sorteioPublicoId ? publicos.find((s) => s.id === ctx.sorteioPublicoId) : (publicos.length === 1 ? publicos[0] : null);

  if (publicos.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-20 text-center">
        <Gift size={40} color="var(--rose-300)" className="mx-auto mb-4" />
        <p className="ga-display font-semibold mb-2" style={{ fontSize: "1.4rem" }}>Nenhum sorteio disponível no momento</p>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Assim que abrirmos um novo sorteio, ele aparece aqui e na página inicial.</p>
      </div>
    );
  }
  if (!selecionado) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-14">
        <h1 className="ga-display font-semibold mb-8" style={{ fontSize: "1.9rem" }}>Sorteios em andamento</h1>
        <div className="space-y-4">{publicos.map((s) => (
          <Card key={s.id} className="p-6 cursor-pointer" onClick={() => ctx.setSorteioPublicoId(s.id)}>
            <p className="ga-display font-semibold" style={{ fontSize: "1.25rem" }}>{s.titulo}</p>
            <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>{(s.premios || []).map((p) => p.nome).filter(Boolean).join(", ")}</p>
          </Card>
        ))}</div>
      </div>
    );
  }
  return <SorteioCompra ctx={ctx} sorteio={selecionado} />;
}

function SorteioCompra({ ctx, sorteio: s }) {
  const { db, update, showToast } = ctx;
  const pedidosTodos = db.pedidosSorteio || [];
  const vendidos = numerosVendidos(s.id, pedidosTodos);
  const total = Number(s.quantidadeNumeros) || 1;
  const pct = Math.min(100, Math.round((vendidos / total) * 100));
  const restantes = total - vendidos;

  const [aba, setAba] = useState("comprar");
  const [quantidade, setQuantidade] = useState(1);
  const [form, setForm] = useState({ nome: "", telefone: "", endereco: "", cpf: "", email: "" });
  const [pedidoAtual, setPedidoAtual] = useState(null);
  const [cpfConsulta, setCpfConsulta] = useState("");
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  const valorTotal = quantidade * Number(s.valorCota);

  const preencherEComprarMais = (dadosPessoa) => {
    setForm({ nome: dadosPessoa.nome, telefone: dadosPessoa.telefone, endereco: dadosPessoa.endereco, cpf: dadosPessoa.cpf, email: dadosPessoa.email });
    setQuantidade(1); setPedidoAtual(null); setAba("comprar");
  };

  const criarPedido = () => {
    if (restantes < quantidade) { showToast("Não há números suficientes disponíveis.", "error"); return; }
    if (!form.nome.trim()) { showToast("Informe o nome completo.", "error"); return; }
    if (form.cpf.replace(/\D/g, "").length !== 11) { showToast("Informe um CPF válido.", "error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { showToast("Informe um e-mail válido.", "error"); return; }
    if (form.telefone.replace(/\D/g, "").length < 10) { showToast("Informe um telefone válido.", "error"); return; }
    if (!form.endereco.trim()) { showToast("Informe o endereço.", "error"); return; }
    const novo = { ...emptyPedidoSorteio(s.id), id: uid(), ...form, quantidade, criadoEm: new Date().toISOString() };
    update("pedidosSorteio", (arr) => [novo, ...(arr || [])]);
    setPedidoAtual(novo);
    showToast("Pedido registrado — falta o pagamento via Pix.");
  };

  const buscarPorCpf = () => {
    const cpfBusca = cpfConsulta.replace(/\D/g, "");
    if (cpfBusca.length !== 11) { showToast("Digite o CPF completo.", "error"); return; }
    const achados = pedidosTodos.filter((p) => p.sorteioId === s.id && p.status !== "cancelado" && p.cpf.replace(/\D/g, "") === cpfBusca).sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""));
    setResultadoConsulta(achados);
  };

  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: "var(--creme)" }}>
        <RibbonMark size={320} color="var(--rose-200)" className="absolute pointer-events-none" style={{ right: "-8%", top: "-16%", opacity: .5 }} />
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-12 pb-10 relative">
          {s.fotoBase64 && <img src={s.fotoBase64} alt={s.titulo} className="w-full rounded-2xl mb-6" style={{ maxHeight: 280, objectFit: "cover" }} />}
          <p className="ga-display italic mb-2" style={{ color: "var(--rose-700)", fontSize: ".95rem" }}>Sorteio solidário · Grupo ALMA</p>
          <h1 className="ga-display font-semibold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", lineHeight: 1.1 }}>{s.titulo}</h1>
          {s.descricao && <p className="mb-5" style={{ color: "var(--ink-soft)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "58ch" }}>{s.descricao}</p>}
          <div className="flex flex-wrap gap-2 mb-6">
            {(s.premios || []).filter((p) => p.nome.trim()).map((p) => (<Badge key={p.id} tone="pink"><Gift size={11} className="inline -mt-0.5 mr-1" />{p.nome}</Badge>))}
          </div>

          <div className="p-5 rounded-2xl" style={{ background: "#fff", border: "1.5px solid var(--rose-200)" }}>
            <div className="flex items-end justify-between mb-2">
              <p className="ga-display font-semibold ga-tabular" style={{ fontSize: "1.6rem" }}>{pct}% vendido</p>
              <p className="text-sm font-semibold" style={{ color: pct >= 85 ? "#b3123a" : "var(--ink-soft)" }}>{pct >= 85 ? `Faltam só ${restantes}!` : `${restantes} números disponíveis`}</p>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: "var(--rose-100)" }}>
              <div className="h-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,var(--rose-500),var(--rose-700))", transition: "width .4s" }} />
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--ink-faint)" }}>{vendidos} de {total} números · R$ {Number(s.valorCota).toFixed(2).replace(".", ",")} cada</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex gap-5 mt-8 mb-8 ga-scroll-x" style={{ borderBottom: "1px solid var(--line)" }}>
          {[["comprar", "Comprar números"], ["consultar", "Consultar meus números"], ...(s.status === "sorteado" ? [["vencedores", "Vencedores"]] : [])].map(([k, l]) => (
            <button key={k} onClick={() => setAba(k)} className="px-0.5 pb-3 text-sm font-bold whitespace-nowrap" style={{ color: aba === k ? "var(--rose-700)" : "var(--ink-soft)", borderBottom: aba === k ? "2px solid var(--rose-700)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
          ))}
        </div>

        <div className="pb-16">
          {aba === "comprar" && (
            pedidoAtual ? (
              <div className="max-w-md">
                <Card className="p-6 text-center mb-5">
                  <p className="ga-display font-semibold mb-1" style={{ fontSize: "1.2rem" }}>Pague com Pix para garantir seus números</p>
                  <p className="text-3xl ga-display font-bold ga-tabular mb-4" style={{ color: "var(--rose-700)" }}>{fmtBRL(pedidoAtual.quantidade * Number(s.valorCota))}</p>
                  <PixQRCode valor={pedidoAtual.quantidade * Number(s.valorCota)} txid={pedidoAtual.id} />
                </Card>
                <Card className="p-4" style={{ background: "var(--rose-50)" }}>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Depois de pagar, sua equipe confirma o recebimento e seus números são liberados. Volte aqui e toque em <strong>"Consultar meus números"</strong> usando seu CPF para acompanhar.</p>
                </Card>
                <Button variant="ghost" className="mt-4" onClick={() => setPedidoAtual(null)}>Fazer outro pedido</Button>
              </div>
            ) : (
              <div className="max-w-md space-y-5">
                <Card className="p-6">
                  <p className="font-bold text-sm mb-3">Quantos números você quer?</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))} className="btn btn-outline" style={{ width: 44, height: 44, padding: 0, fontSize: "1.3rem" }}>−</button>
                    <p className="ga-display font-bold ga-tabular flex-1 text-center" style={{ fontSize: "1.8rem" }}>{quantidade}</p>
                    <button onClick={() => setQuantidade((q) => Math.min(restantes || 1, q + 1))} className="btn btn-outline" style={{ width: 44, height: 44, padding: 0, fontSize: "1.3rem" }}>+</button>
                  </div>
                  <p className="text-center font-bold mt-4 ga-tabular" style={{ fontSize: "1.4rem", color: "var(--rose-700)" }}>Total: {fmtBRL(valorTotal)}</p>
                </Card>
                <Card className="p-6 space-y-4">
                  <p className="font-bold text-sm">Seus dados</p>
                  <Field label="Nome completo" required><Input value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} /></Field>
                  <Field label="Telefone" required><Input value={form.telefone} onChange={(e) => setForm((f) => ({ ...f, telefone: maskTelefone(e.target.value) }))} /></Field>
                  <Field label="CPF" required><Input value={form.cpf} onChange={(e) => setForm((f) => ({ ...f, cpf: maskCPF(e.target.value) }))} /></Field>
                  <Field label="E-mail" required><Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></Field>
                  <Field label="Endereço" required><Input value={form.endereco} onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))} /></Field>
                  <Button className="btn-block" icon={ArrowRight} onClick={criarPedido} disabled={restantes < 1}>{restantes < 1 ? "Números esgotados" : "Gerar Pix e continuar"}</Button>
                </Card>
              </div>
            )
          )}

          {aba === "consultar" && (
            <div className="max-w-md">
              <Card className="p-5 mb-5 flex gap-2">
                <Input value={cpfConsulta} onChange={(e) => setCpfConsulta(maskCPF(e.target.value))} placeholder="Digite seu CPF" className="flex-1" />
                <Button icon={Search} onClick={buscarPorCpf}>Buscar</Button>
              </Card>
              {resultadoConsulta && resultadoConsulta.length === 0 && <p className="text-sm text-center" style={{ color: "var(--ink-faint)" }}>Nenhum pedido encontrado com esse CPF para este sorteio.</p>}
              <div className="space-y-4">{(resultadoConsulta || []).map((p) => (
                p.status === "pago" ? (
                  <Card key={p.id} className="p-6 text-center relative overflow-hidden" style={{ background: "var(--plum)", color: "#fff" }}>
                    <RibbonMark size={90} color="#57132f" className="absolute pointer-events-none" style={{ right: -10, top: -10 }} />
                    <p className="ga-display font-semibold relative" style={{ fontSize: "1.4rem" }}>Parabéns, {p.nome.split(" ")[0]}! 🎉</p>
                    <p className="text-sm mt-1 mb-4 relative" style={{ color: "#e8c4d6" }}>Você garantiu {p.numeros.length} número{p.numeros.length > 1 ? "s" : ""} neste sorteio.</p>
                    <div className="flex flex-wrap gap-2 justify-center relative">
                      {p.numeros.map((n) => (<span key={n} className="font-bold ga-tabular px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,.15)" }}>{String(n).padStart(String(s.quantidadeNumeros).length, "0")}</span>))}
                    </div>
                    <Button className="mt-5 relative" variant="outline" style={{ borderColor: "#fff", color: "#fff" }} onClick={() => preencherEComprarMais(p)}>Quero mais números</Button>
                  </Card>
                ) : (
                  <Card key={p.id} className="p-5">
                    <p className="font-bold text-sm">{p.quantidade} número(s) — aguardando confirmação do pagamento</p>
                    <p className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>Total: {fmtBRL(p.quantidade * Number(s.valorCota))}</p>
                    <PixQRCode valor={p.quantidade * Number(s.valorCota)} txid={p.id} size={180} />
                  </Card>
                )
              ))}</div>
            </div>
          )}

          {aba === "vencedores" && (
            <div className="max-w-md space-y-3">
              {(s.premios || []).filter((pr) => pr.nome.trim()).map((pr) => {
                const v = (s.vencedores || []).find((x) => x.premioId === pr.id);
                return (
                  <Card key={pr.id} className="p-5 flex items-center gap-4">
                    {pr.fotoBase64 && <img src={pr.fotoBase64} alt={pr.nome} className="rounded-lg shrink-0" style={{ width: 52, height: 52, objectFit: "cover" }} />}
                    <div>
                      <p className="font-bold text-sm">{pr.nome}</p>
                      {v ? <p className="text-sm" style={{ color: "var(--rose-700)" }}>{v.compradorNome} — número {v.numero}</p> : <p className="text-sm" style={{ color: "var(--ink-faint)" }}>Resultado em breve</p>}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminSorteios({ ctx }) {
  const { db, update, usuario, showToast } = ctx;
  const [selecionadoId, setSelecionadoId] = useState(null);
  const [modoForm, setModoForm] = useState(null); // null | "novo" | sorteioId em edição
  const sorteios = (db.sorteios || []).slice().sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""));
  const pedidos = db.pedidosSorteio || [];

  if (modoForm) {
    const editando = modoForm !== "novo" ? sorteios.find((s) => s.id === modoForm) : null;
    return <SorteioForm ctx={ctx} sorteio={editando} onBack={() => setModoForm(null)} onSaved={(id) => { setModoForm(null); setSelecionadoId(id); }} />;
  }
  if (selecionadoId) {
    const s = sorteios.find((x) => x.id === selecionadoId);
    if (!s) { setSelecionadoId(null); return null; }
    return <SorteioDetail ctx={ctx} sorteio={s} onBack={() => setSelecionadoId(null)} onEdit={() => setModoForm(s.id)} />;
  }

  return (
    <div>
      <Card className="p-4 mb-6 flex items-start gap-3" style={{ background: "#fdeecb" }}>
        <AlertCircle size={20} color="#8a5a08" className="shrink-0 mt-0.5" />
        <p className="text-xs" style={{ color: "#8a5a08" }}>
          Sorteio com venda de números só é permitido no Brasil para entidade beneficente <strong>com autorização prévia da Secretaria de Prêmios e Apostas (SPA)</strong>, do Ministério da Fazenda. Peça essa autorização antes de publicar qualquer sorteio para o público.
        </p>
      </Card>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p className="text-sm max-w-xl" style={{ color: "var(--ink-soft)" }}>Cadastre o sorteio, acompanhe a venda de cotas, confirme os pagamentos via Pix e registre os vencedores.</p>
        <Button icon={Plus} onClick={() => setModoForm("novo")}>Novo sorteio</Button>
      </div>
      {sorteios.length === 0 ? <EmptyState icon={Gift} title="Nenhum sorteio cadastrado" description="Cadastre o primeiro sorteio para começar a vender cotas." action={<Button icon={Plus} onClick={() => setModoForm("novo")}>Cadastrar sorteio</Button>} /> : (
        <div className="space-y-3">{sorteios.map((s) => {
          const vendidos = numerosVendidos(s.id, pedidos);
          const total = Number(s.quantidadeNumeros) || 1;
          const pct = Math.min(100, Math.round((vendidos / total) * 100));
          return (
            <Card key={s.id} className="p-5 cursor-pointer" onClick={() => setSelecionadoId(s.id)}>
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="ga-display font-semibold">{s.titulo || "Sem título"}</p>
                    <Badge tone={s.status === "sorteado" ? "success" : s.status === "ativo" ? "pink" : "neutral"}>{s.status}</Badge>
                    {s.publicado ? <Badge tone="success">No ar</Badge> : <Badge tone="neutral">Fora do ar</Badge>}
                  </div>
                  <p className="text-xs" style={{ color: "var(--ink-soft)" }}>{(s.premios || []).map((p) => p.nome).filter(Boolean).join(", ") || "Prêmio não definido"}</p>
                </div>
                <p className="text-xs font-semibold shrink-0" style={{ color: "var(--ink-faint)" }}>Sorteio em {s.dataSorteio ? fmtDate(s.dataSorteio) : "—"}</p>
              </div>
              <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ background: "var(--rose-100)" }}><div className="h-full" style={{ width: `${pct}%`, background: "var(--rose-700)" }} /></div>
              <p className="text-xs" style={{ color: "var(--ink-soft)" }}>{vendidos} de {total} números vendidos ({pct}%) · {fmtBRL(vendidos * Number(s.valorCota))} arrecadados</p>
            </Card>
          );
        })}</div>
      )}
    </div>
  );
}

function SorteioForm({ ctx, sorteio, onBack, onSaved }) {
  const { update, showToast } = ctx;
  const [form, setForm] = useState(sorteio ? { ...emptySorteio(), ...sorteio } : emptySorteio());
  const addPremio = () => setForm((f) => ({ ...f, premios: [...f.premios, { id: uid(), nome: "", descricao: "", fotoBase64: "" }] }));
  const addPremioComNome = (nome) => setForm((f) => ({ ...f, premios: [...f.premios, { id: uid(), nome, descricao: "", fotoBase64: "" }] }));
  const setPremio = (id, key, val) => setForm((f) => ({ ...f, premios: f.premios.map((p) => (p.id === id ? { ...p, [key]: val } : p)) }));
  const rmPremio = (id) => setForm((f) => ({ ...f, premios: f.premios.filter((p) => p.id !== id) }));
  const anexarFoto = async (file, cb) => { if (!file) return; try { cb(await fileToCompressedDataUrl(file)); } catch { showToast("Não foi possível anexar a imagem.", "error"); } };

  const salvar = () => {
    if (!form.titulo.trim()) { showToast("Informe o título do sorteio.", "error"); return; }
    if (!Number(form.quantidadeNumeros) || Number(form.quantidadeNumeros) < 1) { showToast("Informe a quantidade de números.", "error"); return; }
    if (!Number(form.valorCota)) { showToast("Informe o valor de cada número.", "error"); return; }
    if (form.premios.every((p) => !p.nome.trim())) { showToast("Cadastre ao menos um prêmio.", "error"); return; }
    if (form.id) update("sorteios", (arr) => arr.map((s) => (s.id === form.id ? form : s)));
    else update("sorteios", (arr) => [{ ...form, id: uid() }, ...(arr || [])]);
    showToast(form.id ? "Sorteio atualizado." : "Sorteio cadastrado.");
    onSaved(form.id || null);
  };

  return (
    <div className="max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar aos sorteios</button>
      <p className="ga-display text-xl font-semibold mb-5">{form.id ? "Editar sorteio" : "Novo sorteio"}</p>
      <div className="space-y-4">
        <Card className="p-6">
          <SectionHeader icon={Gift}>Dados do sorteio</SectionHeader>
          <div className="space-y-4">
            <Field label="Título" required><Input value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} placeholder="Ex: Rifa solidária de fim de ano" /></Field>
            <Field label="Descrição"><Textarea rows={3} value={form.descricao} onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))} /></Field>
            <Field label="Foto de divulgação">
              <input type="file" accept="image/*" onChange={(e) => anexarFoto(e.target.files?.[0], (b64) => setForm((f) => ({ ...f, fotoBase64: b64 })))} className="text-sm" />
              {form.fotoBase64 && <img src={form.fotoBase64} alt="Divulgação" className="mt-2 rounded-lg" style={{ maxHeight: 140 }} />}
            </Field>
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeader icon={Wallet}>Números e valores</SectionHeader>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Quantidade de números" required hint="Ex: 100 números, de 1 a 100"><Input type="number" min="1" value={form.quantidadeNumeros} onChange={(e) => setForm((f) => ({ ...f, quantidadeNumeros: e.target.value }))} /></Field>
            <Field label="Valor de cada número (R$)" required><Input type="number" step="0.01" value={form.valorCota} onChange={(e) => setForm((f) => ({ ...f, valorCota: e.target.value }))} /></Field>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--ink-soft)" }}>Arrecadação máxima possível: {fmtBRL((Number(form.quantidadeNumeros) || 0) * (Number(form.valorCota) || 0))}</p>
        </Card>

        <Card className="p-6">
          <SectionHeader icon={CalendarDays}>Datas</SectionHeader>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="Início das vendas"><Input type="date" value={form.dataInicio} onChange={(e) => setForm((f) => ({ ...f, dataInicio: e.target.value }))} /></Field>
            <Field label="Fim das vendas"><Input type="date" value={form.dataFim} onChange={(e) => setForm((f) => ({ ...f, dataFim: e.target.value }))} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Data do sorteio" hint="Pode ser diferente do fim das vendas"><Input type="date" value={form.dataSorteio} onChange={(e) => setForm((f) => ({ ...f, dataSorteio: e.target.value }))} /></Field>
            <Field label="Horário do sorteio"><Input type="time" value={form.horaSorteio} onChange={(e) => setForm((f) => ({ ...f, horaSorteio: e.target.value }))} /></Field>
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeader icon={Package} right={<Button size="sm" variant="outline" icon={Plus} onClick={addPremio}>Adicionar prêmio</Button>}>Prêmios</SectionHeader>
          <p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>Toque num item da lista para preencher o nome rápido, ou digite o seu:</p>
          <div className="flex gap-1.5 flex-wrap mb-4">
            {PREMIO_BIBLIOTECA.map((nome) => (
              <button key={nome} onClick={() => { const vazio = form.premios.find((p) => !p.nome.trim()); if (vazio) setPremio(vazio.id, "nome", nome); else addPremioComNome(nome); }} className="btn btn-sm" style={{ background: "#fff", color: "var(--rose-700)", border: "1.5px solid var(--rose-200)" }}>{nome}</button>
            ))}
          </div>
          <div className="space-y-3">{form.premios.map((p, i) => (
            <Card key={p.id} className="p-4" style={{ background: "var(--rose-50)" }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-xs font-bold" style={{ color: "var(--ink-faint)" }}>PRÊMIO {i + 1}</p>
                {form.premios.length > 1 && <button onClick={() => rmPremio(p.id)} className="btn-ghost btn-sm btn" style={{ padding: 4, color: "#b3123a" }}><Trash2 size={13} /></button>}
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-2">
                <Input placeholder="Nome do prêmio" value={p.nome} onChange={(e) => setPremio(p.id, "nome", e.target.value)} />
                <Input placeholder="Descrição (opcional)" value={p.descricao} onChange={(e) => setPremio(p.id, "descricao", e.target.value)} />
              </div>
              <input type="file" accept="image/*" onChange={(e) => anexarFoto(e.target.files?.[0], (b64) => setPremio(p.id, "fotoBase64", b64))} className="text-xs" />
              {p.fotoBase64 && <img src={p.fotoBase64} alt={p.nome} className="mt-2 rounded-lg" style={{ maxHeight: 90 }} />}
            </Card>
          ))}</div>
        </Card>

        <Card className="p-6">
          <SectionHeader icon={Wallet}>Custo do prêmio</SectionHeader>
          <Field label="Valor pago pelo(s) prêmio(s) (R$)" hint="Usado para calcular o lucro líquido do sorteio"><Input type="number" step="0.01" value={form.valorPremioPago} onChange={(e) => setForm((f) => ({ ...f, valorPremioPago: e.target.value }))} /></Field>
        </Card>

        <Card className="p-4 flex items-start gap-3" style={{ background: "var(--rose-50)" }}>
          <Eye size={20} color="var(--rose-700)" className="shrink-0 mt-0.5" />
          <div>
            <Checkbox label="Publicar este sorteio no site público" checked={form.publicado} onChange={(v) => setForm((f) => ({ ...f, publicado: v, status: v ? "ativo" : f.status === "ativo" ? "rascunho" : f.status }))} />
            <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Só aparece na página inicial e permite venda de números quando estiver marcado. Pode tirar do ar a qualquer momento sem perder os dados.</p>
          </div>
        </Card>

        <div className="flex gap-3 sticky bottom-4 z-10"><Button variant="ghost" className="flex-1 shadow-lg" onClick={onBack}>Cancelar</Button><Button icon={Save} className="flex-1 shadow-lg" onClick={salvar}>Salvar sorteio</Button></div>
      </div>
    </div>
  );
}

function SorteioDetail({ ctx, sorteio: s, onBack, onEdit }) {
  const { db, update, usuario, showToast } = ctx;
  const [tab, setTab] = useState("visao");
  const pedidosTodos = db.pedidosSorteio || [];
  const pedidos = pedidosTodos.filter((p) => p.sorteioId === s.id);
  const vendidos = numerosVendidos(s.id, pedidosTodos);
  const total = Number(s.quantidadeNumeros) || 1;
  const pct = Math.min(100, Math.round((vendidos / total) * 100));
  const arrecadado = vendidos * Number(s.valorCota);
  const custoPremio = Number(s.valorPremioPago) || 0;
  const lucro = arrecadado - custoPremio;

  const alternarPublicado = () => {
    const novo = !s.publicado;
    update("sorteios", (arr) => arr.map((x) => (x.id === s.id ? { ...x, publicado: novo, status: novo ? "ativo" : (x.status === "ativo" ? "rascunho" : x.status) } : x)));
    showToast(novo ? "Sorteio publicado no site." : "Sorteio tirado do ar.");
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-semibold ga-focus" style={{ color: "var(--ink-soft)" }}><ArrowLeft size={16} />Voltar aos sorteios</button>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1"><p className="ga-display text-xl font-semibold">{s.titulo}</p><Badge tone={s.publicado ? "success" : "neutral"}>{s.publicado ? "No ar" : "Fora do ar"}</Badge></div>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{(s.premios || []).map((p) => p.nome).filter(Boolean).join(", ")}</p>
        </div>
        <div className="flex gap-2"><Button size="sm" variant="outline" icon={Pencil} onClick={onEdit}>Editar</Button><Button size="sm" icon={s.publicado ? EyeOff : Eye} onClick={alternarPublicado}>{s.publicado ? "Tirar do ar" : "Publicar"}</Button></div>
      </div>

      <div className="flex gap-5 mb-6 ga-scroll-x" style={{ borderBottom: "1px solid var(--line)" }}>
        {[["visao", "Visão geral"], ["pedidos", `Pedidos (${pedidos.length})`], ["sorteio", "Sorteio"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-0.5 pb-3 text-sm font-bold whitespace-nowrap" style={{ color: tab === k ? "var(--rose-700)" : "var(--ink-soft)", borderBottom: tab === k ? "2px solid var(--rose-700)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>

      {tab === "visao" && (
        <div className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-2"><p className="font-bold text-sm">Números vendidos</p><p className="text-sm font-bold ga-tabular" style={{ color: "var(--rose-700)" }}>{vendidos} / {total} ({pct}%)</p></div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--rose-100)" }}><div className="h-full" style={{ width: `${pct}%`, background: "var(--rose-700)" }} /></div>
          </Card>
          <div className="grid sm:grid-cols-3 gap-4">
            <StatCard icon={Wallet} label="Arrecadado" value={fmtBRL(arrecadado)} />
            <StatCard icon={Package} label="Custo do prêmio" value={fmtBRL(custoPremio)} tone="ink" />
            <StatCard icon={TrendingUp} label="Lucro estimado" value={fmtBRL(lucro)} />
          </div>
          <Card className="p-6">
            <SectionHeader icon={Wallet}>Arrecadado × custo do prêmio × lucro</SectionHeader>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={[{ nome: "Sorteio", Arrecadado: arrecadado, Custo: custoPremio, Lucro: Math.max(0, lucro) }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                  <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmtBRL(v)} width={80} />
                  <Tooltip formatter={(v) => fmtBRL(v)} />
                  <Legend />
                  <Bar dataKey="Arrecadado" fill="var(--rose-700)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Custo" fill="var(--ink)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Lucro" fill="var(--rose-300)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {tab === "pedidos" && <SorteioPedidos ctx={ctx} sorteio={s} pedidos={pedidos} />}
      {tab === "sorteio" && <SorteioDrawTool ctx={ctx} sorteio={s} pedidos={pedidos} />}
    </div>
  );
}

function SorteioPedidos({ ctx, sorteio: s, pedidos }) {
  const { update, showToast, usuario } = ctx;
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [verNumeros, setVerNumeros] = useState(null);

  const lista = pedidos.filter((p) => (filtro === "todos" || p.status === filtro) && (!busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || (p.cpf || "").includes(busca)))
    .slice().sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""));

  const confirmarPagamento = (pedido) => {
    let resultado = null; // "ok" | "sem_numeros"
    let numerosAtribuidos = [];
    update("pedidosSorteio", (arr) => {
      const atual = arr || [];
      const numeros = proximosNumerosLivres(s, atual, pedido.quantidade);
      if (numeros.length < pedido.quantidade) { resultado = "sem_numeros"; return atual; }
      resultado = "ok"; numerosAtribuidos = numeros;
      return atual.map((p) => (p.id === pedido.id ? { ...p, status: "pago", numeros, pagoEm: new Date().toISOString(), confirmadoPor: usuario.nome } : p));
    });
    if (resultado === "sem_numeros") { showToast("Não há números suficientes disponíveis.", "error"); return; }
    showToast(`Pagamento confirmado — números ${numerosAtribuidos.join(", ")} atribuídos.`);
  };
  const cancelarPedido = (pedido) => { update("pedidosSorteio", (arr) => arr.map((p) => (p.id === pedido.id ? { ...p, status: "cancelado" } : p))); showToast("Pedido cancelado."); };

  return (
    <div>
      <p className="text-xs mb-4" style={{ color: "var(--ink-faint)" }}>Confira os recebimentos no extrato de {ORG.banco}, agência {ORG.agencia}, conta {ORG.contaCorrente} — chave Pix {ORG.pix}.</p>
      <div className="flex gap-3 flex-wrap mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--ink-faint)" /><Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou CPF..." style={{ paddingLeft: 36 }} /></div>
        <Select value={filtro} onChange={(e) => setFiltro(e.target.value)} options={[{ value: "aguardando_pix", label: "Aguardando Pix" }, { value: "pago", label: "Pago" }, { value: "cancelado", label: "Cancelado" }]} placeholder="Todos os status" style={{ width: 190 }} />
      </div>
      {lista.length === 0 ? <EmptyState icon={Wallet} title="Nenhum pedido encontrado" description="Os pedidos de compra de números aparecem aqui assim que alguém iniciar a compra no site." /> : (
        <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
          <thead><tr><th>Comprador</th><th>CPF</th><th>Qtd.</th><th>Valor</th><th>Status</th><th>Números</th><th></th></tr></thead>
          <tbody>{lista.map((p) => (
            <tr key={p.id}>
              <td className="font-semibold">{p.nome}</td>
              <td className="text-xs ga-tabular">{p.cpf}</td>
              <td className="ga-tabular">{p.quantidade}</td>
              <td className="ga-tabular font-semibold">{fmtBRL(p.quantidade * Number(s.valorCota))}</td>
              <td><Badge tone={p.status === "pago" ? "success" : p.status === "cancelado" ? "neutral" : "warning"}>{p.status === "aguardando_pix" ? "Aguardando Pix" : p.status}</Badge></td>
              <td>{p.numeros.length ? <button onClick={() => setVerNumeros(p)} className="text-xs font-bold ga-focus" style={{ color: "var(--rose-700)" }}>Ver ({p.numeros.length})</button> : "—"}</td>
              <td>{p.status === "aguardando_pix" && (<div className="flex gap-1.5"><Button size="sm" icon={Check} onClick={() => confirmarPagamento(p)}>Confirmar Pix</Button><Button size="sm" variant="ghost" onClick={() => cancelarPedido(p)}>Cancelar</Button></div>)}</td>
            </tr>
          ))}</tbody>
        </table></div></Card>
      )}
      <Modal open={!!verNumeros} onClose={() => setVerNumeros(null)} title={verNumeros ? `Números de ${verNumeros.nome}` : ""}>
        <div className="flex flex-wrap gap-2">{verNumeros?.numeros.map((n) => (<span key={n} className="font-bold ga-tabular px-3 py-1.5 rounded-lg" style={{ background: "var(--rose-100)", color: "var(--rose-800)" }}>{String(n).padStart(String(s.quantidadeNumeros).length, "0")}</span>))}</div>
      </Modal>
    </div>
  );
}

function SorteioDrawTool({ ctx, sorteio: s, pedidos }) {
  const { update, showToast, usuario } = ctx;
  const numerosPagos = pedidos.filter((p) => p.status === "pago").flatMap((p) => (p.numeros || []).map((n) => ({ numero: n, pedido: p })));
  const [sorteando, setSorteando] = useState(null); // { premioId, numero, finalizado }
  const [manual, setManual] = useState({});
  const intervalRef = useRef(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const sortear = (premioId) => {
    if (numerosPagos.length === 0) { showToast("Ainda não há números pagos para sortear.", "error"); return; }
    setSorteando({ premioId, numero: null, finalizado: false });
    let contagem = 0;
    intervalRef.current = setInterval(() => {
      const alea = numerosPagos[Math.floor(Math.random() * numerosPagos.length)];
      setSorteando({ premioId, numero: alea.numero, finalizado: false });
      contagem++;
      if (contagem > 22) {
        clearInterval(intervalRef.current);
        const final = numerosPagos[Math.floor(Math.random() * numerosPagos.length)];
        setSorteando({ premioId, numero: final.numero, finalizado: true });
      }
    }, 90);
  };

  const definirVencedor = (premioId, numero, metodo) => {
    const dono = numerosPagos.find((x) => x.numero === numero);
    if (!dono) { showToast("Esse número não consta como pago — confira e tente novamente.", "error"); return; }
    const vencedor = { id: uid(), premioId, numero, compradorNome: dono.pedido.nome, compradorId: dono.pedido.id, definidoEm: new Date().toISOString(), metodo, definidoPor: usuario.nome };
    update("sorteios", (arr) => arr.map((x) => (x.id === s.id ? { ...x, vencedores: [...(x.vencedores || []).filter((v) => v.premioId !== premioId), vencedor], status: "sorteado" } : x)));
    showToast(`${dono.pedido.nome} — número ${numero} — definido(a) como vencedor(a).`);
    setSorteando(null);
    setManual((f) => ({ ...f, [premioId]: "" }));
  };
  const removerVencedor = (premioId) => update("sorteios", (arr) => arr.map((x) => (x.id === s.id ? { ...x, vencedores: (x.vencedores || []).filter((v) => v.premioId !== premioId) } : x)));

  const premiosValidos = (s.premios || []).filter((p) => p.nome.trim());

  return (
    <div className="space-y-4">
      {numerosPagos.length === 0 && (
        <Card className="p-4 flex items-start gap-3" style={{ background: "#fdeecb" }}>
          <AlertCircle size={18} color="#8a5a08" className="shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: "#8a5a08" }}>Ainda não há nenhum número pago para esse sorteio. Confirme pagamentos na aba Pedidos antes de sortear.</p>
        </Card>
      )}
      {premiosValidos.map((premio) => {
        const vencedor = (s.vencedores || []).find((v) => v.premioId === premio.id);
        const estaSorteando = sorteando?.premioId === premio.id;
        return (
          <Card key={premio.id} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {premio.fotoBase64 && <img src={premio.fotoBase64} alt={premio.nome} className="rounded-lg shrink-0" style={{ width: 56, height: 56, objectFit: "cover" }} />}
              <div><p className="ga-display font-semibold">{premio.nome}</p>{premio.descricao && <p className="text-xs" style={{ color: "var(--ink-soft)" }}>{premio.descricao}</p>}</div>
            </div>

            {vencedor ? (
              <Card className="p-4 flex items-center justify-between gap-3 flex-wrap" style={{ background: "#e3f5ea" }}>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#1a7a45" }}>Vencedor(a): {vencedor.compradorNome}</p>
                  <p className="text-xs" style={{ color: "#1a7a45" }}>Número {vencedor.numero} · {vencedor.metodo === "sistema" ? "Sorteado no sistema" : "Informado manualmente"} em {fmtDateTime(vencedor.definidoEm)}</p>
                </div>
                <button onClick={() => removerVencedor(premio.id)} className="text-xs font-bold ga-focus" style={{ color: "#8a5a08" }}>Refazer</button>
              </Card>
            ) : (
              <div className="space-y-3">
                <div className="text-center py-7 rounded-xl" style={{ background: "var(--rose-50)" }}>
                  <p className="ga-display font-bold ga-tabular" style={{ fontSize: "2.6rem", color: estaSorteando && !sorteando.finalizado ? "var(--rose-400)" : "var(--ink)" }}>
                    {estaSorteando && sorteando.numero !== null ? String(sorteando.numero).padStart(String(s.quantidadeNumeros).length, "0") : "—"}
                  </p>
                </div>
                <Button className="btn-block" icon={RefreshCw} onClick={() => sortear(premio.id)} disabled={sorteando !== null && !estaSorteando}>{estaSorteando && !sorteando.finalizado ? "Sorteando..." : "Sortear no sistema"}</Button>
                {estaSorteando && sorteando.finalizado && (
                  <Button className="btn-block" variant="dark" icon={Check} onClick={() => definirVencedor(premio.id, sorteando.numero, "sistema")}>Confirmar número {sorteando.numero} como vencedor</Button>
                )}
                <div className="flex gap-2 items-end pt-3" style={{ borderTop: "1px solid var(--line)" }}>
                  <Field label="Ou digite o número vencedor (sorteio feito fora do sistema)" className="flex-1 mb-0"><Input type="number" value={manual[premio.id] || ""} onChange={(e) => setManual((f) => ({ ...f, [premio.id]: e.target.value }))} /></Field>
                  <Button variant="outline" onClick={() => definirVencedor(premio.id, Number(manual[premio.id]), "externo")} disabled={!manual[premio.id]}>Definir</Button>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function AdminUsuarios({ ctx }) {
  const { db, update, usuario, showToast } = ctx;
  const meuRegistro = (db.usuarios || []).find((u) => u.id === usuario.id) || usuario;
  const souGestor = meuRegistro.papel ? meuRegistro.papel === "gestor" : true;
  const usuarios = (db.usuarios || []).slice().sort((a, b) => (a.status === "pendente" ? -1 : 1));

  const emptyNovo = { nome: "", email: "", cargo: "", papel: "colaborador", senha: "", confirmar: "" };
  const [novoOpen, setNovoOpen] = useState(false);
  const [novo, setNovo] = useState(emptyNovo);
  const [senhaOpen, setSenhaOpen] = useState(false);
  const [senhaForm, setSenhaForm] = useState({ atual: "", nova: "", confirmar: "" });
  const [convite, setConvite] = useState(null);

  const aprovar = (id) => { update("usuarios", (arr) => arr.map((u) => (u.id === id ? { ...u, status: "ativo" } : u))); showToast("Acesso aprovado."); };
  const recusar = (id) => { update("usuarios", (arr) => arr.filter((u) => u.id !== id)); showToast("Cadastro recusado e removido."); };
  const alternarStatus = (id) => update("usuarios", (arr) => arr.map((u) => (u.id === id ? { ...u, status: u.status === "ativo" ? "inativo" : "ativo" } : u)));

  const criarUsuario = () => {
    const email = novo.email.trim().toLowerCase();
    if (!novo.nome.trim()) { showToast("Informe o nome.", "error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Informe um e-mail válido.", "error"); return; }
    if ((db.usuarios || []).some((u) => (u.email || "").toLowerCase() === email)) { showToast("Já existe um usuário com este e-mail.", "error"); return; }
    if (novo.senha.length < 6) { showToast("A senha precisa ter ao menos 6 caracteres.", "error"); return; }
    if (novo.senha !== novo.confirmar) { showToast("As senhas não conferem.", "error"); return; }
    const registro = { id: uid(), nome: novo.nome.trim(), email, cargo: novo.cargo.trim(), papel: novo.papel, senha: novo.senha, status: "ativo", criadoEm: new Date().toISOString() };
    update("usuarios", (arr) => [...(arr || []), registro]);
    setNovo(emptyNovo); setNovoOpen(false); setConvite(registro);
    showToast("Usuário criado com acesso ativo.");
  };

  const alterarMinhaSenha = () => {
    if (senhaForm.atual !== meuRegistro.senha) { showToast("Senha atual incorreta.", "error"); return; }
    if (senhaForm.nova.length < 6) { showToast("A nova senha precisa ter ao menos 6 caracteres.", "error"); return; }
    if (senhaForm.nova !== senhaForm.confirmar) { showToast("A confirmação não confere com a nova senha.", "error"); return; }
    update("usuarios", (arr) => arr.map((u) => (u.id === usuario.id ? { ...u, senha: senhaForm.nova } : u)));
    setSenhaForm({ atual: "", nova: "", confirmar: "" }); setSenhaOpen(false);
    showToast("Sua senha foi alterada.");
  };

  const textoConvite = (u) => `Olá, ${u.nome}!\n\nSeu acesso ao sistema do Grupo ALMA foi criado.\n\nFunção: ${u.cargo || "não informada"}\nPerfil: ${u.papel === "gestor" ? "Gestor(a) — pode gerenciar usuários" : "Colaborador(a)"}\nEndereço do sistema: grupoalmaorlandia.com.br\nE-mail de acesso: ${u.email}\nSenha provisória: ${u.senha}\n\nAo entrar pela primeira vez, vá em Usuários → "Alterar minha senha" e defina uma senha pessoal.`;
  const copiarConvite = async (u) => {
    try { await navigator.clipboard.writeText(textoConvite(u)); showToast("Convite copiado — cole no WhatsApp ou e-mail."); }
    catch { showToast("Não foi possível copiar automaticamente — selecione o texto na tela.", "error"); }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-5">
        <p className="text-sm max-w-xl" style={{ color: "var(--ink-soft)" }}>
          {souGestor ? "Como gestor(a), você pode criar acessos, aprovar cadastros e ativar/desativar usuários. Senhas nunca são exibidas para ninguém." : "Você pode consultar a equipe e alterar a sua própria senha. Só quem tem perfil de gestor(a) altera o acesso de outras pessoas."}
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" icon={ShieldCheck} onClick={() => setSenhaOpen(true)}>Alterar minha senha</Button>
          {souGestor && <Button size="sm" icon={UserPlus} onClick={() => { setNovo(emptyNovo); setNovoOpen(true); }}>Novo usuário</Button>}
        </div>
      </div>

      <Card className="overflow-hidden"><div className="ga-scroll-x"><table className="ga-table">
        <thead><tr><th>Nome</th><th>E-mail</th><th>Função</th><th>Perfil</th><th>Status</th><th></th></tr></thead>
        <tbody>{usuarios.map((u) => (
          <tr key={u.id}>
            <td className="font-semibold">{u.nome}{u.id === usuario.id && <span className="text-[10px] ml-1.5 font-bold" style={{ color: "var(--rose-700)" }}>VOCÊ</span>}</td>
            <td>{u.email}</td><td>{u.cargo || "—"}</td>
            <td><Badge tone={u.papel === "gestor" ? "pink" : "neutral"}>{u.papel === "gestor" ? "Gestor(a)" : "Colaborador(a)"}</Badge></td>
            <td><Badge tone={u.status === "ativo" ? "success" : u.status === "pendente" ? "warning" : "neutral"}>{u.status}</Badge></td>
            <td>
              {!souGestor ? <span className="text-xs" style={{ color: "var(--ink-faint)" }}>{u.id === usuario.id ? "Sua conta" : "Somente leitura"}</span>
                : u.status === "pendente" ? (<div className="flex gap-1.5"><Button size="sm" icon={Check} onClick={() => aprovar(u.id)}>Aprovar</Button><Button size="sm" variant="danger" onClick={() => recusar(u.id)}>Recusar</Button></div>)
                : u.id !== usuario.id ? (<div className="flex gap-1.5 flex-wrap"><Button size="sm" variant="ghost" onClick={() => alternarStatus(u.id)}>{u.status === "ativo" ? "Desativar" : "Reativar"}</Button><button onClick={() => setConvite(u)} title="Gerar convite de acesso" className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Copy size={14} /></button></div>)
                : <span className="text-xs" style={{ color: "var(--ink-faint)" }}>Sua conta</span>}
            </td>
          </tr>
        ))}</tbody>
      </table></div></Card>

      <Modal open={novoOpen} onClose={() => setNovoOpen(false)} title="Novo usuário"
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setNovoOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={criarUsuario}>Criar acesso</Button></div>}>
        <div className="space-y-4">
          <Field label="Nome completo" required><Input value={novo.nome} onChange={(e) => setNovo((f) => ({ ...f, nome: e.target.value }))} /></Field>
          <Field label="E-mail de acesso" required><Input type="email" value={novo.email} onChange={(e) => setNovo((f) => ({ ...f, email: e.target.value }))} placeholder="nome@exemplo.com" /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Função na instituição"><Input value={novo.cargo} onChange={(e) => setNovo((f) => ({ ...f, cargo: e.target.value }))} placeholder="Ex: Assistente social" /></Field>
            <Field label="Perfil de acesso" hint={novo.papel === "gestor" ? "Pode gerenciar outros usuários" : "Só consulta a equipe e altera a própria senha"}>
              <Select value={novo.papel} onChange={(e) => setNovo((f) => ({ ...f, papel: e.target.value }))} options={[{ value: "colaborador", label: "Colaborador(a)" }, { value: "gestor", label: "Gestor(a)" }]} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Senha provisória" required hint="Mínimo de 6 caracteres"><Input type="password" value={novo.senha} onChange={(e) => setNovo((f) => ({ ...f, senha: e.target.value }))} /></Field>
            <Field label="Confirmar senha" required error={novo.confirmar && novo.senha !== novo.confirmar ? "As senhas não conferem" : ""}><Input type="password" value={novo.confirmar} onChange={(e) => setNovo((f) => ({ ...f, confirmar: e.target.value }))} /></Field>
          </div>
        </div>
      </Modal>

      <Modal open={senhaOpen} onClose={() => setSenhaOpen(false)} title="Alterar minha senha"
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setSenhaOpen(false)}>Cancelar</Button><Button className="flex-1" icon={Save} onClick={alterarMinhaSenha}>Salvar nova senha</Button></div>}>
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Para confirmar que é você, informe a senha atual antes de definir a nova.</p>
          <Field label="Senha atual" required><Input type="password" value={senhaForm.atual} onChange={(e) => setSenhaForm((f) => ({ ...f, atual: e.target.value }))} /></Field>
          <Field label="Nova senha" required hint="Mínimo de 6 caracteres"><Input type="password" value={senhaForm.nova} onChange={(e) => setSenhaForm((f) => ({ ...f, nova: e.target.value }))} /></Field>
          <Field label="Confirmar nova senha" required error={senhaForm.confirmar && senhaForm.nova !== senhaForm.confirmar ? "As senhas não conferem" : ""}><Input type="password" value={senhaForm.confirmar} onChange={(e) => setSenhaForm((f) => ({ ...f, confirmar: e.target.value }))} /></Field>
        </div>
      </Modal>

      <Modal open={!!convite} onClose={() => setConvite(null)} title="Convite de acesso"
        footer={<div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setConvite(null)}>Fechar</Button><Button className="flex-1" icon={Copy} onClick={() => copiarConvite(convite)}>Copiar convite</Button></div>}>
        <p className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>O sistema ainda não envia e-mails automaticamente — isso passa a funcionar quando o servidor estiver no ar. Por enquanto, copie a mensagem abaixo e envie à pessoa por WhatsApp ou e-mail.</p>
        <Textarea rows={11} readOnly value={convite ? textoConvite(convite) : ""} />
      </Modal>
    </div>
  );
}

function AdminConteudoSite({ ctx }) {
  const { db, update, showToast } = ctx;
  const emptyForm = { titulo: "", tipo: "acao", data: todayISO(), descricao: "" };
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const eventos = (db.eventos || []).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const salvar = () => {
    if (!form.titulo) { showToast("Informe o título.", "error"); return; }
    if (editId) { update("eventos", (arr) => arr.map((e) => (e.id === editId ? { ...e, ...form, exemplo: false } : e))); showToast("Atualizado."); }
    else { update("eventos", (arr) => [{ id: uid(), ...form, exemplo: false }, ...(arr || [])]); showToast("Publicado no site."); }
    setForm(emptyForm); setEditId(null);
  };
  const editar = (e) => { setForm({ titulo: e.titulo, tipo: e.tipo, data: e.data, descricao: e.descricao }); setEditId(e.id); };
  const remover = (id) => { update("eventos", (arr) => arr.filter((e) => e.id !== id)); if (editId === id) { setEditId(null); setForm(emptyForm); } };
  return (
    <div className="grid lg:grid-cols-[1fr_.8fr] gap-6">
      <div>
        <p className="font-bold mb-4">Publicados no site ({eventos.length})</p>
        {eventos.length === 0 ? <EmptyState icon={CalendarDays} title="Nada publicado" description="Publique campanhas, ações e eventos para aparecerem no site." /> : (
          <div className="space-y-3">{eventos.map((e) => (
            <Card key={e.id} className="p-4 flex items-start justify-between gap-3">
              <div className="min-w-0"><div className="flex items-center gap-2 flex-wrap"><p className="font-bold text-sm">{e.titulo}</p><Badge tone={e.tipo === "campanha" ? "pink" : e.tipo === "evento" ? "ink" : "neutral"}>{e.tipo}</Badge></div><p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>{fmtDate(e.data)} · {e.descricao}</p></div>
              <div className="flex gap-1 shrink-0"><button onClick={() => editar(e)} className="btn-ghost btn-sm btn" style={{ padding: 6 }}><Pencil size={14} /></button><button onClick={() => remover(e.id)} className="btn-ghost btn-sm btn" style={{ padding: 6, color: "#b3123a" }}><Trash2 size={14} /></button></div>
            </Card>
          ))}</div>
        )}
      </div>
      <Card className="p-5 h-fit">
        <p className="font-bold mb-4">{editId ? "Editar publicação" : "Nova publicação"}</p>
        <div className="space-y-3">
          <Field label="Título" required><Input value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} /></Field>
          <Field label="Tipo"><Select value={form.tipo} onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))} options={[{ value: "acao", label: "Ação" }, { value: "evento", label: "Evento" }, { value: "campanha", label: "Campanha" }]} /></Field>
          <Field label="Data"><Input type="date" value={form.data} onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))} /></Field>
          <Field label="Descrição"><Textarea rows={3} value={form.descricao} onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))} /></Field>
          <Button className="btn-block" icon={editId ? Save : Plus} onClick={salvar}>{editId ? "Salvar" : "Publicar no site"}</Button>
          {(editId || form.titulo || form.descricao) && <Button variant="ghost" className="btn-block" onClick={() => { setEditId(null); setForm(emptyForm); }}>{editId ? "Cancelar" : "Limpar formulário"}</Button>}
        </div>
      </Card>
    </div>
  );
}

/* =========================================================================================
   RAIZ DA APLICAÇÃO
   ========================================================================================= */
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type = "ok") => {
    const id = uid();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  return { toasts, push };
}

const PUBLIC_PAGES = { home: HomePage, quemsomos: QuemSomosPage, acolhimento: AcolhimentoPage, transparencia: TransparenciaPage, impacto: ImpactoPage, contato: ContatoPage, doacao: DoacaoPage, sorteio: SorteioPage };

export default function App() {
  const { db, update, loading, saving, resetAllData } = useDatabase();
  const { toasts, push: showToast } = useToasts();
  const [mode, setMode] = useState("public");
  const [publicPage, setPublicPage] = useState("home");
  const [adminPage, setAdminPage] = useState("dashboard");
  const [usuario, setUsuario] = useState(null);
  const [printDoc, setPrintDoc] = useState(null);
  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const [selectedVisitaId, setSelectedVisitaId] = useState(null);
  const [sorteioPublicoId, setSorteioPublicoId] = useState(null);

  const ctx = {
    db, update, loading, saving, resetAllData, showToast,
    mode, setMode, publicPage, setPublicPage, adminPage, setAdminPage, usuario, setUsuario,
    printDoc, openPrint: (title, content) => setPrintDoc({ title, content }), closePrint: () => setPrintDoc(null),
    selectedPacienteId, setSelectedPacienteId, selectedVisitaId, setSelectedVisitaId,
    sorteioPublicoId, setSorteioPublicoId,
  };

  if (loading) {
    return (
      <div className="ga-scope ga-root min-h-screen flex flex-col items-center justify-center gap-3">
        <GlobalStyles /><OrgLogo size={56} /><Spinner size={22} /><span style={{ color: "var(--ink-soft)" }}>Carregando o site do Grupo ALMA...</span>
      </div>
    );
  }

  let body;
  if (printDoc) body = <PrintPage title={printDoc.title} onBack={() => setPrintDoc(null)}>{printDoc.content}</PrintPage>;
  else if (mode === "admin" && usuario) body = <AdminShell ctx={ctx} />;
  else if (mode === "login") body = <LoginPage ctx={ctx} />;
  else if (mode === "cadastro") body = <CadastroPage ctx={ctx} />;
  else {
    const Page = PUBLIC_PAGES[publicPage] || HomePage;
    body = (
      <div className="ga-root ga-scope">
        <PublicNav ctx={ctx} /><main><Page ctx={ctx} /></main><PublicFooter ctx={ctx} /><WhatsAppFAB />
      </div>
    );
  }

  return (<div className="ga-scope"><GlobalStyles />{body}<ToastStack toasts={toasts} /></div>);
}
