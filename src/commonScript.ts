//  Вставляем array на лист sheetName в таблице библиотеки. 
//  Предварительно очищаем лист sheetName, по размеру вставляемого массива, перед тем как вставить массив. 
//  Очистка идет от 2 ячейки первого столбца по ширине массива, до конца таблицы.
function pasteArr(sheetName: string, array: Array<any>, sheetID: string): void { 
    let main = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName);
    try
    {
      main.getRange(2, 1, main.getLastRow()-1, array[0].length).clear();
    }
    catch(e){}
    main.getRange(2, 1, array.length, array[0].length).setValues(array);
}

function pasteError(url: string, sheetName: string, description: any){
  libraryErrorList.getRange(libraryErrorList.getLastRow()+1, 1, 1, 4).setValues([[new Date(), url, sheetName, description]]);
}