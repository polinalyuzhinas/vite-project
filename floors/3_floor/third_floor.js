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
template_polygon_feature([[[1479, 1027],[1600, 1027],[1600, 944],[1479, 944],[1479, 1027]]], 'центральная лестница', 'centralstairs1');
template_polygon_feature([[[1604, 1001],[1769, 1001],[1769, 873],[1604, 873],[1604, 1001]]], 'центральная лестница', 'centralstairs2');
template_polygon_feature([[[1772, 1027],[1892, 1027],[1892, 944],[1772, 944],[1772, 1027]]], 'центральная лестница', 'centralstairs3');
template_polygon_feature([[[2494, 1088],[2637, 1088],[2637, 947],[2494, 947],[2494, 1088]]], 'лестница', 'rightstairs');
template_polygon_feature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_polygon_feature([[[737, 1079],[876, 1079],[876, 940],[737, 940],[737, 1079]]], 'лестница', 'leftstairs');
template_polygon_feature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_polygon_feature([[[62, 1466],[134, 1466],[134, 1395],[62, 1395],[62, 1466]]], 'лестница', 'farleftstairs2');
template_polygon_feature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');
template_polygon_feature([[[1928, 1382],[2043, 1382],[2043, 1292],[1928, 1292],[1928, 1382]]], 'лестница к спортзалу', 'gymstairs');

// лифты
template_polygon_feature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_polygon_feature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_polygon_feature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_polygon_feature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_polygon_feature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет мужской', 'toilet1');
template_polygon_feature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет женский', 'toilet2');

// аудитории левого крыла
template_polygon_feature([[[178, 1949], [686, 1949], [686, 1551], [178, 1551], [178, 1949]]], '310 (лекционная аудитория им. А. М. Богомолова)', '310',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['331', '311'], teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['221', '241'], teacher: 'Кудрина Е.В.', lesson: 'Структуры данных и алгоритмы', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['111', '151'], teacher: 'Грецова А.П.', lesson: 'Введение в специальность', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['111', '151'], teacher: 'Грецова А.П.', lesson: 'Введение в специальность', type: 'лек.', parity: 'знам.'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Иванова А.С.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['КНиИТ'], group: ['531'], teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['321'], teacher: 'Тимофеева Н.Е.', lesson: 'Огранизация ЭВМ и систем', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['311', '351', '341'], teacher: 'Голубева С.С.', lesson: 'Бюджетирование и финансовое планирование ИТ-проектов (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Голубева С.С.', lesson: 'Бюджетирование и финансовое планирование ИТ-проектов (цифровая кафедра)', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['341'], teacher: 'Голубева С.С.', lesson: 'Бюджетирование и финансовое планирование ИТ-проектов (цифровая кафедра)', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['221', '241'], teacher: 'Сергеева Н.В.', lesson: 'Теория вероятностей, математическая статистика и случайные процессы', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['221'], teacher: 'Федорова А.Г.', lesson: 'Машинно-зависимые языки программирования', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['111', '151'], teacher: 'Крючкова А.А.', lesson: 'Современные информационные технологии', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['111', '151'], teacher: 'Иванова А.С.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ', 'ФМиЕНД'], group: ['121', '141', '181', '121'], teacher: 'Исайкина М.А.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['111', '151', '181'], teacher: 'Бредихин Д.А.', lesson: 'Алгебра и геометрия', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['481'], teacher: 'Петров Д.Ю.', lesson: 'Имитационное моделирование систем', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['531'], teacher: 'Новиков В.Е.', lesson: 'Введение в криптоанализ', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['321', '341', '381'], teacher: 'Батраева И.А.', lesson: 'Базы данных', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['КНиИТ', 'ФМиЕНД'], group: ['171', '173', '120'], teacher: 'Кудрина Е.В.', lesson: 'Методика преподавания компьютерных наук', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['КНиИТ'], group: ['341'], teacher: 'Фрумина С.М.', lesson: 'Технология разработки программного обеспечения', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: ['КНиИТ'], group: ['421', '441'], teacher: 'Синельников Е.А.', lesson: 'Системы реального времени', type: 'лек.', parity: '-' }]);

template_polygon_feature([[[318, 1546],[492, 1546],[492, 1429],[318, 1429],[318, 1546]]], '309', '309');

