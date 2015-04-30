

function calculateDays(year, month) {
    return new Date(year,month,0).getDate(); 
}

function start(){

    var now = new Date(), year, month, day, i = 8;

    nowyear  = now.getFullYear();
    nowmonth = now.getMonth()+1;
    nowday   = now.getDate();

    var days = [];

    while(i-->1){

        days.push(time(nowyear, nowmonth, nowday-i));
    }

    return days;
}

function time(year, month, day){

    var days = calculateDays(year, month);
    
    if(day == 0 || day < 0){
        days = calculateDays(year, month-1);
        day = days + day;
        return time(year, month-1, day);
    }

    if(days < day) return time(year, month+1, day - days);

    return year+"-"+("0"+month).slice(-2)+"-"+("00"+day).slice(-2);
}

module.exports = start;
