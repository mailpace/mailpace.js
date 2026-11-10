[**@mailpace/mailpace.js**](../README.md)

***

[@mailpace/mailpace.js](../README.md) / DomainClient

# Class: DomainClient

Defined in: [src/lib/DomainClient.ts:10](https://github.com/mailpace/mailpace.js/blob/master/src/lib/DomainClient.ts#L10)

Client class that can be used to interact with an MailPace Domain

## Extends

- `default`

## Constructors

### Constructor

> **new DomainClient**(`domainToken`, `configOptions?`): `DomainClient`

Defined in: [src/lib/DomainClient.ts:17](https://github.com/mailpace/mailpace.js/blob/master/src/lib/DomainClient.ts#L17)

Create a client for sending emails from a domain

#### Parameters

##### domainToken

`string`

The API token for the domain

##### configOptions?

[`Configuration`](../@mailpace/namespaces/Options/interfaces/Configuration.md)

Configuration options for accessing the API

#### Returns

`DomainClient`

#### Overrides

`BaseClient.constructor`

## Properties

### clientVersion

> `readonly` **clientVersion**: `string`

Defined in: [src/lib/BaseClient.ts:22](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L22)

#### Inherited from

`BaseClient.clientVersion`

***

### errorHandler

> `protected` `readonly` **errorHandler**: `ErrorHandler`

Defined in: [src/lib/BaseClient.ts:24](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L24)

#### Inherited from

`BaseClient.errorHandler`

***

### httpClient

> `readonly` **httpClient**: `AxiosInstance`

Defined in: [src/lib/BaseClient.ts:23](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L23)

#### Inherited from

`BaseClient.httpClient`

***

### DefaultOptions

> `readonly` `static` **DefaultOptions**: [`Configuration`](../@mailpace/namespaces/Options/interfaces/Configuration.md)

Defined in: [src/lib/BaseClient.ts:17](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L17)

Default options

#### Inherited from

`BaseClient.DefaultOptions`

## Methods

### getOptions()

> **getOptions**(): [`Configuration`](../@mailpace/namespaces/Options/interfaces/Configuration.md)

Defined in: [src/lib/BaseClient.ts:42](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L42)

#### Returns

[`Configuration`](../@mailpace/namespaces/Options/interfaces/Configuration.md)

#### Inherited from

`BaseClient.getOptions`

***

### prepareHeaders()

> **prepareHeaders**(): `object`

Defined in: [src/lib/BaseClient.ts:49](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L49)

Prepare the default HTTP Request Headers

#### Returns

`object`

#### Inherited from

`BaseClient.prepareHeaders`

***

### processRequestWithBody()

> `protected` **processRequestWithBody**\<`T`\>(`method`, `path`, `body`, `callback?`): `Promise`\<`T`\>

Defined in: [src/lib/BaseClient.ts:63](https://github.com/mailpace/mailpace.js/blob/master/src/lib/BaseClient.ts#L63)

Prepare the request and send on

#### Type Parameters

##### T

`T`

#### Parameters

##### method

[`POST`](../@mailpace/namespaces/Options/enumerations/HttpMethod.md#post)

##### path

`string`

##### body

`object` \| `null`

##### callback?

[`Callback`](../type-aliases/Callback.md)\<`T`\>

#### Returns

`Promise`\<`T`\>

#### See

processRequest for more details.

#### Inherited from

`BaseClient.processRequestWithBody`

***

### sendEmail()

> **sendEmail**(`email`, `callback?`): `Promise`\<[`SendResponse`](../type-aliases/SendResponse.md)\>

Defined in: [src/lib/DomainClient.ts:27](https://github.com/mailpace/mailpace.js/blob/master/src/lib/DomainClient.ts#L27)

Send a single email message through the API

#### Parameters

##### email

[`Message`](../type-aliases/Message.md)

Email to send

##### callback?

[`Callback`](../type-aliases/Callback.md)\<[`SendResponse`](../type-aliases/SendResponse.md)\>

A callback that if provided will be called after sending the email is complete

#### Returns

`Promise`\<[`SendResponse`](../type-aliases/SendResponse.md)\>

A promise that will resolve when the API responds (or an error occurs)
