"use strict";

// ** Handler for toggling '.selected' of action buttons and their associated <section> display
const actionButtons = document.querySelectorAll(".action-items button");
actionButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // remove current selection
    document.querySelector("button.selected")?.classList.remove("selected");
    document.querySelector(`section:not(section.hide)`)?.classList.add("hide");

    // highlight new selection
    const button = /** @type {HTMLButtonElement} */ (event.target);
    const actionClass = button.dataset.action;
    button.classList.add("selected");
    document.querySelector(`section.${actionClass}`)?.classList.remove("hide");
  });
});

// ** Validate URL client-side
/**
 * @param {string} url
 * @returns {boolean}
 */
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/** @type {HTMLButtonElement | null} */
const createShortcodeSubmitButton = document.querySelector(
  'form[method="post"] input[type="submit"]',
);

/** @type {HTMLParagraphElement | null} */
const invalidUrlMessage = document.querySelector("p.invalid-url-message");

createShortcodeSubmitButton?.addEventListener("click", (event) => {
  const submitButton = /** @type {HTMLInputElement} */ (event.target);
  const urlInput = /** @type {HTMLInputElement} */ (
    submitButton?.form?.elements[0]
  );
  if (!isValidURL(urlInput.value)) {
    event.preventDefault();
    invalidUrlMessage?.classList.add("visible");
    setTimeout(() => {
      invalidUrlMessage?.classList.remove("visible");
    }, 3000);
  }
});
