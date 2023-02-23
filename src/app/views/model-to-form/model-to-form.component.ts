import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassParserService } from '../../core/services/class-parser.service';

@Component({
  selector: 'app-model-to-form',
  templateUrl: './model-to-form.component.html',
  styles: [
  ]
})
export class ModelToFormComponent implements OnInit {

  public currentCount = 0;
  constructor(private classParserService:ClassParserService){}

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
    formControl:new FormControl("")
  })

  ngOnInit(): void {

  }

  convert(){
    let tt=this.classParserService.extractPropertyNames(this.form.get('modelControl')?.value)
    this.form.patchValue({
      formControl: this.transformPropertiesIntoRow(tt).join('\n')
    })
  }

  transformPropertiesIntoRow(properties:string[]){
    const rows: string[] = [];
    const firstRow = 'this.myForm = new FormGroup({'
    rows.push(firstRow);
    properties.forEach((property,index)=>{
      if(index !== properties.length - 1){
        let row = `     ${property}: new FormControl('',Validators.Required),`
        rows.push(row);
      }
      else{
        let row = `     ${property}: new FormControl('',Validators.Required)`
        rows.push(row);
      }
    })
    const lastRow = ')}'
    rows.push(lastRow);
    return rows;
  }
}
