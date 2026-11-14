import { useState } from "react";
import type { Consultant } from "@/lib/consultant-matching";

export function ConsultantPhoto({ consultant, large = false, portrait = false }: { consultant: Consultant; large?: boolean; portrait?: boolean }) {
  const [missing, setMissing] = useState(false);
  const initials = consultant.name.split(" ").map((part) => part[0]).join("");
  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary text-secondary-foreground ${portrait ? "aspect-[4/5] w-full text-5xl" : large ? "h-40 w-40 text-5xl sm:h-48 sm:w-48" : "h-28 w-28 text-3xl"}`}>
      {missing || !consultant.photo ? <span role="img" aria-label={consultant.name}>{initials}</span> : (
        <img src={consultant.photo} alt={consultant.name} className="h-full w-full object-cover object-top" ref={(image) => { if (image?.complete && image.naturalWidth === 0) setMissing(true); }} onError={() => setMissing(true)} />
      )}
    </div>
  );
}