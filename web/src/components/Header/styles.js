import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: auto;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 48px;
    }

    h1 {
      margin-right: 13px;
      font-size: 15px;
      color: #ee4d64;
      border-right: 1px solid #eee;
      padding: 10px;
    }

    a {
      font-weight: bold;
      font-size: 15px;
      color: #000;
      margin: 10px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
