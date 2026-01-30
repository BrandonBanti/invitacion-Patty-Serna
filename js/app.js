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

  window.open(`https://docs.google.com/forms/d/e/1FAIpQLScw2sTYwkLA4z3u6w7Z7bTBucGjjwOJzpHj-92a_vj2P2KTMA/viewform?usp=dialog`, "_blank");
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

/* ================================
   🌼 LLUVIA DORADA DE ALCATRACES
   Pega esto AL FINAL de app.js
   Requiere: #card y <canvas id="confetti">
================================== */

(() => {
  const card = document.getElementById("card");
  const canvas = document.getElementById("confetti");
  if (!card || !canvas) return;

  const ctx = canvas.getContext("2d");

  let w = 0, h = 0, lilies = [];
  let dpr = 1;

  function rand(min, max) { return Math.random() * (max - min) + min; }

  // roundRect polyfill (por si tu navegador no lo soporta)
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    // eslint-disable-next-line no-extend-native
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + width, y, x + width, y + height, r);
      this.arcTo(x + width, y + height, x, y + height, r);
      this.arcTo(x, y + height, x, y, r);
      this.arcTo(x, y, x + width, y, r);
      this.closePath();
      return this;
    };
  }

  function makeLily(initial = false) {
    const size = rand(12, 22) * dpr;
    const x = rand(0, w);
    const y = initial ? rand(-h, h) : rand(-120 * dpr, -20 * dpr);

    return {
      x,
      y,
      size,
      vy: rand(0.9, 2.2) * dpr,
      vx: rand(-0.25, 0.25) * dpr,
      rot: rand(-Math.PI, Math.PI),
      vr: rand(-0.012, 0.012),
      sway: rand(0.8, 1.8),
      swayPhase: rand(0, Math.PI * 2),
      glow: rand(0.10, 0.20),
      alpha: rand(0.45, 0.85),
    };
  }

  function resize() {
    const r = card.getBoundingClientRect();
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    w = canvas.width = Math.floor(r.width * dpr);
    h = canvas.height = Math.floor(r.height * dpr);

    const density = Math.floor((r.width * r.height) / 9000);
    const count = Math.max(22, Math.min(70, density));
    lilies = Array.from({ length: count }, () => makeLily(true));
  }

  function drawCallaLily(cx, cy, s, rot, alpha, glow) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    // brillo dorado
    ctx.shadowColor = `rgba(255, 210, 120, ${glow})`;
    ctx.shadowBlur = 18 * dpr;

    const gold1 = `rgba(255, 215, 140, ${alpha})`;
    const gold2 = `rgba(255, 180, 80, ${alpha})`;
    const gold3 = `rgba(255, 240, 200, ${alpha * 0.9})`;

    // Espata (pétalo)
    ctx.beginPath();
    ctx.moveTo(-0.35 * s, -0.55 * s);
    ctx.bezierCurveTo(0.10 * s, -0.80 * s, 0.62 * s, -0.35 * s, 0.25 * s, 0.10 * s);
    ctx.bezierCurveTo(-0.10 * s, 0.55 * s, -0.70 * s, 0.45 * s, -0.60 * s, -0.05 * s);
    ctx.bezierCurveTo(-0.55 * s, -0.35 * s, -0.55 * s, -0.48 * s, -0.35 * s, -0.55 * s);
    ctx.closePath();

    const grad = ctx.createLinearGradient(-0.6 * s, -0.7 * s, 0.6 * s, 0.7 * s);
    grad.addColorStop(0, gold3);
    grad.addColorStop(0.45, gold1);
    grad.addColorStop(1, gold2);

    ctx.fillStyle = grad;
    ctx.fill();

    // borde sutil
    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.18})`;
    ctx.stroke();

    // Espádice (centro)
    ctx.beginPath();
    ctx.roundRect(0.05 * s, -0.18 * s, 0.10 * s, 0.46 * s, 20 * dpr);
    ctx.fillStyle = `rgba(255, 160, 40, ${alpha * 0.75})`;
    ctx.fill();

    // brillito
    ctx.beginPath();
    ctx.ellipse(-0.12 * s, -0.10 * s, 0.10 * s, 0.22 * s, -0.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.10})`;
    ctx.fill();

    ctx.restore();
  }

  function tick() {
    requestAnimationFrame(tick);
    ctx.clearRect(0, 0, w, h);

    for (const L of lilies) {
      L.swayPhase += 0.02;
      L.x += L.vx + Math.sin(L.swayPhase) * (0.15 * dpr) * L.sway;
      L.y += L.vy;
      L.rot += L.vr;

      if (L.y > h + 60 * dpr) {
        Object.assign(L, makeLily(false));
        L.x = rand(0, w);
      }

      drawCallaLily(L.x, L.y, L.size, L.rot, L.alpha, L.glow);
    }
  }

  resize();
  window.addEventListener("resize", resize);
  tick();
})();

