function sdds(){
    let sheet = SpreadsheetApp.openById("").getSheetByName("Соотвествие статьей БК ДДС");
    let values = sheet.getRange(2, 1, sheet.getLastRow()+1, 3).getValues();  
    pasteArr("Соотвествие статьей БК ДДС", values, "");
  
    return values;  
  }