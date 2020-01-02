import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import { Container, ButtonBig, ButtonEdit, ButtonDelete } from './styles';

const schema = Yup.object().shape({
  name: Yup.string('Formato do email inválido').required(
    'O nome é obrigatório'
  ),
  email: Yup.string()
    .email()
    .required('O email é obrigatório'),
  age: Yup.number()
    .integer()
    .required('A idade é obrigatória'),
  formatedWeight: Yup.number().required('O peso é obrigatório'),
  formatedHeight: Yup.number().required('A altura é obrigatória'),
});

export default function Students() {
  const [studentList, setStudentList] = useState([]);
  const [findName, setFindName] = useState('');
  const [studentForm, setStudentForm] = useState({
    id: 0,
    name: '',
    email: '',
    age: 0,
    weight: 0,
    height: 0,
  });
  const [pageStatus, setPageStatus] = useState('list'); // list, form

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: { name: findName },
      });

      const data = response.data.map(student => ({
        ...student,
        formatedWeight: `${student.weight}kg`,
        formatedHeight: `${student.height}m`,
      }));
      setStudentList(data);
    }

    loadStudents();
  }, [findName]);

  function handleSubmitFilter(e) {
    if (e.key === 'Enter') setFindName(e.target.value);
  }

  function handleAdd() {
    setPageStatus('form');
  }

  async function handleSubmitSave(payload) {
    try {
      const response =
        studentForm.id > 0
          ? await api.put(`/students/${studentForm.id}`, payload)
          : await api.post('/students', payload);

      if (studentForm.id > 0) {
        const index = studentList.findIndex(
          stud => stud.email === payload.email
        );
        const newStudent = studentList;
        newStudent[index] = response.data;

        setStudentList(newStudent);
      } else {
        setStudentList(studentList.concat(response.data));
      }
      if (studentForm.id > 0) {
        setStudentForm({});
        toast.success('Usuário alterado com sucesso!');
      } else {
        toast.success('Usuário criado com sucesso!');
      }
      setPageStatus('list');
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleBack() {
    setStudentForm({});
    setPageStatus('list');
  }

  function handleEdit(payload) {
    setStudentForm(payload);
    setPageStatus('form');
  }

  async function handleDelete(payload) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Confirm exclusão de '${payload.name}' ?`)) {
      try {
        const response = await api.delete(`/students/${payload.id}`);

        if (response.data.ok) {
          const draftStudenList = studentList;
          const index = studentList.findIndex(
            stud => stud.email === payload.email
          );
          draftStudenList.splice(index, 1);
          setStudentList(draftStudenList);
          toast.success('Usuário excluído com sucesso!');
        } else {
          toast.error('Erro ao excluir usuário');
        }
      } catch (error) {
        toast.error(error.message);
      }
      setPageStatus('list');
    }
  }

  function tableRow(row) {
    return (
      <tr key={row.email}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.age}</td>
        <td>
          <ButtonEdit type="button" onClick={() => handleEdit(row)}>
            editar
          </ButtonEdit>
          <ButtonDelete type="button" onClick={() => handleDelete(row)}>
            apagar
          </ButtonDelete>
        </td>
      </tr>
    );
  }

  if (pageStatus === 'list') {
    return (
      <Container>
        <header>
          <h1>Gerenciando alunos</h1>
          <div>
            <ButtonBig type="button" onClick={handleAdd}>
              CADASTRAR
            </ButtonBig>
            <input placeholder="Buscar aluno" onKeyPress={handleSubmitFilter} />
          </div>
        </header>
        <div>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
                <th width="100"> </th>
              </tr>
            </thead>
            <tbody>{studentList.map(student => tableRow(student))}</tbody>
          </table>
        </div>
      </Container>
    );
  }
  if (pageStatus === 'form') {
    return (
      <Container>
        <header>
          {studentForm.id > 0 ? (
            <h1>Edição de aluno</h1>
          ) : (
            <h1>Cadastro de alunos</h1>
          )}
          <div>
            <ButtonBig color="#CCC" onClick={handleBack}>
              VOLTAR
            </ButtonBig>{' '}
            <ButtonBig color="#ee4d64" type="submit" form="formSubmit">
              SALVAR
            </ButtonBig>
          </div>
        </header>
        <Form
          schema={schema}
          onSubmit={handleSubmitSave}
          id="formSubmit"
          initialData={studentForm}
        >
          <span>NOME COMPLETO</span>
          <Input name="name" placeholder="John Doe" />
          <span>ENDEREÇO DE E-MAIL</span>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <ul>
            <li>
              <span>IDADE</span>
              <Input name="age" type="number" />
            </li>
            <li>
              <span>PESO (em kg)</span>
              <Input name="weight" />
            </li>
            <li>
              <span>ALTURA</span>
              <Input name="height" />
            </li>
          </ul>
        </Form>
      </Container>
    );
  }
}
