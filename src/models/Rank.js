
exports.Rank = function(k, opts){

    var opts = opts || {},
        isSalt = !!opts.isSalt;

    var Rank = k.create({

        ref_date: "string",
        user_source: "string",
        msgid: "string",
        title: "string",
        int_page_read_user: "string",
        int_page_read_count: "string",
        ori_page_read_user: "string",
        ori_page_read_count: "string",
        share_user: "string",
        share_count: "string",
        add_to_fav_user: "string",
        add_to_fav_count: "string"

    }, "Rank");

    
    return Rank;
};

