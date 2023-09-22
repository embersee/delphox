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
import { CompleteBot } from "@/lib/db/schema/bot";
import { trpc } from "@/lib/trpc/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

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
      <AlertDialogContent>
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

export const Activation = ({ bot }: { bot: CompleteBot }) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();

  const onSuccess = (action: "activate" | "deactivate") => {
    utils.bots.getBots.invalidate();
    // router.refresh();
    toast({
      title: "Success 👏",
      description: `Bot ${action}d!`,
      variant: "default",
    });

    // router.push("/dash");
  };

  const onError = (msg: string) => {
    utils.bots.getBots.invalidate();
    router.refresh();
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: deactivateBot, isLoading: isUpdatingDeact } =
    trpc.bots.updateBot.useMutation({
      onSuccess: () => onSuccess("deactivate"),
      onError: (error) => onError(error.message),
    });

  const { mutate: activateBot, isLoading: isUpdatingAct } =
    trpc.bots.updateBot.useMutation({
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
