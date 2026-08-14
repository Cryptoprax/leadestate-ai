"use server";import{headers}from"next/headers";import{redirect}from"next/navigation";import{forgotPasswordSchema,loginSchema,resetPasswordSchema,signUpSchema}from"../validation/auth";import{AuthenticationService}from"../services/authentication.service";function value(form:FormData,key:string){return String(form.get(key)??"")}function fail(path:string,message:string):never{redirect(`${path}?error=${encodeURIComponent(message)}`)}async function origin(){const h=await headers();return h.get("origin")??process.env.NEXT_PUBLIC_APP_URL??"http://localhost:3000"}export async function signUpAction(form:FormData){const parsed=signUpSchema.safeParse({name:value(form,"name"),email:value(form,"email"),password:value(form,"password")});if(!parsed.success)fail("/signup",parsed.error.issues[0]?.message??"Invalid sign up.");const{error}=await new AuthenticationService().signUp(parsed.data.name,parsed.data.email,parsed.data.password,await origin());if(error)fail("/signup",error.message);redirect("/verify-email")}export async function loginAction(form:FormData){const parsed=loginSchema.safeParse({email:value(form,"email"),password:value(form,"password")});if(!parsed.success)fail("/login",parsed.error.issues[0]?.message??"Invalid credentials.");const{error}=await new AuthenticationService().login(parsed.data.email,parsed.data.password);if(error)fail("/login","Unable to sign in. Check your credentials.");redirect("/vayon")}export async function googleLoginAction() {
  console.log("=== GOOGLE LOGIN ACTION CALLED ===");

  const appOrigin = await origin();
  console.log("Origin:", appOrigin);

  const { data, error } = await new AuthenticationService().googleLogin(appOrigin);

  console.log("OAuth result:", { data, error });

  if (error || !data?.url) {
    console.error("OAuth failed:", error);
    fail("/login", "Unable to start Google sign in.");
  }

  redirect(data.url);
}export async function forgotPasswordAction(form:FormData){const parsed=forgotPasswordSchema.safeParse({email:value(form,"email")});if(!parsed.success)fail("/forgot-password",parsed.error.issues[0]?.message??"Invalid email.");await new AuthenticationService().sendReset(parsed.data.email,await origin());redirect("/forgot-password?success=If%20the%20account%20exists%2C%20a%20reset%20link%20has%20been%20sent.")}export async function resetPasswordAction(form:FormData){const parsed=resetPasswordSchema.safeParse({password:value(form,"password"),confirmPassword:value(form,"confirmPassword")});if(!parsed.success)fail("/reset-password",parsed.error.issues[0]?.message??"Invalid password.");const{error}=await new AuthenticationService().resetPassword(parsed.data.password);if(error)fail("/reset-password",error.message);redirect("/login?success=Password%20updated.")}export async function logoutAction(){await new AuthenticationService().logout();redirect("/login")}
