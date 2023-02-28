import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassParserService } from '../../core/services/class-parser.service';
import * as prettier from 'prettier/standalone';
import * as htmlParser from 'prettier/parser-html';

@Component({
  selector: 'app-model-to-form',
  templateUrl: './model-to-form.component.html',
  styles: [
  ]
})
export class ModelToFormComponent implements OnInit {

  public currentCount = 0;
  constructor(private classParserService:ClassParserService){}

  options: {isHtml:boolean,isClass:boolean,cssClass:string,isGrid:boolean,isMaterial:boolean} = {isHtml:false,isClass:false,cssClass:'',isGrid:false,isMaterial:false};
  form: FormGroup = new FormGroup({
    modelControl:new FormControl(` export class MotherBoardTemplate {
      Id: number;
      Name: string;
      ConstructorId?: number;
      SocketCpu: string;
      CpuCount?: number;
      RamType: string;
      RamQuantity?: number;
      UsbCount?: number;
      SerialPortCount?: number;
      PciCount?: number;
      PcieCount?: number;
      Format: string;
      ImageId?: number;
      EthPortCount?: number;
      Constructor: ListValue;
      Image: FileData;
      MotherBoards: MotherBoard[];
  }
  `),
    formControl:new FormControl(""),
    htmlControl:new FormControl(""),
    isHtml:new FormControl(false),
    isLabelClass:new FormControl(false),
    isInputClass:new FormControl(false),
    isGrid:new FormControl(false),
    isMaterial:new FormControl(false),
    labelCssClass:new FormControl(""),
    inputCssClass:new FormControl(""),
  })

  ngOnInit(): void {

  }

  convert(){
    let tt=this.classParserService.extractPropertyNames(this.form.get('modelControl')?.value)
    this.form.patchValue({
      formControl: this.transformPropertiesIntoRow(tt).join('\n')
    })

    if(this.form.get('isHtml')?.value){
      this.form.patchValue({
        htmlControl: prettier.format(this.generateHtml(tt).join('\n'), { parser: 'html', plugins: [htmlParser] })
      })
    }
  }

  generateHtml(properties:string[]){   
    const rows: string[] = [];
    console.log(this.form.get('labelCssClass')?.value)
    properties.forEach((property,index)=>{
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

  transformPropertiesIntoRow(properties:string[]){
    const rows: string[] = [];
    const firstRow = 'this.myForm = new FormGroup({'
    rows.push(firstRow);
    properties.forEach((property,index)=>{
      if(index !== properties.length - 1){
        let row = `     ${property}: new FormControl('',Validators.required),`
        rows.push(row);
      }
      else{
        let row = `     ${property}: new FormControl('',Validators.required)`
        rows.push(row);
      }
    })
    const lastRow = ')}'
    rows.push(lastRow);
    return rows;
  }
}
