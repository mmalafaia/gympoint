import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div`
  align-self: center;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  width: 450px;
  height: 445px;
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Question = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  text-align: justify;
  text-justify: inter-word;
`;

export const Answer = styled.textarea`
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 100%;
  height: 127px;
  text-align: justify;
  text-justify: inter-word;
  padding: 10px;
  font-family: Roboto, sans-serif;
`;

export const ButtonAdd = styled.button`
  background: #ee4d64;
  border: none;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  width: 100%;
  margin-bottom: 10px;
`;

export const ButtonCancel = styled.button`
  background: #ccc;
  border: none;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  width: 100%;
  margin-bottom: 10px;
`;
