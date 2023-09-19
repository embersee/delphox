import BotList from "@/components/bots/BotList";
import NewBotModal from "@/components/bots/BotModal";
import { getBots } from "@/lib/api/bots/queries";
import { checkAuth } from "@/lib/auth/utils";

export default async function Bots() {
  // await checkAuth();
  const { bots } = await getBots();

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Bots</h1>
        <NewBotModal />
      </div>
      <BotList bots={bots} />
    </main>
  );
}
