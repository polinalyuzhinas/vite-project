import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image.js';
import StaticImage from 'ol/source/ImageStatic.js';
import { Projection, get, fromLonLat } from 'ol/proj.js';
import 'ol/ol.css';
import proj4 from 'proj4';

// инструменты для векторных слоёв
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';

import Overlay from 'ol/Overlay'; // нужно для всплывающей надписи

const imageWidth = 3322;
const imageHeight = 2014;
const imageExtent = [0, 0, imageWidth, imageHeight];

// определяем проекции с помощью proj4.defs
proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

// определяем pixel-image, также увеличивая extent
proj4.defs("pixel-image", "+proj=identity +units=pixels +extent=0,0," + imageWidth + "," + imageHeight);

// получаем пользовательскую проекцию OpenLayers
const proj = new Projection({
    code: 'pixel-image',
    units: 'pixels',
    extent: imageExtent
});

const imageLayer = new ImageLayer({ // слой с изображением (статичным)
    source: new StaticImage({
        url: 'fourth_floor.png',
        projection: proj,
        imageExtent: imageExtent,
    })
});

const vectorSource = new VectorSource(); // векторный источник

// cоздание векторного слоя
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: function (feature) {
    return feature.getStyle();
  }
});

// cоздание стилей
const defaultStyle = new Style({ // стиль по умолчанию
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.01)'
      }), // заливка
    });
  
const highlightStyle = new Style({ // стиль при наведении курсора
fill: new Fill({
    color: 'rgba(98, 87, 255, 0.3)'
})
});

const polygonFeatures = new Map(); // cловарь для хранения полигонов

function template_PolygonFeature(coordinates, description, featureID, schedule=[]) { // создает объект OpenLayers Feature по координатам, описанию и ID и сохраняет его в словаре
    const feature = new Feature({
        geometry: new Polygon(coordinates)
    });
    feature.set('description', description); // надпись при наведении на выделении курсора
    feature.set('schedule', schedule); // расписание (если есть)
    feature.setStyle(defaultStyle); // стиль по умолчанию
    vectorSource.addFeature(feature); // добавляем в векторный слой
    polygonFeatures.set(featureID, feature); // добавляем полигон в словарь, чтобы потом к нему обращаться
}

