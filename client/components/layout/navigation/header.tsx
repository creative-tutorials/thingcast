import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div
      id="header"
      className="fixed left-0 top-0 flex h-20 w-full items-center justify-between border-b border-zinc-800 bg-primary-primaryBG/80 p-4 backdrop-blur-md md:px-20 lg:px-20"
    >
      <div id="--app--logo">
        <Link href="/">
          <h3 className="text-xl font-bold text-white">
            Thing<span className="text-indigo-500">Cast</span>
          </h3>
        </Link>
      </div>
      <div id="help-btn">
        <Button className="w-full rounded-md bg-white text-black hover:bg-slate-100">
          Need help?
        </Button>
      </div>
    </div>
  );
}
