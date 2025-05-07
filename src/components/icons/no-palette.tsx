export const NoPaletteIcon = ({ size=16, ...props}: React.SVGProps<SVGSVGElement> & { size?: number }) => (	
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path strokeWidth={1.03689618} d="M5.45 4.34 19.134 19.57" />
    <path
      strokeWidth={1.388}
      d="M12 18.938a6.938 6.938 0 0 1 0-13.876c3.832 0 6.938 2.796 6.938 6.244a3.469 3.469 0 0 1-3.47 3.47h-1.56c-1 0-1.572 1.141-.971 1.942l.208.277c.6.8.029 1.943-.972 1.943z"
    />
    <g fill="currentColor" strokeWidth={1.388}>
      <circle cx={13.041} cy={8.184} r={0.347} />
      <circle cx={15.816} cy={10.959} r={0.347} />
      <circle cx={8.184} cy={12.347} r={0.347} />
      <circle cx={9.572} cy={8.878} r={0.347} />
    </g>
  </svg>
);
