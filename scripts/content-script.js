let clickCount = 0;
let timeout;
let selection;
document.addEventListener("click", function () {
  clickCount++;
  if (clickCount === 1) {
    const timeout = setTimeout(() => {
      clickCount = 0;
    }, 500);
  } else if (clickCount === 2) {
    selection = window.getSelection().toString().trim();
  } else if (clickCount === 3) {
    clearTimeout(timeout);
    if (selection !== "") {
      console.log(selection);
      showModal(selection);
    }
  }
});

const showModal = (word) => {
  const vocabModal = document.querySelector("vocab-modal").shadowRoot;
  showWordAndMeaning(vocabModal, word);
  const modal = vocabModal.querySelector(".modal");
  modal.style.display = "block";
};

const showWordAndMeaning = async (element, word) => {
  const wordElement = element.querySelector("#word");
  const meaningElement = element.querySelector("#meaning");
  const phoeAudio = element.querySelector("#phoeAudio");
  const phoeText = element.querySelector("#phoeText");
  const audioIcon = element.querySelector("#audioIcon");
  wordElement.innerText = word;
  meaningElement.innerText = "Please wait. Getting the meaning...";
  const meaningObj = await getWordMeaning(word);
  if (!meaningObj) {
    meaningElement.innerText = "Could not get the meaning. Please try again.";
    return;
  }
  audioIcon.setAttribute(
    "src",
    chrome.runtime.getURL("assets/volume-high-solid.svg")
  );
  audioIcon.addEventListener("click", () => phoeAudio.play());
  meaningElement.innerText = "";
  phoeText.innerText = meaningObj?.phoneticText || "";
  phoeAudio.setAttribute("src", meaningObj?.phoneticsAudio || "");
  meaningObj.meaning.forEach((mean) => {
    if (!mean) return;
    meaningElement.innerHTML += `<p>~${mean?.definition}</p>`;
  });
};

const appendVocabModal = () => {
  const myComponent = document.createElement("vocab-modal");
  document.body.appendChild(myComponent);
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.message === "createVocabModal") {
    // Do something in response to the "extensionInstalled" message
    console.log("Create vocab modal");
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("scripts/VocabModal.js");
    document.head.appendChild(script);
    if (!document.querySelector("vocab-modal")) {
      appendVocabModal();
    }
  }
});
