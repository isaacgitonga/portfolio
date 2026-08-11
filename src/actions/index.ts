import React from "react";
import config from "@/app.config.ts";
import {ActionError, defineAction} from "astro:actions";
import {Resend} from "resend";
import {InquirySchema} from "@/schema";
import {InquiryConfirmationEmail, InquiryEmail} from "@core/transactional";

const resend = new Resend(config.resend.apiKey);

export const server = {
  inquire: defineAction({
    input: InquirySchema,
    handler: async (input) => {
      const { data, error } = await resend.emails.send({
        from: 'Inquiry <noreply@send.isaacgitonga.com>',
        to: ['advisory@isaacgitonga.com'],
        subject: 'Service Inquiry',
        react: React.createElement(InquiryEmail, input),
      })

      if (error) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Failed to send email. Please try again.' })
      }

      await resend.emails.send({
        from: 'Isaac <noreply@send.isaacgitonga.com>',
        to: [input.workEmail],
        subject: 'Service Inquiry',
        react: React.createElement(InquiryConfirmationEmail, input)
      })

      return { success: true, data, message: 'Email sent successfully.' };
    }
  })
}