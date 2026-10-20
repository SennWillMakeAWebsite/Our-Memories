document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const pad = (number) =>
    String(number).padStart(2, "0");

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


  /* =========================================================
     MEMORY DATA
     Sementara masih dummy.
     Nanti bagian ini diganti Supabase.
  ========================================================= */

  const memories = [
    {
      id: 1,

      title: "The Beginning",

      date: "2026-01-12",

      caption:
        "Some memories don't need to be perfect. They only need to mean something.",

      image:
        "https://picsum.photos/seed/husen-ike-01/1200/1500",

      favorite: true,

      tags: [
        "us",
        "beginning"
      ]
    },

    {
      id: 2,

      title: "A Quiet Moment",

      date: "2026-02-08",

      caption:
        "Nothing extraordinary happened. Somehow, that's exactly why I remember it.",

      image:
        "https://picsum.photos/seed/husen-ike-02/1200/1500",

      favorite: false,

      tags: [
        "quiet",
        "memory"
      ]
    },

    {
      id: 3,

      title: "That Day",

      date: "2026-03-19",

      caption:
        "Just another day from the outside. A little more important from here.",

      image:
        "https://picsum.photos/seed/husen-ike-03/1200/1500",

      favorite: true,

      tags: [
        "together",
        "day"
      ]
    },

    {
      id: 4,

      title: "One of Those Days",

      date: "2026-04-11",

      caption:
        "A small piece of time that somehow stayed longer than expected.",

      image:
        "https://picsum.photos/seed/husen-ike-04/1200/1500",

      favorite: false,

      tags: [
        "moment",
        "ordinary"
      ]
    },

    {
      id: 5,

      title: "Still Here",

      date: "2026-05-24",

      caption:
        "Time kept moving, but some things were worth keeping exactly where they were.",

      image:
        "https://picsum.photos/seed/husen-ike-05/1200/1500",

      favorite: true,

      tags: [
        "remember",
        "us"
      ]
    },

    {
      id: 6,

      title: "A Little Chaos",

      date: "2026-06-16",

      caption:
        "Not every good memory is calm. Some of them are good because everything was a mess.",

      image:
        "https://picsum.photos/seed/husen-ike-06/1200/1500",

      favorite: false,

      tags: [
        "chaos",
        "fun"
      ]
    },

    {
      id: 7,

      title: "Something Simple",

      date: "2026-07-07",

      caption:
        "No big story. No dramatic scene. Just something simple that felt worth remembering.",

      image:
        "https://picsum.photos/seed/husen-ike-07/1200/1500",

      favorite: false,

      tags: [
        "simple",
        "together"
      ]
    },

    {
      id: 8,

      title: "The Good Part",

      date: "2026-08-21",

      caption:
        "If the whole day disappeared and only this part remained, that would still be enough.",

      image:
        "https://picsum.photos/seed/husen-ike-08/1200/1500",

      favorite: true,

      tags: [
        "favorite",
        "moment"
      ]
    },

    {
      id: 9,

      title: "Another Piece of Us",

      date: "2026-09-05",

      caption:
        "Another little piece added to a collection that was never really planned.",

      image:
        "https://picsum.photos/seed/husen-ike-09/1200/1500",

      favorite: false,

      tags: [
        "archive",
        "us"
      ]
    },

    {
      id: 10,

      title: "Worth Keeping",

      date: "2026-09-27",

      caption:
        "Some things deserve more than becoming another photo buried somewhere in a gallery.",

      image:
        "https://picsum.photos/seed/husen-ike-10/1200/1500",

      favorite: true,

      tags: [
        "keep",
        "favorite"
      ]
    },

    {
      id: 11,

      title: "Between Everything",

      date: "2026-10-08",

      caption:
        "Somewhere between everything that happened, there was this.",

      image:
        "https://picsum.photos/seed/husen-ike-11/1200/1500",

      favorite: false,

      tags: [
        "between",
        "memory"
      ]
    },

    {
      id: 12,

      title: "Another Chapter",

      date: "2026-10-19",

      caption:
        "Not the end of anything. Just another page that happened to be worth saving.",

      image:
        "https://picsum.photos/seed/husen-ike-12/1200/1500",

      favorite: true,

      tags: [
        "chapter",
        "us"
      ]
    }
  ];


  /* =========================================================
     DOM
  ========================================================= */

  const brandButton =
    $("#brandButton");

  const orbitNodes =
    $("#orbitNodes");

  const featuredGrid =
    $("#featuredGrid");

  const galleryGrid =
    $("#galleryGrid");

  const fullCoreNodes =
    $("#fullCoreNodes");

  const randomMemoryButton =
    $("#randomMemoryButton");

  const galleryRandomButton =
    $("#galleryRandomButton");


  /* FOCUS */

  const focusOverlay =
    $("#focusOverlay");

  const focusBackdrop =
    $("#focusBackdrop");

  const focusCloseButton =
    $("#focusCloseButton");

  const focusPhoto =
    $("#focusPhoto");

  const focusImage =
    $("#focusImage");

  const focusCurrentNumber =
    $("#focusCurrentNumber");

  const focusTotalNumber =
    $("#focusTotalNumber");

  const focusTitle =
    $("#focusTitle");

  const focusDate =
    $("#focusDate");

  const focusCaption =
    $("#focusCaption");

  const focusTags =
    $("#focusTags");

  const focusPreviousButton =
    $("#focusPreviousButton");

  const focusNextButton =
    $("#focusNextButton");

  const focusFavoriteButton =
    $("#focusFavoriteButton");

  const transitionLayer =
    $("#transitionLayer");


  /* =========================================================
     STATE
  ========================================================= */

  let currentMemoryIndex = 0;

  let galleryFilter = "all";

  let activeSourceElement = null;

  let isAnimating = false;


  /* =========================================================
     DATE FORMAT
  ========================================================= */

  function formatDate(memory) {
    const date =
      new Date(
        `${memory.date}T12:00:00`
      );

    return new Intl.DateTimeFormat(
      "en-US",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    )
      .format(date)
      .toUpperCase();
  }


  /* =========================================================
     NAVIGATION
  ========================================================= */

  function showView(viewName) {
    $$(".view").forEach((view) => {
      view.classList.toggle(
        "is-active",
        view.dataset.viewPanel === viewName
      );
    });


    $$("[data-view]").forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.view === viewName
      );
    });


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  $$("[data-view]").forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        showView(
          button.dataset.view
        );
      }
    );
  });


  brandButton?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      showView("home");
    }
  );


  /* =========================================================
     ORBIT POSITIONS
  ========================================================= */

  const orbitPositions = [
    [11, 31],
    [22, 68],
    [34, 19],
    [50, 11],
    [67, 20],
    [87, 34],
    [79, 69],
    [62, 82]
  ];


  /* =========================================================
     CREATE IMAGE
  ========================================================= */

  function createImage(memory) {
    const image =
      document.createElement("img");

    image.src =
      memory.image;

    image.alt =
      memory.title;

    image.loading =
      "lazy";

    return image;
  }


  /* =========================================================
     HOME ORBIT
  ========================================================= */

  function renderOrbitNodes() {
    orbitNodes.innerHTML = "";

    const visibleMemories =
      memories.slice(-8);

    const startIndex =
      memories.length -
      visibleMemories.length;


    visibleMemories.forEach(
      (memory, localIndex) => {
        const realIndex =
          startIndex + localIndex;

        const position =
          orbitPositions[
            localIndex %
            orbitPositions.length
          ];


        const node =
          document.createElement(
            "button"
          );

        node.type =
          "button";

        node.className =
          "memory-node";

        node.dataset.index =
          realIndex;

        node.style.left =
          `${position[0]}%`;

        node.style.top =
          `${position[1]}%`;


        const image =
          createImage(memory);

        node.appendChild(image);


        const number =
          document.createElement(
            "span"
          );

        number.className =
          "memory-node__index";

        number.textContent =
          pad(realIndex + 1);

        node.appendChild(number);


        node.addEventListener(
          "click",
          () => {
            openMemory(
              realIndex,
              node
            );
          }
        );


        orbitNodes.appendChild(
          node
        );
      }
    );
  }


  /* =========================================================
     FEATURED MEMORIES
  ========================================================= */

  function renderFeatured() {
    featuredGrid.innerHTML = "";

    const featuredIndexes = [
      memories.length - 1,
      memories.length - 3,
      memories.length - 5
    ];


    featuredIndexes.forEach(
      (memoryIndex) => {
        const memory =
          memories[memoryIndex];

        if (!memory) {
          return;
        }


        const card =
          document.createElement(
            "button"
          );

        card.type =
          "button";

        card.className =
          "featured-card";

        card.dataset.index =
          memoryIndex;


        const image =
          createImage(memory);

        card.appendChild(image);


        const info =
          document.createElement(
            "span"
          );

        info.className =
          "featured-card__info";


        const date =
          document.createElement(
            "small"
          );

        date.textContent =
          formatDate(memory);


        const title =
          document.createElement(
            "strong"
          );

        title.textContent =
          memory.title;


        info.appendChild(date);
        info.appendChild(title);

        card.appendChild(info);


        card.addEventListener(
          "click",
          () => {
            openMemory(
              memoryIndex,
              card
            );
          }
        );


        featuredGrid.appendChild(
          card
        );
      }
    );
  }


  /* =========================================================
     GALLERY
  ========================================================= */

  function getFilteredMemories() {
    return memories
      .map(
        (memory, index) => ({
          memory,
          index
        })
      )
      .filter(({ memory }) => {
        if (
          galleryFilter ===
          "favorite"
        ) {
          return memory.favorite;
        }

        return true;
      });
  }


  function renderGallery() {
    galleryGrid.innerHTML = "";

    const filtered =
      getFilteredMemories();


    filtered.forEach(
      ({ memory, index }) => {
        const card =
          document.createElement(
            "button"
          );

        card.type =
          "button";

        card.className =
          "gallery-card";

        card.dataset.index =
          index;


        const image =
          createImage(memory);

        card.appendChild(image);


        if (memory.favorite) {
          const favorite =
            document.createElement(
              "span"
            );

          favorite.className =
            "gallery-card__favorite";

          favorite.textContent =
            "♥";

          card.appendChild(
            favorite
          );
        }


        const info =
          document.createElement(
            "span"
          );

        info.className =
          "gallery-card__info";


        const date =
          document.createElement(
            "small"
          );

        date.textContent =
          formatDate(memory);


        const title =
          document.createElement(
            "strong"
          );

        title.textContent =
          memory.title;


        info.appendChild(date);
        info.appendChild(title);

        card.appendChild(info);


        card.addEventListener(
          "click",
          () => {
            openMemory(
              index,
              card
            );
          }
        );


        galleryGrid.appendChild(
          card
        );
      }
    );
  }


  $$(".filter-button").forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          galleryFilter =
            button.dataset.filter;


          $$(".filter-button").forEach(
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


  /* =========================================================
     FULL MEMORY CORE
  ========================================================= */

  const fullCorePositions = [
    [8, 39],
    [18, 70],
    [31, 17],
    [48, 9],
    [67, 16],
    [88, 37],
    [82, 70],
    [61, 84]
  ];


  function renderFullCore() {
    fullCoreNodes.innerHTML = "";

    const visibleMemories =
      memories.slice(-8);

    const startIndex =
      memories.length -
      visibleMemories.length;


    visibleMemories.forEach(
      (memory, localIndex) => {
        const realIndex =
          startIndex + localIndex;

        const position =
          fullCorePositions[
            localIndex %
            fullCorePositions.length
          ];


        const node =
          document.createElement(
            "button"
          );

        node.type =
          "button";

        node.className =
          "full-core-node";

        node.dataset.index =
          realIndex;

        node.style.left =
          `${position[0]}%`;

        node.style.top =
          `${position[1]}%`;


        node.appendChild(
          createImage(memory)
        );


        node.addEventListener(
          "click",
          () => {
            openMemory(
              realIndex,
              node
            );
          }
        );


        fullCoreNodes.appendChild(
          node
        );
      }
    );
  }


  /* =========================================================
     UPDATE FOCUS CONTENT
  ========================================================= */

  function updateFocusContent(index) {
    const memory =
      memories[index];

    if (!memory) {
      return;
    }


    currentMemoryIndex =
      index;


    focusImage.src =
      memory.image;

    focusImage.alt =
      memory.title;


    focusCurrentNumber.textContent =
      pad(index + 1);

    focusTotalNumber.textContent =
      pad(memories.length);


    focusTitle.textContent =
      memory.title;

    focusDate.textContent =
      formatDate(memory);

    focusCaption.textContent =
      memory.caption;


    focusTags.innerHTML = "";

    memory.tags.forEach((tag) => {
      const tagElement =
        document.createElement(
          "span"
        );

      tagElement.textContent =
        `#${tag}`;

      focusTags.appendChild(
        tagElement
      );
    });


    focusFavoriteButton
      .classList.toggle(
        "is-favorite",
        memory.favorite
      );


    focusFavoriteButton.textContent =
      memory.favorite
        ? "♥"
        : "♡";
  }


  /* =========================================================
     MUTE ORBIT NODES

     Saat satu foto dipilih,
     foto lain sedikit redup.
  ========================================================= */

  function muteNodes(
    selectedElement = null
  ) {
    $$(".memory-node, .full-core-node")
      .forEach((node) => {
        if (
          node !== selectedElement
        ) {
          node.classList.add(
            "is-muted"
          );
        }
      });
  }


  function restoreNodes() {
    $$(".memory-node, .full-core-node")
      .forEach((node) => {
        node.classList.remove(
          "is-muted"
        );
      });
  }


  /* =========================================================
     GET IMAGE FROM SOURCE
  ========================================================= */

  function getSourceImage(element) {
    if (!element) {
      return null;
    }

    if (
      element.tagName === "IMG"
    ) {
      return element;
    }

    return $("img", element);
  }


  /* =========================================================
     CREATE FLYING PHOTO

     Ini inti animasi zoom.
  ========================================================= */

  function createFlyingPhoto(
    sourceElement,
    memory
  ) {
    const sourceImage =
      getSourceImage(
        sourceElement
      );

    if (!sourceImage) {
      return null;
    }


    const sourceRect =
      sourceImage
        .getBoundingClientRect();


    const flying =
      document.createElement(
        "div"
      );

    flying.className =
      "flying-photo";


    flying.style.left =
      `${sourceRect.left}px`;

    flying.style.top =
      `${sourceRect.top}px`;

    flying.style.width =
      `${sourceRect.width}px`;

    flying.style.height =
      `${sourceRect.height}px`;


    const image =
      document.createElement(
        "img"
      );

    image.src =
      memory.image;

    image.alt = "";


    flying.appendChild(image);

    transitionLayer.appendChild(
      flying
    );


    return {
      element: flying,
      sourceRect
    };
  }


  /* =========================================================
     OPEN MEMORY
  ========================================================= */

  async function openMemory(
    index,
    sourceElement = null
  ) {
    if (isAnimating) {
      return;
    }


    if (
      index < 0 ||
      index >= memories.length
    ) {
      return;
    }


    isAnimating = true;

    currentMemoryIndex =
      index;

    activeSourceElement =
      sourceElement;


    const memory =
      memories[index];


    updateFocusContent(index);


    /*
      Kalau dibuka dari Random,
      keyboard navigation,
      atau sumber elemen tidak ada,
      pakai fade biasa.
    */

    if (!sourceElement) {
      focusOverlay.classList.add(
        "is-open"
      );

      focusOverlay.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "focus-open"
      );

      await wait(450);

      isAnimating = false;

      return;
    }


    muteNodes(sourceElement);


    const flyingData =
      createFlyingPhoto(
        sourceElement,
        memory
      );


    if (!flyingData) {
      focusOverlay.classList.add(
        "is-open"
      );

      focusOverlay.setAttribute(
              "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "focus-open"
      );

      restoreNodes();

      isAnimating = false;

      return;
    }


    const flying =
      flyingData.element;


    /*
      Overlay masuk lebih dulu,
      tapi foto utama disembunyikan
      sementara selama animasi.
    */

    focusOverlay.classList.add(
      "is-open"
    );

    focusOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "focus-open"
    );


    focusImage.style.opacity =
      "0";


    /*
      Kasih browser waktu untuk
      menggambar posisi awal foto.
    */

    await new Promise(
      (resolve) => {
        requestAnimationFrame(
          () => {
            requestAnimationFrame(
              resolve
            );
          }
        );
      }
    );


    const targetRect =
      focusPhoto
        .getBoundingClientRect();


    /*
      Foto bulat bergerak menuju
      focus view dan membesar.
    */

    flying.style.left =
      `${targetRect.left}px`;

    flying.style.top =
      `${targetRect.top}px`;

    flying.style.width =
      `${targetRect.width}px`;

    flying.style.height =
      `${targetRect.height}px`;

    flying.style.borderRadius =
      "0px";

    flying.style.boxShadow =
      "0 35px 100px rgba(45,42,65,.18)";


    await wait(720);


    focusImage.style.opacity =
      "1";

    flying.remove();

    restoreNodes();

    isAnimating = false;
  }


  /* =========================================================
     CLOSE MEMORY WITH REVERSE ANIMATION
  ========================================================= */

  async function closeMemory() {
    if (isAnimating) {
      return;
    }


    if (
      !focusOverlay.classList
        .contains("is-open")
    ) {
      return;
    }


    isAnimating = true;


    const memory =
      memories[
        currentMemoryIndex
      ];


    /*
      Cari foto asal supaya animasi
      bisa kembali ke tempat semula.
    */

    let destination =
      activeSourceElement;


    if (
      !destination ||
      !document.body.contains(
        destination
      )
    ) {
      destination =
        document.querySelector(
          `.memory-node[data-index="${currentMemoryIndex}"],
           .full-core-node[data-index="${currentMemoryIndex}"],
           .gallery-card[data-index="${currentMemoryIndex}"],
           .featured-card[data-index="${currentMemoryIndex}"]`
        );
    }


    const destinationImage =
      getSourceImage(destination);


    /*
      Kalau foto asal sudah tidak ada,
      cukup fade keluar.
    */

    if (!destinationImage) {
      focusOverlay.classList.remove(
        "is-open"
      );

      focusOverlay.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "focus-open"
      );

      activeSourceElement = null;

      await wait(400);

      isAnimating = false;

      return;
    }


    const startRect =
      focusPhoto
        .getBoundingClientRect();

    const destinationRect =
      destinationImage
        .getBoundingClientRect();


    const flying =
      document.createElement(
        "div"
      );

    flying.className =
      "flying-photo";


    flying.style.left =
      `${startRect.left}px`;

    flying.style.top =
      `${startRect.top}px`;

    flying.style.width =
      `${startRect.width}px`;

    flying.style.height =
      `${startRect.height}px`;

    flying.style.borderRadius =
      "0px";


    const image =
      document.createElement(
        "img"
      );

    image.src =
      memory.image;

    image.alt = "";


    flying.appendChild(image);

    transitionLayer.appendChild(
      flying
    );


    focusImage.style.opacity =
      "0";


    focusOverlay.classList.remove(
      "is-open"
    );


    await new Promise(
      (resolve) => {
        requestAnimationFrame(
          () => {
            requestAnimationFrame(
              resolve
            );
          }
        );
      }
    );


    /*
      Foto besar balik ke
      posisi foto asal.
    */

    flying.style.left =
      `${destinationRect.left}px`;

    flying.style.top =
      `${destinationRect.top}px`;

    flying.style.width =
      `${destinationRect.width}px`;

    flying.style.height =
      `${destinationRect.height}px`;

    flying.style.borderRadius =
      "50%";

    flying.style.boxShadow =
      "0 12px 32px rgba(40,40,55,.11)";


    await wait(720);


    flying.remove();


    focusImage.style.opacity =
      "1";


    focusOverlay.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "focus-open"
    );


    restoreNodes();


    activeSourceElement =
      null;


    isAnimating = false;
  }


  /* =========================================================
     NEXT / PREVIOUS
  ========================================================= */

  function showPreviousMemory() {
    if (isAnimating) {
      return;
    }


    currentMemoryIndex =
      (
        currentMemoryIndex -
        1 +
        memories.length
      ) %
      memories.length;


    activeSourceElement =
      null;


    animateFocusChange(
      currentMemoryIndex,
      "previous"
    );
  }


  function showNextMemory() {
    if (isAnimating) {
      return;
    }


    currentMemoryIndex =
      (
        currentMemoryIndex +
        1
      ) %
      memories.length;


    activeSourceElement =
      null;


    animateFocusChange(
      currentMemoryIndex,
      "next"
    );
  }


  /* =========================================================
     SMOOTH CHANGE INSIDE FOCUS
  ========================================================= */

  async function animateFocusChange(
    index,
    direction
  ) {
    if (isAnimating) {
      return;
    }


    isAnimating = true;


    const offset =
      direction === "next"
        ? -22
        : 22;


    focusImage.style.transition =
      "opacity .25s ease, transform .35s cubic-bezier(.22,1,.36,1)";

    focusImage.style.opacity =
      "0";

    focusImage.style.transform =
      `translateX(${offset}px) scale(1.02)`;


    focusTitle.style.transition =
      "opacity .2s ease, transform .3s cubic-bezier(.22,1,.36,1)";

    focusCaption.style.transition =
      "opacity .2s ease, transform .3s cubic-bezier(.22,1,.36,1)";


    focusTitle.style.opacity =
      "0";

    focusCaption.style.opacity =
      "0";


    focusTitle.style.transform =
      `translateX(${offset}px)`;

    focusCaption.style.transform =
      `translateX(${offset}px)`;


    await wait(260);


    updateFocusContent(index);


    const enterOffset =
      direction === "next"
        ? 22
        : -22;


    focusImage.style.transition =
      "none";

    focusTitle.style.transition =
      "none";

    focusCaption.style.transition =
      "none";


    focusImage.style.transform =
      `translateX(${enterOffset}px) scale(1.02)`;

    focusTitle.style.transform =
      `translateX(${enterOffset}px)`;

    focusCaption.style.transform =
      `translateX(${enterOffset}px)`;


    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        focusImage.style.transition =
          "opacity .35s ease, transform .55s cubic-bezier(.22,1,.36,1)";

        focusTitle.style.transition =
          "opacity .3s ease, transform .5s cubic-bezier(.22,1,.36,1)";

        focusCaption.style.transition =
          "opacity .3s ease .04s, transform .5s cubic-bezier(.22,1,.36,1)";


        focusImage.style.opacity =
          "1";

        focusTitle.style.opacity =
          "1";

        focusCaption.style.opacity =
          "1";


        focusImage.style.transform =
          "translateX(0) scale(1)";

        focusTitle.style.transform =
          "translateX(0)";

        focusCaption.style.transform =
          "translateX(0)";
      });
    });


    await wait(560);


    isAnimating = false;
  }


  /* =========================================================
     FAVORITE
  ========================================================= */

  focusFavoriteButton
    ?.addEventListener(
      "click",
      () => {
        const memory =
          memories[
            currentMemoryIndex
          ];


        memory.favorite =
          !memory.favorite;


        focusFavoriteButton
          .classList.toggle(
            "is-favorite",
            memory.favorite
          );


        focusFavoriteButton.textContent =
          memory.favorite
            ? "♥"
            : "♡";


        renderGallery();
      }
    );


  /* =========================================================
     FOCUS CONTROLS
  ========================================================= */

  focusPreviousButton
    ?.addEventListener(
      "click",
      showPreviousMemory
    );


  focusNextButton
    ?.addEventListener(
      "click",
      showNextMemory
    );


  focusCloseButton
    ?.addEventListener(
      "click",
      closeMemory
    );


  focusBackdrop
    ?.addEventListener(
      "click",
      closeMemory
    );


  /* =========================================================
     RANDOM MEMORY
  ========================================================= */

  function openRandomMemory() {
    let randomIndex =
      Math.floor(
        Math.random() *
        memories.length
      );


    if (
      memories.length > 1 &&
      randomIndex ===
        currentMemoryIndex
    ) {
      randomIndex =
        (
          randomIndex + 1
        ) %
        memories.length;
    }


    activeSourceElement =
      null;


    openMemory(
      randomIndex,
      null
    );
  }


  randomMemoryButton
    ?.addEventListener(
      "click",
      openRandomMemory
    );


  galleryRandomButton
    ?.addEventListener(
      "click",
      openRandomMemory
    );


  /* =========================================================
     KEYBOARD
  ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      const focusIsOpen =
        focusOverlay
          .classList
          .contains(
            "is-open"
          );


      if (!focusIsOpen) {
        return;
      }


      if (
        event.key ===
        "Escape"
      ) {
        closeMemory();

        return;
      }


      if (
        event.key ===
        "ArrowLeft"
      ) {
        showPreviousMemory();

        return;
      }


      if (
        event.key ===
        "ArrowRight"
      ) {
        showNextMemory();
      }
    }
  );


  /* =========================================================
     MOBILE SWIPE
  ========================================================= */

  let touchStartX = 0;

  let touchStartY = 0;


  focusPhoto
    ?.addEventListener(
      "touchstart",
      (event) => {
        const touch =
          event.changedTouches[0];

        touchStartX =
          touch.clientX;

        touchStartY =
          touch.clientY;
      },
      {
        passive: true
      }
    );


  focusPhoto
    ?.addEventListener(
      "touchend",
      (event) => {
        const touch =
          event.changedTouches[0];


        const deltaX =
          touch.clientX -
          touchStartX;

        const deltaY =
          touch.clientY -
          touchStartY;


        if (
          Math.abs(deltaY) >
          Math.abs(deltaX)
        ) {
          return;
        }


        if (
          Math.abs(deltaX) <
          55
        ) {
          return;
        }


        if (deltaX < 0) {
          showNextMemory();
        } else {
          showPreviousMemory();
        }
      },
      {
        passive: true
      }
    );


  /* =========================================================
     IMAGE ERROR FALLBACK
  ========================================================= */

  document.addEventListener(
    "error",
    (event) => {
      const target =
        event.target;


      if (
        !(target instanceof HTMLImageElement)
      ) {
        return;
      }


      if (
        target.dataset.fallback ===
        "true"
      ) {
        return;
      }


      target.dataset.fallback =
        "true";


      target.src =
        "https://picsum.photos/seed/senn-memory-fallback/1200/1500";
    },
    true
  );


  /* =========================================================
     PRELOAD
  ========================================================= */

  function preloadImages() {
    memories
      .slice(0, 6)
      .forEach(
        (memory) => {
          const image =
            new Image();

          image.src =
            memory.image;
        }
      );
  }


  /* =========================================================
     INITIALIZE
  ========================================================= */

  function initialize() {
    renderOrbitNodes();

    renderFeatured();

    renderGallery();

    renderFullCore();

    preloadImages();

    focusTotalNumber.textContent =
      pad(memories.length);
  }


  initialize();
});
