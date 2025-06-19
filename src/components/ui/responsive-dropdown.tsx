import {
  DialogDescriptionProps,
  DialogTitleProps,
} from "@radix-ui/react-dialog";
import {
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";
import useMediaQuery from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export type OptionType = "Label" | "Separator" | "Item";

export interface Option {
  label: string;
  type: OptionType;
  props?: any; // props to spread onto the component
}

export type ResponsiveDropdownProps = {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;

  /** instead of children you can pass a list of options */
  options: Option[];

  contentProps?: DropdownMenuContentProps;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
  triggerProps?: DropdownMenuTriggerProps;
} & DropdownMenuProps;

export function ResponsiveDropdown(props: ResponsiveDropdownProps) {
  const {
    title,
    description,
    footer,
    trigger,
    triggerProps,
    headerProps,
    titleProps,
    descriptionProps,
    footerProps,
    contentProps,
    options,
    ...menuProps
  } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const renderDesktopOptions = () =>
    options?.map((opt, idx) => {
      switch (opt.type) {
        case "Label":
          return (
            <DropdownMenuLabel key={idx} {...opt.props}>
              {opt.label}
            </DropdownMenuLabel>
          );
        case "Separator":
          return <DropdownMenuSeparator key={idx} {...opt.props} />;
        case "Item":
          return (
            <DropdownMenuItem key={idx} {...opt.props}>
              {opt.label}
            </DropdownMenuItem>
          );
      }
    });

  const renderMobileOptions = () =>
    options?.map((opt, idx) => {
      switch (opt.type) {
        case "Label":
          return (
            <div
              key={idx}
              {...opt.props}
              className={cn(
                "text-sm opacity-60 text-center",
                opt.props?.className
              )}
            >
              {opt.label}
            </div>
          );
        case "Separator":
          return null;
        case "Item":
          return (
            <Button
              variant={"outline"}
              key={idx}
              type="button"
              {...opt.props}
              className={cn("w-full", opt.props?.className)}
            >
              {opt.label}
            </Button>
          );
      }
    });

  if (isDesktop) {
    return (
      <DropdownMenu {...menuProps}>
        {trigger && (
          <DropdownMenuTrigger {...triggerProps}>{trigger}</DropdownMenuTrigger>
        )}
        <DropdownMenuContent {...contentProps}>
          {renderDesktopOptions()}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer {...menuProps}>
      {trigger && <DrawerTrigger {...triggerProps}>{trigger}</DrawerTrigger>}
      <DrawerContent {...contentProps}>
        <DrawerHeader {...headerProps}>
          {title && <DrawerTitle {...titleProps}>{title}</DrawerTitle>}
          {description && (
            <DrawerDescription {...descriptionProps}>
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-2">{renderMobileOptions()}</div>

        {footer && <DrawerFooter {...footerProps}>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
