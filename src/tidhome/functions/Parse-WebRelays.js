// name: Parse web relays
// outputs: 1
var outputMsgs = []
var displayMsg = ""
timestampH = new Date().toISOString()
timestamp = new Date().getTime()

for (var i in msg.payload) {
    type = 'toggle'
    nodeid = msg.payload[i].switch
    entry = 0
    value = msg.payload[i].value
    
    var msgS = {}
    msgS.topic = 'sensors/iotheaters/nodes/' + nodeid + '/entries/' + entry + '/events/' + type;
    msgS.payload = { 
        "gateway":"iotheaters",
        "id": nodeid,
        "entry": entry,
        "type": type,
        "value": value,
        "timestamp": timestamp,
        "timestamp-human": timestampH
    }
    displayMsg += msg.payload[i].description + "(" + msg.payload[i].switch + ")=" + msg.payload[i].value + "; "
    outputMsgs.push(msgS);
}

node.status({ fill:"blue", shape:"dot", text: displayMsg });

return [ outputMsgs ];