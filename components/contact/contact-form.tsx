"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { contactFormSchema, ContactFormValues } from "@/validators/contact";
import { back004Sound } from "@/sounds/back-004";
import { useSound } from "@/hooks/use-sound";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "../ui/button";

export function ContactForm() {
  const [playError] = useSound(back004Sound);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      toast.add({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        type: "error"
      });
      playError();
      return;
    }

    startTransition(async () => {
      const device = navigator.userAgent || "Unknown";

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            device
          })
        });

        const data = await response.json();

        if (data.success) {
          toast.add({
            title: "Success!",
            description: data.message || "Your message has been sent.",
            type: "success"
          });
          setFormData({ name: "", email: "", message: "" });
        } else {
          toast.add({
            title: "Error",
            description:
              typeof data.error === "string"
                ? data.error
                : "Failed to send message.",
            type: "error"
          });
        }
      } catch {
        toast.add({
          title: "Error",
          description: "Something went wrong. Please try again.",
          type: "error"
        });
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="">
        <h3 className="text-xl font-normal">Send me a message</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-muted-primary">
          Your Name *
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-primary">
          Your Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-muted-primary">
          Message *
        </Label>
        <Textarea
          id="message"
          name="message"
          className="max-h-25 resize-none"
          placeholder="Briefly describe your project or inquiry..."
          value={formData.message}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer py-2"
        disabled={isPending}>
        <div className="flex items-center justify-center gap-2">
          {isPending && <Spinner />}

          {isPending ? "Sending..." : "Send Message"}
        </div>
      </Button>
    </form>
  );
}
