import {
  cn, connectRandom, connectRandomMany, getRandomElement, getRandomNumber, timesAsync,
} from '@/lib/utils';

describe('cn', () => {
  it('returns a string with merged class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('ignores falsy values', () => {
    const result = cn('class1', null, undefined, 'class2', 0, 'class3', false);
    expect(result).toBe('class1 class2 class3');
  });

  it('handles arrays of class names', () => {
    const result = cn(['class1', 'class2'], ['class3', 'class4']);
    expect(result).toBe('class1 class2 class3 class4');
  });

  it('handles object of class names', () => {
    const result = cn({ class1: true, class2: false, class3: true });
    expect(result).toBe('class1 class3');
  });

  it('handles mixed inputs', () => {
    const result = cn('class1', ['class2', 'class3'], { class4: true, class5: false });
    expect(result).toBe('class1 class2 class3 class4');
  });
});

describe('getRandomElement', () => {
  it('returns a random element from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getRandomElement(array);
    expect(array).toContain(result);
  });

  it('returns undefined when called with an empty array', () => {
    const result = getRandomElement([]);
    expect(result).toBeUndefined();
  });

  it('works with arrays of objects', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = getRandomElement(array);
    expect(array).toContain(result);
  });

  it('returns an element of the correct type', () => {
    const array = ['a', 'b', 'c'];
    const result = getRandomElement(array);
    expect(typeof result).toBe('string');
  });
});

describe('connectRandom', () => {
  it('returns a ConnectItem with a random id from the array', () => {
    const array = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
    const result = connectRandom(array);
    expect(result).toEqual({ connect: { id: expect.any(String) } });
    expect(array.map((item) => item.id)).toContain(result.connect.id);
  });
});

describe('timesAsync', () => {
  it('calls the callback the specified number of times', async () => {
    const count = 5;
    const cb = jest.fn(async (index: number) => {});
    await timesAsync(count, cb);
    expect(cb).toHaveBeenCalledTimes(count);
  });

  it('calls the callback with the correct index', async () => {
    const count = 3;
    const cb = jest.fn(async (index: number) => {});
    await timesAsync(count, cb);
    expect(cb.mock.calls[0][0]).toBe(0);
    expect(cb.mock.calls[1][0]).toBe(1);
    expect(cb.mock.calls[2][0]).toBe(2);
  });

  it('does nothing when count is 0', async () => {
    const cb = jest.fn(async (index: number) => {});
    await timesAsync(0, cb);
    expect(cb).not.toHaveBeenCalled();
  });
});

describe('connectRandomMany', () => {
  it('returns an empty array when count is 0', () => {
    const array = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const field = 'id';
    const count = 0;

    const result = connectRandomMany(array, field, count);
    expect(result.create).toHaveLength(0);
  });
});

describe('getRandomNumber', () => {
  it('returns a random number between 0 and the specified maximum', () => {
    const max = 10;
    const result = getRandomNumber(max);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(max);
  });

  it('returns a random number between the specified minimum and maximum', () => {
    const min = 5;
    const max = 10;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  });
});
