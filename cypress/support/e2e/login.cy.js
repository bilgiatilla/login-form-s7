describe("Login Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Başarılı senaryo", () => {
    it("Geçerli bilgilerle submit edince success sayfasına gider", () => {
      cy.get("#email").type("test@example.com");
      cy.get("#password").type("Test1234!");
      cy.get("#terms").check();

      cy.get("button[type='submit']").should("not.be.disabled").click();

      cy.url().should("include", "/success");
    });
  });

  describe("Hatalı senaryolar", () => {
    
    it("Email yanlış girildi", () => {
      cy.get("#email").type("yanlis-email");

      cy.get(".error").should("have.length", 1);
      cy.get(".error").should("contain", "Geçerli bir email giriniz.");
      cy.get("button[type='submit']").should("be.disabled");
    });

    it("Email ve password yanlış girildi", () => {
      cy.get("#email").type("yanlis-email");
      cy.get("#password").type("zayifşifre");
      cy.get(".error").should("have.length", 2);
      cy.get(".error").should("contain", "Şifre en az 8 karakter");
    });

    it("Email ve password doğru ama terms kabul edilmedi", () => {
      cy.get("#email").type("test@example.com");
      cy.get("#password").type("Test1234!");
      cy.get("button[type='submit']").should("be.disabled");
    });
  });
});