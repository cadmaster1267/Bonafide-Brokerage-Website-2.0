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

      const schools = listing.features.find(
        feature => feature.headerSchools
      );

      const financial = listing.features.find(
        feature => feature.headerFinancial
      );

      // ========================================
      // CALCULATE DAYS ON MARKET
      // ========================================

      const dateOnMarket = new Date(financial.dateOnMarket);
      const today = new Date();

      const millisecondsPerDay = 1000 * 60 * 60 * 24;

      const daysOnMarket = Math.floor(
        (today - dateOnMarket) / millisecondsPerDay
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

            <div class="listing-status">
                ${financial.listingStatus}
            </div>

            <img
                src="${listing.images[0]}"
                alt="${listing.address}"
                class="listing-images"
            >

          </div>


          <div class="listing-card-info-wrapper">

              <button
                  class="listing-card-info"
                  data-open-modal="${modalID}"
                  type="button"
              >
                  <div class="listing-price">
                      $${listing.price.toLocaleString()}
                  </div>

                  <div class="listing-details">
                      <span>${interior.bedrooms} Beds</span>
                      <span>${interior.fullBaths + (interior.halfBaths * 0.5)} Baths</span>
                      <span>${property.squareFootage.toLocaleString()} Sq Ft</span>
                  </div>

                  <div class="listing-property-type">
                      ${listing.propertyType}
                  </div>

                  <div class="listing-address">
                      ${listing.address}
                  </div>

                  <div class="listing-days-on-market">
                      Listed ${daysOnMarket === 0 
                        ? "today" 
                        : `${daysOnMarket} ${daysOnMarket === 1 ? "day" : "days"} ago`}
                  </div>
              </button>

              <button
                  class="send-listing-link"
                  type="button"
                  data-listing-id="${listing.listingID}"
              >
                  Copy Link
              </button>

          </div>

        </div>
      `;


      container.appendChild(card);

      const sendLinkButton = card.querySelector(".send-listing-link");

      sendLinkButton.addEventListener("click", async (event) => {
          event.stopPropagation();

          const listingURL =
              `${window.location.origin}${window.location.pathname}?listing=${listing.listingID}`;

          try {
              await navigator.clipboard.writeText(listingURL);

              const originalText = sendLinkButton.textContent;

              sendLinkButton.textContent = "✓ Link Copied";

              setTimeout(() => {
                  sendLinkButton.textContent = originalText;
              }, 2000);

          } catch (error) {
              console.error("Could not copy listing link:", error);

              // Fallback
              window.prompt(
                  "Copy this listing link:",
                  listingURL
              );
          }
      });


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

          <div class="modal-share-container">

              <button
                class="modal-send-listing-link"
                type="button"
                data-listing-id="${listing.listingID}"
              >
                Copy Link
              </button>

              <a
                class="modal-email-listing"
                href="mailto:joan.bonafide@gmail.com?subject=${encodeURIComponent(
                  `Inquiry About ${listing.address}`
                )}&body=${encodeURIComponent(
                  `Hello,

          I am interested in this property:

          Address: ${listing.address}
          Listing ID: ${listing.listingID}
          MLS Number: ${listing.listingNumberMLS}
          Price: $${listing.price.toLocaleString()}

          Please fill out the information below to allow us to better help you:

          Name:
          Phone#:

          Thank you.`
                )}"
              >
                ✉ Email About This Listing
              </a>

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

            <p>
              <strong>Open House:</strong>
              ${listing.openHouse}
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
              <strong>MLS Number:</strong>
              ${listing.listingNumberMLS}
            </p>

            <p>
              <strong>Property Type:</strong>
              ${listing.commercialORresidential} ${listing.propertyType}
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
              ${property.newConstruction}
            </p>

            <p>
              <strong>Foundation:</strong>
              ${property.foundation}
            </p>

            <p>
              <strong>Roof:</strong>
              ${property.roof}
            </p>

            <p>
              <strong>Pool:</strong>
              ${property.pool ? "Yes" : "No"}
            </p>

            <p>
              <strong>RV Parking:</strong>
              ${property.rvParking ? "Yes" : "No"}
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
              <strong>Electric:</strong>
              ${utilities.electric}
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

            <p>
              <strong>Potable Water:</strong>
              ${utilities.water}
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
          <!-- SCHOOL ZONES -->
          <!-- ================================= -->

          <section class="modal-section">

              <h3>
                  ${schools.headerSchools}
              </h3>

              <div class="school-row">
                  <strong>School District:</strong>
                  ${schools.schoolDistrict}
                  <a
                      href="${schools.schoolDistrictSite}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="school-site-link"
                  >
                      Visit Site
                  </a>
              </div>

              <div class="school-row">
                  <strong>Elementary School:</strong>
                  ${schools.elememtarySchool}
                  <a
                      href="${schools.elememtarySchoolSite}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="school-site-link"
                  >
                      Visit Site
                  </a>
              </div>

              <div class="school-row">
                  <strong>Middle School:</strong>
                  ${schools.middleSchool}
                  <a
                      href="${schools.middleSchoolSite}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="school-site-link"
                  >
                      Visit Site
                  </a>
              </div>

              <div class="school-row">
                  <strong>High School:</strong>
                  ${schools.highSchool}
                  <a
                      href="${schools.highSchoolSite}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="school-site-link"
                  >
                      Visit Site
                  </a>
              </div>

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
      // MODAL SEND LINK
      // ========================================

      const modalSendLinkButton =
        modal.querySelector(".modal-send-listing-link");

      modalSendLinkButton.addEventListener("click", async (event) => {

        event.stopPropagation();

        const listingURL =
          `${window.location.origin}${window.location.pathname}?listing=${listing.listingID}`;

        try {

          await navigator.clipboard.writeText(listingURL);

          const originalText =
            modalSendLinkButton.textContent;

          modalSendLinkButton.textContent =
            "✓ Link Copied";

          setTimeout(() => {

            modalSendLinkButton.textContent =
              originalText;

          }, 2000);

        } catch (error) {

          console.error(
            "Could not copy listing link:",
            error
          );

          window.prompt(
            "Copy this listing link:",
            listingURL
          );

        }

      });

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

    }); // END data.forEach

          // ========================================
          // OPEN MODAL FROM URL
          // ========================================

          const urlParams = new URLSearchParams(window.location.search);
          const sharedListingID = urlParams.get("listing");

          if (sharedListingID) {

            const targetModal = document.querySelector(
              `[data-modal="listing-${sharedListingID}"]`
            );

            if (targetModal) {

              // Find the listing's first image
              const targetImageContainer =
                targetModal.querySelector(".modal-image-container");

              const targetCurrentImage =
                targetModal.querySelector(".current-image");

              if (targetImageContainer && targetCurrentImage) {

                targetImageContainer.scrollTo({
                  left: 0,
                  behavior: "instant"
                });

                targetCurrentImage.textContent = "1";

              }

              targetModal.showModal();

            }

          }

    })

  .catch(error => {

    console.error(
      "Error loading listings:",
      error
    );

  });
