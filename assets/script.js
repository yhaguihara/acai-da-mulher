const CENSOR_KEY = "pdm_censorship_enabled_v2",
  PASS_KEY = "pdm_entry_password",
  GATE_KEY = "pdm_password_gate";
function censorshipEnabled() {
  const saved = localStorage.getItem(CENSOR_KEY);
  return saved === "true";
}
function applyCensorship() {
  const active = censorshipEnabled();
  document.body.classList.toggle("censored", active);
  const toggle = document.getElementById("censorToggle");
  if (toggle) toggle.checked = active;
  const label = document.getElementById("censorLabel");
  if (label)
    label.textContent = active
      ? "Desativar o modo censura"
      : "Ativar o modo censura";
}
function show(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.toggle("active", s.id === id));
  document
    .querySelectorAll(".nav")
    .forEach((n) => n.classList.toggle("active", n.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function call190() {
  window.location.href = "tel:190";
}
function mapSearch(q) {
  window.open(
    "https://www.google.com/maps/search/" + encodeURIComponent(q),
    "_blank",
    "noopener",
  );
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 4500);
}
function submitHelp(e) {
  e.preventDefault();
  const notes = document.getElementById("notes").value.trim(),
    address = document.getElementById("address").value.trim();
  if (!notes && !address) {
    toast("Preencha o relato ou o local para continuar.");
    return;
  }
  const summary = [notes, address ? "Local informado: " + address : ""]
    .filter(Boolean)
    .join("\n");
  document.getElementById("reportMessageText").textContent = summary;
  document.getElementById("reportMessage").classList.remove("hidden");
  document.getElementById("chatInput").value = "";
  show("messages");
  toast("Relato adicionado Ã  conversa de demonstraÃ§Ã£o.");
}
function filterPlaces(kind, button) {
  document
    .querySelectorAll(".filter")
    .forEach((b) => b.classList.toggle("active", b === button));
  document
    .querySelectorAll(".place-card")
    .forEach((card) =>
      card.classList.toggle(
        "hidden",
        kind !== "all" && card.dataset.kind !== kind,
      ),
    );
}
function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chatInput"),
    value = input.value.trim();
  if (!value) return;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble sent";
  const strong = document.createElement("strong");
  strong.textContent = "VocÃª";
  const p = document.createElement("p");
  p.textContent = value;
  const small = document.createElement("small");
  small.textContent = "Agora Â· mensagem local";
  bubble.append(strong, p, small);
  document.getElementById("chatWindow").appendChild(bubble);
  input.value = "";
  document.getElementById("chatWindow").scrollTop =
    document.getElementById("chatWindow").scrollHeight;
  toast("Mensagem adicionada Ã  conversa neste protÃ³tipo.");
}
function quickExit() {
  location.replace("https://www.google.com");
}
function toggleCensorship(enabled) {
  localStorage.setItem(CENSOR_KEY, String(enabled));
  applyCensorship();
  toast(enabled ? "Modo censura ativado." : "Modo censura desativado.");
}
function togglePasswordGate(enabled) {
  const fields = document.getElementById("passwordFields");
  if (enabled && !localStorage.getItem(PASS_KEY)) {
    fields.classList.remove("hidden");
    document.getElementById("newPassword").focus();
    toast("Crie uma senha e salve para ativar a entrada protegida.");
    document.getElementById("passwordToggle").checked = false;
    return;
  }
  localStorage.setItem(GATE_KEY, String(enabled));
  fields.classList.toggle("hidden", !enabled);
  toast(
    enabled ? "Entrada com senha ativada." : "Entrada com senha desativada.",
  );
}
function savePassword() {
  const a = document.getElementById("newPassword").value,
    b = document.getElementById("confirmPassword").value;
  if (a.length < 4) {
    toast("A senha precisa ter pelo menos 4 caracteres.");
    return;
  }
  if (a !== b) {
    toast("As senhas nÃ£o coincidem.");
    return;
  }
  localStorage.setItem(PASS_KEY, a);
  localStorage.setItem(GATE_KEY, "true");
  document.getElementById("passwordToggle").checked = true;
  document.getElementById("passwordFields").classList.add("hidden");
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
  toast("Senha cadastrada e entrada protegida ativada neste navegador.");
}
function unlockSite() {
  const input = document.getElementById("entryPassword");
  if (input.value === localStorage.getItem(PASS_KEY)) {
    document.getElementById("lockscreen").classList.remove("show");
    input.value = "";
    document.getElementById("lockError").textContent = "";
  } else {
    document.getElementById("lockError").textContent =
      "Senha incorreta. Tente novamente.";
    input.value = "";
  }
}
if (localStorage.getItem(CENSOR_KEY) === null)
  localStorage.setItem(CENSOR_KEY, "true");
applyCensorship();
const gateEnabled = localStorage.getItem(GATE_KEY) === "true";
document.getElementById("passwordToggle").checked = gateEnabled;
document
  .getElementById("passwordFields")
  .classList.toggle("hidden", !!localStorage.getItem(PASS_KEY));
if (gateEnabled && localStorage.getItem(PASS_KEY)) {
  document.getElementById("lockscreen").classList.add("show");
}
