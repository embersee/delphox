"use client";

import { Bot, NewBotParams, insertBotParams } from "@/lib/db/schema/bots";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { TRPCClientError } from "@trpc/client";

const BotForm = ({
  bot,
  closeModal,
}: {
  bot?: Bot;
  closeModal: () => void;
}) => {
  const { toast } = useToast();

  const editing = !!bot?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertBotParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertBotParams),
    defaultValues: bot ?? {
      username: "",
      botId: "",
      botToken: "",
      ownerId: 0,
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.bots.getBots.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: "Success",
      description: `Bot ${action}d!`,
      variant: "default",
    });
  };

  const onError = (msg: string) => {
    utils.bots.getBots.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: createBot, isLoading: isCreating } =
    trpc.bots.createBot.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (error) => onError(error.message),
    });

  const { mutate: updateBot, isLoading: isUpdating } =
    trpc.bots.updateBot.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteBot, isLoading: isDeleting } =
    trpc.bots.deleteBot.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewBotParams) => {
    if (editing) {
      updateBot({ ...values, id: bot.id });
    } else {
      createBot(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="botId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="botToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Token</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteBot({ id: bot.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default BotForm;
