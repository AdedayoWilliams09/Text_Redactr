document.addEventListener("DOMContentLoaded", function () {
  const textArea = document.getElementById("textArea");
  const redactWords = document.getElementById("redactWords");
  const replacementInput = document.getElementById("replacement");
  const redactButton = document.getElementById("redactButton");
  const redactedText = document.getElementById("redactedText");
  const statistics = document.getElementById("statistics");

  let originalText = "";
  let redacted = "";
  let wordsToRedact = [];
  let replacement = "****";

  redactButton.addEventListener("click", function () {
    originalText = textArea.value;
    wordsToRedact = redactWords.value.split(" ");
    replacement = replacementInput.value || "****";

    const startTime = performance.now();

    redacted = redactText(originalText, wordsToRedact, replacement);

    const endTime = performance.now();

    redactedText.textContent = "Redacted Text: \n" + redacted;

    const stats = getStatistics(
      originalText,
      wordsToRedact,
      redacted,
      endTime - startTime
    );
    statistics.innerHTML =
      "Statistics: <br>" +
      "Words Scanned: " +
      stats.totalWordsScanned +
      "<br>" +
      "Words Redacted: " +
      stats.totalWordsRedacted +
      "<br>" +
      "Characters Redacted: " +
      stats.totalCharactersRedacted +
      "<br>" +
      "Time Taken: " +
      stats.timeTaken.toFixed(2) +
      " milliseconds";
  });

  function redactText(text, wordsToRedact, replacement) {
    for (const word of wordsToRedact) {
      const regex = new RegExp(word, "gi");
      text = text.replace(regex, replacement);
    }
    return text;
  }

  function getStatistics(originalText, wordsToRedact, redactedText, timeTaken) {
    const totalWordsScanned = originalText.split(/\s+/).length;
    const totalWordsRedacted = wordsToRedact.length;
    const totalCharactersRedacted = totalWordsRedacted * replacement.length;
    return {
      totalWordsScanned,
      totalWordsRedacted,
      totalCharactersRedacted,
      timeTaken,
    };
  }
});
