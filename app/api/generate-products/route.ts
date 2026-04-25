import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

// --- Данные серий (ID и название) ---
const seriesList = [
  { id: "1", title: "Риббоны" },
  { id: "2", title: "Значки с лентами" },
  { id: "3", title: "Рядные розетки" },
  { id: "4", title: "Серия Трилистник" },
  { id: "5", title: "Ринговая серия" },
  { id: "6", title: "Овальные рядные" },
  { id: "7", title: "Розетки с органзой" },
  { id: "8", title: "Розетки с капроном и кружевом" },
  { id: "9", title: "Двухрядные розетки" },
  { id: "10", title: "Трёхрядные розетки" },
  { id: "11", title: "Ринговая серия ЁЖИК" },
  { id: "12", title: "Титульная розетка PR101/1" },
  { id: "13", title: "Ринговая серия 304" },
  { id: "14", title: "Ринговая серия 305" },
  { id: "15", title: "Ринговая серия 1402" },
  { id: "16", title: "Ринговая серия 301/302" },
  { id: "17", title: "Ринговая серия 1601/1602" },
  { id: "18", title: "Ринговая пара 406/1701" },
  { id: "19", title: "Ринговая серия 1602" },
  { id: "20", title: "Ринговая серия 2101" },
  { id: "21", title: "Ринговая серия 1801" },
  { id: "22", title: "Ринговая серия 1802" },
  { id: "23", title: "Ринговая серия 1702" },
  { id: "24", title: "Ринговая серия 403/402/401" },
  { id: "25", title: "Ринговая серия 201" },
  { id: "26", title: "Ринговая пара 202" },
  { id: "27", title: "Ринговая пара 1502/1501" },
  { id: "28", title: "Ринговая пара 501/502/503" },
  { id: "29", title: "Ринговая серия 2001" },
  { id: "30", title: "Ринговая серия 2402" },
  { id: "31", title: "Ринговая серия 2401" },
  { id: "32", title: "Ринговая серия 901" },
  { id: "33", title: "Ринговая серия 1002" },
  { id: "34", title: "Ринговая серия 1003/1001" },
  { id: "35", title: "Серия ЛЕНА" },
  { id: "36", title: "Cерия ЕНИСЕЙ" },
  { id: "37", title: "Серия ИГАРКА" },
  { id: "38", title: "Серия ДВИНА" },
  { id: "39", title: "Серия КУРЬЯ" },
  { id: "40", title: "Серия ПИНЕГА" },
  { id: "41", title: "Серия ПИНЕГА I" },
  { id: "42", title: "Серия ПИНЕГА II" },
  { id: "43", title: "Серия ГЕОРГИНЫ" },
  { id: "44", title: "Серия ТАЙМЫР" },
  { id: "45", title: "Серия ВОЛГА" },
  { id: "46", title: "Серия ЛАДОГА / ИЛЬМЕНЬ" },
  { id: "47", title: "Серия ВОЛХОВ / НЕВА" },
  { id: "48", title: "Серия ПЕЧОРА" },
  { id: "49", title: "Серия МЕЗЕНЬ" },
  { id: "50", title: "Серия НЕРО" },
  { id: "51", title: "Серия ЛОДЬМА" },
  { id: "52", title: "Серия ВЫЧЕГДА" },
  { id: "53", title: "Серия ВАЙМУГА" },
  { id: "54", title: "Ваймуга II" },
  { id: "55", title: "Серия АНГАРА" },
  { id: "56", title: "Серия ИЛЕКСА" },
  { id: "57", title: "Серия СУХОНА" },
  { id: "58", title: "Серия СУХОНА II" },
  { id: "59", title: "Серия КАМА" },
  { id: "60", title: "Серия ОНЕГА" },
  { id: "61", title: "Серия ИРТЫШ" },
  { id: "62", title: "Серия ИРТЫШ II" },
  { id: "63", title: "Серия ХРИЗАНТЕМА" },
  { id: "64", title: "Овальные розетки" },
  { id: "65", title: "Серия КОТИК" },
  { id: "66", title: "Серия NEST / BASKET" },
  { id: "67", title: "Серия Ст. ЛОДЬМА" },
  { id: "68", title: "Серия ОКА" },
];

