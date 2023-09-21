import BotList from "@/components/bots/BotList";
import BotModal from "@/components/bots/BotModal";
import { getBots } from "@/lib/api/bots/queries";

export default async function Dash() {
  const { bots } = await getBots();

  return (
    <>
      <h1>My Bots</h1>
      <BotList bots={bots} />
      <div className="mx-auto mt-2">
        <BotModal emptyState={true} />
      </div>
    </>
  );
}
