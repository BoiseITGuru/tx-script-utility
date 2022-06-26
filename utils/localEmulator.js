export var localEmulatorWS = null;

/**
 * Event handler for clicking on button "Connect"
 */
export function startLocalEmulator(callback) {
    openWSConnection("localhost", "5050", callback);
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
function openWSConnection(hostname, port, callback) {
    var webSocketURL = null;
    webSocketURL = "ws://" + hostname + ":" + port;
    try {
        localEmulatorWS = new WebSocket(webSocketURL);
        localEmulatorWS.onopen = function(openEvent) {
            console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));
        };
        localEmulatorWS.onclose = function (closeEvent) {
            callback("testnet")
            console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));
        };
        localEmulatorWS.onerror = function (errorEvent) {
            console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
        };
        localEmulatorWS.onmessage = function (messageEvent) {
            var wsMsg = messageEvent.data
            const wsMsgJSON = JSON.parse(wsMsg);

            responseType: switch (wsMsgJSON.responseType) {
                case "emulator-status":
                    emulatorStatus: switch (wsMsgJSON.data) {
                        case "started":
                            callback("emulator")
                            break emulatorStatus;
                        case "stopped":
                            callback("testnet")
                            break emulatorStatus;
                    }
                    break responseType;
                // case "emulator-output":
                //     console.log("JSON.stringify(wsMsgJSON.data.msg)");
                //     break responseType;
                default:
                    break responseType;
            }

            console.log(wsMsgJSON);
        };
    } catch (exception) {
        console.error(exception);
    }
}

/**
 * Send a message to the WebSocket server
 */
export function sendMsgToLocalEmulator(msg) {
    if (localEmulatorWS.readyState != WebSocket.OPEN) {
        console.error("webSocket is not open: " + localEmulatorWS.readyState);
        return;
    }

    localEmulatorWS.send(msg);
}

function waitFor(condition) {

    const poll = resolve => {
        if(condition) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}