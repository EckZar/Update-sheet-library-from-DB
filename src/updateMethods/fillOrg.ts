function fillCompany(){ // Обновляем лист организации
  
    let hide = SpreadsheetApp.openById("").getSheetByName("Организации в периметре консолидации");
    let range = hide.getRange(2, 1, hide.getLastRow()-1, 3).getValues();
    pasteArr("Организация", range, "");
  
    return range;
  
  }