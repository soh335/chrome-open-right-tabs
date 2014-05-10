chrome.contextMenus.create({
    title   : "open right tabs at new window",
    type    : "normal",
    contexts: ["page"],
    onclick : function(info, tab) {
        openAtNewWindow(tab)
    }
});

function openAtNewWindow(tab) {
    chrome.tabs.query({windowId: tab.windowId}, function(tabs) {
        var tabIds = tabs.map(function(tab) {
            return tab.id;
        });
        var remainTabIds = tabIds.slice(tabIds.indexOf(tab.id)+1)
        chrome.windows.create({tabId:tab.id}, function(window) {
            if (remainTabIds.length > 0) {
                chrome.tabs.move(remainTabIds,{windowId: window.id, index:-1}, function(tabs) {
                });
            }
        });
    });
}
