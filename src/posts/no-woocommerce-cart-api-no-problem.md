---
path: "/words/no-woocommerce-cart-api-no-problem"
date: "2019-02-03"
title: "No WooCommerce Cart API? No Problem."
subtitle: "Why you don't need the WooCommerce cart for your headless WordPress app."
image: "../images/wc_cart_api.png"
postExcerpt: "You can build a headless WordPress/WooCommerce app without the cart api. Here's how."
withAudio: false
draft: false
---
I've been working on rebuilding [vizualrecords.com](https://www.vizualrecords.com) as a headless WordPress site with a [React](https://reactjs.org/) front end. *Headless* means that the WordPress data and admin are essentially decoupled from the public facing web site so by calling in your data using the[ WordPress REST API]((https://developer.wordpress.org/rest-api/)), you can build the front end with whatever framework you like — in my case React — but you could use Vue, Angular, Ember or anything else. 

> Creating a headless WordPress site gives you a lot of freedom but that also means you're left to build a lot yourself that WordPress normally would provide for you out-of-the-box.

Over the past 18 months, I made a deep dive into upping my JavaScript skills including React/React Native so the Vizual site rework was a perfect chance to put what I had learned to the test.

There was no doubt about it: the Vizual site needed an overhaul. I was using an outdated e-commerce plugin (Cart66) which made entering product data a bit cumbersome and it was slow. What's more, since the last redesign of vizualrecords.com, [WooCommerce](https://woocommerce.com/) had come a long way and had been purchased by [Automattic](https://automattic.com/) — the parent company of WordPress — so I knew I wanted to port my products over to WooCommerce with its now tighter integration with the WordPress core.

After entering all the product data and custom metadata for the Vizual releases in WooCommerce, I had all the data I needed in WordPress and was ready to build out the front end. Sweetness.

## No Cart API
In working with headless WordPress and WooCommerce, one of the first issues you will come across is that the WooCommerce cart is not exposed to the WP REST API. Thus, you can't retrieve the cart, add an item to the cart or clear the cart using API calls.

