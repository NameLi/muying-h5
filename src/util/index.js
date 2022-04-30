export const debounce = (func, wait = 200) => {
  let timeout;
  return function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}


export const throttle = (cb, wait = 1000 / 60) => {
  let last = 0;
  return function () {
    var now = new Date().getTime();;
    if (now - last > wait) {
      cb.call(this);
      last = new Date().getTime();;
    }
  }
}

//  格式化时间 将秒数转为 00:00 格式
export const timeFormat = sec => {
  let min = 0;
  min = Math.floor(sec / 60);       //  分
  min < 10 && (min = '0' + min);    //  补零
  sec = Math.floor(sec % 60);       //  秒
  sec < 10 && (sec = '0' + sec);    //  补零

  return (min || '00') + ":" + sec;
}


export const dateBefore = (datatime) => {
  let dateTimeStamp = new Date(datatime).getTime()

  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let month = day * 30;
  let year = month * 12;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  let result = ""

  if (diffValue < 0) {
    return;
  }

  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let yearC = diffValue / year;

  if (yearC >= 1) {
    return "" + parseInt(yearC) + "年前";
  }
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
}

export const preventScroll = function (prevent = true) {
  if (prevent) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}