import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import Models from '../database/models';

import cloudinary from '../cloudinary/cloudinary';

dotenv.config();

const { task } = Models;

const uploadPdfToCloudinary = (fileBuffer) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    { resource_type: 'raw', folder:'task-pdf' },
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  ).end(fileBuffer);
});

class Task {
  static async create(req, res) {
    try {
      const {
        name,
        email,
        phoneNumber,
        address,
        sickness,
      } = req.body;

      const id = uuidv4();


      const result = await uploadPdfToCloudinary(req.file.buffer);

      await task.create({
        id,
        name,
        email,
        phoneNumber,
        address,
        sickness,
        pdf: result.secure_url,
      });

      const displayOrderFromHospital = {
        name,
        sickness,
      };

      return res.status(201).json({
        status: 201,
        message: res.__('The result was sent successfully'),
        data: displayOrderFromHospital,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async getAlltask(req, res) {
    try {
      const alltask = await task.findAll({
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (!alltask) {
        return res.status(404).send('no task found');
      }
      return res.status(200).json({
        status: 200,
        message: 'task fetched successfully',
        data: alltask,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        err: error.message,
      });
    }
  }

  static async getResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await task.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (!result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(200).json({
        status: 200,
        message: 'Result fetched successfully',
        data: result,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async updateSomeResultByPatientId(req, res) {
    try {


      const { name } = req.params;
      const result = await task.update(req.body, {
        where: { name },
      });
      const userData = updatedField[1];

      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(204).json({
        status: 204,
        message: 'Result updated successfully',
        data: result,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async updateResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await task.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(200).json({
        status: 200,
        message: 'Result updated successfully',
        data: result,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async deleteResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await task.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(204).json({
        status: 204,
        message: 'Result deleted successfully',
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}

export default Task;