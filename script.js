document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================
     HELPERS
  ========================================= */

  const $ = (
    selector,
    root = document
  ) => root.querySelector(selector);


  const $$ = (
    selector,
    root = document
  ) => [
    ...root.querySelectorAll(selector)
  ];


  const pad = (number) =>
    String(number).padStart(
      2,
      "0"
    );


  /* =========================================
     TEMPORARY MEMORY DATA

     Nanti bagian ini diganti data Supabase.
  ========================================= */

  const memories = [

    {
      id: 1,

      title:
        "Jalan sore",

      date:
        "2026-06-07",

      location:
        "Cirebon",

      caption:
        "Nggak harus selalu tentang tempat yang luar biasa. Kadang yang bikin sebuah hari tetap diingat justru siapa yang ada di sana.",

      image:
        "https://picsum.photos/seed/senn-memory-01/1000/1200",

      favorite:
        true,

      tags: [
        "jalan",
        "sore",
        "together"
      ]
    },


    {
      id: 2,

      title:
        "Random photo",

      date:
        "2026-06-15",

      location:
        "Cirebon",

      caption:
        "Foto yang awalnya biasa aja, tapi entah kenapa akhirnya jadi salah satu yang paling aku suka.",

      image:
        "https://picsum.photos/seed/senn-memory-02/1000/1200",

      favorite:
        false,

      tags: [
        "random",
        "photo"
      ]
    },


    {
      id: 3,

      title:
        "Hari itu",

      date:
        "2026-07-04",

      location:
        "Cirebon",

      caption:
        "Ada hari yang nggak perlu dibuat dramatis untuk tetap punya tempat sendiri di ingatan.",

      image:
        "https://picsum.photos/seed/senn-memory-03/1000/1200",

      favorite:
        true,

      tags: [
        "day",
        "memory"
      ]
    },


    {
      id: 4,

      title:
        "Sunset",

      date:
        "2026-07-07",

      location:
        "Cirebon",

      caption:
        "Langitnya bagus. Tapi alasan kenapa aku masih ingat hari ini bukan cuma karena langitnya.",

      image:
        "https://picsum.photos/seed/senn-memory-04/1000/1200",

      favorite:
        true,

      tags: [
        "sunset",
        "evening"
      ]
    },


    {
      id: 5,

      title:
        "Makan bareng",

      date:
        "2026-07-28",

      location:
        "Cirebon",

      caption:
        "Momen sederhana yang mungkin kelihatan biasa dari luar. Buat arsip ini, tetap penting.",

      image:
        "https://picsum.photos/seed/senn-memory-05/1000/1200",

      favorite:
        false,

      tags: [
        "food",
        "together"
      ]
    },


    {
      id: 6,

      title:
        "Another day",

      date:
        "2026-08-02",

      location:
        "Cirebon",

      caption:
        "Satu hari lagi yang akhirnya punya koordinat sendiri di antara semua memory lainnya.",

      image:
        "https://picsum.photos/seed/senn-memory-06/1000/1200",

      favorite:
        false,

      tags: [
        "daily",
        "random"
      ]
    },


    {
      id: 7,

      title:
        "Favorite moment",

      date:
        "2026-08-17",

      location:
        "Cirebon",

      caption:
        "Beberapa memory nggak perlu alasan panjang buat jadi favorit.",

      image:
        "https://picsum.photos/seed/senn-memory-07/1000/1200",

      favorite:
        true,

      tags: [
        "favorite",
        "us"
      ]
    },


    {
      id: 8,

      title:
        "Just us",

      date:
        "2026-09-03",

      location:
        "Cirebon",

      caption:
        "Satu frame kecil dari sesuatu yang jauh lebih besar dari sekadar sebuah foto.",

      image:
        "https://picsum.photos/seed/senn-memory-08/1000/1200",

      favorite:
        true,

      tags: [
        "us",
        "photo"
      ]
    },


    {
      id: 9,

      title:
        "Night memory",

      date:
        "2026-09-19",

      location:
        "Cirebon",

      caption:
        "Ada beberapa hal yang justru terasa lebih jelas ketika hari sudah mulai gelap.",

      image:
        "https://picsum.photos/seed/senn-memory-09/1000/1200",

      favorite:
        false,

      tags: [
        "night",
        "city"
      ]
    },


    {
      id: 10,

      title:
        "One more memory",

      date:
        "2026-10-04",

      location:
        "Cirebon",

      caption:
        "Arsip ini bertambah satu lagi. Mungkin kecil, tapi tetap bagian dari semuanya.",

      image:
        "https://picsum.photos/seed/senn-memory-10/1000/1200",

      favorite:
        false,

      tags: [
        "October",
        "memory"
      ]
    },


    {
      id: 11,

      title:
        "A quiet moment",

      date:
        "2026-10-17",

      location:
        "Cirebon",

      caption:
        "Nggak banyak yang terjadi. Dan mungkin justru itu yang bikin momennya terasa tenang.",

      image:
        "https://picsum.photos/seed/senn-memory-11/1000/1200",

      favorite:
        true,

      tags: [
        "quiet",
        "favorite"
      ]
    },


    {
      id: 12,

      title:
        "Today",

      date:
        "2026-10-20",

      location:
        "Cirebon",

      caption:
        "Memory terbaru untuk sebuah tempat yang akan terus bertambah seiring waktu.",

      image:
        "https://picsum.photos/seed/senn-memory-12/1000/1200",

      favorite:
        true,

      tags: [
        "today",
        "new"
      ]
    }

  ];


  /* =========================================
     STATE
  ========================================= */

  let currentMemoryIndex =
    memories.length - 1;

  let activeView =
    "home";

  let galleryFilter =
    "all";


  /* =========================================
     ELEMENTS
  ========================================= */

  const views =
    $$(".view");

  const navigationButtons =
    $$("[data-view]");


  const memoryNodes =
    $("#memoryNodes");

  const memoryCore =
    $("#memoryCore");

  const coreImage =
    $("#coreImage");

  const coreTitle =
    $("#coreTitle");

  const coreDate =
    $("#coreDate");

  const currentMemoryNumber =
    $("#currentMemoryNumber");

  const totalMemoryNumber =
    $("#totalMemoryNumber");


  const previousMemoryButton =
    $("#previousMemoryButton");

  const nextMemoryButton =
    $("#nextMemoryButton");


  const memoryCount =
    $("#memoryCount");

  const dayCount =
    $("#dayCount");

  const placeCount =
    $("#placeCount");


  const randomMemoryButton =
    $("#randomMemoryButton");

  const randomMemoryCard =
    $("#randomMemoryCard");


  const miniTimeline =
    $("#miniTimeline");

  const timelineList =
    $("#timelineList");

  const galleryGrid =
    $("#galleryGrid");


  const expandedCoreNodes =
    $("#expandedCoreNodes");

  const expandedCoreCenter =
    $("#expandedCoreCenter");

  const expandedCoreImage =
    $("#expandedCoreImage");

  const expandedCoreTitle =
    $("#expandedCoreTitle");

  const expandedCoreDate =
    $("#expandedCoreDate");

  const expandedCoreLocation =
    $("#expandedCoreLocation");


  const memoryModal =
    $("#memoryModal");

  const modalBackdrop =
    $("#modalBackdrop");

  const closeMemoryButton =
    $("#closeMemoryButton");

  const detailImage =
    $("#detailImage");

  const detailIndex =
    $("#detailIndex");

  const detailTotal =
    $("#detailTotal");

  const detailDate =
    $("#detailDate");

  const detailLocation =
    $("#detailLocation");

  const detailTitle =
    $("#detailTitle");

  const detailCaption =
    $("#detailCaption");

  const detailTags =
    $("#detailTags");

  const detailPreviousButton =
    $("#detailPreviousButton");

  const detailNextButton =
    $("#detailNextButton");

  const favoriteButton =
    $("#favoriteButton");


  /* =========================================
     DATE
  ========================================= */

  function getDateObject(memory) {

    return new Date(
      `${memory.date}T12:00:00`
    );

  }


  function formatDate(memory) {

    return getDateObject(memory)
      .toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );

  }


  function getMonthName(
    monthIndex
  ) {

    return new Date(
      2026,
      monthIndex,
      1
    ).toLocaleDateString(
      "id-ID",
      {
        month: "short"
      }
    );

  }


  /* =========================================
     VIEW NAVIGATION
  ========================================= */

  function showView(name) {

    activeView =
      name;


    views.forEach((view) => {

      view.classList.toggle(
        "is-active",
        view.dataset.viewPanel ===
          name
      );

    });


    navigationButtons.forEach(
      (button) => {

        button.classList.toggle(
          "is-active",
          button.dataset.view ===
            name
        );

      }
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  navigationButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const target =
            button.dataset.view;

          if (!target) {
            return;
          }

          showView(target);

        }
      );

    }
  );


  $("#brandButton")
    ?.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        showView("home");

      }
    );


  /* =========================================
     SELECT MEMORY
  ========================================= */

  function selectMemory(
    index,
    open = false
  ) {

    if (
      index < 0 ||
      index >= memories.length
    ) {
      return;
    }


    currentMemoryIndex =
      index;


    updateCore();

    updateExpandedCore();


    if (open) {
      openMemory(index);
    }

  }


  /* =========================================
     UPDATE CORE
  ========================================= */

  function updateCore() {

    const memory =
      memories[
        currentMemoryIndex
      ];


    if (!memory) {
      return;
    }


    coreImage.src =
      memory.image;

    coreImage.alt =
      memory.title;

    coreTitle.textContent =
      memory.title;

    coreDate.textContent =
      formatDate(memory);

    currentMemoryNumber.textContent =
      pad(
        currentMemoryIndex + 1
      );

    totalMemoryNumber.textContent =
      pad(memories.length);


    $$(".memory-node")
      .forEach(
        (node) => {

          node.classList.toggle(
            "is-active",
            Number(
              node.dataset.index
            ) ===
              currentMemoryIndex
          );

        }
      );

  }


  /* =========================================
     HOME NODES
  ========================================= */

  const nodePositions = [

    [11, 24],
    [24, 67],
    [37, 18],
    [66, 18],
    [82, 33],
    [77, 70],
    [60, 78],
    [32, 81]

  ];


  function renderMemoryNodes() {

    memoryNodes.innerHTML =
      "";


    const visibleMemories =
      memories.slice(-8);


    const startIndex =
      memories.length -
      visibleMemories.length;


    visibleMemories.forEach(
      (memory, localIndex) => {

        const realIndex =
          startIndex +
          localIndex;


        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";

        button.className =
          "memory-node";

        button.dataset.index =
          realIndex;


        const position =
          nodePositions[
            localIndex %
            nodePositions.length
          ];


        button.style.left =
          `${position[0]}%`;

        button.style.top =
          `${position[1]}%`;


        button.innerHTML = `
          <img
            src="${memory.image}"
            alt="${memory.title}"
          >
        `;


        button.addEventListener(
          "click",
          () => {

            selectMemory(
              realIndex
            );

          }
        );


        memoryNodes.appendChild(
          button
        );

      }
    );

  }


  /* =========================================
     PREVIOUS / NEXT
  ========================================= */

  function previousMemory(
    open = false
  ) {

    const index =
      (
        currentMemoryIndex -
        1 +
        memories.length
      ) %
      memories.length;


    selectMemory(
      index,
      open
    );

  }


  function nextMemory(
    open = false
  ) {

    const index =
      (
        currentMemoryIndex +
        1
      ) %
      memories.length;


    selectMemory(
      index,
      open
    );

  }


  previousMemoryButton
    ?.addEventListener(
      "click",
      () => {

        previousMemory();

      }
    );


  nextMemoryButton
    ?.addEventListener(
      "click",
      () => {

        nextMemory();

      }
    );


  memoryCore
    ?.addEventListener(
      "click",
      () => {

        openMemory(
          currentMemoryIndex
        );

      }
    );


  /* =========================================
     STATS
  ========================================= */

  function renderStats() {

    memoryCount.textContent =
      memories.length;


    const places =
      new Set(
        memories
          .map(
            (memory) =>
              memory.location
          )
          .filter(Boolean)
      );


    placeCount.textContent =
      places.size;


    if (
      memories.length > 1
    ) {

      const first =
        getDateObject(
          memories[0]
        );

      const last =
        getDateObject(
          memories[
            memories.length - 1
          ]
        );


      const difference =
        Math.round(
          (
            last -
            first
          ) /
          86400000
        );


      dayCount.textContent =
        Math.max(
          1,
          difference
        );

    } else {

      dayCount.textContent =
        "1";

    }

  }


  /* =========================================
     RANDOM
  ========================================= */

  function openRandomMemory() {

    if (!memories.length) {
      return;
    }


    let randomIndex =
      currentMemoryIndex;


    if (memories.length > 1) {

      while (
        randomIndex ===
        currentMemoryIndex
      ) {

        randomIndex =
          Math.floor(
            Math.random() *
            memories.length
          );

      }

    }


    selectMemory(
      randomIndex,
      true
    );

  }


  randomMemoryButton
    ?.addEventListener(
      "click",
      openRandomMemory
    );


  randomMemoryCard
    ?.addEventListener(
      "click",
      openRandomMemory
    );


  /* =========================================
     MINI TIMELINE
  ========================================= */

  function renderMiniTimeline() {

    miniTimeline.innerHTML =
      "";


    const months =
      Array.from(
        {
          length: 12
        },
        (_, index) => index
      );


    months.forEach(
      (monthIndex) => {

        const memoriesInMonth =
          memories.filter(
            (memory) =>
              getDateObject(memory)
                .getMonth() ===
              monthIndex
          );


        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";

        button.className =
          "timeline-month";


        if (
          memoriesInMonth.length
        ) {

          button.classList.add(
            "has-memory"
          );

        }


        const currentMonth =
          getDateObject(
            memories[
              currentMemoryIndex
            ]
          ).getMonth();


        if (
          currentMonth ===
          monthIndex
        ) {

          button.classList.add(
            "is-active"
          );

        }


        button.innerHTML = `
          <i></i>
          <span>
            ${getMonthName(
              monthIndex
            )}
          </span>
        `;


        button.addEventListener(
          "click",
          () => {

            if (
              !memoriesInMonth.length
            ) {
              return;
            }


            const memory =
              memoriesInMonth[
                memoriesInMonth.length -
                1
              ];


            const index =
              memories.findIndex(
                (item) =>
                  item.id ===
                  memory.id
              );


            selectMemory(index);

            renderMiniTimeline();

          }
        );


        miniTimeline.appendChild(
          button
        );

      }
    );

  }


  /* =========================================
     TIMELINE PAGE
  ========================================= */

  function renderTimeline() {

    timelineList.innerHTML =
      "";


    const sorted =
      memories
        .map(
          (
            memory,
            index
          ) => ({
            memory,
            index
          })
        )
        .reverse();


    sorted.forEach(
      ({
        memory,
        index
      }) => {

        const article =
          document.createElement(
            "article"
          );


        article.className =
          "timeline-entry";


        article.innerHTML = `

          <div
            class="timeline-entry__date"
          >
            ${formatDate(memory)}
          </div>

          <span
            class="timeline-entry__dot"
          ></span>

          <button
            class="timeline-entry__card"
            type="button"
          >

            <img
              src="${memory.image}"
              alt="${memory.title}"
            >

            <div>

              <small>
                ${memory.location}
              </small>

              <h3>
                ${memory.title}
              </h3>

              <p>
                ${memory.caption}
              </p>

            </div>

          </button>

        `;


        article
          .querySelector(
            "button"
          )
          .addEventListener(
            "click",
            () => {

              selectMemory(
                index,
                true
              );

            }
          );


        timelineList.appendChild(
          article
        );

      }
    );

  }


  /* =========================================
     GALLERY
  ========================================= */

  function renderGallery() {

    galleryGrid.innerHTML =
      "";


    let filtered =
      memories
        .map(
          (
            memory,
            index
          ) => ({
            memory,
            index
          })
        );


    if (
      galleryFilter ===
      "favorite"
    ) {

      filtered =
        filtered.filter(
          ({ memory }) =>
            memory.favorite
        );

    }


    if (
      galleryFilter ===
      "2026"
    ) {

      filtered =
        filtered.filter(
          ({ memory }) =>
            memory.date
              .startsWith(
                "2026"
              )
        );

    }


    filtered
      .reverse()
      .forEach(
        ({
          memory,
          index
        }) => {

          const card =
            document.createElement(
              "button"
            );


          card.type =
            "button";

          card.className =
            "gallery-card";


          card.innerHTML = `

            <img
              src="${memory.image}"
              alt="${memory.title}"
              loading="lazy"
            >

${
  memory.favorite
    ? `
      <span
        class="gallery-card__favorite"
      >
        ♡
      </span>
    `
    : ""
}

<span
  class="gallery-card__overlay"
>

  <small>
    ${formatDate(memory)}
    ·
    ${memory.location}
  </small>

  <strong>
    ${memory.title}
  </strong>

</span>
`;


card.addEventListener(
  "click",
  () => {

    selectMemory(
      index,
      true
    );

  }
);


galleryGrid.appendChild(
  card
);

}
);

}