// лестницы
template_PolygonFeature([[[1479, 1027],[1600, 1027],[1600, 944],[1479, 944],[1479, 1027]]], 'центральная лестница', 'centralstairs1');
template_PolygonFeature([[[1604, 1001],[1769, 1001],[1769, 873],[1604, 873],[1604, 1001]]], 'центральная лестница', 'centralstairs2');
template_PolygonFeature([[[1772, 1027],[1892, 1027],[1892, 944],[1772, 944],[1772, 1027]]], 'центральная лестница', 'centralstairs3');
template_PolygonFeature([[[2494, 1088],[2637, 1088],[2637, 950],[2494, 950],[2494, 1088]]], 'лестница', 'rightstairs');
template_PolygonFeature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_PolygonFeature([[[737, 1079],[876, 1079],[876, 940],[737, 940],[737, 1079]]], 'лестница', 'leftstairs');
template_PolygonFeature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_PolygonFeature([[[62, 1466],[134, 1466],[134, 1398],[62, 1398],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');
template_PolygonFeature([[[1928, 1382],[2043, 1382],[2043, 1292],[1928, 1292],[1928, 1382]]], 'лестница к спортзалу', 'gymstairs');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет мужской', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет мужской', 'toilet2');
template_PolygonFeature([[[1823, 1426],[1899, 1426],[1899, 1374],[1823, 1374],[1823, 1426]]], 'туалет у раздевалки', 'toiletgym');

// аудитории левого крыла
template_PolygonFeature([[[178, 1949],[686, 1949],[686, 1551],[178, 1551],[178, 1949]]], '411 (конференц-зал экономического факультета)', '411',
    [{ day: 'Среда', number: '5', department: 'КНиИТ', group: '131, 132, 111, 121, 141, 151, 181', teacher: 'Алексеева Д.А.', lesson: 'Основы теории изучаемого языка (переводчики)', type: 'лек.', parity: '-' },
     { day: 'Четверг', number: '5', department: 'КНиИТ', group: '291, 292', teacher: 'Балакирева И.Е.', lesson: 'Педагогика высшей школы', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[318, 1546],[492, 1546],[492, 1429],[318, 1429],[318, 1546]]], '410', '410');

template_PolygonFeature([[[239, 1409], [306, 1409], [306, 1325], [239, 1325], [239, 1409]]], '300 (находится между 3 и 4 этажами)', '300',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр. ', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '132', teacher: 'Грищенко А.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '173', teacher: 'Андрейченко Д.К.', lesson: 'НИР', type: 'пр.', parity: 'знам.' },
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '531', teacher: 'Ионов К.И.', lesson: 'Java программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Уколова М.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '331', teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '531', teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '381', teacher: 'Сафрончик М.И.', lesson: 'Базы данных', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '531', teacher: 'Ионов К.И.', lesson: 'Java программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '7', department: 'КНиИТ', group: '171', teacher: 'Тананко И.Е.', lesson: 'Методы оптимизации 1 гр. Сети ЭВМ', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '7', department: 'КНиИТ', group: '171', teacher: 'Вешнева И.В.', lesson: 'Технологии построения микропроцессорной техники 2 гр. Анализ и синтез', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '311', teacher: 'Соловьёв В.М.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '351', teacher: 'Соловьёв В.М.', lesson: 'НИР', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '531', teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта 2 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '421', teacher: 'Станкевич Е.П.', lesson: 'Моделирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '441', teacher: 'Соловьёв В.М.', lesson: 'Администрирование информационных систем 1 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '531', teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта 1 гр.', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '351', teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '121', teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '311', teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '481', teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '481', teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '6', department: 'КНиИТ', group: '171', teacher: 'Кирьяшкин В.В.', lesson: 'Современные операционные системы', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '411', teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '411', teacher: 'Филиппов Б.А.', lesson: 'Программные решения математических задач', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '451', teacher: 'Филиппов Б.А.', lesson: 'Программные решения математических задач', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '191, 192, 291, 292, 392, 393, 394, 492, 494', teacher: '-', lesson: 'Самостоятельная работа аспирантов', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '5', department: 'КНиИТ', group: '451', teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[178, 1320],[475, 1320],[475, 987],[178, 987],[178, 1320]]], '409 (деканат экономического факультета, заочное отделение)', '409');
template_PolygonFeature([[[178, 983],[475, 983],[475, 785],[178, 785],[178, 983]]], '408 (деканат экономического факультета, дневное отделение)', '408');
template_PolygonFeature([[[178, 782],[475, 782],[475, 685],[178, 685],[178, 782]]], '407 (серверная)', '407');
template_PolygonFeature([[[178, 682],[475, 682],[475, 481],[178, 481],[178, 682]]], '406 (научно-образовательный центр экономического факультета)', '406');
template_PolygonFeature([[[178, 478],[475, 478],[475, 610],[633, 610],[633, 374],[511, 374],[511, 255],[178, 255],[178, 478]]], '405 (деканат экономического факультета)', '405');

