import { VDS_THEME_STORAGE_KEY } from "./contracts";
const script = `(function(){try{var m=localStorage.getItem('${VDS_THEME_STORAGE_KEY}')||'dark';var r=m==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):(m==='light'?'light':'dark');document.documentElement.dataset.vdsTheme=r;document.documentElement.style.colorScheme=r}catch(e){document.documentElement.dataset.vdsTheme='dark'}})()`;
export function ThemeBootstrap() { return <script dangerouslySetInnerHTML={{ __html: script }}/> }
