let isChecked = false;

const toggleSwitch = document.getElementById('toggle');

toggleSwitch.addEventListener('change', function () {
    isChecked = toggleSwitch.checked;
    chrome.storage.sync.set({ 'toggleState': isChecked }, function () {
        console.log('Toggle state saved:', isChecked);
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