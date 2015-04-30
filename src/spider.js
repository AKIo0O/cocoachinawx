
'use strict';

var co = require("co");

var k = require("kmodel").connect("mongodb://127.0.0.1:27017/cocoachinaweixin",__dirname+"/models/"), 
    Sync = require("./lib/sync"), start = require("./lib/time");

var News = k.load("News"), Rank = k.load("Rank");

// 抓取排名
var SpiderRanks = function*(){

    var ranges = start(), instance, ranks, array = [], range;

    console.log("---排名抓取开始---");

    yield Sync.token(); 

    while(ranges.length){

        range = ranges.shift();

        console.log(range)

        ranks = yield Rank.find({ref_date: range});
        if(ranks.length){
            console.log("---该天记录已存在---"+range);
            continue;
        }

        instance = yield Sync.getarticlesummary(range);
        array = array.concat(instance.list);
    }

    while(array.length){

        yield Rank.insertOne(array.shift());

    }

    console.log("---排名抓取完毕---");

};


// 同步所有图文消息
var SpiderNews = function*(){

    var index, rs, total, res, list = [];

    rs = yield News.find({});

    index = rs.length;
    total = index + 20;


    console.log("---图文抓取开始---");

    yield Sync.token(); // 获取token

    while(index < total){

        res = yield Sync.material(index);

        total = res.total_count;
        index = index + 20;

        while( res.item.length){

            var temp = res.item.shift();

            list = list.concat(temp.content["news_item"]);
        }

    }

    var instance = {}, item;

    while(list.length){  

        item = list.shift();

        instance.Url =  item.url;
        instance.Title = item.title;
        instance.PicUrl = item.thumb_media_id + ".jpg";
        instance.Description = item.content;

        yield News.insertOne(instance);

        Sync.saveFile(item.thumb_media_id);
    }

    console.log("---图文抓取完毕---");

};


function Round(){

    co(SpiderNews);
    co(SpiderRanks).catch(function(e){
        console.log(e);
    });
}

Round();

// 3个小时一回合
setInterval(Round, 3 * 60 * 60 * 1000);



