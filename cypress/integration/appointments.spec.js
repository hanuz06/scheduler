describe("Appointments", () => {
  beforeEach(()=>{
    cy.request('GET', "/api/debug/reset") 
    cy.visit("/");
    cy.contains("Monday").click();
  })

  it("should book an interview", () => {    
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");    
    cy.get("[alt='Sylvia Palmer']").click(); 

    cy.contains("Save").click();

    cy.get(".appointment__card--show").should('contain', 'Lydia Miller-Jones','Sylvia Palmer');

  });

  it("should edit an interview", () => {      
    cy.get("[alt=Edit]").first().click({force:true});

    cy.get("[data-testid=student-name-input]").clear().type("Andrey Li");    
    cy.get("[alt='Tori Malcolm']").click(); 

    cy.contains("Save").click();

    cy.get(".appointment__card--show").should('contain', 'Andrey Li','Tori Malcolm');
    
  });

  it("should cancel an interview", () => {      
    cy.get("[alt=Delete]").first().click({force:true});

    cy.contains('button','Confirm').click();
    cy.contains('DELETING').should('exist')
    cy.contains('DELETING').should('not.exist');    

    cy.get(".appointment__card--show").should('not.exist');
    
  });

});