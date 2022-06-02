function fillFinancialResponsibilityCenterForBF(){ // ЦФО по БФ
  
  let hide = SpreadsheetApp.openById("").getSheetByName("Папки ЦФО по БФ");
  let special = hide.getRange(2, 2, hide.getLastRow()-1, 1).getValues().map(arr => arr[0]);

  let service = getDriveService();
  let accessToken = service.getAccessToken()
  
  let finance = getRequest(accessToken, "", 1000, 0);
  finance = finance.data.filter((e: { deleted: any; guid1C: string;}) => !e.deleted && special.indexOf(e.guid1C)<0)
                        .map((obj: { name: string; guid1C: string; }) => [obj.name, obj.guid1C]);

  pasteArr("ЦФО по БФ", finance, "");

  return finance;
}