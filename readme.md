# Regulated Requestor

Regulated Requestor는 REST API를 사용하기 위한 객체를 정의합니다.

- 요청 데이터와 응답 데이터의 타입을 잘 정의할 수 있습니다.
- 같은 요청을 여러 코드에서 쉽게 재사용 할 수 있습니다.

## `interface` RRequestHandler

`RRequestHandler`는 `RRequestData`를 파라미터로 받아 `RResponse` 객체의 프로미스를 반환합니다. `RResponse` 객체는 `status` 프로퍼티를 통해 요청의 성공/실패 여부를 알 수 있습니다.

### `interface` RErrorResponse

`RErrorResponse`는 요청이 실패했을 때 반환됩니다. 만약 서버로의 요청 자체가 실패했을 경우 `statusCode` 프로퍼티의 값이 `null`이 됩니다. 이외에는 서버에서 반환한 HTTP 상태 코드가 `statusCode` 프로퍼티의 값이 됩니다.

요청 실패 시 서버의 응답 데이터 데이터는 없거나, `{reason: string}` 형태여야합니다. 서버에서 요청 실패에 대한 이유 보낸다면 `RErrorResponse` 객체의 `reason` 프로퍼티를 통해 확인할 수 있습니다.

## `function` defineRequestHandler
```ts
export function defineRequestHandler<Req extends RRequestData, Res>({ url, method }: RRequestHandlerOption<Req>): RRequestHandler<Req, Res>

export interface RRequestHandlerOption<Req extends RRequestData> {
    url: string;
    method: Req extends void ? string : "post" | "put" | "delete";
}
```

`defineRequestHandler` 함수는 `request handler`를 잘 정의해줍니다.

- 이 함수는 2개의 제네릭을 사용합니다(`Req`와 `Res`). 첫 번째(`Req`)는 요청 데이터 형식(`RRequestData`), 두 번째(`Res`)는 응답 데이터 형식입니다.
- `Req`가 `void`가 아니면, 요청 메소드는 `post`, `put`, `delete`로 제한됩니다.
- 만약 요청 이후 추가적인 작업이 필요하다면, 굳이 `defineRequestHandler`를 사용하여 `request handler`를 정의하지 않아도 됩니다. 