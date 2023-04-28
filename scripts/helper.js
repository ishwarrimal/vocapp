//This method will created a modal and add it to the DOM using web components
const constructVocabModal = (apple) => {
  console.log("This is a helper -> ", apple);
  return;
};
//   class WordMeaningModal extends HTMLElement {
//     constructor() {
//       super();

//       // Create shadow DOM
//       const shadow = this.attachShadow({mode: 'open'});

//       // Create modal container
//       const modalContainer = document.createElement('div');
//       modalContainer.setAttribute('class', 'modal');

//       // Create modal content
//       const modalContent = document.createElement('div');
//       modalContent.setAttribute('class', 'modal-content');

//       // Create word label
//       const wordLabel = document.createElement('label');
//       wordLabel.setAttribute('for', 'word');
//       wordLabel.textContent = 'Word: ';

//       // Create word input
//       const wordInput = document.createElement('input');
//       wordInput.setAttribute('id', 'word');
//       wordInput.setAttribute('type', 'text');

//       // Create meaning label
//       const meaningLabel = document.createElement('label');
//       meaningLabel.setAttribute('for', 'meaning');
//       meaningLabel.textContent = 'Meaning: ';

//       // Create meaning input
//       const meaningInput = document.createElement('input');
//       meaningInput.setAttribute('id', 'meaning');
//       meaningInput.setAttribute('type', 'text');

//       // Create OK button
//       const okButton = document.createElement('button');
//       okButton.textContent = 'OK';

//       // Append elements to modal content
//       modalContent.appendChild(wordLabel);
//       modalContent.appendChild(wordInput);
//       modalContent.appendChild(meaningLabel);
//       modalContent.appendChild(meaningInput);
//       modalContent.appendChild(okButton);

//       // Append modal content to modal container
//       modalContainer.appendChild(modalContent);

//       // Create styles
//       const style = document.createElement('style');
//       style.textContent = `
//         .modal {
//           display: none;
//           position: fixed;
//           z-index: 1;
//           left: 0;
//           top: 0;
//           width: 100%;
//           height: 100%;
//           overflow: auto;
//           background-color: rgba(0,0,0,0.4);
//         }

//         .modal-content {
//           background-color: #fefefe;
//           margin: 15% auto;
//           padding: 20px;
//           border: 1px solid #888;
//           width: 80%;
//         }

//         input[type=text] {
//           width: 100%;
//           padding: 12px 20px;
//           margin: 8px 0;
//           box-sizing: border-box;
//           border: 2px solid #ccc;
//           border-radius: 4px;
//           font-size: 16px;
//         }

//         button {
//           background-color: #4CAF50;
//           border: none;
//           color: white;
//           padding: 16px 32px;
//           text-align: center;
//           text-decoration: none;
//           display: inline-block;
//           font-size: 16px;
//           margin: 4px 2px;
//           cursor: pointer;
//           border-radius: 4px;
//         }
//       `;

//       // Append elements to shadow DOM
//       shadow.appendChild(style);
//       shadow.appendChild(modalContainer);

//       // Add event listener to OK button
//       okButton.addEventListener('click', () => {
//         const word = wordInput.value;
//         const meaning = meaningInput.value;
//         console.log(`Word: ${word}, Meaning: ${meaning}`);
//         this.hideModal();
//       });
//     }

//     connectedCallback() {
//       // Show modal when component is connected to the DOM
//       this.showModal();
//     }

//     showModal() {
//       // Show modal
//       const modal = this.shadowRoot.querySelector('.modal');
//       modal.style.display = 'block';
//     }

//     hideModal() {

// }
//   }
