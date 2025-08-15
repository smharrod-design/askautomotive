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

// Add SimplyBook widget script to the page
    (function(w, d, s, i) {
        var script = d.createElement(s);
        script.async = true;
        script.src = "//widget.simplybook.it/v2/widget/widget.js";
        script.onload = function() {
            new SimplybookWidget({"widget_type":"iframe","url":"https:\/\/askautomotive.simplybook.it","theme":"minimal","theme_settings":{"timeline_show_end_time":"1","timeline_modern_display":"as_slots","hide_company_label":"0","timeline_hide_unavailable":"1","hide_past_days":"0","sb_base_color":"#245d7b","btn_color_1":"#245d7b,#245d7b,#245d7b","link_color":"#245d7b","display_item_mode":"list","body_bg_color":"#e7eef3","sb_review_image":"3","sb_review_image_preview":"\/uploads\/askautomotive\/image_files\/preview\/b7cb9c91fee8bcef2a78d5ed2cb41288.png","dark_font_color":"#2b212b","light_font_color":"#ffffff","sb_company_label_color":"#e8e8e8","hide_img_mode":"0","sb_busy":"#c22727","sb_available":"#2b212b"},"timeline":"modern","datepicker":"top_calendar","is_rtl":false,"app_config":{"clear_session":1,"allow_switch_to_ada":0,"predefined":[]},"container_id":"sbw_0m3y0p"});
        };
        d.head.appendChild(script);
    })(window, document, 'script', 'sbw_0m3y0p');
