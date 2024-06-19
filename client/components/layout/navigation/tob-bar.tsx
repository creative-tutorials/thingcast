import { FormEvent } from "../form/form-event";
import { TopMenu } from "./top-menu";

export function TopBar() {
  return (
    <div
      id="--top--bar"
      className="flex flex-wrap items-center justify-between gap-5"
    >
      {/* ------- TOP MENU ------- */}
      <TopMenu />
      {/* ------- FORM EVENT ------- */}
      <FormEvent />
    </div>
  );
}
