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

const useWindowDimensions = () => {
  const isClient = typeof window === "object";
  const minWidth = 550;
  const minHeight = 550;
  const getWindowDimensions = useCallback(() => {
    if (isClient && window.innerWidth < minWidth) {
      if (window.innerHeight < minHeight) {
        return { width: minWidth, height: minHeight };
      }
      return {
        width: isClient ? minWidth : 0,
        height: isClient
          ? (minWidth * window.innerHeight) / window.innerWidth
          : 0,
      };
    } else {
      if (isClient && window.innerHeight < minHeight) {
        return {
          width: isClient
            ? (minHeight * window.innerWidth) / window.innerHeight
            : 0,
          height: isClient ? minHeight : 0,
        };
      }
      return {
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0,
      };
    }
  }, [isClient]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useIsomorphicLayoutEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getWindowDimensions]);
  return windowDimensions;
};

const Tree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { width, height } = useWindowDimensions();
  const { resolvedTheme } = useTheme();
  const [fg, firstbg, secondbg] =
    resolvedTheme === "light"
      ? ["#706570", "#eeaeca", "#94bbe9"]
      : ["#8a8299", "#242473", "#7e5960"];

  useIsomorphicLayoutEffect(() => {
    const scale = window.devicePixelRatio;

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      canvasRef.current.style.width = `${width.toString()}px`;
      canvasRef.current.style.height = `${height.toString()}px`;
      canvasRef.current.width = width * scale;
      canvasRef.current.height = height * scale;
      canvasRef.current.style.setProperty(
        "background",
        `linear-gradient(135deg, ${firstbg} 0%, ${secondbg} 100%)`
      );

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
      { st: 50, len: 50, deg: 230, c: "#31748f", w: 5 },
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
  }, [context, width, height, firstbg, fg]);

  return (
    <canvas
      ref={canvasRef}
      style={
        {
          // minWidth: "100vw",
          // minHeight: "100vh",
        }
      }
    />
  );
};

export default Tree;
