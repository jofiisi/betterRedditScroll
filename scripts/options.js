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

function notifyContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "updatedOptions"});
    });
}


toggleSwitch.addEventListener('change', async function () {
    isChecked = toggleSwitch.checked;
    await chrome.storage.sync.set({ 'toggleState': isChecked }, function () {
        console.log('Toggle state saved:', isChecked);
    });
    notifyContentScript();
});

enableSwtich.addEventListener('change', async function () {
    isEnabled = enableSwtich.checked;
    await chrome.storage.sync.set({ 'enableState': isEnabled }, function () {
        console.log('enable state saved:', isEnabled);
    });
    notifyContentScript();
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

notifyContentScript();
