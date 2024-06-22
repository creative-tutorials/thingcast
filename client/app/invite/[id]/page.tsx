import { Header } from "@/components/layout/navigation/header";
import { InviteBox } from "@/components/layout/ui/invite-box";

export default function SharePage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full p-4 md:p-20 lg:p-20">
      {/* ------- HEADER ------- */}
      <Header />
      {/* ------- INVITE BOX ------- */}
      <InviteBox slug={params.id} />
    </div>
  );
}
