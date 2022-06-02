function onOpen(){
    SpreadsheetApp.getUi().createMenu("__MENU__")
    .addItem("oAuth", "showSidebar")
    .addItem("Обновить список организаций", "fillCompany")
    .addItem("Обновить «Статья БК»", "fillCostItem")
    .addItem("Обновить «Статья ДДС»", "fillCashFlowItem")
    .addItem("Обновить «ОИДП»", "fillObject")
    .addItem("Обновить «ЦФО по БФ»", "fillFinancialResponsibilityCenterForBF")
    .addItem("Обновить «ЦФО-заказчик»", "fillFinancialResponsibilityCenter")
    .addItem("Обновить «Контрагентов»", "fillContragentsAlt")
    .addItem("Обновить «Соотвествие статьей БК ДДС»", "sdds")
    .addToUi()
  }  