function closeCurrentWindow() {
  const allLinksToProjPage = document.querySelectorAll(".project .myName");

  allLinksToProjPage.forEach((link) => {
    link.addEventListener("click", () => {
      window.close();
    });
  });
}

closeCurrentWindow();
