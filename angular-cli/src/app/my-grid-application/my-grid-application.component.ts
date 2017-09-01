import {Component} from "@angular/core";
import "ag-grid-enterprise";
import {GridOptions} from "ag-grid/main";


var document: any;

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent {
  gridOptions: GridOptions;
  columnDefs: any[]
  rowData: any[];
  data: any[];
  public assignedtogridlist: any = [''];
  public formatter = new Intl.NumberFormat('en-us', {

    style: 'currency',

    currency: 'USD',

    minimumFractionDigits: 2,

  })

  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.getNodeChildDetails = function (file) {
      if (file.group) {
        return {
          group: true,
          children: file.children,
          expanded: false,
          key: 'group'
        };
      } else {
        return null;
      }
    };
    this.gridOptions.floatingFilter = true;
    this.gridOptions.enableGroupEdit = true;
    this.gridOptions.singleClickEdit = true;

    var _self = this;

    this.columnDefs = [

      {
        headerName: "group", width: 150, cellRenderer: 'group', field:'group', cellRendererParams: {

        // innerRenderer: _self.innerCellRenderer,

        suppressCount: true

      }, suppressFilter: true
      },

      {
        headerName: "Fund Family Id",
        width: 100,
        field: "FundFamilyID",
        tooltipField: "FundFamilyID",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}
      },

      {
        headerName: "Fund Family Name",
        width: 100,
        field: "Fundfamily",
        tooltipField: "Fundfamily",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}
      },

      {

        headerName: "File ID",
        field: "MasterId",
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "MasterId",
        width: 70,

        valueGetter: function (params) {

          return _self.formatMasterId(params);

        }

      },

      {
        headerName: "File Name",
        width: 70,
        field: "FileName",
        tooltipField: "FileName",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}
      },

      {
        headerName: "Product Team",
        width: 70,
        field: "Team",
        tooltipField: "Team",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}
      },

      {

        headerName: "Symbol",
        width: 100,
        field: "Symbol",
        tooltipField: "Symbol",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}

        // valueGetter: function (params) { return _self.getBatchSymbol(params) }

      },

      {
        headerName: "External Fund ID",
        width: 100,
        field: "XTRNL_FUND_ID",
        tooltipField: "XTRNL_FUND_ID",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}
      },

      {

        headerName: "File Type",
        width: 70,
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true},
        field: "FeeType",
        tooltipField: "FeeType",
        valueGetter: function (params) {
          return _self.FeeType(params);
        }

      },

      {
        headerName: "Fee Period End Date",
        width: 100,
        floatingFilterComponentParams: {suppressFilterButton: true},
        field: "FeePeriodDate",
        tooltipField: "FeePeriodDate",
        filter: 'text'
      },

      {
        headerName: "Total Records Uploaded",
        width: 100,
        field: "TotalUploaded",
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "TotalUploaded",
        filter: 'text'
      },

      {
        headerName: "Expected Fee Record",
        width: 100,
        field: "Total",
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "Total",
        filter: 'text'
      },

      {

        headerName: "Batch Progress",
        field: "BatchProgress",
        width: 200,
        floatingFilterComponentParams: {suppressFilterButton: true},
        filter: 'text',
        cellRenderer: function (params) {
          return _self.BatchProgress(params);
        },
        suppressFilter: true

      },

      {

        headerName: "Fee Amount",
        field: "FeeAmount",
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "FeeAmount",
        filter: 'text',
        width: 100,
        valueGetter: function (params) {
          return _self.formatCurrency(params.data.FeeAmount);
        }

      },

      {

        headerName: "Scrape/Sales Credit Total",
        width: 100,
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "TotalScrapeMasterId",
        field: "TotalScrape",
        valueGetter: function (params) {
          return _self.formatCurrency(params.data.TotalScrape);
        }

      },

      {

        headerName: "Net Payment Amount",
        field: "NetPayment",
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "NetPayment",
        filter: 'text',
        width: 100,
        valueGetter: function (params) {
          return _self.formatCurrency(params.data.NetPayment);
        }

      },

      {

        headerName: "Assigned To",
        field: "AssignedTo",
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "AssignedTo",
        width: 100,
        cellRenderer: function (params) {
          return _self.AssignedTo(_self, params);
        },
        editable: function (params) {

          //if (_self.airsAuthorizationService.Authorization.auth.InValidUser === false) {

          if (params.node.data.indent == 1 || params.node.data.Status.toUpperCase() != "OPEN")

            return false;

          else

            return true;

          //}

          //else return false;

        },
        cellEditor: 'select',
        volatile: true,

        cellEditorParams: {

          cellRenderer: function (params) {
            return _self.AssignedTo(_self, params);
          },

          cellEditor: 'select',

          values: this.assignedtogridlist

        }

        // newValueHandler: function (params) {

        //     _self.UpdateAssignedTo(params);

        // }

      },

      {
        headerName: "Source",
        field: "Source",
        floatingFilterComponentParams: {suppressFilterButton: true},
        tooltipField: "Source",
        width: 70,
        filter: 'text'
      },

      {
        headerName: "Fee Frequency",
        field: "Fee_Freq",
        tooltipField: "Fee_Freq",
        floatingFilterComponentParams: {suppressFilterButton: true},
        width: 100,
        filter: 'text'
      },

      {
        headerName: "Created By",
        field: "CrtUserId",
        tooltipField: "CrtUserId",
        floatingFilterComponentParams: {suppressFilterButton: true},
        width: 100,
        filter: 'text'
      },

      {
        headerName: "Created Date",
        field: "CrtDate",
        tooltipField: "CrtDate",
        width: 100,
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true}
      },

      {
        headerName: "Recon Status",
        field: "Status",
        tooltipField: "Status",
        floatingFilterComponentParams: {suppressFilterButton: true},
        width: 100,
        filter: 'text',
        cellRenderer: function (params) {
          return _self.ReconStatus(params);
        }
      },

      {

        headerName: "",
        width: 30,
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true},
        cellRenderer: function (params) {

          return _self.attachment(params);

        },
        suppressFilter: true

      },

      {

        headerName: "",
        width: 30,
        filter: 'text',
        floatingFilterComponentParams: {suppressFilterButton: true},
        cellRenderer: function (params) {

          return _self.DeleteBatch(params)

        },
        suppressFilter: true

      },

    ];

    this.data = [{
      "id": 0,
      "MasterId": 0,
      "UploadType": null,
      "FileName": null,
      "Team": "",
      "Fundfamily": "XXXXXX",
      "XTRNL_FUND_ID": null,
      "FeeType": "X",
      "Total": 6,
      "TotalUploaded": 6,
      "Successful": "0",
      "HBreak_PL1": "3",
      "Success_PL2": "0",
      "HBreak_Fnl": "0",
      "Success_PL1": "0",
      "Success_Fnl": "0",
      "FeeAmount": 600.000,
      "TotalScrape": 0.000,
      "NetPayment": 0.000,
      "Source": "UPLOAD",
      "CrtDate": "08/01/2017 03:15:42 AM",
      "Status_cde": "OPEN",
      "DescText": null,
      "Status": "Open",
      "StatusFile": null,
      "CrtUserId": "XXX",
      "HBreak_PL2": "1",
      "SBreak_PL1": "0",
      "SBreak_PL2": "0",
      "SBreak_Fnl": "0",
      "FeePeriodDate": "07/30/2017",
      "HBreak": "4",
      "SBreak": "0",
      "AssignedTo": "XXXX",
      "Fee_Freq": "MONTHLY ",
      "MasterRow": "M",
      "FundFamilyID": "2907",
      "Suc_Res_PL1": "0",
      "Suc_Res_PL2": "0",
      "Suc_Res_Fnl": "0",
      "Processed": "0",
      "Successful_Reverse": "0",
      "SBreak_Res_PL1": "0",
      "SBreak_Res_PL2": "0",
      "SBreak_Res": "0",
      "SBreak_Res_Fnl": "0",
      "MultipleFile": "3847,3846",
      "IND_RVRS": "X",
      "Symbol": null,
      "MultipleBatch": "9689,9688",
      "MasterIdMax": 3847,
      "Processed_Res": "0"
    }, {
      "id": 9689,
      "MasterId": 3847,
      "UploadType": "XXX",
      "FileName": "SAMPLE.xlsx",
      "Team": "",
      "Fundfamily": "XXXXXX",
      "XTRNL_FUND_ID": "XXXXXX",
      "FeeType": "X",
      "Total": 3,
      "TotalUploaded": 3,
      "Successful": "0",
      "HBreak_PL1": "3",
      "Success_PL2": "0",
      "HBreak_Fnl": "0",
      "Success_PL1": "0",
      "Success_Fnl": "0",
      "FeeAmount": 300.000,
      "TotalScrape": 0.000,
      "NetPayment": 0.000,
      "Source": "TEST",
      "CrtDate": "08/01/2017 03:15:42 AM",
      "Status_cde": "OPEN",
      "DescText": "CMPLTD",
      "Status": "Open",
      "StatusFile": "Completed",
      "CrtUserId": "XXX",
      "HBreak_PL2": "0",
      "SBreak_PL1": "0",
      "SBreak_PL2": "0",
      "SBreak_Fnl": "0",
      "FeePeriodDate": "07/30/2017",
      "HBreak": "3",
      "SBreak": "0",
      "AssignedTo": "XXXX",
      "Fee_Freq": "MONTHLY",
      "MasterRow": "",
      "FundFamilyID": "2907",
      "Suc_Res_PL1": "0",
      "Suc_Res_PL2": "0",
      "Suc_Res_Fnl": "0",
      "Processed": "0",
      "Successful_Reverse": "0",
      "SBreak_Res_PL1": "0",
      "SBreak_Res_PL2": "0",
      "SBreak_Res": "0",
      "SBreak_Res_Fnl": "0",
      "MultipleFile": null,
      "IND_RVRS": "X",
      "Symbol": null,
      "MultipleBatch": null,
      "MasterIdMax": 3847,
      "Processed_Res": "0"
    }, {
      "id": 9688,
      "MasterId": 3846,
      "UploadType": "FEE",
      "FileName": "SAMPLE1.xlsx",
      "Team": "",
      "Fundfamily": "XXXXXX",
      "XTRNL_FUND_ID": "XXXXXX",
      "FeeType": "X",
      "Total": 3,
      "TotalUploaded": 3,
      "Successful": "0",
      "HBreak_PL1": "0",
      "Success_PL2": "0",
      "HBreak_Fnl": "0",
      "Success_PL1": "0",
      "Success_Fnl": "0",
      "FeeAmount": 300.000,
      "TotalScrape": 0.000,
      "NetPayment": 0.000,
      "Source": "TEST",
      "CrtDate": "08/01/2017 02:53:59 AM",
      "Status_cde": "OPEN",
      "DescText": "CMPLTD",
      "Status": "Open",
      "StatusFile": "Completed",
      "CrtUserId": "XXX",
      "HBreak_PL2": "1",
      "SBreak_PL1": "0",
      "SBreak_PL2": "0",
      "SBreak_Fnl": "0",
      "FeePeriodDate": "07/30/2017",
      "HBreak": "1",
      "SBreak": "0",
      "AssignedTo": "XXXX",
      "Fee_Freq": "MONTHLY",
      "MasterRow": "",
      "FundFamilyID": "2907",
      "Suc_Res_PL1": "0",
      "Suc_Res_PL2": "0",
      "Suc_Res_Fnl": "0",
      "Processed": "0",
      "Successful_Reverse": "0",
      "SBreak_Res_PL1": "0",
      "SBreak_Res_PL2": "0",
      "SBreak_Res": "0",
      "SBreak_Res_Fnl": "0",
      "MultipleFile": null,
      "IND_RVRS": "X",
      "Symbol": null,
      "MultipleBatch": null,
      "MasterIdMax": 3846,
      "Processed_Res": "0"
    }]
    var indent = 0;
    var fundindent = 0;
    var parents = [];
    var children = [];
    var parentindex = 0;
    var groupedData_temp = [];
    var groupedData = [];
    // prepare the data
    //groupedData.push(data[0]);
    //console.log(data);

    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].MasterRow === "")
        var parent;
      if (this.data[i]["id"] === 0) this.data[i]["id"] = "batch" + i;
      if (i > 0 && this.data[i].MasterId === this.data[i - 1].MasterId && indent == 0) {
        indent = 1;
        //parents.push(i - 1);
        this.data[i]["indent"] = indent;
        this.data[i]["_collapsed"] = true;
        this.data[i]["children"] = [];
        children.push(this.data[i]);
        parentindex = groupedData_temp.length - 1;
      }
      else if (i > 0 && this.data[i].MasterId === this.data[i - 1].MasterId && indent > 0) {
        indent = 1;
        this.data[i]["indent"] = indent;
        this.data[i]["_collapsed"] = true;
        this.data[i]["children"] = [];
        children.push(this.data[i]);
        //parents.pop();
      } else if (i > 0 && this.data[i].MasterId !== this.data[i - 1].MasterId && indent > 0) {
        indent--;
        this.data[i]["indent"] = indent;
        this.data[i]["_collapsed"] = true;
        this.data[i]["children"] = [];
        groupedData_temp.push(this.data[i]);
        children = [];
        parentindex = 0;
      }
      else {
        this.data[i]["indent"] = indent;
        this.data[i]["_collapsed"] = true;
        this.data[i]["children"] = [];
        groupedData_temp.push(this.data[i]);
        children = [];
        parentindex = 0;
      }
      if (indent > 0) {
        groupedData_temp[parentindex]["children"] = children;
        groupedData_temp[parentindex]["group"] = true;
        //data.pop(data[i]);
      }
    }
    for (var i = 0; i < groupedData_temp.length; i++) {
      var parent;
      if (groupedData_temp[i]["id"] === 0)
        groupedData_temp[i]["id"] = "batch" + i;
      if (i > 0 && groupedData_temp[i].FundFamilyID === groupedData_temp[i - 1].FundFamilyID
        && groupedData_temp[i].FeeType === groupedData_temp[i - 1].FeeType
        && groupedData_temp[i].FeePeriodDate === groupedData_temp[i - 1].FeePeriodDate && fundindent == 0) {
        fundindent = 1;
        //parents.push(i - 1);
        groupedData_temp[i]["fundindent"] = fundindent;
        groupedData_temp[i]["_collapsed"] = true;
        // groupedData_temp[i]["children"] = [];
        children.push(groupedData_temp[i]);
        parentindex = groupedData.length - 1;
      }
      else if (i > 0 && groupedData_temp[i].FundFamilyID === groupedData_temp[i - 1].FundFamilyID
        && groupedData_temp[i].FeeType === groupedData_temp[i - 1].FeeType
        && groupedData_temp[i].FeePeriodDate === groupedData_temp[i - 1].FeePeriodDate && fundindent > 0) {
        fundindent = 1;
        groupedData_temp[i]["fundindent"] = fundindent;
        groupedData_temp[i]["_collapsed"] = true;
        // groupedData_temp[i]["children"] = [];
        children.push(groupedData_temp[i]);
      }
      else if (i > 0 && (groupedData_temp[i].FundFamilyID !== groupedData_temp[i - 1].FundFamilyID
          || groupedData_temp[i].FeeType !== groupedData_temp[i - 1].FeeType
          || groupedData_temp[i].FeePeriodDate !== groupedData_temp[i - 1].FeePeriodDate) && fundindent > 0) {
        fundindent--;
        groupedData_temp[i]["fundindent"] = fundindent;
        groupedData_temp[i]["_collapsed"] = true;
        //groupedData_temp[i]["children"] = [];
        groupedData.push(groupedData_temp[i]);
        children = [];
        parentindex = 0;
      }
      else {
        groupedData_temp[i]["fundindent"] = fundindent;
        groupedData_temp[i]["_collapsed"] = true;
        //groupedData_temp[i]["children"] = [];
        groupedData.push(groupedData_temp[i]);
        children = [];
        parentindex = 0;
      }
      if (fundindent > 0) {
        groupedData[parentindex]["children"] = children;
        groupedData[parentindex]["group"] = true;
      }
    }
    this.rowData = groupedData;
  }

  public formatMasterId(params) {

    if (params.data.MasterRow == "M")

      params.data.MasterId = "";

    return params.data.MasterId;

  }

  public FeeType(params) {

    try {

      if (params.data.FeeType === "T") {

        return "Trailer Fee";

      }

      else if (params.data.FeeType === "U") {

        return "Upfront Fee";

      }

      else

        return "";

    }

    catch (error) {

      // this.aiLogger.ErrorHandling(this.componentLog + ".FeeType() ", error);

    }

  }

  public BatchProgress(params) {

    try {

      var div_vis = 0;

      //var succ_prcnt = ((params.data.Successful / params.data.Total) * 100); if (succ_prcnt > 0) div_vis++;

      var succ_prcnt_pl1 = ((params.data.Success_PL1 / params.data.Total) * 70);
      if (succ_prcnt_pl1 > 0) div_vis++;

      var succ_prcnt_pl2 = ((params.data.Success_PL2 / params.data.Total) * 70);
      if (succ_prcnt_pl2 > 0) div_vis++;

      var soft_prcnt_pl1 = ((params.data.SBreak_PL1 / params.data.Total) * 70);
      if (soft_prcnt_pl1 > 0) div_vis++;

      var soft_prcnt_pl2 = ((params.data.SBreak_PL2 / params.data.Total) * 70);
      if (soft_prcnt_pl2 > 0) div_vis++;

      var soft_final = ((params.data.SBreak_Fnl / params.data.Total) * 70);
      if (soft_final > 0) div_vis++;


      var succ_res_prcnt_pl1 = ((params.data.Suc_Res_PL1 / params.data.Total) * 70);
      if (succ_res_prcnt_pl1 > 0) div_vis++;

      var succ_res_prcnt_pl2 = ((params.data.Suc_Res_PL2 / params.data.Total) * 70);
      if (succ_res_prcnt_pl2 > 0) div_vis++;

      var soft_res_prcnt_pl1 = ((params.data.SBreak_Res_PL1 / params.data.Total) * 70);
      if (soft_res_prcnt_pl1 > 0) div_vis++;

      var soft_res_prcnt_pl2 = ((params.data.SBreak_Res_PL2 / params.data.Total) * 70);
      if (soft_res_prcnt_pl2 > 0) div_vis++;

      var soft_res_final = ((params.data.SBreak_Res_Fnl / params.data.Total) * 70);
      if (soft_res_final > 0) div_vis++;

      var succ_res_final = ((params.data.Suc_Res_Fnl / params.data.Total) * 70);
      if (succ_res_final > 0) div_vis++;


      var hard_prcnt_pl1 = ((params.data.HBreak_PL1 / params.data.Total) * 70);
      if (hard_prcnt_pl1 > 0) div_vis++;

      var hard_prcnt_pl2 = ((params.data.HBreak_PL2 / params.data.Total) * 70);
      if (hard_prcnt_pl2 > 0) div_vis++;

      var hard_final = ((params.data.HBreak_Fnl / params.data.Total) * 70);
      if (hard_final > 0) div_vis++;

      var succ_final = ((params.data.Success_Fnl / params.data.Total) * 70);
      if (succ_final > 0) div_vis++;

      var proc_final = ((params.data.Processed / params.data.Total) * 70);
      if (proc_final > 0) div_vis++;

      var proc_res_final = ((params.data.Processed_Res / params.data.Total) * 70);
      if (proc_res_final > 0) div_vis++;

      //var succ_final = 0;


      //if (params.data.Level == "APPROVED" || params.data.Level == "DELETED") {

      //    succ_final = succ_prcnt;

      //    succ_prcnt = 0;

      //}

      var divs = function (key, value) {

        this.key = key;

        this.value = value;

      };

      var divs_array = [new divs("succ_prcnt_pl1", succ_prcnt_pl1), new divs("succ_prcnt_pl2", succ_prcnt_pl2), new divs("succ_final", succ_final),

        new divs("soft_prcnt_pl1", soft_prcnt_pl1), new divs("soft_prcnt_pl2", soft_prcnt_pl2), new divs("soft_final", soft_final),

        new divs("succ_res_prcnt_pl1", succ_res_prcnt_pl1), new divs("succ_res_prcnt_pl2", succ_res_prcnt_pl2), new divs("succ_res_final", succ_res_final),

        new divs("soft_res_prcnt_pl1", soft_res_prcnt_pl1), new divs("soft_res_prcnt_pl2", soft_res_prcnt_pl2), new divs("soft_res_final", soft_res_final),

        new divs("hard_prcnt_pl1", hard_prcnt_pl1), new divs("hard_prcnt_pl2", hard_prcnt_pl2), new divs("hard_final", hard_final), new divs("proc_final", proc_final)

        , new divs("proc_res_final", proc_res_final)];


      var highest = this.getHighest(divs_array);

      var found = 0;

      for (var i = 0; i < divs_array.length; i++) {

        if (divs_array[i].value === highest.value) {

          found++;

        }

      }

      var succ_diff_pl1 = 0;
      var succ_diff_pl2 = 0;
      var soft_diff_pl1 = 0;
      var soft_diff_pl2 = 0;
      var hard_diff_pl1 = 0;
      var hard_diff_pl2 = 0;

      var succfnl_diff = 0;
      var softfnl_diff = 0;
      var hardfnl_diff = 0;
      var succ_diff_res_pl1 = 0;
      var succ_diff_res_pl2 = 0;
      var soft_diff_res_pl1 = 0;
      var soft_diff_res_pl2 = 0;

      var succfnl_res_diff = 0;
      var softfnl_res_diff = 0;
      var procfnl_diff = 0;
      var procfnl_res_diff = 0;

      if (found > 0) {

        if (succ_prcnt_pl1 > 0 && succ_prcnt_pl1 < 10) {
          succ_diff_pl1 = 10 - succ_prcnt_pl1;
          succ_prcnt_pl1 = 10;
        }

        if (succ_prcnt_pl2 > 0 && succ_prcnt_pl2 < 10) {
          succ_diff_pl2 = 10 - succ_prcnt_pl2;
          succ_prcnt_pl2 = 10;
        }

        if (soft_prcnt_pl1 > 0 && soft_prcnt_pl1 < 10) {
          soft_diff_pl1 = 10 - soft_prcnt_pl1;
          soft_prcnt_pl1 = 10;
        }

        if (soft_prcnt_pl2 > 0 && soft_prcnt_pl2 < 10) {
          soft_diff_pl2 = 10 - soft_prcnt_pl2;
          soft_prcnt_pl2 = 10;
        }

        if (hard_prcnt_pl1 > 0 && hard_prcnt_pl1 < 10) {
          hard_diff_pl1 = 10 - hard_prcnt_pl1;
          hard_prcnt_pl1 = 10;
        }

        if (hard_prcnt_pl2 > 0 && hard_prcnt_pl2 < 10) {
          hard_diff_pl2 = 10 - hard_prcnt_pl2;
          hard_prcnt_pl2 = 10;
        }

        if (succ_res_prcnt_pl1 > 0 && succ_res_prcnt_pl1 < 10) {
          succ_diff_res_pl1 = 10 - succ_res_prcnt_pl1;
          succ_res_prcnt_pl1 = 10;
        }

        if (succ_res_prcnt_pl2 > 0 && succ_res_prcnt_pl2 < 10) {
          succ_diff_res_pl2 = 10 - succ_res_prcnt_pl2;
          succ_res_prcnt_pl2 = 10;
        }

        if (soft_res_prcnt_pl1 > 0 && soft_res_prcnt_pl1 < 10) {
          soft_diff_res_pl1 = 10 - soft_res_prcnt_pl1;
          soft_res_prcnt_pl1 = 10;
        }

        if (soft_res_prcnt_pl2 > 0 && soft_res_prcnt_pl2 < 10) {
          soft_diff_res_pl2 = 10 - soft_res_prcnt_pl2;
          soft_res_prcnt_pl2 = 10;
        }

        if (succ_final > 0 && succ_final < 10) {
          succfnl_diff = 10 - succ_final;
          succ_final = 10;
        }

        if (soft_final > 0 && soft_final < 10) {
          softfnl_diff = 10 - soft_final;
          soft_final = 10;
        }

        if (hard_final > 0 && hard_final < 10) {
          hardfnl_diff = 10 - hard_final;
          hard_final = 10;
        }

        if (succ_res_final > 0 && succ_res_final < 10) {
          succfnl_res_diff = 10 - succ_res_final;
          succ_res_final = 10;
        }

        if (soft_res_final > 0 && soft_res_final < 10) {
          softfnl_res_diff = 10 - soft_res_final;
          soft_res_final = 10;
        }

        if (proc_final > 0 && proc_final < 10) {
          procfnl_diff = 10 - proc_final;
          proc_final = 10;
        }

        if (proc_res_final > 0 && proc_res_final < 10) {
          procfnl_res_diff = 10 - proc_res_final;
          proc_res_final = 10;
        }

        var diff_total = succ_diff_pl1 + succ_diff_pl2 + soft_diff_pl1 + soft_diff_pl2 + hard_diff_pl1 + hard_diff_pl2 + succfnl_diff + softfnl_diff + hardfnl_diff

          + succ_diff_res_pl1 + succ_diff_res_pl2 + soft_diff_res_pl1 + soft_diff_res_pl2 + succfnl_res_diff + softfnl_res_diff + procfnl_diff + procfnl_res_diff;

        var div_sub = ((2 * div_vis) / (0.98 * 250)) * 100;

        diff_total += div_sub;

        diff_total = diff_total / found;

        for (var i = 0; i < divs_array.length; i++) {

          if (divs_array[i].value === highest.value) {

            divs_array[i].value = divs_array[i].value - diff_total;

          }

        }

        highest = this.getHighest(divs_array);

      }

      else {

        if (succ_prcnt_pl1 > 0 && succ_prcnt_pl1 < 10) {
          succ_diff_pl1 = 10 - succ_prcnt_pl1;
          succ_prcnt_pl1 = 10;
          highest.value = highest.value - succ_diff_pl1;
        }

        highest = this.getHighest(divs_array);

        if (succ_prcnt_pl2 > 0 && succ_prcnt_pl2 < 10) {
          succ_diff_pl2 = 10 - succ_prcnt_pl2;
          succ_prcnt_pl2 = 10;
          highest.value = highest.value - succ_diff_pl2;
        }

        highest = this.getHighest(divs_array);

        if (soft_prcnt_pl1 > 0 && soft_prcnt_pl1 < 10) {
          soft_diff_pl1 = 10 - soft_prcnt_pl1;
          soft_prcnt_pl1 = 10;
          highest.value = highest.value - soft_diff_pl1;
        }

        highest = this.getHighest(divs_array);

        if (soft_prcnt_pl2 > 0 && soft_prcnt_pl2 < 10) {
          soft_diff_pl2 = 10 - soft_prcnt_pl2;
          soft_prcnt_pl2 = 10;
          highest.value = highest.value - soft_diff_pl2;
        }

        highest = this.getHighest(divs_array);

        if (succ_res_prcnt_pl1 > 0 && succ_res_prcnt_pl1 < 10) {
          succ_diff_res_pl1 = 10 - succ_res_prcnt_pl1;
          succ_res_prcnt_pl1 = 10;
          highest.value = highest.value - succ_diff_res_pl1;
        }

        highest = this.getHighest(divs_array);

        if (succ_res_prcnt_pl2 > 0 && succ_res_prcnt_pl2 < 10) {
          succ_diff_res_pl2 = 10 - succ_res_prcnt_pl2;
          succ_res_prcnt_pl2 = 10;
          highest.value = highest.value - succ_diff_res_pl2;
        }

        highest = this.getHighest(divs_array);

        if (soft_res_prcnt_pl1 > 0 && soft_res_prcnt_pl1 < 10) {
          soft_diff_res_pl1 = 10 - soft_res_prcnt_pl1;
          soft_res_prcnt_pl1 = 10;
          highest.value = highest.value - soft_diff_res_pl1;
        }

        highest = this.getHighest(divs_array);

        if (soft_res_prcnt_pl2 > 0 && soft_res_prcnt_pl2 < 10) {
          soft_diff_res_pl2 = 10 - soft_res_prcnt_pl2;
          soft_res_prcnt_pl2 = 10;
          highest.value = highest.value - soft_diff_res_pl2;
        }

        highest = this.getHighest(divs_array);

        if (hard_prcnt_pl1 > 0 && hard_prcnt_pl1 < 10) {
          hard_diff_pl1 = 10 - hard_prcnt_pl1;
          hard_prcnt_pl1 = 10;
          highest.value = highest.value - hard_diff_pl1;
        }

        highest = this.getHighest(divs_array);

        if (hard_prcnt_pl2 > 0 && hard_prcnt_pl2 < 10) {
          hard_diff_pl2 = 10 - hard_prcnt_pl2;
          hard_prcnt_pl2 = 10;
          highest.value = highest.value - hard_diff_pl2;
        }

        highest = this.getHighest(divs_array);

        if (succ_final > 0 && succ_final < 10) {
          succfnl_diff = 10 - succ_final;
          succ_final = 10;
          highest.value = highest.value - succfnl_diff;
        }

        highest = this.getHighest(divs_array);

        if (soft_final > 0 && soft_final < 10) {
          softfnl_diff = 10 - soft_final;
          soft_final = 10;
          highest.value = highest.value - softfnl_diff;
        }

        highest = this.getHighest(divs_array);

        if (succ_res_final > 0 && succ_res_final < 10) {
          succfnl_res_diff = 10 - succ_res_final;
          succ_res_final = 10;
          highest.value = highest.value - succfnl_res_diff;
        }

        highest = this.getHighest(divs_array);

        if (soft_res_final > 0 && soft_res_final < 10) {
          softfnl_res_diff = 10 - soft_res_final;
          soft_res_final = 10;
          highest.value = highest.value - softfnl_res_diff;
        }

        highest = this.getHighest(divs_array);

        if (hard_final > 0 && hard_final < 10) {
          hardfnl_diff = 10 - hard_final;
          hard_final = 10;
          highest.value = highest.value - hardfnl_diff;
        }

        highest = this.getHighest(divs_array);

        if (proc_final > 0 && proc_final < 10) {
          procfnl_diff = 10 - proc_final;
          proc_final = 10;
          highest.value = highest.value - procfnl_diff;
        }

        highest = this.getHighest(divs_array);

        if (proc_res_final > 0 && proc_res_final < 10) {
          procfnl_res_diff = 10 - proc_res_final;
          proc_res_final = 10;
          highest.value = highest.value - procfnl_res_diff;
        }

        highest = this.getHighest(divs_array);

        var div_sub = ((2 * div_vis) / (0.98 * 250)) * 100;

        highest.value = highest.value - div_sub;

      }

      if (highest.key === "succ_prcnt_pl1") succ_prcnt_pl1 = highest.value;

      else if (highest.key === "succ_prcnt_pl2") succ_prcnt_pl2 = highest.value;

      else if (highest.key === "succ_final") succ_final = highest.value;

      else if (highest.key === "soft_prcnt_pl1") soft_prcnt_pl1 = highest.value;

      else if (highest.key === "soft_prcnt_pl2") soft_prcnt_pl2 = highest.value;

      else if (highest.key === "soft_final") soft_final = highest.value;

      else if (highest.key === "hard_prcnt_pl1") hard_prcnt_pl1 = highest.value;

      else if (highest.key === "hard_prcnt_pl2") hard_prcnt_pl2 = highest.value;

      else if (highest.key === "hard_final") hard_final = highest.value;

      else if (highest.key === "succ_res_prcnt_pl1") succ_res_prcnt_pl1 = highest.value;

      else if (highest.key === "succ_res_prcnt_pl2") succ_res_prcnt_pl2 = highest.value;

      else if (highest.key === "succ_res_final") succ_res_final = highest.value;

      else if (highest.key === "soft_res_prcnt_pl1") soft_res_prcnt_pl1 = highest.value;

      else if (highest.key === "soft_res_prcnt_pl2") soft_res_prcnt_pl2 = highest.value;

      else if (highest.key === "soft_res_final") soft_res_final = highest.value;

      else if (highest.key === "proc_final") proc_final = highest.value;

      else if (highest.key === "proc_res_final") proc_res_final = highest.value;

      var _self = this;

      if ((params.data.Status.toUpperCase() === "COMPLETED" || params.data.Status.toUpperCase() === "OPEN")) {// && params.data.id.toString().indexOf("batch") !== 0) {

        if (succ_final > 0) {


          var succfnl_div = "<a style='color:#3D912E;text-decoration:none;' class='succbar' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + succ_final + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;text-decoration:none;' class='bar line_success clickable succes_aprved_clk barlink'>" + params.data.Success_Fnl + "</div></a>";

        }

        else

          var succfnl_div = "";

        if (proc_final > 0) {


          var procfnl_div = "<a style='color:#0872B2;text-decoration:none;' class='procbar' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + proc_final + "%;border:1px solid white;border-collapse:collapse; background-color:#0872B2;text-decoration:none;' class='bar line_processed clickable _PROCSD_clk barlink'>" + params.data.Processed + "</div></a>";

        }

        else

          var procfnl_div = "";

        if (soft_final > 0)

          var softfnl_div = "<a  style='color:#FCC62D;text-decoration:none;' id='review" + params.row + "' data-brk=SBreak_Fnl><div style='width:" + soft_final + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;text-decoration:none;' class='bar line_soft clickable soft_dsmsed_clk barlink'>" + params.data.SBreak_Fnl + "</div></a>";

        else

          var softfnl_div = "";

        if (hard_final > 0)

          var hardfnl_div = "<a  style='color:#CF3838;text-decoration:none;' id='review" + params.row + "' data-brk=HBreak_Fnl><div style='width:" + hard_final + "%; border:1px solid white;border-collapse:collapse; background-color:#CF3838;text-decoration:none;' class='bar line_hard  clickable hard_dsmsed_clk barlink'>" + params.data.HBreak_Fnl + "</div></a>";

        else

          var hardfnl_div = "";


        if (succ_prcnt_pl1 > 0) {

          var succ_div_pl1 = "<a  style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL1><div style='width:" + succ_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;' class='bar clickable succes_pl1_clk barlink'>" + params.data.Success_PL1 + "</div></a>";

        }

        else

          var succ_div_pl1 = "";

        if (succ_prcnt_pl2 > 0) {

          var succ_div_pl2 = "<a  style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL2><div style='width:" + succ_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;' class='bar clickable succes_pl2_clk barlink'>" + params.data.Success_PL2 + "</div></a>";

        }

        else

          var succ_div_pl2 = "";

        if (soft_prcnt_pl1 > 0)

          var soft_div_pl1 = "<a  style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL1><div style='width:" + soft_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;' class='bar clickable soft_pl1_clk barlink'>" + params.data.SBreak_PL1 + "</div></a>";

        else

          var soft_div_pl1 = "";

        if (soft_prcnt_pl2 > 0)

          var soft_div_pl2 = "<a  style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL2><div style='width:" + soft_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;' class='bar clickable soft_pl2_clk barlink'>" + params.data.SBreak_PL2 + "</div></a>";

        else

          var soft_div_pl2 = "";

        if (hard_prcnt_pl1 > 0)

          var hard_div_pl1 = "<a  style='color:#cc0000;' id='review" + params.row + "' data-brk=HBreak_PL1><div style='width:" + hard_prcnt_pl1 + "%; border:1px solid white;border-collapse:collapse; background-color:#cc0000;' class='bar clickable hard_pl1_clk barlink'>" + params.data.HBreak_PL1 + "</div></a>";

        else

          var hard_div_pl1 = "";

        if (hard_prcnt_pl2 > 0)

          var hard_div_pl2 = "<a  style='color:#CF3838;' id='review" + params.row + "' data-brk=HBreak_PL2><div style='width:" + hard_prcnt_pl2 + "%; border:1px solid white;border-collapse:collapse; background-color:#CF3838;' class='bar clickable hard_pl2_clk barlink'>" + params.data.HBreak_PL2 + "</div></a>";

        else

          var hard_div_pl2 = "";

        if (succ_res_final > 0) {


          var succfnl_res_div = "<a style='color:#3D912E;text-decoration:none;' class='succbar' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + succ_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;text-decoration:none;' class='bar line_success clickable succes_rvrsed_clk barlink'>" + params.data.Suc_Res_Fnl + "</div></a>";

        }

        else

          var succfnl_res_div = "";

        if (soft_res_final > 0)

          var softfnl_res_div = "<a  style='color:#FCC62D;text-decoration:none;' id='review" + params.row + "' data-brk=SBreak_Fnl><div style='width:" + soft_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;text-decoration:none;' class='bar line_soft clickable soft_rvrsed_clk barlink'>" + params.data.SBreak_Res_Fnl + "</div></a>";

        else

          var softfnl_res_div = "";

        if (succ_res_prcnt_pl1 > 0) {

          var succ_res_div_pl1 = "<a  style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL1><div style='width:" + succ_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;' class='bar clickable succes_rl1_clk barlink'>" + params.data.Suc_Res_PL1 + "</div></a>";

        }

        else

          var succ_res_div_pl1 = "";

        if (succ_res_prcnt_pl2 > 0) {

          var succ_res_div_pl2 = "<a  style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL2><div style='width:" + succ_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;' class='bar clickable succes_rl2_clk barlink'>" + params.data.Suc_Res_PL2 + "</div></a>";

        }

        else

          var succ_res_div_pl2 = "";

        if (soft_res_prcnt_pl1 > 0)

          var soft_res_div_pl1 = "<a  style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL1><div style='width:" + soft_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;' class='bar clickable soft_rl1_clk barlink'>" + params.data.SBreak_Res_PL1 + "</div></a>";

        else

          var soft_res_div_pl1 = "";

        if (soft_res_prcnt_pl2 > 0)

          var soft_res_div_pl2 = "<a  style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL2><div style='width:" + soft_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;' class='bar clickable soft_rl2_clk barlink'>" + params.data.SBreak_Res_PL2 + "</div></a>";

        else

          var soft_res_div_pl2 = "";

        if (proc_res_final > 0) {

          var procfnl_res_div = "<a style='color:#0872B2;text-decoration:none;' class='procbar' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + proc_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:#0872B2;text-decoration:none;' class='bar line_processed clickable _RVPRCD_clk barlink'>" + params.data.Processed_Res + "</div></a>";

        }

        else

          var procfnl_res_div = "";

      }

      else if ((params.data.Status.toUpperCase() === "OVERRIDDEN")) {// && params.data.id.toString().indexOf("batch") !== 0) {

        if (succ_final > 0) {

          var succfnl_div = "<a   style='color:#3D912E;text-decoration:none;' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + succ_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar clickable line_overriden succes_aprved_clk barlink'>" + params.data.Success_Fnl + "</div></a>";

        }

        else

          var succfnl_div = "";

        if (proc_final > 0) {

          var procfnl_div = "<a style='color:#0872B2;text-decoration:none;' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + proc_final + "%;border:1px solid white;border-collapse:collapse; background-color:#0872B2;text-decoration:none;' class='bar line_overriden clickable _PROCSD_clk barlink'>" + params.data.Processed + "</div></a>";

        }

        else

          var procfnl_div = "";

        if (soft_final > 0)

          var softfnl_div = "<a    style='color:#FCC62D;text-decoration:none;' id='review" + params.row + "' data-brk=SBreak_Fnl><div style='width:" + soft_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden clickable soft_dsmsed_clk barlink'>" + params.data.SBreak_Fnl + "</div></a>";

        else

          var softfnl_div = "";

        if (hard_final > 0)

          var hardfnl_div = "<a   style='color:#CF3838;text-decoration:none;' id='review" + params.row + "' data-brk=HBreak_Fnl><div style='width:" + hard_final + "%; border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden clickable hard_dsmsed_clk barlink'>" + params.data.HBreak_Fnl + "</div></a>";

        else

          var hardfnl_div = "";


        if (succ_prcnt_pl1 > 0) {

          var succ_div_pl1 = "<a   style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL1><div style='width:" + succ_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable succes_pl1_clk barlink'>" + params.data.Success_PL1 + "</div></a>";

        }

        else

          var succ_div_pl1 = "";

        if (succ_prcnt_pl2 > 0) {

          var succ_div_pl2 = "<a   style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL2><div style='width:" + succ_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable succes_pl2_clk barlink'>" + params.data.Success_PL2 + "</div></a>";

        }

        else

          var succ_div_pl2 = "";

        if (soft_prcnt_pl1 > 0)

          var soft_div_pl1 = "<a   style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL1><div style='width:" + soft_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable soft_pl1_clk barlink'>" + params.data.SBreak_PL1 + "</div></a>";

        else

          var soft_div_pl1 = "";

        if (soft_prcnt_pl2 > 0)

          var soft_div_pl2 = "<a   style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL2><div style='width:" + soft_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable soft_pl2_clk barlink'>" + params.data.SBreak_PL2 + "</div></a>";

        else

          var soft_div_pl2 = "";

        if (hard_prcnt_pl1 > 0)

          var hard_div_pl1 = "<a   style='color:#cc0000;' id='review" + params.row + "' data-brk=HBreak_PL1><div style='width:" + hard_prcnt_pl1 + "%; border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable hard_pl1_clk barlink'>" + params.data.HBreak_PL1 + "</div></a>";

        else

          var hard_div_pl1 = "";

        if (hard_prcnt_pl2 > 0)

          var hard_div_pl2 = "<a   style='color:#CF3838;' id='review" + params.row + "' data-brk=HBreak_PL2><div style='width:" + hard_prcnt_pl2 + "%; border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable hard_pl2_clk barlink'>" + params.data.HBreak_PL2 + "</div></a>";

        else

          var hard_div_pl2 = "";

        if (succ_res_final > 0) {


          var succfnl_res_div = "<a style='color:#3D912E;text-decoration:none;' class='succbar' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + succ_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden clickable succes_rvrsed_clk barlink'>" + params.data.Suc_Res_Fnl + "</div></a>";

        }

        else

          var succfnl_res_div = "";

        if (soft_res_final > 0)

          var softfnl_res_div = "<a  style='color:#FCC62D;text-decoration:none;' id='review" + params.row + "' data-brk=SBreak_Fnl><div style='width:" + soft_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden clickable soft_rvrsed_clk barlink'>" + params.data.SBreak_Res_Fnl + "</div></a>";

        else

          var softfnl_res_div = "";

        if (succ_res_prcnt_pl1 > 0) {

          var succ_res_div_pl1 = "<a  style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL1><div style='width:" + succ_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable succes_rl1_clk barlink'>" + params.data.Suc_Res_PL1 + "</div></a>";

        }

        else

          var succ_res_div_pl1 = "";

        if (succ_res_prcnt_pl2 > 0) {

          var succ_res_div_pl2 = "<a  style='color:#3D912E;' id='review" + params.row + "' data-brk=Successful_PL2><div style='width:" + succ_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable succes_rl2_clk barlink'>" + params.data.Suc_Res_PL2 + "</div></a>";

        }

        else

          var succ_res_div_pl2 = "";

        if (soft_res_prcnt_pl1 > 0)

          var soft_res_div_pl1 = "<a  style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL1><div style='width:" + soft_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable soft_rl1_clk barlink'>" + params.data.SBreak_Res_PL1 + "</div></a>";

        else

          var soft_res_div_pl1 = "";

        if (soft_res_prcnt_pl2 > 0)

          var soft_res_div_pl2 = "<a  style='color:#FCC62D;' id='review" + params.row + "' data-brk=SBreak_PL2><div style='width:" + soft_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar clickable soft_rl2_clk barlink'>" + params.data.SBreak_Res_PL2 + "</div></a>";

        else

          var soft_res_div_pl2 = "";

        if (proc_res_final > 0) {

          var procfnl_res_div = "<a style='color:#0872B2;text-decoration:none;' class='procbar' id='review" + params.row + "' data-brk=Successful_Fnl><div style='width:" + proc_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:#0872B2;text-decoration:none;' class='bar line_overriden clickable _RVPRCD_clk barlink'>" + params.data.Processed_Res + "</div></a>";

        }

        else

          var procfnl_res_div = "";

      }

      // else if ((params.data.Status.toUpperCase() === "OVERRIDDEN") && params.data.id.toString().indexOf("batch") === 0) {

      //     if (succ_final > 0) {

      //         var succfnl_div = "<div style='width:" + succ_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden barlink'>" + params.data.Success_Fnl + "</div>";

      //     }

      //     else

      //         var succfnl_div = "";

      //     if (proc_final > 0) {

      //         var procfnl_div = "<div style='width:" + proc_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden barlink'>" + params.data.Processed + "</div>";

      //     }

      //     else

      //         var procfnl_div = "";

      //     if (soft_final > 0)

      //         var softfnl_div = "<div style='width:" + soft_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden barlink'>" + params.data.SBreak_Fnl + "</div>";

      //     else

      //         var softfnl_div = "";

      //     if (hard_final > 0)

      //         var hardfnl_div = "<div style='width:" + hard_final + "%; border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden barlink'>" + params.data.HBreak_Fnl + "</div>";

      //     else

      //         var hardfnl_div = "";


      //     if (succ_prcnt_pl1 > 0) {

      //         var succ_div_pl1 = "<div style='width:" + succ_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.Success_PL1 + "</div>";

      //     }

      //     else

      //         var succ_div_pl1 = "";

      //     if (succ_prcnt_pl2 > 0) {

      //         var succ_div_pl2 = "<div style='width:" + succ_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.Success_PL2 + "</div>";

      //     }

      //     else

      //         var succ_div_pl2 = "";

      //     if (soft_prcnt_pl1 > 0)

      //         var soft_div_pl1 = "<div style='width:" + soft_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.SBreak_PL1 + "</div>";

      //     else

      //         var soft_div_pl1 = "";

      //     if (soft_prcnt_pl2 > 0)

      //         var soft_div_pl2 = "<div style='width:" + soft_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.SBreak_PL2 + "</div>";

      //     else

      //         var soft_div_pl2 = "";

      //     if (hard_prcnt_pl1 > 0)

      //         var hard_div_pl1 = "<div style='width:" + hard_prcnt_pl1 + "%; border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.HBreak_PL1 + "</div>";

      //     else

      //         var hard_div_pl1 = "";

      //     if (hard_prcnt_pl2 > 0)

      //         var hard_div_pl2 = "<div style='width:" + hard_prcnt_pl2 + "%; border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.HBreak_PL2 + "</div>";

      //     else

      //         var hard_div_pl2 = "";

      //     if (succ_res_final > 0) {


      //         var succfnl_res_div = "<div style='width:" + succ_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden barlink'>" + params.data.Suc_Res_Fnl + "</div>";

      //     }

      //     else

      //         var succfnl_res_div = "";

      //     if (soft_res_final > 0)

      //         var softfnl_res_div = "<div style='width:" + soft_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_overriden barlink'>" + params.data.SBreak_Res_Fnl + "</div>";

      //     else

      //         var softfnl_res_div = "";

      //     if (succ_res_prcnt_pl1 > 0) {

      //         var succ_res_div_pl1 = "<div style='width:" + succ_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.Suc_Res_PL1 + "</div>";

      //     }

      //     else

      //         var succ_res_div_pl1 = "";

      //     if (succ_res_prcnt_pl2 > 0) {

      //         var succ_res_div_pl2 = "<div style='width:" + succ_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.Suc_Res_PL2 + "</div>";

      //     }

      //     else

      //         var succ_res_div_pl2 = "";

      //     if (soft_res_prcnt_pl1 > 0)

      //         var soft_res_div_pl1 = "<div style='width:" + soft_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.SBreak_Res_PL1 + "</div>";

      //     else

      //         var soft_res_div_pl1 = "";

      //     if (soft_res_prcnt_pl2 > 0)

      //         var soft_res_div_pl2 = "<div style='width:" + soft_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.SBreak_Res_PL2 + "</div>";

      //     else

      //         var soft_res_div_pl2 = "";

      // }

      else {

        if (succ_final > 0) {

          var succfnl_div = "<div style='width:" + succ_final + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;text-decoration:none;' class='bar line_success barlink'>" + params.data.Success_Fnl + "</div>";

        }

        else

          var succfnl_div = "";

        if (proc_final > 0) {

          var procfnl_div = "<div style='width:" + proc_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_processed barlink'>" + params.data.Processed + "</div>";

        }

        else

          var procfnl_div = "";

        if (soft_final > 0)

          var softfnl_div = "<div style='width:" + soft_final + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;text-decoration:none;' class='bar line_soft barlink'>" + params.data.SBreak_Fnl + "</div>";

        else

          var softfnl_div = "";

        if (hard_final > 0)

          var hardfnl_div = "<div style='width:" + hard_final + "%; border:1px solid white;border-collapse:collapse; background-color:#CF3838;text-decoration:none;' class='bar line_hard barlink'>" + params.data.HBreak_Fnl + "</div>";

        else

          var hardfnl_div = "";

        if (succ_prcnt_pl1 > 0) {

          var succ_div_pl1 = "<div style='width:" + succ_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;text-decoration:none;' class='bar barlink'>" + params.data.Success_PL1 + "</div>";

        }

        else

          var succ_div_pl1 = "";

        if (succ_prcnt_pl2 > 0) {

          var succ_div_pl2 = "<div style='width:" + succ_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:#3D912E;text-decoration:none;' class='bar barlink'>" + params.data.Success_PL2 + "</div>";

        }

        else

          var succ_div_pl2 = "";

        if (soft_prcnt_pl1 > 0)

          var soft_div_pl1 = "<div style='width:" + soft_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;text-decoration:none;' class='bar barlink'>" + params.data.SBreak_PL1 + "</div>";

        else

          var soft_div_pl1 = "";

        if (soft_prcnt_pl2 > 0)

          var soft_div_pl2 = "<div style='width:" + soft_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:#FCC62D;text-decoration:none;' class='bar barlink'>" + params.data.SBreak_PL2 + "</div>";

        else

          var soft_div_pl2 = "";

        if (hard_prcnt_pl1 > 0)

          var hard_div_pl1 = "<div style='width:" + hard_prcnt_pl1 + "%; border:1px solid white;border-collapse:collapse; background-color:#cc0000;text-decoration:none;' class='bar barlink'>" + params.data.HBreak_PL1 + "</div>";

        else

          var hard_div_pl1 = "";

        if (hard_prcnt_pl2 > 0)

          var hard_div_pl2 = "<div style='width:" + hard_prcnt_pl2 + "%; border:1px solid white;border-collapse:collapse; background-color:#CF3838;text-decoration:none;' class='bar barlink'>" + params.data.HBreak_PL2 + "</div>";

        else

          var hard_div_pl2 = "";

        if (succ_res_final > 0) {


          var succfnl_res_div = "<div style='width:" + succ_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_processed barlink'>" + params.data.Suc_Res_Fnl + "</div>";

        }

        else

          var succfnl_res_div = "";

        if (soft_res_final > 0)

          var softfnl_res_div = "<div style='width:" + soft_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_processed barlink'>" + params.data.SBreak_Res_Fnl + "</div>";

        else

          var softfnl_res_div = "";

        if (succ_res_prcnt_pl1 > 0) {

          var succ_res_div_pl1 = "<div style='width:" + succ_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.Suc_Res_PL1 + "</div>";

        }

        else

          var succ_res_div_pl1 = "";

        if (succ_res_prcnt_pl2 > 0) {

          var succ_res_div_pl2 = "<div style='width:" + succ_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.Suc_Res_PL2 + "</div>";

        }

        else

          var succ_res_div_pl2 = "";

        if (soft_res_prcnt_pl1 > 0)

          var soft_res_div_pl1 = "<div style='width:" + soft_res_prcnt_pl1 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.SBreak_Res_PL1 + "</div>";

        else

          var soft_res_div_pl1 = "";

        if (soft_res_prcnt_pl2 > 0)

          var soft_res_div_pl2 = "<div style='width:" + soft_res_prcnt_pl2 + "%;border:1px solid white;border-collapse:collapse; background-color:grey;' class='bar barlink'>" + params.data.SBreak_Res_PL2 + "</div>";

        else

          var soft_res_div_pl2 = "";

        if (proc_res_final > 0) {

          var procfnl_res_div = "<div style='width:" + proc_res_final + "%;border:1px solid white;border-collapse:collapse; background-color:grey;text-decoration:none;' class='bar line_processed barlink'>" + params.data.Processed_Res + "</div>";

        }

        else

          var procfnl_res_div = "";

      }

      var analyst_bar = "<div class='chart'><div class='bar' style='vertical-align:super;padding-right:18px;'>Analyst:</div>" + succ_div_pl1 + "" + soft_div_pl1 + "" + hard_div_pl1 + "</div>";

      if (params.data.IND_RVRS === "Y")

        var analyst_res_bar = "<div class='chart' style='margin-top:3px;'><div class='bar' style='vertical-align:super;padding-right:18px;'>Reversed:</div>" + succ_res_div_pl1 + "" + soft_res_div_pl1 + "</div>";

      else

        var analyst_res_bar = "";

      var supervisor_bar = "<div class='chart'><div class='bar barsupervisor'  style='vertical-align:super;padding-right:5px;'>Supervisor:</div>" + succ_div_pl2 + "" + soft_div_pl2 + "" + hard_div_pl2 + "" + succfnl_div + "" + procfnl_div + "" + softfnl_div + "" + hardfnl_div + "</div>";

      if (params.data.IND_RVRS === "Y")

        var supervisor_res_bar = "<div class='chart'><div class='bar barsupervisor'  style='vertical-align:super;padding-right:5px;'>Reversed:</div>" + succ_res_div_pl2 + "" + soft_res_div_pl2 + "" + succfnl_res_div + "" + softfnl_res_div + "" + procfnl_res_div + "</div>";

      else

        var supervisor_res_bar = "";

      var template = "<div class='chart_grid'>" + analyst_bar + "" + analyst_res_bar + "" + supervisor_bar + "" + supervisor_res_bar + "";

      //return template;


      var eDiv = document.createElement('span');

      eDiv.innerHTML = template;

      // if (params.data.id.toString().indexOf("batch") !== 0) {

      var eButton = eDiv.getElementsByClassName('chart_grid')[0];

      eButton.addEventListener('click', (function (e) {

        _self.changeRoute(params, e);

      }))

      // }

      return eDiv;

    }

    catch (error) {

      // this.aiLogger.ErrorHandling(this.componentLog + ".BatchProgress() ", error);

    }

  }

  public getHighest(array) {

    let max: any = {};

    for (var i = 0; i < array.length; i++) {

      if (array[i].value > (max.value || 0))

        max = array[i];

    }

    return max;

  }

  public AssignedTo(instance: any, params) {

    var _self = instance;

    try {

      //if (this.airsAuthorizationService.Authorization.auth.InValidUser === false) {

      //  if ((params.data.Status.toUpperCase() === "QUEUED" || params.data.Status.toUpperCase() === "DELETED" || params.data.Status.toUpperCase() //=== "IN PROGRESS" || params.data.indent == 1)) {

      //                  return params.data.AssignedTo;

      //            }

      //          else if ((params.data.Total !== "0") &&

      //            (params.data.Success_PL1 === "" || params.data.Success_PL1 === "0") &&

      //          (params.data.Success_PL2 === "0" || params.data.Success_PL2 === "") &&

      //        (params.data.HBreak_PL1 === "" || params.data.HBreak_PL1 === "0") &&

      //      (params.data.HBreak_PL2 === "0" || params.data.HBreak_PL2 === "") &&

      //    (params.data.SBreak_PL1 === "" || params.data.SBreak_PL1 === "0") &&

      //  (params.data.SBreak_PL2 === "0" || params.data.SBreak_PL2 === "")) {

      //return params.data.AssignedTo;

//                } else {

      //return '<img src="Images/editpen.png" style="height:15px;width:15px;" align="right"/>' + value;

      return params.data.AssignedTo + '<span class="ud-icon Action_Edit" style="float:right;" /></>';

//               }

      //         } else return params.data.AssignedTo;

    }

    catch (error) {

      // _self.aiLogger.ErrorHandling(this.componentLog + ".AssignedTo() ", error);

    }

  }

  public ReconStatus(params) {

    try {

      if (params.data.Status_cde === null || params.data.Status_cde === "") {

        return "";

      }


      var color;

      var width;

      var div = "";

      if (params.data.Status_cde.trim().toUpperCase() === "STARTD") {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm offline' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      } else if (params.data.Status_cde.trim().toUpperCase() === "INPROG") {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm inprogress' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "CMPLTD") {

        color = "#81c006";

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm available' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "OPEN") {

        color = "#81c006";

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm available' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "CONFIRMED") {

        return params.data.Status_cde = "";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "REJTED") {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm rejted' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "PENDUC") {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm away' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "QUEUED") {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm away' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      else if (params.data.Status_cde.trim().toUpperCase() === "DELTED") {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm busy-status' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      } else {

        div = "<div style='text-align:left !important;'><div class='ud-icon online-status sm busy-status' style='display:inline-block;height:20px;width:20px;margin-top:5px;border-radius:5px;cursor:default;'></div><span>" + params.data.Status + "</span></div>";

      }

      if (div !== "")

        return div;

      else

        return "<div style='display:inline-block;background:" + color + ";height:20px;width:20px;margin-top:5px;border-radius:5px;'></div><span>" + params.data.Status + "</span>";

    }

    catch (error) {

      // this.aiLogger.ErrorHandling(this.componentLog + ".ReconStatus() ", error);

    }

  }


  public formatCurrency(amount) {

    return this.formatter.format(amount);

  }

  public attachment(params) {

    var _self = this;

    try {


      var template = "<div><span class='ud-icon button-model-light Action_Attach' (click)='showChildModal()' title='Upload File' id='upload" +

        params.data.id +

        "'></span></div>";


      var eDiv = document.createElement('span');

      eDiv.innerHTML = template;

      if (template !== "") {

        var eButton = eDiv.getElementsByClassName('Action_Attach')[0];

        eButton.addEventListener('click', (function (e) {

          // _self.childModal.showChildModal(params.data.MasterId);

        }))

      }

      return eDiv;

      //File Save to NAS and retrieve

    }

    catch (error) {

      // _self.aiLogger.ErrorHandling(this.componentLog + ".attachment() ", error);

    }

  }

  public DeleteBatch(params) {

    try {

      var _self = this;

      var template = '';


      template = "<img src=Images/delete.png class='hand grid-icon' title='Delete File' style='height:25px;width:15px;' id='delete" + params.data.id + "'/>";


      template = "";

      //

      var eDiv = document.createElement('span');

      eDiv.innerHTML = template;

      if (template !== "") {

        var eButton = eDiv.getElementsByClassName('hand')[0];

        eButton.addEventListener('click', (function (e) {

          _self.invokeDelete(params.data);

        }))

      }

      return eDiv;

    }

    catch (error) {

      // this.aiLogger.ErrorHandling(this.componentLog + ".DeleteBatch() ", error);

    }

  }

  public changeRoute(params, e) {

    try {

      // this.alertairsservice.hideAlert();

      var className = e.target.className;

      var classlist = className.split(" ");

      if (classlist.indexOf("clickable") > 0) {

        classlist.forEach(element => {

          if (element !== "clickable" && element !== "bar" && element !== "barlink" && element !== "line_success" && element !== "line_processed" && element !== "line_soft" && element !== "line_hard" && element !== "line_overriden") {

            var classclicked = element;

            var classclickedlist = classclicked.split('_');

            var Btype = classclickedlist[0];

            var level = classclickedlist[1];

            // this.router.navigate(['FeeReview']);

          }

        });

      }

    }

    catch (error) {

      // this.aiLogger.ErrorHandling(this.componentLog + ".changeRoute() ", error);

    }

  }

  public invokeDelete(data: any) {

    try {

      var _self = this;

      var tmstmp = '';

      var dltInput = {

        Master_ID: data.MasterId

      };

      // _self.deleteModal.showChildModal(dltInput);//seperate component


    }

    catch (error) {

      // this.aiLogger.ErrorHandling(this.componentLog + ".invokeDelete() ", error);

    }

  }


  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
}

