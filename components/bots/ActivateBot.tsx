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
import { useRouter } from "next/navigation";
import { RouterOutputs } from "@/trpc/shared";
import { api } from "@/trpc/react";
import { NonNullableFields } from "@/server/types";

const ActivateBotButton = ({
  children,
  onClickAction,
  desc,
  variant,
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
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={variant}>
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
            <Button variant={variant} onClick={onClickAction}>
              {children}
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

  const utils = api.useContext();

  const onSuccess = (action: "activate" | "deactivate") => {
    utils.bots.getBots.invalidate();

    toast({
      title: "Success 👏",
      description: `Bot ${action}d!`,
      variant: "default",
    });
  };

  const onError = (msg: string) => {
    utils.bots.getBots.invalidate();

    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: deactivateBot, isLoading: isUpdatingDeact } =
    api.bots.updateBot.useMutation({
      onSuccess: () => onSuccess("deactivate"),
      onError: (error) => onError(error.message),
    });

  const { mutate: activateBot, isLoading: isUpdatingAct } =
    api.bots.updateBot.useMutation({
      onSuccess: () => onSuccess("activate"),
      onError: (error) => onError(error.message),
    });

  return (
    <div>
      {bot.active ? (
        <ActivateBotButton
          variant="destructive"
          onClickAction={() => deactivateBot({ ...bot, active: false })}
          desc="This action turns your bot off. Your clients won't be able to see your store/catalog."
        >
          {`Deactivat${isUpdatingDeact ? "ing..." : "e"}`}
        </ActivateBotButton>
      ) : (
        <ActivateBotButton
          onClickAction={() => activateBot({ ...bot, active: true })}
          desc="This action will turn your bot on. Your clients will be able to view your store."
        >
          {`Activat${isUpdatingAct ? "ing..." : "e"}`}
        </ActivateBotButton>
      )}
    </div>
  );
};
