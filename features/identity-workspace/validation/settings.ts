import { z } from "zod";
export const profileSettingsSchema=z.object({name:z.string().trim().min(2).max(100),timezone:z.string().min(3).max(100),language:z.string().min(2).max(10),country:z.string().length(2),phone:z.string().trim().max(30),jobTitle:z.string().trim().max(100),department:z.string().trim().max(100)});
export const invitationSchema=z.object({name:z.string().trim().min(2).max(100),email:z.email(),role:z.enum(["organization_admin","branch_manager","sales_manager","agent","viewer"])});

