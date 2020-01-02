import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 448px;
  padding: 50px 20px;
  background: #fff;
  border-radius: 4px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    img {
    }

    h1 {
      font-family: Roboto, sans-serif;
      font-weight: bold;
      font-size: 29px;
      color: #ee4d64;
      margin-bottom: 37px;
      margin-top: 13px;
    }
    text {
      font-family: Roboto, sans-serif;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: left;
    }

    input {
      border: 0;
      border-radius: 4px;
      border: 1px solid #ddd;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
        font-family: Roboto, sans-serif;
        font-size: 16px;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
