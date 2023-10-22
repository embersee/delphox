"use client";

import { api } from "@/trpc/react";

export default function Hello() {
  const { data } = api.hello.hello.useQuery();
  return <>client: {data?.greeting}</>;
}