template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '413 (учебная лаборатория Базальт СПО)', '413',
    [{ day: 'Понедельник', number: '5', department: 'КНиИТ', group: '421', teacher: 'Синельников Е.А.', lesson: 'Системы реального времени 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '321', teacher: 'Тимофеева Н.Е.', lesson: 'Огранизация ЭВМ и систем 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '231', teacher: 'Дмитриев П.О.', lesson: 'Компьютерные сети 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '321', teacher: 'Тимофеева Н.Е.', lesson: 'Организация ЭВМ и систем 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '241', teacher: 'Сафрончик М.И.', lesson: 'Реляционные базы данныз 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '271', teacher: 'Тимофеева Н.Е.', lesson: 'Системное и прикладное программное обеспечение', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '7', department: 'КНиИТ', group: '271', teacher: 'Тимофеева Н.Е.', lesson: 'Системное и прикладное программное обеспечение', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '321', teacher: 'Дмитриев П.О.', lesson: 'Сети и телекоммуникации 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '531', teacher: 'Новиков В.Е.', lesson: 'Введение в криптоанализ 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '421', teacher: 'Синельников Е.А.', lesson: 'Системы реального времени 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '441', teacher: 'Синельников Е.А.', lesson: 'Системы реального времени 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '121', teacher: 'Портенко М.С.', lesson: 'Информационные технологии и программирование 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '231', teacher: 'Баталин В.В.', lesson: 'Компьютерные сети 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '441', teacher: 'Синельников Е.А.', lesson: 'Системы реального времени 1 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '414 (учебная лаборатория Совкомбанк)', '414',
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '421', teacher: 'Тананко И.Е.', lesson: 'Моделирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '121', teacher: 'Латышева Е.В.', lesson: 'Инженерная графика 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '273', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные системы', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '7', department: 'КНиИТ', group: '273', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные системы', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '331', teacher: 'Сафрончик М.И.', lesson: 'Системы управления базами данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '131', teacher: 'Сафрончик М.И.', lesson: 'Информационные технологии и программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '441', teacher: 'Тананко И.Е.', lesson: 'Моделирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '411', teacher: 'Тананко И.Е.', lesson: 'Моделирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '331', teacher: 'Кондратова Ю.Н.', lesson: 'Методы программирования 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '411', teacher: 'Савинов А.О.', lesson: 'Интеллектуальные системы и технологии', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '411', teacher: 'Савинов А.О.', lesson: 'Интеллектуальные системы и технологии', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '451', teacher: 'Тананко И.Е.', lesson: 'Моделирование', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '441', teacher: 'Соловьёв В.М.', lesson: 'Администрирование информационных систем 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '481', teacher: 'Петров Д.Ю.', lesson: 'Имитационное моделирование систем', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '351', teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '121', teacher: 'Латышева Е.В.', lesson: 'Инженерная графика 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '121', teacher: 'Латышева Е.В.', lesson: 'Инженерная графика 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '351', teacher: 'Кузнецов М.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '311', teacher: 'Кузнецов М.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '241', teacher: 'Мишин А.Д.', lesson: 'Программирование на языке Java 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '241', teacher: 'Мишин А.Д.', lesson: 'Программирование на языке Java 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '241', teacher: 'Мишин А.Д.', lesson: 'Программирование на языке Java 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '5', department: 'КНиИТ', group: '421', teacher: 'Барабанов Н.А.', lesson: 'Системы и сети передачи информации 2 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[1247, 1097],[1458, 1097],[1458, 778],[1247, 778],[1247, 1097]]], '415 (учебная лаборатория искусственного интеллекта, машинного обучения)', '415',
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '431', teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '271', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные системы', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '271', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные системы', type: 'пр.', parity: '-'}, 
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '321', teacher: 'Портенко М.С.', lesson: 'Технологии программирования 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '341', teacher: 'Щуров Д.И.', lesson: 'Java-программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '131', teacher: 'Романов В.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '231', teacher: 'Грищенко А.А.', lesson: 'Языки программирования 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '411', teacher: 'Станкевич Е.П.', lesson: 'Моделирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '341', teacher: 'Батраева И.А.', lesson: 'Базы данных 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '141', teacher: 'Букушева А.В.', lesson: 'Разработка пользовательского интерфейса 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '531', teacher: 'Новиков В.Е.', lesson: 'Введение в криптоанализ 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '451', teacher: 'Савинов А.О.', lesson: 'Интеллектуальные системы и технологии', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '321', teacher: 'Сафрончик М.И.', lesson: 'Базы данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '241', teacher: 'Кудрина Е.В.', lesson: 'Структуры и алгоритмы компьютерной обработки данных 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '121', teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '341', teacher: 'Батраева И.А.', lesson: 'Базы данных 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '421', teacher: 'Белоконь М.В.', lesson: 'Распределенные базы данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '421', teacher: 'Белоконь М.В.', lesson: 'Распределенные базы данных 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '1', department: 'КНиИТ', group: '351', teacher: 'Папшев С.В.', lesson: 'Проектирование архитектуры информационных систем 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '351', teacher: 'Папшев С.В.', lesson: 'Проектирование архитектуры информационных систем 2 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '404', '404');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '403 (компьютерный класс экономического факультета)', '403');

