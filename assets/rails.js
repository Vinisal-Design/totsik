/* Carrossel: setas no desktop, bolinhas no mobile, contador sempre. CSS faz o scroll-snap. */
(function () {
  function build(rail) {
    if (rail.dataset.railed === '1') return;
    var items = Array.prototype.filter.call(rail.children, function (c) { return c.nodeType === 1; });
    if (items.length < 2) return;
    rail.dataset.railed = '1';

    var bar = document.createElement('div');
    bar.className = 'railbar';

    var dots = document.createElement('div');
    dots.className = 'raildots';
    dots.setAttribute('aria-hidden', 'true');
    items.forEach(function () { dots.appendChild(document.createElement('span')); });

    var count = document.createElement('span');
    count.className = 'railcount';

    var nav = document.createElement('div');
    nav.className = 'railnav';
    var prev = document.createElement('button');
    prev.className = 'prev';
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Anterior');
    prev.appendChild(document.createElement('span'));
    var next = document.createElement('button');
    next.className = 'next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Próximo');
    next.appendChild(document.createElement('span'));
    nav.appendChild(prev);
    nav.appendChild(next);

    bar.appendChild(dots);
    bar.appendChild(count);
    bar.appendChild(nav);
    rail.parentNode.insertBefore(bar, rail.nextSibling);

    rail.setAttribute('tabindex', '0');
    rail.setAttribute('role', 'group');
    rail.setAttribute('aria-label', 'Lista deslizável — arraste ou use as setas');

    var bullets = Array.prototype.slice.call(dots.children);

    function max() { return rail.scrollWidth - rail.clientWidth; }

    function step() {
      var a = items[0].getBoundingClientRect();
      var b = items[1] ? items[1].getBoundingClientRect() : a;
      return Math.max(1, Math.round(b.left - a.left));
    }

    function sync() {
      var m = max();
      bar.classList.toggle('is-static', m <= 2);   // cabe tudo: sem controles
      var i = m > 0 ? Math.round(rail.scrollLeft / step()) : 0;
      if (i < 0) i = 0;
      if (i > items.length - 1) i = items.length - 1;
      bullets.forEach(function (d, n) { d.className = n === i ? 'on' : ''; });
      var perView = Math.max(1, Math.round(rail.clientWidth / step()));
      var last = Math.min(items.length, i + perView);
      count.textContent = (perView > 1 ? (i + 1) + '–' + last : (i + 1)) + '/' + items.length;
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft >= m - 2;
    }

    function go(dir) {
      var per = Math.max(1, Math.floor(rail.clientWidth / step()));
      rail.scrollBy({ left: dir * step() * per, behavior: 'smooth' });
    }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });

    var t;
    rail.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(sync, 60);
    }, { passive: true });
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(sync, 120);
    });
    if (window.ResizeObserver) new ResizeObserver(sync).observe(rail);
    sync();
    setTimeout(sync, 500);   // depois das imagens carregarem
  }

  function apply() {
    Array.prototype.forEach.call(document.querySelectorAll('.rail'), build);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.addEventListener('load', apply);
})();
