import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import { Container, ButtonBig, ButtonEdit, ButtonDelete } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .integer('Duração não aceita decimais')
    .required('O email é obrigatório'),
  price: Yup.number().required('O preço é obrigatório'),
  monthPrice: Yup.number().required('O preço é obrigatório'),
});

export default function Students() {
  const [planList, setPlanList] = useState([]);
  const [planForm, setPlanForm] = useState({
    id: 0,
    title: '',
    duration: 0,
    price: 0,
  });
  const [pageStatus, setPageStatus] = useState('list'); // list, add, edit

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlanList(response.data);
    }

    loadPlans();
  }, []);

  function handleAdd() {
    setPageStatus('form');
  }

  async function handleSubmitSave(payload) {
    try {
      const response =
        pageStatus === 'edit'
          ? await api.put(`/plans/${planForm.id}`, payload)
          : await api.post('/plans', payload);

      if (pageStatus === 'edit') {
        const index = planList.findIndex(stud => stud.email === payload.email);
        const newPlan = planList;
        newPlan[index] = response.data;

        setPlanList(newPlan);
      } else {
        setPlanList(planList.concat(response.data));
      }
      if (pageStatus === 'edit') {
        setPlanForm({});
        toast.success('Plano alterado com sucesso!');
      } else {
        toast.success('Plano criado com sucesso!');
      }
      setPageStatus('list');
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleBack() {
    setPlanForm({});
    setPageStatus('list');
  }

  function handleEdit(payload) {
    setPlanForm(payload);
    setPageStatus('form');
  }

  async function handleDelete(payload) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Confirm exclusão de '${payload.name}' ?`)) {
      try {
        const response = await api.delete(`/plans/${payload.id}`);

        if (response.data.ok) {
          const draftPlanList = planList;
          const index = planList.findIndex(pln => pln.id === payload.id);
          draftPlanList.splice(index, 1);
          setPlanList(draftPlanList);
          toast.success('Plano excluído com sucesso!');
        } else {
          toast.error('Erro ao excluir plano');
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
        <td>{row.title}</td>
        <td>{row.duration}</td>
        <td>{row.price}</td>
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
          <h1>Gerenciando planos</h1>
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
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR p/ MÊS</th>
                <th width="100"> </th>
              </tr>
            </thead>
            <tbody>{planList.map(pln => tableRow(pln))}</tbody>
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
            <h1>Edição de plano</h1>
          ) : (
            <h1>Cadastro de plano</h1>
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
          initialData={planForm}
        >
          <span>TÍTULO DO PLANO</span>
          <Input name="title" />
          <ul>
            <li>
              <span>DURAÇÃO (em meses)</span>
              <Input name="duration" type="number" />
            </li>
            <li>
              <span>PREÇO MENSAL</span>
              <Input name="price" type="number" />
            </li>
            <li>
              <span>PREÇO TOTAL</span>
              <Input name="monthPrice" />
            </li>
          </ul>
        </Form>
      </Container>
    );
  }
}
