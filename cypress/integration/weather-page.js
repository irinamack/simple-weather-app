const city = "Vilnius";
const country = "Lithuania";

context("Searching form", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env("host")}`)
    });

    it("button disabled on load", (done) => {
        cy.get('[data-test="search-btn"]').click();
        cy.once("fail", (err) => {
            expect(err.message).to.include("cy.click() failed because this element is disabled");
            done();
        });
    });

    it('succesfully display founded city weather ', () => {
        cy.fillSearchingForm(city, country);
        cy.get('[data-test="search-btn"]').click().then(() => {
            cy.get('[data-test="city-name"]').contains(city)
            }
        )
    })
});
