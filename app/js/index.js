window.onload = function() {

    let dataBase;
    var xhr = new XMLHttpRequest();

    // настройка объекта запроса с указание метода отправи запроса и данных
    xhr.open("GET", "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dataBase = JSON.parse(xhr.responseText);
        }
    }

    xhr.send();
    setTimeout(() => {
        var showPercent = {
            baseCurrency: dataBase.changes,
            hour: dataBase.changes.percent.hour,
            day: dataBase.changes.percent.day,
            week: dataBase.changes.percent.week,
            month: dataBase.changes.percent.month
        }
        var showPrice = {
            currentPrice: dataBase.ask,
            baseCurrency: dataBase.changes,
            hour: dataBase.changes.price.hour,
            day: dataBase.changes.price.day,
            week: dataBase.changes.price.week,
            month: dataBase.changes.price.month
        }

        currPrice(showPrice, 1, '$');

        function currPrice(obj, coef, sign) {
          document.querySelector('.start__card-hour').innerHTML = (obj.hour * coef).toFixed(2) + `<span>${sign}</span>`;
          document.querySelector('.start__card-day').innerHTML = (obj.day * coef).toFixed(2) + `${sign}`;
          document.querySelector('.start__card-week').innerHTML = (obj.week * coef).toFixed(2) + `${sign}`;
          document.querySelector('.start__card-month').innerHTML = (obj.month * coef).toFixed(2) + `${sign}`;
          document.querySelector('.start__price-num').innerHTML = `${sign}` + (showPrice.currentPrice * coef).toFixed(2);
        }

        function currPercent(obj, sign) {
          document.querySelector('.start__card-hour').innerHTML = (obj.hour).toFixed(2) + `<span>${sign}</span>`;
          document.querySelector('.start__card-day').innerHTML = (obj.day).toFixed(2) + `${sign}`;
          document.querySelector('.start__card-week').innerHTML = (obj.week).toFixed(2) + `${sign}`;
          document.querySelector('.start__card-month').innerHTML = (obj.month).toFixed(2) + `${sign}`;
        }

        let selectTag = document.querySelector('#exampleFormControlSelect1');
        let curData = document.querySelector('.start__card-1');
        let price = document.querySelector('.start__price-num');

        // Изменение состояния <select>
        selectTag.onchange = function(e) {
          if (e.target.value == 'usd') {
            currPrice(showPrice, 1, '$');
            curData = 'usd';
            console.log(curData);
          }
          if (e.target.value == 'eur') {
            currPrice(showPrice, 0.87, '€');
            curData = 'eur';
          }
          if (e.target.value == 'rub') {
            currPrice(showPrice, 66.24, '₽');
            curData = 'rub';
          }
          if (e.target.value == 'gbp') {
            currPrice(showPrice, 0.76, '£');
            curData = 'gbp';
          }
        }

        // Переключатель percent
        let toggleCheck = document.querySelector('#toggle-one');
        toggleCheck.onchange = function() {
          if (toggleCheck.checked) {
            currPercent(showPercent, '%');
          }
          else if (curData == 'eur'){
            currPrice(showPrice, 0.87, '€');
          }
          else if (curData == 'rub'){
            currPrice(showPrice, 66.24, '₽');
          }
          else if (curData == 'gbp'){
            currPrice(showPrice, 0.76, '£');
          } else {
            currPrice(showPrice, 1, '$');
          }
        }

        // добавляет класс, если значение меньше 0
        let card = document.querySelectorAll('.start__card-num');
        for (var i = 0; i < card.length; i++) {
          if (parseInt(card[i].innerHTML) < 0) {
            card[i].classList.add('start__card-negative');
          }
        }

    }, 1000);
}
