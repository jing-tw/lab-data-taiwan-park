import https = require('https');
import {JSDOM} from'jsdom';
import cheerio from 'cheerio';
import fs = require('fs');

const FILE_ALL_PERSON_NOT_PRESENT:string = "./data_all_person_not_present.csv"

let data:any = [];
function getData(){
  return new Promise(resolve => {
      const options = {
        hostname: 'npm.cpami.gov.tw',
        port: 443,
        path: '/news_2.aspx?search=yes&org=c951cdcd-b75a-46b9-8002-8ef952ec95fd&Con=DESC&pageset=5000',
        method: 'GET'
      }
      var req = https.request(options, (response:any) =>{
          response.on('data', function (chunk:any) {
          data.push(chunk);
        });

        response.on('end', function () {
          resolve(data);
        }); // end of cb
      }).end();
  });
}

function parsingTable(strHtml:string):Array<any>{
    // table
    let i:number = 0;
    const $ = cheerio.load(strHtml.toString());
    let lstRow:Array<any> = [];
    $('tr').each(function(this:any) {
      i = i + 1;
      console.log('i = ', i);
      let row:Array<string> = [];
      $(this).find('td').each (function(this:any, col, td) {
        console.log('col = ', col, ' text = ', $(this).text());
        // row['col='+col.toString()] = $(this).text();
        row.push( $(this).text());
      }); 
      lstRow.push(row);

    }); 
    return lstRow;
    // end of table
}

function toCSV(lstRow:Array<any>, strFilename:string){
  if (fs.existsSync(strFilename)) {
    fs.unlinkSync(strFilename); // remove the file
  } 
  
  lstRow.forEach((row) => {
    row.forEach( (strElement:string) => {
      strElement = strElement.replace(/\r?\n|\r/g, " "); // replace \n
      fs.appendFileSync(strFilename, strElement+',');
    });
    fs.appendFileSync(strFilename, '\n');

  });
}

function getHisbyDate(lstRow:Array<any>){
  let hisMap:any = {};
  lstRow.forEach((row) => {
    let strData:string = row[2];
    if (typeof strData === 'undefined'){
      return; 
    }
    strData = strData.replace(/\r?\n|\r/g, " "); // replace \n
    if(!hisMap.hasOwnProperty(strData)){
      hisMap[strData] = 0;
    } else {
      hisMap[strData] = hisMap[strData] + 1;
    }
    // console.log(strDate);
  });

  // print his
  for (const [key, value] of Object.entries(hisMap)) {
    console.log(key, value);
  }
}

async function main(){
  let data:any = await getData();

  let strHtml:string="";
  data.forEach((chunk:any) => {
    // console.log('chunk = ', chunk.toString());
    strHtml = strHtml + chunk.toString();
  });

  // console.log('strHtml = ', strHtml);
  let lstRow:Array<any> = parsingTable(strHtml);

  toCSV(lstRow, FILE_ALL_PERSON_NOT_PRESENT);
  getHisbyDate(lstRow);
}

main();

