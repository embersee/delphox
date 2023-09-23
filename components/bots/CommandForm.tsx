"use client";

import { UseFormProps, useFieldArray, useForm } from "react-hook-form";
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

const validationSchema = z.object({
  commands: z.array(
    z.object({ command: z.string(), content: z.string(), botId: z.string() })
  ),
});

type Command = z.infer<typeof validationSchema>["commands"][number];

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      // rawValues: true
    }),
  });

  return form;
}

const CommandForm = ({
  commands,
  setIsOpen,
  botId,
}: {
  commands: Command[];
  setIsOpen: (isOpen: boolean) => void;
  botId: string;
}) => {
  const { toast } = useToast();

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useZodForm({
    schema: validationSchema,
    defaultValues: { commands },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "commands",
    control: form.control,
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.bots.getBots.invalidate();
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
    utils.bots.getBots.invalidate();
    // router.refresh();
    setIsOpen(true);
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  // const { mutate: createBot, isLoading: isCreating } =
  //   trpc.bots.createBot.useMutation({
  //     onSuccess: () => onSuccess("create"),
  //     onError: (error) => onError(error.message),
  //   });

  // const { mutate: updateBot, isLoading: isUpdating } =
  //   trpc.bots.updateBot.useMutation({
  //     onSuccess: () => onSuccess("update"),
  //     onError: (error) => onError(error.message),
  //   });

  // const { mutate: deleteBot, isLoading: isDeleting } =
  //   trpc.bots.deleteBot.useMutation({
  //     onSuccess: () => onSuccess("delete"),
  //     onError: (error) => onError(error.message),
  //   });

  const handleSubmit = (values: { commands: Command[] }) => {
    // if (editing) {
    //   updateBot({ ...values, id: bot.id });
    // } else {
    //   createBot(values);
    // }
    console.log({ values: { commands } });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 grow flex flex-col justify-start"
        autoComplete="off"
      >
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center justify-between">
              <FormField
                control={form.control}
                name={`commands.${index}.command` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Command name: </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[300px]"
                        autoComplete="off"
                        placeholder="e.g. /start, /catalog, /help etc."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`commands.${index}.content` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content: </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[300px]"
                        autoComplete="off"
                        placeholder="Hello I'm a bot made by @username! nice to meet you!"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                className="self-end h-9"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          );
        })}

        <div className="grow">
          <Button
            type="button"
            variant="highlight"
            onClick={() =>
              append({
                command: "",
                content: "",
                botId: botId,
              })
            }
          >
            Create new command
          </Button>
        </div>

        <div className=" p-4 border-t-2 border-dashed flex items-center justify-end space-x-4">
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
            className="space-x-1 pr-4"
          >
            <PlusCircleIcon className="h-4" />
            <span>
              {/* `Sav${isUpdating ? "ing..." : "e"}` */}
              Save commands
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommandForm;
