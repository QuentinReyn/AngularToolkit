import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonParserService {

  constructor() { }

  getPropertyNamesAndTypes(objString: string): { propertyName: string, propertyType: string }[] {
    const obj = JSON.parse(objString);
    const properties: { propertyName: string, propertyType: string }[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const propertyType = Array.isArray(obj[key]) ? 'array' : typeof obj[key];
        properties.push({ propertyName: key, propertyType: propertyType });
      }
    }
    return properties;
  }

}
