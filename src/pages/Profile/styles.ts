import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  header {
    height: 144px;
    background: #28262e;

    > a {
      max-width: 1120px;
      margin: 0 auto;
      height: 100%;

      display: flex;
      align-items: center;

      svg {
        color: #999591;
        width: 25px;
        height: 25px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: -93px;

  form {
    width: 340px;
    text-align: center;

    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      line-height: 26px;
      font-size: 500;
      text-align: left;
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const InputAvatar = styled.div`
  width: 186px;
  height: 186px;
  position: relative;
  align-self: center;
  margin-bottom: 32px;

  img {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    align-self: center;
  }

  label {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
