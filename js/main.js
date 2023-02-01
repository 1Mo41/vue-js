Vue.component('product-details'
    ,{
        props: {
            details: {
                type: Array,
                required: true,
            }
        },
                template:
                    `<ul>
                        <li v-for="detail in details">{{detail}}</li>
                    </ul>`,


        }
)


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
            <p>Shipping: {{ shipping }}</p>
            <p><a :href=" link ">More products like this</a></p>
            <span v-if="inventory >= 50">{{ sale }}</span>
            <product-details :details="details"></product-details>
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
 
            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>

            <button
                    v-on:click="deleteCart"
            >
                delete
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
        }
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addToCart() {
            this.$emit('add-to-cart',
                this.variants[this.selectedVariant].variantId);
        },
        deleteCart() {
            this.$emit('delete-to-cart',
                this.variants[this.selectedVariant].variantId);
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
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        deleteCart(id){
            this.cart.pop(id);
        }
    }


})
