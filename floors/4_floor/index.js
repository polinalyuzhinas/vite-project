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

function template_PolygonFeature(coordinates, description, schedule=[], featureID) { // создает объект OpenLayers Feature по координатам, описанию и ID и сохраняет его в словаре 
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
template_PolygonFeature([[[178, 1949],[686, 1949],[686, 1551],[178, 1551],[178, 1949]]], '411 (конференц-зал экономического факультета)',
     [{ day: 'Среда', number: '5', department: 'фКНиИТ', group: '131, 132', teacher: 'Алексеева Д.А.', lesson: 'Основы теории изучаемого языка (переводчики)', type: 'лек.', parity: '-'}], '411');

template_PolygonFeature([[[318, 1546],[492, 1546],[492, 1429],[318, 1429],[318, 1546]]], '410', '410');

template_PolygonFeature([[[239, 1409],[306, 1409],[306, 1325],[239, 1325],[239, 1409]]], '300 (находится между 3 и 4 этажами)',
    [{ day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '331, 311', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр. ', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '132', teacher: 'Грищенко А.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'фКНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 1 гр.', type: 'пр.', parity: '-'}],'300');

template_PolygonFeature([[[178, 1320],[475, 1320],[475, 987],[178, 987],[178, 1320]]], '409 (деканат экономического факультета, заочное отделение)', '409');
template_PolygonFeature([[[178, 983],[475, 983],[475, 785],[178, 785],[178, 983]]], '408 (деканат экономического факультета, дневное отделение)', '408');
template_PolygonFeature([[[178, 782],[475, 782],[475, 685],[178, 685],[178, 782]]], '407 (серверная)', '407');
template_PolygonFeature([[[178, 682],[475, 682],[475, 481],[178, 481],[178, 682]]], '406 (научно-образовательный центр экономического факультета)', '406');
template_PolygonFeature([[[178, 478],[475, 478],[475, 610],[633, 610],[633, 374],[511, 374],[511, 255],[178, 255],[178, 478]]], '405 (деканат экономического факультета)', '405');

template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '413 (учебная лаборатория Базальт СПО)', 
    [{ day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '421', teacher: 'Синельников Е.А.', lesson: 'Системы реального времени 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '231', teacher: 'Дмитриев П.О.', lesson: 'Компьютерные сети 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: 'фКНиИТ', group: '531', teacher: 'Новиков В.Е.', lesson: 'Введение в криптоанализ 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: 'фКНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '5', department: 'фКНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: 'фКНиИТ', group: '231', teacher: 'Баталин В.В.', lesson: 'Компьютерные сети 1 гр.', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '3', department: 'фКНиИТ', group: '231', teacher: 'Баталин В.В.', lesson: 'Компьютерные сети 2 гр.', type: 'лек.', parity: '-'}], '413');

template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '414 (учебная лаборатория Совкомбанк)',
    [{ day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '421', teacher: 'Тананко И.Е.', lesson: 'Моделирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '121', teacher: 'Латышева Е.В.', lesson: 'Инженерная графика 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Сафрончик М.И.', lesson: 'Системы управления базами данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '131', teacher: 'Сафрончик М.И.', lesson: 'Информационные технологии и программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'фКНиИТ', group: '331', teacher: 'Кондратова Ю.Н.', lesson: 'Методы программирования 3 гр.', type: 'пр.', parity: '-'}], '414');

template_PolygonFeature([[[1247, 1097],[1458, 1097],[1458, 778],[1247, 778],[1247, 1097]]], '415 (учебная лаборатория искусственного интеллекта, машинного обучения)',
    [{ day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '431', teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '131', teacher: 'Романов В.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'фКНиИТ', group: '231', teacher: 'Грищенко А.А.', lesson: 'Языки программирования 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: 'фКНиИТ', group: '531', teacher: 'Новиков В.Е.', lesson: 'Введение в криптоанализ 1 гр.', type: 'пр.', parity: '-'}], '415');

template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '404', '404');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '403 (компьютерный класс экономического факультета)', '403');

template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '402 (компьютерный класс экономического факультета)', [
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр. ', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '431, 441, 421, 411, 451', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'фКНиИТ', group: '431, 441, 421, 411, 451', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'фКНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр. ', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Алексеева Д.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'}], '402');

template_PolygonFeature([[[1364, 635],[1518, 635],[1518, 373],[1364, 373],[1364, 635]]], '401 (учебная лаборатория информационных технологий в экономике)', '401');
template_PolygonFeature([[[1521, 635],[1816, 635],[1816, 373],[1521, 373],[1521, 635]]], '433/434', '433');

// аудитории правого крыла
template_PolygonFeature([[[2894, 1948],[3315, 1948],[3315, 1719],[2894, 1719], [2894, 1948]]], '420',
    [{ day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '241, 321, 381, 431', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '531', teacher: 'Бгашев М.В.', lesson: 'Основы управленческой деятельности', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '531', teacher: 'Бгашев М.В.', lesson: 'Основы управленческой деятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Иванова Д.Н.', lesson: 'Теория перевода (переводчики)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '121, 141', teacher: 'Матвеева Ю.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '431', teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'фКНиИТ', group: '231', teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Каретникова Т.А.', lesson: 'Электротехника, электроника и схемотехника ЭВМ', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '3', department: 'фКНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '4', department: 'фКНиИТ', group: '231', teacher: 'Папшев С.В.', lesson: 'Языки программирования', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Андросов И.А.', lesson: 'Методы программирования', type: 'лек.', parity: '-'},], '420');

template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '422 (образовательный центр <br> непрерывной подготовки <br> IT-специалистов)', '422');
template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '423', '423');

template_PolygonFeature([[[2894, 1550],[3310, 1550],[3310, 1320],[2894, 1320],[2894, 1550]]], '424',
    [{ day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Исайкина М.А.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '311, 341, 351', teacher: 'Чистопольская Е.В.', lesson: 'Управление ИТ-проектами (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '141', teacher: 'Хворостухина Е.В.', lesson: 'Линейная алгебра и приложения', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '141', teacher: 'Хворостухина Е.В.', lesson: 'Линейная алгебра и приложения', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Исайкина М.А.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '111, 151, 181', teacher: 'Сахно Л.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '151, 181', teacher: 'Сахно Л.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'фКНиИТ', group: '131, 132', teacher: 'Абросимов М.Б.', lesson: 'Введение в специальность', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '5', department: 'фКНиИТ', group: '231', teacher: 'Павлова О.В.', lesson: 'Основы литературного редактирования (переводчики)', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 8 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: 'фКНиИТ', group: '131, 132', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'лек.', parity: 'чис.'},
    { day: 'Пятница', number: '5', department: 'фКНиИТ', group: '131', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '5', department: 'фКНиИТ', group: '132', teacher: 'Шаповалова Н.Г.', lesson: 'Русский язык и культура речи', type: 'пр.', parity: 'чис.'},
    { day: 'Суббота', number: '3', department: 'фКНиИТ', group: '431', teacher: 'Пыжонков С.В.', lesson: 'Организация деятельности переводчика (1, 15, 22 марта, переводчики)', type: 'лек.', parity: '-'}], '424');

template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '426', 
    [{ day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '181', teacher: 'Грецова А.П.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '181', teacher: 'Грецова А.П.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '481', teacher: 'Станкевич Е.П.', lesson: 'Моделирование телекоммуникационных систем и компьютерных сетей', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '481', teacher: 'Тананко И.Е.', lesson: 'Методы и средства измерения систем', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '6', department: 'фКНиИТ', group: '341', teacher: 'Андрейченко Д.К.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'фКНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Уколова М.А.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: 'фКНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 3 гр.', type: 'пр.', parity: '-'}], '426');

template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '427 (кафедра финансов <br> и кредита)', '427');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '428 (кафедра <br> экономической теории и <br> национальной экономики)', '428');

