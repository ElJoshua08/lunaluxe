import { SVGProps } from 'react';

const GoogleIcon = ({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    viewBox="0 0 90 90"
    width={`${size}px`}
    height={`${size}px`}
    {...props}
  >
    <path
      fill="#4285F4"
      d="M46 37.727v15.491h21.527c-.945 4.982-3.782 9.2-8.037 12.037l12.982 10.073C80.036 68.346 84.4 58.09 84.4 45.91c0-2.837-.255-5.564-.728-8.182H46Z"
    />
    <path
      fill="#34A853"
      d="m23.582 52.614-2.928 2.241-10.364 8.073C16.872 75.982 30.362 85 46 85c10.8 0 19.854-3.564 26.472-9.673L59.49 65.255c-3.563 2.4-8.109 3.855-13.49 3.855-10.4 0-19.237-7.018-22.4-16.473l-.017-.023Z"
    />
    <path
      fill="#FBBC05"
      d="M10.29 27.073A39.507 39.507 0 0 0 6 45a39.508 39.508 0 0 0 4.29 17.928c0 .036 13.31-10.328 13.31-10.328-.8-2.4-1.273-4.946-1.273-7.6 0-2.655.473-5.2 1.273-7.6L10.29 27.072Z"
    />
    <path
      fill="#EA4335"
      d="M46 20.927c5.89 0 11.127 2.037 15.309 5.964l11.454-11.454C65.818 8.964 56.8 5 46 5c-15.636 0-29.127 8.982-35.708 22.073L23.599 37.4c3.164-9.454 12-16.473 22.4-16.473Z"
    />
  </svg>
);

export { GoogleIcon };
