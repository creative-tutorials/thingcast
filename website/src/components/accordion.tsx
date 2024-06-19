import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionData } from "@/utils/acc";
import type React from "react";

interface AccordionProps {
  data: {
    title: string;
    content: string;
  }[];
}

export function AccordionRender({ data }: AccordionProps) {
  return (
    <Accordion
      type="multiple"
      className="w-full border-none flex flex-col gap-5"
    >
      {data.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i.toFixed()}`}
          className="bg-[#191919] border-none p-4 rounded-lg"
        >
          <AccordionTrigger className="text-white border-none md:text-xl lg:text-xl text-lg text-left font-bold">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-left text-zinc-400 border-none md:text-lg lg:text-lg text-base">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
