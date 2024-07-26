import ExcelJS from 'exceljs';

export const parseExcelFile = async (fileBuffer: Buffer) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0]; // Assuming the first sheet contains the questions

    const questions: any[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) { // Assuming the first row contains headers
        const question = row.getCell(1).value?.toString() || '';
        const option1 = row.getCell(2).value?.toString() || '';
        const option2 = row.getCell(3).value?.toString() || '';
        const option3 = row.getCell(4).value?.toString() || '';
        const option4 = row.getCell(5).value?.toString() || '';
        const correctAnswer = parseInt(row.getCell(6).value?.toString() || '0');

        questions.push({ question, options: [option1, option2, option3, option4], correctAnswer });
      }
    });

    return questions;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse Excel file: ${error.message}`);
    } else {
      throw new Error('Failed to parse Excel file: An unknown error occurred');
    }
  }
};