import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Modal from '~/components/Modal';

import { Container, ButtonEdit } from './styles';

export default function HelpOrder() {
  const [helpOrderList, setHelpOrderList] = useState([]);
  const [helpOrderModal, setHelpOrderModal] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders');

      setHelpOrderList(response.data);
    }

    loadHelpOrders();
  }, []);

  async function handleAdd(answer) {
    try {
      api.post(`/help-orders/${helpOrderModal.id}/answer`, {
        answer,
      });

      const index = helpOrderList.findIndex(hp => hp.id === helpOrderModal.id);
      helpOrderList.splice(index, 1);

      toast.success('Resposta registrada com sucesso.');

      setModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Container>
      <header>
        <h1>Pedidos de auxílio</h1>
      </header>
      <div>
        {modal && (
          <Modal
            handleAdd={answer => handleAdd(answer)}
            handleClose={() => setModal(false)}
            helpOrder={helpOrderModal}
          />
        )}

        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th width="100"> </th>
            </tr>
          </thead>
          <tbody>
            {helpOrderList.map(hp => (
              <tr key={String(hp.id)}>
                <td>{hp.student.name}</td>
                <td>
                  <ButtonEdit
                    type="button"
                    onClick={() => {
                      setModal(!modal);
                      setHelpOrderModal(hp);
                    }}
                  >
                    responder
                  </ButtonEdit>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
