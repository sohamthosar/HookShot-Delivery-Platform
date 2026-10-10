// import React, { useEffect } from 'react';

// export default function DeliveriesLogs() {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.text = "// Interactive switching of row states and drawer synchronization\n  const rows = document.querySelectorAll('.delivery-row');\n  const drawer = document.getElementById('inspectorDrawer');\n  const closeBtn = document.getElementById('closeDrawerBtn');\n  const drawerEventTitle = document.getElementById('drawerEventTitle');\n  const drawerBadge = document.getElementById('drawerBadge');\n  const drawerDeliveryId = document.getElementById('drawerDeliveryId');\n  const drawerEndpoint = document.getElementById('drawerEndpoint');\n  const drawerDuration = document.getElementById('drawerDuration');\n  const drawerAttemptsCount = document.getElementById('drawerAttemptsCount');\n  const quickRetryBtn = document.getElementById('quickRetryBtn');\n  const pollToggle = document.getElementById('pollToggle');\n\n  // Handle drawer close\n  closeBtn.addEventListener('click', () => {\n    drawer.classList.add('hidden');\n    rows.forEach(r => r.classList.remove('bg-surface-container-highest'));\n  });\n\n  // Handle row clicks\n  rows.forEach(row => {\n    row.addEventListener('click', () => {\n      // Clear previous active highlights\n      rows.forEach(r => {\n        r.classList.remove('bg-surface-container-highest');\n        const bar = r.querySelector('.w-1');\n        if (bar) bar.remove();\n      });\n\n      // Highlight selected\n      row.classList.add('bg-surface-container-highest');\n      drawer.classList.remove('hidden');\n\n      const id = row.getAttribute('data-id');\n      const eventName = row.getAttribute('data-event');\n      const endpoint = row.getAttribute('data-endpoint');\n      const status = row.getAttribute('data-status');\n      const code = row.getAttribute('data-code');\n      const duration = row.getAttribute('data-duration');\n      const attempts = row.getAttribute('data-attempts');\n\n      // Update drawer contents\n      drawerEventTitle.textContent = eventName;\n      drawerDeliveryId.textContent = id;\n      drawerEndpoint.textContent = endpoint;\n      drawerDuration.textContent = duration;\n      drawerAttemptsCount.textContent = `${attempts} Attempts logged`;\n\n      // Status badge in drawer\n      if (status === 'DELIVERED') {\n        drawerBadge.className = 'px-1.5 py-0.5 rounded text-code-sm font-code-sm bg-primary/20 text-primary font-medium';\n        drawerBadge.textContent = `${code} OK`;\n        quickRetryBtn.classList.add('hidden');\n      } else if (status === 'RETRYING') {\n        drawerBadge.className = 'px-1.5 py-0.5 rounded text-code-sm font-code-sm bg-secondary-container/40 text-secondary font-medium';\n        drawerBadge.textContent = 'RETRYING';\n        quickRetryBtn.classList.remove('hidden');\n      } else {\n        drawerBadge.className = 'px-1.5 py-0.5 rounded text-code-sm font-code-sm bg-error-container/30 text-error font-medium';\n        drawerBadge.textContent = `${code} FAILED`;\n        quickRetryBtn.classList.remove('hidden');\n      }\n    });\n  });\n\n  quickRetryBtn.addEventListener('click', () => {\n    const curId = drawerDeliveryId.textContent;\n    alert(`Queued instant retry payload for ${curId}`);\n  });\n\n  let polling = true;\n  pollToggle.addEventListener('click', () => {\n    polling = !polling;\n    const dot = pollToggle.querySelector('.bg-primary');\n    const ping = pollToggle.querySelector('.animate-ping');\n    if (polling) {\n      ping.classList.remove('hidden');\n      dot.classList.add('bg-primary');\n      dot.classList.remove('bg-outline');\n    } else {\n      ping.classList.add('hidden');\n      dot.classList.remove('bg-primary');\n      dot.classList.add('bg-outline');\n    }\n  });";
//     document.body.appendChild(script);
//     return () => script.remove();
//   }, []);
//   return <div className="source-screen"><aside className={"fixed left-0 top-0 bottom-0 w-64 bg-surface-container-lowest z-40 flex flex-col justify-between p-space-md"}><div className={"flex flex-col gap-space-md"}><div className={"flex items-center gap-space-sm px-space-xs py-space-xs"}><img alt={"Hookdeck Monogram Logo"} className={"h-8 w-auto object-contain"} src={"https://lh3.googleusercontent.com/aida/AEtjO1W8n4HhRyIDGyiUYrS6IYBX3yC0_OZIRCObmT6M6wqmsbMzwJzbM3ka-KngNYw85fV3TFDicfcDg1jFbgMloV1NyNXqR5V0COpmFPT2_q9IFZcIiWNTn9Ii9C3y-a8J_VqmeZdxbxXkNdKhwFltgFK-Na9pjm4NObZud_VrB14wRKE_KhIEirynT0pbPAwwQ9FqVUmemRzBJ5KvBYR0E3Joo8W4q40XeGRIeYL5FIfg6naZEpN8av8-gWfp"} /><div className={"flex flex-col"}><span className={"font-headline-sm text-headline-sm font-semibold tracking-wider text-on-surface uppercase"}>{"HOOKDECK"}</span><span className={"font-label-sm text-label-sm text-outline tracking-widest uppercase"}>{"DELIVERY PLATFORM"}</span></div></div><div className={"flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg"}><div className={"flex items-center gap-space-xs"}><span className={"font-code-md text-code-md text-on-surface font-medium"}>{"acme-corp"}</span><span className={"material-symbols-outlined text-outline text-body-sm"}>{"unfold_more"}</span></div><span className={"px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-code-sm text-code-sm uppercase"}>{"prod"}</span></div><nav className={"flex flex-col gap-space-xs pt-space-xs"} data-active-classes={"bg-surface-container-high text-primary font-medium"}><a className={"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"} data-path={"overview"} href={"#"}><div className={"flex items-center gap-space-sm"}><span className={"material-symbols-outlined text-headline-sm"}>{"space_dashboard"}</span><span className={"font-body-md text-body-md"}>{"Overview"}</span></div></a><a className={"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"} data-path={"endpoints"} href={"#"}><div className={"flex items-center gap-space-sm"}><span className={"material-symbols-outlined text-headline-sm"}>{"hub"}</span><span className={"font-body-md text-body-md"}>{"Endpoints"}</span></div></a><a aria-current={"page"} className={"flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-colors bg-surface-container-high text-primary font-medium"} data-path={"deliveries"} href={"#"}><div className={"flex items-center gap-space-sm"}><span className={"material-symbols-outlined text-headline-sm"}>{"send_and_archive"}</span><span className={"font-body-md text-body-md"}>{"Deliveries"}</span></div><span className={"px-1.5 py-0.5 rounded-full bg-error-container text-error font-code-sm text-code-sm"}>{"4"}</span></a></nav></div><div className={"flex flex-col gap-space-sm pt-space-md"}><div className={"flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low"}><span className={"relative flex h-2 w-2"}><span className={"animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"}></span><span className={"relative inline-flex rounded-full h-2 w-2 bg-primary"}></span></span><span className={"font-label-sm text-label-sm text-on-surface-variant"}>{"All systems operational"}</span></div><div className={"flex items-center justify-between p-space-xs rounded-lg bg-surface-container"}><div className={"flex items-center gap-space-xs"}><img alt={"Profile"} className={"w-8 h-8 rounded-full object-cover"} src={"https://lh3.googleusercontent.com/aida-public/AB6AXuBhv74MsNeDGB1ar1jv_6tKtNgPcEHSzSCU838nhcuVUgrn9Jz8HMfx9hkkr2gy5Z9HZ3MhKo3RKIsFJnaGdsN_MSFvSgxXdwN4CNZgq2xNBQq3rdSs83jKSmT8vN6ymkGtzh4-UF_zkuE5FdPZ5mMA4TRc7YZwapqX6eibo28ZElfFK6hoog3sgJCnK6LtIqGO43MXuLE_bIRoCRBCt0CGR4bfvbp5MN-Gz04bYGubREUb9FA3_x11zw"} /><div className={"flex flex-col overflow-hidden"}><span className={"font-label-sm text-label-sm text-on-surface truncate"}>{"admin@acme.io"}</span><span className={"font-code-sm text-code-sm text-outline"}>{"Owner"}</span></div></div><span className={"material-symbols-outlined text-outline text-headline-sm cursor-pointer hover:text-on-surface transition-colors"}>{"more_vert"}</span></div></div></aside><div className={"pl-64"}><header className={"fixed top-0 left-64 right-0 h-14 bg-surface-container-lowest/80 backdrop-blur-xl z-30 flex items-center justify-between px-space-lg"}><div className={"flex items-center gap-space-sm"}><div className={"flex items-center gap-space-xs font-code-sm text-code-sm text-outline"}><span className={"text-on-surface-variant"}>{"acme-corp"}</span><span>{"/"}</span><span className={"text-on-surface font-medium"}>{"Overview"}</span></div><div className={"flex items-center gap-space-xs px-space-xs py-0.5 rounded-full bg-surface-container-high"}><span className={"relative flex h-1.5 w-1.5"}><span className={"animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"}></span><span className={"relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"}></span></span><span className={"font-label-sm text-label-sm text-primary tracking-wider uppercase"}>{"LIVE STREAMING"}</span></div></div><div className={"flex items-center gap-space-md"}><div className={"flex items-center gap-space-xs font-code-sm text-code-sm text-outline"}><span>{"Updated 12s ago"}</span><button className={"hover:text-on-surface transition-colors flex items-center"} type={"button"}><span className={"material-symbols-outlined text-headline-sm"}>{"refresh"}</span></button></div><a className={"text-outline hover:text-on-surface transition-colors flex items-center"} href={"#"}><span className={"material-symbols-outlined text-headline-sm"}>{"menu_book"}</span></a><div className={"flex items-center gap-space-xs cursor-pointer"}><img alt={"Profile"} className={"w-8 h-8 rounded-full object-cover"} src={"https://lh3.googleusercontent.com/aida-public/AB6AXuBhv74MsNeDGB1ar1jv_6tKtNgPcEHSzSCU838nhcuVUgrn9Jz8HMfx9hkkr2gy5Z9HZ3MhKo3RKIsFJnaGdsN_MSFvSgxXdwN4CNZgq2xNBQq3rdSs83jKSmT8vN6ymkGtzh4-UF_zkuE5FdPZ5mMA4TRc7YZwapqX6eibo28ZElfFK6hoog3sgJCnK6LtIqGO43MXuLE_bIRoCRBCt0CGR4bfvbp5MN-Gz04bYGubREUb9FA3_x11zw"} /></div></div></header><main className={"w-full pt-14 px-space-lg pb-space-xl bg-background min-h-screen"}><div className={"flex flex-col w-full text-on-surface"}>{"\n"}<div className={"flex flex-col gap-space-md mb-space-lg"}>{"\n"}<div className={"flex flex-col md:flex-row md:items-end justify-between gap-space-md"}>{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"px-space-xs py-0.5 rounded bg-surface-container-high font-code-sm text-code-sm text-outline tracking-widest uppercase"}>{"LOGS"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-outline"}>{"/"}</span>{"\n"}<span className={"font-label-sm text-label-sm text-primary tracking-wide"}>{"STREAM MONITOR"}</span>{"\n"}</div>{"\n"}<h1 className={"font-headline-xl text-headline-xl text-on-surface tracking-tight flex items-center gap-space-sm"}>{"\n          Deliveries\n          "}<span className={"font-code-sm text-code-sm px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-normal"}>{"v2.4-stream"}</span>{"\n"}</h1>{"\n"}</div>{"\n"}<div className={"flex flex-wrap items-center gap-space-sm"}>{"\n"}<div className={"flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg shadow-sm"}>{"\n"}<button className={"flex items-center gap-space-xs text-on-surface text-label-sm font-label-sm hover:text-primary transition-colors"} id={"pollToggle"}>{"\n"}<span className={"relative flex h-2 w-2"}>{"\n"}<span className={"animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"}></span>{"\n"}<span className={"relative inline-flex rounded-full h-2 w-2 bg-primary"}></span>{"\n"}</span>{"\n"}<span>{"Live Polling (3s)"}</span>{"\n"}</button>{"\n"}<span className={"text-outline-variant font-code-sm"}>{"|"}</span>{"\n"}<button className={"hover:text-primary text-outline transition-colors flex items-center"} title={"Force Refresh"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"refresh"}</span>{"\n"}</button>{"\n"}</div>{"\n"}<button className={"flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md px-space-md py-1.5 rounded-lg transition-colors"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm text-primary"}>{"download"}</span>{"\n          Export Har/JSON\n        "}</button>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"bg-surface-container rounded-xl p-space-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-sm shadow-md"}>{"\n"}<div className={"flex flex-wrap items-center gap-space-xs flex-1"}>{"\n"}<div className={"relative min-w-[260px] flex-1"}>{"\n"}<span className={"material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-headline-sm pointer-events-none"}>{"search"}</span>{"\n"}<input className={"w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md pl-8 pr- space-sm py-1.5 rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"} placeholder={"Filter by Delivery ID, Event or Status..."} type={"text"} />{"\n"}<span className={"absolute right-2 top-1/2 -translate-y-1/2 font-code-sm text-code-sm text-outline-variant bg-surface-container px-1 py-0.5 rounded"}>{"\u2318K"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-space-xs flex-wrap"}>{"\n"}<div className={"relative"}>{"\n"}<button className={"flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm px-space-sm py-1.5 rounded-lg transition-colors"}>{"\n"}<span className={"text-outline"}>{"Status:"}</span>{"\n"}<span className={"text-primary font-medium"}>{"All Statuses"}</span>{"\n"}<span className={"material-symbols-outlined text-body-sm text-outline"}>{"expand_more"}</span>{"\n"}</button>{"\n"}</div>{"\n"}<div className={"relative"}>{"\n"}<button className={"flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm px-space-sm py-1.5 rounded-lg transition-colors"}>{"\n"}<span className={"text-outline"}>{"Endpoint:"}</span>{"\n"}<span>{"All Endpoints"}</span>{"\n"}<span className={"material-symbols-outlined text-body-sm text-outline"}>{"expand_more"}</span>{"\n"}</button>{"\n"}</div>{"\n"}<div className={"relative"}>{"\n"}<button className={"flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm px-space-sm py-1.5 rounded-lg transition-colors"}>{"\n"}<span className={"text-outline"}>{"Event:"}</span>{"\n"}<span>{"All Events"}</span>{"\n"}<span className={"material-symbols-outlined text-body-sm text-outline"}>{"expand_more"}</span>{"\n"}</button>{"\n"}</div>{"\n"}<div className={"relative"}>{"\n"}<button className={"flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm px-space-sm py-1.5 rounded-lg transition-colors"}>{"\n"}<span className={"material-symbols-outlined text-body-sm text-outline"}>{"schedule"}</span>{"\n"}<span>{"Last 24 Hours"}</span>{"\n"}<span className={"material-symbols-outlined text-body-sm text-outline"}>{"expand_more"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}<div className={"flex items-center justify-between xl:justify-end gap-space-sm px-space-xs"}>{"\n"}<span className={"font-code-sm text-code-sm text-outline"}>{"Showing "}<strong className={"text-on-surface"}>{"10"}</strong>{" of "}<strong className={"text-on-surface"}>{"10"}</strong>{" deliveries"}</span>{"\n"}<button className={"text-outline hover:text-on-surface flex items-center text-body-sm"} title={"Clear Filters"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"filter_alt_off"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"relative flex flex-col xl:flex-row gap-space-md items-start w-full"}>{"\n"}{"\n"}<div className={"flex-1 w-full bg-surface-container rounded-xl overflow-hidden shadow-lg transition-all duration-300"} id={"tableContainer"}>{"\n"}<div className={"overflow-x-auto"}>{"\n"}<table className={"w-full text-left font-body-md text-body-md border-collapse"}>{"\n"}<thead>{"\n"}<tr className={"bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase tracking-wider"}>{"\n"}<th className={"py-space-sm px-space-md"}>{"TIMESTAMP"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"EVENT NAME"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"ENDPOINT"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"STATUS"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"HTTP CODE"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"DURATION"}</th>{"\n"}<th className={"py-space-sm px-space-md"}>{"ATTEMPTS"}</th>{"\n"}<th className={"py-space-sm px-space-md text-right"}>{"ACTIONS"}</th>{"\n"}</tr>{"\n"}</thead>{"\n"}<tbody className={"font-code-sm text-code-sm divide-y-0"} id={"deliveriesBody"}>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"1"} data-code={"200"} data-duration={"142ms"} data-endpoint={"Production Orders"} data-event={"order.created"} data-id={"del_01j98fz91x"} data-status={"DELIVERED"} data-time={"20:02:11"}>{"\n"}<td className={"py- space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"20:02:11"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"5s ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  order.created\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"Production Orders"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-primary/10 text-primary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  DELIVERED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-primary font-medium whitespace-nowrap"}>{"200 OK"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"142ms"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"1"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"p-1 rounded hover:bg-surface-container-highest text-outline group-hover:text-on-surface transition-colors"} title={"Inspect"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"chevron_right"}</span>{"\n"}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"1"} data-code={"200"} data-duration={"87ms"} data-endpoint={"Payment Processor"} data-event={"payment.succeeded"} data-id={"del_01j98fx88a"} data-status={"DELIVERED"} data-time={"20:01:58"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"20:01:58"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"18s ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  payment.succeeded\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"Payment Processor"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-primary/10 text-primary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  DELIVERED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-primary font-medium whitespace-nowrap"}>{"200 OK"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"87ms"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"1"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"p-1 rounded hover:bg-surface-container-highest text-outline group-hover:text-on-surface transition-colors"} title={"Inspect"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"chevron_right"}</span>{"\n"}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container-highest relative transition-colors"} data-attempts={"3"} data-code={"503"} data-duration={"5.00s"} data-endpoint={"CRM Sync"} data-event={"user.created"} data-id={"del_01j98fx129a"} data-status={"FAILED"} data-time={"19:58:43"} id={"activeRow"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap relative"}>{"\n"}<div className={"absolute left-0 top-0 bottom-0 w-1 bg-error"}></div>{"\n"}<span className={"font-medium text-on-surface"}>{"19:58:43"}</span>{"\n"}<span className={"text-error text-body-sm block"}>{"3m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5 text-error"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>{"\n                  user.created\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"CRM Sync"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-error-container/30 text-error"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>{"\n                  FAILED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error font-medium whitespace-nowrap"}>{"503 Service Unavailable"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error whitespace-nowrap"}>{"5.00s"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error font-medium whitespace-nowrap"}>{"3 / 3"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"retry-btn inline-flex items-center gap-1 bg-surface-container hover:bg-surface-container-low text-error px-2 py-1 rounded text-code-sm font-medium transition-colors"} onClick={(event) => { event.stopPropagation(); alert('Retrying delivery del_01j98fx129a...'); } }>{"\n"}<span className={"material-symbols-outlined text-body-sm"}>{"replay"}</span>{"\n                  Retry Delivery\n                "}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"1"} data-code={"200"} data-duration={"231ms"} data-endpoint={"Slack Notifications"} data-event={"payment.failed"} data-id={"del_01j98fe341b"} data-status={"DELIVERED"} data-time={"20:00:05"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"20:00:05"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"2m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  payment.failed\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"Slack Notifications"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-primary/10 text-primary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  DELIVERED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-primary font-medium whitespace-nowrap"}>{"200 OK"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"231ms"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"1"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"p-1 rounded hover:bg-surface-container-highest text-outline group-hover:text-on-surface transition-colors"} title={"Inspect"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"chevron_right"}</span>{"\n"}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"2"} data-code={"\u2014"} data-duration={"\u2014"} data-endpoint={"CRM Sync"} data-event={"subscription.changed"} data-id={"del_01j98fa909k"} data-status={"RETRYING"} data-time={"19:57:12"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"19:57:12"}</span>{"\n"}<span className={"text-secondary text-body-sm block"}>{"5m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5 text-secondary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"}></span>{"\n                  subscription.changed\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"CRM Sync"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-secondary-container/30 text-secondary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-secondary"}></span>{"\n                  RETRYING\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"\u2014"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"\u2014"}</td>{"\n"}<td className={"py-space-sm px-space-md text-secondary font-medium whitespace-nowrap"}>{"2 / 5"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"retry-btn inline-flex items-center gap-1 bg-secondary-container/40 hover:bg-secondary-container text-secondary px-2 py-1 rounded text-code-sm font-medium transition-colors"} onClick={(event) => { event.stopPropagation(); alert('Initiating immediate manual retry...'); } }>{"\n"}<span className={"material-symbols-outlined text-body-sm"}>{"bolt"}</span>{"\n                  Retry Now\n                "}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"1"} data-code={"201"} data-duration={"98ms"} data-endpoint={"Production Orders"} data-event={"order.fulfilled"} data-id={"del_01j98f7734a"} data-status={"DELIVERED"} data-time={"19:55:44"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"19:55:44"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"7m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  order.fulfilled\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"Production Orders"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-primary/10 text-primary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  DELIVERED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-primary font-medium whitespace-nowrap"}>{"201 Created"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"98ms"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"1"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"p-1 rounded hover:bg-surface-container-highest text-outline group-hover:text-on-surface transition-colors"} title={"Inspect"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"chevron_right"}</span>{"\n"}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"1"} data-code={"422"} data-duration={"312ms"} data-endpoint={"Payment Processor"} data-event={"refund.created"} data-id={"del_01j98f4411p"} data-status={"FAILED"} data-time={"19:52:01"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"19:52:01"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"10m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5 text-error"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>{"\n                  refund.created\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"Payment Processor"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-error-container/30 text-error"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>{"\n                  FAILED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error font-medium whitespace-nowrap"}>{"422 Unprocessable"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"312ms"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error whitespace-nowrap"}>{"1 / 3"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"retry-btn inline-flex items-center gap-1 bg-surface-container hover:bg-surface-container-low text-error px-2 py-1 rounded text-code-sm font-medium transition-colors"} onClick={(event) => { event.stopPropagation(); alert('Retrying refund payload...'); } }>{"\n"}<span className={"material-symbols-outlined text-body-sm"}>{"replay"}</span>{"\n                  Retry Delivery\n                "}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"1"} data-code={"200"} data-duration={"156ms"} data-endpoint={"Production Orders"} data-event={"order.updated"} data-id={"del_01j98f2190z"} data-status={"DELIVERED"} data-time={"19:48:33"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"19:48:33"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"14m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  order.updated\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"Production Orders"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-primary/10 text-primary"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n                  DELIVERED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-primary font-medium whitespace-nowrap"}>{"200 OK"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"156ms"}</td>{"\n"}<td className={"py-space-sm px-space-md text-outline whitespace-nowrap"}>{"1"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"p-1 rounded hover:bg-surface-container-highest text-outline group-hover:text-on-surface transition-colors"} title={"Inspect"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"chevron_right"}</span>{"\n"}</button>{"\n"}</td>{"\n"}</tr>{"\n"}{"\n"}<tr className={"delivery-row group cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors"} data-attempts={"3"} data-code={"500"} data-duration={"2.10s"} data-endpoint={"CRM Sync"} data-event={"user.updated"} data-id={"del_01j98ex881a"} data-status={"FAILED"} data-time={"19:45:07"}>{"\n"}<td className={"py-space-sm px-space-md text-on-surface whitespace-nowrap"}>{"\n"}<span className={"font-medium text-on-surface"}>{"19:45:07"}</span>{"\n"}<span className={"text-outline text-body-sm block"}>{"17m ago"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface font-medium whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1.5 text-error"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>{"\n                  user.updated\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"\n"}<span className={"bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface"}>{"CRM Sync"}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md whitespace-nowrap"}>{"\n"}<span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-error-container/30 text-error"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>{"\n                  FAILED\n                "}</span>{"\n"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error font-medium whitespace-nowrap"}>{"500 Server Error"}</td>{"\n"}<td className={"py-space-sm px-space-md text-on-surface-variant whitespace-nowrap"}>{"2.10s"}</td>{"\n"}<td className={"py-space-sm px-space-md text-error whitespace-nowrap"}>{"3 / 3"}</td>{"\n"}<td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>{"\n"}<button className={"retry-btn inline-flex items-center gap-1 bg-surface-container hover:bg-surface-container-low text-error px-2 py-1 rounded text-code-sm font-medium transition-colors"} onClick={(event) => { event.stopPropagation(); alert('Retrying CRM User update...'); } }>{"\n"}<span className={"material-symbols-outlined text-body-sm"}>{"replay"}</span>{"\n                  Retry Delivery\n                "}</button>{"\n"}</td>{"\n"}</tr>{"\n"}</tbody>{"\n"}</table>{"\n"}</div>{"\n"}{"\n"}<div className={"p-space-sm bg-surface-container-lowest flex items-center justify-between font-code-sm text-code-sm text-outline"}>{"\n"}<div className={"flex items-center gap-space-sm"}>{"\n"}<span>{"Batch sync: "}<strong className={"text-on-surface font-medium"}>{"9.2k events/hr"}</strong></span>{"\n"}<span>{"\u2022"}</span>{"\n"}<span className={"text-primary flex items-center gap-1"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary"}></span>{"\n            Broker ack: 11ms\n          "}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<button className={"px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant disabled:opacity-40"} disabled={true}>{"Previous"}</button>{"\n"}<span className={"px-2 text-on-surface"}>{"Page 1 of 1"}</span>{"\n"}<button className={"px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant disabled:opacity-40"} disabled={true}>{"Next"}</button>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"w-full xl:w-[480px] shrink-0 bg-surface-container-low rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300"} id={"inspectorDrawer"}>{"\n"}{"\n"}<div className={"p-space-md bg-surface-container flex items-center justify-between"}>{"\n"}<div className={"flex flex-col gap-0.5"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"font-code-md text-code-md font-semibold text-on-surface"} id={"drawerEventTitle"}>{"user.created"}</span>{"\n"}<span className={"px-1.5 py-0.5 rounded text-code-sm font-code-sm bg-error-container/30 text-error font-medium"} id={"drawerBadge"}>{"503 FAILED"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-space-xs text-outline font-code-sm text-code-sm"}>{"\n"}<span>{"ID:"}</span>{"\n"}<span className={"text-on-surface-variant selection:bg-primary selection:text-background"} id={"drawerDeliveryId"}>{"del_01j98fx129a"}</span>{"\n"}<button className={"hover:text-primary transition-colors flex items-center"} onClick={(event) => { navigator.clipboard.writeText('del_01j98fx129a') } } title={"Copy ID"}>{"\n"}<span className={"material-symbols-outlined text-body-sm"}>{"content_copy"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<button className={"bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md px-space-sm py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm"} id={"quickRetryBtn"}>{"\n"}<span className={"material-symbols-outlined text-body-sm font-bold"}>{"replay"}</span>{"\n            Quick Retry\n          "}</button>{"\n"}<button className={"text-outline hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high transition-colors"} id={"closeDrawerBtn"} title={"Close Panel"}>{"\n"}<span className={"material-symbols-outlined text-headline-sm"}>{"close"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}<div className={"p-space-md flex flex-col gap-space-md overflow-y-auto max-h-[calc(100vh-210px)]"}>{"\n"}{"\n"}<div className={"grid grid-cols-2 gap-space-xs bg-surface-container-lowest p-space-sm rounded-lg font-code-sm text-code-sm"}>{"\n"}<div className={"flex flex-col gap-0.5"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"ENDPOINT"}</span>{"\n"}<span className={"text-on-surface font-medium"} id={"drawerEndpoint"}>{"CRM Sync"}</span>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-0.5"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"TOTAL DURATION"}</span>{"\n"}<span className={"text-error font-medium"} id={"drawerDuration"}>{"5.00s (Timeout)"}</span>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-0.5 mt-2"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"ATTEMPTS"}</span>{"\n"}<span className={"text-on-surface font-medium"} id={"drawerAttemptsCount"}>{"3 Attempts executed"}</span>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-0.5 mt-2"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"RECORDED TIMESTAMP"}</span>{"\n"}<span className={"text-on-surface font-medium"} id={"drawerTimestamp"}>{"Sep 26, 19:58:43 UTC"}</span>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<span className={"font-label-sm text-label-sm uppercase tracking-wider text-outline"}>{"EXECUTION TIMELINE"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-outline"}>{"Max backoff 15s"}</span>{"\n"}</div>{"\n"}<div className={"bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-space-sm"}>{"\n"}{"\n"}<div className={"flex items-start justify-between text-code-sm font-code-sm"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"w-2 h-2 rounded-full bg-error"}></span>{"\n"}<span className={"text-on-surface font-medium"}>{"Attempt 3"}</span>{"\n"}<span className={"px-1 rounded bg-error-container/20 text-error font-medium"}>{"503 Gateway Timeout"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-2 text-outline"}>{"\n"}<span>{"5.00s"}</span>{"\n"}<span>{"19:58:43"}</span>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex items-start justify-between text-code-sm font-code-sm"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"w-2 h-2 rounded-full bg-error/70"}></span>{"\n"}<span className={"text-on-surface-variant"}>{"Attempt 2"}</span>{"\n"}<span className={"px-1 rounded bg-error-container/10 text-error/80"}>{"503 Timeout"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-2 text-outline"}>{"\n"}<span>{"1.80s"}</span>{"\n"}<span>{"19:58:40"}</span>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex items-start justify-between text-code-sm font-code-sm"}>{"\n"}<div className={"flex items-center gap-space-xs"}>{"\n"}<span className={"w-2 h-2 rounded-full bg-error/50"}></span>{"\n"}<span className={"text-on-surface-variant"}>{"Attempt 1"}</span>{"\n"}<span className={"px-1 rounded bg-error-container/10 text-error/80"}>{"503 Service Unavailable"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-2 text-outline"}>{"\n"}<span>{"2.10s"}</span>{"\n"}<span>{"19:58:35"}</span>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<span className={"font-label-sm text-label-sm uppercase tracking-wider text-outline"}>{"OUTBOUND HTTP REQUEST"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-primary"}>{"POST"}</span>{"\n"}</div>{"\n"}<div className={"bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-space-sm font-code-sm text-code-sm"}>{"\n"}<div className={"text-on-surface break-all bg-surface-container p-2 rounded text-code-sm font-medium"}>{"\n"}<span className={"text-primary font-bold mr-1"}>{"POST"}</span>{"https://crm.acme.internal/api/hubspot-ingest\n            "}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-1 text-on-surface-variant pt-1"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"HEADERS"}</span>{"\n"}<div className={"grid grid-cols-3 gap-1 p-1 bg-surface-container rounded"}>{"\n"}<span className={"text-outline"}>{"x-hookdeck-id:"}</span>{"\n"}<span className={"col-span-2 text-on-surface truncate"}>{"del_01j98fx129a"}</span>{"\n"}<span className={"text-outline"}>{"content-type:"}</span>{"\n"}<span className={"col-span-2 text-on-surface"}>{"application/json"}</span>{"\n"}<span className={"text-outline"}>{"user-agent:"}</span>{"\n"}<span className={"col-span-2 text-on-surface"}>{"Hookdeck/2.0-core"}</span>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-1 pt-1"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"BODY (JSON)"}</span>{"\n"}<button className={"hover:text-primary text-outline flex items-center gap-1 text-label-sm"} onClick={(event) => { navigator.clipboard.writeText(document.getElementById('rawJsonBody').innerText) } }>{"\n"}<span className={"material-symbols-outlined text-body-sm"}>{"content_copy"}</span>{"\n                  Copy Body\n                "}</button>{"\n"}</div>{"\n"}<pre className={"p-2.5 rounded bg-surface-container text-on-surface overflow-x-auto text-code-sm leading-relaxed"} id={"rawJsonBody"}><code>{"{\n  \"event\": \"user.created\",\n  \"data\": {\n    \"user_id\": \"usr_9921448\",\n    \"email\": \"sarah.connor@sky.net\",\n    \"tier\": \"enterprise_scale\",\n    \"attributes\": {\n      \"region\": \"us-east-1\",\n      \"seats\": 45\n    }\n  },\n  \"published_at\": 1727380723\n}"}</code></pre>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-space-xs"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<span className={"font-label-sm text-label-sm uppercase tracking-wider text-outline"}>{"UPSTREAM HTTP RESPONSE"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-error"}>{"HTTP/1.1 503"}</span>{"\n"}</div>{"\n"}<div className={"bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-space-sm font-code-sm text-code-sm"}>{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"RESPONSE HEADERS"}</span>{"\n"}<div className={"grid grid-cols-3 gap-1 p-1 bg-surface-container rounded text-on-surface-variant"}>{"\n"}<span className={"text-outline"}>{"content-length:"}</span>{"\n"}<span className={"col-span-2 text-on-surface"}>{"42"}</span>{"\n"}<span className={"text-outline"}>{"server:"}</span>{"\n"}<span className={"col-span-2 text-on-surface"}>{"envoy/1.26.1"}</span>{"\n"}</div>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-1 pt-1"}>{"\n"}<span className={"text-outline text-label-sm font-label-sm"}>{"BODY (RAW RESPONSE)"}</span>{"\n"}<pre className={"p-2.5 rounded bg-surface-container text-error overflow-x-auto text-code-sm leading-relaxed"}><code>{"{\n  \"error\": \"upstream timeout\",\n  \"code\": \"GATEWAY_TIMEOUT\"\n}"}</code></pre>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</main></div></div>;
// }