template_PolygonFeature([[[1166, 631], [1361, 631], [1361, 373], [1166, 373], [1166, 631]]], '402 (компьютерный класс экономического факультета)', '402',
    [{ day: 'Понедельник', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр. ', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '431, 441, 421, 411, 451', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '431, 441, 421, 411, 451', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр. ', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[1364, 635],[1518, 635],[1518, 373],[1364, 373],[1364, 635]]], '401 (учебная лаборатория информационных технологий в экономике)', '401');
template_PolygonFeature([[[1521, 635],[1816, 635],[1816, 373],[1521, 373],[1521, 635]]], '433/434', '433');

// аудитории правого крыла
template_PolygonFeature([[[2894, 1948],[3315, 1948],[3315, 1719],[2894, 1719], [2894, 1948]]], '420', '420',
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '331', teacher: 'Андросов И.А.', lesson: 'Методы программирования', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '241, 321, 381, 431', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД (цифровая кафедра)', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '531', teacher: 'Бгашев М.В.', lesson: 'Основы управленческой деятельности', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '531', teacher: 'Бгашев М.В.', lesson: 'Основы управленческой деятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Иванова Д.Н.', lesson: 'Теория перевода (переводчики)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '241, 311, 351', teacher: 'Коротковская Е.В.', lesson: 'Основы экономики и финансовой грамотности', type: 'лек.', parity: 'знам.'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '121, 141', teacher: 'Матвеева Ю.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '241, 321, 381, 431', teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '421', teacher: 'Семенов А.А.', lesson: 'Микропроцессорные системы', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '421', teacher: 'Семенов А.А.', lesson: 'Микропроцессорные системы', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '451', teacher: 'Кузнецов А.В.', lesson: 'Управление проектами', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '411, 441', teacher: 'Кузнецов А.В.', lesson: 'Промышленная разработка программного обеспечения', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '311, 351, 341, 381', teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '231, 321', teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '121', teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '121', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '111, 151, 181', teacher: 'Черкасова О.А.', lesson: 'Физика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '331, 221', teacher: 'Каретникова Т.А.', lesson: 'Электротехника, электроника и схемотехника ЭВМ', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '121, 141', teacher: 'Соломонов В.А.', lesson: 'История России', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '121', teacher: 'Соломонов В.А.', lesson: 'История России', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '141', teacher: 'Соломонов В.А.', lesson: 'История России', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '111, 151, 181', teacher: 'Молчанов В.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '111, 151, 181', teacher: 'Зайцев М.В.', lesson: 'История России', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '231', teacher: 'Папшев С.В.', lesson: 'Языки программирования', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '441', teacher: 'Кузнецов А.В.', lesson: 'Промышленная разработка программного обеспечения', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '451', teacher: 'Кузнецов А.В.', lesson: 'Управление проектами', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '411', teacher: 'Кузнецов А.В.', lesson: 'Промышленная разработка программного обеспечения', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '422 (образовательный центр <br> непрерывной подготовки <br> IT-специалистов)', '422');
template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '423', '423');