template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '418 (компьютерный класс факультета КНиИТ)',  
    [{ day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '111', teacher: 'Крючкова А.А.', lesson: 'Современные информационные технологии 1 гр.', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '151', teacher: 'Крючкова А.А.', lesson: 'Современные информационные технологии 1 гр.', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '331', teacher: 'Андросов И.А.', lesson: 'Методы программирования 2 гр.', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '331', teacher: 'Кондратова Ю.Н.', lesson: 'Методы программирования 1 гр.', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'фКНиИТ', group: '132', teacher: 'Соловьёв В.М.', lesson: 'Информационные технологии и программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '131', teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '131', teacher: 'Карташов Ф.С.', lesson: 'Аппаратные средства вычислительной техники 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '131', teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники 1 гр.', type: 'пр.', parity: '-'}], '418');

template_PolygonFeature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '417 (лаборатория системного программирования)', '417');

template_PolygonFeature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '416 (компьютерный класс факультета КНиИТ)',
    [{ day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '351', teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '351', teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '111', teacher: 'Чернигин М.А.', lesson: 'Современные информационные технологии 2 гр.', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '151', teacher: 'Чернигин М.А.', lesson: 'Современные информационные технологии 2 гр.', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '1', department: 'фКНиИТ', group: '111', teacher: 'Иванова А.С.', lesson: 'Информационные технологии и программирование 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '231', teacher: 'Папшев С.В.', lesson: 'Языки программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'фКНиИТ', group: '231', teacher: 'Грищенко А.А.', lesson: 'Языки программирования 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'фКНиИТ', group: '151', teacher: 'Соловьёв В.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: 'фКНиИТ', group: '331', teacher: 'Сафрончик М.И.', lesson: 'Системы управления базами данных 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: 'фКНиИТ', group: '331', teacher: 'Пантелеев Д.С.', lesson: 'Системы управления базами данных 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '132', teacher: 'Карташов Ф.С.', lesson: 'Аппаратные средства вычислительной техники 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '132', teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '1', department: 'фКНиИТ', group: '331', teacher: 'Садовников А.В.', lesson: 'Электроника и схемотехника 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '1', department: 'фКНиИТ', group: '331', teacher: 'Шещукова С.Е.', lesson: 'Электроника и схемотехника 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Садовников А.В.', lesson: 'Электроника и схемотехника 2 гр.', type: 'пр.', parity: '-'}], '416');

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

map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) { return feature; });

    if (feature && feature.get('schedule') && feature.get('schedule').length > 0) {
        const schedule = feature.get('schedule');
        if (schedule && schedule.length > 0) {
            showScheduleModal(feature.get('description'), schedule); // Вызов функции для отображения модального окна
        }
    }
    else {

    }
});


function showScheduleModal(description, schedule) {
    const modal = document.createElement('div');
    modal.id = `schedule-modal-${description}`;
    modal.className = 'schedule-menu';
    const scheduleByDay = schedule.reduce((acc, item) => {
        const day = item.day;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(item);
        return acc;
    }, {});

    let tablesHTML = '';

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


    modal.innerHTML = `
        <div class="modal-content">
            <h1>Расписание аудитории <br> ${description}</h1>
            ${tablesHTML}
            <button class="close-modal">Закрыть</button>
        </div>
    `;

    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
}