/* =========================================
   GALLERY FILTER
========================================= */

$$(".filter-button")
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          galleryFilter =
            button.dataset.filter;


          $$(".filter-button")
            .forEach(
              (item) => {

                item.classList.toggle(
                  "is-active",
                  item === button
                );

              }
            );


          renderGallery();

        }
      );

    }
  );


/* =========================================
   EXPANDED CORE
========================================= */

const expandedPositions = [

  [12, 26],
  [23, 66],
  [38, 12],
  [61, 10],
  [79, 26],
  [83, 63],
  [62, 79],
  [35, 81]

];


function renderExpandedNodes() {

  expandedCoreNodes.innerHTML =
    "";


  const visible =
    memories.slice(-8);


  const startIndex =
    memories.length -
    visible.length;


  visible.forEach(
    (
      memory,
      localIndex
    ) => {

      const realIndex =
        startIndex +
        localIndex;


      const node =
        document.createElement(
          "button"
        );


      node.type =
        "button";

      node.className =
        "expanded-node";

      node.dataset.index =
        realIndex;


      const position =
        expandedPositions[
          localIndex %
          expandedPositions.length
        ];


      node.style.left =
        `${position[0]}%`;

      node.style.top =
        `${position[1]}%`;


      node.innerHTML = `
        <img
          src="${memory.image}"
          alt="${memory.title}"
        >
      `;


      node.addEventListener(
        "click",
        () => {

          selectMemory(
            realIndex
          );

        }
      );


      expandedCoreNodes
        .appendChild(node);

    }
  );

}


