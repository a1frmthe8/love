let noClicks = 0; // Start at 0 to align with array indices
const maxNoClicks = 5; // Matches the number of buttonMessages
const maxYesSize = 300;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const minNoScale = 0.5; // Define a minimum scale value
const gifElement = document.getElementById("spider-man-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".bt-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth) || 300; // Fallback value

const gifs = [
    "assets/images/spider-man-love.gif",
    "assets/images/spider-man-sad1.gif",
    "assets/images/spider-man-sad2.gif",
    "assets/images/spider-man-sad3.gif",
    "assets/images/spider-man-sad4.gif",
    "assets/images/spider-man-sad5.gif",
    "assets/images/spider-man-sad6.gif"
];

const buttonMessages = [
    "Are you sure???",
    "Love please",
    "Baby please!!",
    "I beg you!!!",
    "PLEASE!!!!!"
];

noButton.addEventListener("click", () => {
    // Update the GIF and button text independently of the yesButton scaling logic
    gifElement.src = gifs[noClicks % gifs.length]; // Cycle through the GIFs array
    noButton.textContent = buttonMessages[noClicks % buttonMessages.length]; // Cycle through the messages array

    // Adjust button width to fit text
    noButton.style.width = "auto";
    noButton.style.width = `${noButton.scrollWidth}px`;

    // Decrease the size of the no button
    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // Increment the number of clicks
    noClicks++;

    // Reset noClicks if it exceeds maxNoClicks
    if (noClicks >= maxNoClicks) {
        noClicks = 0; // Reset to cycle through the arrays again
    }

    // Handle yesButton scaling logic separately
    const baseWidth = parseFloat(yesButtonStyle.width) || 100; // Fallback value
    const scaledWidth = baseWidth * yesScale;

    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5; // Increment scale by a smaller step
        yesButton.style.transform = `scale(${yesScale})`;

        // Get the current gap scale factor from CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor =
            parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        // Adjust the gap dynamically
        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor);
        buttonContainer.style.gap = `${newGap}px`;
    }
});