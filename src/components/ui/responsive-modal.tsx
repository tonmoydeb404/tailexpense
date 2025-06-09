import {
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
} from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import useMediaQuery from "~/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

export type ResponsiveModalProps = {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  contentProps?: DialogContentProps;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
} & DialogProps;

export function ResponsiveModal(props: ResponsiveModalProps) {
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
    ...others
  } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog {...others}>
        <DialogContent {...contentProps}>
          <DialogHeader {...headerProps}>
            {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
            {description && (
              <DialogDescription {...descriptionProps}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
          {footer && <DialogFooter {...footerProps}>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...others}>
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
