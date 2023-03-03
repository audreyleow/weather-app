export default function AspectRatioBox({
  children,
  aspectWidth,
  aspectHeight,
  ...rest
}) {
  return (
    <div
      className="aspect-ratio-box"
      style={{
        paddingTop: `calc(${aspectHeight} / ${aspectWidth} * 100%)`,
      }}
      {...rest}
    >
      <div className="aspect-ratio-box-inner">{children}</div>
    </div>
  );
}
