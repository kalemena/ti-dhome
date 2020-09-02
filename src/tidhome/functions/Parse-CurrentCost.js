// name: Parse CurrentCost
// outputs: 1
var outputMsgs = []
timestampH = new Date().toISOString()
timestamp = new Date().getTime()

// temperature
if(msg.payload.msg.tmpr != undefined && msg.payload.msg.sensor[0] == '1') {
    // sensors/iotpower/nodes/1/entries/1/events/temperature
    type = 'temperature'
    nodeid = 1 // Bureau
    entry = 1
    value = msg.payload.msg.tmpr[0]
    
    var msgT = {}
    msgT.topic = 'sensors/iotpower/nodes/' + nodeid + '/entries/' + entry + '/events/' + type;
    msgT.payload = { 
        "gateway":"iotpower",
        "id": nodeid,
        "entry": entry,
        "type": type,
        "value": parseFloat(value),
        "timestamp": timestamp,
        "timestamp-human": timestampH
    }
    displayMsg = msgT.payload.id + "/" + msgT.payload.type + "=" + msgT.payload.value
    node.status({ fill:"orange", shape:"dot", text: displayMsg });
    outputMsgs.push(msgT);
    // node.warn("CC event temp:\n" + JSON.stringify(msgT))
}

// Live power
if(msg.payload.msg.sensor != undefined && msg.payload.msg.sensor[0] != undefined) {
    // sensors/iotpower/nodes/.../entries/0/events/watts
    type = 'watts'
    nodeid = parseInt(msg.payload.msg.sensor[0])
    entry = 0
    value = msg.payload.msg.ch1[0].watts[0]
    
    var msgP = {}
    msgP.topic = 'sensors/iotpower/nodes/' + nodeid + '/entries/' + entry + '/events/' + type;
    msgP.payload = { 
        "gateway":"iotpower",
        "id": nodeid,
        "entry": entry,
        "type": type,
        "value": parseFloat(value),
        "timestamp": timestamp,
        "timestamp-human": timestampH
    }
    displayMsg = msgP.payload.id + "/" + msgP.payload.type + "=" + msgP.payload.value
    node.status({ fill:"blue", shape:"dot", text: displayMsg });
    outputMsgs.push(msgP);
    // node.warn("CC event:\n" + JSON.stringify(msg))
}

/*
// History power
for (var i in msg.payload.msg.hist[0].data) {
    var chunk = msg.payload.msg.hist[0].data[i];
    var chunkClean = {};
    for (var j in chunk) {
        chunkClean[j] = chunk[j][0];
    }
    var topic = 'sensors/03967/entries/' + chunk.sensor[0] + '/history/power';
    outputMsgs.push( { topic:topic, payload: chunkClean });
}
*/

return [ outputMsgs ];