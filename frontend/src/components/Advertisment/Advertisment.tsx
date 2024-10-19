import React, { useEffect, useRef } from "react";

interface AdOptions {
  key: string;
  format?: string;
  height?: number;
  width?: number;
  params?: {};
}

interface atOptionsProps {
  atOptions: AdOptions;
  className?: string;
  style?: React.CSSProperties;
}

const Advertisment: React.FC<atOptionsProps> = ({
  atOptions,
  className,
  style,
}) => {
  const banner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.plainsenlargecoronation.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return <div style={style} className={className} ref={banner}></div>;
};

export default Advertisment;
