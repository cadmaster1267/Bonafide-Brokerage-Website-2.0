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
        <button class="ls-bio" data-open-modal="${modalID}">
            <div class="listing-card-images-area">
                <img src="icons/house-icon-fancy.png" alt="" class="listing-images">
            </div>

            <div class="listing-card-info">
                <div>
                    $${listing.price.toLocaleString()}
                </div>
            </div>
        </button>
      `;



      container.appendChild(card);











      // Create the modal
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


      // Open modal
      const openButton = card.querySelector("[data-open-modal]");

      openButton.addEventListener("click", () => {
        modal.showModal();
      });


      // Close modal
      const closeButton = modal.querySelector("[data-close-modal]");

      closeButton.addEventListener("click", () => {
        modal.close();
      });


      // Close when clicking outside modal
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