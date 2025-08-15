  // play the one‑time “unhover” by removing the class on first paint
  window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('logo');
    // Clone just the SVG from the header logo into the About section
    const headerSvg = el ? el.querySelector('svg') : null;
    const aboutLogoSlot = document.querySelector('#about .about-logo');
    if (headerSvg && aboutLogoSlot && !aboutLogoSlot.querySelector('svg')) {
      const svgClone = headerSvg.cloneNode(true);
      // Copy class and id to retain hover animation
      if (headerSvg.getAttribute('class')) {
        svgClone.setAttribute('class', headerSvg.getAttribute('class'));
      }
      if (headerSvg.getAttribute('id')) {
        svgClone.setAttribute('id', headerSvg.getAttribute('id'));
      }
      aboutLogoSlot.appendChild(svgClone);
    }
    // let the page paint once, then drop the pose so CSS transitions run
    if (el) {
      requestAnimationFrame(() => el.classList.remove('hover-pose'));

      // Also allow tap/click to trigger the animation by toggling a .hover class briefly
      const triggerLogo = () => {
        el.classList.add('hover');
        setTimeout(() => el.classList.remove('hover'), 600);
      };
      el.addEventListener('click', triggerLogo);
      el.addEventListener('touchstart', triggerLogo, { passive: true });
    }

    // Footer year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

  // Mobile map: two-finger gesture to move/zoom; single-finger scrolls the page
  (function enableTwoFingerMap(){
    const map = document.querySelector('.map iframe');
    const hint = document.querySelector('.map-hint');
    if (!map) return;

    let touchCount = 0;
    const setInteractive = (on) => {
      map.style.pointerEvents = on ? 'auto' : 'none';
    };

    const onTouchStart = (e) => {
      touchCount = e.touches ? e.touches.length : 0;
      setInteractive(touchCount >= 2);
      if (hint) hint.style.display = touchCount >= 2 ? 'none' : 'block';
    };
    const onTouchEnd = () => {
      touchCount = 0;
      setInteractive(false);
      if (hint) hint.style.display = 'block';
    };

    map.addEventListener('touchstart', onTouchStart, { passive: true });
    map.addEventListener('touchend', onTouchEnd, { passive: true });
    map.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // Ensure desktop remains interactive via CSS; default mobile is non-interactive
    setInteractive(false);
  })();