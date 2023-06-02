(()=>{var e={116:function(e,t){"use strict";var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},n.apply(this,arguments)};function o(e,t){if(!t)return"";var n="; "+e;return!0===t?n:n+"="+t}function r(e,t,n){return encodeURIComponent(e).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/\(/g,"%28").replace(/\)/g,"%29")+"="+encodeURIComponent(t).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)+function(e){if("number"==typeof e.expires){var t=new Date;t.setMilliseconds(t.getMilliseconds()+864e5*e.expires),e.expires=t}return o("Expires",e.expires?e.expires.toUTCString():"")+o("Domain",e.domain)+o("Path",e.path)+o("Secure",e.secure)+o("SameSite",e.sameSite)}(n)}function a(e){for(var t={},n=e?e.split("; "):[],o=/(%[\dA-F]{2})+/gi,r=0;r<n.length;r++){var a=n[r].split("="),i=a.slice(1).join("=");'"'===i.charAt(0)&&(i=i.slice(1,-1));try{t[a[0].replace(o,decodeURIComponent)]=i.replace(o,decodeURIComponent)}catch(e){}}return t}function i(){return a(document.cookie)}function s(e,t,o){document.cookie=r(e,t,n({path:"/"},o))}t.__esModule=!0,t.encode=r,t.parse=a,t.getAll=i,t.get=function(e){return i()[e]},t.set=s,t.remove=function(e,t){s(e,"",n(n({},t),{expires:-1}))}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{"use strict";n.r(o),n.d(o,{Themes:()=>a,setSelectedTheme:()=>e});var e={};n.r(e),n.d(e,{default:()=>p,getUrls:()=>v,setStyle:()=>_,setTheme:()=>g,setThemeFromID:()=>y});const t=flarum.core.compat["common/app"];var r=n.n(t);const a={AUTO:0,LIGHT:1,DARK:2,DEFAULT:function(){return r().forum.attribute("fof-nightmode.default_theme")||0}},i=flarum.core.compat["common/extend"],s=flarum.core.compat["common/components/Page"];var c=n.n(s),d=n(116),l="flarum_nightmode",m=function(){var e=d.get(l);return e||"0"===e?Number(e):a.DEFAULT()};function f(){var e=Array.from(new Set(Object.values(a))),t=m();isNaN(t)?u("Theme is not a valid integer! Resetting..."):e.includes(t)||u("Theme is out of bounds! Resetting...")}function u(e){var t;console.warn(e),t=a.DEFAULT(),d.set(l,t,{sameSite:"lax",secure:"https:"===location.protocol})}function h(){var e,t=r().session.user,n=!t||!!t.preferences().fofNightMode_perDevice,o=t&&t.preferences().fofNightMode;return n?e=m():"number"==typeof o&&-1!==o&&(e=o),"number"==typeof e?e:a.DEFAULT()}const p=function(){(0,i.extend)(c().prototype,"oninit",g),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",g)};function g(){var e,t=r().session.user,n=null==(e=r().session.user)?void 0:e.preferences().fofNightMode_perDevice;t&&!n||f(),n&&f(),y(h())}function v(){return{day:r().data["fof-nightmode.assets.day"],night:r().data["fof-nightmode.assets.night"]}}function y(e){e===a.DARK?_("night"):e===a.LIGHT?_("day"):_(window.matchMedia("(prefers-color-scheme: dark)").matches?"night":"day")}function _(e){var t=document.querySelector("link.nightmode-light[rel=stylesheet]"),n=document.querySelector("link.nightmode-dark[rel=stylesheet]");e:if(t&&n){if(h()===a.AUTO)break e;var o=document.createElement("link");"onload"in o?o.onload=function(){t.remove(),n.remove()}:(t.remove(),n.remove()),o.rel="stylesheet",o.className="nightmode",o.href=v()[e],document.head.append(o)}else{var r=t||n||document.querySelector("link.nightmode[rel=stylesheet]"),i=v()[e];i!==r.href&&(r.href=i,r.className="nightmode")}var s=new CustomEvent("fofnightmodechange",{detail:e});document.dispatchEvent(s)}const b=flarum.core.compat["admin/app"];var S=n.n(b);S().initializers.add("fof-nightmode",(function(){var e;S().extensionData.for("fof-nightmode").registerSetting({label:S().translator.trans("fof-nightmode.admin.settings.modal.always_show_theme_toggle_on_header"),setting:"fofNightMode.show_theme_toggle_on_header_always",type:"switch"}).registerSetting({label:S().translator.trans("fof-nightmode.admin.settings.modal.default_theme"),setting:"fof-nightmode.default_theme",type:"select",options:(e={},Object.keys(a).forEach((function(t,n){"DEFAULT"!==t&&(e[n]=S().translator.trans("fof-nightmode.admin.settings.modal.theme_"+t.toLowerCase()))})),e)}).registerSetting({label:S().translator.trans("fof-nightmode.admin.settings.modal.default_theme_helper"),type:"hidden"}),p()}))})(),module.exports=o})();
//# sourceMappingURL=admin.js.map