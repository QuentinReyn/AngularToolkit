import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as prettier from 'prettier/standalone';
import * as htmlParser from 'prettier/parser-html';
import { ClassParserService } from 'src/app/core/services/class-parser.service';
import { JsonParserService } from 'src/app/core/services/json-parser.service';

@Component({
  selector: 'app-json-to-form',
  templateUrl: './json-to-form.component.html',
  styles: [
  ]
})
export class JsonToFormComponent implements OnInit {

  public currentCount = 0;
  constructor(private jsonParserService: JsonParserService) { }

  options: { isHtml: boolean, isClass: boolean, cssClass: string, isGrid: boolean, isMaterial: boolean } = { isHtml: false, isClass: false, cssClass: '', isGrid: false, isMaterial: false };
  form: FormGroup = new FormGroup({
    modelControl: new FormControl(`{
      "Id": 1,
      "Name": "MyJson",
      "ConstructorId": 6,
      "SocketCpu": "Test",
      "MotherBoards": []
  }
  `),
    formControl: new FormControl(""),
    htmlControl: new FormControl(""),
    isHtml: new FormControl(false),
    isLabelClass: new FormControl(false),
    isInputClass: new FormControl(false),
    isGrid: new FormControl(false),
    isMaterial: new FormControl(false),
    labelCssClass: new FormControl(""),
    inputCssClass: new FormControl(""),
    isPrefill: new FormControl(false),
    prefillPrefix: new FormControl(""),
    isRequired: new FormControl(false),
  })

  ngOnInit(): void {
    this.form.get('isHtml')?.valueChanges.subscribe(m => {
      !m ? this.form.get('htmlControl')?.setValue("") : {}
    });
  }

  convert() {
    let tt = this.jsonParserService.getPropertyNamesAndTypes(this.form.get('modelControl')?.value)
    console.log(tt)
    this.form.patchValue({
      formControl: this.transformPropertiesIntoRow(tt).join('\n')
    })

    // if (this.form.get('isHtml')?.value) {
    //   this.form.patchValue({
    //     htmlControl: prettier.format(this.generateHtml(tt).join('\n'), { parser: 'html', plugins: [htmlParser] })
    //   })
    // }
  }

  generateHtml(properties: string[]) {
    const rows: string[] = [];
    console.log(this.form.get('labelCssClass')?.value)
    properties.forEach((property, index) => {
      let row =
        `<div>
            <label for="${property}" class="${this.form.get('labelCssClass')?.value}">${property}</label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="max-w-lg flex rounded-md shadow-sm">
                <input formControlName="${property}" type="text" name="${property}" id="${property}"
                  class="${this.form.get('inputCssClass')?.value}">
              </div>
            </div>
          </div>`
      rows.push(row);
    });
    return rows;
  }

  transformPropertiesIntoRow(properties: { propertyName: string, propertyType: string }[]) {
    const rows: string[] = [];
    const firstRow = 'this.form = new FormGroup({'
    rows.push(firstRow);
    properties.forEach((property, index) => {
      const prefillControl = this.form.get('isPrefill')?.value ? 'this.' + this.form.get('prefillPrefix')?.value + '.' + property.propertyName : `''`
      let row = "";
      switch (property.propertyType) {
        case 'number':
          row = `     ${property.propertyName}: new FormControl(${prefillControl})${index !== properties.length - 1 ? ',' : ''}`
          break;
        case 'string':
          row = `     ${property.propertyName}: new FormControl(${prefillControl})${index !== properties.length - 1 ? ',' : ''}`
          break;
        case 'array':
          row = `     ${property.propertyName}: new FormArray([])${index !== properties.length - 1 ? ',' : ''}`
          break
        case 'object':
          row = `     ${property.propertyName}: new FormGroup({})${index !== properties.length - 1 ? ',' : ''}`
          break;
        default:
          row = `     ${property.propertyName}: new FormControl(${prefillControl})${index !== properties.length - 1 ? ',' : ''}`
          break;

      }
      rows.push(row);

    })
    const lastRow = '});'
    rows.push(lastRow);
    return rows;
  }
}
