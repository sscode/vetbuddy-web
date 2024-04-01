export const FourPointedStar = ({
  ...props
}: React.HTMLProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0L12.8475 2.29029C14.3668 6.39608 17.6039 9.63324 21.7097 11.1525L24 12L21.7097 12.8475C17.6039 14.3668 14.3668 17.6039 12.8475 21.7097L12 24L11.1525 21.7097C9.63324 17.6039 6.39608 14.3668 2.29029 12.8475L0 12L2.29029 11.1525C6.39608 9.63324 9.63324 6.39608 11.1525 2.29029L12 0Z"
      fill="#A6AEBE"
    />
  </svg>
);