template_PolygonFeature([[[2894, 1550],[3310, 1550],[3310, 1320],[2894, 1320],[2894, 1550]]], '424', '424',
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Исайкина М.А.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '311, 341, 351', teacher: 'Чистопольская Е.В.', lesson: 'Управление ИТ-проектами (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '141', teacher: 'Хворостухина Е.В.', lesson: 'Линейная алгебра и приложения', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '141', teacher: 'Хворостухина Е.В.', lesson: 'Линейная алгебра и приложения', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Исайкина М.А.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '111, 151, 181', teacher: 'Сахно Л.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '151, 181', teacher: 'Сахно Л.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '173', teacher: 'Сухов С.А.', lesson: 'Разработка web-приложений', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '111', teacher: 'Гордиенко В.Г.', lesson: 'Математический анализ', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '241', teacher: 'Сергеева Н.В.', lesson: 'Теория вероятностей, математическая статистика и случайные процессы', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '351', teacher: 'Мусаева Д.Н.', lesson: 'Основы экономикии и финансовой грамотности', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '131, 132', teacher: 'Абросимов М.Б.', lesson: 'Введение в специальность', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '231, 211, 251, 221, 241', teacher: 'Павлова О.В.', lesson: 'Основы литературного редактирования (переводчики)', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 8 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '411, 451, 421, 441', teacher: 'Тананко И.Е.', lesson: 'Моделирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '111, 181', teacher: 'Новиков В.Е.', lesson: 'Алгебра и геометрия', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '121', teacher: 'Латышева Е.В.', lesson: 'Инженерная графика', type: 'лек.', parity: 'чис.' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '131, 132, 121', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'лек.', parity: 'чис.' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '131', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '132', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'пр.', parity: 'чис.'},
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '431, 411, 451, 421, 441, 481', teacher: 'Пыжонков С.В.', lesson: 'Организация деятельности переводчика (1, 15, 22 марта, переводчики)', type: 'лек.', parity: '-'}]);

template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '426', '426', 
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '181', teacher: 'Грецова А.П.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '181', teacher: 'Грецова А.П.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '481', teacher: 'Станкевич Е.П.', lesson: 'Моделирование телекоммуникационных систем и компьютерных сетей', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '481', teacher: 'Тананко И.Е.', lesson: 'Методы и средства измерения систем', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '341', teacher: 'Андрейченко Д.К.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '221', teacher: 'Булавина Е.В.', lesson: 'Машинно-зависимые языки программирования 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '211', teacher: 'Иванова А.С.', lesson: 'Компьютерная графика 2 гр.', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '441', teacher: 'Булавина Е.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных систем 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '311', teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '481', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные технологии и представление знаний', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '181', teacher: 'Тананко И.Е.', lesson: 'Введение в системный анализ', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '181', teacher: 'Тананко И.Е.', lesson: 'Введение в системный анализ', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '181', teacher: 'Букушева А.В.', lesson: 'Архитектура вычислительных систем и компьютерных сетей', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '181', teacher: 'Букушева А.В.', lesson: 'Архитектура вычислительных систем и компьютерных сетей', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Уколова М.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '341', teacher: 'Сафрончик М.И.', lesson: 'Базы данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '411', teacher: 'Булавина Е.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '451', teacher: 'Савинов А.О.', lesson: 'Интеллектуальные системы и технологии', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '273', teacher: 'Крючкова А.А.', lesson: 'Автоматизированное тестирование', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: 'КНиИТ', group: '273', teacher: 'Крючкова А.А.', lesson: 'Автоматизированное тестирование', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '241', teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '341', teacher: 'Андрейченко Д.К.', lesson: 'Параллельное и распределенное программирование 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '341', teacher: 'Казачкова А.А.', lesson: 'Машинное обучение и анализ данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '231', teacher: 'Баталин В.В.', lesson: 'Компьютерные сети 2 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '427 (кафедра финансов <br> и кредита)', '427');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '428 (кафедра <br> экономической теории и <br> национальной экономики)', '428');

