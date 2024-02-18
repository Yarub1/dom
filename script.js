const ELEMENT_NOT_FOUND_MESSAGE = "Element not found.";
let mouseMoveConsole = ""; // To store the results of the mousemove function
let mouseWheelConsole = ""; // To store the results of the wheel function
let selectedElement = null;
let keylogger = ""; // Variable to store keylogger results

// Function to safely access DOM elements by ID
function getElementById(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(ELEMENT_NOT_FOUND_MESSAGE);
  }
  return element;
}

// Function to update console log and draw tree
function updateConsoleLog(resultType) {
  const consoleTextArea = getElementById("console");
  if (resultType === "mousemove") {
    consoleTextArea.value += mouseMoveConsole;
  } else if (resultType === "wheel") {
    consoleTextArea.value += mouseWheelConsole;
  }
  updatePage();
}

// Function to draw the element tree
function drawElementTree(element, isChild = false) {
  let result = "";
  const color = isChild ? "blue" : "green";

  result += `<span style="color: ${color};">- ${element.nodeName.toLowerCase()}</span><br>`;
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    result += drawElementTree(children[i], true);
  }
  return result;
}

// Function to draw the tree structure
function drawTree() {
  const resultDiv = getElementById("result");
  resultDiv.innerHTML = "Tree Structure:<br>" + drawElementTree(document.body);
}

// Function to update the page
function updatePage() {
  drawTree();
}

// Function to select an element by ID
function selectElementById() {
  try {
    const selectedId = getElementById("elementIdInput").value;
    const element = getElementById(selectedId);
    selectedElement = element;
    getElementById(
      "console"
    ).value += `Selected Element: ${element.outerHTML}\n`;
  } catch (error) {
    getElementById("console").value += error.message + "\n";
  }
}

// Function to change element style
function changeElementStyle() {
  const style = getElementById("styleInput").value;

  if (selectedElement && style) {
    selectedElement.style.cssText = style;
    getElementById("console").value += `Style changed to: ${style}\n`;
  } else {
    getElementById("console").value +=
      "No element selected or no style provided\n";
  }
}

// Function to remove an element
function removeElement() {
  if (selectedElement) {
    selectedElement.remove();
    getElementById("console").value += "Selected element removed\n";
    selectedElement = null;
    updatePage();
  } else {
    getElementById("console").value += "No element selected\n";
  }
}

// Function to create a new element
function createElement() {
  const elementType = getElementById("elementTypeInput").value || "div";
  const newElement = document.createElement(elementType);
  newElement.textContent = "Newly created element";
  document.body.appendChild(newElement);
  getElementById("console").value +=
    "New element created: " + elementType + "\n";
  updatePage();
}

// Add keydown event listener
document.addEventListener("keydown", function (event) {
  const consoleTextArea = getElementById("console");
  const currentText = consoleTextArea.value;

  // Add the character to the console
  consoleTextArea.value = currentText + event.key;

  // If the character count exceeds 3, change the background color
  if (consoleTextArea.value.length > 3) {
    document.body.style.backgroundColor = "lightcoral";

    // Show a popup message
    showPopupMessage("Saved and sent");
  }

  // When the Enter key is pressed
  if (event.key === "Enter") {
    // Show a popup message
    showPopupMessage("Saved and sent");
  }

  // Log key press to keylogger
  keylogger += event.key;
});

// Add mousemove event listener
document.addEventListener("mousemove", function (event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  if (mouseX > 300 && mouseY > 200) {
    document.body.style.backgroundColor = "lightblue";
  } else {
    // If the mouse is not at the specified point, reset the background color to default
    document.body.style.backgroundColor = "";
  }

  mouseMoveConsole = `Mouse moved at (${mouseX}, ${mouseY})\n`; // Update the value
  // Update the textarea in the UI
  getElementById("mouseMoveResults").value = mouseMoveConsole;
});

// Add mousewheel event listener (for scrolling down)
document.addEventListener("wheel", function (event) {
  if (event.deltaY > 0) {
    // When the mouse scrolls down
    mouseWheelConsole = "Scrolled down!\n"; // Update the value
    // Update the textarea in the UI
    getElementById("mouseWheelResults").value = mouseWheelConsole;
  }
});

// Function to show a popup message
function showPopupMessage(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = message;

  document.body.appendChild(popup);

  // Set a timeout to remove the popup after a few seconds
  setTimeout(function () {
    popup.remove();
  }, 3000); // Remove after 3 seconds
}

// Initialize the tool
function initializeTool() {
  // Add event listeners and update page
  addEventListeners();
  updatePage();
}

// Call the initialize function when the document is ready
document.addEventListener("DOMContentLoaded", initializeTool);

// Function to show a bottom message
function showBottomMessage(message) {
  const bottomMessage = document.createElement("div");
  bottomMessage.className = "bottom-message";
  bottomMessage.innerText = message;

  document.body.appendChild(bottomMessage);

  // Set a timeout to remove the bottom message after a few seconds
  setTimeout(function () {
    bottomMessage.remove();
  }, 5000); // Remove after 5 seconds
}

// Function to show a large popup message
function showLargeMessage(message) {
  const popup = document.createElement("div");
  popup.className = "large-popup";
  popup.innerText = message;

  document.body.appendChild(popup);

  // Set a timeout to remove the popup after a few seconds
  setTimeout(function () {
    popup.remove();
  }, 5000); // Remove after 5 seconds
}

// Function to display a notification on mouse click
document.addEventListener("click", function () {
  showPopupMessage("Mouse click detected!");
});

// Display keylogger content in the console
function showKeyloggerContent() {
  getElementById("console").value += "Keylogger Content: " + keylogger + "\n";
}

// Function to clear the keylogger content
function clearKeyloggerContent() {
  keylogger = "";
  getElementById("console").value += "Keylogger content cleared.\n";
}
