// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { useAuth } from '../context/AuthContext';

// export default function EndpointsManagement() {
//   const [endpoints, setEndpoints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   const [endpointName, setEndpointName] = useState('');
//   const [endpointUrl, setEndpointUrl] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const [formError, setFormError] = useState('');
  
//   const { isAuthLoading } = useAuth();

//   const handleAddEndpoint = async (e) => {
//   e.preventDefault();

//   setFormError('');

//   try {
//     setIsSaving(true);

//     await api.post('/endpoints', {
//       url: endpointUrl.trim(),
//     });

//     // Refresh the endpoint list
//     const response = await api.get('/endpoints');
//     setEndpoints(response.data);

//     // Close and reset the form
//     setIsAddModalOpen(false);
//     setEndpointName('');
//     setEndpointUrl('');
//   } catch (err) {
//     setFormError(
//       err.response?.data?.message || 'Failed to create endpoint'
//     );
//   } finally {
//     setIsSaving(false);
//   }
// };
  
// useEffect(() => {
//   if (isAuthLoading) return;

//   console.log("Fetching endpoints now");

//   const fetchEndpoints = async () => {
//     try {
//       const response = await api.get("/endpoints");
//       setEndpoints(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to load endpoints"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchEndpoints();
// }, [isAuthLoading]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.text = "// DOM Elements\n  const addModal = document.getElementById('addEndpointModal');\n  const openAddBtn = document.getElementById('openAddModalBtn');\n  const closeAddBtn = document.getElementById('closeAddModalBtn');\n  const cancelAddBtn = document.getElementById('cancelAddModalBtn');\n  const saveEndpointBtn = document.getElementById('saveEndpointBtn');\n  const genSecretBtn = document.getElementById('genSecretBtn');\n  const secretInput = document.getElementById('secretInput');\n  const toggleSecretBtn = document.getElementById('toggleSecretVisibility');\n\n  const testModal = document.getElementById('testEndpointModal');\n  const closeTestBtn = document.getElementById('closeTestModalBtn');\n  const cancelTestBtn = document.getElementById('cancelTestBtn');\n  const sendProbeBtn = document.getElementById('sendProbeBtn');\n  const sendProbeLabel = document.getElementById('sendProbeLabel');\n  const testResponseArea = document.getElementById('testResponseArea');\n  const testModalEndpointName = document.getElementById('testModalEndpointName');\n  const testModalEndpointUrl = document.getElementById('testModalEndpointUrl');\n  const payloadTemplateSelect = document.getElementById('payloadTemplateSelect');\n  const jsonPayloadArea = document.getElementById('jsonPayloadArea');\n\n  const deleteModal = document.getElementById('deleteConfirmModal');\n  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');\n  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');\n  const deleteTargetName = document.getElementById('deleteTargetName');\n\n  const toast = document.getElementById('toastNotification');\n  const toastMessage = document.getElementById('toastMessage');\n\n  const searchInput = document.getElementById('searchInput');\n  const filterTabs = document.querySelectorAll('.filter-tab');\n  const rows = document.querySelectorAll('.endpoint-row');\n\n  // Helper Toast\n  function showToast(msg) {\n    toastMessage.textContent = msg;\n    toast.classList.remove('hidden');\n    toast.classList.add('flex');\n    setTimeout(() => {\n      toast.classList.add('hidden');\n      toast.classList.remove('flex');\n    }, 2800);\n  }\n\n  // Add Modal Toggles\n  openAddBtn.addEventListener('click', () => addModal.classList.remove('hidden'));\n  const closeAdd = () => addModal.classList.add('hidden');\n  closeAddBtn.addEventListener('click', closeAdd);\n  cancelAddBtn.addEventListener('click', closeAdd);\n\n  saveEndpointBtn.addEventListener('click', () => {\n    closeAdd();\n    showToast('Endpoint registered successfully');\n  });\n\n  // Generate Secret\n  genSecretBtn.addEventListener('click', () => {\n    const chars = 'abcdef0123456789';\n    let rand = 'whsec_';\n    for (let i = 0; i < 28; i++) {\n      rand += chars.charAt(Math.floor(Math.random() * chars.length));\n    }\n    secretInput.value = rand;\n    showToast('Generated new signing key');\n  });\n\n  // Toggle Secret Mask\n  toggleSecretBtn.addEventListener('click', () => {\n    const isPass = secretInput.type === 'password';\n    secretInput.type = isPass ? 'text' : 'password';\n    toggleSecretBtn.querySelector('.material-symbols-outlined').textContent = isPass ? 'visibility_off' : 'visibility';\n  });\n\n  // Test Modal Triggers\n  document.querySelectorAll('.test-trigger-btn').forEach(btn => {\n    btn.addEventListener('click', (e) => {\n      e.stopPropagation();\n      document.querySelectorAll('.action-menu').forEach(m => m.classList.add('hidden'));\n      testModalEndpointName.textContent = btn.getAttribute('data-name');\n      testModalEndpointUrl.textContent = btn.getAttribute('data-url');\n      testResponseArea.classList.add('hidden');\n      testModal.classList.remove('hidden');\n    });\n  });\n\n  const closeTest = () => testModal.classList.add('hidden');\n  closeTestBtn.addEventListener('click', closeTest);\n  cancelTestBtn.addEventListener('click', closeTest);\n\n  // Template switch\n  payloadTemplateSelect.addEventListener('change', (e) => {\n    const val = e.target.value;\n    if (val === 'payment.succeeded') {\n      jsonPayloadArea.value = JSON.stringify({\n        event: \"payment.succeeded\",\n        id: \"evt_pay_884920\",\n        amount: 4500,\n        currency: \"USD\",\n        charge_id: \"ch_99214a\"\n      }, null, 2);\n    } else if (val === 'user.churned') {\n      jsonPayloadArea.value = JSON.stringify({\n        event: \"user.churned\",\n        id: \"evt_usr_00918\",\n        account_id: \"acct_88710\",\n        reason: \"subscription_canceled\"\n      }, null, 2);\n    } else {\n      jsonPayloadArea.value = JSON.stringify({\n        event: \"order.created\",\n        id: \"evt_test_904812\",\n        timestamp: 1714521600,\n        data: { order_id: \"ord_99014\", customer: \"alex@enterprise.com\", amount_cents: 12900, currency: \"USD\" }\n      }, null, 2);\n    }\n  });\n\n  // Probe Simulation\n  sendProbeBtn.addEventListener('click', () => {\n    sendProbeLabel.textContent = 'Transmitting...';\n    sendProbeBtn.classList.add('opacity-50', 'pointer-events-none');\n    setTimeout(() => {\n      sendProbeLabel.textContent = 'Send Test Event';\n      sendProbeBtn.classList.remove('opacity-50', 'pointer-events-none');\n      testResponseArea.classList.remove('hidden');\n      showToast('200 OK delivery recorded');\n    }, 450);\n  });\n\n  // Action Dropdowns Toggle\n  document.querySelectorAll('.row-action-btn').forEach(btn => {\n    btn.addEventListener('click', (e) => {\n      e.stopPropagation();\n      const menu = btn.nextElementSibling;\n      const isHidden = menu.classList.contains('hidden');\n      document.querySelectorAll('.action-menu').forEach(m => m.classList.add('hidden'));\n      if (isHidden) menu.classList.remove('hidden');\n    });\n  });\n\n  document.addEventListener('click', () => {\n    document.querySelectorAll('.action-menu').forEach(m => m.classList.add('hidden'));\n  });\n\n  // Delete Flow\n  let targetRowToDelete = null;\n  document.querySelectorAll('.delete-trigger-btn').forEach(btn => {\n    btn.addEventListener('click', (e) => {\n      e.stopPropagation();\n      document.querySelectorAll('.action-menu').forEach(m => m.classList.add('hidden'));\n      deleteTargetName.textContent = btn.getAttribute('data-name');\n      targetRowToDelete = btn.closest('.endpoint-row');\n      deleteModal.classList.remove('hidden');\n    });\n  });\n\n  cancelDeleteBtn.addEventListener('click', () => deleteModal.classList.add('hidden'));\n  confirmDeleteBtn.addEventListener('click', () => {\n    deleteModal.classList.add('hidden');\n    if (targetRowToDelete) {\n      targetRowToDelete.remove();\n      showToast('Endpoint dropped successfully');\n    }\n  });\n\n  // Filter Tabs Handler\n  filterTabs.forEach(tab => {\n    tab.addEventListener('click', () => {\n      filterTabs.forEach(t => {\n        t.classList.remove('bg-surface-container-high', 'text-primary', 'font-medium');\n        t.classList.add('text-on-surface-variant');\n      });\n      tab.classList.add('bg-surface-container-high', 'text-primary', 'font-medium');\n      tab.classList.remove('text-on-surface-variant');\n\n      const filter = tab.getAttribute('data-status');\n      rows.forEach(r => {\n        if (filter === 'all' || r.getAttribute('data-status') === filter) {\n          r.classList.remove('hidden');\n        } else {\n          r.classList.add('hidden');\n        }\n      });\n    });\n  });\n\n  // Search Filter Handler\n  searchInput.addEventListener('input', (e) => {\n    const q = e.target.value.toLowerCase();\n    rows.forEach(r => {\n      const text = r.textContent.toLowerCase();\n      r.classList.toggle('hidden', !text.includes(q));\n    });\n  });\n\n  // Keyboard shortcut '/' to search\n  window.addEventListener('keydown', (e) => {\n    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'TEXTAREA') {\n      e.preventDefault();\n      searchInput.focus();\n    }\n  });\n\n  // Quick Copy Button handler\n  document.querySelectorAll('.copy-btn').forEach(btn => {\n    btn.addEventListener('click', () => {\n      const text = btn.getAttribute('data-text');\n      navigator.clipboard.writeText(text);\n      showToast('URL copied to clipboard');\n    });\n  });";
//     document.body.appendChild(script);
//     return () => script.remove();
//   }, []);
//   return <div className="source-screen"><aside className={"fixed left-0 top-0 bottom-0 w-64 bg-surface-container-lowest z-40 flex flex-col justify-between p-space-md"}><div className={"flex flex-col gap-space-md"}><div className={"flex items-center gap-space-sm px-space-xs py-space-xs"}><img alt={"Hookdeck Monogram Logo"} className={"h-8 w-auto object-contain"} src={"https://lh3.googleusercontent.com/aida/AEtjO1W8n4HhRyIDGyiUYrS6IYBX3yC0_OZIRCObmT6M6wqmsbMzwJzbM3ka-KngNYw85fV3TFDicfcDg1jFbgMloV1NyNXqR5V0COpmFPT2_q9IFZcIiWNTn9Ii9C3y-a8J_VqmeZdxbxXkNdKhwFltgFK-Na9pjm4NObZud_VrB14wRKE_KhIEirynT0pbPAwwQ9FqVUmemRzBJ5KvBYR0E3Joo8W4q40XeGRIeYL5FIfg6naZEpN8av8-gWfp"} /><div className={"flex flex-col"}><span className={"font-headline-sm text-headline-sm font-semibold tracking-wider text-on-surface uppercase"}>{"HOOKDECK"}</span><span className={"font-label-sm text-label-sm text-outline tracking-widest uppercase"}>{"DELIVERY PLATFORM"}</span></div></div><div className={"flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg"}><div className={"flex items-center gap-space-xs"}><span className={"font-code-md text-code-md text-on-surface font-medium"}>{"acme-corp"}</span><span className={"material-symbols-outlined text-outline text-body-sm"}>{"unfold_more"}</span></div><span className={"px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-code-sm text-code-sm uppercase"}>{"prod"}</span></div><nav className={"flex flex-col gap-space-xs pt-space-xs"} data-active-classes={"bg-surface-container-high text-primary font-medium"}><a className={"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"} data-path={"overview"} href={"#"}><div className={"flex items-center gap-space-sm"}><span className={"material-symbols-outlined text-headline-sm"}>{"space_dashboard"}</span><span className={"font-body-md text-body-md"}>{"Overview"}</span></div></a><a aria-current={"page"} className={"flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-colors bg-surface-container-high text-primary font-medium"} data-path={"endpoints"} href={"#"}><div className={"flex items-center gap-space-sm"}><span className={"material-symbols-outlined text-headline-sm"}>{"hub"}</span><span className={"font-body-md text-body-md"}>{"Endpoints"}</span></div></a><a className={"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"} data-path={"deliveries"} href={"#"}><div className={"flex items-center gap-space-sm"}><span className={"material-symbols-outlined text-headline-sm"}>{"send_and_archive"}</span><span className={"font-body-md text-body-md"}>{"Deliveries"}</span></div><span className={"px-1.5 py-0.5 rounded-full bg-error-container text-error font-code-sm text-code-sm"}>{"4"}</span></a></nav></div><div className={"flex flex-col gap-space-sm pt-space-md"}><div className={"flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low"}><span className={"relative flex h-2 w-2"}><span className={"animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"}></span><span className={"relative inline-flex rounded-full h-2 w-2 bg-primary"}></span></span><span className={"font-label-sm text-label-sm text-on-surface-variant"}>{"All systems operational"}</span></div><div className={"flex items-center justify-between p-space-xs rounded-lg bg-surface-container"}><div className={"flex items-center gap-space-xs"}><img alt={"Profile"} className={"w-8 h-8 rounded-full object-cover"} src={"https://lh3.googleusercontent.com/aida-public/AB6AXuBhv74MsNeDGB1ar1jv_6tKtNgPcEHSzSCU838nhcuVUgrn9Jz8HMfx9hkkr2gy5Z9HZ3MhKo3RKIsFJnaGdsN_MSFvSgxXdwN4CNZgq2xNBQq3rdSs83jKSmT8vN6ymkGtzh4-UF_zkuE5FdPZ5mMA4TRc7YZwapqX6eibo28ZElfFK6hoog3sgJCnK6LtIqGO43MXuLE_bIRoCRBCt0CGR4bfvbp5MN-Gz04bYGubREUb9FA3_x11zw"} /><div className={"flex flex-col overflow-hidden"}><span className={"font-label-sm text-label-sm text-on-surface truncate"}>{"admin@acme.io"}</span><span className={"font-code-sm text-code-sm text-outline"}>{"Owner"}</span></div></div><span className={"material-symbols-outlined text-outline text-headline-sm cursor-pointer hover:text-on-surface transition-colors"}>{"more_vert"}</span></div></div></aside><div className={"pl-64"}><header className={"fixed top-0 left-64 right-0 h-14 bg-surface-container-lowest/80 backdrop-blur-xl z-30 flex items-center justify-between px-space-lg"}><div className={"flex items-center gap-space-sm"}><div className={"flex items-center gap-space-xs font-code-sm text-code-sm text-outline"}><span className={"text-on-surface-variant"}>{"acme-corp"}</span><span>{"/"}</span><span className={"text-on-surface font-medium"}>{"Overview"}</span></div><div className={"flex items-center gap-space-xs px-space-xs py-0.5 rounded-full bg-surface-container-high"}><span className={"relative flex h-1.5 w-1.5"}><span className={"animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"}></span><span className={"relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"}></span></span><span className={"font-label-sm text-label-sm text-primary tracking-wider uppercase"}>{"LIVE STREAMING"}</span></div></div><div className={"flex items-center gap-space-md"}><div className={"flex items-center gap-space-xs font-code-sm text-code-sm text-outline"}><span>{"Updated 12s ago"}</span><button className={"hover:text-on-surface transition-colors flex items-center"} type={"button"}><span className={"material-symbols-outlined text-headline-sm"}>{"refresh"}</span></button></div><a className={"text-outline hover:text-on-surface transition-colors flex items-center"} href={"#"}><span className={"material-symbols-outlined text-headline-sm"}>{"menu_book"}</span></a><div className={"flex items-center gap-space-xs cursor-pointer"}><img alt={"Profile"} className={"w-8 h-8 rounded-full object-cover"} src={"https://lh3.googleusercontent.com/aida-public/AB6AXuBhv74MsNeDGB1ar1jv_6tKtNgPcEHSzSCU838nhcuVUgrn9Jz8HMfx9hkkr2gy5Z9HZ3MhKo3RKIsFJnaGdsN_MSFvSgxXdwN4CNZgq2xNBQq3rdSs83jKSmT8vN6ymkGtzh4-UF_zkuE5FdPZ5mMA4TRc7YZwapqX6eibo28ZElfFK6hoog3sgJCnK6LtIqGO43MXuLE_bIRoCRBCt0CGR4bfvbp5MN-Gz04bYGubREUb9FA3_x11zw"} /></div></div></header><main className={"w-full pt-14 px-space-lg pb-space-xl bg-background min-h-screen"}><div className={"flex flex-col w-full gap-space-lg text-on-surface"}>{"\n"}{"\n"}<div className={"flex flex-col md:flex-row md:items-end justify-between gap-space-md"}>{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<div className={"flex items-center gap-space-xs font-code-sm text-code-sm text-outline uppercase tracking-widest"}>{"\n"}<span>{"CONFIGURATION"}</span>{"\n"}<span>{"/"}</span>{"\n"}<span className={"text-primary font-medium"}>{"ROUTING RULES"}</span>{"\n"}</div>{"\n"}<h1 className={"font-headline-xl text-headline-xl text-on-surface tracking-tight"}>{"Endpoints"}</h1>{"\n"}<p className={"font-body-md text-body-md text-on-surface-variant max-w-2xl"}>{"\n        Manage webhook routing, verify signing secrets, inspect delivery SLA health, and trigger diagnostic probe payloads.\n      "}</p>{"\n"}</div>{"\n"}<div className={"flex items-center gap-space-sm self-start md:self-auto"}>{"\n"}<button className={"flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-body-sm text-body-sm transition-all shadow-sm"} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"download"}</span>{"\n"}<span>{"Export Spec"}</span>{"\n"}</button>{"\n"}<button className={"flex items-center gap-space-xs px-space-md py-space-xs bg-primary hover:bg-primary-fixed-dim text-on-primary font-body-sm text-body-sm font-semibold rounded transition-all shadow-sm"} id={"openAddModalBtn"} type={"button"} onClick={() => setIsAddModalOpen(true)}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"add"}</span>{"\n"}<span>{"+ Add Endpoint"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"w-full bg-surface-container-low rounded-xl shadow-sm overflow-hidden flex flex-col"}>{"\n"}<div className={"overflow-x-auto"}>{"\n"}<table className={"w-full text-left border-collapse"}>{"\n"}<thead>{"\n"}<tr className={"bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase tracking-wider select-none"}>{"\n"}<th className={"py-space-sm px-space-md"}>{"Endpoint & ID"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"Destination URL"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"Subscribed Events"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"Status"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"Success Rate"}</th>{"\n"}<th className={"py-space-sm px-space-md text-right"}>{"24h Deliveries"}</th>{"\n"}<th className={"py-space-sm px-space-md text-center"}>{"Actions"}</th>{"\n"}</tr>{"\n"}</thead>{"\n"}<tbody className={"font-body-sm text-body-sm divide-y-0"} id={"endpointTableBody"}>
// {loading ? (
//   <tr>
//     <td colSpan={7} className="py-8 text-center">Loading endpoints...</td>
//   </tr>
// ) : error ? (
//   <tr>
//     <td colSpan={7} className="py-8 text-center text-error">{error}</td>
//   </tr>
// ) : endpoints.length === 0 ? (
//   <tr>
//     <td colSpan={7} className="py-8 text-center">No endpoints yet. Add your first endpoint!</td>
//   </tr>
// ) : (
//   endpoints.map((endpoint) => (
//     <tr
//       key={endpoint._id}
//       className="endpoint-row hover:bg-surface-container transition-colors group"
//       data-status={endpoint.active ? 'active' : 'paused'}
//     >
//       <td className="py-space-sm px-space-md align-top">
//         <div className="flex flex-col">
//           <span className="font-body-md text-body-md font-semibold text-on-surface">
//             {endpoint.name || 'Webhook Endpoint'}
//           </span>
//           <span className="font-code-sm text-code-sm text-outline">{endpoint._id}</span>
//         </div>
//       </td>
//       <td className="py-space-sm px-space-md align-top">
//         <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-secondary">
//           <span className="truncate max-w-[240px] xl:max-w-[340px]">{endpoint.url}</span>
//         </div>
//       </td>
//       <td className="py-space-sm px-space-md align-top">
//         <span className="text-outline text-sm">Not configured</span>
//       </td>
//       <td className="py-space-sm px-space-md align-top">
//         <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-code-sm text-code-sm font-medium ${endpoint.active ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-outline'}`}>
//           <span className="w-1.5 h-1.5 rounded-full bg-current" />
//           {endpoint.active ? 'ACTIVE' : 'PAUSED'}
//         </span>
//       </td>
//       <td className="py-space-sm px-space-md align-top"><span className="text-outline text-sm">—</span></td>
//       <td className="py-space-sm px-space-md align-top text-right"><span className="text-outline">—</span></td>
//       <td className="py-space-sm px-space-md align-top text-center"><span className="text-outline">—</span></td>
//     </tr>
//   ))
// )}
// </tbody>{"\n"}</table>{"\n"}</div>{"\n"}{"\n"}<div className={"px-space-md py-space-xs bg-surface-container-lowest flex items-center justify-between text-outline font-label-sm text-label-sm"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"w-2 h-2 rounded-full bg-primary inline-block"}></span>{"\n"}<span>{"Telemetry socket synced"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-space-sm font-code-sm text-code-sm"}>{"\n"}<span>{"Showing 5 of 5 endpoints"}</span>{"\n"}<span className={"text-surface-bright"}>{"\u2022"}</span>{"\n"}<button className={"hover:text-on-surface transition-colors cursor-pointer"}>{"Live Buffer Log"}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"hidden fixed inset-0 z-50 overflow-hidden bg-surface-container-lowest/80 backdrop-blur-md flex justify-end"} id={"addEndpointModal"}>{"\n"}<div className={"w-full max-w-xl bg-surface-container-low h-full flex flex-col justify-between shadow-2xl overflow-y-auto"}>{"\n"}{"\n"}<div className={"p-space-lg bg-surface-container-lowest flex items-center justify-between"}>{"\n"}<div>{"\n"}<span className={"font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold"}>{"New Destination"}</span>{"\n"}<h2 className={"font-headline-lg text-headline-lg text-on-surface"}>{"Add Webhook Endpoint"}</h2>{"\n"}</div>{"\n"}<button className={"p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"} id={"closeAddModalBtn"} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-headline-md"}>{"close"}</span>{"\n"}</button>{"\n"}</div>{"\n"}{"\n"}<form className={"p-space-lg flex flex-col gap-space-md flex-1"} id={"addEndpointForm"}>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<label className={"font-label-md text-label-md text-on-surface font-medium flex items-center justify-between"}>{"\n"}<span>{"Endpoint Name"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-outline"}>{"Required"}</span>{"\n"}</label>{"\n"}<input className={"bg-surface-container-lowest text-on-surface px-space-sm py-2 rounded font-body-md text-body-md outline-none focus:bg-surface-container transition-all"} placeholder={"e.g. Invoicing Microservice"} required={true} type={"text"} />{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<label className={"font-label-md text-label-md text-on-surface font-medium flex items-center justify-between"}>{"\n"}<span>{"Destination URL (HTTPS required)"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-outline"}>{"POST"}</span>{"\n"}</label>{"\n"}<input className={"bg-surface-container-lowest font-code-md text-code-md text-on-surface px-space-sm py-2 rounded outline-none focus:bg-surface-container transition-all"} placeholder={"https://api.domain.com/v1/webhook"} required={true} type={"url"} />{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<label className={"font-label-md text-label-md text-on-surface font-medium"}>{"Signing Secret"}</label>{"\n"}<button className={"font-code-sm text-code-sm text-primary hover:underline"} id={"genSecretBtn"} type={"button"}>{"Generate Secret"}</button>{"\n"}</div>{"\n"}<div className={"relative flex items-center"}>{"\n"}<input className={"w-full bg-surface-container-lowest font-code-md text-code-md text-on-surface px-space-sm py-2 pr-10 rounded outline-none"} id={"secretInput"} type={"password"} value={"whsec_89dfa891823abce782ff091"} />{"\n"}<button className={"absolute right-2 text-outline hover:text-on-surface"} id={"toggleSecretVisibility"} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"visibility"}</span>{"\n"}</button>{"\n"}</div>{"\n"}<p className={"font-body-sm text-body-sm text-outline"}>{"Used to compute the HMAC-SHA256 signature in the "}<code className={"font-code-sm text-code-sm text-on-surface-variant"}>{"X-Hookdeck-Signature"}</code>{" header."}</p>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<label className={"font-label-md text-label-md text-on-surface font-medium"}>{"Subscribed Events"}</label>{"\n"}<div className={"p-space-xs bg-surface-container-lowest rounded flex flex-wrap gap-1 min-h-[44px]"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-code-sm text-code-sm"}>{"\n              order.created\n              "}<button className={"text-outline hover:text-error text-label-sm"} type={"button"}>{"\u2715"}</button>{"\n"}</span>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-code-sm text-code-sm"}>{"\n              order.updated\n              "}<button className={"text-outline hover:text-error text-label-sm"} type={"button"}>{"\u2715"}</button>{"\n"}</span>{"\n"}<input className={"bg-transparent font-code-sm text-code-sm text-on-surface outline-none px-2 flex-1 min-w-[160px]"} placeholder={"Type event and hit Enter (e.g. invoice.paid)..."} type={"text"} />{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<details className={"group bg-surface-container-lowest rounded overflow-hidden"}>{"\n"}<summary className={"flex items-center justify-between p-space-sm cursor-pointer select-none text-on-surface font-label-md text-label-md"}>{"\n"}<span className={"flex items-center gap-space-xs font-semibold"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm text-outline"}>{"tune"}</span>{"\n              Advanced Parameters & Retry Policy\n            "}</span>{"\n"}<span className={"material-symbols-outlined text-outline group-open:rotate-180 transition-transform"}>{"expand_more"}</span>{"\n"}</summary>{"\n"}<div className={"p-space-sm flex flex-col gap-space-sm bg-surface-container-lowest"}>{"\n"}<div className={"grid grid-cols-2 gap-space-sm"}>{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<label className={"font-label-sm text-label-sm text-outline"}>{"HTTP Method"}</label>{"\n"}<div className={"p-2 bg-surface-container rounded font-code-sm text-code-sm text-on-surface font-medium"}>{"POST"}</div>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<label className={"font-label-sm text-label-sm text-outline"}>{"Timeout"}</label>{"\n"}<input className={"p-2 bg-surface-container rounded font-code-sm text-code-sm text-on-surface outline-none"} type={"text"} value={"10s"} />{"\n"}</div>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<label className={"font-label-sm text-label-sm text-outline"}>{"Automatic Retry Strategy"}</label>{"\n"}<div className={"p-2 bg-surface-container rounded text-body-sm font-body-sm text-on-surface flex items-center justify-between"}>{"\n"}<span>{"3 attempts \u2022 Exponential backoff (10s, 60s, 300s)"}</span>{"\n"}<span className={"material-symbols-outlined text-primary text-headline-sm"}>{"check_circle"}</span>{"\n"}</div>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<label className={"font-label-sm text-label-sm text-outline"}>{"Custom Forwarding Headers"}</label>{"\n"}<div className={"flex gap-space-xs"}>{"\n"}<input className={"flex-1 p-2 bg-surface-container rounded font-code-sm text-code-sm text-on-surface outline-none"} placeholder={"X-Service-Source"} type={"text"} value={"X-Forwarded-By"} />{"\n"}<input className={"flex-1 p-2 bg-surface-container rounded font-code-sm text-code-sm text-on-surface outline-none"} placeholder={"Value"} type={"text"} value={"hookdeck-router"} />{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</details>{"\n"}</form>{"\n"}{"\n"}<div className={"p-space-lg bg-surface-container-lowest flex items-center justify-end gap-space-sm"}>{"\n"}<button className={"px-space-md py-space-xs text-on-surface hover:bg-surface-container rounded font-body-sm text-body-sm transition-colors"} id={"cancelAddModalBtn"} type={"button"}>{"\n          Cancel\n        "}</button>{"\n"}<button className={"px-space-md py-space-xs bg-primary hover:bg-primary-fixed-dim text-on-primary font-body-sm text-body-sm font-semibold rounded transition-colors shadow-sm"} id={"saveEndpointBtn"} type={"button"}>{"\n          Save & Register Endpoint\n        "}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"hidden fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md"} id={"testEndpointModal"}>{"\n"}<div className={"w-full max-w-2xl bg-surface-container-low rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"}>{"\n"}{"\n"}<div className={"p-space-md bg-surface-container-lowest flex items-center justify-between"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"w-2.5 h-2.5 rounded-full bg-primary animate-ping"}></span>{"\n"}<h3 className={"font-headline-md text-headline-md text-on-surface"}>{"Test Webhook Dispatch"}</h3>{"\n"}</div>{"\n"}<button className={"p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"} id={"closeTestModalBtn"} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-headline-md"}>{"close"}</span>{"\n"}</button>{"\n"}</div>{"\n"}{"\n"}<div className={"p-space-lg flex flex-col gap-space-md overflow-y-auto"}>{"\n"}{"\n"}<div className={"p-space-sm bg-surface-container-lowest rounded flex flex-col gap-1"}>{"\n"}<span className={"font-label-sm text-label-sm text-outline"}>{"Target Destination"}</span>{"\n"}<div className={"flex items-center justify-between font-code-sm text-code-sm"}>{"\n"}<span className={"text-primary font-semibold"} id={"testModalEndpointName"}>{"Production Orders"}</span>{"\n"}<span className={"text-secondary truncate max-w-xs"} id={"testModalEndpointUrl"}>{"https://api.shopify-store.com/webhooks/v2"}</span>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<label className={"font-label-md text-label-md text-on-surface font-medium"}>{"Event Mock Payload"}</label>{"\n"}<select className={"bg-surface-container-lowest text-on-surface font-code-sm text-code-sm px-space-xs py-1 rounded outline-none cursor-pointer"} id={"payloadTemplateSelect"}>{"\n"}<option value={"order.created"}>{"Template: order.created"}</option>{"\n"}<option value={"payment.succeeded"}>{"Template: payment.succeeded"}</option>{"\n"}<option value={"user.churned"}>{"Template: user.churned"}</option>{"\n"}</select>{"\n"}</div>{"\n"}{"\n"}<div className={"relative flex flex-col bg-surface-container-lowest rounded overflow-hidden"}>{"\n"}<div className={"flex items-center justify-between px-space-sm py-1 bg-surface-container text-outline font-label-sm text-label-sm"}>{"\n"}<span>{"application/json"}</span>{"\n"}<span className={"font-code-sm text-code-sm"}>{"284 bytes"}</span>{"\n"}</div>{"\n"}<textarea className={"w-full bg-surface-container-lowest p-space-sm font-code-sm text-code-sm text-primary outline-none resize-none leading-relaxed"} id={"jsonPayloadArea"} rows={"7"}>{"{\n  \"event\": \"order.created\",\n  \"id\": \"evt_test_904812\",\n  \"timestamp\": 1714521600,\n  \"data\": {\n    \"order_id\": \"ord_99014\",\n    \"customer\": \"alex@enterprise.com\",\n    \"amount_cents\": 12900,\n    \"currency\": \"USD\"\n  }\n}"}</textarea>{"\n"}</div>{"\n"}{"\n"}<div className={"hidden flex flex-col gap-1 p-space-sm bg-surface-container-lowest rounded"} id={"testResponseArea"}>{"\n"}<div className={"flex items-center justify-between font-label-sm text-label-sm"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"px-1.5 py-0.2 rounded bg-primary/20 text-primary font-code-sm text-code-sm font-bold"}>{"200 OK"}</span>{"\n"}<span className={"text-on-surface-variant font-code-sm text-code-sm"}>{"Latency: 84ms"}</span>{"\n"}</div>{"\n"}<span className={"text-outline font-code-sm text-code-sm"}>{"Delivery ID: del_99a8b1"}</span>{"\n"}</div>{"\n"}<pre className={"font-code-sm text-code-sm text-on-surface-variant mt-1"}>{"{\"received\": true, \"handler_ack\": \"ack_shopify_0029\"}"}</pre>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"p-space-md bg-surface-container-lowest flex items-center justify-end gap-space-sm"}>{"\n"}<button className={"px-space-md py-space-xs text-on-surface hover:bg-surface-container rounded font-body-sm text-body-sm transition-colors"} id={"cancelTestBtn"} type={"button"}>{"\n          Close\n        "}</button>{"\n"}<button className={"flex items-center gap-space-xs px-space-md py-space-xs bg-primary hover:bg-primary-fixed-dim text-on-primary font-body-sm text-body-sm font-semibold rounded transition-colors shadow-sm"} id={"sendProbeBtn"} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"send"}</span>{"\n"}<span id={"sendProbeLabel"}>{"Send Test Event"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"hidden fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md"} id={"deleteConfirmModal"}>{"\n"}<div className={"w-full max-w-md bg-surface-container-low rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-md"}>{"\n"}<div className={"flex items-center gap-space-sm text-error"}>{"\n"}<span className={"material-symbols-outlined text-headline-xl"}>{"warning"}</span>{"\n"}<h3 className={"font-headline-md text-headline-md text-on-surface font-semibold"}>{"Delete Endpoint?"}</h3>{"\n"}</div>{"\n"}<p className={"font-body-md text-body-md text-on-surface-variant"}>{"\n        Are you sure you want to delete "}<span className={"font-semibold text-on-surface"} id={"deleteTargetName"}></span>{"? Incoming webhook events destined for this endpoint will be permanently dropped and unrecoverable.\n      "}</p>{"\n"}<div className={"flex items-center justify-end gap-space-sm pt-space-xs"}>{"\n"}<button className={"px-space-md py-space-xs text-on-surface hover:bg-surface-container rounded font-body-sm text-body-sm transition-colors"} id={"cancelDeleteBtn"} type={"button"}>{"\n          Cancel\n        "}</button>{"\n"}<button className={"px-space-md py-space-xs bg-error hover:bg-error/90 text-on-error font-body-sm text-body-sm font-semibold rounded transition-colors shadow-sm"} id={"confirmDeleteBtn"} type={"button"}>{"\n          Yes, Delete Endpoint\n        "}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"fixed bottom-6 right-6 hidden z-50 items-center gap-space-sm px-space-md py-space-xs bg-surface-container-highest text-on-surface rounded shadow-xl font-body-sm text-body-sm"} id={"toastNotification"}>{"\n"}<span className={"material-symbols-outlined text-primary text-headline-sm"} id={"toastIcon"}>{"check_circle"}</span>{"\n"}<span id={"toastMessage"}>{"Success"}</span>{"\n"}</div>{"\n"}</div>{"\n"}</main></div></div>;
// }


