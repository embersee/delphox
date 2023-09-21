import BotList from "@/components/bots/BotList";
import { getBots } from "@/lib/api/bots/queries";

export default async function Dash() {
  const { bots } = await getBots();
  return (
    <>
      <BotList bots={bots} />
    </>
  );
}
