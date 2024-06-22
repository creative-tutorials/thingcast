import { TopMenuMobile } from "@/components/layout/sidebar/menu-mobile";

export function TopMenu() {
  return (
    <div id="top-menu" className="flex items-start gap-5">
      <TopMenuMobile />
      <hgroup>
        <h1 className="text-xl font-bold text-white">Events</h1>
        <p className="text-sm text-muted-foreground">
          Create events to share with your teams or viewers
        </p>
      </hgroup>
    </div>
  );
}
