import { FC } from 'react';

export const Spinner: FC = () => {
  return (
    <div className="loading">
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
      </div>
      <style jsx global>{`
        .loading {
          width:100%;
          height: 100vh;
          background-color: #1d2630;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          z-index: 50;
          position: relative;
          overflow:hidden;
          position:fixed;
        }
        .spinner-box {
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
        }

        @keyframes spin {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(359deg);
          }
        }

        .circle-border {
          width: 150px;
          height: 150px;
          padding: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background: rgb(63, 249, 220);
          background: linear-gradient(
            0deg,
            rgba(63, 249, 220, 0.1) 33%,
            rgba(63, 249, 220, 1) 100%
          );
          animation: spin 0.8s linear 0s infinite;
        }

        .circle-core {
          width: 100%;
          height: 100%;
          background-color: #1d2630;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