import { useEffect, useState } from 'react';
import { getDeliveries } from '../api/deliveries';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../screens/Sidebar';

function formatDate(date) {
  if (!date) return '—';

  return new Date(date).toLocaleString();
}

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthLoading } = useAuth();
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // useEffect(() => {
  //   let cancelled = false;

  //   async function loadDeliveries() {
  //     try {
  //       setLoading(true);
  //       setError('');

  //       const data = await getDeliveries();

  //       if (!cancelled) {
  //         setDeliveries(Array.isArray(data) ? data : []);
  //       }
  //     } catch (err) {
  //       if (!cancelled) {
  //         setError(
  //           err.response?.data?.message ||
  //           'Could not load deliveries.'
  //         );
  //       }
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   }

  //   loadDeliveries();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  useEffect(() => {
    if (isAuthLoading) return;

    let cancelled = false;

    async function loadDeliveries() {
      try {
        setLoading(true);
        setError('');

        const data = await getDeliveries();

        console.log("Deliveries API response:", data);
        console.log("Is array:", Array.isArray(data));
        console.log("Number of deliveries:", data?.length);

        if (!cancelled) {
          setDeliveries(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Deliveries fetch failed:', err.response?.data || err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            err.message ||
            'Could not load deliveries.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDeliveries();

    return () => {
      cancelled = true;
    };
  }, [isAuthLoading]);

  if (loading) {
    return <div className="p-6">Loading deliveries...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Sidebar />

      <div className="min-h-screen pl-64">

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Deliveries</h1>
              <p className="text-gray-500">
                Track webhook delivery attempts and their results.
              </p>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Total deliveries</p>
                <h2 className="mt-2 text-2xl font-bold">
                  {deliveries.length}
                </h2>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Successful</p>
                <h2 className="mt-2 text-2xl font-bold text-green-600">
                  {deliveries.filter(d => d.status === 'success').length}
                </h2>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Failed</p>
                <h2 className="mt-2 text-2xl font-bold text-red-500">
                  {deliveries.filter(d => d.status === 'failed').length}
                </h2>
              </div>
            </div>

            {deliveries.length === 0 ? (
              <div className="rounded-xl border p-10 text-center">
                <h2 className="font-semibold">No deliveries yet</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Create an event with an active endpoint to see deliveries here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="p-4">Event</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">HTTP status</th>
                      <th className="p-4">Response time</th>
                      <th className="p-4">Attempt</th>
                      <th className="p-4">Created</th>
                    </tr>
                  </thead>

                  <tbody>
                    {deliveries.map(delivery => (
                      <tr key={delivery._id} 
                      onClick={() => setSelectedDelivery(delivery)}
                      className="border-t cursor-pointer hover:bg-surface-container transition-colors"
                      >
                        <td className="p-4 font-medium">
                          {delivery.event || 'Unknown event'}
                        </td>

                        <td className="p-4">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${delivery.status === 'success'
                                ? 'bg-green-100 text-green-700'
                                : delivery.status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                          >
                            {delivery.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {delivery.httpStatus ?? '—'}
                        </td>

                        <td className="p-4">
                          {delivery.responseTimeMs != null
                            ? `${delivery.responseTimeMs} ms`
                            : '—'}
                        </td>

                        <td className="p-4">
                          {delivery.attempt ?? 1}
                        </td>

                        <td className="p-4">
                          {formatDate(delivery.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Delivery Details Modal */}
            {selectedDelivery && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setSelectedDelivery(null)}
              >
                <div
                  className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-outline-variant/20 bg-surface p-6 text-on-surface shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold">
                        Delivery Details
                      </h2>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        {selectedDelivery.event || 'Unknown event'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDelivery(null)}
                      className="rounded-lg p-2 hover:bg-surface-container-high"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-outline-variant/20 p-4">
                      <p className="text-sm text-on-surface-variant">Status</p>
                      <p className="mt-2 font-semibold">
                        {selectedDelivery.status || 'Unknown'}
                      </p>
                    </div>

                    <div className="rounded-xl border border-outline-variant/20 p-4">
                      <p className="text-sm text-on-surface-variant">HTTP Status</p>
                      <p className="mt-2 font-semibold">
                        {selectedDelivery.httpStatus ?? '—'}
                      </p>
                    </div>

                    <div className="rounded-xl border border-outline-variant/20 p-4">
                      <p className="text-sm text-on-surface-variant">Response Time</p>
                      <p className="mt-2 font-semibold">
                        {selectedDelivery.responseTimeMs != null
                          ? `${selectedDelivery.responseTimeMs} ms`
                          : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-2 font-semibold">Request Payload</h3>
                      <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-surface-container p-4 text-sm">
                        {JSON.stringify(
                          selectedDelivery.requestPayload ?? {},
                          null,
                          2
                        )}
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">Response Body</h3>
                      <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-surface-container p-4 text-sm">
                        {typeof selectedDelivery.responseBody === 'string'
                          ? selectedDelivery.responseBody
                          : JSON.stringify(
                              selectedDelivery.responseBody ?? 'No response body',
                              null,
                              2
                            )}
                      </pre>
                    </div>

                    {selectedDelivery.errorMessage && (
                      <div>
                        <h3 className="mb-2 font-semibold text-red-500">
                          Error Details
                        </h3>
                        <pre className="whitespace-pre-wrap break-words rounded-xl bg-red-500/10 p-4 text-sm text-red-500">
                          {selectedDelivery.errorMessage}
                        </pre>
                      </div>
                    )}

                    <div className="space-y-1 text-sm text-on-surface-variant">
                      <p>Attempt: {selectedDelivery.attempt ?? 1}</p>
                      <p>Created: {formatDate(selectedDelivery.createdAt)}</p>
                      <p>Delivery ID: {selectedDelivery._id}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}