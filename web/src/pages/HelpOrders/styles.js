import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    flex: 1;
    padding: 30px 0px;
  }

  > div {
    width: 100%;
    background: #fff;

    table {
      padding: 30px;
      width: 100%;
      margin-top: 30px;
      text-align: left;

      tr + tr {
        border-top: 1px solid #ccc;
      }

      td {
        height: 52px;
        font-size: 16px;
      }
    }
  }
`;

export const ButtonEdit = styled.button`
  background: none;
  border: none;
  color: #4d85ee;
  padding: 10px;
`;
