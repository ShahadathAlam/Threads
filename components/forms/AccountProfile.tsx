"use client";
import React, { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };

  btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  // const { startUpload } = useUploadThing("media");

  const { startUpload, routeConfig } = useUploadThing("media", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      // alert("error occurred while uploading");
    },
    onUploadBegin: ({ file }: any) => {
      console.log("upload has begun for", file);
    },
  });
  const router = useRouter();

  const pathname = usePathname();
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",

      bio: user?.bio || "",
    },
  });

  // const handleImage = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   fieldChange: (value: string) => void
  // ) => {
  //   e.preventDefault();

  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFiles = Array.from(e.target.files);
  //     console.log("Selected files:", selectedFiles);

  //     setFiles(selectedFiles); // Update files state
  //     const fileReader = new FileReader();

  //     fileReader.onload = (event) => {
  //       const imageDataUrl = event.target?.result?.toString() || "";
  //       fieldChange(imageDataUrl);
  //     };

  //     fileReader.readAsDataURL(selectedFiles[0]); // Read the first file
  //   }
  // };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log("onSubmit triggered with values:", values);

    try {
      const blob = values.profile_photo;
      const hasImageChanged = isBase64Image(blob);

      if (hasImageChanged) {
        console.log("Image has changed. Files:", files);

        // Ensure files array is not empty
        if (files.length === 0) {
          alert("No files selected for upload.");
          return;
        }
        console.log("Files passed to startUpload:", files);
        // Attempt to upload files
        const imgRes = await startUpload(files);
        console.log("Upload response:", imgRes);

        // Validate upload response
        if (!imgRes || imgRes.length === 0 || !imgRes[0]?.url) {
          console.error(
            "Image upload failed or returned an invalid response:",
            imgRes
          );
          // alert("Failed to upload the image. Please try again.");
          return;
        }

        // Update profile photo with the uploaded image URL
        values.profile_photo = imgRes[0].url;
      }

      // Update the user information
      await updateUser({
        userId: user.id,
        username: values.username,
        name: values.name,
        bio: values.bio,
        image: values.profile_photo,
        path: pathname,
      });

      console.log("User updated successfully");
      if (pathname === "/profile/edit") {
        router.back();
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      // alert("An error occurred. Please try again.");
    }
  }

  // async function onSubmit(values: z.infer<typeof UserValidation>) {
  //   console.log("onSubmit triggered with values:", values);
  //   try {
  //     const blob = values.profile_photo;
  //     const hasImageChanged = isBase64Image(blob);

  //     if (hasImageChanged) {
  //       if (files.length > 0) {
  //         console.log("Start upload with:", files);
  //         const imgRes = await startUpload(files);
  //         if (!imgRes || !imgRes[0]?.url) {
  //           alert("Failed to upload the image. Please try again.");
  //           // return;
  //         }
  //         values.profile_photo = imgRes[0].url;
  //       } else {
  //         alert("No files selected for upload.");
  //       }

  //       // console.log("Files before upload:", files);
  //       // const imgRes = await startUpload(files);
  //       // console.log("Upload response:", imgRes);

  //       // if (!imgRes || !imgRes[0]?.url) {
  //       //   alert("Failed to upload the image. Please try again.");
  //       //   return;
  //       // }

  //       // values.profile_photo = imgRes[0].url;
  //     }

  //     await updateUser({
  //       userId: user.id,
  //       username: values.username,
  //       name: values.name,
  //       bio: values.bio,
  //       image: values.profile_photo,
  //       path: pathname,
  //     });

  //     console.log("User updated successfully");
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Error in onSubmit:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // }

  // async function onSubmit(values: z.infer<typeof UserValidation>) {
  //   const blob = values.profile_photo;

  //   const hasImageChanged = isBase64Image(blob);

  //   if (hasImageChanged) {
  //     const imgRes = await startUpload(files);
  //     if (!imgRes || !imgRes[0]?.url) {
  //       console.error("Image upload failed");
  //       return;
  //     }

  //     if (imgRes && imgRes[0]?.url) {
  //       values.profile_photo = imgRes[0].url; // Use 'url' instead of 'fileUrl'
  //     }
  //   }

  //   // TODO: Update user profile
  //   try {
  //     await updateUser({
  //       userId: user.id,
  //       username: values.username,
  //       name: values.name,
  //       bio: values.bio,
  //       image: values.profile_photo,
  //       path: pathname,
  //     });
  //     console.log("User updated successfully");

  //     if (pathname === "/profile/edit") {
  //       router.back();
  //     } else {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     alert("Failed to update profile. Please try again.");
  //   }

  //   // await updateUser({
  //   //   userId: user.id,
  //   //   username: values.username,
  //   //   name: values.name,
  //   //   bio: values.bio,
  //   //   image: values.profile_photo,
  //   //   path: pathname,
  //   // });

  //   // if (pathname === "/profile/edit") {
  //   //   router.back();
  //   // } else {
  //   //   router.push("/");
  //   // }
  // }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
}
