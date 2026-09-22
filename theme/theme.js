// Optional framework-free behavior. Native dialog/popover retain focus and Escape handling.
export function initTrylle(root = document) {
  const abort = new AbortController();
  const signal = abort.signal;
  const selected = "[role=menuitem], [role=menuitemradio], [role=option]";
  let typeahead = "", lastTypeAt = 0;

  function activateTab(tab) {
    for (const item of tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')) {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(item.getAttribute("aria-controls"));
      if (panel) panel.hidden = !active;
    }
    tab.dispatchEvent(new CustomEvent("tl:tabchange", { bubbles: true }));
  }

  function positionPopover(popup) {
    const trigger = root.querySelector(`[popovertarget="${CSS.escape(popup.id)}"]`);
    if (!trigger) return;
    const anchor = trigger.getBoundingClientRect();
    const box = popup.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const left = popup.dataset.align === "end" ? anchor.right - box.width : anchor.left;
    const top = anchor.bottom + 6 + box.height > innerHeight - 12 ? anchor.top - box.height - 6 : anchor.bottom + 6;
    popup.style.left = `${Math.max(12, Math.min(left, width - box.width - 12))}px`;
    popup.style.top = `${Math.max(12, Math.min(top, innerHeight - box.height - 12))}px`;
  }

  root.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.tl-button[aria-disabled="true"]')) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const button = event.target.closest("button, [role=tab], [data-dialog-open]");
    if (!button || button.disabled || button.getAttribute("aria-disabled") === "true") return;
    if (button.matches('[role="tab"]')) activateTab(button);
    if (button.dataset.dialogOpen) {
      const popup = button.closest("[popover]");
      if (popup) {
        popup.hidePopover();
        root.querySelector(`[popovertarget="${CSS.escape(popup.id)}"]`)?.focus();
      }
      document.getElementById(button.dataset.dialogOpen)?.showModal();
    }
    if (button.hasAttribute("data-dialog-close")) button.closest("dialog")?.close();
    if (button.matches("[data-select-value]")) {
      const popup = button.closest("[popover]");
      for (const option of popup.querySelectorAll("[data-select-value]")) {
        option.setAttribute(option.getAttribute("role") === "menuitemradio" ? "aria-checked" : "aria-selected", String(option === button));
      }
      const trigger = root.querySelector(`[popovertarget="${CSS.escape(popup.id)}"]`);
      const label = button.querySelector("[data-option-label]")?.textContent || button.textContent;
      if (trigger) {
        const value = trigger.querySelector("[data-selected-label]");
        if (value) value.textContent = label.trim();
        trigger.dataset.value = button.dataset.selectValue;
        trigger.dispatchEvent(new CustomEvent("tl:change", { bubbles: true, detail: { value: button.dataset.selectValue, label: label.trim() } }));
      }
      popup.hidePopover();
      trigger?.focus();
    }
    if (button.hasAttribute("data-menu-close") && !button.dataset.dialogOpen) {
      const popup = button.closest("[popover]");
      popup?.hidePopover();
      root.querySelector(`[popovertarget="${CSS.escape(popup?.id || "")}"]`)?.focus();
    }
  }, { signal });

  root.addEventListener("beforetoggle", event => {
    const popup = event.target;
    if (!(popup instanceof HTMLElement) || !popup.matches(".tl-popover[popover]") || event.newState !== "open") return;
    const search = popup.querySelector("[data-command-search]");
    if (search) {
      search.value = "";
      for (const item of popup.querySelectorAll(selected)) item.hidden = false;
      const empty = popup.querySelector(".tl-command-empty");
      if (empty) empty.hidden = true;
    }
    // Measure before opening so a reused popover never flashes at its old position.
    const display = popup.style.display, visibility = popup.style.visibility;
    popup.style.display = "block";
    popup.style.visibility = "hidden";
    positionPopover(popup);
    popup.style.display = display;
    popup.style.visibility = visibility;
  }, { capture: true, signal });

  root.addEventListener("toggle", event => {
    const popup = event.target;
    if (!(popup instanceof HTMLElement) || !popup.matches(".tl-popover[popover]")) return;
    const open = event.newState === "open";
    const trigger = root.querySelector(`[popovertarget="${CSS.escape(popup.id)}"]`);
    trigger?.setAttribute("aria-expanded", String(open));
    if (open) {
      const search = popup.querySelector("[data-command-search]");
      const last = popup.dataset.focusLast ? [...popup.querySelectorAll(selected)].at(-1) : null;
      if (!popup.contains(document.activeElement)) (search || last || popup.querySelector('[aria-selected="true"], [aria-checked="true"]') || popup.querySelector(selected))?.focus({ preventScroll: true });
      delete popup.dataset.focusLast;
    }
  }, { capture: true, signal });

  root.addEventListener("keydown", event => {
    if (!(event.target instanceof Element)) return;
    const dialog = event.target.closest("dialog:modal");
    if (dialog && event.key === "Tab") {
      const items = [...dialog.querySelectorAll('a[href], button, input, textarea, select, [tabindex]')].filter(el => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length);
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first || !event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    }
    const trigger = event.target.closest("[popovertarget]");
    if (trigger && ["ArrowDown", "ArrowUp"].includes(event.key)) {
      const target = document.getElementById(trigger.getAttribute("popovertarget"));
      if (target && !target.matches(":popover-open")) {
        event.preventDefault();
        if (event.key === "ArrowUp") target.dataset.focusLast = "true";
        target.showPopover();
      }
    }
    const tab = event.target.closest('[role="tab"]');
    if (tab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')].filter(item => !item.disabled);
      const index = tabs.indexOf(tab);
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      event.preventDefault();
      activateTab(tabs[next]);
      tabs[next].focus();
    }
    const popup = event.target.closest('.tl-popover, [role="menu"]');
    if (popup && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) && (!event.target.matches("input") || event.key.startsWith("Arrow"))) {
      const items = [...popup.querySelectorAll(selected)].filter(item => !item.disabled && !item.hidden && item.getClientRects().length);
      if (!items.length) return;
      const index = items.indexOf(event.target.closest(selected));
      const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : index < 0 ? (event.key === "ArrowUp" ? items.length - 1 : 0) : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      event.preventDefault();
      items[next].focus();
    }
    if (popup && !event.target.matches("input") && event.key.length === 1 && event.key !== " " && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const now = performance.now();
      typeahead = (now - lastTypeAt < 500 ? typeahead : "") + event.key.toLowerCase();
      lastTypeAt = now;
      const items = [...popup.querySelectorAll(selected)].filter(item => !item.disabled && !item.hidden);
      const index = items.indexOf(event.target.closest(selected));
      const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)];
      const match = ordered.find(item => item.textContent.trim().toLowerCase().startsWith(typeahead));
      if (match) { event.preventDefault(); match.focus(); }
    }
    if (event.key === "Escape") {
      for (const wrap of root.querySelectorAll(".tl-tooltip-wrap")) wrap.setAttribute("data-tooltip-dismissed", "");
    }
  }, { signal });

  function updateRange(input) {
    const min = Number(input.min || 0), max = Number(input.max || 100);
    input.style.setProperty("--range-progress", `${max === min ? 0 : (Number(input.value) - min) / (max - min) * 100}%`);
    const output = root.querySelector(`output[for="${CSS.escape(input.id)}"]`);
    if (output) output.value = input.value + (input.dataset.unit || "");
  }
  for (const input of root.querySelectorAll(".tl-range")) updateRange(input);
  root.addEventListener("input", event => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.matches(".tl-range")) updateRange(input);
    if (input.hasAttribute("data-command-search")) {
      const popup = input.closest(".tl-popover");
      const items = [...popup.querySelectorAll(selected)];
      for (const item of items) item.hidden = !item.textContent.toLowerCase().includes(input.value.toLowerCase().trim());
      const empty = popup.querySelector(".tl-command-empty");
      if (empty) empty.hidden = items.some(item => !item.hidden);
    }
  }, { signal });
  for (const wrap of root.querySelectorAll(".tl-tooltip-wrap")) {
    for (const type of ["pointerleave", "focusout"]) wrap.addEventListener(type, () => wrap.removeAttribute("data-tooltip-dismissed"), { signal });
  }
  // A backdrop click targets the dialog itself; clicks on its content must not dismiss it.
  for (const dialog of root.querySelectorAll(".tl-dialog")) {
    let backdropDown = false;
    dialog.addEventListener("pointerdown", event => {
      const box = dialog.getBoundingClientRect();
      backdropDown = event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom);
    }, { signal });
    dialog.addEventListener("click", event => {
      if (backdropDown && event.target === dialog) dialog.close();
      backdropDown = false;
    }, { signal });
  }
  window.addEventListener("resize", () => {
    for (const popup of root.querySelectorAll(".tl-popover:popover-open")) positionPopover(popup);
  }, { signal });
  document.addEventListener("scroll", () => {
    for (const popup of root.querySelectorAll(".tl-popover:popover-open")) positionPopover(popup);
  }, { capture: true, signal });
  return () => abort.abort();
}
