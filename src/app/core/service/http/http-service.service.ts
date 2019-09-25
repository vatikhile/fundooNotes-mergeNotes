
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  //It hit the API for login ,forgot and register purpose
  postRequest(url, data) {
    return this.http.post(this.baseUrl + url, data)
  }
  //It make the data into encoded format
  getEncodData(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  //It hit the API for reset the password
  post(url, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('token'));
    return this.http.post(this.baseUrl + url, this.getEncodData(data), httpOptions);
  }
  //It hit the API for adding the new note in the database
  addNotes(url, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')

      })

    };
    console.log("token--------->", localStorage.getItem('token'));
    return this.http.post(this.baseUrl + url, data, httpOptions)


  }
  //It hit the API for getting the note which is added in the database
  getData(url) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')

      })

    };
    console.log("token--------->", localStorage.getItem('token'));
    return this.http.get(this.baseUrl + url, httpOptions)

  }
  postEdit(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }
  showLabel(url) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.baseUrl + url, httpOptions);


  }
  delete(url) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Id')
      })

    }
    return this.http.delete(this.baseUrl + url, httpOptions);
  }
  postEd(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }
  postUpdate(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }

    return this.http.post(this.baseUrl + url, data, httpOptions);
  }
  postData(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
 
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }

  getNoteArchive1(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('id')
    );
    return this.http.get(this.baseUrl + url, httpOptions);
  }
  postNewData(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('token')
    );
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }

  getNote(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('token')
    );
    return this.http.get(this.baseUrl + url, httpOptions);
  }
  postDelete(url, data) {
    console.log("service data", data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('token'));

    return this.http.post(this.baseUrl + url, data, httpOptions);
  }

  postLabel(url, data) {
    //console.log("service data",data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in delete label', localStorage.getItem('id'));

    return this.http.post(this.baseUrl + url, data, httpOptions);
  }
  getLabel(url) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('token'));

    return this.http.get(this.baseUrl + url, httpOptions);
  }
  postSearch(url, data) {
    console.log("service data", data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token in s', localStorage.getItem('token'));

    return this.http.post(this.baseUrl + url, data, httpOptions);
  }

  delete1(url) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })

    }
    return this.http.delete(this.baseUrl + url, httpOptions);
  }
  delete2(url, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })

    }
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }
  pinUnpin(url, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.baseUrl + url, data, httpOptions)
  }
  noteData(url) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.baseUrl + url, httpOptions)
  }
  addQuestion(url, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.baseUrl + url, data, httpOptions)
  }
  httpGetWithoutToken(url: any) {
  
    
    return this.http.get(this.baseUrl+url);
  }

  postRequest1(url: any, data: any) {
    console.log(data);

    return this.http.post(this.baseUrl + url, data);
  }
  getCartDetailService(url: any){
    return this.http.get(this.baseUrl + url);
  }
  getCarts(url: any) {
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.baseUrl + url,httpOptions);
  }
}