import {
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
} from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import useMediaQuery from "~/hooks/use-media-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

export type ResponsiveAlertProps = {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  contentProps?: DialogContentProps;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
} & DialogProps;

export function ResponsiveAlert(props: ResponsiveAlertProps) {
  const {
    description,
    title,
    children,
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
      <AlertDialog {...others}>
        <AlertDialogContent {...contentProps}>
          <AlertDialogHeader {...headerProps}>
            {title && (
              <AlertDialogTitle {...titleProps}>{title}</AlertDialogTitle>
            )}
            {descriptionProps && (
              <AlertDialogDescription {...descriptionProps}>
                {description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter {...footerProps}>{children}</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
        <DrawerFooter {...footerProps}>{children}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
