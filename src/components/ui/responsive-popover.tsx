import {
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
} from "@radix-ui/react-dialog";
import { PopoverTriggerProps } from "@radix-ui/react-popover";
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
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type ResponsivePopoverProps = {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  trigger?: ReactNode;

  contentProps?: DialogContentProps;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
  triggerProps?: PopoverTriggerProps;
} & DialogProps;

export function ResponsivePopover(props: ResponsivePopoverProps) {
  const {
    description,
    title,
    children,
    footer,
    contentProps,
    descriptionProps,
    footerProps,
    headerProps,
    titleProps,
    trigger,
    triggerProps,
    ...others
  } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover {...others}>
        {trigger && (
          <PopoverTrigger {...triggerProps}>{trigger}</PopoverTrigger>
        )}
        <PopoverContent {...contentProps}>{children}</PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer {...others}>
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
        <div className="px-4 pb-6">{children}</div>
        {footer && <DrawerFooter {...footerProps}>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}

export function ResponsivePopoverTrigger() {}
