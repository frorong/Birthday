/**@jsxImportSource @emotion/react */

'use client';

import emotionReset from 'emotion-reset';

import { Global, css } from '@emotion/react';

import { PupleIcon, GreenIcon, YellowIcon } from '@/assets';

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
    <div
      css={css`
        position: absolute;
        top: 0rem;
        left: 0rem;
      `}
    >
      <PupleIcon />
    </div>
    <div
      css={css`
        position: absolute;
        top: 12.375rem;
        right: 0rem;
      `}
    >
      <YellowIcon />
    </div>
    <div
      css={css`
        position: absolute;
        bottom: 0rem;
        left: 15.4375rem;
      `}
    >
      <GreenIcon />
    </div>
    {children}
  </>
);

export default Providers;
