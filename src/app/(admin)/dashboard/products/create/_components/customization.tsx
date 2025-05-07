import { IconTooltip } from "@/components/icon-tooltip";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  productCustomizationSchema,
  productCustomizationType,
} from "@/lib/schema/product";
import { colorSchema, colorType } from "@/lib/schema/util";
import { zodResolver } from "@hookform/resolvers/zod";
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

  useImperativeHandle(ref, () => ({
    async validate() {
      const isValid = await form.trigger();
      return isValid ? form.getValues() : undefined;
    },
  }));

  const colors = form.watch("colors");
  const sizes = form.watch("sizes");

  return (
    <Form {...form}>
      <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll md:flex-row md:overflow-y-hidden">
        <Card className="mb-2 flex w-1/3 flex-col">
          <CardHeader>
            <FormField
              name="colors"
              control={form.control}
              render={({}) => (
                <CardTitle className="inline-flex items-center gap-x-2 text-lg">
                  Colors
                  <Separator orientation="vertical" />
                  <FormMessage className="inline-block" />
                </CardTitle>
              )}
            />
          </CardHeader>
          <Separator className="" />
          <CardContent className="flex grow flex-col items-start">
            <div className="flex h-full w-full grow flex-row flex-wrap gap-4 py-6">
              {colors.length > 0 ? (
                colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: color.value || "#232323" }}
                  />
                ))
              ) : (
                <div className="flex w-full items-center justify-center">
                  <p className="text-lg text-foreground/75">
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
                    <Input type="text" placeholder="Ej. #b9cff0 " {...field} />
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
