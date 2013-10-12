$(function() {
    // Подцепляем виджет VK
    VK.Widgets.Group("vk_groups", {mode: 0, width: "300", height: "400"}, 58259761);
    // Рендерим список студентов
    $("#students").append(function() {
        var temlate = '<div class="row"><div class="col-sm-3"><label for="students_search">Поиск студента:</label></div>\n\
                        <div class="col-sm-5"><input class="ui-autocomplete" id="students_search"></div></div>\n\
                        <div id="students_list" class="row">\n\
                        {{#students}}<h3>{{last_name}} {{first_name}}</h3><div id="student_{{id}}">\n\
                        <div class="col-sm-4"><img src="{{link_photo}}"/></div>\n\
                        <div class="col-sm-8"><p>{{{about}}}</p>\n\
                        <h4>Профили:</h4><ul>\n\
                        {{#link_facebook}}<li><a href="{{link_facebook}}"><i class="icon-facebook"></i> Facebook</a></li>{{/link_facebook}}\n\
                        {{#link_vk}}<li><a href="{{link_vk}}"><i class="icon-vk"></i> VK</a></li>{{/link_vk}}\n\
                        {{#link_gihub}}<li><a href="{{link_gihub}}"><i class="icon-github"></i> Github</a></li>{{/link_gihub}}\n\
                        {{#link_yaru}}<li><a href="{{link_yaru}}">ya.ru</a></li>{{/link_yaru}}\n\
                        </ul></div></div>{{/students}}</div>';
        var renderer = Mustache.compile(temlate);
        return renderer(students.prepare());
    });
    // Рендерим содержимое таблицы лекций и делаем виджет
    var $lectures = $(document.getElementById(lectures));
    $lectures.find("tbody").append(function() {
        var lecture_template = '{{#lectures}}<tr>\n\
                        <td>{{lec_date}}</td>\n\\n\
                        <td>{{topic}}</td>\n\\n\
                        <td>{{lector}}</td></tr>{{/lectures}}';
        var renderer = Mustache.compile(lecture_template);
        return renderer(lectures);
    });

    $lectures.find("table").dataTable({
        oLanguage: {
            "sProcessing": "Подождите...",
            "sLengthMenu": "Показать _MENU_ записей",
            "sZeroRecords": "Записи отсутствуют.",
            "sInfo": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "sInfoEmpty": "Записи с 0 до 0 из 0 записей",
            "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
            "sInfoPostFix": "",
            "sSearch": "Поиск:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Первая",
                "sPrevious": "Предыдущая",
                "sNext": "Следующая",
                "sLast": "Последняя"
            },
            "oAria": {
                "sSortAscending": ": активировать для сортировки столбца по возрастанию",
                "sSortDescending": ": активировать для сортировки столбцов по убыванию"
            }
        },
        "aoColumnDefs": [
            {"sType": "date", "aTargets": [0]}
        ],
        "sDom": "<'row'<'span8'l><'span8'f>r>t<'row'<'span8'i><'span8'p>>",
        "iDisplayLength": 20,
        "bLengthChange": false
    });

    var chooseTab = function(url) {
        var activeTab = 0;
        if (/^.*#students?.*$/i.test(url)) {
            activeTab = 1;
        } else if (/^.*#lectures$/i.test(url)) {
            activeTab = 2;
        }
        $("#content").tabs({active: activeTab});
    };

    var chooseAccordion = function(activeAcc) {
        if (activeAcc === null) {
            activeAcc = false;
        }
        $("#students_list").accordion({
            heightStyle: "content",
            active: activeAcc,
            collapsible: "true"
        });
    };

    $("#students_search").autocomplete({
        source: students.getAllNames(),
        change: function(event, ui) {
            if (ui.item === null) {
                chooseAccordion(null);
            } else {
                var studId = students.findIdByName(ui.item.value);
                chooseAccordion(studId);
            }
        },
        select: function(event, ui) {
            var studId = students.findIdByName(ui.item.value);
            chooseAccordion(studId);
        }
    });

    chooseTab(document.URL);
    var studId = /^.*#student_(\d+)$/i.exec(document.URL);
    if (studId !== null) {
        chooseAccordion(parseInt(studId[1]));
    } else {
        chooseAccordion(null);
    }
});