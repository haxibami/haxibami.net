import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useTheme } from "next-themes";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Tree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const useWindowDimensions = () => {
    const isClient = typeof window === "object";
    const getWindowDimensions = useCallback(() => {
      if (isClient && window.innerWidth < 600) {
        {
          return {
            prewidth: isClient ? 500 : 0,
            preheight: isClient ? 900 : 0,
          };
        }
      }
      return {
        prewidth: isClient ? window.innerWidth : 0,
        preheight: isClient ? window.innerHeight : 0,
      };
    }, [isClient]);
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
    useEffect(() => {
      const onResize = () => {
        setWindowDimensions(getWindowDimensions());
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [getWindowDimensions]);
    return windowDimensions;
  };

  const { prewidth, preheight } = useWindowDimensions();
  const width = prewidth;
  const height = preheight;

  const { resolvedTheme } = useTheme();
  const [fg, bg] =
    resolvedTheme === "light" ? ["#706570", "#d2ced9"] : ["#8a8299", "#14111a"];

  useIsomorphicLayoutEffect(() => {
    const scale = window.devicePixelRatio;

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      canvasRef.current.style.width = width.toString() + "px";
      canvasRef.current.style.height = height.toString() + "px";
      canvasRef.current.width = width * scale;
      canvasRef.current.height = height * scale;
      canvasRef.current.style.setProperty("background", bg);

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    interface ArcProps {
      x: number;
      y: number;
      rad: number;
      st: number;
      en: number;
      c: string;
      w: number;
    }

    const arcs: ArcProps[] = [
      { x: 0, y: 0, rad: 100, st: -90, en: 115, c: fg, w: 5 },
      { x: 0, y: 0, rad: 150, st: 100, en: 130, c: fg, w: 5 },
      { x: 0, y: 0, rad: 200, st: 120, en: 140, c: fg, w: 5 },
      { x: 0, y: 0, rad: 150, st: -65, en: -35, c: fg, w: 5 },
      { x: 0, y: 0, rad: 150, st: -10, en: 20, c: fg, w: 5 },
      { x: 0, y: 0, rad: 150, st: 45, en: 75, c: fg, w: 5 },
      { x: 0, y: 0, rad: 100, st: 150, en: 190, c: fg, w: 5 },
    ];

    interface BranchProps {
      st: number;
      len: number;
      deg: number;
      c: string;
      w: number;
    }

    const branches: BranchProps[] = [
      { st: 50, len: 50, deg: 15, c: fg, w: 5 },
      { st: 100, len: 50, deg: -90, c: fg, w: 5 },
      { st: 100, len: 50, deg: -50, c: fg, w: 5 },
      { st: 150, len: 50, deg: -35, c: fg, w: 5 },
      { st: 150, len: 50, deg: -65, c: fg, w: 5 },
      { st: 100, len: 50, deg: 5, c: fg, w: 5 },
      { st: 150, len: 50, deg: -10, c: fg, w: 5 },
      { st: 150, len: 50, deg: 20, c: fg, w: 5 },
      { st: 100, len: 50, deg: 60, c: fg, w: 5 },
      { st: 150, len: 50, deg: 45, c: fg, w: 5 },
      { st: 150, len: 50, deg: 75, c: fg, w: 5 },
      { st: 100, len: 50, deg: 115, c: fg, w: 5 },
      { st: 150, len: 50, deg: 100, c: fg, w: 5 },
      { st: 150, len: 50, deg: 130, c: fg, w: 5 },
      { st: 200, len: 50, deg: 120, c: fg, w: 5 },
      { st: 200, len: 50, deg: 140, c: fg, w: 5 },
      { st: 50, len: 50, deg: 170, c: fg, w: 5 },
      { st: 100, len: 50, deg: 150, c: fg, w: 5 },
      { st: 100, len: 50, deg: 190, c: fg, w: 5 },
      { st: 50, len: 50, deg: 230, c: "#9986bf", w: 5 },
    ];

    if (context) {
      context.scale(scale, scale);
      context.translate(width / 2, height / 2);

      const Arc = (props: ArcProps) => {
        const { x, y, rad, st, en, c, w } = props;
        context.beginPath();
        context.arc(x, y, rad, (st * Math.PI) / 180, (en * Math.PI) / 180);
        context.lineWidth = w;
        context.strokeStyle = c;
        context.stroke();
      };

      const Branch = (props: BranchProps): void => {
        const { st, len, deg, c, w } = props;

        context.beginPath();
        context.rotate((Math.PI * deg) / 180);
        context.moveTo(st - w / 2, 0);
        context.lineTo(st + len + w / 2 - 1, 0);
        context.lineWidth = w;
        context.strokeStyle = c;
        context.stroke();
        context.rotate((-Math.PI * deg) / 180);
      };

      arcs.forEach((arc) => {
        Arc(arc);
      });
      branches.forEach((branch) => {
        Branch(branch);
      });
    }
  }, [context, width, height, bg, fg]);

  return <canvas ref={canvasRef} />;
};

export default Tree;
