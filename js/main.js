Vue.component('product', {
    template: `
   <div class="product">
	<div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description}}</p>
            <p v-if="inStock">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p class = "style-text" style="text-decoration: line-through"v-else>Out of stock</p>

            <p><a :href=" link ">More products like this</a></p>
            <span v-if="inventory >= 50">{{ sale }}</span>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            ></div>
            <ul>
                <li v-for="sizes in sizes">{{ sizes }}</li>
            </ul>
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>

            <button
                    v-on:click="unToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Un to cart
            </button>
        </div>

   </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            altText: "A pair of socks",
            description: "A pair of warm, fuzzy socks",
            inventory: 100,
            OnSale: "Распродажа,успей купить по выгодной цене!",
            inStock: true,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./img/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./img/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }

            ], sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],


            selectedVariant: 0,
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        unToCart() {
            this.cart -= 1;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            return this.brand + ' ' + this.product + ' ' + this.OnSale
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})


