// js/app.js
const INVITE = {
  momName: "Patty Serna",
  dateText: "Sábado 21 de Marzo",
  timeText: "6:00 PM",
  place: "Salón los Alcatraces",
  address: "Ubicación: Av. Océano Pacífico 86, Lomas Lindas, 52947 Cdad. López Mateos, Méx.",
  mapsUrl: "https://www.google.com/maps/place/Sal%C3%B3n+los+Alcatraces/@19.5704238,-99.2510745,17z/data=!3m1!4b1!4m6!3m5!1s0x85d21c588d25ae5f:0xd2308c1d243190e1!8m2!3d19.5704238!4d-99.2484996!16s%2Fg%2F11b60qymgs?entry=ttu&g_ep=EgoyMDI0MTAwNy4xIKXMDSoASAFQAw%3D%3D",
  whatsappPhone: "5215512345678",

  eventDateTime: "2026-03-21T19:30:00-06:00",

  message:
    "Con la bendición de Dios y el amor que mi familia me ha regalado a lo largo de mi vida, llego a este momento tan especial llena de gratitud y felicidad." +
    " Celebrar mis 50 años representa un viaje de aventuras, aprendizajes y recuerdos inolvidables, y no puedo imaginar esta ocasión sin tu compañía, pues tú" + 
    "también formas parte de mi historia."+
    " ¡Prepárate para vivir momentos únicos y celebrar juntos esta etapa tan especial de mi vida!",
};

function pad2(n) { return String(n).padStart(2, "0"); }

function getBoletoCantidadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = (params.get("boleto") ?? "").trim();
  if (!raw) return null;

  const m = raw.match(/^\d{1,2}$/);
  if (!m) return null;

  return Math.max(1, Math.min(99, Number(m[0])));
}

// ===== DOM =====
const card = document.getElementById("card");

document.getElementById("momName").textContent = INVITE.momName;
document.getElementById("date").textContent = INVITE.dateText;
document.getElementById("time").textContent = INVITE.timeText;
document.getElementById("place").textContent = INVITE.place;
document.getElementById("address").textContent = INVITE.address;
document.getElementById("messageText").textContent = INVITE.message;

// ===== Boletos (cantidad) =====
const ticketQtyEl = document.getElementById("ticketQty");
const ticketSubEl = document.getElementById("ticketSub");
const ticketHintEl = document.getElementById("ticketHint");

const qty = getBoletoCantidadFromUrl();
const finalQty = qty ?? 1;

ticketQtyEl.textContent = String(finalQty);
ticketSubEl.textContent =
  finalQty === 1 ? "Válido para 1 invitado" : `Válido para ${finalQty} invitados`;


// ===== Actions =====
document.getElementById("btnWhats").addEventListener("click", () => {
  const msg =
    `¡Hola! Te invitamos a celebrar los 50 años de ${INVITE.momName} 🎉%0A` +
    `📅 ${INVITE.dateText}%0A⏰ ${INVITE.timeText}%0A📍 ${INVITE.place}%0A` +
    `📌 ${INVITE.address}%0A` +
    `🎟️ Boletos asignados: ${finalQty}%0A%0A` +
    `💙 Para organizarnos mejor, ¿nos ayudas confirmando antes del 17 de febrero?%0A%0A` +
    `¡Gracias!`;

  window.open(`https://docs.google.com/forms/d/e/1FAIpQLSeCAy3yvJN_GSDAHf4UdD2p_rkGSut0L7TeDT7OeyFYLkQp7g/viewform?usp=sf_link`, "_blank");
});

document.getElementById("btnMaps").addEventListener("click", () => {
  window.open(INVITE.mapsUrl, "_blank");
});

// ===== Countdown =====
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMinutes = document.getElementById("cdMinutes");
const cdSeconds = document.getElementById("cdSeconds");
const countdownSub = document.getElementById("countdownSub");

function updateCountdown() {
  const eventTime = new Date(INVITE.eventDateTime).getTime();

  if (Number.isNaN(eventTime)) {
    countdownSub.textContent = "Configura una fecha válida en eventDateTime.";
    cdDays.textContent = "--";
    cdHours.textContent = "--";
    cdMinutes.textContent = "--";
    cdSeconds.textContent = "--";
    return;
  }

  const diff = eventTime - Date.now();

  if (diff <= 0) {
    cdDays.textContent = "00";
    cdHours.textContent = "00";
    cdMinutes.textContent = "00";
    cdSeconds.textContent = "00";
    countdownSub.textContent = "¡Hoy es la fiesta! 🎉";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  cdDays.textContent = pad2(days);
  cdHours.textContent = pad2(hours);
  cdMinutes.textContent = pad2(minutes);
  cdSeconds.textContent = pad2(seconds);

  countdownSub.textContent = `Nos vemos en ${days} día(s) — ¡prepárate para celebrar! ✨`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Confetti =====
const c = document.getElementById("confetti");
const ctx = c.getContext("2d");
let w, h, pieces;

function resize(){
  const r = card.getBoundingClientRect();
  w = c.width = Math.floor(r.width * devicePixelRatio);
  h = c.height = Math.floor(r.height * devicePixelRatio);

  pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: (Math.random() * 6 + 2) * devicePixelRatio,
    vx: (Math.random() * 0.8 - 0.4) * devicePixelRatio,
    vy: (Math.random() * 1.6 + 0.6) * devicePixelRatio,
    rot: Math.random() * Math.PI,
    vr: (Math.random() * 0.08 - 0.04),
    a: Math.random() * 0.7 + 0.2,
  }));
}

function tick(){
  requestAnimationFrame(tick);
  ctx.clearRect(0, 0, w, h);

  for (const p of pieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;

    ctx.save();
    ctx.globalAlpha = p.a;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    const t = (p.x + p.y) % 3;
    ctx.fillStyle = t === 0
      ? "rgba(31,91,255,.95)"
      : (t === 1 ? "rgba(255,255,255,.85)" : "rgba(255,210,120,.85)");

    ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
    ctx.restore();
  }
}

resize();
window.addEventListener("resize", resize);
tick();
