//This file can't access the actual script.
//This file can listen for and react to events when the extension is first installed, a new tab is created, a new bookmark is added, the extension toolbar icon is clicked, etc.
// It can't use the DOM APIs that a document's global Window object provides. It also runs in its own environment, so it cannot directly modify a web page's content.
chrome.runtime.onInstalled.addListener(async function () {
  console.log("app is installed");
});

//This callback listens for the page load to be completed
chrome.webNavigation.onCompleted.addListener(
  function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Send a message to the content script in the active tab to create the modal
      chrome.tabs.sendMessage(tabs[0].id, { message: "createVocabModal" });
    });
  },
  { url: [{ schemes: ["http", "https"] }] }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("received messae", request);
  if (request.message === "showDefinition") {
    // Get the selected text from the content script
    var selectedText = request.selectionText;
  }
  // sendResponse();
});
