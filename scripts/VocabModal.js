class ConstructVocabModal extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Create modal container
    const modalContainer = document.createElement("div");
    modalContainer.setAttribute("class", "modal");

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    const vocappHeadingDiv = document.createElement("div");
    const vocappHeadingText = document.createElement("h3");
    vocappHeadingDiv.setAttribute("id", "vocapp-heading-div");
    vocappHeadingText.setAttribute("id", "vocapp-heading-text");
    vocappHeadingText.innerText = "Vocab App";
    vocappHeadingDiv.append(vocappHeadingText);

    // Create word field
    const wordInput = document.createElement("p");
    wordInput.setAttribute("id", "word");

    //Create field for phoenetics and audio
    const phoeDiv = document.createElement("div");
    phoeDiv.setAttribute("id", "phoeDiv");
    const phoe = document.createElement("span");
    phoe.setAttribute("id", "phoeText");
    phoeDiv.append(phoe);
    const phoeAudio = document.createElement("audio");
    phoeAudio.setAttribute("id", "phoeAudio");
    const audioIcon = document.createElement("img");
    audioIcon.setAttribute("id", "audioIcon");
    audioIcon.style = "width: 20px;margin-left: 10px;cursor:pointer";
    phoeDiv.append(phoeAudio);
    phoeDiv.append(audioIcon);

    // Create meaning field

    const meaningInput = document.createElement("div");
    meaningInput.setAttribute("id", "meaning");
    meaningInput.innerText = "Please wait. Getting the meaning...";

    // Create OK button
    const okButton = document.createElement("button");
    okButton.textContent = "OK";

    // Append elements to modal content
    modalContent.appendChild(vocappHeadingDiv);
    modalContent.appendChild(wordInput);
    modalContent.appendChild(phoeDiv);
    modalContent.appendChild(meaningInput);
    modalContent.appendChild(okButton);

    // Append modal content to modal container
    modalContainer.appendChild(modalContent);

    // Create styles
    const style = document.createElement("style");
    style.textContent = `

        p {
          margin: 0;
        }

        .modal {
          display: none;
          position: fixed;
          z-index: calc(9e999);
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.4);
        }

        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 60%;
        }

        #vocapp-heading-div{
          text-align: center;
        }

        #word {
          font-size: 18px;
          font-weight: 500;
          text-transform: capitalize;
          margin: 5px;
        }

        #phoeDiv{
          margin-bottom: 10px;
          display: flex;
        }

        #meaning {
          font-size: 16px;
          font-style: italic;
          color: gray;
          padding: 20px 10px;
          border: 1px dashed gray;
        }

        button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
        }
      `;

    // Append elements to shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(modalContainer);

    // Add event listener to OK button
    okButton.addEventListener("click", () => {
      const word = wordInput.value;
      const meaning = meaningInput.value;
      this.hideModal();
    });
  }

  connectedCallback() {
    // Show modal when component is connected to the DOM
    console.log("vocab modal created");
    // this.showModal();
  }

  hideModal() {
    this.shadowRoot.querySelector(".modal").style.display = "none";
  }
}

customElements.define("vocab-modal", ConstructVocabModal);
