"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

import { usePathname, useRouter } from "next/navigation";

import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export default function Comment({
  threadId,
  currentUserImg,
  currentUserId,
}: Props) {
  const router = useRouter();

  const pathname = usePathname();
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    try {
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );

      form.reset();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}
