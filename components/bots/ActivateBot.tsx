"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

import { useToast } from "../ui/use-toast";
import { RouterOutputs } from "@/trpc/shared";
import { api } from "@/trpc/react";
import { NonNullableFields } from "@/server/types";
import { useRouter } from "next/navigation";

const ActivateBotButton = ({
  children,
  onClickAction,
  desc,
  variant,
  className,
  activate,
}: {
  children: string | string[];
  onClickAction: () => void;
  desc: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  className?: string;
  activate: boolean;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={variant} className={className}>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[250]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onClickAction}>
              {activate ? "Activate Bot" : "Deactivate Bot"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const Activation = ({
  bot,
}: NonNullableFields<RouterOutputs["bots"]["getBot"]>) => {
  const { toast } = useToast();
  const router = useRouter();

  const utils = api.useContext();

  const onSuccess = (action: "activate" | "deactivate") => {
    utils.bots.getBotById.invalidate();
    router.refresh();
    toast({
      title: "Success 👏",
      description: `Bot ${action}d!`,
      variant: "default",
    });
  };

  const onError = (msg: string) => {
    utils.bots.getBotById.invalidate();
    router.refresh();
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: deactivateBot, isLoading: isUpdatingDeact } =
    api.bots.activateBot.useMutation({
      onSuccess: () => onSuccess("deactivate"),
      onError: (error) => onError(error.message),
    });

  const { mutate: activateBot, isLoading: isUpdatingAct } =
    api.bots.activateBot.useMutation({
      onSuccess: () => onSuccess("activate"),
      onError: (error) => onError(error.message),
    });

  return (
    <div>
      {bot.active ? (
        <ActivateBotButton
          variant="outline"
          className="border-green-300 backdrop-blur-[1px]"
          onClickAction={() => deactivateBot({ id: bot.id, active: false })}
          desc="This action turns your bot off. Your clients won't be able to see your store/catalog."
          activate={false}
        >
          {isUpdatingDeact ? "Deactivating..." : "Active"}
        </ActivateBotButton>
      ) : (
        <ActivateBotButton
          variant="outline"
          className="border-orange-300 backdrop-blur-[1px]"
          onClickAction={() => activateBot({ id: bot.id, active: true })}
          desc="This action will turn your bot on. Your clients will be able to view your store."
          activate={true}
        >
          {isUpdatingAct ? "Activating..." : "Deactivated"}
        </ActivateBotButton>
      )}
    </div>
  );
};
