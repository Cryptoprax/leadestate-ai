"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BillingService } from "../services/billing.service";
import { SubscriptionService } from "../services/subscription.service";
import { billingContactSchema, cancelSchema, changePlanSchema } from "../validation";
const value=(form:FormData,key:string)=>String(form.get(key)??"");
function fail(path:string,reason:unknown):never{redirect(`${path}?error=${encodeURIComponent(reason instanceof Error?reason.message:String(reason))}`)}
export async function changePlanAction(form:FormData){const parsed=changePlanSchema.safeParse({planCode:value(form,"planCode"),seatQuantity:value(form,"seatQuantity"),expectedVersion:value(form,"expectedVersion")});if(!parsed.success)fail("/vayon/settings/subscription",parsed.error.issues[0]?.message);try{await new SubscriptionService().change(parsed.data.planCode,parsed.data.seatQuantity,parsed.data.expectedVersion);revalidatePath("/vayon/settings/subscription")}catch(reason){fail("/vayon/settings/subscription",reason)}}
export async function cancelSubscriptionAction(form:FormData){const parsed=cancelSchema.safeParse({expectedVersion:value(form,"expectedVersion")});if(!parsed.success)fail("/vayon/settings/subscription",parsed.error.issues[0]?.message);try{await new SubscriptionService().cancel(parsed.data.expectedVersion);revalidatePath("/vayon/settings/subscription")}catch(reason){fail("/vayon/settings/subscription",reason)}}
export async function reactivateSubscriptionAction(form:FormData){const parsed=cancelSchema.safeParse({expectedVersion:value(form,"expectedVersion")});if(!parsed.success)fail("/vayon/settings/subscription",parsed.error.issues[0]?.message);try{await new SubscriptionService().reactivate(parsed.data.expectedVersion);revalidatePath("/vayon/settings/subscription")}catch(reason){fail("/vayon/settings/subscription",reason)}}
export async function updateBillingContactAction(form:FormData){const parsed=billingContactSchema.safeParse({companyName:value(form,"companyName"),billingEmail:value(form,"billingEmail"),taxId:value(form,"taxId")||undefined});if(!parsed.success)fail("/vayon/settings/billing",parsed.error.issues[0]?.message);try{await new BillingService().updateContact(parsed.data);revalidatePath("/vayon/settings/billing")}catch(reason){fail("/vayon/settings/billing",reason)}}
