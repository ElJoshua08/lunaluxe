import { IconTooltip } from "@/components/icon-tooltip";
import { NoPaletteIcon } from "@/components/icons/no-palette";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  productCustomizationSchema,
  productCustomizationType,
} from "@/lib/schema/product";
import { colorSchema, colorType } from "@/lib/schema/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import {
  forwardRef,
  HTMLAttributes,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";

export type CustomizationRef = {
  validate: () => Promise<productCustomizationType | undefined>;
};

export const Customization = forwardRef<CustomizationRef>(({}, ref) => {
  const form = useForm<productCustomizationType>({
    resolver: zodResolver(productCustomizationSchema),
    defaultValues: {
      colors: [],
      sizes: [],
      customText: {
        maxCharacters: 100,
      },
    },
  });

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    async validate() {
      const isValid = await form.trigger();
      return isValid ? form.getValues() : undefined;
    },
  }));

    const colors = form.watch("colors");
    const sizes = form.watch("sizes");


  async function handleColorEdit(color: colorType, newColor: colorType) {
    const index = colors.findIndex((c) => c.name === color.name);
    if (index !== -1) {
      colors[index] = newColor;
      form.setValue("colors", colors);
    }

    setOpen(false);
  }

  async function handleColorDelete(color: colorType) {
    const colors = form.getValues("colors");
    const index = colors.findIndex((c) => c.name === color.name);
    if (index !== -1) {
      colors.splice(index, 1);
      form.setValue("colors", colors);
    }
    setOpen(false);
  }


  return (
    <Form {...form}>
      <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll md:flex-row md:overflow-y-hidden">
        <Card className="mb-2 flex w-1/3 flex-col">
          <CardHeader>
            <FormField
              name="colors"
              control={form.control}
              render={() => (
                <CardTitle className="inline-flex items-center gap-x-2 text-xl">
                  Colors
                  <Separator orientation="vertical" />
                  <FormDescription className="inline-block text-lg font-normal">
                    The colors your product is available in.
                  </FormDescription>
                </CardTitle>
              )}
            />
          </CardHeader>
          <Separator className="mb-2" />
          <CardContent className="flex grow flex-col items-start">
            <div className="flex h-full w-full grow flex-row flex-wrap gap-4 py-6">
              {colors.length > 0 ? (
                <ScrollArea className="w-full">
                  <div className="flex h-full flex-col items-center justify-start gap-y-4">
                    {colors.map((color, index) => (
                      <Dialog key={index} open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <div className="group flex h-12 w-full shrink-0 cursor-pointer items-center justify-start overflow-hidden rounded-lg border border-border">
                            <span
                              className="flex h-full w-12 shrink-0 items-center justify-center rounded-l-lg border-r border-border"
                              style={{ backgroundColor: color.value }}>
                              <PenIcon className="size-6 scale-0 invert transition-all ease-in-out group-hover:scale-100" />
                            </span>

                            <span className="inline-flex h-full w-full flex-row items-center justify-between gap-y-2 px-5 transition-all group-hover:bg-card group-hover:brightness-125">
                              <span className="shrink-0 text-base font-medium text-foreground/85">
                                {color.name}
                              </span>

                              <span className="text-base text-foreground/50">
                                {color.value}
                              </span>
                            </span>
                          </div>
                        </DialogTrigger>
                        <EditColor
                          color={color}
                          onColorEdit={(newColor) => handleColorEdit(color, newColor)}
                          onColorDelete={() => handleColorDelete(color)}
                        />
                      </Dialog>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-y-4">
                  <NoPaletteIcon size={256} className="text-primary aniamte-scale-in" />
                  <p className="text-2xl text-foreground/75">
                    No colors added yet
                  </p>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="useColorsInModel"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Use Colors in Model
                    </FormLabel>
                    <FormDescription>
                      Change the color of the model (if provided)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex w-full items-center justify-end">
            <AddColor
              className="w-full"
              onColorAdd={(color) =>
                form.setValue("colors", [...colors, color])
              }
            />
          </CardFooter>
        </Card>

        <Card className="mb-2 flex w-1/3 flex-col">
          <CardHeader>
            <FormField
              name="sizes"
              control={form.control}
              render={({}) => (
                <CardTitle className="inline-flex items-center gap-x-2">
                  Sizes
                  <Separator orientation="vertical" />
                  <FormMessage className="inline-block" />
                </CardTitle>
              )}
            />
          </CardHeader>
          <CardContent className="flex grow flex-col items-start">
            <div className="flex h-full grow flex-row flex-wrap gap-4 py-6">
              {sizes.length > 0 ? (
                sizes.map((size, index) => <div key={index}>{size}</div>)
              ) : (
                <p className="text-sm text-foreground/50">No sizes added yet</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="useSizesInModel"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Use Sizes in Model
                    </FormLabel>
                    <FormDescription>
                      Change the size of the model (if provided)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex w-full items-center justify-end"></CardFooter>
        </Card>
      </div>
    </Form>
  );
});

Customization.displayName = "Customization";

const AddColor = ({
  className,
  onColorAdd,
}: {
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  onColorAdd: (color: colorType) => void;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<colorType>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      value: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: colorType) {
    onColorAdd(data);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>Add Color</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Color</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form className="flex w-full flex-col gap-y-4">
            <FormField
              control={form.control}
              name={`name`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ej. Pearl Blue"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of the color, this is what will be show to
                    the user
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`value`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="inline-flex items-center gap-x-2">
                    Value{" "}
                    <IconTooltip iconClassName="inline-block text-foreground/70 size-4">
                      The value should be in a hex format (eg. #FFFFFF)
                    </IconTooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="shadow-xs relative flex rounded-md">
                      <Input
                        type="text"
                        placeholder="Ej. b9cff0"
                        className="-me-px rounded-e-none ps-6 shadow-none"
                        value={field.value.slice(1)}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const filtered = raw
                            .replace(/[^0-9a-fA-F]/g, "")
                            .slice(0, 6)
                            .toLowerCase();
                          field.onChange(`#${filtered}`);
                        }}
                      />
                      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-foreground peer-disabled:opacity-50">
                        #
                      </span>
                      <span
                        className="-z-10 inline-flex aspect-square size-9 items-center rounded-e-md border border-input px-3 text-sm text-muted-foreground"
                        style={{
                          backgroundColor: field.value || "#141414",
                        }}
                      />
                    </div>
                  </FormControl>

                  <FormDescription>
                    The value of the color, this is what will be used to set the
                    color of the product.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex-col gap-x-2 gap-y-4">
          <DialogClose asChild>
            <Button variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditColor = ({
  color,
  onColorEdit,
  onColorDelete,
}: {
  color: colorType;
  onColorEdit: (color: colorType) => void;
  onColorDelete: () => void;
}) => {
  const form = useForm<colorType>({
    resolver: zodResolver(colorSchema),
    defaultValues: color,
    mode: "onSubmit",
  });

  async function onSubmit(data: colorType) {
    onColorEdit(data);
    form.reset(data);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Color</DialogTitle>
      </DialogHeader>
      <Separator />
      <Form {...form}>
        <form className="flex w-full flex-col gap-y-4">
          <FormField
            control={form.control}
            name={`name`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ej. Pearl Blue" {...field} />
                </FormControl>
                <FormDescription>
                  The display name of the color, this is what will be show to
                  the user
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`value`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="inline-flex items-center gap-x-2">
                  Value{" "}
                  <IconTooltip iconClassName="inline-block text-foreground/70 size-4">
                    The value should be in a hex format (eg. #FFFFFF)
                  </IconTooltip>
                </FormLabel>
                <FormControl>
                  <div className="shadow-xs relative flex rounded-md">
                    <Input
                      type="text"
                      placeholder="Ej. b9cff0"
                      className="-me-px rounded-e-none ps-6 shadow-none"
                      value={field.value.slice(1)}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const filtered = raw
                          .replace(/[^0-9a-fA-F]/g, "")
                          .slice(0, 6)
                          .toLowerCase();
                        field.onChange(`#${filtered}`);
                      }}
                    />
                    <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-foreground peer-disabled:opacity-50">
                      #
                    </span>
                    <span
                      className="-z-10 inline-flex aspect-square size-9 items-center rounded-e-md border border-input px-3 text-sm text-muted-foreground"
                      style={{
                        backgroundColor: field.value || "#232323",
                      }}
                    />
                  </div>
                </FormControl>

                <FormDescription>
                  The value of the color, this is what will be used to set the
                  color of the product.
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="w-full flex-col items-center gap-x-2 gap-y-4 md:justify-between">
        <DialogClose asChild>
          <Button variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
        </DialogClose>

        <div className="flex gap-x-2">
          <DialogClose asChild>
            <Button onClick={onColorDelete} variant="destructive">
              Delete
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)}>Confirm</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};
