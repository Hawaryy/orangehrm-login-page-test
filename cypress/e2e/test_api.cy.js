describe('API Testing Categories',() => {
    it('TEST-API-01 | Get a single category by ID', () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/63"
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property;("id",63)
            expect(response.body).to.have.property("name", "nanthan")
        })
    })

    it('TEST-API-02 | Get a single category by slug', () => {
        cy.request({
            method: "GET",
            url : "https://api.escuelajs.co/api/v1/categories/slug/miscellaneous"
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("id", 5)
            expect(response.body).to.have.property("slug", "miscellaneous")
        })
    })

    it('TEST-API-03 | Create a category', () => {
        cy.request({
            method: "POST",
            url: "https://api.escuelajs.co/api/v1/categories/",
            body: {
                "name" : "New category 67",
                "image": "https://asset.kompas.com/crops/FpBsx0cIOjopfaObAG6hxQ4-95g=/0x0:2160x1440/750x500/data/photo/2025/10/30/690353c425446.png"
            },
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("name", "New category 67")
        })
    })

    it('TEST-API-04 | Update a category', () => {
        cy.request({
            method: "PUT",
            url: "https://api.escuelajs.co/api/v1/categories/63",
            body:{
                name: "raden arif"
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("name", "raden arif")
        })
    })

    it('TEST-API-05 | delete a category', () => {
        cy.request({
            method: "DELETE",
            url: "https://api.escuelajs.co/api/v1/categories/240"
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    })

    it('TEST-API-06 | Get all product by category', () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/240/products"
        }).then((response) => {
            expect(response.status).to.equal(200)

        })
    })
  
    it('TEST-API-07 | Get a single category by ID', () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/261"
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property;("id",261)
            expect(response.body).to.have.property("name", "lisa")
        })
    })
});