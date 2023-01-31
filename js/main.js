let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./img/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        description:"A pair of warm, fuzzy socks",
        inventory: 100,
        OnSale: "Распродажа,успей купить по выгодной цене!",
        inStock: true,
        link:"https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./img/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./img/vmSocks-blue-onWhite.jpg",
            }

        ], sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

        cart: 0,


    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        unToCart() {
            this.cart -= 1;
        }


    }
})
