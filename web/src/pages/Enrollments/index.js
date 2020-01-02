import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import { Container, ButtonBig, ButtonEdit, ButtonDelete } from './styles';

const schema = Yup.object().shape({
  student_name: Yup.string().required('O aluno é obrigatório'),
  plan_title: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.date('Data inválida.').required('A data é obrigatória'),
  end_date: Yup.date(),
  total_price: Yup.number(),
});

export default function Students() {
  const [enrollmentList, setEnrollmentList] = useState([]);
  const [enrollmentForm, setEnrollmentForm] = useState({
    id: 0,
    student_id: '',
    student: {
      name: '',
    },
    plan_id: 0,
    start_date: new Date(),
    end_date: new Date(),
  });
  const [pageStatus, setPageStatus] = useState('list'); // list, add, edit
  const [studentList, setStudentList] = useState([]);
  const [planList, setPlanList] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const enrollmentResponse = await api.get('enrollments');

      setEnrollmentList(enrollmentResponse.data);

      const studentResponse = await api.get('students');
      const draftStudent = studentResponse.data.map(student => ({
        value: student.id,
        title: student.name,
      }));

      setStudentList(draftStudent);

      const planResponse = await api.get('plans');
      const draftPlan = planResponse.data.map(pln => ({
        value: pln.id,
        title: pln.title,
      }));

      setPlanList(draftPlan);
    }

    loadEnrollments();
  }, []);

  function handleAdd() {
    console.log(enrollmentForm);
    setPageStatus('add');
  }

  async function handleSubmitSave(payload) {
    try {
      const response =
        pageStatus === 'edit'
          ? await api.put(`/enrollments/${enrollmentForm.id}`, payload)
          : await api.post('/enrollments', payload);

      if (pageStatus === 'edit') {
        const index = enrollmentList.findIndex(
          enroll => enroll.id === payload.id
        );
        const newEnrollment = enrollmentList;
        newEnrollment[index] = response.data;

        setEnrollmentList(newEnrollment);
      } else {
        setEnrollmentList(enrollmentList.concat(response.data));
      }
      if (pageStatus === 'edit') {
        setEnrollmentForm({});
        toast.success('Matrícula alterado com sucesso!');
      } else {
        toast.success('Matrícula criado com sucesso!');
      }
      setPageStatus('list');
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleBack() {
    setEnrollmentForm({});
    setPageStatus('list');
  }

  function handleEdit(payload) {
    setEnrollmentForm(payload);
    setPageStatus('edit');
  }

  async function handleDelete(payload) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Confirm exclusão de '${payload.student_name}' ?`)) {
      try {
        const response = await api.delete(`/enrollments/${payload.id}`);

        if (response.data.ok) {
          const draftEnrollmentList = enrollmentList;
          const index = enrollmentList.findIndex(
            enroll => enroll.id === payload.id
          );
          draftEnrollmentList.splice(index, 1);
          setEnrollmentList(draftEnrollmentList);
          toast.success('Matrícula excluída com sucesso!');
        } else {
          toast.error('Erro ao excluir matrícula');
        }
      } catch (error) {
        toast.error(error.message);
      }
      setPageStatus('list');
    }
  }

  function tableRow(row) {
    return (
      <tr key={String(row.id)}>
        <td>{row.student.name}</td>
        <td>{row.plan.title}</td>
        <td>{row.start_date}</td>
        <td>{row.end_date}</td>
        <td> </td>
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
          <h1>Gerenciando matrículas</h1>
          <div>
            <ButtonBig type="button" onClick={handleAdd}>
              CADASTRAR
            </ButtonBig>
          </div>
        </header>
        <div>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                <th width="100"> </th>
              </tr>
            </thead>
            <tbody>{enrollmentList.map(enroll => tableRow(enroll))}</tbody>
          </table>
        </div>
      </Container>
    );
  }
  if (pageStatus === 'add' || pageStatus === 'edit') {
    return (
      <Container>
        <header>
          {pageStatus === 'edit' ? (
            <h1>Edição de matrículas</h1>
          ) : (
            <h1>Cadastro de matrículas</h1>
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
          initialData={enrollmentForm}
        >
          <span>ALUNO</span>
          {enrollmentForm.student_id > 0 ? (
            <Select
              name="student_id"
              options={studentList}
              defaultValue={{
                id: enrollmentForm.student_id,
                title: enrollmentForm.student.name,
              }}
            />
          ) : (
            <Select
              name="student_id"
              options={studentList}
              placeholder="Selecione..."
            />
          )}

          <ul>
            <li key="1">
              <span>PLANO</span>
              {enrollmentForm.student_id > 0 ? (
                <Select
                  name="plan_id"
                  options={planList}
                  defaultValue={{
                    id: enrollmentForm.plan_id,
                    title: enrollmentForm.plan.title,
                  }}
                />
              ) : (
                <Select
                  name="plan_id"
                  options={planList}
                  placeholder="Selecione..."
                />
              )}
            </li>
            <li key="2">
              <span>DATA INÍCIO</span>
              <Input
                type="date"
                name="start_date"
                value={enrollmentForm.start_date}
              />
            </li>
            <li key="3">
              <span>DATA TÉRMINO</span>
              <Input type="date" name="end_date" />
            </li>
            <li key="4">
              <span>VALOR FINAL</span>
              <Input name="price" />
            </li>
          </ul>
        </Form>
      </Container>
    );
  }
}
