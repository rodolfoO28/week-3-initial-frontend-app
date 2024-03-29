import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  > button {
    background: transparent;
    border: 0;
    margin-left: auto;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 26px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
    color: #f4ede8;
  }

  p {
    margin-top: 12px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;

      &.capitalize {
        text-transform: capitalize;
      }
    }

    span + span::before {
      content: '';
      background: #ff9000;
      width: 1px;
      height: 12px;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 20px;
    line-height: 26px;
    color: #999591;
    font-weight: 400;
  }

  > div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;

    position: relative;

    &::before {
      position: absolute;
      width: 1px;
      height: 80%;
      top: 10%;
      left: 0;
      background: #ff9000;
      border-radius: 10px;
      content: '';
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 24px;
      line-height: 32px;
      color: #f4ede8;
      font-weight: 500;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 12px;
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    font-size: 20px;
    line-height: 26px;
    font-weight: 400;
    color: #999591;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    font-size: 16px;
    line-height: 21px;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 12px;
      width: 16px;
      height: 16px;
    }
  }

  div {
    background: #3e3b47;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    margin-left: 26px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 16px;
      font-size: 20px;
      line-height: 26px;
      color: #f4ede8;
      font-weight: 500;
    }
  }
`;

export const Calendar = styled.aside`
  width: 360px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  /* .DayPicker {
    background: #28262e;
    border-radius: 10px;
    width: 100%;

    .DayPicker-wrapper {
      padding-bottom: 0;
    }

    .DayPicker-Month {
      flex: 1;
      padding: 0;
      margin: 0;

      .DayPicker-Caption {
        background: #3e3b47;
        height: 50px;
        padding: 0;
        margin: 0;
        border-radius: 10px 10px 0 0;

        > div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: inherit;
          font-size: 16px;
          color: #f4ede8;
          text-align: center;
        }
      }

      .DayPicker-Weekdays {
        > .DayPicker-WeekdaysRow {
          > .DayPicker-Weekday {
            margin: 0;
            padding: 0;
            color: #666360;
            font-size: 16px;
            line-height: 21px;
          }
        }
      }
    }
  } */
`;
