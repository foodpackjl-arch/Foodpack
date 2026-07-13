// Carga el contenido visual editable (logos, fondos, iconos) y los productos
// desde Supabase, y los aplica sobre las paginas publicas del sitio.
// Si Supabase no responde, la pagina conserva su contenido original (no se rompe nada).

document.addEventListener("DOMContentLoaded", function () {
aplicarContenidoVisual();
renderizarProductosDinamicos();
});

function aplicarContenidoVisual() {
supabaseClient
.from("contenido_visual")
.select("clave, tipo, valor")
.then(function (res) {
if (res.error || !res.data) return;
res.data.forEach(function (item) {
var els = document.querySelectorAll('[data-content-key="' + item.clave + '"]');
if (!els.length) return;
els.forEach(function (el) {
if (item.tipo === "imagen" && item.valor) {
if (el.tagName === "IMG") {
el.src = item.valor;
} else {
el.style.backgroundImage = 'url("' + item.valor + '")';
  el.style.backgroundSize = "cover";
  el.style.backgroundPosition = "center";
  el.textContent = "";
}
} else if (item.tipo === "emoji" && item.valor) {
el.textContent = item.valor;
} else if (item.tipo === "texto" && item.valor) {
el.textContent = item.valor;
} else if (item.tipo === "visible") {
if (item.valor === "false") {
el.style.display = "none";
}
}
});
});
});
}

function renderizarProductosDinamicos() {
var contenedor = document.getElementById("productos-dinamicos");
if (!contenedor) return;
supabaseClient
.from("productos")
.select("*")
.eq("activo", true)
.order("orden", { ascending: true })
.then(function (res) {
if (res.error || !res.data || !res.data.length) return;
contenedor.innerHTML = res.data.map(function (p) {
var imagen = p.imagen_url
? '<img src="' + p.imagen_url + '" alt="' + escapeHtml(p.nombre) + '" class="w-full h-40 object-cover rounded-xl mb-4">'
: '<div class="w-full h-40 rounded-xl mb-4 flex items-center justify-center text-6xl bg-white/5">' + (p.emoji_icono || "📦") + "</div>";
var badge = p.badge
? '<span class="inline-block text-xs font-semibold tracking-wide uppercase bg-white/10 rounded-full px-3 py-1 mb-3">' + escapeHtml(p.badge) + "</span>"
: "";
var precio = p.precio
? '<div class="text-lime-400 font-semibold mt-2">' + escapeHtml(String(p.precio)) + "</div>"
: "";
return (
'<div class="bg-white/5 border border-white/10 rounded-2xl p-6">' +
badge +
imagen +
'<h3 class="text-xl font-semibold mb-2">' + escapeHtml(p.nombre || "") + "</h3>" +
'<p class="text-white/70 text-sm mb-2">' + escapeHtml(p.descripcion || "") + "</p>" +
precio +
'<a href="contactanos.html#formulario" class="inline-block mt-4 text-sm font-semibold underline">Cotizar ahora &rarr;</a>' +
"</div>"
);
}).join("");
});
}

function escapeHtml(str) {
return String(str)
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;");
}