template_polygon_feature([[[239, 1409], [306, 1409], [306, 1325], [239, 1325], [239, 1409]]], '300 (компьютерный класс, <br> находится между 3 и 4 этажами)', '300',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['ФМиЕНД'], group: ['421'], teacher: 'Векслер В.А.', lesson: 'Преподавание робототехники в образовательной организации (с 21.02)', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['331', '311', '321', '341', '351', '381', '321', '311', '312', '321', '322', '341'], teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['КНиИТ'], group: ['132'], teacher: 'Грищенко А.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['КНиИТ'], group: ['173'], teacher: 'Андрейченко Д.К.', lesson: 'НИР', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '6', department: ['КНиИТ'], group: ['531'], teacher: 'Ионов К.И.', lesson: 'Java программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Уколова М.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['331'], teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['531'], teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['381'], teacher: 'Сафрончик М.И.', lesson: 'Базы данных', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['КНиИТ'], group: ['531'], teacher: 'Ионов К.И.', lesson: 'Java программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['КНиИТ'], group: ['171'], teacher: 'Тананко И.Е.', lesson: 'Методы оптимизации 1 гр. Сети ЭВМ', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['331'], teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['ФМиЕНД'], group: ['321'], teacher: 'Старко Е.С.', lesson: 'Основы научной и проектной деятельности в организации общего образования', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '7', department: ['КНиИТ'], group: ['171'], teacher: 'Вешнева И.В.', lesson: 'Технологии построения микропроцессорной техники 2 гр. Анализ и синтез', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['311'], teacher: 'Соловьёв В.М.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['351'], teacher: 'Соловьёв В.М.', lesson: 'НИР', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['531'], teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта 2 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['421'], teacher: 'Станкевич Е.П.', lesson: 'Моделирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['441'], teacher: 'Соловьёв В.М.', lesson: 'Администрирование информационных систем 1 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['531'], teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта 1 гр.', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '1', department: ['КНиИТ'], group: ['351'], teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['121'], teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['311'], teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['481'], teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '5', department: ['КНиИТ'], group: ['481'], teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '6', department: ['КНиИТ'], group: ['171'], teacher: 'Кирьяшкин В.В.', lesson: 'Современные операционные системы', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: ['КНиИТ'], group: ['411'], teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['КНиИТ'], group: ['411'], teacher: 'Филиппов Б.А.', lesson: 'Программные решения математических задач', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: ['КНиИТ'], group: ['451'], teacher: 'Филиппов Б.А.', lesson: 'Программные решения математических задач', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: ['КНиИТ'], group: ['191', '192', '291', '292', '392', '393', '394', '492', '494'], teacher: '-', lesson: 'Самостоятельная работа аспирантов', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '5', department: ['КНиИТ'], group: ['451'], teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' }]);

