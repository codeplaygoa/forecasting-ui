import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router  , ActivatedRoute } from '@angular/router';
import {NgbTabChangeEvent, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService, CategoryPPG } from '../../../../shared/services/category.service';
import { Subscription } from 'rxjs';
import { RestApiService } from "../../../../shared/services/rest-api.service";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-retailerwise',
  templateUrl: './retailerwise.component.html',
  styleUrls: ['./retailerwise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RetailerwiseComponent implements OnInit {

    public currentCategory;
    public currentppg;
    public previousYear; 
    public currentYear; 
    public nextYear; 
    public ppgContributionsCurrentYearWise; 
    public ppgContributionsNextYearWise; 
    public ppgContributionsCurrentYear; 
    public ppgContributionsNextYear;
    
    public retailerContributionsCurrentYearWise; 
    public retailerContributionsNextYearWise; 
    public retailerContributionsCurrentYear; 
    public retailerContributionsNextYear;
    
    public urtgrowth;
    public rbgrowth;
    public rbshare;
    public rbsharechange;
    public retailerName;
    public retailerId;
    public retailers;
    
    public bgsuccess = "bg-success left-align";
    public bgwarning = "bg-secondary";
    subscription: Subscription;    
    
  constructor(private route: ActivatedRoute, private restApi: RestApiService, private categoryService: CategoryService, config: NgbModalConfig, private modalService: NgbModal) {  
      
        config.backdrop = 'static';
        config.keyboard = false;
        route.params.subscribe(
      params => {
          //console.log(params)
          this.retailerId = params['retailerid']
      //console.log("retailerID"+this.retailerId)
      
        //console.log("subscription outside")          
         
      
        this.categoryService.getCategory().subscribe(currentCategory => {      
             //console.log(currentCategory)
            if (currentCategory) { 
                //console.log("subscription inside if")
                this.currentCategory = currentCategory  
                //console.log(this.currentCategory)
                this.currentYear = this.currentCategory.year -1
                this.previousYear = this.currentCategory.year - 2
                this.nextYear = this.currentCategory.year
                this.restApi.getRetailers().subscribe((retailers: {}) => {
                    //console.log(retailers)
                    this.retailers = retailers
                    var retailerName = this.retailers.find(x=> Number(x.retailer_id) == Number(this.retailerId))
                    this.retailerName = retailerName.retailer_name; 
                    (<HTMLButtonElement>document.getElementById("retailerDropDown")).textContent = this.retailerName
                });
                if(this.currentCategory.hasOwnProperty('category') && this.currentCategory.hasOwnProperty('year') && this.currentCategory.hasOwnProperty('aggregation') ){                    
                   if(this.currentCategory.category!="" && this.currentCategory.year!="" && this.currentCategory.aggregation !="" && this.retailerId!=""){ this.restApi.getSpecificRetailerRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise',this.retailerId).subscribe((data: {}) => {
                        var retailerContributionsCurrentYear = data[this.currentCategory.year - 1]
                        this.retailerContributionsCurrentYear = retailerContributionsCurrentYear   
                        var retailerContributionsNextYear = data[this.currentCategory.year]
                        this.retailerContributionsNextYear = retailerContributionsNextYear                         
                        
                       this.restApi.getAllSegmentRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise',this.retailerId).subscribe((ppgdata: {}) => {
                            //console.log( ppgdata)
                            var ppgContributionsCurrentYear = ppgdata[this.currentCategory.year - 1]
                            this.retailerContributionsCurrentYear.forEach( (element,index) => {
                             //   if(element.retailer_name == this.retailerName){
                                    ppgContributionsCurrentYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                              //  } 
                            });
                            this.ppgContributionsCurrentYear = ppgContributionsCurrentYear 
                            var ppgContributionsNextYear = ppgdata[this.currentCategory.year]
                            this.retailerContributionsNextYear.forEach( (element,index) => {
                              //  if(element.retailer_name == this.retailerName){
                                    ppgContributionsNextYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                               // }
                            });
                            this.ppgContributionsNextYear = ppgContributionsNextYear                            
                           
                        }) 
                        
                    })
                    
                   this.restApi.getSpecificRetailerRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'monthwise',this.retailerId).subscribe((data: {}) => {
                        var retailerContributionsCurrentYearWise = data[this.currentCategory.year - 1]
                        this.retailerContributionsCurrentYearWise = retailerContributionsCurrentYearWise                         
                        var retailerContributionsNextYearWise = data[this.currentCategory.year - 1]
                        this.retailerContributionsNextYearWise = retailerContributionsNextYearWise 
                       this.restApi.getAllSegmentRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'monthwise',this.retailerId).subscribe((ppgdata: {}) => {
                            //console.log( ppgdata)
                            var ppgContributionsCurrentYearWise = ppgdata[this.currentCategory.year - 1]
                            this.retailerContributionsCurrentYearWise.forEach( (element,index) => {
                              //  if(element.retailer_name == this.retailerName){
                                    ppgContributionsCurrentYearWise.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','jan':element.jan,'feb':element.feb,'mar':element.mar,'apr':element.apr,'may':element.may,'jun':element.jun,'jul':element.jul,'aug':element.aug,'sep':element.sep,'oct':element.oct,'nov':element.nov,'dec':element.dec,'fy':element.fy,'fy_ds':element.fy_ds})
                              //  } 
                            });
                            this.ppgContributionsCurrentYearWise = ppgContributionsCurrentYearWise 
                            var ppgContributionsNextYearWise = ppgdata[this.currentCategory.year]
                            this.retailerContributionsNextYearWise.forEach( (element,index) => {
                              //  if(element.retailer_name == this.retailerName){
                                    ppgContributionsNextYearWise.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','jan':element.jan,'feb':element.feb,'mar':element.mar,'apr':element.apr,'may':element.may,'jun':element.jun,'jul':element.jul,'aug':element.aug,'sep':element.sep,'oct':element.oct,'nov':element.nov,'dec':element.dec,'fy':element.fy,'fy_ds':element.fy_ds})
                              //  } 
                            });
                            this.ppgContributionsNextYearWise = ppgContributionsNextYearWise
                        }) 
                        
                    })

                   }
                }
            }
      });  
          });
    
  }

  ngOnInit(): void {
       
  }
    
  downloadCsv(){
      let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(this.retailerName + ' Dashboard for '+this.nextYear);
        let i = 1;
        let titleRow = worksheet.addRow([this.retailerName + ' ' + this.currentCategory.categoryname+' Total RB and Segments Quarterwise']);
        
        titleRow.font = {  bold: true }
        worksheet.mergeCells('A'+i+':M'+i);
        i++;       
        worksheet.addRow([]);
        i++;
        let tableheaderRow = worksheet.addRow(['Data for '+this.currentYear,'','','','','','','Data for '+this.nextYear,'','','','','']);
        worksheet.mergeCells('A'+i+':F'+i);
        worksheet.mergeCells('H'+i+':M'+i);
        tableheaderRow.font = {  bold: true }
        tableheaderRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor:{argb:'43FFFFFF'},
            bgColor:{argb:'43FFFFFF'}
          }
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        })
        worksheet.getCell("G"+i).border = { top: { style: 'thin' ,color: {argb:'FFFFFFFF'}}, bottom: { style: 'thin' ,color: {argb:'FFFFFFFF'}} }
        worksheet.getCell("G"+i).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' },
            bgColor: { argb: 'FFFFFFFF' }
          }
       
        i++;
        
        tableheaderRow = worksheet.addRow(['Segment','Q1','Q2','Q3','Q4','FY '+this.currentYear,'','Segment','Q1','Q2','Q3','Q4','FY '+this.nextYear]);
        
        tableheaderRow.font = {  bold: true }
        tableheaderRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor:{argb:'43FFFFFF'},
            bgColor:{argb:'43FFFFFF'}
          }
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        })
        worksheet.getCell("G"+i).border = { top: { style: 'thin' ,color: {argb:'FFFFFFFF'}}, bottom: { style: 'thin' ,color: {argb:'FFFFFFFF'}} }
        worksheet.getCell("G"+i).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' },
            bgColor: { argb: 'FFFFFFFF' }
          }
        worksheet.getCell("N"+i).border = { top: { style: 'thin' ,color: {argb:'FFFFFFFF'}}, bottom: { style: 'thin' ,color: {argb:'FFFFFFFF'}} }
        worksheet.getCell("N"+i).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' },
            bgColor: { argb: 'FFFFFFFF' }
          }
        i++;
        
        
        
        
        ////ppg
        let Row;
        this.ppgContributionsCurrentYear.forEach((element, index) => {
            Row = worksheet.addRow([this.ppgContributionsCurrentYear[index].ppg_name,this.ppgContributionsCurrentYear[index].q1,this.ppgContributionsCurrentYear[index].q2,this.ppgContributionsCurrentYear[index].q3,this.ppgContributionsCurrentYear[index].q4,this.ppgContributionsCurrentYear[index].fy,'',this.ppgContributionsNextYear[index].ppg_name,this.ppgContributionsNextYear[index].q1,this.ppgContributionsNextYear[index].q2,this.ppgContributionsNextYear[index].q3,this.ppgContributionsNextYear[index].q4,this.ppgContributionsNextYear[index].fy]);

            Row.eachCell((cell, number) => {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor:{argb:'43FFFFFF'},
                bgColor:{argb:'43FFFFFF'}
              }
              cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
            })
            worksheet.getCell("G"+i).border = { top: { style: 'thin' ,color: {argb:'FFFFFFFF'}}, bottom: { style: 'thin' ,color: {argb:'FFFFFFFF'}} }
            worksheet.getCell("G"+i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFFFF' },
                bgColor: { argb: 'FFFFFFFF' }
              }
            worksheet.getCell("N"+i).border = { top: { style: 'thin' ,color: {argb:'FFFFFFFF'}}, bottom: { style: 'thin' ,color: {argb:'FFFFFFFF'}} }
            worksheet.getCell("N"+i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFFFF' },
                bgColor: { argb: 'FFFFFFFF' }
              }
            i++;
        });
        worksheet.addRow([]);
        i++;
       titleRow = worksheet.addRow([this.retailerName + ' ' + this.currentCategory.categoryname+' Total RB and Segments Monthwise ']);
        
        titleRow.font = {  bold: true }
        worksheet.mergeCells('A'+i+':N'+i);
        i++;       
        worksheet.addRow([]);
        i++;
        tableheaderRow = worksheet.addRow(['Data for '+this.nextYear,'','','','','','','','','','','','','']);
        worksheet.mergeCells('A'+i+':N'+i);
        tableheaderRow.font = {  bold: true }
        tableheaderRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor:{argb:'43FFFFFF'},
            bgColor:{argb:'43FFFFFF'}
          }
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        })       
       
        i++;
      
      tableheaderRow = worksheet.addRow(['Segment','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC', 'FY '+this.nextYear]);
        
        tableheaderRow.font = {  bold: true }
        tableheaderRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor:{argb:'43FFFFFF'},
            bgColor:{argb:'43FFFFFF'}
          }
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        })
        
        i++;
      
        this.ppgContributionsNextYearWise.forEach((element, index) => {
            Row = worksheet.addRow([this.ppgContributionsNextYearWise[index].ppg_name,this.ppgContributionsNextYearWise[index].jan,this.ppgContributionsNextYearWise[index].feb,this.ppgContributionsNextYearWise[index].mar,this.ppgContributionsNextYearWise[index].apr,this.ppgContributionsNextYearWise[index].may,this.ppgContributionsNextYearWise[index].jun,this.ppgContributionsNextYearWise[index].jul,this.ppgContributionsNextYearWise[index].aug,this.ppgContributionsNextYearWise[index].sep,this.ppgContributionsNextYearWise[index].oct,this.ppgContributionsNextYearWise[index].nov,this.ppgContributionsNextYearWise[index].dec,this.ppgContributionsNextYearWise[index].fy]);

            Row.eachCell((cell, number) => {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor:{argb:'43FFFFFF'},
                bgColor:{argb:'43FFFFFF'}
              }
              cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
            })
            
            i++;
        });
      
       worksheet.addRow([]);
        i++;
       
        tableheaderRow = worksheet.addRow(['Data for '+this.currentYear,'','','','','','','','','','','','','']);
        worksheet.mergeCells('A'+i+':N'+i);
        tableheaderRow.font = {  bold: true }
        tableheaderRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor:{argb:'43FFFFFF'},
            bgColor:{argb:'43FFFFFF'}
          }
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        })       
       
        i++;
      
      tableheaderRow = worksheet.addRow(['Segment','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC', 'FY '+this.currentYear]);
        
        tableheaderRow.font = {  bold: true }
        tableheaderRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor:{argb:'43FFFFFF'},
            bgColor:{argb:'43FFFFFF'}
          }
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        })
        
        i++;
      
        this.ppgContributionsCurrentYearWise.forEach((element, index) => {
            Row = worksheet.addRow([this.ppgContributionsCurrentYearWise[index].ppg_name,this.ppgContributionsCurrentYearWise[index].jan,this.ppgContributionsCurrentYearWise[index].feb,this.ppgContributionsCurrentYearWise[index].mar,this.ppgContributionsCurrentYearWise[index].apr,this.ppgContributionsCurrentYearWise[index].may,this.ppgContributionsCurrentYearWise[index].jun,this.ppgContributionsCurrentYearWise[index].jul,this.ppgContributionsCurrentYearWise[index].aug,this.ppgContributionsCurrentYearWise[index].sep,this.ppgContributionsCurrentYearWise[index].oct,this.ppgContributionsCurrentYearWise[index].nov,this.ppgContributionsCurrentYearWise[index].dec,this.ppgContributionsCurrentYearWise[index].fy]);

            Row.eachCell((cell, number) => {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor:{argb:'43FFFFFF'},
                bgColor:{argb:'43FFFFFF'}
              }
              cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
            })
            
            i++;
        });
      
      workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, this.retailerName + ' Dashboard for '+this.nextYear+'.xlsx');
        })
  }

}
