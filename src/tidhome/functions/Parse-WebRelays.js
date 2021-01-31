// name: Parse web relays
// outputs: 1
var outputMsgs = []
var displayMsg = ""
timestampH = new Date().toISOString()
timestamp = new Date().getTime()

for (var i in msg.payload.relays) {
    
    relayId = msg.payload.relays[i].id
    relayDesc = msg.payload.relays[i].description
    relayValue = msg.payload.relays[i].value
    type = 'toggle'
    entry = 0
    
    var msgS = {}
    msgS.topic = 'sensors/iotheaters/nodes/' + relayId + '/entries/' + entry + '/events/' + type;
    msgS.payload = { 
        "gateway":"iotheaters",
        "id": relayId,
        "entry": entry,
        "type": type,
        "value": relayValue,
        "timestamp": timestamp,
        "timestamp-human": timestampH
    }
    displayMsg += relayDesc + "(" + relayId + ")=" + relayValue + "; "
    outputMsgs.push(msgS);
}

node.status({ fill:"blue", shape:"dot", text: displayMsg });

return [ outputMsgs ];