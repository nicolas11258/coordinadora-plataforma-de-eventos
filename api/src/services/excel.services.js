import fs from 'fs';
import ExcelJS from 'exceljs'; 
import eventDAO from '../dao/events.dao.js';

const excelService = {
    // Function to add a list of events from an Excel file.
    /**
     * Add a list of events from an Excel file.
     * @param {string} filePath - The path to the Excel file.
     * @param {number} userId - The ID of the user adding the events.
     * @returns {Promise<Object>} A promise that resolves to an object with a success message.
     * @throws {Error} If there is an error in processing the Excel file.
     */
    async addListEvents(filePath, userId) {
        try {
            // Read the Excel file
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);

            // Get the first worksheet
            const worksheet = workbook.getWorksheet(1);

            // Iterate through each row in the worksheet
            worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
                if (rowNumber > 1) { 
                    // Extract event data from the row
                    const eventData = {
                        title: row.getCell(1).value,
                        description: row.getCell(2).value,
                        date: row.getCell(3).value,
                        location: row.getCell(4).value,
                        creatorId: userId
                    };

                    // Create the event in the database
                    await eventDAO.createEvent(eventData);
                }
            });

            // Delete the uploaded file after processing
            fs.unlinkSync(filePath);

            return { message: 'File processed successfully' };
        } catch (error) {
            throw new Error('Failed to process Excel file');
        }
    },

    // Function to add a list of attendees to events from an Excel file.
    /**
     * Add a list of attendees to events from an Excel file.
     * @param {string} filePath - The path to the Excel file.
     * @returns {Promise<Object>} A promise that resolves to an object with a success message.
     * @throws {Error} If there is an error in processing the Excel file.
     */
    async addListAttendees(filePath) {
        try {
            // Read the Excel file
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);

            // Get the first worksheet
            const worksheet = workbook.getWorksheet(1);

            // Iterate through each row in the worksheet
            worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
                if (rowNumber > 1) {
                    // Extract event and attendee IDs from the row
                    const eventId = row.getCell(1).value;
                    const attendeesId = row.getCell(2).value;

                    // Register attendees for the event in the database
                    await eventDAO.registerAttendee(eventId, attendeesId);
                }
            });

            // Delete the uploaded file after processing
            fs.unlinkSync(filePath);

            return { message: 'Attendees added successfully' };
        } catch (error) {
            throw new Error('Failed to process Excel file');
        }
    }
};

export default excelService;
