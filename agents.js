fetch("agents.json")
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("agents-container");

        data.forEach(agent => {

            // Create the card
            const card = document.createElement("div");

            card.classList.add("agent-card");


            // Create the agent's full name
            const fullName = `${agent.firstName} ${agent.lastName}`;


            // Create the card
            card.innerHTML = `

                <div class="agent-bio">

                    <!-- Agent Photo -->
                    <div class="agent-image-area">

                        <img 
                            src="${agent.photo}"
                            alt="${fullName}"
                            class="agent-image"
                        >

                    </div>


                    <!-- Agent Information -->
                    <div class="agent-info">

                        <h2 class="agent-name">
                            ${fullName}
                        </h2>

                        <div class="agent-title">
                            ${agent.title}
                        </div>

                        <div class="agent-license">
                            License # ${agent.licenseNumber}
                        </div>

                        <div class="agent-contact">

                            <a 
                                href="tel:${agent.phone}"
                                class="agent-contact-link"
                            >
                                ${agent.phone}
                            </a>

                            <a 
                                href="mailto:${agent.email}"
                                class="agent-contact-link"
                            >
                                ${agent.email}
                            </a>

                        </div>


                        <button 
                            class="agent-details-button"
                            data-open-agent="${agent.agentID}"
                        >
                            View Agent
                        </button>

                    </div>

                </div>


                <!-- Agent Modal -->

                <dialog 
                    id="agent-${agent.agentID}"
                    class="agent-modal"
                >

                    <div class="agent-modal-content">

                        <button 
                            class="agent-modal-close"
                            data-close-agent
                            type="button"
                        >
                            &times;
                        </button>


                        <img 
                            src="${agent.photo}"
                            alt="${fullName}"
                            class="agent-modal-image"
                        >


                        <h2>
                            ${fullName}
                        </h2>

                        <div class="agent-modal-title">
                            ${agent.title}
                        </div>

                        <div class="agent-modal-license">
                            License # ${agent.licenseNumber}
                        </div>

                        <div class="agent-modal-contact">

                            <a 
                                href="tel:${agent.phone}"
                                class="agent-modal-contact-button"
                            >
                                Call Agent
                            </a>

                            <a 
                                href="mailto:${agent.email}"
                                class="agent-modal-contact-button"
                            >
                                Email Agent
                            </a>

                        </div>


                        <p class="agent-modal-bio">
                            ${agent.shortBio}
                        </p>


                        <h3>
                            Areas of Service
                        </h3>

                        <ul class="agent-specialties">

                            ${agent.specialties.map(specialty => `
                                <li>${specialty}</li>
                            `).join("")}

                        </ul>


                        

                    </div>

                </dialog>

            `;


            container.appendChild(card);


            // ========================================
            // OPEN MODAL
            // ========================================

            const openButton = card.querySelector(
                "[data-open-agent]"
            );

            const modal = card.querySelector(
                `#agent-${agent.agentID}`
            );

            const closeButton = card.querySelector(
                "[data-close-agent]"
            );


            openButton.addEventListener("click", () => {
                modal.showModal();
            });


            // ========================================
            // CLOSE MODAL
            // ========================================

            closeButton.addEventListener("click", () => {
                modal.close();
            });


            // Close when clicking outside modal content
            modal.addEventListener("click", (event) => {

                const content = modal.querySelector(
                    ".agent-modal-content"
                );

                if (!content.contains(event.target)) {
                    modal.close();
                }

            });

        });

    })
    .catch(error => {

        console.error("Error loading agents:", error);

    });