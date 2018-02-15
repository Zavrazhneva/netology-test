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
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var yearsInterval = [1920, 2018];

    for (i = 1; i <= 31; i++) {
        daySelect.append('<option value="' + i + '">' + i + '</option>');
    }
    for (i = yearsInterval[0]; i <= yearsInterval[1]; i++) {
        yearSelect.append('<option value="' + i + '">' + i + '</option>');
    }
    months.forEach(function (item) {
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
    });

    // валидация формы
    $("#form").validate({
        showErrors: function () {
            return false;
        }
    });

    $('#form input,selector').on('keyup blur', function () {
        if ($('#form').valid()) {
            $('#submit').attr('disabled', false);
        } else {
            $('#submit').attr('disabled', 'disabled');
        }
    });

    //маска для номера телефона
    $(document).ready(function(){
        $('#phone').inputmask("+7 (999) 999-99-99");  //static mask
    });

    //Транслитерация имени и фамилии
    var surname = $('#surname');
    var translitSurname = $('#translitSurname');
    var name = $('#name');
    var translitName = $('#translitName');

    surname.keyup(function (e) {
        translitSurname.val(translit(e.target.value));
    });
    name.keyup(function (e) {
        translitName.val(translit(e.target.value));
    });
    function translit(string) {
        var translitMap = {
            'а': 'a',
            'б': 'b',
            'в': 'v',
            'г': 'g',
            'д': 'd',
            'е': 'e',
            'ё': 'e',
            'ж': 'zh',
            'з': 'z',
            'и': 'i',
            'й': 'j',
            'к': 'k',
            'л': 'l',
            'м': 'm',
            'н': 'n',
            'о': 'o',
            'п': 'p',
            'р': 'r',
            'с': 's',
            'т': 't',
            'у': 'u',
            'ф': 'f',
            'х': 'h',
            'ц': 'c',
            'ч': 'ch',
            'ш': 'sh',
            'щ': 'sh',
            'ъ': '',
            'ы': 'y',
            'ь': '',
            'э': 'e',
            'ю': 'yu',
            'я': 'ya'
        };

        var tmpArr = string.split('').map(function (char) {
            var isUpperCase = char !== char.toLowerCase();
            var result = translitMap[char.toLowerCase()] || char;
            if (isUpperCase){
                result = result.toUpperCase();
            }
            return result;
        });

        return tmpArr.join('');
    }
});

