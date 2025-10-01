import languages from './languages.js';

const textToTranslate = document.querySelector("#text");

const translateResult = document.querySelector("#output");

const fromLanguage = document.querySelector("#from-lang");

const toLanguage = document.querySelector("#to-lang");

const translateBtn = document.querySelector(".done");

const copyBtn = document.querySelector(".copy");


// Helper to populate a select element
function populateSelect(selectElement, languagesObj) {
    // selectElement.innerHTML = ""; // Clear existing options
    for (const [code, name] of Object.entries(languagesObj)) {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = name;
        selectElement.appendChild(option);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Populate both selects
    populateSelect(fromLanguage, languages);
    populateSelect(toLanguage, languages);
    toLanguage.value = 'en';
})

const translateText = async () => {
    const text = textToTranslate.value;
    const fromLang = fromLanguage.value;
    const toLang = toLanguage.value;
    if (!text) {
        alert(`No text available for translation!`);
        return console.warn(`No text found!`);
    }
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
        const res = await fetch(url);
        const jsonRes = await res.json();
        translateResult.value = jsonRes.responseData.translatedText;
        copyBtn.classList.remove("none");
        console.warn(jsonRes);
    } catch (error) {
        alert(`An error occurred while translating the text. Please try again later.`);
        console.error(error);
        return translateResult.value = navigator.onLine ? `An error occurred while translating the text. Please try again later.` : `You appear to be offline. Please check your internet connection and try again.`;
    }
}

copyBtn.addEventListener("click", (e) => {
    navigator.clipboard.writeText(translateResult.value);
    return alert(`Translated text copied to clipboard!`);
})

translateBtn.addEventListener("click", async (e) => {
    copyBtn.classList.add("none");
    return await translateText();
})