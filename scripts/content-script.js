let clickCount = 0;
let timeout;
let currentMeaning = [];
let selection = {};
let vocabModal;
document.addEventListener("click", function () {
  clickCount++;
  if (clickCount === 1) {
    const timeout = setTimeout(() => {
      clickCount = 0;
    }, 500);
  } else if (clickCount === 2) {
    sel = window.getSelection();
    selection.word = sel.toString().trim();
    selection.para = sel.baseNode.data;
    selection.startIndex = sel.baseOffset;
    selection.endIndex = sel.extentOffset;
  } else if (clickCount === 3) {
    clearTimeout(timeout);
    if (selection.word !== "") {
      showModal();
    }
  }
});

const showModal = () => {
  vocabModal = document.querySelector("vocab-modal").shadowRoot;
  showWordAndMeaning();
  showAlternateSentence();
  const modal = vocabModal.querySelector(".modal");
  modal.style.display = "block";
};

const showAlternateSentence = async () => {
  const { para, startIndex, endIndex, word } = selection;
  //code to find the selected sentence from para
  let selectedSentenceStart = indexOfAny(para, startIndex, false);
  selectedSentenceStart =
    selectedSentenceStart == -1 ? 0 : selectedSentenceStart + 2;
  const selectedSentenceEnd = indexOfAny(para, endIndex);
  const selectedSentence = para.substring(
    selectedSentenceStart,
    selectedSentenceEnd
  );
  //find the index of the word w.r.t the selectedSentence
  const newStartIndex = startIndex - selectedSentenceStart;
  const newEndIndex = endIndex - selectedSentenceStart;
  console.log(selectedSentence);
  let length = 0;
  let index = -1;
  selectedSentence.split(" ").find((wrd, i) => {
    if (wrd === word && length == newStartIndex) {
      index = i;
      return true;
    }
    length = length + wrd.length + 1;
    return false;
  });
  const newSynonymList = await getSynonym(selectedSentence, index);
  console.log(newSynonymList);
  // const newPara = para.substring(startIndex - 30, endIndex + 30);
};

const showWordAndMeaning = async () => {
  const wordElement = vocabModal.querySelector("#word");
  const meaningElement = vocabModal.querySelector("#meaning");
  const phoeAudio = vocabModal.querySelector("#phoeAudio");
  const phoeText = vocabModal.querySelector("#phoeText");
  const audioIcon = vocabModal.querySelector("#audioIcon");
  wordElement.innerText = selection.word;
  meaningElement.innerText = "Please wait. Getting the meaning...";
  const meaningObj = await getWordMeaning(selection.word);
  if (!meaningObj) {
    meaningElement.innerText = "Could not get the meaning. Please try again.";
    return;
  }
  audioIcon.addEventListener("click", () => phoeAudio.play());
  meaningElement.innerText = "";
  phoeText.innerText = meaningObj?.phoneticText || "";
  phoeAudio.setAttribute("src", meaningObj?.phoneticsAudio || "");
  meaningObj.meaning.forEach((mean) => {
    if (!mean) return;
    currentMeaning.push(mean?.definition);
    meaningElement.innerHTML += `<p>~${mean?.definition}</p>`;
  });
  audioIcon.setAttribute(
    "src",
    chrome.runtime.getURL("assets/volume-high-solid.svg")
  );
};

const appendVocabModal = () => {
  const myComponent = document.createElement("vocab-modal");
  document.body.appendChild(myComponent);
  setTimeout(attachEventListeners, 1000);
};

const handleBookmarkClicked = () => {
  addToLocalStorage(selection.word, currentMeaning);
};

const attachEventListeners = () => {
  const vocabModal = document.querySelector("vocab-modal").shadowRoot;
  const bookmarkButton = vocabModal.querySelector("#bookmarkButton");
  bookmarkButton.addEventListener("click", handleBookmarkClicked);
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "background_to_content") {
    if (message.data === "create_vocab_modal") {
      // Do something in response to the "extensionInstalled" message
      console.log("Create vocab modal");
      if (document.querySelector("vocab-modal")) return;
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("scripts/VocabModal.js");
      document.head.appendChild(script);
      if (!document.querySelector("vocab-modal")) {
        appendVocabModal();
      }
    }
  }
  if (message.action === "popup_to_content") {
    if (message.data === "fetch_word_list") {
      // Handle the message from the popup script
      console.log("Message from popup:", message.data);
      const responseMessage = getAllItemsFromLocalStorage();
      sendResponse(responseMessage);
    }
  }
});
