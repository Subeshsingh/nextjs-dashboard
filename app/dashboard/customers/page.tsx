import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function page() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <div>Customers Page</div>;
}
