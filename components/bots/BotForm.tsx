"use client";

import {
  CompleteBot,
  NewBotParams,
  insertBotParams,
} from "@/lib/db/schema/bot";
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircleIcon, X } from "lucide-react";

const BotForm = ({
  bot,
  setIsOpen,
}: {
  bot?: CompleteBot;
  setIsOpen: (isOpen: boolean) => void;
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
      description: "",
      shortDescription: "",
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.bots.getBotsWithCommands.invalidate();
    // router.refresh();
    setIsOpen(false);
    toast({
      title: "Success 👏",
      description: `Bot ${action}d!`,
      variant: "default",
    });

    router.push("/dash");
  };

  const onError = (msg: string) => {
    utils.bots.getBotsWithCommands.invalidate();
    // router.refresh();
    setIsOpen(true);
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
    if (editing) {
      updateBot({ ...values, id: bot.id });
    } else {
      createBot(values);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        className="grow flex flex-col justify-start"
      >
        <div className="space-y-6 grow">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input
                    className="w-[300px]"
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
                    className="w-[300px]"
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
                    className="w-[300px]"
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

          {editing && (
            <Accordion type="single" collapsible className="w-[300px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>Extra configuration</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 px-[1px]">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="e.g. description"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="e.g. short description"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>

        <div className="pt-4 pr-4 border-t-2 border-dashed flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="space-x-1 pr-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4" />
            <span>Close</span>
          </Button>
          {editing ? (
            <DeleteBotButton onClickAction={() => deleteBot({ id: bot.id })}>
              Delet{isDeleting ? "ing..." : "e"}
            </DeleteBotButton>
          ) : null}
          <Button
            type="submit"
            size="lg"
            variant="highlight"
            disabled={isCreating || isUpdating}
            className="space-x-1 pr-4"
          >
            <PlusCircleIcon className="h-4" />
            <span>
              {editing
                ? `Sav${isUpdating ? "ing..." : "e"}`
                : `Creat${isCreating ? "ing..." : "e"}`}
              {` `}Bot
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BotForm;