template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '418 (компьютерный класс факультета КНиИТ)', '418', 
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '111', teacher: 'Крючкова А.А.', lesson: 'Современные информационные технологии 1 гр.', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '151', teacher: 'Крючкова А.А.', lesson: 'Современные информационные технологии 1 гр.', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '331', teacher: 'Андросов И.А.', lesson: 'Методы программирования 2 гр.', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '331', teacher: 'Кондратова Ю.Н.', lesson: 'Методы программирования 1 гр.', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '221', teacher: 'Черноусова Е.М.', lesson: 'Машинно-зависимые языки программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '221', teacher: 'Ганюшкина А.В.', lesson: 'Машинно-зависимые языки программирования 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '341', teacher: 'Лапшева Е.Е.', lesson: 'Машинное обучение и анализ данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '341', teacher: 'Коноплева А.И.', lesson: 'Машинное обучение и анализ данных 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '221', teacher: 'Кудрина Е.В.', lesson: 'Структуры данных и алгоритмы 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '221', teacher: 'Булавина Е.В.', lesson: 'Структуры данных и алгоритмы 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '173', teacher: 'Сухов С.А.', lesson: 'Разработка web-приложений', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '151', teacher: 'Забоев М.В.', lesson: 'Информационные технологии и прогрпаммирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '151', teacher: 'Сафрончик М.И.', lesson: 'Информационные технологии и прогрпаммирование 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '251', teacher: 'Иванова А.С.', lesson: 'Компьютерная графика 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '251', teacher: 'Батраева И.А.', lesson: 'Компьютерная графика 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '341', teacher: 'Андрейченко Д.К.', lesson: 'Параллельное и распределенное программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '341', teacher: 'Щуров Д.И.', lesson: 'Java-программирование 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '132', teacher: 'Соловьёв В.М.', lesson: 'Информационные технологии и программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '241', teacher: 'Батраева И.А.', lesson: 'Реляционные базы данных 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '241', teacher: 'Сафрончик М.И.', lesson: 'Реляционные базы данных 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '131', teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '131', teacher: 'Карташов Ф.С.', lesson: 'Аппаратные средства вычислительной техники 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '131', teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '351', teacher: 'Чернигин М.А.', lesson: 'Языки программирования 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '351', teacher: 'Миронов С.В.', lesson: 'Языки программирования 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '311', teacher: 'Чернигин М.А.', lesson: 'Языки программирования 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '311', teacher: 'Крючкова А.А.', lesson: 'Языки программирования 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '421', teacher: 'Барабанов Н.А.', lesson: 'Системы и сети передачи информации 1 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '417 (лаборатория системного программирования)', '417');

template_PolygonFeature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '416 (компьютерный класс факультета КНиИТ)', '416',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '351', teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '1', department: 'КНиИТ', group: '351', teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '111', teacher: 'Чернигин М.А.', lesson: 'Современные информационные технологии 2 гр.', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '151', teacher: 'Чернигин М.А.', lesson: 'Современные информационные технологии 2 гр.', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '111', teacher: 'Иванова А.С.', lesson: 'Информационные технологии и программирование 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '311', teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '311', teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '231', teacher: 'Папшев С.В.', lesson: 'Языки программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '231', teacher: 'Грищенко А.А.', lesson: 'Языки программирования 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '151', teacher: 'Соловьёв В.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '211', teacher: 'Иванова А.С.', lesson: 'Компьютерная графика 2 гр.', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '141', teacher: 'Букушева А.В.', lesson: 'Разработка пользовательского интерфейса 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '141', teacher: 'Кабанова Л.В.', lesson: 'Разработка пользовательского интерфейса 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '211', teacher: 'Батраева И.А', lesson: 'Компьютерная графика 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '311', teacher: 'Богомолов А.С.', lesson: 'Стандартизация программного обеспечения 1 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '311', teacher: 'Хамутова М.В.', lesson: 'Стандартизация программного обеспечения 2 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '351', teacher: 'Богомолов А.С.', lesson: 'Стандартизация программного обеспечения 1 гр.', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '351', teacher: 'Хамутова М.В.', lesson: 'Стандартизация программного обеспечения 2 гр.', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '441', teacher: 'Власов А.А.', lesson: 'Разработка web-приложений', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '331', teacher: 'Сафрончик М.И.', lesson: 'Системы управления базами данных 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '331', teacher: 'Пантелеев Д.С.', lesson: 'Системы управления базами данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '251', teacher: 'Кондратова Ю.Н.', lesson: 'Структуры данных и алгоритмы 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '251', teacher: 'Сафрончик М.И.', lesson: 'Структуры данных и алгоритмы 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '211', teacher: 'Кондратова Ю.Н.', lesson: 'Структуры данных и алгоритмы 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '211', teacher: 'Сафрончик М.И.', lesson: 'Структуры данных и алгоритмы 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '321', teacher: 'Батраева И.А.', lesson: 'Базы данных 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '241', teacher: 'Кудрина Е.В.', lesson: 'Структуры и алгоритмы компьютерной обработки данных 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '241', teacher: 'Булавина Е.В.', lesson: 'Структуры и алгоритмы компьютерной обработки данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '111', teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '111', teacher: 'Романов В.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '173', teacher: 'Кудрина Е.В.', lesson: 'Методика преподавания компьютерных наук', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '1', department: 'КНиИТ', group: '331', teacher: 'Садовников А.В.', lesson: 'Электроника и схемотехника 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '1', department: 'КНиИТ', group: '331', teacher: 'Шещукова С.Е.', lesson: 'Электроника и схемотехника 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '331', teacher: 'Садовников А.В.', lesson: 'Электроника и схемотехника 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '441', teacher: 'Станкевич Е.П.', lesson: 'Моделирование 2 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '429', '429');
template_PolygonFeature([[[2233, 635],[2504, 635],[2504, 373],[2233, 373],[2233, 635]]], '430', '430');
template_PolygonFeature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '431', '431');
template_PolygonFeature([[[1819, 635],[1995, 635],[1995, 373],[1819, 373],[1819, 635]]], '432', '432');

