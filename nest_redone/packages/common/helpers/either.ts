class EitherResult<L, R> extends Array {

  constructor(left: L, right: R) {
    super()
    this[0] = left;
    this[1] = right;
  }

  isLeft() {
    return this instanceof LeftEitherResult
  }

  isRight() {
    return this instanceof RightEitherResult
  }
}

export class LeftEitherResult<L> extends EitherResult<L, null> {
  constructor(left: L) {
    super(left, null)
  }

  getError() {
    return this[0]
  }
}

export class RightEitherResult<R> extends EitherResult<null, R> {
  constructor(right: R) {
    super(null, right)
  }

  getResult() {
    return this[1]
  }
}
export type Either<T, U> = LeftEitherResult<T> | RightEitherResult<U>;

export function right<R>(data: R) {
  return new RightEitherResult(data)
}

export function left<L>(data: L) {
  return new LeftEitherResult(data)
}