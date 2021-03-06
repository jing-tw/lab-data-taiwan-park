import https = require('https');
import cheerio from 'cheerio';
import fs = require('fs');
var htmlparser = require('htmlparser2');

const FILE_PEOPLE_NOT_PRESENT:string = "./data_people_not_present.csv"
const HOSTNAME:string = 'npm.cpami.gov.tw';
const Path:string = '/news_2.aspx?search=yes&org=c951cdcd-b75a-46b9-8002-8ef952ec95fd&Con=DESC&pageset=5000';
const { WritableStream } = require("htmlparser2/lib/WritableStream");

// ======= Chunk mode ===
// function getWebDataStream(){
//   // Step 1: Create a parser and matching the tag
//   const parser = new WritableStream({
//       onopentag(name:any, attribs:any) {
//           if (name === "table") {
//               console.log("table start");
//           }
//       },
//       ontext(text:any) {
//           console.log("-->", text);
//       },
//       onclosetag(tagname:any) {
//         if (tagname === "table") {
//           console.log("table end");
//         }
//       },
//   });
  
//   // Step 2: Connect to the site and pipe the stream to the parser
//   https.get("https://" + HOSTNAME+Path, (res:any) => res.pipe(parser).on("finish", () => console.log("done")));

// }

// function main(){
//   getWebDataStream();
// }
// main();

function getData(){
  return new Promise<Buffer>( (resolve, reject) => {
      const options = {
        hostname: HOSTNAME,
        port: 443,
        path: Path,
        method: 'GET'
      }
      let retByteBuffer:Buffer = Buffer.alloc(0);
      https.request(options, (res:any) =>{
        res.on('data', function (chunk:any) {
          retByteBuffer = Buffer.concat([retByteBuffer, chunk]);
        });

        res.on('end', function () {
          resolve(retByteBuffer);
        }); // end of cb

        res.on('error', reject);
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
      hisMap[strData] = 1;
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
  let byteBuffer:Buffer = await getData();
  const strHtml:string = byteBuffer.toString();
  let lstRow:Array<any> = parsingTable(strHtml);

  toCSV(lstRow, FILE_PEOPLE_NOT_PRESENT);
  getHisbyDate(lstRow);
}

main();