template_polygon_feature([[[178, 1320], [475, 1320], [475, 950], [178, 950], [178, 1320]]], '308 (кафедры информатики и программирования, математической <br> кибернетики и компьютерных наук)', '308',
    [{ day: 'Вторник', number: '6', department: ['КНиИТ'], group: ['192'], teacher: 'Романов В.А.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' },
     { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['392'], teacher: 'Богомолов А.С.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_polygon_feature([[[178, 947], [475, 947], [475, 830], [178, 830], [178, 947]]], '307 (заместитель по заочному отделению факультет КНиИТ)', '307');

template_polygon_feature([[[178, 828], [475, 828], [475, 602], [178, 602], [178, 828]]], '306 (кафедра дискретной математики и информационных технологий)', '306',
    [{ day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['392'], teacher: 'Тяпаев Л.Б.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_polygon_feature([[[178, 600], [632, 600], [632, 373], [510, 373], [510, 250], [178, 250], [178, 600]]], '305 (деканат факультета КНиИТ)', '305',
    [{ day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['392'], teacher: 'Миронов С.В.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_polygon_feature([[[886, 1097], [1073, 1097], [1073, 778], [886, 778], [886, 1097]]], '312', '312',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Чумакова А.Ю.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['132'], teacher: 'Ушаков И.В.', lesson: 'Алгебра', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['131'], teacher: 'Ушаков И.В.', lesson: 'Алгебра', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['273'], teacher: '-', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Понедельник', number: '4', department: ['ФМиЕНД'], group: ['221'], teacher: 'Грецова А.П.', lesson: 'Структура данных и алгоритмы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ'], group: ['381'], teacher: 'Сергеева Н.В.', lesson: 'Исследование операций', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['381'], teacher: 'Сергеева Н.В.', lesson: 'Исследование операций', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['481'], teacher: 'Тананко И.Е.', lesson: 'Методы и средства измерения систем', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['273'], teacher: 'Власов А.А.', lesson: 'Технология распределенной обработки данных', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: ['КНиИТ'], group: ['273'], teacher: 'Власов А.А.', lesson: 'Технология распределенной обработки данных', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '7', department: ['КНиИТ'], group: ['273'], teacher: 'Власов А.А.', lesson: 'Технология распределенной обработки данных', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: ['ФМиЕНД'], group: ['221'], teacher: 'Старко Е.С.', lesson: 'Обучение детей и подростков с особыми образовательными потребностями', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['431'], teacher: 'Богомолов А.С.', lesson: 'Теория автоматов 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['431'], teacher: 'Богомолов А.С.', lesson: 'Теория автоматов 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '6', department: ['КНиИТ'], group: ['441'], teacher: 'Власов А.А.', lesson: 'Разработка web-приложений', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '1', department: ['КНиИТ', 'ФМиЕНД'], group: ['221', '241', '221'], teacher: 'Уколова М.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ', 'ФМиЕНД'], group: ['121', '141', '181', '121'], teacher: 'Карпец Е.В.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['251'], teacher: 'Папшев С.В.', lesson: 'Формальные языки и грамматики', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['341'], teacher: 'Огнева М.В.', lesson: 'НИР', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '4', department: ['ФМиЕНД'], group: ['121'], teacher: 'Калистратов П.Ю.', lesson: 'Психология', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['ФМиЕНД'], group: ['121'], teacher: 'Калистратов П.Ю.', lesson: 'Психология', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '2', department: ['ФМиЕНД'], group: ['121'], teacher: 'Зорин А.Н.', lesson: 'Основы культуры чтения', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '2', department: ['ФМиЕНД'], group: ['121'], teacher: 'Зорин А.Н.', lesson: 'Основы культуры чтения', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['211'], teacher: 'Чернышова Г.Ю.', lesson: 'Дифференциальные уравнения', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['381'], teacher: 'Постнова О.С.', lesson: 'Математические методы теории управления', type: 'лек.', parity: '-' }]);

template_polygon_feature([[[1076, 1097], [1244, 1097], [1244, 778], [1076, 778], [1076, 1097]]], '313', '313',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['ФМиЕНД'], group: ['120'], teacher: 'Вешнева И.В.', lesson: 'Методические системы обучения информатике', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['421'], teacher: 'Белоконь М.В.', lesson: 'Распределение базы данных', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ', 'ФМиЕНД'], group: ['121','141', '181', '121'], teacher: 'Карпец Е.В.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ', 'ФМиЕНД'], group: ['221', '241', '221'], teacher: 'Уколова М.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['211'], teacher: 'Агафонова Н.Ю.', lesson: 'Теория вероятностей и математичсекая статистика', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['251'], teacher: 'Агафонова Н.Ю.', lesson: 'Теория вероятностей и математичсекая статистика', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['481'], teacher: 'Иванов А.С.', lesson: 'Интеллектуальные технологии и представление знаний', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '6', department: ['КНиИТ'], group: ['171'], teacher: 'Тананко И.Е.', lesson: 'Методы оптимизации1 гр. Сети ЭВМ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['431'], teacher: 'Богомолов А.С.', lesson: 'Теория автоматов', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['381'], teacher: 'Рогачко Е.С.', lesson: 'Анализ стохастических систем', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['173'], teacher: 'Уколова М.В.', lesson: 'Деловой иностранный язык', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['173'], teacher: 'Кальянов Л.В.', lesson: 'Инновационный менеджмент', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['173'], teacher: 'Уколова М.В.', lesson: 'Деловой иностранный язык', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['173'], teacher: 'Кальянов Л.В.', lesson: 'Инновационный менеджмент', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '6', department: ['КНиИТ'], group: ['293'], teacher: 'Молчанов В.А.', lesson: 'Теоретическая информатика, кибернетика', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '6', department: ['КНиИТ'], group: ['171'], teacher: 'Вешнева И.В.', lesson: 'Технологии построения микропроцессорной техники 2 гр. Анализ и синтез', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['431'], teacher: 'Жаркова А.В.', lesson: 'Методы и средства криптографической защиты информации', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['531'], teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['421'], teacher: 'Дмитриев П.О.', lesson: 'Системы и сети передачи информации', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['431'], teacher: 'Гераськин А.С.', lesson: 'Основы построения защищенных баз данных', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['421'], teacher: 'Жаркова А.В.', lesson: 'Введение в криптографию', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['241'], teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных', type: 'лек.', parity: '-' }]);

template_polygon_feature([[[1247, 1097], [1458, 1097], [1458, 778], [1247, 778], [1247, 1097]]], '314 (лаборатория компьютерной безопасности)', '314',
    [{ day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['331'], teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ'], group: ['331'], teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['ФМиЕНД'], group: ['121'], teacher: 'Голубь А.В.', lesson: 'Высшая математика', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['481'], teacher: 'Гортинский А.В.', lesson: 'Программно-аппаратные средства обеспечения информационной безопасности 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['531'], teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['331'], teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['431'], teacher: 'Кондратова Ю.Н.', lesson: 'Технологии программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['431'], teacher: 'Гортинский А.В.', lesson: 'Защита программ и данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '6', department: ['КНиИТ'], group: ['431'], teacher: 'Гортинский А.В.', lesson: 'Защита программ и данных 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['241'], teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['431'], teacher: 'Жаркова А.В.', lesson: 'Методы и средства криптографической защиты информации 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['331'], teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['531'], teacher: 'Гортинский А.В.', lesson: 'Программно-аппаратные средства обеспечения информационной безопасности 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '1', department: ['КНиИТ'], group: ['431'], teacher: 'Гераськин А.С.', lesson: 'Основы построения защищенных баз данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['331'], teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['311'], teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['421'], teacher: 'Жаркова А.В.', lesson: 'Введение в криптографию 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: ['КНиИТ'], group: ['421'], teacher: 'Жаркова А.В.', lesson: 'Введение в криптографию 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '1', department: ['КНиИТ'], group: ['431'], teacher: 'Никитина А.С.', lesson: 'Теория псевдослучайных генераторов 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: ['КНиИТ'], group: ['431'], teacher: 'Никитина А.С.', lesson: 'Основы построения защищенных баз данных 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '4', department: ['КНиИТ'], group: ['431'], teacher: 'Никитина А.С.', lesson: 'Теория псевдослучайных генераторов 1 гр.', type: 'пр.', parity: '-'}]);

template_polygon_feature([[[632, 631], [918, 631], [918, 373], [632, 373], [632, 631]]], '304 (лекционная аудитория)', '304',
    [{ day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['151'], teacher: 'Молчанов В.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['111', '181'], teacher: 'Молчанов В.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['211', '251'], teacher: 'Миронов С.В.', lesson: 'Компьютерная графика', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['231'], teacher: 'Стрыгина С.В.', lesson: 'Основы права и антикоррупционного поведения', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '5', department: ['ФМиЕНД'], group: ['321'], teacher: 'Векслер В.А.', lesson: 'Компьютерное моделирование и пакеты прикладных программ', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '6', department: ['КНиИТ', 'Экономический'], group: ['411', '421', '451','441', '481', '411', '412', '421', '422'], teacher: 'Сокиркина Л.И.', lesson: 'Межкультурная коммуникация (переводчики)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ'], group: ['211', '251'], teacher: 'Сафрончик М.И.', lesson: 'Структуры данных и алгоритмы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['231'], teacher: 'Чернышова Г.Ю.', lesson: 'Дискретная математика', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['331'], teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['321'], teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['231'], teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['121', '181'], teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['231'], teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['ФМиЕНД'], group: ['121'], teacher: 'Тарабрин С.Ю.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '1', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Соломонов В.А.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '1', department: ['КНиИТ'], group: ['131'], teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Соломонов В.А.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['211'], teacher: 'Сафрончик М.И.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['121'], teacher: 'Лобов А.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '5', department: ['ФМиЕНД'], group: ['220'], teacher: 'Огнева М.В.', lesson: 'Методика обучения информатике одарённых детей, подростков и молодёжи', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '6', department: ['КНиИТ'], group: ['341'], teacher: 'Соломина Ю.Ю.', lesson: 'Технология разработки программного обеспечения', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Купцов П.В.', lesson: 'Параллельное и распределенное программирование', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники', type: 'лек.', parity: '-' }]);

template_polygon_feature([[[921, 631], [1163, 631], [1163, 373], [921, 373], [921, 631]]], '303 (лекционная аудитория)', '303',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['251'], teacher: 'Сафрончик М.И.', lesson: 'НИР', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['221'], teacher: 'Станкевич Е.П.', lesson: 'НИР гр. САУ', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Иванова А.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['221'], teacher: 'Селифонова Е.И.', lesson: 'Безопасность жизнедеятельности', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['221'], teacher: 'Селифонова Е.И.', lesson: 'Безопасность жизнедеятельности', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['221'], teacher: 'Кудрина Е.В.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '5', department: ['КНиИТ'], group: ['221'], teacher: 'Селифонова Е.И.', lesson: 'Безопасность жизнедеятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['431'], teacher: 'Кондратова Ю.Н.', lesson: 'Технологии программирования', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['331'], teacher: 'Соловьёв В.М.', lesson: 'Операционные системы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Кривобок В.В.', lesson: 'Алгебра', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['271'], teacher: 'Тимофеева Н.Е.', lesson: 'Системное прикладное программное обеспечение', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Богомолов А.С.', lesson: 'Стандартизация программного обеспечения', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['141'], teacher: 'Кабанова Л.В.', lesson: 'Разработка пользовательского интерфейса', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['341'], teacher: 'Огнева М.В.', lesson: 'Машинное обучение и анализ данных', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['241'], teacher: 'Огнева М.В.', lesson: 'Структуры и алгоритмы компьютерной обработки данных', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Абросимов М.Б.', lesson: 'Введение в специальность', type: 'лек.', parity: 'знам.' },
    { day: 'Четверг', number: '1', department: ['КНиИТ'], group: ['211', '251'], teacher: 'Папшев С.В.', lesson: 'Формальные языки и грамматики', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['321'], teacher: 'Сагаева И.Д.', lesson: 'Формальные языки и грамматики', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Миронов С.В.', lesson: 'Языки программирования', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['241'], teacher: 'Ефремова Н.В.', lesson: 'Основы медицинских знаний', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['241'], teacher: 'Ефремова Н.В.', lesson: 'Основы медицинских знаний', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['231'], teacher: 'Лысикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['341', '381'], teacher: 'Лысикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['231'], teacher: 'Дмитриев П.О.', lesson: 'Компьютерные сети', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['221'], teacher: 'Чернышова Г.Ю.', lesson: 'Дискретная математика', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: ['КНиИТ'], group: ['241'], teacher: 'Кудрина Е.В.', lesson: 'Программирование на языке Java', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '2', department: ['КНиИТ'], group: ['351'], teacher: 'Папшев С.В.', lesson: 'Проектирование архитектуры операционных систем', type: 'лек.', parity: '-' }]);

template_polygon_feature([[[1166, 631], [1361, 631], [1361, 373], [1166, 373], [1166, 631]]], '302', '302',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['321'], teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['531'], teacher: 'Лобов А.А.', lesson: 'Программно-аппаратные средства обеспечения информационной безопасности', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['431'], teacher: 'Лобов А.А.', lesson: 'Защита программ и данных', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['КНиИТ'], group: ['531'], teacher: 'Ионов К.И.', lesson: 'Java программирование', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '6', department: ['КНиИТ'], group: ['271'], teacher: '-', lesson: 'НИР', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '1', department: ['КНиИТ'], group: ['132'], teacher: 'Тимофеев В.Г.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ', 'ФМиЕНД'], group: ['221', '241', '221'], teacher: 'Исайкина М.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['ФМиЕНД'], group: ['421'], teacher: 'Плешкевич Е.А.', lesson: 'Современные средства оценивания результатов обучения (с 21.02)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['481'], teacher: 'Станкевич Е.П.', lesson: 'Моделирование телекоммуникационных систем и компьютерных сетей', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['441'], teacher: 'Соловьёв В.М.', lesson: 'Администрирование информационных систем', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Исайкина М.А.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Чумакова А.Ю.', lesson: 'Английский язык 6 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['131'], teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['481'], teacher: 'Матов О.Р.', lesson: 'Метрология, стандартизация и сертификация', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['531'], teacher: 'Жижина М.В.', lesson: 'Психология и педагогика (2025.03.05 - 2025.03.31)', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '1', department: ['КНиИТ', 'ФМиЕНД'], group: ['221', '241', '221'], teacher: 'Исайкина М.А.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['211'], teacher: 'Папшев С.В.', lesson: 'Формальные языки и грамматики', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['ФМиЕНД'], group: ['221'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['321'], teacher: 'Сагаева И.Д.', lesson: 'Формальные языки и грамматики', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['273'], teacher: 'Крючкова А.А.', lesson: 'Автоматизированное тестирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['КНиИТ'], group: ['531'], teacher: 'Абросимов М.Б.', lesson: 'Методы оптимизации графовых систем', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '6', department: ['КНиИТ'], group: ['171'], teacher: 'Андрейченко Д.К.', lesson: 'Программирование рапределенных систем 2 гр. Анализ и синтез', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['132'], teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['231'], teacher: 'Жаркова А.В.', lesson: 'Ознакомительная практика', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['251'], teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['ФМиЕНД'], group: ['121'], teacher: 'Букушева А.В.', lesson: 'Теоретические основы информатики', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '7', department: ['КНиИТ'], group: ['171'], teacher: 'Кирьяшкин В.В.', lesson: 'Современные операционные системы', type: 'лек.', parity: 'чис.' },
    { day: 'Суббота', number: '3', department: ['КНиИТ'], group: ['431'], teacher: 'Слеповичев И.И.', lesson: 'Теория псевдослучайных генераторов', type: 'лек.', parity: '-'}]);

template_polygon_feature([[[1364, 635], [1525, 635], [1525, 373], [1364, 373], [1364, 635]]], '301 (кафедра теоретических основ компьютерной <br> безопасности и криптографии)', '301',
    [{ day: 'Среда', number: '7', department: ['КНиИТ'], group: ['294'], teacher: 'Молчанов В.А.', lesson: 'Математическая логика, алгебра и дискретная математика', type: 'лек.', parity: '-' },
     { day: 'Суббота', number: '2', department: ['КНиИТ'], group: ['292', '294', '494'], teacher: 'Абросимов М.Б.', lesson: 'Научно-исследовательская деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_polygon_feature([[[1528, 635], [1815, 635], [1815, 373], [1528, 373], [1528, 635]]], '333 (лекционная аудитория)', '333',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['121'], teacher: 'Крусс Ю.С.', lesson: 'Алгебра и геометрия', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['121'], teacher: 'Лобов А.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['231'], teacher: 'Стрыгина С.В.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['411', '451', '441'], teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '7', department: ['ФМиЕНД'], group: ['150'], teacher: 'Созонник А.В.', lesson: 'Психолого-педагогические технологии в профессиональной деятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '1', department: ['КНиИТ'], group: ['241'], teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['211', '251'], teacher: 'Агафонова Н.Ю.', lesson: 'Теория вероятностей и математическая статистика', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['121'], teacher: 'Матвеева Ю.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['141'], teacher: 'Матвеева Ю.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['321', '381'], teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '6', department: ['ФМиЕНД'], group: ['135', '140', '150'], teacher: 'Щетинина Е.Б.', lesson: 'Инклюзивное образование', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['331'], teacher: 'Сафрончик М.И.', lesson: 'Системы управления базами данных', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ'], group: ['221'], teacher: 'Сергеева Н.В.', lesson: 'Теория вероятностей, математическая статистика и случайные процессы', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: ['КНиИТ'], group: ['411', '451'], teacher: 'Савинов А.О.', lesson: 'Интеллектуальные системы и технологии', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['481'], teacher: 'Матов О.Р.', lesson: 'Метрология, стандартизация и сертификация', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '5', department: ['ФМиЕНД'], group: ['321'], teacher: 'Самыкина Ю.С.', lesson: 'Основы вожатской деятельности', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '6', department: ['КНиИТ'], group: ['171', '173'], teacher: 'Крючкова А.А.', lesson: 'Управление проектами 1 гр. Сети ЭВМ', type: 'лек.', parity: 'знам.' },
    { day: 'Четверг', number: '1', department: ['КНиИТ'], group: ['121'], teacher: 'Барков П.В.', lesson: 'Физика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['151'], teacher: 'Бредихин Д.А.', lesson: 'Алгебра и геометрия', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['241'], teacher: 'Батраева И.А.', lesson: 'Реляционные базы данных', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['341'], teacher: 'Чистопольская Е.В.', lesson: 'Управление ИТ-проектами (цифровая кафедра)', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['311', '351'], teacher: 'Чистопольская Е.В.', lesson: 'Управление ИТ-проектами (цифровая кафедра)', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['341'], teacher: 'Андрейченко Д.К.', lesson: 'Параллельное и распределенное программирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['КНиИТ'], group: ['321'], teacher: 'Кальянов Л.В.', lesson: 'НИР', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: ['ФМиЕНД'], group: ['120'], teacher: 'Коновалова М.Д.', lesson: 'Инклюзивное образование', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['341'], teacher: 'Щуров Д.И.', lesson: 'Java программирование', type: 'лек.', parity: 'чис.' },
    { day: 'Пятница', number: '2', department: ['ФМиЕНД'], group: ['251', '252'], teacher: 'Старко Е.С.', lesson: 'Информационные технологии в педагогическом образовании', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['151'], teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['111'], teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['211', '251'], teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['ФМиЕНД'], group: ['321'], teacher: 'Самыкина Ю.С.', lesson: 'Основы вожатской деятельности', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: ['КНиИТ'], group: ['221'], teacher: 'Трунов А.А.', lesson: 'НИР', type: 'пр.', parity: 'знам.' }]);

// аудитории правого крыла
template_polygon_feature([[[1818, 635],[1995, 635],[1995, 373],[1818, 373],[1818, 635]]], '331', '331');

template_polygon_feature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '330', '330', 
    [{ day: 'Понедельник', number: '1', department: ['ФМиЕНД'], group: ['121'], teacher: 'Векслер В.А.', lesson: 'Компьютерная графика', type: 'лек.', parity: 'чис.'},]);

template_polygon_feature([[[2233, 635], [2504, 635], [2504, 373], [2233, 373], [2233, 635]]], '329 (компьютерный класс)', '329',
    [{ day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['241'], teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 3 гр. (цифровая кафедра)', type: 'пр.', parity: '-'},    
    { day: 'Вторник', number: '5', department: ['ФМиЕНД'], group: ['321'], teacher: 'Смирнов Д.А.', lesson: 'Языки программирования в школьном курсе информатики', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['431'], teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['КНиИТ', 'ФМиЕНД'], group: ['171', '210'], teacher: 'Булавина Е.В.', lesson: 'Методика преподавания компьютерных наук', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['КНиИТ'], group: ['321'], teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 1 гр. (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: ['КНиИТ'], group: ['321'], teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 2 гр. (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: ['КНиИТ'], group: ['381'], teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД (цифровая кафедра)', type: 'пр.', parity: '-' }]);

template_polygon_feature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '328 (компьютерный класс)', '328', 
    [{ day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['241'], teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 1,2 гр. (цифровая кафедра)', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['ФМиЕНД'], group: ['351'], teacher: 'Векслер В.А.', lesson: 'Интеллектуальный анализ образовательных данных и учебная аналитика (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Среда', number: '1', department: 'Философский', group: ['311', '331'], teacher: 'Белоконь М.В.', lesson: '1С Предприятие для решения задач в профессиональной деятельности', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['ФМиЕНД'], group: ['341'], teacher: 'Старко Е.С.', lesson: 'Информационные технологии в педагогическом образовании (с 11.04.25)', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '6', department: ['ФМиЕНД'], group: ['341'], teacher: 'Старко Е.С.', lesson: 'Информационные технологии в педагогическом образовании (с 11.04.25)', type: 'пр.', parity: '-'},]);

template_polygon_feature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '315 (лекционная аудитория)', '315');
template_polygon_feature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '316 (учебная лаборатория прикладной психологии образования)', '316');
template_polygon_feature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '317', '317');
template_polygon_feature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '327 (кафедры <br> коррекционной педагогики, <br> технологического <br> образования)', '327');

template_polygon_feature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '326 (кафедра социальной <br> психологии образования <br> и развития)', '326');

template_polygon_feature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '325 (кафедры начального <br> языкового и литературного, <br> естественно-математтического <br> образований)', '325');
template_polygon_feature([[[2894, 1550], [3310, 1550], [3310, 1320], [2894, 1320], [2894, 1550]]], '323/324', '324');

template_polygon_feature([[[2894, 1628], [3193, 1628], [3193, 1552], [2894, 1552], [2894, 1628]]], '322', '322',
    [{ day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['393'], teacher: 'Сидоров С.П.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' },]);

template_polygon_feature([[[2894, 1714],[3193, 1714],[3193, 1630],[2894, 1630],[2894, 1714]]], '321', '321');
template_polygon_feature([[[2894, 1948],[3315, 1948],[3315, 1719],[2894, 1719],[2894, 1948]]], '319/320', '320');

// специальные помещения 
template_polygon_feature([[[1510, 1295],[1688, 1295],[1688, 1193],[1510, 1193],[1510, 1295]]], 'преподавательская', 'teacherroom1');
template_polygon_feature([[[1691, 1295],[1865, 1295],[1865, 1193],[1691, 1193],[1691, 1295]]], 'преподавательская', 'teacherroom2');
template_polygon_feature([[[1424, 1676],[1897, 1676],[1897, 1370],[1424, 1370],[1424, 1676]]], 'спортзал', 'gym',
    [{ day: 'Понедельник', number: '1', department: ['Философский'], group: ['111', '141', '151', '211'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '1', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['Философский'], group: ['241', '251', '341', '351'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['ФМиЕНД'], group: ['151', '152'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['Экономический'], group: ['121', '122', '141'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['331'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Экономический'], group: ['222', '241'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['ФМиЕНД'], group: ['252'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '1', department: ['ФМиЕНД'], group: ['151', '251'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '1', department: ['ФМиЕНД'], group: ['341'], teacher: 'Краснова И.В.', lesson: 'Общая физическая подготовка (с 11.04.25)', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['ФМиЕНД'], group: ['351', '352'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту (c 15.04.25)', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['Экономический'], group: ['211', '212', '213'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['ФМиЕНД'], group: ['141'], teacher: 'Краснова И.В.', lesson: 'Общая физическая подготовка', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['ФМиЕНД'], group: ['252'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['ФМиЕНД'], group: ['341'], teacher: 'Краснова И.В.', lesson: 'Общая физическая подготовка (с 11.04.25)', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Экономический'], group: ['141'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['ФМиЕНД'], group: ['141'], teacher: 'Краснова И.В.', lesson: 'Общая физическая подготовка', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Экономический'], group: ['221', '222', '241'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['211'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '1', department: ['ФМиЕНД'], group: ['152', '251'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '1', department: ['Философский'], group: ['111', '141', '151'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '1', department: ['ФМиЕНД'], group: ['351', '352'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту (c 15.04.25)', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['Философский'], group: ['241', '251'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['ФМиЕНД'], group: ['351', '352'], teacher: 'Краснова И.В.', lesson: 'Элективные дисциплины по физической культуре и спорту (c 15.04.25)', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['Экономический'], group: ['121', '122', '212', '213'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['331', '341', '351'], teacher: 'Краснова И.В.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['ФМиЕНД'], group: ['241'], teacher: 'Краснова И.В.', lesson: 'Общая физическая подготовка', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Экономический'], group: ['111', '112', '211'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['ФМиЕНД'], group: ['241'], teacher: 'Краснова И.В.', lesson: 'Общая физическая подготовка', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Экономический'], group: ['113', '221'], teacher: 'Воротилова Н.Н.', lesson: 'Прикладная физическая культура', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: ['Психологии'], group: ['261', '262', '361', '362'], teacher: 'Григорьев Е.В.', lesson: 'Общая физическая подготовка', type: 'пр.', parity: '-'},]);

const map = create_map('third_floor.png');

const popup = create_popup();
map.addOverlay(popup);

pointermove(map, defaultStyle, highlightStyle, popup);
click(map, get_filters, show_schedule);

fill_filter(vectorSource);

setup_filter(apply_filter);

reset_filters(apply_filter, filter_features);