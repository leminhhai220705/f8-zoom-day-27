const codeTransfer = document.querySelector("#code-output");
const contextMenu = document.querySelector("#context-menu");

const initialHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>

</body>
</html>`;

const codeContext = CodeMirror.fromTextArea(
  document.querySelector("#code-input"),
  {
    mode: "htmlmixed",
    theme: "material",
    lineNumbers: true,
  },
);

function liveCode() {
  codeContext.setValue(initialHTML);
  codeContext.on("change", () => {
    const src = codeContext.getValue();
    codeTransfer.srcdoc = src;
  });

  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "Are you sure to exit?";
  });

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.style.top = e.clientY > 690 ? "690px" : `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.hidden = false;

    const edit = contextMenu.querySelector("#copy");
    edit.onclick = () => {
      navigator.clipboard.writeText(codeContext.getValue());
    };

    const deleteBtn = contextMenu.querySelector("#delete");
    deleteBtn.onclick = () => {
      codeContext.setValue("");
    };
  });

  document.addEventListener("click", (e) => {
    contextMenu.hidden = true;
  });
}

liveCode();
