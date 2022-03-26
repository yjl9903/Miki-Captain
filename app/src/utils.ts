import { write, utils } from 'xlsx';

export function exportCSV(filename: string, text: string) {
  const data = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  const el = document.createElement('a');
  el.setAttribute('href', data);
  el.setAttribute('download', filename);
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

export function exportExcel(filename: string, sheetname: string, sheet: any[]) {
  function sheet2blob() {
    const workbook = {
      SheetNames: [],
      Sheets: {}
    };
    utils.book_append_sheet(workbook, utils.json_to_sheet(sheet), sheetname);
    const wbout = write(workbook, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    });
    const blob = new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    });
    function s2ab(s: any) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    return blob;
  }

  const blob = sheet2blob();
  const url = URL.createObjectURL(blob);
  const el = document.createElement('a');
  el.setAttribute('href', url);
  el.setAttribute('download', filename);
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}
