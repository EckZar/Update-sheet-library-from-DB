function fillContragents(){ // Контрагенты

    let service = getDriveService();
    let accessToken = service.getAccessToken()
    
    let contr = getRequest(accessToken, "", 1500, 0);
  
    contr = contr.data
  
    let uniques = contr.map((obj: { contractorGuid1C: string; }) => obj.contractorGuid1C )
                        .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
                        .map((arr: { contractorGuid1C: any; status: any }) =>
                            { 
                            return arr = { 
                                            "contractorGuid1C":arr,
                                            "status":contr.filter((obj: { contractorGuid1C: { contractorGuid1C: any; status: any; }; })=>obj.contractorGuid1C==arr)
                                                        .map((obj: { period: string | number | Date; inPerimetr: any; })=>[new Date(obj.period), obj.inPerimetr])
                                                        .sort((a: number[], b: number[]) => b[0] - a[0])[0][1]
                                        }
                            })
                        .filter((obj: { status: boolean; })=>obj.status==true)
                        .map((obj: { contractorGuid1C: any; }) => obj.contractorGuid1C);
  
    //================================================================
    
    let array = getContractors(uniques);
  
    pasteArr("Контрагент", array, "");
  
    return array;
  
  }

function fillContragentsAlt(){

    let sheet = SpreadsheetApp.openById("").getSheetByName("Контрагенты");
    let values = sheet.getRange(2, 1, sheet.getLastRow()+1, 4).getValues();  
    pasteArr("Контрагент", values, "");
  
    return values;
  
  }


  