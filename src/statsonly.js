const onlyStats = (arrayCount) => {
    let countNoRepeat = [];
    arrayCount.forEach(function (link) {
      countNoRepeat.push(link.href);
    });
  
    countNoRepeat = [...new Set(countNoRepeat)];
    let countTotal = arrayCount;
    console.log(`Total : ${countTotal.length}`);
    console.log(`Unique:${countNoRepeat.length}`);
  };
  