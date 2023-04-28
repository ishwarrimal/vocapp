document.addEventListener("DOMContentLoaded", function () {
  // Display the selected text in the popup
  chrome.storage.local.get(["selectedText"], function (result) {
    const selectedText = result.selectedText;
    console.log(selectedText);
    document.getElementById("word").textContent = selectedText;
    fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + selectedText
    ).then((response) =>
      response.json().then((res) => {
        var definition = res[0].meanings[0].definitions[0].definition;
        document.getElementById("definition").textContent = definition;
      })
    );
  });
});
