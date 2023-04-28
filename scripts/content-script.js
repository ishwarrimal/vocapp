document.addEventListener("dblclick", function () {
  var selection = window.getSelection().toString().trim();
  if (selection !== "") {
    console.log(selection);
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.message === "createVocabModal") {
    // Do something in response to the "extensionInstalled" message
    console.log("Create vocab modal");
    sendResponse("modal created");
  }
});
