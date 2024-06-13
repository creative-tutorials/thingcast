"use client";

import { useRouter, usePathname } from "next/navigation";

export default function SharePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ params, pathname });
  return <div>Event Page {params.id}</div>;
}
