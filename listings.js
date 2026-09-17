fetch("listings.json")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("listings-container");

    data.forEach(listing => {

      // ========================================
      // GET FEATURE DATA
      // ========================================

      const interior = listing.features.find(
        feature => feature.headerInterior
      );

      const property = listing.features.find(
        feature => feature.headerProperty
      );

      const utilities = listing.features.find(
        feature => feature.headerUtilities
      );

      const community = listing.features.find(
        feature => feature.headerCommunity
      );

      const financial = listing.features.find(
        feature => feature.headerFinancial
      );


      // ========================================
      // CREATE THE CARD
      // ========================================

      const card = document.createElement("div");

      card.classList.add("listing-card");

      const modalID = `listing-${listing.listingID}`;


      // ========================================
      // CARD HTML
      // ========================================

      card.innerHTML = `
        <div class="ls-bio">

          <div class="listing-card-images-area">

            <img
              src="${listing.images[0]}"
              alt="${listing.address}"
              class="listing-images"
            >

          </div>


          <button
            class="listing-card-info"
            data-open-modal="${modalID}"
            type="button"
          >

            <div class="listing-price">
              $${listing.price.toLocaleString()}
            </div>

            <div class="listing-details">

              <span>
                ${interior.bedrooms} Beds
              </span>

              <span>
                ${interior.fullBaths + (interior.halfBaths * 0.5)} Baths
              </span>

              <span>
                ${property.squareFootage.toLocaleString()} Sq Ft
              </span>

            </div>

            <div class="listing-property-type">
              ${listing.propertyType}
            </div>

            <div class="listing-address">
              ${listing.address}
            </div>

          </button>

        </div>
      `;


      container.appendChild(card);


      // ========================================
      // CREATE THE MODAL
      // ========================================

      const modal = document.createElement("dialog");

      modal.setAttribute("data-modal", modalID);


      modal.innerHTML = `
        <div class="listing-modal">


          <!-- ================================= -->
          <!-- MODAL HEADER -->
          <!-- ================================= -->

          <div class="modal-header">

            <h2>
              ${listing.address}
            </h2>

            <p class="modal-price">
              $${listing.price.toLocaleString()}
            </p>

          </div>


          <!-- ================================= -->
          <!-- IMAGE CAROUSEL -->
          <!-- ================================= -->

          <div class="modal-image-carousel">

            <button
              class="modal-image-arrow modal-image-arrow-left"
              type="button"
            >
              &#10094;
            </button>


            <div class="modal-image-container">

              ${listing.images.map((image, index) => `
                <img
                  src="${image}"
                  alt="${listing.address}"
                  class="modal-listing-image"
                  data-image-index="${index}"
                >
              `).join("")}

            </div>


            <button
              class="modal-image-arrow modal-image-arrow-right"
              type="button"
            >
              &#10095;
            </button>

          </div>


          <!-- IMAGE COUNTER -->

          <div class="modal-image-counter">
            <span class="current-image">1</span>
            /
            ${listing.images.length}
          </div>


          <!-- ================================= -->
          <!-- DESCRIPTION -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              Description
            </h3>

            <p>
              ${listing.descriptionShort}
            </p>

          </section>


          <!-- ================================= -->
          <!-- LISTING INFORMATION -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              Listing Information
            </h3>

            <p>
              <strong>Listing ID:</strong>
              ${listing.listingID}
            </p>

            <p>
              <strong>MLS Number:</strong>
              ${listing.listingNumberMLS}
            </p>

            <p>
              <strong>Property Type:</strong>
              ${listing.propertyType}
            </p>

            <p>
              <strong>HVAC:</strong>
              ${listing.HVAC ? "Yes" : "No"}
            </p>

          </section>


          <!-- ================================= -->
          <!-- INTERIOR -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              ${interior.headerInterior}
            </h3>

            <p>
              <strong>Bedrooms:</strong>
              ${interior.bedrooms}
            </p>

            <p>
              <strong>Full Baths:</strong>
              ${interior.fullBaths}
            </p>

            <p>
              <strong>Half Baths:</strong>
              ${interior.halfBaths}
            </p>

            <p>
              <strong>Total Baths:</strong>
              ${interior.fullBaths + (interior.halfBaths * 0.5)}
            </p>

          </section>


          <!-- ================================= -->
          <!-- PROPERTY -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              ${property.headerProperty}
            </h3>

            <p>
              <strong>Garage:</strong>
              ${property.garage}
            </p>

            <p>
              <strong>Stories:</strong>
              ${property.stories}
            </p>

            <p>
              <strong>Lot Size:</strong>
              ${property.lotSize}
            </p>

            <p>
              <strong>Square Footage:</strong>
              ${property.squareFootage.toLocaleString()} Sq Ft
            </p>

            <p>
              <strong>Year Built:</strong>
              ${property.yearBuilt}
            </p>

            <p>
              <strong>Parcel Number:</strong>
              ${property.parcelNumber}
            </p>

            <p>
              <strong>Zoning:</strong>
              ${property.zoning}
            </p>

            <p>
              <strong>New Construction:</strong>
              ${property.newConstruction ? "Yes" : "No"}
            </p>

            <p>
              <strong>Foundation:</strong>
              ${property.foundation}
            </p>

            <p>
              <strong>Roof:</strong>
              ${property.roof}
            </p>

          </section>


          <!-- ================================= -->
          <!-- UTILITIES & GREEN ENERGY -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              ${utilities.headerUtilities}
            </h3>

            <p>
              <strong>Gas:</strong>
              ${utilities.gas ? "Yes" : "No"}
            </p>

            <p>
              <strong>Sewer:</strong>
              ${utilities.sewer}
            </p>

            <p>
              <strong>Solar Hook-Up:</strong>
              ${utilities.solarHookUp ? "Yes" : "No"}
            </p>

            <p>
              <strong>Networking:</strong>
              ${utilities.networking}
            </p>

            <p>
              <strong>Smart Home Certified:</strong>
              ${utilities.smartHomeCertified ? "Yes" : "No"}
            </p>

            <p>
              <strong>Energy Star Rating:</strong>
              ${utilities.energyStarRating}
            </p>

          </section>


          <!-- ================================= -->
          <!-- COMMUNITY & HOA -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              ${community.headerCommunity}
            </h3>

            <p>
              <strong>Has HOA:</strong>
              ${community.hasHOA ? "Yes" : "No"}
            </p>

            <p>
              <strong>HOA Fees:</strong>
              ${community.feesHOA}
            </p>

            <p>
              <strong>Region:</strong>
              ${community.region}
            </p>

          </section>


          <!-- ================================= -->
          <!-- FINANCIAL & LISTING DETAILS -->
          <!-- ================================= -->

          <section class="modal-section">

            <h3>
              Value and Listing Details
            </h3>

            <p>
              <strong>Price Per Sq Ft:</strong>
              $${financial.pricePSQF}
            </p>

            <p>
              <strong>Tax Assessed Value:</strong>
              $${financial.taxAssessedValue.toLocaleString()}
            </p>

            <p>
              <strong>Date on Market:</strong>
              ${financial.dateOnMarket}
            </p>

            <p>
              <strong>Listing Agreement:</strong>
              ${financial.listingAgreement}
            </p>

          </section>


          <!-- ================================= -->
          <!-- CLOSE BUTTON -->
          <!-- ================================= -->

          <button
            data-close-modal
            type="button"
          >
            Close
          </button>


        </div>
      `;


      document.body.appendChild(modal);


      // ========================================
      // MODAL IMAGE CAROUSEL
      // ========================================

      const imageContainer = modal.querySelector(
        ".modal-image-container"
      );

      const leftArrow = modal.querySelector(
        ".modal-image-arrow-left"
      );

      const rightArrow = modal.querySelector(
        ".modal-image-arrow-right"
      );

      const currentImage = modal.querySelector(
        ".current-image"
      );


      // Current image number
      let currentImageIndex = 0;


      // Show the selected image
      function showImage(index) {

        currentImageIndex = index;

        imageContainer.scrollTo({
          left: imageContainer.clientWidth * index,
          behavior: "smooth"
        });

        currentImage.textContent = index + 1;

      }


      // ========================================
      // RIGHT ARROW
      // ========================================

      rightArrow.addEventListener("click", (event) => {

        event.stopPropagation();

        if (currentImageIndex < listing.images.length - 1) {

          showImage(currentImageIndex + 1);

        }

      });


      // ========================================
      // LEFT ARROW
      // ========================================

      leftArrow.addEventListener("click", (event) => {

        event.stopPropagation();

        if (currentImageIndex > 0) {

          showImage(currentImageIndex - 1);

        }

      });


      // ========================================
      // OPEN MODAL
      // ========================================

      const openButton = card.querySelector(
        "[data-open-modal]"
      );

      openButton.addEventListener("click", () => {

        currentImageIndex = 0;

        showImage(0);

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

    console.error(
      "Error loading listings:",
      error
    );

  });
