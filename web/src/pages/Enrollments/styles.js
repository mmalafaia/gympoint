import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  max-height: 542px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      align-self: center;
    }

    div {
      display: flex;
      height: 56px;
      padding: 10px;
      justify-content: right;
    }
  }

  > div {
    width: 100%;
    background: #fff;

    table {
      padding: 30px;
      width: 100%;
      margin-top: 30px;
      text-align: left;

      th + th {
        text-align: center;
      }

      td {
        height: 52px;
        font-size: 16px;
        border-bottom: 1px solid #eee;
      }

      td + td {
        text-align: center;
      }

      > td {
        width: 50%;
      }
    }
  }

  form {
    width: 100%;
    background: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14;
      font-weight: bold;
      padding: 5px 0px;
    }

    input,
    select,
    DatePicker {
      font-size: 16;
      padding: 10px;
      margin: 5px 0px;
      border-style: none;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      font-size: 16px;
      width: 100%;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    li {
      display: grid;
    }
    li + li {
      padding-left: 17px;
    }
  }
`;

export const ButtonEdit = styled.button`
  background: none;
  border: none;
  color: #4d85ee;
  padding: 10px;
`;

export const ButtonDelete = styled.button`
  background: none;
  border: none;
  color: #de3b3b;
`;

export const ButtonBig = styled.button`
  width: 142px;
  height: 36px;
  background: ${props => (props.color ? props.color : '#ee4d64')};
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  text-align: right;
  padding-right: 16px;
  margin-left: 15px;
`;
