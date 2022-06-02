function fillCostItem(){ // Статья БК
  
    let accessToken = getDriveService().getAccessToken();
    let costItem = getRequest(accessToken, "", 1000, 0);
  
    let array = costItem.data.filter((e: { isGroup: boolean; deleted: Date | null; }) => e.isGroup === false && !e.deleted)
                             .map((arr: {name: string; isIncome: string | null; guid1C: string}) => [arr.name, arr.isIncome ? "Приход":"Расход",arr.guid1C])
  
    pasteArr("Статья БК", array, "");
    
    return array;
}
