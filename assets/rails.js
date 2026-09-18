/* Carrosseis mobile: indicador de posicao + acessibilidade. CSS faz o scroll-snap. */
(function () {
  var MQ = window.matchMedia('(max-width: 759px)');

  function build(rail) {
    if (rail.dataset.railed === '1') return;
    rail.dataset.railed = '1';
    var items = Array.prototype.filter.call(rail.children, function (c) { return c.nodeType === 1; });
    if (items.length < 2) return;

    var bar = document.createElement('div');
    bar.className = 'raildots';
    bar.setAttribute('aria-hidden', 'true');
    items.forEach(function () {
      var d = document.createElement('span');
      bar.appendChild(d);
    });
    var count = document.createElement('span');
    count.className = 'railcount';
    bar.appendChild(count);
    rail.parentNode.insertBefore(bar, rail.nextSibling);
    rail.setAttribute('tabindex', '0');
    rail.setAttribute('role', 'group');
    rail.setAttribute('aria-label', 'Lista deslizável — arraste para o lado');

    var dots = Array.prototype.slice.call(bar.querySelectorAll('span:not(.railcount)'));
    function sync() {
      var step = (rail.scrollWidth - rail.clientWidth) / Math.max(1, items.length - 1);
      var i = step > 0 ? Math.round(rail.scrollLeft / step) : 0;
      if (i < 0) i = 0;
      if (i > items.length - 1) i = items.length - 1;
      dots.forEach(function (d, n) { d.className = n === i ? 'on' : ''; });
      count.textContent = (i + 1) + '/' + items.length;
    }
    var t;
    rail.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(sync, 60);
    }, { passive: true });
    sync();
  }

  function teardown(rail) {
    if (rail.dataset.railed !== '1') return;
    rail.dataset.railed = '0';
    var bar = rail.nextElementSibling;
    if (bar && bar.classList.contains('raildots')) bar.parentNode.removeChild(bar);
    rail.removeAttribute('tabindex');
    rail.removeAttribute('role');
    rail.removeAttribute('aria-label');
  }

  function apply() {
    var rails = document.querySelectorAll('.rail');
    Array.prototype.forEach.call(rails, MQ.matches ? build : teardown);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  (MQ.addEventListener ? MQ.addEventListener.bind(MQ, 'change') : MQ.addListener.bind(MQ))(apply);
})();
