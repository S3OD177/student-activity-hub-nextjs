(()=>{var e={};e.id=6693,e.ids=[6693],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},83827:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>h,pages:()=>d,routeModule:()=>p,tree:()=>c}),i(58072),i(7330),i(26083),i(89410);var a=i(23191),s=i(88716),r=i(37922),n=i.n(r),o=i(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);i.d(t,l);let c=["",{children:["certificates",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,58072)),"C:\\Users\\m_ah1\\Desktop\\student-activity-hub-nextjs\\app\\certificates\\[id]\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(i.bind(i,7330)),"C:\\Users\\m_ah1\\Desktop\\student-activity-hub-nextjs\\app\\layout.tsx"],error:[()=>Promise.resolve().then(i.bind(i,26083)),"C:\\Users\\m_ah1\\Desktop\\student-activity-hub-nextjs\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(i.bind(i,89410)),"C:\\Users\\m_ah1\\Desktop\\student-activity-hub-nextjs\\app\\not-found.tsx"]}],d=["C:\\Users\\m_ah1\\Desktop\\student-activity-hub-nextjs\\app\\certificates\\[id]\\page.tsx"],h="/certificates/[id]/page",x={require:i,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/certificates/[id]/page",pathname:"/certificates/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},40831:(e,t,i)=>{Promise.resolve().then(i.bind(i,92254))},92254:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>N});var a=i(10326),s=i(77109),r=i(17577),n=i(35047),o=i(7979),l=i(32600),c=i(90772),d=i(33071),h=i(997),x=i(31540),p=i(76993),m=i(62881);let u=(0,m.Z)("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);var f=i(74857);let g=(0,m.Z)("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]),b=(0,m.Z)("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]),v=(0,m.Z)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var w=i(51626);function y({userName:e,activityTitle:t,activityDate:i,enrollmentId:s,onDownload:n}){let o=(0,r.useRef)(null),{t:l}=(0,w.Z)(),m=async()=>{if(n&&n(),!o.current)return;let a=window.open("","_blank");a&&(a.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${t}</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              font-family: 'Georgia', serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f5f5f5;
            }
            .certificate {
              width: 800px;
              padding: 60px;
              background: white;
              border: 20px solid #1e40af;
              border-radius: 10px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              position: relative;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 30px;
              left: 30px;
              right: 30px;
              bottom: 30px;
              border: 2px solid #3b82f6;
              pointer-events: none;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 40px;
            }
            h1 {
              font-size: 48px;
              color: #1e40af;
              margin: 0 0 10px;
              font-weight: bold;
              letter-spacing: 2px;
            }
            .subtitle {
              font-size: 20px;
              color: #6b7280;
              font-style: italic;
            }
            .content {
              text-align: center;
              margin: 40px 0;
            }
            .presented-to {
              font-size: 18px;
              color: #6b7280;
              margin-bottom: 15px;
            }
            .recipient-name {
              font-size: 42px;
              color: #1f2937;
              font-weight: bold;
              margin: 20px 0;
              border-bottom: 2px solid #1e40af;
              display: inline-block;
              padding-bottom: 10px;
            }
            .description {
              font-size: 18px;
              color: #4b5563;
              margin: 30px 0;
              line-height: 1.8;
            }
            .activity-title {
              font-size: 24px;
              color: #1e40af;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              margin-top: 60px;
              padding-top: 30px;
              border-top: 2px solid #e5e7eb;
            }
            .signature {
              text-align: center;
            }
            .signature-line {
              width: 200px;
              border-top: 2px solid #1f2937;
              margin: 0 auto 10px;
            }
            .signature-label {
              font-size: 14px;
              color: #6b7280;
            }
            .date {
              text-align: center;
              margin-top: 20px;
              font-size: 16px;
              color: #6b7280;
            }
            @media print {
              body {
                background: white;
                padding: 0;
              }
              .certificate {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="logo">🎓</div>
              <h1>CERTIFICATE</h1>
              <div class="subtitle">of Participation</div>
            </div>
            
            <div class="content">
              <div class="presented-to">This certificate is proudly presented to</div>
              <div class="recipient-name">${e}</div>
              
              <div class="description">
                For successfully participating and completing
              </div>
              
              <div class="activity-title">${t}</div>
              
              <div class="date">
                Completed on ${new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}
              </div>
            </div>
            
            <div class="footer">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-label">Activity Coordinator</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-label">Date Issued</div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `),a.document.close())};return(0,a.jsxs)("div",{children:[a.jsx(d.Zb,{className:"overflow-hidden border-2 border-blue-200 dark:border-blue-800",children:a.jsx(d.aY,{className:"p-0",children:a.jsx("div",{ref:o,className:"bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8 text-center",children:(0,a.jsxs)("div",{className:"bg-white dark:bg-gray-900 rounded-lg p-8 border-4 border-blue-600 dark:border-blue-400 shadow-xl",children:[a.jsx(h.Z,{className:"w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400"}),a.jsx("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-2",children:l("certificates.certificateOf")}),a.jsx("p",{className:"text-gray-600 dark:text-gray-400 mb-6",children:l("certificates.thisCertifies")}),a.jsx("h3",{className:"text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 border-b-2 border-blue-600 dark:border-blue-400 inline-block pb-2",children:e}),a.jsx("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:l("certificates.hasCompleted")}),a.jsx("h4",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-6",children:t}),a.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})]})})})}),(0,a.jsxs)("div",{className:"mt-6 space-y-4",children:[a.jsx("div",{className:"flex gap-4",children:(0,a.jsxs)(c.z,{onClick:m,size:"lg",className:"flex-1",children:[a.jsx(x.Z,{className:"h-5 w-5 mr-2"}),l("certificates.download")]})}),a.jsx(d.Zb,{className:"border-2 border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30",children:a.jsx(d.aY,{className:"p-6",children:(0,a.jsxs)("div",{className:"flex items-start gap-4",children:[a.jsx("div",{className:"w-12 h-12 bg-[#0A66C2] rounded flex items-center justify-center flex-shrink-0",children:a.jsx("svg",{className:"w-7 h-7 text-white",fill:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})}),(0,a.jsxs)("div",{className:"flex-1",children:[a.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"LinkedIn"}),a.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-4",children:"Showcase your achievement to your professional network"}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row gap-2",children:[(0,a.jsxs)(c.z,{onClick:()=>{let e=encodeURIComponent(`Certificate of Completion: ${t}`),a=encodeURIComponent(window.location.href),s=encodeURIComponent("Student Activity Hub"),r=new Date(i).getFullYear(),n=new Date(i).getMonth()+1,o=`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${e}&organizationName=${s}&issueYear=${r}&issueMonth=${n}&certUrl=${a}`;window.open(o,"_blank","width=600,height=600")},className:"bg-[#0A66C2] hover:bg-[#004182] text-white",children:[a.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),l("certificates.addToLinkedIn")]}),(0,a.jsxs)(c.z,{onClick:()=>{let e=encodeURIComponent(`I'm proud to share that I've earned a certificate for completing "${t}"! 🎓`),i=encodeURIComponent(window.location.href),a=`https://www.linkedin.com/sharing/share-offsite/?url=${i}&text=${e}`;window.open(a,"_blank","width=600,height=600")},variant:"outline",className:"border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",children:[a.jsx(p.Z,{className:"h-4 w-4 mr-2"}),l("certificates.sharePost")]})]})]})]})})}),a.jsx(d.Zb,{className:"border-2 border-purple-100 dark:border-purple-900",children:(0,a.jsxs)(d.aY,{className:"p-6",children:[(0,a.jsxs)("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2",children:[a.jsx(p.Z,{className:"h-5 w-5"}),l("certificates.share")]}),a.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-4",children:l("certificates.shareAchievement")}),(0,a.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-3",children:[(0,a.jsxs)(c.z,{onClick:()=>{let e=encodeURIComponent(window.location.href),t=`https://www.facebook.com/sharer/sharer.php?u=${e}`;window.open(t,"_blank","width=600,height=600")},className:"bg-[#1877F2] hover:bg-[#0C63D4] text-white",children:[a.jsx(u,{className:"h-4 w-4 mr-2"}),l("certificates.shareOnFacebook")]}),(0,a.jsxs)(c.z,{onClick:()=>{let e=encodeURIComponent(`I've earned a certificate for completing "${t}"! 🎓 #Achievement #Certificate`),i=encodeURIComponent(window.location.href),a=`https://twitter.com/intent/tweet?text=${e}&url=${i}`;window.open(a,"_blank","width=600,height=600")},className:"bg-[#1DA1F2] hover:bg-[#0C8BD9] text-white",children:[a.jsx(f.Z,{className:"h-4 w-4 mr-2"}),l("certificates.shareOnTwitter")]}),(0,a.jsxs)(c.z,{onClick:()=>{let e=encodeURIComponent(`Check out my certificate for completing "${t}"! 🎓 ${window.location.href}`),i=`https://wa.me/?text=${e}`;window.open(i,"_blank")},className:"bg-[#25D366] hover:bg-[#1EBE57] text-white",children:[a.jsx(g,{className:"h-4 w-4 mr-2"}),l("certificates.shareOnWhatsApp")]}),(0,a.jsxs)(c.z,{onClick:()=>{let e=encodeURIComponent(`I've earned a certificate for completing "${t}"! 🎓`),i=encodeURIComponent(window.location.href),a=`https://t.me/share/url?url=${i}&text=${e}`;window.open(a,"_blank")},className:"bg-[#0088CC] hover:bg-[#0077B5] text-white",children:[a.jsx(b,{className:"h-4 w-4 mr-2"}),l("certificates.shareOnTelegram")]}),(0,a.jsxs)(c.z,{onClick:()=>{navigator.clipboard.writeText(window.location.href),alert("Link copied to clipboard!")},variant:"outline",className:"col-span-2 sm:col-span-1",children:[a.jsx(v,{className:"h-4 w-4 mr-2"}),l("certificates.copyLink")]})]})]})})]})]})}let k=(0,m.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var j=i(90434),C=i(34789);function N({params:e}){let{data:t,status:i}=(0,s.useSession)();(0,n.useRouter)();let{toast:d}=(0,C.pm)(),[h,x]=(0,r.useState)(null),[p,m]=(0,r.useState)(!0),u=async()=>{if(!h.certificateIssued)try{await fetch("/api/certificates",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({enrollmentId:h.id})}),d({title:"Success",description:"Certificate downloaded successfully!"})}catch(e){console.error("Error issuing certificate:",e)}};return p?(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col",children:[a.jsx(o.w,{}),a.jsx("main",{className:"flex-1 flex items-center justify-center",children:a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"})}),a.jsx(l.$,{})]}):h?(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col",children:[a.jsx(o.w,{}),(0,a.jsxs)("main",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1",children:[a.jsx(j.default,{href:"/certificates",children:(0,a.jsxs)(c.z,{variant:"ghost",className:"mb-6",children:[a.jsx(k,{className:"h-4 w-4 mr-2"}),"Back to Certificates"]})}),a.jsx(y,{userName:h.user.fullName||h.user.username,activityTitle:h.activity.title,activityDate:h.activity.date,enrollmentId:h.id,onDownload:u})]}),a.jsx(l.$,{})]}):null}},31540:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});let a=(0,i(62881).Z)("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]])},76993:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});let a=(0,i(62881).Z)("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]])},74857:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});let a=(0,i(62881).Z)("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]])},58072:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>a});let a=(0,i(68570).createProxy)(String.raw`C:\Users\m_ah1\Desktop\student-activity-hub-nextjs\app\certificates\[id]\page.tsx#default`)}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),a=t.X(0,[9276,8080,619,110],()=>i(83827));module.exports=a})();