// --- Проверенные рабочие изображения (основные) ---
const mainImages = [
  "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0",
  "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
  "https://sun9-51.userapi.com/s/v1/ig2/ch-RUKG1QnY4rKaAPQvG0nW0uw4N-nxKgx7BB9ZG3u5NbynoblT3vKiwPGUMzIfyQI29ojEL0eeHcIyizooFlAAB.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=O7gYSnYfCgs8_S2KtgwiVVXRqPWpDKh8GF3x94XP_u0&cs=640x0",
];

// --- Проверенные рабочие изображения (дополнительные) ---
const additionalImagesList = [
  "https://sun9-40.userapi.com/s/v1/ig2/o6aF7JqAuaRNtmyGOldHGixirIg7sevj0KeeBhvvtH-Q5Iwm-8Sfptf7p2rOUHpIkokpgfOuckBbiwUPO2GO5LBv.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=RsHFwYwWGuq23f2O3iuVebXkeSVPqgYBX4jriN30R0Q&cs=960x0",
  "https://sun9-14.userapi.com/s/v1/ig2/qwarfSYXtoxlrsK4nyhwQazM7QEnpE5ERZjwxllKye16NL6-GaERBg-zT4pGmCTmNbZ_3pS9PlNf1HdXPwW84TnG.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=Cc0xrHBFKJGza5LuX4za8Y6psr8WH7dOee13xT4d2Jg&cs=1080x0",
  "https://sun9-16.userapi.com/s/v1/ig2/S5AbswrmKMfZ0Lz4TE63YC4aBlKRxeD99LNuzM3AdFYXDG6SMPiXAKDC33Kuzdjx2c1kKmlQowybHstN_8lQDP5-.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1439,1280x1706&from=bu&u=5ZBb7odtHIVKUQ4p0eKKMqWycDHjlZ2OWFz2ujEGXBU&cs=1080x0",
];

// --- Список возможных комментариев для розеток ---
const commentsList = [
  "Классическая наградная розетка",
  "Подходит для любых мероприятий",
  "Премиум качество",
  "Эксклюзивный дизайн",
  "С ручной сборкой",
  "Используются лучшие материалы",
  "Яркая и запоминающаяся",
  "Для особых побед",
  "Лаконичный и строгий дизайн",
  "С блестящими элементами декора",
  "Нежный и изящный вариант",
  "Мощная и статусная награда",
];

// --- Функция для генерации случайного числа в диапазоне ---
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Функция для выбора случайного элемента из массива ---
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST() {
  try {
    const collection = await getCollection("products");
    
    // Очищаем коллекцию перед заполнением (опционально)
    await collection.deleteMany({});
    console.log("Старые данные удалены");
    
    let totalGenerated = 0;
    
    for (const series of seriesList) {
      // Генерируем 5 розеток для каждой серии
      for (let i = 1; i <= 5; i++) {
        const randomPrice = getRandomInt(50, 500);
        const randomDiameter = getRandomInt(8, 25);
        const randomTails = getRandomInt(1, 7);
        const randomTailLength = getRandomInt(15, 60);
        const randomNumber = getRandomInt(1, 30);
        
        // Генерируем 0-3 дополнительных изображения
        const additionalCount = getRandomInt(0, 3);
        const additionalImages = [];
        for (let a = 0; a < additionalCount; a++) {
          additionalImages.push(getRandomItem(additionalImagesList));
        }
        
        const product = {
          image: getRandomItem(mainImages),
          additionalImages: additionalImages,
          seriesId: series.id,
          seriesNumber: `${series.title.replace(/[^A-Za-zА-Яа-я0-9]/g, '').substring(0, 10)}-${i}`,
          rossetSeries: series.title,
          rossetNumber: randomNumber,
          rossetDiameter: randomDiameter,
          numberOfTails: randomTails,
          tailLength: randomTailLength,
          comment: getRandomItem(commentsList),
          price: randomPrice,
          createdAt: new Date(),
        };
        
        await collection.insertOne(product);
        totalGenerated++;
      }
    }
    
    return NextResponse.json({
      message: `✅ Успешно! Сгенерировано ${totalGenerated} розеток для ${seriesList.length} серий.`,
      count: totalGenerated,
    });
  } catch (error) {
    console.error("Ошибка при генерации:", error);
    return NextResponse.json(
      { error: "Ошибка сервера при генерации данных" },
      { status: 500 }
    );
  }
}