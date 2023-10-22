"use client";

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

import { PlusCircleIcon, X } from "lucide-react";

import { BotId } from "@/server/schema/bot";
import { create } from "domain";

export const StoreSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
});

type Store = z.infer<typeof StoreSchema>;

const StoreForm = ({
  botId,
  setIsOpen,
}: {
  botId: BotId;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { toast } = useToast();

  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof StoreSchema>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.stores.getStore.invalidate();
    // router.refresh();
    setIsOpen(false);
    toast({
      title: "Success 👏",
      description: `Store ${action}d!`,
      variant: "default",
    });
  };

  const onError = (msg: string) => {
    utils.stores.getStore.invalidate();
    // router.refresh();
    setIsOpen(true);
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: createStore, isLoading: isCreating } =
    trpc.stores.createStore.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (error) => onError(error.message),
    });

  const { mutate: updateStore, isLoading: isUpdating } =
    trpc.stores.updateStore.useMutation({
      onSuccess: () => onSuccess("update"),
      onError: (error) => onError(error.message),
    });

  // const { mutate: deleteBot, isLoading: isDeleting } =
  //   trpc.bots.deleteBot.useMutation({
  //     onSuccess: () => onSuccess("delete"),
  //     onError: (error) => onError(error.message),
  //   });

  const handleSubmit = (values: Store) => {
    // if (editing) {
    //   updateBot({ ...values, id: bot.id });
    // } else {
    //   createBot(values);
    // }
    createStore({ ...values, botId: botId });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        className="flex grow flex-col justify-start"
      >
        <div className="grow space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Store name <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="e.g. My Shoe Store..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your customers will see this name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="e.g. This is a telegram store about clothing."
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-red-700">
            <p>* required fields</p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 border-t-2 border-dashed py-4 pr-4">
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

          <Button
            type="submit"
            size="lg"
            variant="highlight"
            disabled={isCreating || isUpdating}
            className="space-x-1 pr-4"
          >
            <PlusCircleIcon className="h-4" />
            <span>Creat{isCreating ? "ing..." : "e"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;