// специальные помещения 
template_PolygonFeature([[[1680, 1465],[1820, 1465],[1820, 1230],[1680, 1230],[1680, 1465]]], 'раздевалка мужская', 'lockerroommale');
template_PolygonFeature([[[1538, 1465], [1677, 1465], [1677, 1230], [1538, 1230], [1538, 1465]]], 'раздевалка женская', 'lockerroomfemale');

const popup = new Overlay({ // всплывающая надпись
    element: document.createElement('div'),  // создаем div-элемент для Popup
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  popup.getElement().className = 'ol-popup'; // добавляем класс для стилизации (в CSS)

const initialCenter = fromLonLat([imageWidth / 2, imageHeight / 2]);

const map = new Map({
target: "map",
    layers: [imageLayer, vectorLayer],
    view: new View({
        projection: proj,
        center: initialCenter,
        zoom: 0, // начальный зум
    }),
});

map.getView().fit(imageExtent); // автоматический подбор масштаба карты

fill_filter();

map.addOverlay(popup);

// состояние для хранения текущего выделенного объекта
let highlightedFeature = null;

map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }

    const pixel = map.getEventPixel(evt.originalEvent);
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(pixel) ? 'pointer' : '';

    const features = [];
    map.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
    });

    // Сбрасываем стиль с предыдущего выделенного объекта
    if (highlightedFeature && !features.includes(highlightedFeature)) {
        highlightedFeature.setStyle(defaultStyle);
        highlightedFeature = null;
    }

    let featureToShowPopup = null;
    features.forEach(feature => {
        if (feature) {
            feature.setStyle(highlightStyle);
            highlightedFeature = feature;
            featureToShowPopup = feature;
        }
    });


    // Отображаем Popup (если есть объект под курсором)
    if (featureToShowPopup) {
        const coordinate = evt.coordinate;
        popup.getElement().innerHTML = featureToShowPopup.get('description');
        popup.setPosition(coordinate);
    } else {
        popup.setPosition(undefined);
    }
});

let openModal = null; // глобальная переменная для отслеживания открытого расписания

map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) { return feature; });

    if (feature) {
        const description = feature.get('description');
        const schedule = feature.get('schedule');

        // Закрываем текущее открытое модальное окно, если оно есть
        if (openModal) {
            document.body.removeChild(openModal);
            openModal = null; // Сбрасываем openModal после закрытия
        }

        openModal = showScheduleModal(description, schedule, getFilters()); // Передаем все фильтры в функцию
    }
});

