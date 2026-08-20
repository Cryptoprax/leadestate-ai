import { z } from "zod";
export const roleSchema=z.enum(["organization_admin","manager","sales","marketing","operations","finance","support","read_only"]);
export const profileSchema=z.object({name:z.string().trim().min(2).max(160),businessEmail:z.string().trim().email().max(320),phone:z.string().trim().max(40).optional(),website:z.string().trim().url().max(500).optional().or(z.literal("")),timezone:z.string().trim().min(1).max(100),locale:z.string().trim().min(2).max(20),currency:z.string().trim().length(3),address:z.object({line1:z.string().trim().max(200),line2:z.string().trim().max(200),city:z.string().trim().max(100),region:z.string().trim().max(100),postalCode:z.string().trim().max(30),country:z.string().trim().length(2)}),branding:z.object({primary:z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().or(z.literal("")),accent:z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().or(z.literal(""))})});
export const invitationSchema=z.object({name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(320),role:roleSchema});
export const idSchema=z.string().uuid();
export const transferSchema=z.object({memberId:z.string().uuid(),confirmation:z.literal("TRANSFER")});
