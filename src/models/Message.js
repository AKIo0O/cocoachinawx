
exports.Message = function(k, opts){

    var opts = opts || {},
        isSalt = !!opts.isSalt;

    var Message = k.create({

        openid: "string",

        host: "string",

        Event: "string",

        EventKey: "string",
        
        msg: "object"



    }, "Message");

    
    return Message;
};

