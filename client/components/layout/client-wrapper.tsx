"use client";

import { useState } from "react";
import { DialogComponent } from "@/components/layout/ui/dialog";
import { CopyDialog } from "@/components/layout/ui/copy-dialog";
import { dialogControlType } from "@/types/control";
import { TableStoreType } from "@/types/event";
import { EventCard } from "./event-card";

export function ClientWrapper() {
  const [dialogs, setDialogs] = useState<dialogControlType>({
    isOpen: false,
    isCopyOpen: false,
  });
  const [formD, setFormD] = useState<TableStoreType>({
    id: "",
    evntid: "",
  });
  const [uri, setUri] = useState("https://create.t3.gg");

  return (
    <div id="client-wrapper">
      {/* ------- EVENT CARD ------- */}
      <EventCard
        setUri={setUri}
        setFormD={setFormD}
        dialogs={dialogs}
        setDialogs={setDialogs}
      />
      {/* ------- EDIT EVENT DIALOG ------- */}
      <DialogComponent
        dialogs={dialogs}
        setDialogs={setDialogs}
        formD={formD}
      />
      {/* ------- COPY EVENT DIALOG ------- */}
      <CopyDialog dialogs={dialogs} setDialogs={setDialogs} uri={uri} />
    </div>
  );
}
