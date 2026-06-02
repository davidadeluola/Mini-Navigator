import React from "react";
import { PlusIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const Create = () => {
  return (
    <div className="">
      <div className="">
        <h1 className="text-4xl font-extrabold tracking-light sm:text-2xl">
          Create New Item
        </h1>
        <p className="text-muted-foreground text-sm text-center pt-4">
          Craft your Idea...{" "}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            Create a new blog article for your audience.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form></form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
