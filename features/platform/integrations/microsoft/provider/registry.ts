import type{MicrosoftProviderDescriptor}from"../contracts";
export const microsoftProviderRegistry:readonly MicrosoftProviderDescriptor[]=Object.freeze([
  {code:"microsoft_identity",label:"Microsoft Entra ID",capability:"identity",status:"active",scopes:["openid","profile","email","offline_access","User.Read"],executable:false},
  {code:"outlook",label:"Outlook Mail",capability:"outlook_mail",status:"active",scopes:["Mail.ReadWrite","Mail.Send"],executable:false},
  {code:"microsoft_calendar",label:"Outlook Calendar",capability:"outlook_calendar",status:"active",scopes:["Calendars.ReadWrite"],executable:false},
  {code:"onedrive",label:"OneDrive",capability:"onedrive",status:"active",scopes:["Files.ReadWrite"],executable:false},
  {code:"microsoft_people",label:"Microsoft People",capability:"people",status:"active",scopes:["Contacts.Read","People.Read","User.ReadBasic.All"],executable:false},
  {code:"teams",label:"Microsoft Teams",capability:"teams",status:"active",scopes:["Chat.Read","Channel.ReadBasic.All","ChannelMessage.Read.All","Presence.Read.All","Calendars.Read"],executable:false},
]);
export const microsoftProductScopes=Object.freeze(Object.fromEntries(microsoftProviderRegistry.filter(item=>item.capability!=="identity").map(item=>[item.capability,item.scopes]))as Readonly<Record<Exclude<MicrosoftProviderDescriptor["capability"],"identity">,readonly string[]>>);
