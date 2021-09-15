import React, { useRef, useState, useEffect, useCallback } from "react";

export const Tree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const useWindowDimensions = () => {
    const isClient = typeof window === 'object';
    const getWindowDimensions = useCallback(() => {
      if (isClient && window.innerWidth < 800)
        return {
          prewidth: isClient ? 800 : 0,
          preheight: isClient ? window?.outerHeight : 0
        }
        return {
          prewidth: isClient ? window?.innerWidth : 0,
          preheight: isClient ? window?.innerHeight : 0
        };
    }, [isClient]);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
      const onResize = () => {
        setWindowDimensions(getWindowDimensions());
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, [getWindowDimensions]);
    return windowDimensions;
  };

  const {prewidth, preheight} = useWindowDimensions();
  const width = prewidth
  const height = preheight

  useEffect(() => {
    const scale = window.devicePixelRatio;
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      canvasRef.current.style.width = width + "px";
      canvasRef.current.style.height = height + "px";
      canvasRef.current.width = width * scale;
      canvasRef.current.height = height * scale;

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context) {

      context.scale(scale, scale)
      context.translate(width / 2, height / 2)

      let ArcArgs: {
        x: number
        y: number
        radius: number
        start: number
        end: number
        color: string
        width: number
      }

      const Arc = (x: number, y: number, radius: number, start: number, end: number, color: string, width: number): void => {
        context.beginPath();
        context.arc(x, y, radius, start * Math.PI / 180 , end * Math.PI / 180);
        context.lineWidth = width;
        context.strokeStyle = color;
        context.stroke();
      }

      const Branch = (start: number, len: number, deg: number, color: string, width: number): void => {
        context.beginPath();
        context.rotate(Math.PI * deg / 180);
        context.moveTo(start - width / 2, 0);
        context.lineTo(start + len + width / 2 - 1, 0);
        context.lineWidth = width;
        context.strokeStyle = color;
        context.stroke();
        context.rotate(-Math.PI * deg / 180);
      }

      const arcs: [number, number, number, number, number, string, number][] = [
        [0, 0, 100, -90, 115, 'black', 5],
          [0, 0, 150, 100, 130, 'black', 5],
            [0, 0, 200, 120, 140, 'black', 5],
          [0, 0, 150, -55, -25, 'black', 5],
          [0, 0, 150, 35, 65, 'black', 5],
        [0, 0, 100, 150, 190, 'black', 5],
      ];

      const branches: [number, number, number, string, number][] = [
        [50, 50, 15, 'black', 5],
          [100, 50, -90, 'black', 5],
          [100, 50, -40, 'black', 5],
          [100, 50, 6, 'black', 5],
            [150, 50, -25, 'black', 5],
            [150, 50, -55, 'black', 5],
          [100, 50, 50, 'black', 5],
            [150, 50, 35, 'black', 5],
            [150, 50, 65, 'black', 5],
          [100, 50, 115, 'black', 5],
            [150, 50, 100, 'black', 5],
            [150, 50, 130, 'black', 5],
              [200, 50, 120, 'black', 5],
              [200, 50, 140, 'black', 5],
        [50, 50, 170, 'black', 5],
          [100, 50, 150, 'black', 5],
          [100, 50, 190, 'black', 5],
        [50, 50, 230, '#bd93f9', 5],
      ];

      for (let i = 0; i < arcs.length; i++) {
        Arc(...arcs[i])
      }
      for (let j = 0; j < branches.length; j++) {
        Branch(...branches[j])
      }
    }
  }, [context, width, height]);

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <canvas
        id="canvas"
        ref={canvasRef}
//        width={1000}
//        height={1000}
        style={{
//          border: '2px solid #000'
          background: 'lavender',
          border: 'none',
          margin: 0,
          position: "relative",
          top: -1,
          left: -1,
        }}
      ></canvas>
    </div>
  );
}

