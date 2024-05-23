(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{8567:function(e,t,s){Promise.resolve().then(s.bind(s,6522))},2310:function(e,t){"use strict";t.Z={apiKey:"AIzaSyDjnFrNhs940hViU6K7iGrWw99hCUnD78Y",authDomain:"fiercedev-next.firebaseapp.com",projectId:"fiercedev-next",storageBucket:"fiercedev-next.appspot.com",messagingSenderId:"779969971905",appId:"1:779969971905:web:0f916e9ab4b3cd8425b640",measurementId:"G-BMHYSSP91Q"}},6463:function(e,t,s){"use strict";var a=s(1169);s.o(a,"usePathname")&&s.d(t,{usePathname:function(){return a.usePathname}}),s.o(a,"useRouter")&&s.d(t,{useRouter:function(){return a.useRouter}})},6522:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return m}});var a=s(7437),l=s(6463),r=s(2265),i=e=>{let{currentActiveStep:t,totalSteps:s,stepHeadings:l}=e;return(0,a.jsxs)("div",{className:"relative mx-auto flex  w-full max-w-[1024px]  items-center justify-between",children:[(0,a.jsx)("div",{id:"progress",className:"absolute top-[12px] z-1 h-[2px] w-full max-w-[1024px] bg-[#DCDCDC]"}),[...Array(s)].map((e,s)=>{var r,i;return(0,a.jsxs)("div",{className:"relative ",children:[(0,a.jsx)("div",{className:"relative z-10 h-[24px] w-[24px]  rounded-full ".concat(t>=s+1?"bg-blue":t===s+1?"bg-blue":"bg-[#E4E7EC]"," "),children:t>s+1?(0,a.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"red",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M17.0965 7.38967L9.9365 14.2997L8.0365 12.2697C7.6865 11.9397 7.1365 11.9197 6.7365 12.1997C6.3465 12.4897 6.2365 12.9997 6.4765 13.4097L8.7265 17.0697C8.9465 17.4097 9.3265 17.6197 9.7565 17.6197C10.1665 17.6197 10.5565 17.4097 10.7765 17.0697C11.1365 16.5997 18.0065 8.40967 18.0065 8.40967C18.9065 7.48967 17.8165 6.67967 17.0965 7.37967V7.38967Z",fill:"white"})}):t===s+1?(0,a.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("rect",{width:"24",height:"24",rx:"12",fill:"#131E42"}),(0,a.jsx)("circle",{cx:"12",cy:"12",r:"4",fill:"white"})]}):(0,a.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("circle",{cx:"12",cy:"12",r:"4",fill:"white"})})}),(0,a.jsxs)("div",{className:"absolute left-1/2 top-[100%] mt-[12px] flex w-auto  max-w-[240px] -translate-x-1/2 flex-col items-center justify-start",children:[(0,a.jsx)("p",{className:"text-nowrap text-[14px] font-medium leading-[20px] text-[#344054]",children:null===(r=l[s])||void 0===r?void 0:r.heading}),(0,a.jsx)("p",{className:"text-nowrap text-[14px] font-normal leading-[20px] text-[#667085]",children:null===(i=l[s])||void 0===i?void 0:i.details})]})]},s)})]})},n=s(277),o=s(7138),d=s(2310),x=s(5236),c=s(5735);let p=(0,x.ZF)(d.Z),u=(0,c.v0)(p),h=[{heading:"Your details",details:"Name and email"},{heading:"Choose a password",details:"Choose a secure password"},{heading:"Become an admin",details:"Start management"},{heading:"Control student’s forms",details:"Easy access"}];var m=()=>{let e=(0,l.useRouter)(),[t,s]=(0,r.useState)({name:"",email:"",password:"",confirmPassword:""}),[d,x]=(0,r.useState)({name:"",email:"",password:"",confirmPassword:""}),[p,m]=(0,r.useState)(1),[f,w]=(0,r.useState)(!1),[g,j]=(0,r.useState)(!1),C=(e,a)=>{s({...t,[a]:e}),x({...d,[a]:""})},v=()=>{let e={};return 1===p&&(t.name.trim()||(e.name="Name is required"),t.email.trim()?/^\S+@\S+\.\S+$/.test(t.email)||(e.email="Invalid email format"):e.email="Email is required",x(e)),2===p&&(t.password.length<8&&(e.password="Password must be at least 8 characters long"),t.password!==t.confirmPassword&&(e.confirmPassword="Passwords do not match"),x(e)),0===Object.keys(e).length},b=async()=>{if(v())try{let s=(await (0,c.Xb)(u,t.email,t.password)).user,a=await s.getIdToken();console.log("token_______",a),(0,n.setCookie)(null,"token",a,{path:"/"}),e.push("/")}catch(t){let e=t.code;console.error("ERROR SIGNING UP:",e,t.message),"auth/email-already-in-use"===e&&alert("The email address is already in use. Please try signing in instead.")}},F=(0,n.parseCookies)().token;return(0,r.useEffect)(()=>{F||(window.location.href="/signin")},[F]),(0,a.jsx)("div",{className:"flex h-full w-full items-center justify-center bg-[#F2F4F7] p-[40px]  pb-[100px] pt-[200px]",children:(0,a.jsxs)("div",{className:" flex w-full flex-col items-center justify-start gap-[100px]",children:[1===p&&(0,a.jsxs)("div",{className:"mx-auto flex w-full flex-col items-center justify-start gap-[54px]",children:[(0,a.jsx)("h5",{className:"text-center text-[36px] font-semibold text-[#4F4F4F]",children:"Welcome, create your Saga Admin account"}),(0,a.jsx)("div",{className:"mx-auto flex min-h-[382px] w-full max-w-[512px] items-start  justify-center bg-white py-[72px] ",children:(0,a.jsxs)("div",{className:"flex w-full max-w-[248px] flex-col items-center justify-start gap-[14px]",children:[(0,a.jsx)("p",{className:"text=[#667085] text-center text-[16px] font-medium leading-[25px]",children:"It is our great pleasure to have you on board!"}),(0,a.jsxs)("div",{className:"flex w-full flex-col items-start justify-start gap-4",children:[(0,a.jsx)("input",{className:"w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"text",name:"name",id:"name",placeholder:"Enter the name of player",value:null==t?void 0:t.name,onChange:e=>C(e.target.value,"name")}),d.name&&(0,a.jsx)("p",{className:" text-[14px] text-red ",children:null==d?void 0:d.name})]}),(0,a.jsxs)("div",{className:"flex w-full flex-col items-start justify-start gap-4",children:[(0,a.jsx)("input",{className:"w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"email",name:"email",id:"email",placeholder:"Your email",value:null==t?void 0:t.email,onChange:e=>C(e.target.value,"email")}),d.email&&(0,a.jsx)("p",{className:" text-[14px] text-red ",children:null==d?void 0:d.email})]}),(0,a.jsx)("button",{className:"w-full rounded bg-blue px-4 py-3 text-[14px] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue",type:"button",onClick:()=>{v()&&m(p+1)},children:"next"}),(0,a.jsxs)("div",{className:"flex w-full items-center justify-center gap-1",children:[(0,a.jsx)("p",{className:"text-[12px] font-bold leading-[24px] text-[#667085] ",children:"Already have an account?"}),(0,a.jsx)(o.default,{href:"/signin",className:"text-[12px] font-bold leading-[24px] text-blue ",children:"Sign in"})]})]})})]}),2===p&&(0,a.jsxs)("div",{className:"mx-auto flex w-full max-w-[741px] flex-col items-center justify-start gap-[54px]",children:[(0,a.jsx)("h5",{className:"text-center text-[36px] font-semibold text-[#4F4F4F]",children:"Saga Scholarships, Choose your password"}),(0,a.jsx)("div",{className:"mx-auto flex min-h-[382px] w-full max-w-[512px] items-start  justify-center bg-white py-[50px] ",children:(0,a.jsxs)("div",{className:"flex w-full max-w-[248px] flex-col items-center justify-start gap-[14px]",children:[(0,a.jsxs)("div",{className:"flex w-full flex-col items-start justify-start gap-1",children:[(0,a.jsx)("label",{className:"text-[14px] font-medium text-[#8A8A8A]",children:"Password"}),(0,a.jsxs)("div",{className:" flex w-full flex-col items-start justify-start gap-4",children:[(0,a.jsxs)("div",{className:"relative  w-full ",children:[(0,a.jsx)("input",{className:"w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:f?"text":"password",name:"password",id:"password",placeholder:"Enter your password",value:null==t?void 0:t.password,onChange:e=>C(e.target.value,"password")}),(0,a.jsx)("span",{className:"absolute right-3 top-1/2 -translate-y-1/2",onClick:()=>w(!f),children:f?(0,a.jsxs)("svg",{width:"18px",height:"18px",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("g",{id:"SVGRepo_bgCarrier","stroke-width":"0"}),(0,a.jsx)("g",{id:"SVGRepo_tracerCarrier","stroke-linecap":"round","stroke-linejoin":"round"}),(0,a.jsxs)("g",{id:"SVGRepo_iconCarrier",children:[" ",(0,a.jsx)("path",{d:"M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z",stroke:"#4F4F4F","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})," ",(0,a.jsx)("path",{d:"M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z",stroke:"#4F4F4F","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})," "]})]}):(0,a.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsxs)("g",{"clip-path":"url(#clip0_0_2252)",children:[(0,a.jsx)("path",{d:"M12.5948 10.2003C12.7384 9.81659 12.8113 9.41002 12.8098 9.00031C12.8098 8.09062 12.4485 7.21819 11.8052 6.57494C11.162 5.93169 10.2895 5.57031 9.37982 5.57031C8.97517 5.57079 8.57385 5.6436 8.19482 5.78531L8.99982 6.61531C9.12219 6.59573 9.2459 6.5857 9.36982 6.58531C10.013 6.58397 10.6307 6.83718 11.0878 7.28966C11.545 7.74214 11.8045 8.35712 11.8098 9.00031C11.8094 9.12424 11.7994 9.24794 11.7798 9.37031L12.5948 10.2003Z",fill:"#4F4F4F"}),(0,a.jsx)("path",{d:"M17.1452 8.76465C15.4602 5.64965 12.5052 3.76465 9.23523 3.76465C8.34491 3.76674 7.46057 3.91019 6.61523 4.18965L7.42023 4.99965C8.01316 4.84641 8.62283 4.76747 9.23523 4.76465C12.0502 4.76465 14.6102 6.33465 16.1352 8.97965C15.5758 9.96095 14.8342 10.8264 13.9502 11.5296L14.6602 12.2396C15.6833 11.4143 16.5329 10.3947 17.1602 9.23965L17.2902 8.99965L17.1452 8.76465Z",fill:"#4F4F4F"}),(0,a.jsx)("path",{d:"M2.43494 2.88953L4.66494 5.11953C3.2554 6.02709 2.10339 7.28242 1.31994 8.76453L1.18994 8.99953L1.31994 9.23953C3.00494 12.3545 5.95994 14.2395 9.22994 14.2395C10.5063 14.2393 11.766 13.9504 12.9149 13.3945L15.4149 15.8945L16.2899 15.1445L3.28994 2.14453L2.43494 2.88953ZM7.30994 7.76453L10.6349 11.0895C10.2593 11.3221 9.82677 11.4466 9.38494 11.4495C9.06391 11.4495 8.74604 11.3861 8.44963 11.2628C8.15322 11.1394 7.88412 10.9587 7.65781 10.731C7.4315 10.5033 7.25246 10.2331 7.13097 9.93597C7.00949 9.63881 6.94796 9.32056 6.94994 8.99953C6.95557 8.56281 7.08003 8.13587 7.30994 7.76453ZM6.58494 7.03953C6.11716 7.69923 5.8979 8.50318 5.966 9.30903C6.03409 10.1149 6.38514 10.8706 6.95699 11.4425C7.52884 12.0143 8.2846 12.3654 9.09045 12.4335C9.89629 12.5016 10.7002 12.2823 11.3599 11.8145L12.1599 12.6145C11.2338 13.0104 10.2371 13.2145 9.22994 13.2145C6.41494 13.2145 3.85494 11.6445 2.32994 8.99953C3.06179 7.70364 4.1158 6.61863 5.38994 5.84953L6.58494 7.03953Z",fill:"#4F4F4F"})]}),(0,a.jsx)("defs",{children:(0,a.jsx)("clipPath",{id:"clip0_0_2252",children:(0,a.jsx)("rect",{width:"18",height:"18",fill:"white"})})})]})})]}),d.password&&(0,a.jsx)("p",{className:" text-[14px] text-red ",children:null==d?void 0:d.password})]})]}),(0,a.jsxs)("div",{className:"flex w-full flex-col items-start justify-start gap-1",children:[(0,a.jsx)("label",{className:"text-[14px] font-medium text-[#8A8A8A]",children:"Confirm password"}),(0,a.jsxs)("div",{className:"relative flex w-full flex-col items-start justify-start gap-4",children:[(0,a.jsxs)("div",{className:"relative  w-full ",children:[(0,a.jsx)("input",{className:"w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:g?"text":"password",name:"confirmPassword",id:"confirmPassword",placeholder:"Enter your password",value:null==t?void 0:t.confirmPassword,onChange:e=>C(e.target.value,"confirmPassword")}),(0,a.jsx)("span",{className:"absolute right-3 top-1/2 -translate-y-1/2",onClick:()=>j(!g),children:g?(0,a.jsxs)("svg",{width:"18px",height:"18px",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("g",{id:"SVGRepo_bgCarrier","stroke-width":"0"}),(0,a.jsx)("g",{id:"SVGRepo_tracerCarrier","stroke-linecap":"round","stroke-linejoin":"round"}),(0,a.jsxs)("g",{id:"SVGRepo_iconCarrier",children:[" ",(0,a.jsx)("path",{d:"M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z",stroke:"#4F4F4F","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})," ",(0,a.jsx)("path",{d:"M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z",stroke:"#4F4F4F","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})," "]})]}):(0,a.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsxs)("g",{"clip-path":"url(#clip0_0_2252)",children:[(0,a.jsx)("path",{d:"M12.5948 10.2003C12.7384 9.81659 12.8113 9.41002 12.8098 9.00031C12.8098 8.09062 12.4485 7.21819 11.8052 6.57494C11.162 5.93169 10.2895 5.57031 9.37982 5.57031C8.97517 5.57079 8.57385 5.6436 8.19482 5.78531L8.99982 6.61531C9.12219 6.59573 9.2459 6.5857 9.36982 6.58531C10.013 6.58397 10.6307 6.83718 11.0878 7.28966C11.545 7.74214 11.8045 8.35712 11.8098 9.00031C11.8094 9.12424 11.7994 9.24794 11.7798 9.37031L12.5948 10.2003Z",fill:"#4F4F4F"}),(0,a.jsx)("path",{d:"M17.1452 8.76465C15.4602 5.64965 12.5052 3.76465 9.23523 3.76465C8.34491 3.76674 7.46057 3.91019 6.61523 4.18965L7.42023 4.99965C8.01316 4.84641 8.62283 4.76747 9.23523 4.76465C12.0502 4.76465 14.6102 6.33465 16.1352 8.97965C15.5758 9.96095 14.8342 10.8264 13.9502 11.5296L14.6602 12.2396C15.6833 11.4143 16.5329 10.3947 17.1602 9.23965L17.2902 8.99965L17.1452 8.76465Z",fill:"#4F4F4F"}),(0,a.jsx)("path",{d:"M2.43494 2.88953L4.66494 5.11953C3.2554 6.02709 2.10339 7.28242 1.31994 8.76453L1.18994 8.99953L1.31994 9.23953C3.00494 12.3545 5.95994 14.2395 9.22994 14.2395C10.5063 14.2393 11.766 13.9504 12.9149 13.3945L15.4149 15.8945L16.2899 15.1445L3.28994 2.14453L2.43494 2.88953ZM7.30994 7.76453L10.6349 11.0895C10.2593 11.3221 9.82677 11.4466 9.38494 11.4495C9.06391 11.4495 8.74604 11.3861 8.44963 11.2628C8.15322 11.1394 7.88412 10.9587 7.65781 10.731C7.4315 10.5033 7.25246 10.2331 7.13097 9.93597C7.00949 9.63881 6.94796 9.32056 6.94994 8.99953C6.95557 8.56281 7.08003 8.13587 7.30994 7.76453ZM6.58494 7.03953C6.11716 7.69923 5.8979 8.50318 5.966 9.30903C6.03409 10.1149 6.38514 10.8706 6.95699 11.4425C7.52884 12.0143 8.2846 12.3654 9.09045 12.4335C9.89629 12.5016 10.7002 12.2823 11.3599 11.8145L12.1599 12.6145C11.2338 13.0104 10.2371 13.2145 9.22994 13.2145C6.41494 13.2145 3.85494 11.6445 2.32994 8.99953C3.06179 7.70364 4.1158 6.61863 5.38994 5.84953L6.58494 7.03953Z",fill:"#4F4F4F"})]}),(0,a.jsx)("defs",{children:(0,a.jsx)("clipPath",{id:"clip0_0_2252",children:(0,a.jsx)("rect",{width:"18",height:"18",fill:"white"})})})]})})]}),d.confirmPassword&&(0,a.jsx)("p",{className:" text-[14px] text-red ",children:null==d?void 0:d.confirmPassword})]})]}),(0,a.jsx)("p",{className:"mx-auto text-[#667085] ",children:"Must be at least 8 characters."}),(0,a.jsx)("button",{className:"w-full rounded bg-blue px-4 py-3 text-[14px] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue",type:"button",onClick:b,children:(0,a.jsx)(o.default,{href:"/",children:"Continue to dashboard"})}),(0,a.jsxs)("div",{className:"flex w-full items-center justify-center gap-1",children:[(0,a.jsx)("p",{className:"text-[12px] font-bold leading-[24px] text-[#667085] ",children:"Already have an account?"}),(0,a.jsx)(o.default,{href:"/signin",className:"text-[12px] font-bold leading-[24px] text-blue ",children:"Sign in"})]})]})})]}),(0,a.jsx)(i,{currentActiveStep:p,totalSteps:4,stepHeadings:h})]})})}}},function(e){e.O(0,[54,192,138,971,23,744],function(){return e(e.s=8567)}),_N_E=e.O()}]);