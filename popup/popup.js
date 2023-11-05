document.addEventListener("DOMContentLoaded", function () {
  let globalWordList;
  // Function to create an accordion element
  function createAccordion(word, definition) {
    const accordion = document.createElement("button");
    accordion.className = "accordion";
    accordion.textContent = word;

    const panel = document.createElement("div");
    panel.className = "panel";
    panel.textContent = definition;

    accordion.addEventListener("click", function () {
      panel.classList.toggle("active");
    });

    return [accordion, panel];
  }

  // Function to add an accordion item to the UI
  function addAccordionItem(word, definition) {
    const [accordion, panel] = createAccordion(word, definition);
    document.getElementById("wordList").appendChild(accordion);
    document.getElementById("wordList").appendChild(panel);
  }

  function messageFromContent(wordList) {
    globalWordList = Object.keys(wordList);
    Object.keys(wordList).forEach((word) => {
      const definition = wordList[word].reduce((p, c) => `${p} | ${c}`);
      addAccordionItem(word, definition);
    });
  }

  // Fetch the word list from local storage
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id; // Assuming you have one active tab
    const message = { action: "popup_to_content", data: "fetch_word_list" };
    chrome.tabs.sendMessage(tabId, message, messageFromContent);
  });

  const rephraseButton = document.getElementById("check-sentence");
  rephraseButton.addEventListener("click", () => {
    const sentence = document.getElementById("sentence").value;
    console.log(globalWordList, sentence);
  });
});
