import excelService from '../services/excel.services.js';

export const addListEvents = async (req, res) => {
    try {
        const { file, user } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = file.path;
        const result = await excelService.addListEvents(filePath, user);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const addListAttendees = async (req, res) => {
    try {
        const { file, user } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = file.path;
        const result = await excelService.addListEvents(filePath, user);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
