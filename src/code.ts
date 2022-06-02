function isThereSomethingToUpdate(): void{
  librarySettingsList.getRange(2, 1, 8, 2).getValues().forEach(row => row[1] ? updateExactList(row[0]):"");
}

function updateExactList(sheetName: string){
  
  Logger.log(sheetName);

  let url: string = "https://docs.google.com/spreadsheets/d/1mrO_2FRbjeZ3RCJhaSR9So3KOVQcW7Ze6NC25iTmOkI"
  let sheet = sheetName;

  let array;

  switch(sheetName){
    case 'Статья БК':
      try{
        array = fillCostItem();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(2, 2).setValue(0);
      break;
    case 'Организация':
      try{
        array = fillCompany();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(3, 2).setValue(0);
      break;
    case 'Статья ДДС':
      try{
        array = fillCashFlowItem();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(4, 2).setValue(0);
      break;
    case 'ОИДП':
      try{
        array = fillObject();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(5, 2).setValue(0);
      break;
    case 'ЦФО по БФ':
      try{
        array = fillFinancialResponsibilityCenterForBF();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(6, 2).setValue(0);
      break;
    case 'ЦФО-заказчик':
      try{
        array = fillFinancialResponsibilityCenter();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(7, 2).setValue(0);
      break;
    case 'Контрагент':
      try{
        array = fillContragentsAlt();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(8, 2).setValue(0);
      break;
    case 'Соотвествие статьей БК ДДС':
      try{
        array = sdds();
      }
      catch(e){pasteError(url, sheet, e)}
      librarySettingsList.getRange(9, 2).setValue(0);
      break;
    default:
      Logger.log("Error");
  }

  updateSheets("", sheetName, array);
  updateSheets("1d-", sheetName, array);
}

function updateSheets(folderId: string, sheetName: string, array: Array<any>) {
  
  let files = DriveApp.getFolderById(folderId).getFiles();

  while(files.hasNext()){

    let file = files.next();
    let fileId: string = "";
    file.getMimeType() === "application/vnd.google-apps.shortcut" ? fileId = file.getTargetId() : fileId = file.getId();
    let url = file.getUrl();
    let sheet = file.getName();1

    if(fileId=="-lhtV_znJ0qn1"){continue;}

    Logger.log(fileId);
    Logger.log(sheetName);

    try{
      pasteArr(sheetName, array, fileId);  
    }
    catch(e){pasteError(url, sheet, e)}
    finally{Logger.log(`error sheet - ${fileId}`)}

  }
}







