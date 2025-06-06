import {
    create_map,
    create_popup,
    pointermove,
    click,
    polygonFeatures,
    template_polygon_feature,
    defaultStyle,
    highlightStyle,
    imageWidth,
    imageHeight,
    imageExtent,
    proj,
    vectorSource,
    fill_filter,
    setup_filter,
    get_filters,
    filter_features,
    reset_filters,
    show_schedule,
    apply_filter,
    vectorLayer,
    openModal
} from '/index.js';;


// лестницы
template_polygon_feature([[[1480, 1061],[1600, 1061],[1600, 979],[1480, 979],[1480, 1061]]], 'центральная лестница', 'centralstairs1');
template_polygon_feature([[[1604, 958],[1769, 958],[1769, 1088],[1604, 1088],[1604, 958]]], 'центральная лестница', 'centralstairs2');
template_polygon_feature([[[1773, 979],[1895, 979],[1895, 1061],[1773, 1061],[1773, 979]]], 'центральная лестница', 'centralstairs3');

template_polygon_feature([[[1558, 1203],[1815, 1203],[1815, 1435],[1558, 1435],[1558, 1203]]], '701 (лекционная аудитория)', '701',
    [{ day: 'Понедельник', number: '2', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Огурцова Е.В.', lesson: 'Введение в экономическую теорию: Часть 2', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Экономический'], group: ['121', '122', '141'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Экономический'], group: ['121', '122'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '4', department: ['Экономический'], group: ['141'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '2', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Черемисинов Г.А.', lesson: 'Экономическая теория', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Гребенюк Л.В.', lesson: 'Безопасность жизнедеятельности', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Гребенюк Л.В.', lesson: 'Безопасность жизнедеятельности', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Экономический'], group: ['111'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['Экономический'], group: ['112', '113'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'знам.'},]);


const map = create_map('seventh_floor.png');

const popup = create_popup();
map.addOverlay(popup);

pointermove(map, defaultStyle, highlightStyle, popup);
click(map, get_filters, show_schedule);

fill_filter(vectorSource);

setup_filter(apply_filter);

reset_filters(apply_filter, filter_features);