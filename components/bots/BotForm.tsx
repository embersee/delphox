"use client";

import { Bot, NewBotParams, insertBotParams } from "@/lib/db/schema/bots";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
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
import { DeleteBotButton } from "./DeleteBotButton";

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
      displayName: "",
      botToken: "",
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.bots.getBots.invalidate();
    // router.refresh();
    closeModal();
    toast({
      title: "Success 👏",
      description: `Bot ${action}d!`,
      variant: "default",
    });

    router.push("/dash");
  };

  const onError = (msg: string) => {
    utils.bots.getBots.invalidate();
    // router.refresh();
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
      onError: (error) => onError(error.message),
    });

  const { mutate: deleteBot, isLoading: isDeleting } =
    trpc.bots.deleteBot.useMutation({
      onSuccess: () => onSuccess("delete"),
      onError: (error) => onError(error.message),
    });

  const handleSubmit = (values: NewBotParams) => {
    console.log("click");
    if (editing) {
      updateBot({ ...values, id: bot.id });
    } else {
      createBot(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-4"}>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="e.g. My Store..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can change this at any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bot Username <span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="e.g. @username_bot"
                />
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
              <FormLabel>
                Bot Token <span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="e.g. ***"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-xs text-red-700">
          <p>* required fields</p>
        </div>
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
          <DeleteBotButton onClickAction={() => deleteBot({ id: bot.id })}>
            Delet{isDeleting ? "ing..." : "e"}
          </DeleteBotButton>
        ) : null}
      </form>
    </Form>
  );
};

export default BotForm;
