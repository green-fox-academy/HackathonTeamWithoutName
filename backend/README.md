# CoffeeToGo Backend

### How to run

On production servers you will only need to run the binary created by this command:

```
go build
```

but for development purposes you can use the following commands:

Install go dependencies with

```
go get -d ./...
```

To run the server navigate to backend/cmd/server and use the following command:

```
go run main.go
```

### Prerequisites
If you wish to tinker with the source code:

 - You will need GO 1.16 to run this app.
 - The project root directory should be in your $GOPATH/src/ directory


## Endpoints

### GET /user/verify
/user/verify endpoint receives the request from the link sent to the given email address in case of a succesful registration. It verifies the user with the help of the verification token sent in the request header. If the verification was successful, it sets the registered user's status to verified in the database.

It returns with the following JSON in the body:

 ```
{
    "message": "ok"
}
 ```

 ### GET /user/forgottenpass
/user/forgottenPass creates a randomly generated string as a new password in case the user forgets the previous one. It needs the email address given at registration. It verifies, whether the email exists both in general and in the database. If the verification is successful, it sends an email to the user with the new password.

It is waiting for the following JSON incorporated into the body:
 ```
{
    "email": "email",
}
 ```
and returns with the following JSON in the body:
 ```
{"message": "Your password has been reset, you can find your new password in the email sent to " + email}
 ```

### POST /user/register
This endpoint is waiting for an email address, a username and a password in the body:
 ```
{
    "username": "user",
    "password": "password",
    "email": "user@email.com"
}
 ```
and returns with the following JSON in the body:
 ```
{
    "id": 1, 
    "username": "user"
}
 ```
and sends a validation email on the given email address(user@email.com) via MailGun with a link to the /verify endpoint, which contains a verification token.


### POST /user/login
This endpoint is waiting for :

 ```
{
    "username": "user",
    "password": "password999",
    "orders": [
        {
            "productId": 1,
            "quantity": 2
        },
        {
            "productId": 2,
            "quantity": 3
        }
    ]
}
 ```

and returns with the following JSON in the body:
 ```
{
    "accessToken": "LdkE3Rlir93Kv.Bl4bL4BL4.1nV4l1D70k3N",
    "addresses": [
        {
            "id": 1,
            "user_id": 1,
            "country": "Hungary",
            "zip_code": "1111",
            "city": "Budapest",
            "street": "Valami utca",
            "house_number": "4",
            "phone": 123456789,
            "first_name": "Admin",
            "last_name": "Kovacs"
        }
    ],
    "orders": [
        {
            "id": 24,
            "user_id": 1,
            "product_id": 1,
            "quantity": 1,
            "status": "in_cart"
        }
    ],
    "status": "ok"
}
 ```

### POST /user/address
This endpoint is waiting for a jwt token in the header and the following body:

 ```
{
    "country": "Hungary",
    "zip_code": "1111",
    "city": "Budapest",
    "street": "Valami utca",
    "house_number": "4",
    "phone": 123456789,
    "first_name": "Admin",
    "last_name": "Kovacs"
}
 ```

and returns with the following JSON in the body:
 ```
{
     "message": "ok"
}
 ```

### PUT /user/address
This endpoint is waiting for a jwt token in the header and the following body:

 ```
{
    "address_id": 1
    "country": "Hungary",
    "zip_code": "1111",
    "city": "Budapest",
    "street": "Másik utca",
    "house_number": "4",
    "phone": 123456789,
    "first_name": "Adminné",
    "last_name": "Kovacs"
}
 ```

and returns with the following JSON in the body:
 ```
{
     "message": "ok"
}
 ```

### PUT /user/pass
This endpoint is waiting for a jwt token in the header, the old password and the new password in the body:

 ```
{
    "oldpassword": "oldpass123",
    "newpassword": "newpass123"
}
 ```

and returns with the following JSON in the body:
 ```
{
    "message": "Your password has been changed"
}
 ```

### GET /product
This endpoint returns with a list of available products:

 ```
{
    "message": "ok",
    "productList": [
        {
            "id": 1,
            "title": "Lavazza",
            "price": 10.12,
            "category": "arabica",
            "description": "medium roast",
            "image": "https://previews.123rf.com/images/arcady31/arcady311202/arcady31120200035/12414954-coffee-break-sign.jpg",
            "inStock": 30,
            "reviews": [
                {
                    "id": 1,
                    "productId": 1,
                    "userName": "admin",
                    "rating": 4,
                    "text": "not bad"
                },
                {
                    "id": 4,
                    "productId": 1,
                    "userName": "ottoka",
                    "rating": 4,
                    "text": "this is good coffee"
                }
            ]
        },
        {
            "id": 2,
            "title": "Starbux",
            "price": 4,
            "category": "robusta",
            "description": "dark roast",
            "image": "https://previews.123rf.com/images/arcady31/arcady311202/arcady31120200035/12414954-coffee-break-sign.jpg",
            "inStock": 96,
            "reviews": [
                {
                    "id": 2,
                    "productId": 2,
                    "userName": "ottoka",
                    "rating": 5,
                    "text": "best coffee i have ever drunk"
                },
                {
                    "id": 5,
                    "productId": 2,
                    "userName": "admin",
                    "rating": 5,
                    "text": "marhajó"
                }
            ]
        }
    ]
}
 ```

### POST /product/review
This endpoint is waiting for a jwt token in the header and the following details in the body:

 ```
{
    "productId": 1,
    "rating": 5,
    "text": "great taste"
}
 ```

and returns with the following JSON in the body:
 ```
{
    "message": "ok"
}
 ```

### POST /order
This endpoint is waiting for a jwt token in the header and the productId in the body:

 ```
{
    "productId": 1
}
 ```

From the jwt token we get the userId and place the item to the cart of the user if the item is in stock, then it returns with the following JSON in the body:
 ```
{
    "message": "Item added to cart"
}
 ```

### PUT /order
This endpoint is waiting for a jwt token in the header. The backend validates the token and finalizes the order based on the userId received from the token and every item with in_cart status will be ordered.

It returns with the following JSON in the body:
 ```
{
    "message": "Thank you for shopping at CoffeeToGo!"
}
 ```

### PUT /order/quantity
This endpoint is waiting for an order_id and new_quantity which can be 1 or -1:

 ```
{
    "order_id": 1,
    "new_quantity": 1
}
 ```

and returns with the following JSON in the body:
 ```
{
    "message": "ok"
}
 ```

### DELETE /order
This endpoint is waiting for jwt token in the header to get the userId and the order_id in the body:

 ```
    "order_id": orderID
 ```

and returns with the following JSON in the body:
 ```
{
    "message": "ok"
}
 ```
