import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User alredy exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schemaParam = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schemaParam.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation of params fails' });
    }
    const schemaBody = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schemaBody.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation of body fails' });
    }

    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async list(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      page: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, page = 1, email } = req.query;
    const { Op } = Sequelize;

    const student = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      where: {
        [Op.and]: [
          name && { name: { [Op.like]: `%${name}%` } },
          email && { email },
        ],
      },
      order: [['name', 'ASC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    if (!student) {
      return res.status(400).json({ error: 'Studant does not extists' });
    }

    return res.json(student);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    await student.destroy(req.params);

    return res.json({ ok: true });
  }
}

export default new StudentController();
