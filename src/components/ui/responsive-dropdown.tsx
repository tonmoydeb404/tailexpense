import {
  DialogDescriptionProps,
  DialogTitleProps,
} from "@radix-ui/react-dialog";
import {
  DropdownMenuContentProps,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuProps,
  DropdownMenuSeparator,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";
import useMediaQuery from "~/hooks/use-media-query";
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
  options?: Option[];

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
    children,
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
              className={
                // preserve any passed-in className
                `px-4 pt-4 pb-2 text-sm font-medium ${
                  opt.props?.className || ""
                }`
              }
            >
              {opt.label}
            </div>
          );
        case "Separator":
          return <hr key={idx} {...opt.props} />;
        case "Item":
          return (
            <button
              key={idx}
              type="button"
              {...opt.props}
              className={`w-full text-left px-4 py-2 text-base ${
                opt.props?.className || ""
              }`}
            >
              {opt.label}
            </button>
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
          {options ? renderDesktopOptions() : children}
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

        <div className="px-4 pb-6">
          {options ? renderMobileOptions() : children}
        </div>

        {footer && <DrawerFooter {...footerProps}>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
