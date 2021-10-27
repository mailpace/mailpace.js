[@ohmysmtp/ohmysmtp.js](../README.md) / [Exports](../modules.md) / DomainClient

# Class: DomainClient

Client class that can be used to interact with an OhMySMTP Domain

## Hierarchy

- `BaseClient`

  ↳ **DomainClient**

## Table of contents

### Constructors

- [constructor](domainclient.md#constructor)

### Properties

- [clientVersion](domainclient.md#clientversion)
- [errorHandler](domainclient.md#errorhandler)
- [httpClient](domainclient.md#httpclient)
- [DefaultOptions](domainclient.md#defaultoptions)

### Methods

- [getOptions](domainclient.md#getoptions)
- [prepareHeaders](domainclient.md#prepareheaders)
- [processRequestWithBody](domainclient.md#processrequestwithbody)
- [sendEmail](domainclient.md#sendemail)

## Constructors

### constructor

• **new DomainClient**(`domainToken`, `configOptions?`)

Create a client for sending emails from a domain

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domainToken` | `string` | The API token for the domain |
| `configOptions?` | `Configuration` | Configuration options for accessing the API |

#### Overrides

BaseClient.constructor

#### Defined in

[lib/DomainClient.ts:10](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/DomainClient.ts#L10)

## Properties

### clientVersion

• `Readonly` **clientVersion**: `string`

#### Inherited from

BaseClient.clientVersion

#### Defined in

[lib/BaseClient.ts:22](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L22)

___

### errorHandler

• `Protected` `Readonly` **errorHandler**: `ErrorHandler`

#### Inherited from

BaseClient.errorHandler

#### Defined in

[lib/BaseClient.ts:24](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L24)

___

### httpClient

• `Readonly` **httpClient**: `AxiosInstance`

#### Inherited from

BaseClient.httpClient

#### Defined in

[lib/BaseClient.ts:23](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L23)

___

### DefaultOptions

▪ `Static` `Readonly` **DefaultOptions**: `Configuration`

Default options

#### Inherited from

BaseClient.DefaultOptions

#### Defined in

[lib/BaseClient.ts:17](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L17)

## Methods

### getOptions

▸ **getOptions**(): `Configuration`

#### Returns

`Configuration`

#### Inherited from

BaseClient.getOptions

#### Defined in

[lib/BaseClient.ts:42](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L42)

___

### prepareHeaders

▸ **prepareHeaders**(): `object`

Prepare the default HTTP Request Headers

#### Returns

`object`

#### Inherited from

BaseClient.prepareHeaders

#### Defined in

[lib/BaseClient.ts:49](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L49)

___

### processRequestWithBody

▸ `Protected` **processRequestWithBody**<T\>(`method`, `path`, `body`, `callback?`): `Promise`<T\>

Prepare the request and send on

**`see`** processRequest for more details.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `POST` |
| `path` | `string` |
| `body` | `object` |
| `callback?` | `Callback`<T\> |

#### Returns

`Promise`<T\>

#### Inherited from

BaseClient.processRequestWithBody

#### Defined in

[lib/BaseClient.ts:63](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/BaseClient.ts#L63)

___

### sendEmail

▸ **sendEmail**(`email`, `callback?`): `Promise`<SendResponse\>

Send a single email message through the API

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `email` | `Message` | - |
| `callback?` | `Callback`<SendResponse\> | A callback that if provided will be called after sending the email is complete |

#### Returns

`Promise`<SendResponse\>

A promise that will resolve when the API responds (or an error occurs)

#### Defined in

[lib/DomainClient.ts:27](https://github.com/ohmysmtp/ohmysmtp.js/blob/0ed46d8/src/lib/DomainClient.ts#L27)
