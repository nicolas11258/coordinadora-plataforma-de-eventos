import fs from 'fs';
import ExcelJS from 'exceljs'; 
import eventDAO from '../dao/events.dao.js';

const excelService = {
    // Add list of events from Excel file.
    async addListEvents(filePath, userId) {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);

            const worksheet = workbook.getWorksheet(1);
            worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
                if (rowNumber > 1) { 
                    const eventData = {
                        title: row.getCell(1).value,
                        description: row.getCell(2).value,
                        date: row.getCell(3).value,
                        location: row.getCell(4).value,
                        fk_creator_id: userId
                    };

                    await eventDAO.createEvent(eventData);
                }
            });

            fs.unlinkSync(filePath);
            return { message: 'File processed successfully' };
        } catch (error) {
            throw new Error('Failed to process Excel file');
        }
    },

    // Add list of attendees to events from Excel file.
    async addListAttendees(filePath) {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);

            const worksheet = workbook.getWorksheet(1);
            worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
                if (rowNumber > 1) {
                    const eventId = row.getCell(1).value;
                    const attendeesId = row.getCell(2).value;
                    await eventDAO.registerAttendee(eventId, attendeesId);
                }
            });

            return { message: 'Attendees added successfully' };
        } catch (error) {
            throw new Error('Failed to process Excel file');
        }
    }
};

export default excelService;
