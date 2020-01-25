import xs, { MemoryStream } from 'xstream';

function main() {
  return {
    dom: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0)
      .map((i: number) => `Seconds elapsed: ${i}`),
    log: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0)
  };
}

function domDriver(text$: MemoryStream<string>): void {
  const listner = {
    next: (str: string) => {
      const el = document.querySelector('div.ch_03');

      if (el) {
        el.textContent = str;
      }
    }
  };

  text$.subscribe(listner);
}

function logDriver(number$: MemoryStream<number>): void {
  number$.subscribe({
    next: console.log
  });
}

const sink = main();

domDriver(sink.dom);
logDriver(sink.log);
