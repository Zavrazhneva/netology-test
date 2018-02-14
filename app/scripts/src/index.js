$(document).ready(function () {
    var i;

    // показ инпута с прежней фамилией
    var previouslyChanged = $('#previouslyChanged');
    var hiddenBlock = $('#oldSurnameBlock');

    function onChange(e) {
        if (e.target.checked) {
            hiddenBlock.removeClass('form__attribute--hidden');
        } else {
            hiddenBlock.addClass('form__attribute--hidden');
        }
    }
    previouslyChanged.change(onChange);


    // выпадающее меню даты
    var daySelect = $('#daySelect');
    var monthSelect = $('#monthSelect');
    var yearSelect = $('#yearSelect');
    var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var yearsInterval = [1920,2018];

    for (i = 1; i <= 31; i++) {
        daySelect.append('<option value="' + i + '">' + i + '</option>');
    }

    for (i = yearsInterval[0]; i <= yearsInterval[1]; i++) {
        yearSelect.append('<option value="' + i + '">' + i + '</option>');
    }

    months.forEach(function(item){
        monthSelect.append('<option value="' + item + '">' + item + '</option>');
    });


    //проверка , что пользователю больше 90 лет

    var currentYear = (new Date()).getFullYear();
    var yearsOld = $('#bigAge');

    yearSelect.change(function (e) {
        if (currentYear - e.target.value >= 90) {
            yearsOld.show();
            $('#dateBlock').removeClass('form__date-selects--yellow');
        } else {
            yearsOld.hide();
            $('#dateBlock').addClass('form__date-selects--yellow');
        }
    })


});


//маска для номера телефона
$(function(){

    $("#phone").mask("(999) 999-9999");

    $("#phone").on("blur", function() {
        var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );

        if( last.length == 5 ) {
            var move = $(this).val().substr( $(this).val().indexOf("-") + 1, 1 );

            var lastfour = last.substr(1,4);

            var first = $(this).val().substr( 0, 9 );

            $(this).val( first + move + '-' + lastfour );
        }
    });
});




function translit(){
// Символ, на который будут заменяться все спецсимволы
        var space = '-';
// Берем значение из нужного поля и переводим в нижний регистр
    var text = document.getElementById('name').value.toLowerCase();

// Массив для транслитерации
        var transl = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
            ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
            '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
            '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space,
            ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
            '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
            '?': space, '<': space, '>': space, '№':space
        }

        var result = '';
        var curent_sim = '';

        for(i=0; i < text.length; i++) {
            // Если символ найден в массиве то меняем его
            if(transl[text[i]] != undefined) {
                if(curent_sim != transl[text[i]] || curent_sim != space){
                    result += transl[text[i]];
                    curent_sim = transl[text[i]];
                }
            }
            // Если нет, то оставляем так как есть
            else {
                result += text[i];
                curent_sim = text[i];
            }
        }

        result = TrimStr(result);

// Выводим результат
    document.getElementById('old-surname').value = result;

    }
function TrimStr(s) {
    s = s.replace(/^-/, '');
    return s.replace(/-$/, '');
}
// Выполняем транслитерацию при вводе текста в поле
$(document).ready(function(){ // после загрузки DOM
    $('#gform-jquery').submit(function(e){ // вешаем событие на отправку формы
        e.preventDefault(); // выключаем стандартное действие отправки
        var form = $(this); // запомним форму в переменной

        // добавим небольшую секцию проверки на заполненность
        var errors = false; // сначала ошибок нет
        form.find('.req').each(function(){ // пройдем по каждому полю с классом .req в форме
            $(this).removeClass('error'); // сначала уберем у него класс с ошибкой, на случай если он там есть
            if ($(this).val() == '') { // если оно пустое
                $(this).addClass('error'); // добавим к нему класс с ошибкой
                errors = true; // найдена ошибка
            }
        });
        if (errors) return false; // если есть ошибка то больше ничего не делаем

        var data = form.serialize(); // сериализуем данные формы в строку для отправки, обратите внимание что атрибуты name у полей полностью сопдают с нэймами у полей самой гугл формы

        $.ajax({ // инициализируем аякс
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfAqJatQbE-m_7dwPQPq-KnflT5yXBvoSdZP869DffZ7y4FKA/formResponse", // слать надо сюда, строку с буковками надо заменить на вашу, это атрибут action формы
            data: data, // данные  которые мы сериализовали
            type: "POST", // постом
            dataType: "xml", // ответ ждем в формате xml
            beforeSend: function(){ // перед отправкой
                form.find('button').attr('disabled'); // отключим кнопку
            },
            statusCode: { // после того как пришел ответ от сервера
                0: function (){ // это успешный случай
                    form.html('<h4>Спасибо!</h4><p>Форма отправлена блаблабла</p>'); // сунем в форму сообщение что все ок
                },
                200: function (){ // это тоже успешный случай
                    form.html('<h4>Спасибо!</h4><p>Форма отправлена блаблабла</p>'); // сунем в форму сообщение что все ок
                }
            }
        });
    });
});











