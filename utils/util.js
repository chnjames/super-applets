const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getNodesForKey = (text, key) => {
  if (text.indexOf(key) < 0) {
    return [{
      name: 'span',
      attrs: {
        class: 'text',
        style: 'color: #020415;'
      },
      children: [{
        type: 'text',
        text: text
      }]
    }]
  }

  var keyNode = {
    name: 'span',
    attrs: {
      class: 'span_class',
      style: 'color: #49B8A3;'
    },
    children: [{
      type: 'text',
      text: key
    }]
  };

  var nodes = [];


  if (text.indexOf(key) > 0) {
    var leftPart = text.substring(0, text.indexOf(key));
    var leftNode = {
      name: 'span',
      attrs: {
        class: 'span_class',
        style: 'color: #020415;'
      },
      children: [{
        type: 'text',
        text: '' + leftPart
      }]
    };
    nodes[nodes.length] = leftNode;
  }

  nodes[nodes.length] = keyNode;

  if (text.indexOf(key) < text.length - 1) {
    var rightPart = text.substring(text.indexOf(key) + key.length, text.length);
    var rightNode = {
      name: 'span',
      attrs: {
        class: 'span_class',
        style: 'color: #020415;'
      },
      children: [{
        type: 'text',
        text: '' + rightPart
      }]
    };
    nodes[nodes.length] = rightNode;
  }

  return nodes;
}

const getRomdomLengthArr = (arr, length) => {
  var newArr = arr.slice(0);
  newArr.sort(function (a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  });
  return newArr.splice(0, length);
}

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

/**
 * @param     func     {Function}   实际要执行的函数
 * @param     delay    {Number}     延迟时间，单位是毫秒（ms）
 * @return    {Function}
 */

function debounce(fn, delay = 1000) {
  let timer;

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给func
    var context = this
    var args = arguments

    // 函数被调用，清除定时器
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 func
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

function formatDate(timeStamp, type = 'Y-M-D H:I:S', auto = false) {
  let time =
    (timeStamp + '').length === 10 ?
    new Date(parseInt(timeStamp) * 1000) :
    new Date(parseInt(timeStamp))
  let _year = time.getFullYear()
  let _month =
    time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  let _date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  let _hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  let _minutes =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  let _secconds =
    time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  let formatTime = ''
  let distinctTime = new Date().getTime() - time.getTime()

  if (auto) {
    if (distinctTime <= 1 * 60 * 1000) {
      // console.log('一分钟以内，以秒数计算');
      let _s = Math.floor((distinctTime / 1000) % 60)
      formatTime = _s + '秒前'
    } else if (distinctTime <= 1 * 3600 * 1000) {
      // console.log('一小时以内,以分钟计算');
      let _m = Math.floor((distinctTime / (60 * 1000)) % 60)
      formatTime = _m + '分钟前'
    } else if (distinctTime <= 24 * 3600 * 1000) {
      // console.log('一天以内，以小时计算');
      let _h = Math.floor((distinctTime / (60 * 60 * 1000)) % 24)
      formatTime = _h + '小时前'
    } else if (distinctTime <= 30 * 24 * 3600 * 1000) {
      let _d = Math.floor((distinctTime / (24 * 60 * 60 * 1000)) % 30)
      formatTime = _d + '天前'
      // console.log('30天以内,以天数计算');
    } else {
      // 30天以外只显示年月日
      formatTime = _year + '-' + _month + '-' + _date
    }
  } else {
    switch (type) {
      case 'Y-M-D H:I:S':
        formatTime =
          _year +
          '-' +
          _month +
          '-' +
          _date +
          ' ' +
          _hours +
          ':' +
          _minutes +
          ':' +
          _secconds
        break
      case 'Y-M-D H:I:S zh':
        formatTime =
          _year +
          '年' +
          _month +
          '月' +
          _date +
          '日  ' +
          _hours +
          ':' +
          _minutes +
          ':' +
          _secconds
        break
      case 'Y-M-D H:I':
        formatTime =
          _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes
        break
      case 'Y-M-D H':
        formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours
        break
      case 'Y-M-D':
        formatTime = _year + '-' + _month + '-' + _date
        break
      case 'Y-M-D zh':
        formatTime = _year + '年' + _month + '月' + _date + '日'
        break
      case 'Y-M':
        formatTime = _year + '-' + _month
        break
      case 'Y':
        formatTime = _year
        break
      case 'M':
        formatTime = _month
        break
      case 'D':
        formatTime = _date
        break
      case 'H':
        formatTime = _hours
        break
      case 'I':
        formatTime = _minutes
        break
      case 'S':
        formatTime = _secconds
        break
      default:
        formatTime =
          _year +
          '-' +
          _month +
          '-' +
          _date +
          ' ' +
          _hours +
          ':' +
          _minutes +
          ':' +
          _secconds
        break
    }
  }
  // 返回格式化的日期字符串
  return formatTime
}


module.exports = {
  formatTime: formatTime,
  getNodesForKey: getNodesForKey,
  getRomdomLengthArr: getRomdomLengthArr,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  debounce: debounce,
  formatDate: formatDate
}