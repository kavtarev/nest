import { left, right } from './either';

describe('EitherTest', () => {
  it('works with left value', () => {
    const DATA = 'some data';
    const a = left(DATA);

    expect(a.isLeft()).toBe(true);
    if (!a.isLeft()) {
      return;
    }
    expect(a.getError()).toBe(DATA);
  });

  it('works with right value', () => {
    const DATA = 'some data';
    const a = right(DATA);

    expect(a.isRight()).toBe(true);
    if (!a.isRight()) {
      return;
    }
    expect(a.getResult()).toBe(DATA);
  });
});
