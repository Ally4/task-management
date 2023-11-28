import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import Models from '../database/models';

import cloudinary from '../cloudinary/cloudinary';

dotenv.config();

// mail.setApiKey(process.env.SENDGRID);


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


const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-profil-pictures'});
    return result;
  } catch (error) {
    // console.error('error uploading image to cloudinary', error);
    throw error;
  }
}




class Task {
  static async create(req, res) {
    try {
      const {
        title,
        startDate,
        endDate,
        assignee,
        project,
        description,
        priority,
        pdf,
        picture
      } = req.body;

      const id = uuidv4();



            const image = await uploadImage(req.file);
      
              await Users.update(
                {profilPicture: result.secure_url},
                {where: { title }},
              );


      const result = await uploadPdfToCloudinary(req.file.buffer);

     const display = await task.create({
        id,
        title,
        startDate,
        endDate,
        assignee,
        project,
        description,
        priority,
        pdf: result.secure_url,
        profilPicture: result.secure_url,
      });

      const data = {
        id,
        title,
        startDate,
        endDate,
        assignee,
        project,
        description,
        priority,
        pdf: result.secure_url,
        picture,
      };

      return res.status(201).json({
        status: 201,
        message: ('The task has been recorded successfully'),
        data,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const alltask = await task.findAll({
        where: {state: ' '}
      });
      if (!alltask) {
        return res.status(404).send('no task found');
      }
      return res.status(200).json({
        status: 200,
        message: 'tasks fetched successfully',
        data: alltask,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  static async getTaskByTitle(req, res) {
    try {
      const { title } = req.params;
      const result = await task.findOne({
        where: { title },
      });
      if (!result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(200).json({
        status: 200,
        message: 'Result fetched successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error,
      });
  }
}



static async updateTask(req, res) {
  try {
    const {
      title,
      startDate,
      endDate,
      assignee,
      project,
      description,
      priority,
      pdf,
      image
    } = req.body;


    const result = await uploadPdfToCloudinary(req.file.buffer);

   const task =  await task.update(req.body,{   
    where: { title },
    }
  );

    const data = {
      id: task.id,
      title: task.title,
      startDate: task.startDate,
      endDate: task.endDate,
      assignee: task.assignee,
      project: task.project,
      description: task.description,
      priority: task.priority,
      pdf: result.secure_url,
      image: task.image,
    };

    return res.status(200).json({
      status: 200,
      message: ('The task has been recorded successfully'),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
}



static async deleteTask(req, res) {
  try {
    const { title } = req.params;
    const task = await task.findOne({
      where: { title },
    });
    if (!task) {
      return res.status(404).send('no task found');
    }

    const taskUpdated =  await task.update(task.state= "deleted",{   
      where: { title },
      }
    );
    return res.status(200).json({
      status: 200,
      message: 'tasks deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
}

static async draftTask(req, res) {
  try {
    const { title } = req.params;
    const task = await task.findOne({
      where: { title },
    });
    if (!task) {
      return res.status(404).send('no task found');
    }

    const taskUpdated =  await task.update(task.draft= "drafted",{   
      where: { title },
      }
    );
    return res.status(200).json({
      status: 200,
      message: 'tasks drafted successfully',
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
}
}

export default Task;