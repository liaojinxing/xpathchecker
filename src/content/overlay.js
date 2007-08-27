window.addEventListener("load", onLoad, true);

var xpathcheckerWindow
var xpathTarget
var checkedVersion = false

function onLoad() {
    var menu = document.getElementById("contentAreaContextMenu")
    menu.addEventListener("popupshowing",onPopup,false)
    return true
}

function onPopup() {
    document.getElementById("viewSelectionsXPathMenuItem").hidden = false
    return true
}

function showXPathWindow() {
    if(xpathcheckerWindow==null || xpathcheckerWindow.closed) {
        checkVersion()
        xpathTarget = gContextMenu.target
        xpathcheckerWindow =
            window.open("chrome://xpathchecker/content/window.xul", "xpathchecker", "chrome,resizable=yes");
    } else {
        xpathcheckerWindow.loadXPathForNode(gContextMenu.target)
    }

}

function checkVersion() {
    if(checkedVersion) return
    var result = /Firefox\/1\.0\.(\d+)/.exec(navigator.userAgent)
    if(result!=null && Number(result[1])<3) {
        alert("The XPathChecker extension is insecure for this version of Firefox. "+
              "Please upgrade Firefox to 1.0.3 or better.")
    }
    checkedVersion = true
}

