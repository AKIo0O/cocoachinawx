
exports.News = function(k, opts){

    var opts = opts || {},
        isSalt = !!opts.isSalt;

    var News = k.create({

        Title: "string",
        Description: "string",
        PicUrl: "string",
        Url: "string"

    }, "News");

    
    return News;
};

