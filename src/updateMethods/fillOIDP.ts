function fillObject() {

  // - для прочих ОИДП (ObjectOther):   дата окончания использования = пустое значение или => 01.01.2020
  // Добавить колонку - признак "Признак ОИДП" - если ОИДП прочий - признак принемает значение "ObjectOther", иначе - "Object"
  // - не учитывать помеченные на удаление обьекты - в mds пока это не передается, делаем это через таблицу исключений на стороне гугл шитов 

  let hideLibrary = SpreadsheetApp.openById("").getSheetByName('Исключения ОИДП');
  let hidesoidp = hideLibrary.getRange(2, 2, hideLibrary.getLastRow() - 1, 1).getValues().map(id => id[0]);
  let service = getDriveService();
  let accessToken = service.getAccessToken();
  let date = new Date(2020, 0, 1);
  let company = getRequest(accessToken, "", 1000, 0);
  let objectName = getRequest(accessToken, "", 3000, 0);
  let array = objectName.data
      .filter((e: { endDate: Date | null; deleted: Date | null; }) => {
        let compDate
        e.endDate ? compDate = new Date(e.endDate) : compDate = new Date();
        return compDate >= date && !e.deleted;
      })
      .map((obj: { name: string; companyGuid1C: string; hierarchicalCode: string; guid1C: string; }) => {
      return [obj.name,
          company.data.filter((e: { guid1C: string; }) => e.guid1C === obj.companyGuid1C)
              .map((objj: { name: string; }) => objj.name),
          obj.hierarchicalCode,
          obj.guid1C,
          "ObjectOther"];
  });

  // ====================================================================================================================================================================

  // - элементы справочников, группы не выгружать
  // - для обычных ОИДП условия выгрузки: дата начала использования => 01/01/2018 и дата окончания использования = пустое значение 
  // - обязательно в списке должен присутсвовать данный ОИДП: "г.Москва, Условный объект 1"

  let object = getRequest(accessToken, "", 1, 0);
  let meta = object.meta;

  let end = Math.floor(meta.totalCount / 1000) + 1;    

  let dateTwo = new Date(2017, 11, 31, 23, 59, 59);

  for (let i = 0; i < end; i++) {
      let offset = i * 1000;      
      let object = getRequest(accessToken, "", 1000, offset);
      let tempArr = object.data
          .filter((e: { startDate: Date | null; endDate: Date | null; guid1C: string; }) => {
            let compDate = new Date(e.startDate);
            return (compDate >= dateTwo && !e.endDate) || e.guid1C === "----";
          })
          .map((arr: { name: string; guid1C: string; code1C: string; }) => {
          return [arr.name,
              objectName.data.filter((q: { guid1C: string; }) => q.guid1C === arr.guid1C)
                  .map((obj: { name: string; }) => obj.name),
              arr.code1C,
              arr.guid1C,
              "Object"];
      });
      if (tempArr.length > 0) {
          array = array.concat(tempArr);
      }
  }
  array = array.filter((row: any[]) => hidesoidp.indexOf(row[3]) < 0);
  pasteArr("ОИДП", array, "");
  return array;
}