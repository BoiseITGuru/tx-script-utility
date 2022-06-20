export var localEmulatorWS   = null;

/**
 * Event handler for clicking on button "Connect"
 */
export function startLocalEmulator() {
    openWSConnection("localhost", "5050");
}
/**
 * Event handler for clicking on button "Disconnect"
 */
export function stopLocalEmulator() {
    if (localEmulatorWS) {
        localEmulatorWS.close();
    }
}
/**
 * Open a new WebSocket connection using the given parameters
 */
function openWSConnection(hostname, port) {
    var webSocketURL = null;
    webSocketURL = "ws://" + hostname + ":" + port;
    try {
        localEmulatorWS = new WebSocket(webSocketURL);
        localEmulatorWS.onopen = function(openEvent) {
            console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));
        };
        localEmulatorWS.onclose = function (closeEvent) {
            console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));
        };
        localEmulatorWS.onerror = function (errorEvent) {
            console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
        };
        localEmulatorWS.onmessage = function (messageEvent) {
            var wsMsg = messageEvent.data;
            console.log("WebSocket MESSAGE: " + wsMsg);
            if (wsMsg.indexOf("error") > 0) {
                console.log("error: " + wsMsg.error)
            } else {
                console.log("message: " + wsMsg)
            }
        };
    } catch (exception) {
        console.error(exception);
    }
}
/**
 * Send a message to the WebSocket server
 */
export function sendMsgToLocalEmulator() {
    if (localEmulatorWS.readyState != WebSocket.OPEN) {
        console.error("webSocket is not open: " + localEmulatorWS.readyState);
        return;
    }
    var msg = document.getElementById("message").value;
    localEmulatorWS.send(msg);
}