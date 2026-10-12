// Share buttons on post pages. Behavior mirrors metr.org's post header.

// Citation popup
const citationTrigger = document.querySelector(".citation-popup-trigger");
const citationPopup = document.querySelector(".citation-popup");

if (citationTrigger && citationPopup) {
  const closeBtn = citationPopup.querySelector(".citation-popup-close");
  const copyBtn = citationPopup.querySelector(".citation-copy-btn");
  const codeBlock = citationPopup.querySelector("code");

  function openPopup() {
    citationPopup.classList.add("active");
    citationTrigger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    citationPopup.classList.remove("active");
    citationTrigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  citationTrigger.addEventListener("click", openPopup);

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  // Close on backdrop click
  citationPopup.addEventListener("click", function (e) {
    if (e.target === citationPopup) {
      closePopup();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && citationPopup.classList.contains("active")) {
      closePopup();
    }
  });

  if (copyBtn && codeBlock) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(codeBlock.innerText).then(function () {
        const icon = copyBtn.querySelector("i");
        icon.classList.replace("fa-clipboard", "fa-clipboard-check");
        copyBtn.classList.add("copied");

        setTimeout(function () {
          icon.classList.replace("fa-clipboard-check", "fa-clipboard");
          copyBtn.classList.remove("copied");
        }, 2000);
      }).catch(function () {});
    });
  }
}

// Copy link
const copyLinkBtn = document.querySelector(".copy-link-btn");
if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
      const icon = copyLinkBtn.querySelector("i");
      icon.classList.replace("fa-link", "fa-check");
      copyLinkBtn.classList.add("copied");

      setTimeout(function () {
        icon.classList.replace("fa-check", "fa-link");
        copyLinkBtn.classList.remove("copied");
      }, 2000);
    }).catch(function () {});
  });
}
