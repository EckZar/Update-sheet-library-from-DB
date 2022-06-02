function fillCashFlowItem(){ // Статья ДДС

    let service = getDriveService();
    let accessToken = service.getAccessToken();

    let cashFlowItem = getRequest(accessToken, "", 1000, 0); // Получаем список статей. MainActivityKind содержит UUID
    let activityKind = getRequest(accessToken, "", 1000, 0); // Получаем список наименований MainActivityKind

    activityKind = activityKind.data;

    let array = cashFlowItem.data // В массиве объектов cashFlowItem
    .filter((e: { isGroup: boolean; deleted: Date | null; }) => e.isGroup === false && !e.deleted) // фильтруем массив объектов где isGroup false
    .map((arr: { name: string; isIncome: string | null; mainActivityKind: string; guid1C: string; }) => { // из отфильтрованного массива объектов возвращаем значения name, isIncome, activityKind, guid1C
        return [arr.name,
                arr.isIncome ? "Приход":"Расход",
                activityKind
                  .filter((q: { guid1C: string; }) => q.guid1C === arr.mainActivityKind) // возвращаем объект с совпадающим ключом
                  .map((obj: { name: string; }) => obj.name), // возвращаем только наименование
                arr.guid1C]
      })

    pasteArr("Статья ДДС", array, "");

    return array;
  }