import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../screens/Sidebar';

export default function EndpointsManagement() {
  const { isAuthLoading } = useAuth();

  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [endpointUrl, setEndpointUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch endpoints belonging to the logged-in user.
  const fetchEndpoints = async () => {
    setError('');

    try {
      const response = await api.get('/endpoints');
      setEndpoints(Array.isArray(response.data) ? response.data : []);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to load endpoints';

      setError(message);
      throw err;
    }
  };

  // Wait until the authentication context restores the session.
  useEffect(() => {
    if (isAuthLoading) return;

    const loadEndpoints = async () => {
      try {
        await fetchEndpoints();
      } catch {
        // The error is displayed by fetchEndpoints.
      } finally {
        setLoading(false);
      }
    };

    loadEndpoints();
  }, [isAuthLoading]);

  // Add a new endpoint.
  const handleAddEndpoint = async (e) => {
    e.preventDefault();
    setFormError('');
    setNotice('');

    const url = endpointUrl.trim();

    if (!url) {
      setFormError('Please enter a destination URL.');
      return;
    }

    try {
      setIsSaving(true);

      await api.post('/endpoints', { url });
      await fetchEndpoints();

      setIsAddModalOpen(false);
      setEndpointUrl('');
      setNotice('Endpoint registered successfully.');
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          'Could not register the endpoint. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Activate or pause an endpoint.
  const handleToggleEndpoint = async (endpoint) => {
    const id = endpoint._id;
    const isActive = endpoint.active !== false;

    setUpdatingId(id);
    setError('');
    setNotice('');

    try {
      await api.patch(`/endpoints/${id}`, {
        active: !isActive,
      });

      await fetchEndpoints();
      setNotice(!isActive ? 'Endpoint activated.' : 'Endpoint paused.');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not update this endpoint.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete an endpoint permanently.
  const handleDeleteEndpoint = async (endpoint) => {
    const confirmed = window.confirm(
      `Delete this endpoint?\n\n${endpoint.url}\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    const id = endpoint._id;

    setDeletingId(id);
    setError('');
    setNotice('');

    try {
      await api.delete(`/endpoints/${id}`);

      setEndpoints((current) =>
        current.filter((item) => item._id !== id)
      );

      setNotice('Endpoint deleted successfully.');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not delete this endpoint.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setNotice('Endpoint URL copied.');
    } catch {
      setError('Could not copy the URL. Please copy it manually.');
    }
  };

  const activeCount = endpoints.filter(
    (endpoint) => endpoint.active !== false
  ).length;

  const pausedCount = endpoints.length - activeCount;

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Sidebar />

      <div className="min-h-screen pl-64">

      <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Developer workspace
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              Endpoints
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
              Manage the webhook destinations that receive your events.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormError('');
              setEndpointUrl('');
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition hover:opacity-90 sm:self-auto"
          >
            <span className="material-symbols-outlined text-xl">
              add
            </span>
            Add Endpoint
          </button>
        </div>

        {/* Feedback messages */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-error/30 bg-error/10 p-4 text-sm text-error"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Dismiss error"
              className="shrink-0"
            >
              <span className="material-symbols-outlined text-lg">
                close
              </span>
            </button>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-on-surface"
          >
            <span>{notice}</span>

            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Dismiss message"
              className="shrink-0 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">
                close
              </span>
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">
                Total endpoints
              </p>
              <span className="material-symbols-outlined text-xl text-primary">
                hub
              </span>
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? '—' : endpoints.length}
            </p>

            <p className="mt-2 text-xs text-on-surface-variant">
              Registered destinations
            </p>
          </div>

          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">
                Active endpoints
              </p>
              <span className="material-symbols-outlined text-xl text-primary">
                check_circle
              </span>
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? '—' : activeCount}
            </p>

            <p className="mt-2 text-xs text-on-surface-variant">
              Enabled destinations
            </p>
          </div>

          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">
                Paused endpoints
              </p>
              <span className="material-symbols-outlined text-xl text-on-surface-variant">
                pause_circle
              </span>
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? '—' : pausedCount}
            </p>

            <p className="mt-2 text-xs text-on-surface-variant">
              Disabled destinations
            </p>
          </div>
        </div>

        {/* Endpoint list */}
        <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-low">
          <div className="flex flex-col gap-3 border-b border-outline-variant/20 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-on-surface">
                Your endpoints
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                View and manage your registered webhook URLs.
              </p>
            </div>

            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                try {
                  await fetchEndpoints();
                } catch {
                  // Error is displayed above.
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || isAuthLoading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-outline-variant/30 px-3 py-2 text-sm text-on-surface transition hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            >
              <span className="material-symbols-outlined text-lg">
                refresh
              </span>
              Refresh
            </button>
          </div>

          {loading || isAuthLoading ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <span className="material-symbols-outlined mb-3 animate-spin text-3xl text-primary">
                progress_activity
              </span>
              <p className="text-sm text-on-surface-variant">
                Loading your endpoints...
              </p>
            </div>
          ) : endpoints.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container">
                <span className="material-symbols-outlined text-3xl text-primary">
                  link
                </span>
              </div>

              <h3 className="text-lg font-semibold text-on-surface">
                No endpoints yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-on-surface-variant">
                Add your first endpoint to register a destination for webhook
                events.
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormError('');
                  setEndpointUrl('');
                  setIsAddModalOpen(true);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition hover:opacity-90"
              >
                <span className="material-symbols-outlined text-lg">
                  add
                </span>
                Create your first endpoint
              </button>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="border-b border-outline-variant/20 bg-surface-container/50">
                    <tr className="text-xs uppercase tracking-wider text-on-surface-variant">
                      <th className="px-5 py-4 font-medium">Destination URL</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                      <th className="px-5 py-4 font-medium">Created</th>
                      <th className="px-5 py-4 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-outline-variant/15">
                    {endpoints.map((endpoint) => {
                      const isActive = endpoint.active !== false;

                      return (
                        <tr
                          key={endpoint._id}
                          className="transition hover:bg-surface-container/40"
                        >
                          <td className="max-w-lg px-5 py-5">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container">
                                <span className="material-symbols-outlined text-xl text-primary">
                                  link
                                </span>
                              </div>

                              <div className="min-w-0">
                                <p className="break-all font-mono text-sm text-on-surface">
                                  {endpoint.url}
                                </p>
                                <p className="mt-1 text-xs text-on-surface-variant">
                                  ID: {endpoint._id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                                isActive
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-surface-container-high text-on-surface-variant'
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  isActive ? 'bg-primary' : 'bg-outline'
                                }`}
                              />
                              {isActive ? 'Active' : 'Paused'}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-5 py-5 text-sm text-on-surface-variant">
                            {endpoint.createdAt
                              ? new Date(endpoint.createdAt).toLocaleDateString()
                              : '—'}
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                title="Copy URL"
                                aria-label="Copy endpoint URL"
                                onClick={() => handleCopyUrl(endpoint.url)}
                                className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
                              >
                                <span className="material-symbols-outlined text-xl">
                                  content_copy
                                </span>
                              </button>

                              <button
                                type="button"
                                title={isActive ? 'Pause endpoint' : 'Activate endpoint'}
                                onClick={() => handleToggleEndpoint(endpoint)}
                                disabled={
                                  updatingId === endpoint._id ||
                                  deletingId === endpoint._id
                                }
                                className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface disabled:opacity-50"
                              >
                                <span className="material-symbols-outlined text-xl">
                                  {updatingId === endpoint._id
                                    ? 'progress_activity'
                                    : isActive
                                      ? 'pause'
                                      : 'play_arrow'}
                                </span>
                              </button>

                              <button
                                type="button"
                                title="Delete endpoint"
                                onClick={() => handleDeleteEndpoint(endpoint)}
                                disabled={
                                  deletingId === endpoint._id ||
                                  updatingId === endpoint._id
                                }
                                className="rounded-lg p-2 text-error transition hover:bg-error/10 disabled:opacity-50"
                              >
                                <span className="material-symbols-outlined text-xl">
                                  {deletingId === endpoint._id
                                    ? 'progress_activity'
                                    : 'delete'}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile endpoint cards */}
              <div className="divide-y divide-outline-variant/15 md:hidden">
                {endpoints.map((endpoint) => {
                  const isActive = endpoint.active !== false;

                  return (
                    <article key={endpoint._id} className="p-4">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container">
                            <span className="material-symbols-outlined text-xl text-primary">
                              link
                            </span>
                          </div>

                          <div className="min-w-0">
                            <p className="break-all font-mono text-sm text-on-surface">
                              {endpoint.url}
                            </p>
                            <p className="mt-1 break-all text-xs text-on-surface-variant">
                              ID: {endpoint._id}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>

                      <div className="mb-4 text-xs text-on-surface-variant">
                        Created:{' '}
                        {endpoint.createdAt
                          ? new Date(endpoint.createdAt).toLocaleDateString()
                          : 'Date unavailable'}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(endpoint.url)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/30 px-3 py-2 text-xs text-on-surface transition hover:bg-surface-container"
                        >
                          <span className="material-symbols-outlined text-base">
                            content_copy
                          </span>
                          Copy URL
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleEndpoint(endpoint)}
                          disabled={
                            updatingId === endpoint._id ||
                            deletingId === endpoint._id
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/30 px-3 py-2 text-xs text-on-surface transition hover:bg-surface-container disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-base">
                            {updatingId === endpoint._id
                              ? 'progress_activity'
                              : isActive
                                ? 'pause'
                                : 'play_arrow'}
                          </span>
                          {isActive ? 'Pause' : 'Activate'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteEndpoint(endpoint)}
                          disabled={
                            deletingId === endpoint._id ||
                            updatingId === endpoint._id
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-error/30 px-3 py-2 text-xs text-error transition hover:bg-error/10 disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-base">
                            {deletingId === endpoint._id
                              ? 'progress_activity'
                              : 'delete'}
                          </span>
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>

        <p className="mt-4 text-xs leading-5 text-on-surface-variant">
          Endpoint status reflects the saved configuration. Delivery success
          metrics and event testing require separate backend functionality.
        </p>
      </main>

      {/* Add Endpoint modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isSaving) {
              setIsAddModalOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-endpoint-title"
            className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-outline-variant/20 bg-surface-container-low shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-outline-variant/20 p-6">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  Configuration
                </p>

                <h2
                  id="add-endpoint-title"
                  className="text-2xl font-bold text-on-surface"
                >
                  Add Endpoint
                </h2>

                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  Register a URL to receive webhook events.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                disabled={isSaving}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-2xl">
                  close
                </span>
              </button>
            </div>

            {/* Modal form */}
            <form
              id="addEndpointForm"
              onSubmit={handleAddEndpoint}
              className="flex flex-1 flex-col gap-6 p-6"
            >
              <div>
                <label
                  htmlFor="endpointUrl"
                  className="mb-2 block text-sm font-medium text-on-surface"
                >
                  Destination URL
                  <span className="ml-1 text-error">*</span>
                </label>

                <input
                  id="endpointUrl"
                  name="url"
                  type="url"
                  required
                  autoFocus
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  placeholder="https://api.domain.com/v1/webhook"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 font-mono text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <p className="mt-2 text-xs leading-5 text-on-surface-variant">
                  Include the full URL, starting with https:// or http://.
                </p>
              </div>

              <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">
                    info
                  </span>

                  <div>
                    <p className="text-sm font-medium text-on-surface">
                      Before you register
                    </p>

                    <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                      Make sure this URL points to a server you control and
                      that it is ready to receive webhook requests.
                    </p>
                  </div>
                </div>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error"
                >
                  {formError}
                </p>
              )}
            </form>

            {/* Modal footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-outline-variant/20 p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                disabled={isSaving}
                className="rounded-lg px-5 py-3 text-sm font-medium text-on-surface transition hover:bg-surface-container disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="addEndpointForm"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving && (
                  <span className="material-symbols-outlined animate-spin text-lg">
                    progress_activity
                  </span>
                )}
                {isSaving ? 'Saving...' : 'Save & Register Endpoint'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
    </div>
  );
}