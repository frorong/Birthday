/**@jsxImportSource @emotion/react */

'use client';

import emotionReset from 'emotion-reset';

import { Global, css } from '@emotion/react';

import { PupleIcon, GreenIcon, YellowIcon } from '@/assets';

import { ToastContainer } from 'react-toastify';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          body,
          * {
            font-family: 'Pretendard Variable', Pretendard, -apple-system,
              BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
              'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
              'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
              sans-serif;
            box-sizing: border-box;
          }

          body {
            height: 100vh;
            height: 100dvh;
            background-color: #f2815f;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          button {
            padding: 0;
            border: none;
            outline: none;
            background: inherit;
            cursor: pointer;
          }

          html {
            @media (max-width: 599px) {
              font-size: 15px;
            }
            @media (max-width: 530px) {
              font-size: 14px;
            }
            @media (max-width: 490px) {
              font-size: 13px;
            }
            @media (max-width: 460px) {
              font-size: 12px;
            }
            @media (max-width: 420px) {
              font-size: 11px;
            }
            @media (max-width: 390px) {
              font-size: 10px;
            }
            @media (max-width: 350px) {
              font-size: 9px;
            }
            @media (max-width: 320px) {
              font-size: 8px;
            }
          }

          body {
            @media (max-width: 599px) {
              overflow: hidden;
            }
          }
        `}
      />
      <div
        css={css`
          position: absolute;
          top: 0rem;
          left: 0rem;
          z-index: -1;
        `}
      >
        <PupleIcon />
      </div>
      <div
        css={css`
          position: absolute;
          top: 12.375rem;
          right: 0rem;
          z-index: -1;
        `}
      >
        <YellowIcon />
      </div>
      <div
        css={css`
          position: absolute;
          bottom: 0rem;
          left: 15.4375rem;
          z-index: -1;

          @media (max-width: 930px) {
            display: none;
          }
        `}
      >
        <GreenIcon />
      </div>
      <ToastContainer />
      {children}
    </>
  );
};

export default Providers;
