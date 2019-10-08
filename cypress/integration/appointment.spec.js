describe("Appointment", () => {
    beforeEach(() => {
        cy.request("GET", "http://localhost:8001/api/debug/reset");

        cy.visit("/");

        cy.contains("Monday");
    });
    it("book an interview", () => {
        cy.get("[alt=Add]")
            .first()
            .click();
        cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
        cy.get("[alt='Sylvia Palmer']").click();
        cy.contains("Save").click();

        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Sylvia Palmer");

    });
    it("edit an interview", () => {
        cy.get("[alt=Edit]")
            .first()
            .click({ force: true });
        cy.get("[alt='Tori Malcolm']").click();
        cy.contains("Save").click();
        cy.contains(".appointment__card--show", "Archie Cohen");
        cy.contains(".appointment__card--show", "Tori Malcolm");
    });
    it("should cancel an interview", () => {
        cy.get("[alt=Delete]")
            .first()
            .click({ force: true });
        cy.contains("button", "Confirm").click();
        cy.contains("li", "Monday")
            .should("have.text", "Monday2 spots remaining")
    });
});