function showScheduleModal(description, schedule, filters = {}) {
    const modal = document.createElement('div');
    modal.id = `schedule-modal-${description}`;
    modal.className = 'schedule-menu';

    const filteredSchedule = filterFeatures(description, schedule, filters);

    let modalContent = '';
    if (filteredSchedule && filteredSchedule.length > 0) {
        let tablesHTML = '';

        const scheduleByDay = filteredSchedule.reduce((acc, item) => {
            const day = item.day;
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(item);
            return acc;
        }, {});

        // Создаем таблицу для каждого дня
        for (const day in scheduleByDay) {
            tablesHTML += `
                <div class="schedule-day">
                    <h1>${day}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Номер <br> пары</th>
                                <th>Факультет</th>
                                <th>Группа</th>
                                <th>Преподаватель</th>
                                <th>Пара</th>
                                <th>Тип</th>
                                <th>Чётность</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${scheduleByDay[day].map(item => `<tr><td>${item.number}</td><td>${item.department}</td><td>${item.group}</td><td>${item.teacher}</td><td>${item.lesson}</td><td>${item.type}</td><td>${item.parity}</td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        modalContent = `
            <div class="modal-content">
                <h1>Расписание аудитории <br> ${description}</h1>
                ${tablesHTML}
            </div>
        `;
    } else {
        modalContent = `
            <div class="modal-content">
                <h1>Расписание аудитории <br> ${description}</h1>
                <p>Для данного объекта нет расписания</p>
            </div>
        `;
    }

    modal.innerHTML = modalContent;

    document.body.appendChild(modal);
    return modal;
}

function fill_filter() {
    const filterFields = ['department', 'group', 'teacher', 'lesson', 'type', 'parity'];
    const allSchedules = [];

    vectorSource.getFeatures().forEach(feature => {
        const schedule = feature.get('schedule');
        if (schedule && Array.isArray(schedule)) {
            schedule.forEach(item => allSchedules.push(item));
        }
    });

    filterFields.forEach(field => {
        const selectElement = document.getElementById(`filter-${field}`);
        const uniqueValues = new Set();

        allSchedules.forEach(item => {
            if (item && item[field]) {
                uniqueValues.add(item[field]);
            }
        });

        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    });
}

const applyFiltersButton = document.getElementById('apply-filters');
const filterForm = document.getElementById('filter-form');

// включаем/выключаем кнопку применения фильтров при изменении фильтров
filterForm.addEventListener('change', function () {
    const selectedFilters = Array.from(filterForm.querySelectorAll('select'))
        .some(select => select.value !== "");

    applyFiltersButton.disabled = !selectedFilters;
});

// Обработчик для кнопки "Применить фильтры"
applyFiltersButton.addEventListener('click', function () {
    apply_filter();
});

function apply_filter() {
    // Собираем значения фильтров из формы
    const filters = getFilters();

    // Получаем description и schedule объекта, который сейчас открыт
    if (openModal) {
        const description = openModal.id.replace('schedule-modal-', '');
        const feature = polygonFeatures.get(description);
        const schedule = feature.get('schedule');

        // Закрываем старое окно
        document.body.removeChild(openModal);

        // Открываем новое окно с фильтрами
        openModal = showScheduleModal(description, schedule, filters);
    }
}

function getFilters() {
    const filters = {};

    // Собираем значения фильтров из формы
    document.querySelectorAll('#filter-form select').forEach(select => {
        const filterName = select.id.replace('filter-', '');
        const selectedValue = select.value;
        if (selectedValue) {
            filters[filterName] = selectedValue;
        }
    });

    return filters;
}

function filterFeatures(description, schedule, filters) {
    if (!schedule || schedule.length === 0) {
        return []; // Если расписания нет, возвращаем пустой массив
    }

    return schedule.filter(item => {
        for (const filterName in filters) {
            if (item[filterName] !== filters[filterName]) {
                return false;
            }
        }
        return true;
    });
}

document.getElementById('reset-filters').addEventListener('click', function () { // настройка кнопки сброса фильтров
    document.querySelectorAll('#filter-form select').forEach(select => {
        select.value = "";
    });
    applyFiltersButton.disabled = true; // блокирует кнопку сброса
    filterFeatures({}); // сбрасываем фильтры

});