function updateExpandedCore() {

  const memory =
    memories[
      currentMemoryIndex
    ];


  if (!memory) {
    return;
  }


  expandedCoreImage.src =
    memory.image;

  expandedCoreImage.alt =
    memory.title;

  expandedCoreTitle.textContent =
    memory.title;

  expandedCoreDate.textContent =
    formatDate(memory);

  expandedCoreLocation.textContent =
    memory.location;


  $$(".expanded-node")
    .forEach(
      (node) => {

        node.classList.toggle(
          "is-active",
          Number(
            node.dataset.index
          ) ===
            currentMemoryIndex
        );

      }
    );

}


expandedCoreCenter
  ?.addEventListener(
    "click",
    () => {

      openMemory(
        currentMemoryIndex
      );

    }
  );


/* =========================================
   MEMORY MODAL
========================================= */

function openMemory(index) {

  if (
    index < 0 ||
    index >= memories.length
  ) {
    return;
  }


  currentMemoryIndex =
    index;


  const memory =
    memories[index];


  detailImage.src =
    memory.image;

  detailImage.alt =
    memory.title;

  detailIndex.textContent =
    pad(index + 1);

  detailTotal.textContent =
    pad(memories.length);

  detailDate.textContent =
    formatDate(memory);

  detailLocation.textContent =
    memory.location;

  detailTitle.textContent =
    memory.title;

  detailCaption.textContent =
    memory.caption;


  detailTags.innerHTML =
    memory.tags
      .map(
        (tag) =>
          `<span>#${tag}</span>`
      )
      .join("");


  favoriteButton
    .classList.toggle(
      "is-favorite",
      memory.favorite
    );


  favoriteButton.textContent =
    memory.favorite
      ? "♥"
      : "♡";


  memoryModal.classList.add(
    "is-open"
  );


  memoryModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  updateCore();
  updateExpandedCore();
  renderMiniTimeline();

}


