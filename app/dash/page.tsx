import CreateBotButton from "@/components/bots/CreateBotButton";
import {
  CreateProjectVale,
  CreateProjectValeTrigger,
} from "@/components/bots/CreateBotVale";
import ProjectList from "@/components/bots/ProjectList";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { getBots } from "@/lib/api/bots/queries";
import { PlusCircleIcon } from "lucide-react";

export default async function Dash() {
  const { bots: bots } = await getBots();

  // const bots = botsA.filter((v) => v.active == true);
  return (
    <>
      <Heading title="My Bots" description="Manage your bots here.">
        {bots.length ? <CreateBotButton /> : null}
      </Heading>

      <ProjectList bots={bots} />
      {!bots.length && (
        <div className="text-center">
          <h2 className="mt-2 text-sm font-semibold">No bots</h2>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new bot.
          </p>
          <div className="mt-6">
            <CreateBotButton />
          </div>
        </div>
      )}

      <CreateProjectVale />
    </>
  );
}
