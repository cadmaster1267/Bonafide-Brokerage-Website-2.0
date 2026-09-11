fetch("listings.json")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("listings-container");

    data.forEach(listing => {

      // Create the card
      const card = document.createElement("div");
      card.classList.add("listing-card");

      const modalID = `listing-${listing.listingID}`;

      card.innerHTML = `
        <div class="ls-bio">

            <div class="listing-card-images-area">

                <button class="image-arrow image-arrow-left" type="button">
                    &#10094;
                </button>

                <div class="listing-images-container">
                    ${listing.images.map(image => `
                        <img 
                            src="${image}" 
                            alt="${listing.address}"
                            class="listing-images"
                        >
                    `).join("")}
                </div>

                <button class="image-arrow image-arrow-right" type="button">
                    &#10095;
                </button>

            </div>

            <button class="listing-card-info" data-open-modal="${modalID}">
                <div>
                    $${listing.price.toLocaleString()}
                </div>
            </button>

        </div>
      `;

      container.appendChild(card);


      // ========================================
      // IMAGE CAROUSEL ARROWS
      // ========================================

      const imageContainer = card.querySelector(
        ".listing-images-container"
      );

      const leftArrow = card.querySelector(
        ".image-arrow-left"
      );

      const rightArrow = card.querySelector(
        ".image-arrow-right"
      );


      // Right arrow
      rightArrow.addEventListener("click", (event) => {

        event.stopPropagation();

        imageContainer.scrollBy({
          left: imageContainer.clientWidth,
          behavior: "smooth"
        });

      });


      // Left arrow
      leftArrow.addEventListener("click", (event) => {

        event.stopPropagation();

        imageContainer.scrollBy({
          left: -imageContainer.clientWidth,
          behavior: "smooth"
        });

      });


      // ========================================
      // CREATE THE MODAL
      // ========================================

      const modal = document.createElement("dialog");

      modal.setAttribute("data-modal", modalID);

      modal.innerHTML = `
        <h2>${listing.address}</h2>

        <p>Listing ID: ${listing.listingID}</p>

        <p>Price: $${listing.price.toLocaleString()}</p>

        <button data-close-modal>
          Close
        </button>
      `;

      document.body.appendChild(modal);


      // ========================================
      // OPEN MODAL
      // ========================================

      const openButton = card.querySelector(
        "[data-open-modal]"
      );

      openButton.addEventListener("click", () => {
        modal.showModal();
      });


      // ========================================
      // CLOSE MODAL
      // ========================================

      const closeButton = modal.querySelector(
        "[data-close-modal]"
      );

      closeButton.addEventListener("click", () => {
        modal.close();
      });


      // ========================================
      // CLOSE WHEN CLICKING OUTSIDE MODAL
      // ========================================

      modal.addEventListener("click", (event) => {

        if (event.target === modal) {
          modal.close();
        }

      });

    });

  })
  .catch(error => {
    console.error("Error loading listings:", error);
  });