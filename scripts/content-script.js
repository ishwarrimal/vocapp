document.addEventListener("dblclick", function () {
  var selection = window.getSelection().toString().trim();
  if (selection !== "") {
    console.log(selection);
    const vocabModal = document.querySelector("vocab-modal");
    console.log(vocabModal);
    // vocabModal.showModal();
  }
});

const showModal = () => {
  // Show modal
  const modal = this.shadowRoot.querySelector(".modal");
  modal.style.display = "block";
}

const appendVocabModal = () => {
  const myComponent = document.createElement("vocab-modal");
  document.body.appendChild(myComponent);
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.message === "createVocabModal") {
    // Do something in response to the "extensionInstalled" message
    if (!document.querySelector("vocab-modal")) {
      const myComponent = document.createElement("vocab-modal");
      document.body.appendChild(myComponent);
    }
  }
});
