// Inject a shared navbar and footer on all pages
const NAV_ITEMS = [
  ["Home","/mnt/data/iot-smart-display-site/index.html"],
  ["Architecture","/mnt/data/iot-smart-display-site/pages/architecture.html"],
  ["Hardware","/mnt/data/iot-smart-display-site/pages/hardware.html"],
  ["Firmware","/mnt/data/iot-smart-display-site/pages/firmware.html"],
  ["Web App","/mnt/data/iot-smart-display-site/pages/webapp.html"],
  ["Setup","/mnt/data/iot-smart-display-site/pages/setup.html"],
  ["API","/mnt/data/iot-smart-display-site/pages/api.html"],
  ["Security","/mnt/data/iot-smart-display-site/pages/security.html"],
  ["Demo","/mnt/data/iot-smart-display-site/pages/demo.html"],
  ["FAQ","/mnt/data/iot-smart-display-site/pages/faq.html"],
  ["Contact","/mnt/data/iot-smart-display-site/pages/contact.html"]
];

function renderNav(){
  const here = location.pathname.replace(/\\/g,'/');
  const nav = document.getElementById('navbar');
  if(!nav) return;
  let links = NAV_ITEMS.map(([label, href])=>{
    const active = here.endsWith(href.split('/').slice(-1)[0]) ? 'active' : '';
    return `<a class="${active}" href="${href}">${label}</a>`;
  }).join('');
  nav.innerHTML = `
    <div class="nav">
      <div class="container nav-wrap">
        <a class="brand" href="${NAV_ITEMS[0][1]}">
          <span class="dot"></span><span>Smart Display Board</span>
        </a>
        <nav class="nav-links">${links}</nav>
      </div>
    </div>
  `;
}

function renderFooter(){
  const f = document.getElementById('footer');
  if(!f) return;
  const year = new Date().getFullYear();
  f.innerHTML = `
    <footer>
      <div class="container">
        <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:space-between;align-items:center">
          <div>© ${year} IoT-Based Smart Dynamic Display Board.</div>
          <div class="small">ESP32 • MQTT/HTTP • P10 LED Matrix</div>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded',()=>{
  renderNav();
  renderFooter();
  // attach global handlers for any simulated marquee widgets
  document.querySelectorAll('[data-marquee]').forEach(initMarquee);
});

// Simple marquee simulator used on Demo page and hero
function initMarquee(el){
  const text = el.dataset.text || "Welcome to the IoT Smart Notice Board";
  const speed = Number(el.dataset.speed || 60); // pixels per second
  el.innerHTML = `<div class="notice-text">${text}</div>`;
  const inner = el.querySelector('.notice-text');
  let x = el.clientWidth;
  function tick(ts){
    x -= speed/60;
    if(x < -inner.clientWidth) x = el.clientWidth;
    inner.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Copy-to-clipboard helper
function copyText(id){
  const n = document.getElementById(id);
  if(!n) return;
  navigator.clipboard.writeText(n.innerText.trim()).then(()=>{
    alert("Copied to clipboard.");
  });
}