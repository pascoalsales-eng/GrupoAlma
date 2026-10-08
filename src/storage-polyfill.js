/* Substitui, num site publicado de verdade, a API window.storage que só existe dentro do Claude.
   Mesma interface (get/set/delete/list), agora usando localStorage do navegador.
   Aviso: dados ficam só no navegador de cada pessoa (não compartilha entre dispositivos/usuários) —
   é um passo intermediário até existir um banco de dados real (ex: Supabase). */
const PREFIX = "ga_";

window.storage = {
  get: async (key) => {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) throw new Error("Chave não encontrada: " + key);
    return { key, value: raw, shared: true };
  },
  set: async (key, value) => {
    localStorage.setItem(PREFIX + key, value);
    return { key, value, shared: true };
  },
  delete: async (key) => {
    localStorage.removeItem(PREFIX + key);
    return { key, deleted: true, shared: true };
  },
  list: async (prefix) => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        const bare = k.slice(PREFIX.length);
        if (!prefix || bare.startsWith(prefix)) keys.push(bare);
      }
    }
    return { keys, prefix, shared: true };
  },
};
