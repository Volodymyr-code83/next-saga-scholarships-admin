// ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  currentActiveStep: number;
  totalSteps: number;
  stepHeadings: { heading: string; details: string }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentActiveStep,
  totalSteps,
  stepHeadings,
}) => {
  return (
    <div className="relative mx-auto flex  w-full max-w-[1024px]  items-center justify-between">
      <div
        id="progress"
        className="absolute top-[12px] z-1 h-[2px] w-full max-w-[1024px] bg-[#DCDCDC]"
      />
      {[...Array(totalSteps)].map((_, index) => (
        <div className="relative " key={index}>
          <div
            className={`relative z-10 h-[24px] w-[24px]  rounded-full ${currentActiveStep >= index + 1 ? "bg-blue" : currentActiveStep === index + 1 ? "bg-blue" : "bg-[#E4E7EC]"} `}
          >
            {currentActiveStep > index + 1 ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.0965 7.38967L9.9365 14.2997L8.0365 12.2697C7.6865 11.9397 7.1365 11.9197 6.7365 12.1997C6.3465 12.4897 6.2365 12.9997 6.4765 13.4097L8.7265 17.0697C8.9465 17.4097 9.3265 17.6197 9.7565 17.6197C10.1665 17.6197 10.5565 17.4097 10.7765 17.0697C11.1365 16.5997 18.0065 8.40967 18.0065 8.40967C18.9065 7.48967 17.8165 6.67967 17.0965 7.37967V7.38967Z"
                  fill="white"
                />
              </svg>
            ) : currentActiveStep === index + 1 ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="12" fill="#131E42" />
                <circle cx="12" cy="12" r="4" fill="white" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="4" fill="white" />
              </svg>
            )}
          </div>
          <div className="absolute left-1/2 top-[100%] mt-[12px] flex w-auto  max-w-[240px] -translate-x-1/2 flex-col items-center justify-start">
            <p className="text-nowrap text-[14px] font-medium leading-[20px] text-[#344054]">
              {stepHeadings[index]?.heading}
            </p>
            <p className="text-nowrap text-[14px] font-normal leading-[20px] text-[#667085]">
              {stepHeadings[index]?.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
