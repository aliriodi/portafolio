"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function InteractivePortrait() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const proximity = 250; // Distancia en píxeles alrededor del retrato.

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;

      const element = portraitRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();

      const distanceX = Math.max(
        rect.left - event.clientX,
        0,
        event.clientX - rect.right,
      );

      const distanceY = Math.max(
        rect.top - event.clientY,
        0,
        event.clientY - rect.bottom,
      );

      setNear(Math.hypot(distanceX, distanceY) <= proximity);
    }

    function reset() {
      setNear(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    document.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
      document.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div
      ref={portraitRef}
      className="retrato-interactivo"
      data-near={near || focused}
      tabIndex={0}
      role="img"
      aria-label="Retrato de Alirio: muestra su cara al acercar el cursor"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Image
        src="/images/Alirio3-withouteLENS.png"
        alt=""
        width={480}
        height={525}
        className="retrato-base"
        priority
      />

      <Image
        src="/images/Alrio1.png"
        alt=""
        width={480}
        height={525}
        className="retrato-con-lentes"
        priority
      />
    </div>
  );
}