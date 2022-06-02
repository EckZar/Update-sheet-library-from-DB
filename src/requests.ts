function getRequest(accessToken: string, apiRequest: string, limit: number, offset: number){    
  let request = UrlFetchApp.fetch(`${apiRequest}?limit= ${limit}&offset=${offset}`, { 
    headers: {
      method: 'GET',
      Authorization: 'Bearer ' + accessToken
    }
  });
  
  return JSON.parse(request.getContentText());  
}

function postRequest(accessToken: string, apiRequest: string, limit: number){
  let request = UrlFetchApp.fetch(`${apiRequest}?limit= ${limit}`, { 
    headers: {
      method: 'POST',
      Authorization: 'Bearer ' + accessToken
    }
  });
  
  return JSON.parse(request.getContentText());
}
