'use client';

import emotionReset from 'emotion-reset';

import { Global, css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => (
  <>
    <Global
      styles={css`
        ${emotionReset}

        body,
        * {
          font-family: 'Pretendard Variable', Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
            'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
          box-sizing: border-box;
        }

        body {
          height: 100vh;
          height: 100dvh;
          background-color: #f2815f;
        }

        button {
          padding: 0;
          border: none;
          outline: none;
          background: inherit;
          cursor: pointer;
        }
      `}
    />
    {children}
  </>
);

export default Providers;
