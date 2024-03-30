let isChecked;
let isEnabled;

const toggleSwitch = document.getElementById('toggle');
const enableSwtich = document.getElementById("enable");

chrome.storage.sync.get('enableState', function(data) {
    enableSwtich.checked = data.enableState;
    if (typeof data.enableState === 'undefined') {
        enableSwtich.checked = true;
        chrome.storage.sync.set({ 'enableState': true }, function () {
            console.log('enable state initialized to:', true);
        });
    }
});

toggleSwitch.addEventListener('change', function () {
    isChecked = toggleSwitch.checked;
    chrome.storage.sync.set({ 'toggleState': isChecked }, function () {
        console.log('Toggle state saved:', isChecked);
    });
});

enableSwtich.addEventListener('change', function () {
    isEnabled = enableSwtich.checked;
    chrome.storage.sync.set({ 'enableState': isEnabled }, function () {
        console.log('enable state saved:', isEnabled);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("toggleState", function (data) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            toggleSwitch.checked = data.toggleState || false;
        }
    });
});