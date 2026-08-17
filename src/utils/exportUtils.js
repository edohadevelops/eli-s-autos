import * as XLSX from "xlsx";

// rows: array of plain objects. Object keys become column headers, in the
// order the keys appear on the first row, so build row objects with keys
// already in the order you want columns to display.
export function exportToExcel(rows, filename, sheetName = "Sheet1") {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// sheets: array of { name, rows } — one workbook, multiple tabs. Used by
// "Export everything" so the whole business is one file, one tab per
// report, instead of five separate downloads.
export function exportMultiSheetExcel(sheets, filename) {
  const workbook = XLSX.utils.book_new();
  sheets.forEach(({ name, rows }) => {
    if (!rows || rows.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(rows);
    // Sheet names in Excel are capped at 31 characters and can't contain
    // certain punctuation, trim defensively.
    const safeName = name.slice(0, 31).replace(/[\\/*?:[\]]/g, "");
    XLSX.utils.book_append_sheet(workbook, worksheet, safeName);
  });
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