There are a lot of things left out of the WP REST API like native WP menus and Advanced Custom Fields but there are plugins which expose those to the API so you can grab their data with ease. Thankfully the [CoCart](https://github.com/co-cart/co-cart) plugin does the same thing for the WooCommerce cart allowing you to add or remove cart items or clear the cart completely. Sweet.

With CoCart installed I had a working cart and test payments were running flawlessly through WooCommerce + Stripe so I was over the moon. I had a working React WooCommerce site! The next logical step was bazillions of dollars from digital music sales...or something.

## Problem.
Once I pushed the site live, a menacing bug became apparent very quickly: while I could keep the cart in the client app's state, how would WooCommerce know which cart belongs to whom? **There was nothing to sync a particular cart with a particular user**. Ruh roh.

With a normal LAMP stack WordPress site, WooCommerce uses PHP sessions in the browser to keep shopping carts in sync and stores the session and cart data in cookies for each visitor to the site. In a React/JavaScript app however, *there are no sessions* so multiple people could add to the cart and my app would have no way to keep the cart state in sync for each one. I would open up the site and there would be 'ghost' products in the cart from who knows where. 

There's no 'session bridge' or anything in a javascript app that I could use to access or imitate PHP sessions, nor was I able to access or set session cookies client-side. Wat do?

## No Problem.
Then I had a eureka moment of zen™: **there is no cart**.

If there's one takeaway from this post I want you to have is this: _you don't need a cart in WooCommerce to process orders_.

While you probably *want* a cart and you probably *should* have one, there's no requirement with WooCommerce to have a cart. What that means is you can handle your 'cart' — and all that entails: listing products, calculating sub-totals, etc. — however you wish. I kind of just assumed that you need a cart with WooCommerce which then gets input to an order but it turns out you don't.

All you need to do is keep track of the products your customer wants to buy, and then send the product `line_items` to WooCommerce along with payment data to process your order. No cart necessary!

So now you can handle your cart and its requisite state 100% locally in your app and then just send your order data to WooCommerce at Checkout when ready.

And that's exactly what I did.

## Local cart: how do you do that?
The WooCommerce cart as exposed to the REST API by the CoCart plugin was just an array of product objects. In the first iteration of my app, when someone clicked an 'Add To Cart' button, it made an api call adding the item to the cart array with the new array as a response updating the cart state in the app. Likewise, removing an item worked the same way by removing the item from the array and returning the new, updated array.

Once I had my eureka moment of zen™ I realized I could just keep a 'cart' array in local app state.

In my top-level `App` component I have my state (using React Hooks) and my main api functions so that I can pass the results down to any child components that need them:

```javascript{2-3}
const App = () => {
    const [localCart, setLocalCart] = useState([])
    const [catalog, setCatalog] = useState([])
    //...
```
Note that I'm grabbing all my products (aka 'catalog') to show them on the site but this will become important later as we'll need the catalog array to filter against when adding products to the cart.

My 'Add To Cart' buttons were like so, sending the product id and quantity to my `addToCart` handler function and since I'm selling digital music files, the quantity will always be 1:

```javascript{4-7}
<button
    type="button"
    onClick={() => {
        addToCart({
            product_id: product.id,
            quantity: 1
        })
    }}
>
    Add To Cart
</button>
```

And my `addToCart` handler is like so:

```javascript
const addToCart = ({ product_id, quantity }) => {
    const checkId = obj => obj.id === product_id
    const currentCatalog = [...catalog]
    if (localCart.some(checkId)) {
        alert('The item you are trying to add is already in your cart!')
        return false
    } else {
        const newCart = currentCatalog.filter((product, productIndex) => {
            return product.id === product_id
        })
        setLocalCart([...localCart, ...newCart])
        localStorage.setItem(
            'vizual_localCart',
            JSON.stringify([...localCart, ...newCart])
        )
    }
}
```
So here, I'm using a `checkId` function to compare the `product_id` I'm sending to the function isn't already in my cart array (`localCart`).
    
If the item is already in the cart, we don't want to add it since there can only be 1 in the cart. If the item is *not* in the cart, we then filter the `product_id` against the `catalog` array we are already grabbing to show other products on the site and returning the full product object to add to the cart array. Dopeness.

This is super cool because by adding the product from the `catalog` array now we have **all** of the product data: description, price, images, etc., all of which we can use to populate our `localCart`.

Using `es6` syntax and the spread operator, I'm updating the `localCart` array with the newly added product using the `setLocalCart` hook.

Finally, we're saving the `localCart` to the browser's `localStorage`.  By using `localStorage` we are essentially caching the cart and our `getCart()` function can check `localStorage` first to see if there is a cart there and if not, set it to an empty array, ready for products to be added:

```javascript
const getLocalCart = () => {
    // grab localCart from localStorage
    const cachedCart = localStorage.getItem('vizual_localCart')
    // if so, use cached
    if (cachedCart && cachedCart.length !== 0) {
        setLocalCart(JSON.parse(cachedCart))
        console.log('Cart: Using cached!')
    } else {
        setLocalCart([])
    }
}
```
What's great about using `localStorage` is that now if a visitor leaves the site and then comes back, their cart is waiting for them (unless they clear their browsing data of course).

Our `removeFromCart()` function works basically the same way but in reverse:

```javascript
const removeFromLocalCart = ({ product_id, quantity }) => {
    const newCart = localCart.filter((product, productIndex) => {
        return product.id !== product_id
    })
    setLocalCart(newCart)
    localStorage.setItem('vizual_localCart', JSON.stringify(newCart))
}
```
Here we're filtering against what's already in the `localCart` to remove an item. Since were are updating the cart with a new array, we don't need to use the spread operator — we can just update the state in `setLocalCart` with `newCart` and likewise for setting the `localStorage`.

## Order time
The last step is to process orders. Besides the buyer credit card information, all WooCommerce needs  for the order is the `line_items` or products they are buying which is an array of objects with the `product_id` and `quantity`.

To get that, we can just use the `map` method on our `localCart` array:

```javascript{3-4}
const line_items = localCart.map(item => {
    return {
        product_id: item.id,
        quantity: 1
    }
})
```
In my `processOrder` function, you send the `line_items` like this:

```javascript{19}
const processOrder = ({
    firstName,
    lastName,
    email,
    postal,
    line_items,
    token
}) => {
    let orderData = JSON.stringify({
        // we'll process payment in the next step so set to false
        set_paid: false,
        billing: {
            first_name: firstName,
            last_name: lastName,
            postcode: postal,
            email: email
        },
        // these are the products sent to the order
        line_items: line_items
    })

    axios
        .post(
            `${params.liveUrl}/wp-json/wc/v3/orders?consumer_key=${
                process.env.REACT_APP_WC_CONSUMER_KEY
            }&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}`,
            orderData,
            axiosConfig
        )
        .then(response => {
            console.log('Process order', response)
            setPending(true)
            setOrder(response.data)
            return response
        })
        .then(response => {
            // console.log('Send order id', response.data.id)
            paymentSubmit({
                order_id: response.data.id,
                token: token
            })
        })
        .catch(err => {
            console.log('AXIOS ERROR processOrder: ', err)
            setOrderError(err)
        })
}
```
From there, with a successful response you can run your `paymentSubmit` function. In my case, I'm using Stripe but yours may be different depending on your gateway:

```javascript{18-22}
const paymentSubmit = ({ order_id, token }) => {
    // grab order_id and token from processOrder
    let paymentData = JSON.stringify({
        payment_method: 'stripe',
        order_id: order_id,
        payment_token: token
    })
    axios
        .post(
            `${params.liveUrl}/wp-json/wc/v2/payment?consumer_key=${
                process.env.REACT_APP_WC_CONSUMER_KEY
            }&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}`,
            paymentData,
            axiosConfig
        )
        .then(response => {
            console.log('Payment Submit', response.data)
            if (response.data.code === 200) {
                setOrder(response.data)
                setOrderComplete(true)
                setPending(false)
                clearLocalCart()
            } else {
                // setStatus(response.data.message)
                getNotes(order_id)
            }
        })
        .catch(err => {
            console.log('AXIOS ERROR payment Submit: ', err)
            setOrderError(err)
        })
}
```
If everything is correct, your payments should go through, all without using the WooCommerce cart. Note that I'm clearing the `localCart` once the payment goes through along with some other `orderComplete` functions.

## Sweetness.
And there you have it! If you have a headless WordPress app with React, creating your own 'cart' in local state and using `localStorage` is the way to go.

You can use your `localCart` array with the `map()` method to show your users a list of items in the cart or display the cart any way you choose.

If you have any questions about this post, ask me on Twitter: [@joshuaiz](https://twitter.com/joshuaiz)

