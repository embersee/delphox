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
import { Textarea } from "../ui/textarea";
import { commandSchema } from "@/lib/db/schema/command";

import { useAutoAnimate } from "@formkit/auto-animate/react";

const validationSchema = z.object({
  commands: z.array(
    z.object({
      id: z.string().optional(),
      command: z.string().min(1).max(32).startsWith("/"),
      content: z.string().min(1).max(4096),
      botId: z.string(),
    })
  ),
});

type Command = z.infer<typeof validationSchema>["commands"][number];

type UpdateCommand = z.infer<typeof commandSchema>;

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      // raw: true,
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

  const [animationParent] = useAutoAnimate();

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
    utils.bots.getBotsWithCommands.invalidate();

    if (action == "delete")
      return toast({
        title: "Success 👏",
        description: `Command ${action}d!`,
        variant: "default",
      });

    setIsOpen(false);
    toast({
      title: "Success 👏",
      description: `Command ${action}d!`,
      variant: "default",
    });

    router.push("/dash");
  };

  const onError = (msg: string) => {
    utils.bots.getBotsWithCommands.invalidate();

    setIsOpen(true);
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: createCommand, isLoading: isCreating } =
    trpc.commands.createCommand.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (error) => onError(error.message),
    });

  const { mutate: updateCommand, isLoading: isUpdating } =
    trpc.commands.updateCommand.useMutation({
      onSuccess: () => onSuccess("update"),
      onError: (error) => onError(error.message),
    });

  const { mutate: deleteCommand, isLoading: isDeleting } =
    trpc.commands.deleteCommand.useMutation({
      onSuccess: () => onSuccess("delete"),
      onError: (error) => onError(error.message),
    });

  const handleSubmit = (values: { commands: Command[] }) => {
    values.commands.forEach((c) => {
      switch (c.id) {
        case "":
          console.log("create: ", c);
          createCommand(c);

          break;

        default:
          console.log("update: ", c);
          if (c.id !== undefined) {
            updateCommand(c as UpdateCommand);
          }

          break;
      }
    });
  };

  const removeCommand = (index: number, id?: string) => {
    if (id !== undefined) {
      remove(index);
      deleteCommand({ id });
      return;
    }

    remove(index);
  };
  return (
    <Form {...form}>
      <form
        ref={animationParent}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 grow flex flex-col"
        autoComplete="off"
      >
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name={`commands.${index}.command` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Command name: </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[250px]"
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
                      <Textarea
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

              {commands.at(index)?.id ? (
                <Button
                  type="button"
                  variant="destructive"
                  className="self-center mt-2"
                  onClick={() => removeCommand(index, commands.at(index)?.id)}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  type="button"
                  className="self-center mt-2"
                  onClick={() => removeCommand(index, commands.at(index)?.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          );
        })}

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              id: "",
              command: "",
              content: "",
              botId: botId,
            })
          }
        >
          Create new command
        </Button>

        <div className="grow"></div>

        <div className=" py-4 pr-4 border-t-2 border-dashed flex items-center justify-end space-x-4">
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
            <span>{`Sav${
              isUpdating || isCreating ? "ing..." : "e"
            } commands`}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommandForm;
