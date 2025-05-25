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
        url: 'first_floor.png',
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

function template_PolygonFeature(coordinates, description, featureID, schedule = []) { // создает объект OpenLayers Feature по координатам, описанию и ID и сохраняет его в словаре
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
template_PolygonFeature([[[1500, 1085],[1626, 1085],[1626, 1004],[1500, 1004],[1500, 1085]]], 'центральная лестница', 'centralstairs1');
template_PolygonFeature([[[1628, 1002],[1743, 1002],[1743, 873],[1628, 873],[1628, 1002]]], 'центральная лестница', 'centralstairs2');
template_PolygonFeature([[[1743, 1085],[1869, 1085],[1869, 1002],[1743, 1002],[1743, 1085]]], 'центральная лестница', 'centralstairs3');
template_PolygonFeature([[[2494, 1063],[2637, 1063],[2637, 994],[2494, 994],[2494, 1063]]], 'лестница', 'rightstairs');
template_PolygonFeature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_PolygonFeature([[[737, 1060],[876, 1060],[876, 992],[737, 992],[737, 1060]]], 'лестница', 'leftstairs');
template_PolygonFeature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_PolygonFeature([[[62, 1466],[134, 1466],[134, 1398],[62, 1398],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');
template_PolygonFeature([[[1928, 1382],[2043, 1382],[2043, 1292],[1928, 1292],[1928, 1382]]], 'лестница к спортзалу', 'gymstairs');
template_PolygonFeature([[[549, 496],[620, 496],[620, 221],[549, 221],[549, 496]]], 'лестница к гардеробу', 'closetstairs1');
template_PolygonFeature([[[2760, 499],[2831, 499],[2831, 223],[2760, 223],[2760, 499]]], 'лестница к гардеробу', 'closetstairs2');
template_PolygonFeature([[[343, 1070],[382, 1070],[382, 931],[343, 931],[343, 1070]]], 'лестница', 'emergencyexitstairs');
template_PolygonFeature([[[1481, 104],[1887, 104],[1887, 4],[1481, 4],[1481, 104]]], 'лестница ко входу в корпус', 'entrancestairs');
template_PolygonFeature([[[1457, 617],[1914, 617],[1914, 578],[1457, 578],[1457, 617]]], 'лестница', 'precentralstairs1');
template_PolygonFeature([[[1464, 799],[1907, 799],[1907, 739],[1464, 739],[1464, 799]]], 'лестница', 'precentralstairs2');
template_PolygonFeature([[[1458, 1397],[1595, 1397],[1595, 1352],[1458, 1352],[1458, 1397]]], 'лестница к актовому залу', 'assemblyhallstairs1');
template_PolygonFeature([[[1780, 1397],[1915, 1397],[1915, 1350],[1780, 1350],[1780, 1397]]], 'лестница к актовому залу', 'assemblyhallstairs2');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет мужской', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет женский', 'toilet2');

// аудитории левого крыла
template_PolygonFeature([[[178, 1949], [686, 1949], [686, 1551], [178, 1551], [178, 1949]]], '110 (лекционная аудитория им. Р. Х. Тугушева)', '110',
    [{ day: 'Понедельник', number: '2', department: ['Психологии'], group: ['161'], teacher: 'Зинченко Е.М.', lesson: 'Зоопсихология и сравнительная психология', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: ['Психологии'], group: ['162'], teacher: 'Зинченко Е.М.', lesson: 'Зоопсихология и сравнительная психология', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: ['Психологии'], group: ['161', '162'], teacher: 'Зинченко Е.М.', lesson: 'Зоопсихология и сравнительная психология', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Психологии'], group: ['161', '162'], teacher: 'Калистратов П.Ю.', lesson: 'Педагогическая психология', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['Психологии'], group: ['161', '162'], teacher: 'Калистратов П.Ю.', lesson: 'Педагогическая психология', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['Психологии'], group: ['261'], teacher: 'Лазунина Е.А.', lesson: 'Эмоционально-волевая регуляция деятельности', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['Психологии'], group: ['361', '362'], teacher: 'Чернышова Г.Ю.', lesson: 'Использование методов машинного обучения в управлении профессиональной деятельностью (цифровая кафедра)', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['Психологии'], group: ['161'], teacher: 'Мозговая О.С.', lesson: 'История России', type: 'пр.', parity: 'чис.' },
    { day: 'Вторник', number: '2', department: ['Психологии'], group: ['162'], teacher: 'Мозговая О.С.', lesson: 'История России', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: ['Психологии'], group: ['161', '162'], teacher: 'Мозговая О.С.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Психологии'], group: ['161'], teacher: 'Иванов А.В.', lesson: 'Философия', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '4', department: ['Психологии'], group: ['162'], teacher: 'Иванов А.В.', lesson: 'Философия', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '4', department: ['Психологии'], group: ['161', '162'], teacher: 'Иванов А.В.', lesson: 'Философия', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Психологии'], group: ['161'], teacher: 'Иванов А.В.', lesson: 'Философия', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '5', department: ['Психологии'], group: ['162'], teacher: 'Иванов А.В.', lesson: 'Философия', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '2', department: ['Психологии'], group: ['161', '162'], teacher: 'Кубракова Н.А.', lesson: 'Иностранный язык', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Психологии'], group: ['161', '162'], teacher: 'Кубракова Н.А.', lesson: 'Иностранный язык', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: ['Психологии'], group: ['361', '362'], teacher: 'Романова Н.М.', lesson: 'Психология девиантного и криминального поведения', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['Психологии'], group: ['361'], teacher: 'Романова Н.М.', lesson: 'Психология девиантного и криминального поведения', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: ['Психологии'], group: ['261'], teacher: 'Лазунина Е.А.', lesson: 'Эмоционально-волевая регуляция деятельности', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: ['Психологии'], group: ['161'], teacher: 'Саранцева Е.И.', lesson: 'Физиология высшей нервной деятельности', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '1', department: ['Психологии'], group: ['162'], teacher: 'Саранцева Е.И.', lesson: 'Физиология высшей нервной деятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: ['Психологии'], group: ['161'], teacher: 'Саранцева Е.И.', lesson: 'Физиология высшей нервной деятельности', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '2', department: ['Психологии'], group: ['162'], teacher: 'Саранцева Е.И.', lesson: 'Физиология высшей нервной деятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: ['Психологии'], group: ['161', '162'], teacher: 'Саранцева Е.И.', lesson: 'Физиология высшей нервной деятельности', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Психологии'], group: ['161', '162'], teacher: 'Калистратов П.Ю.', lesson: 'Введение в психологию развития и возрастную психологию', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['161', '162'], teacher: 'Воронова Е.Н.', lesson: 'Иностранный язык', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['161', '162'], teacher: 'Воронова Е.Н.', lesson: 'Иностранный язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '1', department: ['Психологии'], group: ['261', '262'], teacher: 'Кирьяшкин В.В.', lesson: 'Введение в информационные технологии', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['Психологии'], group: ['161'], teacher: 'Зинченко Е.М.', lesson: 'Основы психогенетики', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '2', department: ['Психологии'], group: ['162'], teacher: 'Зинченко Е.М.', lesson: 'Основы психогенетики', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '3', department: ['Психологии'], group: ['161', '162'], teacher: 'Зинченко Е.М.', lesson: 'Основы психогенетики', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Психологии'], group: ['161', '162'], teacher: 'Пантелеев А.Ф.', lesson: 'Сенсорно-перцептивная сфера личности и внимание', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['161', '162'], teacher: 'Пантелеев А.Ф.', lesson: 'Сенсорно-перцептивная сфера личности и внимание', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '4', department: ['Психологии'], group: ['161'], teacher: 'Мовсисян Г.С.', lesson: 'Математическая статистика', type: 'пр.', parity: 'чис.'},
    { day: 'Суббота', number: '4', department: ['Психологии'], group: ['162'], teacher: 'Мовсисян Г.С.', lesson: 'Математическая статистика', type: 'пр.', parity: 'знам.'},
    { day: 'Суббота', number: '4', department: ['Психологии'], group: ['161'], teacher: 'Мовсисян Г.С.', lesson: 'Математическая статистика', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '5', department: ['Психологии'], group: ['161'], teacher: 'Мовсисян Г.С.', lesson: 'Математическая статистика', type: 'пр.', parity: 'чис.'},
    { day: 'Суббота', number: '5', department: ['Психологии'], group: ['162'], teacher: 'Мовсисян Г.С.', lesson: 'Математическая статистика', type: 'пр.', parity: 'знам.'},]);

template_PolygonFeature([[[318, 1546],[505, 1546],[505, 1419],[318, 1419],[318, 1546]]], '109 (полиграфическая лаборатория)', '109');
template_PolygonFeature([[[183, 1316], [478, 1316], [478, 1194], [183, 1194], [183, 1316]]], '108 (кафедра психологии личности)', '108');

template_PolygonFeature([[[183, 1190], [478, 1190], [478, 1073], [183, 1073], [183, 1190]]], '107 (кафедра социальной психологии)', '107',
    [{ day: 'Вторник', number: '3', department: ['Психологии'], group: ['362'], teacher: 'Киселев К.А.', lesson: 'Психология девиантного и криминального поведения', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: ['Психологии'], group: ['268'], teacher: 'Романова Н.М.', lesson: 'Экспертиза психологического воздействия в судебной практике', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '7', department: ['Психологии'], group: ['268'], teacher: 'Романова Н.М.', lesson: 'Экспертиза психологического воздействия в судебной практике', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: ['Психологии'], group: ['361', '362'], teacher: 'Киселев К.А.', lesson: 'Актуальные проблемы теоретической психологии', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['Психологии'], group: ['361'], teacher: 'Киселев К.А.', lesson: 'Актуальные проблемы теоретической психологии', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Бисенгалиев Р.С.', lesson: 'Управленческое консультирование и коучинг', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '6', department: ['Психологии'], group: ['265'], teacher: 'Романова Н.М.', lesson: 'Научно-исследовательская работа', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Бисенгалиев Р.С.', lesson: 'Управленческое консультирование и коучинг', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '7', department: ['Психологии'], group: ['265'], teacher: 'Романова Н.М.', lesson: 'Научно-исследовательская работа', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '6', department: ['Психологии'], group: ['268'], teacher: 'Романова Н.М.', lesson: 'Экспертиза психологического воздействия в судебной практике', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '7', department: ['Психологии'], group: ['268'], teacher: 'Романова Н.М.', lesson: 'Экспертиза психологического воздействия в судебной практике', type: 'пр.', parity: '-' },    ]);


template_PolygonFeature([[[180, 931],[478, 931],[478, 630],[180, 630],[180, 931]]], '105/106 (деканат факультета психологии)', '105');
template_PolygonFeature([[[180, 627],[478, 627],[478, 374],[511, 374],[511, 249],[180, 249],[180, 627]]], '104 (деканат факультета психологии, заместители декана, секретарь)', '104');
template_PolygonFeature([[[886, 1097],[1062, 1097],[1062, 778],[886, 778],[886, 1097]]], '112 (совет студентов факультета психологии)', '112');

template_PolygonFeature([[[1067, 1097],[1241, 1097],[1241, 778],[1067, 778],[1067, 1097]]], '113 (аудитория им. А.А. Понукалина, тренинг-зал)', '113', 
    [{ day: 'Понедельник', number: '4', department: ['Психологии'], group: ['461'], teacher: 'Гоголь С.С.', lesson: 'Социальная психология личности', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Аксеновская Л.Н.', lesson: 'Ордерный подход к управлению организационной структурой', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Аксеновская Л.Н.', lesson: 'Ордерный подход к управлению организационной структурой', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['Психологии'], group: ['161'], teacher: 'Гришкова А.А.', lesson: 'Русский язык', type: 'лек./пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['Психологии'], group: ['162'], teacher: 'Генералова Н.П.', lesson: 'Немецкий язык', type: 'лек./пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['Психологии'], group: ['362'], teacher: 'Малюченко Г.Н.', lesson: 'Основы психотехнологии тренинга', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['Психологии'], group: ['167'], teacher: 'Черняева Т.И.', lesson: 'Тренинг межкультурной коммуникации', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['Психологии'], group: ['265'], teacher: 'Киселев К.А.', lesson: 'Психолого-педагогическая коррекция, психотерапия и психопрофилактика девиантного поведения', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Психологии'], group: ['167'], teacher: 'Черняева Т.И.', lesson: 'Тренинг межкультурной коммуникации', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Психологии'], group: ['265'], teacher: 'Киселев К.А.', lesson: 'Психолого-педагогическая коррекция, психотерапия и психопрофилактика девиантного поведения', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Куликов И.В.', lesson: 'Управленческое консультирование и коучинг', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Куликов И.В.', lesson: 'Управленческое консультирование и коучинг', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['362'], teacher: 'Куликов И.В.', lesson: 'Социальная психология организационной культуры', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['361'], teacher: 'Куликов И.В.', lesson: 'Социальная психология организационной культуры', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['361', '362'], teacher: 'Куликов И.В.', lesson: 'Социальная психология организационной культуры', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Бисенгалиев Р.С.', lesson: 'Психотехнология групповой работы', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Понукалин А.А.', lesson: 'Психология управления персоналом', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Бисенгалиев Р.С.', lesson: 'Психотехнология групповой работы', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Понукалин А.А.', lesson: 'Психология управления персоналом', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '4', department: ['Психологии'], group: ['361', '362'], teacher: 'Южанинова А.Л.', lesson: 'Психология общения', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['361'], teacher: 'Южанинова А.Л.', lesson: 'Психология общения', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['362'], teacher: 'Южанинова А.Л.', lesson: 'Психология общения', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['163'], teacher: 'Смирнова А.Ю.', lesson: 'Теория организации', type: 'лек.', parity: 'чис.'},
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['163'], teacher: 'Смирнова А.Ю.', lesson: 'Психология менеджмента', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Смирнова А.Ю.', lesson: 'Теория организации', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Смирнова А.Ю.', lesson: 'Психология менеджмента', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '6', department: ['Психологии'], group: ['164'], teacher: 'Малюченко Г.Н.', lesson: 'Психология конфликта: способы консультативной и психокоррекционной работы', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Смирнова А.Ю.', lesson: 'Теория организации', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Смирнова А.Ю.', lesson: 'Психология менеджмента', type: 'пр.', parity: 'знам.'},]);

template_PolygonFeature([[[1245, 1097],[1458, 1097],[1458, 778],[1245, 778],[1245, 1097]]], '114 (кафедра философии и методологии науки)', '114', 
    [{ day: 'Понедельник', number: '5', department: ['Философский'], group: ['341', '351'], teacher: 'Шилова М.А.', lesson: 'Методика обучения и воспитания основам православной культуры, включая вопросы педагогического общения (педагогической риторики)', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '6', department: ['Философский'], group: ['341', '351'], teacher: 'Шилова М.А.', lesson: 'Методика обучения и воспитания основам православной культуры, включая вопросы педагогического общения (педагогической риторики)', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['141', '151'], teacher: 'Ручин В.А.', lesson: 'Введение в патрологию', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['141', '151'], teacher: 'Ручин В.А.', lesson: 'Введение в патрологию', type: 'лек.', parity: 'знам.'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['141', '151'], teacher: 'Шилова М.А.', lesson: 'Введение в конфессиональное религиоведение', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['141', '151'], teacher: 'Шилова М.А.', lesson: 'Введение в конфессиональное религиоведение', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['241'], teacher: 'Гурин С.П.', lesson: 'История христианского вероучения (до апреля)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['251'], teacher: 'Гурин С.П.', lesson: 'Догматическое богословие (до апреля)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Философский'], group: ['291'], teacher: 'Гурин С.П.', lesson: 'Практическая теология', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '8', department: ['Философский'], group: ['291'], teacher: 'Гурин С.П.', lesson: 'Практикум по оформлению научных работ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['241', '251'], teacher: 'Штокгамер Е.Д.', lesson: 'История и современность церковно-государственных отношений', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['241', '251'], teacher: 'Штокгамер Е.Д.', lesson: 'История и современность церковно-государственных отношений', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['341', '351'], teacher: 'Шилова М.А.', lesson: 'Церковнославянский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['351'], teacher: 'Шилова М.А.', lesson: 'Литургическое богословие', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['351'], teacher: 'Шилова М.А.', lesson: 'Литургическое богословие', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['241', '251'], teacher: 'Ручин В.А.', lesson: 'Патрология V-VIII вв.', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['241', '251'], teacher: 'Ручин В.А.', lesson: 'Патрология V-VIII вв.', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['151'], teacher: 'Штокгамер Е.Д.', lesson: 'Кураторский час', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['141', '151'], teacher: 'Гущин Я.Д.', lesson: 'Проектная деятельность в цифровой среде', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['241', '251'], teacher: 'Шилова М.А.', lesson: 'Церковнославянский язык', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['251'], teacher: 'Шилова М.А.', lesson: 'Литургика', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['251'], teacher: 'Шилова М.А.', lesson: 'Литургика', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['241', '251'], teacher: 'Шаткин М.А.', lesson: 'Философия религии', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Философский'], group: ['241', '251'], teacher: 'Шаткин М.А.', lesson: 'Философия религии', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[632, 631],[882, 631],[882, 373],[632, 373],[632, 631]]], '103 (лекционная аудитория им. Л.П. Доблаева, <br> комната истории психологии)', '103',
    [{ day: 'Понедельник', number: '2', department: ['Психологии'], group: ['361'], teacher: 'Малюченко Г.Н.', lesson: 'Основы консультатичной психологии', type: 'пр.', parity: 'чис.' },
    { day: 'Понедельник', number: '2', department: ['Психологии'], group: ['361'], teacher: 'Карелин А.А.', lesson: 'История и методология психологии в XX-XXI вв.', type: 'пр.', parity: 'знам.' },
    { day: 'Понедельник', number: '3', department: ['Психологии'], group: ['361'], teacher: 'Малюченко Г.Н.', lesson: 'Основы консультатичной психологии', type: 'пр.', parity: 'чис.' },
    { day: 'Понедельник', number: '3', department: ['Психологии'], group: ['361'], teacher: 'Карелин А.А.', lesson: 'История и методология психологии в XX-XXI вв.', type: 'пр.', parity: 'знам.' },
    { day: 'Понедельник', number: '4', department: ['Психологии'], group: ['262'], teacher: 'Разогреева В.С.', lesson: 'Эмоционально-волевая регуляция деятельности', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '6', department: ['Психологии'], group: ['251'], teacher: 'Карелин А.А.', lesson: 'Технология нейролингвистичекого программирования', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '7', department: ['Психологии'], group: ['251'], teacher: 'Карелин А.А.', lesson: 'Технология нейролингвистичекого программирования', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '8', department: ['Психологии'], group: ['251'], teacher: 'Карелин А.А.', lesson: 'Технология нейролингвистичекого программирования', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['Психологии'], group: ['261'], teacher: 'Аранович Л.М.', lesson: 'Основы социальной психологии', type: 'пр.', parity: 'чис.' },
    { day: 'Вторник', number: '2', department: ['Психологии'], group: ['262'], teacher: 'Аранович Л.М.', lesson: 'Основы социальной психологии', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: ['Психологии'], group: ['261'], teacher: 'Аранович Л.М.', lesson: 'Основы социальной психологии', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '3', department: ['Психологии'], group: ['262'], teacher: 'Аранович Л.М.', lesson: 'Основы социальной психологии', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '5', department: ['Психологии'], group: ['163', '164', '167'], teacher: 'Воронова Е.Н.', lesson: 'Профессиональный английский язык', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: ['Психологии'], group: ['251', '264'], teacher: 'Карелин А.А.', lesson: 'Возрастно-психологическое консультирование', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '7', department: ['Психологии'], group: ['251'], teacher: 'Карелин А.А.', lesson: 'Возрастно-психологическое консультирование', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: ['Психологии'], group: ['261'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '2', department: ['Психологии'], group: ['262'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '3', department: ['Психологии'], group: ['261'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '3', department: ['Психологии'], group: ['262'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '4', department: ['Психологии'], group: ['261', '262'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Психологии'], group: ['261', '262'], teacher: 'Белоконь М.В.', lesson: 'Разработка программного обеспечения в профессиональной деятельности психолога', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Психологии'], group: ['261', '262'], teacher: 'Аксеновская Л.Н.', lesson: 'Основы социальной психологии', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['461', '462'], teacher: 'Петрова Л.Г.', lesson: 'Основы психологического просвещения', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['461', '462'], teacher: 'Петрова Л.Г.', lesson: 'Основы психологического просвещения', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['164'], teacher: 'Карелин А.А.', lesson: 'Психодиагностика в психологическом консультировании', type: 'лек./пр.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['Психологии'], group: ['164'], teacher: 'Карелин А.А.', lesson: 'Психологическое консультирование в образовании', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['Психологии'], group: ['164'], teacher: 'Карелин А.А.', lesson: 'Психоаналитический подход в психологическом консультировании', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '7', department: ['Психологии'], group: ['164'], teacher: 'Карелин А.А.', lesson: 'Психологическое консультирование в образовании', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: ['Психологии'], group: ['164'], teacher: 'Карелин А.А.', lesson: 'Психоаналитический подход в психологическом консультировании', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['Психологии'], group: ['261', '262'], teacher: 'Пантелеев А.Ф.', lesson: 'Эмоционально-волевая регуляция деятельности', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['Психологии'], group: ['261', '262'], teacher: 'Пантелеев А.Ф.', lesson: 'Эмоционально-волевая регуляция деятельности', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Психологии'], group: ['261'], teacher: 'Смирнова А.Ю.', lesson: 'Количественные методы в психологии', type: 'лек.', parity: 'чис.'},
    { day: 'Пятница', number: '4', department: ['Психологии'], group: ['262'], teacher: 'Смирнова А.Ю.', lesson: 'Количественные методы в психологии', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '6', department: ['Психологии'], group: ['265'], teacher: 'Киселев К.А.', lesson: 'Психолого-педагогическая коррекция, психотерапия и психопрофилактика девиантного поведения', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '7', department: ['Психологии'], group: ['265'], teacher: 'Киселев К.А.', lesson: 'Психолого-педагогическая коррекция, психотерапия и психопрофилактика девиантного поведения', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['Психологии'], group: ['261', '262'], teacher: 'Каткова М.В.', lesson: 'Мифология и религиоведение', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['Психологии'], group: ['361', '362'], teacher: 'Смирнова А.Ю.', lesson: 'Безопасность жизнедеятельности и психология безопасности', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: ['Психологии'], group: ['261'], teacher: 'Каткова М.В.', lesson: 'Мифология и религиоведение', type: 'пр.', parity: 'чис.' },
    { day: 'Суббота', number: '4', department: ['Психологии'], group: ['262'], teacher: 'Каткова М.В.', lesson: 'Мифология и религиоведение', type: 'пр.', parity: 'знам.' },
    { day: 'Суббота', number: '4', department: ['Психологии'], group: ['361', '362'], teacher: 'Смирнова А.Ю.', lesson: 'Безопасность жизнедеятельности и психология безопасности', type: 'пр.', parity: '-' },]);

template_PolygonFeature([[[885, 631],[1135, 631],[1135, 373],[885, 373],[885, 631]]], '102 (лекционная аудитория им. А.А. Крогиуса)', '102',
    [{ day: 'Понедельник', number: '2', department: ['Психологии'], group: ['362'], teacher: 'Разогреева В.С.', lesson: 'История и методология психологии XX-XXI вв.', type: 'пр.', parity: 'чис.' },
    { day: 'Понедельник', number: '2', department: ['Психологии'], group: ['362'], teacher: 'Малюченко Г.Н.', lesson: 'Основы консультативной психологии', type: 'пр.', parity: 'знам' },
    { day: 'Понедельник', number: '3', department: ['Психологии'], group: ['362'], teacher: 'Разогреева В.С.', lesson: 'История и методология психологии XX-XXI вв.', type: 'пр.', parity: 'чис.' },
    { day: 'Понедельник', number: '3', department: ['Психологии'], group: ['362'], teacher: 'Малюченко Г.Н.', lesson: 'Основы консультативной психологии', type: 'пр.', parity: 'знам' },
    { day: 'Понедельник', number: '4', department: ['Психологии'], group: ['361', '362'], teacher: 'Фролова С.В.', lesson: 'История и методология психологии XX-XXI вв.', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '4', department: ['Психологии'], group: ['361', '362'], teacher: 'Фролова С.В.', lesson: 'Основы консультатиной психологии', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '5', department: ['Психологии'], group: ['361', '362'], teacher: 'Фролова С.В.', lesson: 'История и методология психологии XX-XXI вв.', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '5', department: ['Психологии'], group: ['361', '362'], teacher: 'Фролова С.В.', lesson: 'Основы консультатиной психологии', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '1', department: ['Психологии'], group: ['161'], teacher: 'Генералова Н.П.', lesson: 'Немецкий язык', type: 'лек./пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['Психологии'], group: ['361', '362'], teacher: 'Букушева А.В.', lesson: 'Использование библиотек Python в профессиональной деятельности (цифровая кафедра)', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '3', department: ['Психологии'], group: ['461'], teacher: 'Калистратов П.Ю.', lesson: 'Этноконфликтология', type: 'пр.', parity: 'чис.' },
    { day: 'Вторник', number: '4', department: ['Психологии'], group: ['461'], teacher: 'Калистратов П.Ю.', lesson: 'Этноконфликтология', type: 'лек.', parity: 'чис.' },
    { day: 'Вторник', number: '5', department: ['Психологии'], group: ['461', '462'], teacher: 'Романова Н.М.', lesson: 'Психология практической работы юридического психолога', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: ['Психологии'], group: ['163'], teacher: 'Куликов И.В.', lesson: 'Социальная психология организационной культуры', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '7', department: ['Психологии'], group: ['163'], teacher: 'Куликов И.В.', lesson: 'Социальная психология организационной культуры', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: ['Психологии'], group: ['361', '362'], teacher: 'Гребенюк Л.В.', lesson: 'Безопасность жизнедеятельности и психология безопасности', type: 'лек./пр.', parity: '-' },
    { day: 'Среда', number: '3', department: ['Психологии'], group: ['361'], teacher: 'Малюченко Г.Н.', lesson: 'Основы психотехнологии тренинга', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: ['Психологии'], group: ['361'], teacher: 'Малюченко Г.Н.', lesson: 'Основы психотехнологии тренинга', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '5', department: ['Психологии'], group: ['251', '264'], teacher: 'Фролова С.В.', lesson: 'Супервизорский практикум', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '6', department: ['Психологии'], group: ['251'], teacher: 'Фролова С.В.', lesson: 'Супервизорский практикум', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '7', department: ['Психологии'], group: ['251'], teacher: 'Фролова С.В.', lesson: 'Супервизорский практикум', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['Психологии'], group: ['361', '362'], teacher: 'Жижина М.В.', lesson: 'Медиапсихология', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['361'], teacher: 'Жижина М.В.', lesson: 'Медиапсихология', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['362'], teacher: 'Жижина М.В.', lesson: 'Медиапсихология', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['251', '264'], teacher: 'Фролова С.В.', lesson: 'Научно-исследовательская работа', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['Психологии'], group: ['167'], teacher: 'Фролова С.В.', lesson: 'Психология миграции и приверженности стране', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['Психологии'], group: ['251', '264'], teacher: 'Фролова С.В.', lesson: 'Научно-исследовательская работа', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: ['Психологии'], group: ['167'], teacher: 'Фролова С.В.', lesson: 'Психология миграции и приверженности стране', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '7', department: ['Психологии'], group: ['251', '264'], teacher: 'Фролова С.В.', lesson: 'Научно-исследовательская работа', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['Психологии'], group: ['361', '362'], teacher: 'Калистратов П.Ю.', lesson: 'Психометрические основы психодиагностики', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['Психологии'], group: ['361', '362'], teacher: 'Калистратов П.Ю.', lesson: 'Психометрические основы психодиагностики', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: ['Психологии'], group: ['361', '362'], teacher: 'Петрова Л.Г.', lesson: 'Психология социальной работы', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['361', '362'], teacher: 'Петрова Л.Г.', lesson: 'Психология социальной работы', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '6', department: ['Психологии'], group: ['164'], teacher: 'Малюченко Г.Н.', lesson: 'Индивидуальное психологическое консультирование', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '7', department: ['Психологии'], group: ['164'], teacher: 'Малюченко Г.Н.', lesson: 'Индивидуальное психологическое консультирование', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: ['Психологии'], group: ['163'], teacher: 'Шарапов А.А.', lesson: 'Психодиагностика и оценка персонала', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['Психологии'], group: ['163'], teacher: 'Шарапов А.А.', lesson: 'Психодиагностика и оценка персонала', type: 'пр.', parity: '-' },]);

template_PolygonFeature([[[1139, 631],[1353, 631],[1353, 373],[1139, 373],[1139, 631]]], '101', '101', 
    [{ day: 'Понедельник', number: '1', department: ['Философский'], group: ['311'], teacher: 'Малкина С.М.', lesson: 'Немецкая классическая философия', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['Философский'], group: ['311'], teacher: 'Малкина С.М.', lesson: 'Немецкая классическая философия', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['142', '152'], teacher: 'Кутырева И.В.', lesson: 'Стратегии государственной национальной и религиозной политики', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['311'], teacher: 'Богатов М.А.', lesson: 'Эстетика', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Философский'], group: ['142', '152'], teacher: 'Иванов Е.М.', lesson: 'Актуальные проблемы духовной безопасности в современном обществе', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Философский'], group: ['311'], teacher: 'Богатов М.А.', lesson: 'Эстетика', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['142'], teacher: 'Иванов Е.М.', lesson: 'История зарубежного и отечественного религиоведения', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['212'], teacher: 'Артамонов Д.С.', lesson: 'Цифровые инструменты научной коммуникации', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['212'], teacher: 'Артамонов Д.С.', lesson: 'Компьютерные игры в образовании', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['213'], teacher: 'Артамонов Д.С.', lesson: 'Этика социальных медиа и селфбрендинг', type: 'лек.', parity: 'знам.'},
    { day: 'Понедельник', number: '6', department: ['Философский'], group: ['212'], teacher: 'Артамонов Д.С.', lesson: 'Компьютерные игры в образовании', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '6', department: ['Философский'], group: ['213'], teacher: 'Артамонов Д.С.', lesson: 'Компьютерные игры в образовании', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '7', department: ['Философский'], group: ['213'], teacher: 'Артамонов Д.С.', lesson: 'Цифровая эпистемология', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '7', department: ['Философский'], group: ['213'], teacher: 'Артамонов Д.С.', lesson: 'Цифровые инструменты научной коммуникации', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['141', '151'], teacher: 'Кучерова Т.Н.', lesson: 'Немецкий язык', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['341'], teacher: 'Иванов Е.М.', lesson: 'Психология религии', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['341'], teacher: 'Иванов Е.М.', lesson: 'Психология религии', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['Философский'], group: ['142', '152'], teacher: 'Каткова М.В.', lesson: 'Основы научно-исследовательской и проектной деятельности', type: 'лек.', parity: 'чис.'},
    { day: 'Вторник', number: '6', department: ['Философский'], group: ['142', '152'], teacher: 'Каткова М.В.', lesson: 'Основы научно-исследовательской и проектной деятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['113'], teacher: 'Артамонов Д.С.', lesson: 'Философия видеоигр', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['331'], teacher: 'Зеленкина А.С.', lesson: 'Проблемы современной культорологии', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['411'], teacher: 'Малкина С.М.', lesson: 'Введение в психоанализ', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['311'], teacher: 'Гаврилова С.Ю.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['411'], teacher: 'Малкина С.М.', lesson: 'Введение в психоанализ', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['411'], teacher: 'Рязанов А.В.', lesson: 'Философия коммуникации', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['311'], teacher: 'Гаврилова С.Ю.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['141', '151'], teacher: 'Кучерова Т.Н.', lesson: 'Немецкий язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['411'], teacher: 'Рязанов А.В.', lesson: 'Философия коммуникации', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['142', '152'], teacher: 'Кучерова Т.Н.', lesson: 'Немецкий язык в сфере профессиональной коммуникации', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['441', '451'], teacher: 'Данилов С.А.', lesson: 'Религиозные организации как субъекты федеральной и региональной политики', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['113'], teacher: 'Артамонов Д.С.', lesson: 'Философия видеоигр', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['441', '451'], teacher: 'Данилов С.А.', lesson: 'Религиозные организации как субъекты федеральной и региональной политики', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['113'], teacher: 'Артамонов Д.С.', lesson: 'Этос науки и этика научных коммуникаций', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '7', department: ['Философский'], group: ['113'], teacher: 'Казаков А.А.', lesson: 'Медиамеханихмы повестки дня', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '1', department: ['Философский'], group: ['311'], teacher: 'Ломако О.М.', lesson: 'Философская антропология', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['311'], teacher: 'Ломако О.М.', lesson: 'Философская антропология', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['341'], teacher: 'Иванов Е.М.', lesson: 'История отечественного религиоведения', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['341'], teacher: 'Иванов Е.М.', lesson: 'История отечественного религиоведения', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['141'], teacher: 'Лобанова Е.С.', lesson: 'Государство и общество в Ветхом Завете', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['242'], teacher: 'Иванов Е.М.', lesson: 'Актуальные вопросы современного религиоведения', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['242'], teacher: 'Иванов Е.М.', lesson: 'Актуальные вопросы современного религиоведения', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['142', '152'], teacher: 'Кутырева И.В.', lesson: 'История, вероучение и культовая практика культурообразующих религий России', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['142', '152'], teacher: 'Кутырева И.В.', lesson: 'История, вероучение и культовая практика культурообразующих религий России', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['372'], teacher: 'Иванов А.В.', lesson: 'Социальная и политическая философия', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['112'], teacher: 'Богатов М.А.', lesson: 'Новейшие тенденции и направления зарубежной философии', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '6', department: ['Философский'], group: ['112','113'], teacher: 'Богатов М.А.', lesson: 'Новейшие тенденции и направления зарубежной философии', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '6', department: ['Философский'], group: ['112'], teacher: 'Богатов М.А.', lesson: 'Мастер-класс по риторике', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '6', department: ['Философский'], group: ['113'], teacher: 'Тихонова С.В.', lesson: 'Научно-методологический семинар', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '6', department: ['Философский'], group: ['372'], teacher: 'Иванов А.В.', lesson: 'Социальная и политическая философия', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '7', department: ['Философский'], group: ['113'], teacher: 'Михайлин В.Ю.', lesson: 'Антропология советского кино', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '8', department: ['Философский'], group: ['212'], teacher: 'Богатов М.А.', lesson: 'Дискурс и власть', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['Философский'], group: ['111'], teacher: 'Исаева А.В.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['111'], teacher: 'Исаева А.В.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['211', '311', '411'], teacher: 'Малкина С.М.', lesson: 'Теоретико-методологический семинар', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['Философский'], group: ['241', '251'], teacher: 'Лобанова Е.С.', lesson: 'История христианского вероучения (до апреля)', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '3', department: ['Философский'], group: ['212'], teacher: 'Дуплинская Ю.М.', lesson: 'Философско-методологические проблемы конкретнонаучных дисциплин', type: 'лек.', parity: 'чис.'},
    { day: 'Суббота', number: '4', department: ['Философский'], group: ['212'], teacher: 'Дуплинская Ю.М.', lesson: 'Философско-методологические проблемы конкретнонаучных дисциплин', type: 'пр.', parity: 'чис.'},]);

// аудитории правого крыла
template_PolygonFeature([[[2022, 635],[2243, 635],[2243, 373],[2022, 373],[2022, 635]]], '135 (кафедра общей и консультативной психологии)', '135');

template_PolygonFeature([[[2246, 635],[2495, 635],[2495, 373],[2246, 373],[2246, 635]]], '134 (аудитория им. С.Л. Франка, компьютерный класс)', '134', 
    [{ day: 'Вторник', number: '1', department: ['Психологии'], group: ['261'], teacher: 'Лазунина Е.А.', lesson: 'Память, мышление, речь', type: 'лаб.', parity: 'чис.'},
    { day: 'Вторник', number: '1', department: ['Психологии'], group: ['262'], teacher: 'Лазунина Е.А.', lesson: 'Память, мышление, речь', type: 'лаб.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: ['Психологии'], group: ['361'], teacher: 'Букушева А.В.', lesson: 'Использование библиотек Python в профессиональной деятельности (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '4', department: ['Психологии'], group: ['362'], teacher: 'Букушева А.В.', lesson: 'Использование библиотек Python в профессиональной деятельности (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: ['Психологии'], group: ['261'], teacher: 'Лазунина Е.А.', lesson: 'Память, мышление, речь', type: 'лаб.', parity: 'чис.' },
    { day: 'Четверг', number: '1', department: ['Психологии'], group: ['262'], teacher: 'Лазунина Е.А.', lesson: 'Память, мышление, речь', type: 'лаб.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: ['ФМиЕНД'], group: ['411', '441'], teacher: 'Пикулик О.В.', lesson: 'Управление цифровой трансформацией образования (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['ФМиЕНД'], group: ['341', '351'], teacher: 'Пикулик О.В.', lesson: 'Управление цифровой трансформацией образования (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['261'], teacher: 'Смирнова А.Ю.', lesson: 'Количественные методы в психологии', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['Психологии'], group: ['262'], teacher: 'Смирнова А.Ю.', lesson: 'Количественные методы в психологии', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['261'], teacher: 'Смирнова А.Ю.', lesson: 'Количественные методы в психологии', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '5', department: ['Психологии'], group: ['262'], teacher: 'Смирнова А.Ю.', lesson: 'Количественные методы в психологии', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '1', department: ['Философский'], group: ['441', '451'], teacher: 'Белоконь М.В.', lesson: '1С Предприятие для решения задач в профессиональной деятельности', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[2498, 635],[2749, 635],[2749, 373],[2498, 373],[2498, 635]]], '133 (аудитория им. Л.Г. Вяткина, компьютерный класс)', '133', 
    [{ day: 'Понедельник', number: '2', department: ['Философский'], group: ['411', '431'], teacher: 'Белоконь М.В.', lesson: '1С Предприятие для решения задач в профессиональной деятельности', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Психологии'], group: ['261'], teacher: 'Белоконь М.В.', lesson: 'Разработка программного обеспечения в профессиональной деятельности психолога', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Психологии'], group: ['262'], teacher: 'Белоконь М.В.', lesson: 'Разработка программного обеспечения в профессиональной деятельности психолога', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['ФМиЕНД'], group: ['120'], teacher: 'Плешкевич Е.А.', lesson: 'Методика организации и проведения педагогического эксперимента', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '5', department: ['ФМиЕНД'], group: ['120'], teacher: 'Плешкевич Е.А.', lesson: 'Методика организации и проведения педагогического эксперимента', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '1', department: ['Психологии'], group: ['161'], teacher: 'Лазунина Е.А.', lesson: 'Сенсорно-перцептивная сфера личности и внимание', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Психологии'], group: ['362'], teacher: 'Рогачко Е.С.', lesson: 'Использование библиотек Python в профессиональной деятельности (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['Психологии'], group: ['361'], teacher: 'Чернышова Г.Ю.', lesson: 'Использование методов машинного обучения в управлении профессиональной деятельностью (цифровая кафдера)', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '2', department: ['Психологии'], group: ['362'], teacher: 'Чернышова Г.Ю.', lesson: 'Использование методов машинного обучения в управлении профессиональной деятельностью (цифровая кафдера)', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '1', department: ['Философский'], group: ['341', '351'], teacher: 'Кабанова Л.В.', lesson: '1С Предприятие для решения задач в профессиональной деятельности', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['261'], teacher: 'Баталин В.В.', lesson: 'Введение в информационные технологии', type: 'лаб.', parity: 'чис.'},
    { day: 'Пятница', number: '5', department: ['Психологии'], group: ['262'], teacher: 'Баталин В.В.', lesson: 'Введение в информационные технологии', type: 'лаб.', parity: 'знам.'},]);

template_PolygonFeature([[[2897, 1321],[3193, 1321],[3193, 1003],[2897, 1003],[2897, 1321]]], '127 (кафедра уголовного <br> процесса и судебных <br> экспертиз)', '127');
template_PolygonFeature([[[2859, 374],[3193, 374],[3193, 253],[2859, 253],[2859, 374]]], '132 (кафедра педагогики <br> и образовательных <br> технологий)', '132');
template_PolygonFeature([[[2897, 630],[3193, 630],[3193, 379],[2897, 379],[2897, 630]]], '131 (юридическая <br> клиника)', '131');
template_PolygonFeature([[[2897, 771],[3193, 771],[3193, 635],[2897, 635],[2897, 771]]], '130', '130');
template_PolygonFeature([[[2897, 886],[3193, 886],[3193, 774],[2897, 774],[2897, 886]]], '129', '129');
template_PolygonFeature([[[2897, 998],[3193, 998],[3193, 890],[2897, 890],[2897, 998]]], '128 (комната матери <br> и ребёнка)', '128');

template_PolygonFeature([[[2894, 1550], [3310, 1550], [3310, 1324], [2894, 1324], [2894, 1550]]], '126 (кафедра английского <br> языка и мекультурной <br> коммуникации)', '126',
    [{ day: 'Среда', number: '2', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'лек.', parity: '-'}]);

template_PolygonFeature([[[2894, 1717], [3193, 1717], [3193, 1552], [2894, 1552], [2894, 1717]]], '125 (вход через 126)', '125',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['231', '211', '251'], teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '4', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['331', '311', '321', '341', '351', '381', '321', '311', '312', '321', '322', '341'], teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '5', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['431', '441', '421', '411', '451', '421', '411', '412', '421', '422'], teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '1', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['221', '241', '221', '211', '212', '221', '222', '241'], teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['231', '211', '251'], teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['431', '441', '421', '411', '451', '421', '411', '412', '421', '422'], teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '4', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['331', '311', '321', '341', '351', '381', '321', '311', '312', '321', '322', '341'], teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['221', '241', '221', '211', '212', '221', '222', '241'], teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['171'], teacher: 'Кузьмина С.В.', lesson: 'Деловой иностранный язык', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['ФМиЕНД'], group: ['120'], teacher: 'Кузьмина С.В.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['КНиИТ', 'Экономический'], group: ['191', '192', '101'], teacher: 'Сокиркина Л.И.', lesson: 'Иностранный язык', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['КНиИТ', 'Экономический'], group: ['191', '192', '101'], teacher: 'Сокиркина Л.И.', lesson: 'Иностранный язык', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2740, 1948],[3315, 1948],[3315, 1719],[2894, 1719],[2894, 1795],[2740, 1795],[2740, 1948]]], '123/124 (лекционная аудитория)', '123');

// аудитории в служебном коридоре 
template_PolygonFeature([[[1916, 1095],[2067, 1095],[2067, 883],[1916, 883],[1916, 1095]]], '115 (компьютерный класс)', '115');
template_PolygonFeature([[[2070, 1095],[2170, 1095],[2170, 883],[2070, 883],[2070, 1095]]], '116', '116');
template_PolygonFeature([[[2173, 1095],[2270, 1095],[2270, 883],[2173, 883],[2173, 1095]]], '117', '117');
template_PolygonFeature([[[2273, 1095],[2347, 1095],[2347, 883],[2273, 883],[2273, 1095]]], '118', '118');
template_PolygonFeature([[[2350, 1095],[2415, 1095],[2415, 883],[2350, 883],[2350, 1095]]], '119', '119');
template_PolygonFeature([[[2418, 1095],[2488, 1095],[2488, 883],[2418, 883],[2418, 1095]]], '120', '120');
template_PolygonFeature([[[1916, 880],[2488, 880],[2488, 779],[1916, 779],[1916, 880]]], 'служебный коридор', 'hallway');

// специальные помещения 
template_PolygonFeature([[[1356, 613],[1455, 613],[1455, 373],[1356, 373],[1356, 613]]], 'охрана (тут можно попросить ключи)', 'secutity');
template_PolygonFeature([[[1598, 1396],[1777, 1396],[1777, 1294],[1598, 1294],[1598, 1396]]], 'буфет (закрыт)', 'cafeteria');
template_PolygonFeature([[[1458, 1350],[1595, 1350],[1595, 1293],[1780, 1293],[1780, 1348],[1915, 1348],[1915, 1096],[1458, 1096],[1458, 1350]]], '"точка кипения"', 'cafeteriahall');
template_PolygonFeature([[[633, 368],[1455, 368],[1455, 208],[633, 208],[633, 368]]], 'гардероб', 'closet1');
template_PolygonFeature([[[1917, 372],[2740, 372],[2740, 210],[1917, 210],[1917, 372]]], 'гардероб (не работает)', 'closet2');
template_PolygonFeature([[[1218, 1959],[2161, 1959],[2161, 1399],[1218, 1399],[1218, 1959]]], 'актовый зал', 'assemblyhall');

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
        minZoom: 0.98, // минимальный зум
        maxZoom: 4, // максимальный зум
    }),
});

map.getView().fit(imageExtent); // автоматический подбор масштаба карты

fill_filter();

map.addOverlay(popup);

// состояние для хранения текущего выделенного объекта
let highlightedFeature = null;

// обработчик события наведения курсора мыши
map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }

    const pixel = map.getEventPixel(evt.originalEvent);
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(pixel) ? 'pointer' : '';

    // получаем все объекты под курсором в массив
    const features = [];
    map.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
    });

    // сбрасываем стиль с предыдущего выделенного объекта (если есть)
    if (highlightedFeature && !features.includes(highlightedFeature)) {
        highlightedFeature.setStyle(defaultStyle);
        highlightedFeature = null;
    }

    // выделяем все объекты, на которые наведен курсор
    let featureToShowPopup = null; // объект, для которого нужно показать Popup
    features.forEach(feature => {
        if (feature) {
            feature.setStyle(highlightStyle); // применяем стиль выделения
            highlightedFeature = feature; //  запоминаем последний выделенный объект
            featureToShowPopup = feature; // запоминаем объект для отображения Popup
        }
    });

    // отображаем Popup (если есть объект под курсором)
    if (featureToShowPopup) {
        const coordinate = evt.coordinate;
        popup.getElement().innerHTML = `${featureToShowPopup.get('description')}`; // Используем featureToShowPopup;
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
                                <th>№</th>
                                <th>Факультет</th>
                                <th>Группа</th>
                                <th>Преподаватель</th>
                                <th>Пара</th>
                                <th>Тип</th>
                                <th>Чётность</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${scheduleByDay[day].map(item => `<tr><td>${item.number}</td><td>${item.department.join('\n')}</td><td>${item.group.join(', ')}</td><td>${item.teacher}</td><td>${item.lesson}</td><td>${item.type}</td><td>${item.parity}</td></tr>`).join('')}
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

function fill_filter() { // заполняем всплывающие списки фильтров
    const filterFields = ['department', 'group', 'teacher', 'lesson', 'type', 'parity'];
    const allSchedules = [];

    vectorSource.getFeatures().forEach(feature => {
        const schedule = feature.get('schedule');
        if (schedule && Array.isArray(schedule)) {
            schedule.forEach(item => allSchedules.push(item)); // добавляем все расписания в список
        }
    });

    filterFields.forEach(field => {
        const selectElement = document.getElementById(`filter-${field}`);
        const uniqueValues = new Set();

        allSchedules.forEach(item => {
            if (item && item[field]) {
                const fieldValue = item[field];

                // проверяем, является ли значение массивом
                if (Array.isArray(fieldValue)) {
                    // если да, то во множество добавляем его каждый элемент
                    fieldValue.forEach(value => uniqueValues.add(value));
                } else {
                    // если нет, то добавляем само значение
                    uniqueValues.add(fieldValue);
                }
            }
        });

        // преобразуем множество в массив и сортируем
        const sortedValues = Array.from(uniqueValues).sort();

        sortedValues.forEach(value => { // добавляем во всплывающие списки элементы из множества
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

// обработчик для кнопки "Применить фильтры"
applyFiltersButton.addEventListener('click', function () {
    apply_filter();
});

function apply_filter() {
    // собираем значения фильтров из формы
    const filters = getFilters();

    if (openModal) {
        // закрываем старое окно
        document.body.removeChild(openModal);
        openModal = null; // cбрасываем переменную openModal
    }
}

function getFilters() {
    const filters = {};

    // собираем значения фильтров из формы
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
    if (!schedule || schedule.length === 0) return [];

    return schedule.filter(item => {
        for (const filterName in filters) {
            const filterValue = filters[filterName];
            const itemValue = item[filterName];

            // для всех фильтров проверяем, является ли значение массивом
            if (Array.isArray(itemValue)) {
                if (!itemValue.includes(filterValue)) return false;
            } else {
                if (itemValue !== filterValue) return false;
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

    if (openModal) {
        // закрываем старое окно
        document.body.removeChild(openModal);
        openModal = null; // cбрасываем переменную openModal
    }

});