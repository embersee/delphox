"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const ValeRoot = DrawerPrimitive.Root;

const ValePortal = DrawerPrimitive.Portal;

const ValeTrigger = DrawerPrimitive.Trigger;

const ValeOverlay = DrawerPrimitive.Overlay;

const ValeContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="fixed inset-0 z-[200] bg-muted/10 backdrop-blur-sm" />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        ((className =
          "fixed bottom-0 left-0 right-0 top-0 z-[200] flex transform-gpu flex-col rounded-t-lg border bg-background p-3 md:top-auto"),
        className)
      )}
      {...props}
    >
      {props.children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));

ValeContent.displayName = DrawerPrimitive.Content.displayName;

const ValeIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto mb-8 h-1 w-32 flex-shrink-0 rounded-full bg-muted-foreground",
      className
    )}
    {...props}
  />
));

ValeIcon.displayName = "DrawerIcon";

const ValeTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

ValeTitle.displayName = DrawerPrimitive.Title.displayName;

const ValeDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

ValeDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  ValeRoot,
  ValePortal,
  ValeTrigger,
  ValeOverlay,
  ValeContent,
  ValeIcon,
  ValeTitle,
  ValeDescription,
};