function closeMemory() {

  memoryModal.classList.remove(
    "is-open"
  );


  memoryModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


modalBackdrop
  ?.addEventListener(
    "click",
    closeMemory
  );


closeMemoryButton
  ?.addEventListener(
    "click",
    closeMemory
  );


detailPreviousButton
  ?.addEventListener(
    "click",
    () => {

      previousMemory(true);

    }
  );


detailNextButton
  ?.addEventListener(
    "click",
    () => {

      nextMemory(true);

    }
  );


favoriteButton
  ?.addEventListener(
    "click",
    () => {

      const memory =
        memories[
          currentMemoryIndex
        ];


      memory.favorite =
        !memory.favorite;


      favoriteButton
        .classList.toggle(
          "is-favorite",
          memory.favorite
        );


      favoriteButton.textContent =
        memory.favorite
          ? "♥"
          : "♡";


      renderGallery();

    }
  );


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !memoryModal
        .classList
        .contains(
          "is-open"
        )
    ) {
      return;
    }


    if (
      event.key ===
      "Escape"
    ) {

      closeMemory();

    }


    if (
      event.key ===
      "ArrowLeft"
    ) {

      previousMemory(true);

    }


    if (
      event.key ===
      "ArrowRight"
    ) {

      nextMemory(true);

    }

  }
);


/* =========================================
   INITIALIZE
========================================= */

function initialize() {

  renderMemoryNodes();

  renderExpandedNodes();

  renderStats();

  renderMiniTimeline();

  renderTimeline();

  renderGallery();

  updateCore();

  updateExpandedCore();

}


initialize();

});
